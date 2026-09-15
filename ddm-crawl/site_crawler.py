#!/usr/bin/env python3
"""
site_crawler.py  (v2 — header/footer/menü ayıklayan sürüm)
-----------------------------------------------------------
Bir web sitesinin tüm sayfalarını gezer ve her sayfa için SADECE ana içeriği
(başlık, meta, H1-H6, gövde metni, içerik-içi linkler, görseller) çıkarır.
Header, mega menü ve footer gibi her sayfada tekrar eden bloklar ATILIR.

Çıktılar:
  - site_content.md    -> AI'a vermeye / okumaya uygun, sayfa sayfa
  - site_content.json  -> programatik kullanım
  - urls.csv           -> SEO karşılaştırması (URL, title, meta, H1...)

KULLANIM:
  pip install requests beautifulsoup4 lxml
  python site_crawler.py https://ornek-site.com
  python site_crawler.py https://ornek-site.com --max-pages 500 --delay 0.5

Not: Ana içerik konteynerini kendin de belirleyebilirsin:
  python site_crawler.py https://ornek-site.com --content-selector "#sp-component"
"""

import argparse
import csv
import json
import re
import sys
import time
from collections import deque
from urllib.parse import urljoin, urlparse, urldefrag

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; SiteContentExtractor/2.0; +migration)"
}

# Ana içeriğin aranacağı konteynerler (öncelik sırasıyla).
# Bulunduğunda header/menü/footer otomatik dışarıda kalır çünkü onlar bu
# konteynerin KARDEŞİdir, ÇOCUĞU değil.
MAIN_SELECTORS = [
    "#sp-component",        # Joomla Helix Ultimate (bu site)
    "main",
    "[role='main']",
    "#content",
    ".sppb-section",        # SP Page Builder içerik bölümleri
    "article",
]

# Konteyner bulunamazsa, body'den sökülecek bloklar.
STRIP_TAGS = ["header", "footer", "nav", "script", "style", "noscript"]
STRIP_KEYWORDS = re.compile(
    r"(menu|navbar|nav-|offcanvas|cookie|breadcrumb|sidebar|topbar|sp-menu|"
    r"header|footer|social)", re.I
)


def normalize_url(url):
    url, _ = urldefrag(url)
    return url.rstrip("/") if url.endswith("/") and urlparse(url).path != "/" else url


def same_domain(url, base_netloc):
    return urlparse(url).netloc.replace("www.", "") == base_netloc.replace("www.", "")


def discover_from_sitemap(base_url, session):
    found = set()
    to_check = deque([urljoin(base_url, "/sitemap.xml"),
                      urljoin(base_url, "/sitemap_index.xml")])
    seen = set()
    while to_check:
        sm = to_check.popleft()
        if sm in seen:
            continue
        seen.add(sm)
        try:
            r = session.get(sm, timeout=15)
            if r.status_code != 200:
                continue
            if "<urlset" not in r.text and "<sitemapindex" not in r.text:
                continue
            soup = BeautifulSoup(r.text, "xml")
            for loc in soup.select("sitemap > loc"):
                to_check.append(loc.text.strip())
            for loc in soup.select("url > loc"):
                found.add(normalize_url(loc.text.strip()))
        except requests.RequestException:
            continue
    return found


def get_main_node(soup, content_selector=None):
    """Header/menü/footer HARİÇ, sadece ana içerik düğümünü döndürür."""
    # 1) Kullanıcı özel selector verdiyse onu dene
    selectors = ([content_selector] if content_selector else []) + MAIN_SELECTORS
    for sel in selectors:
        try:
            node = soup.select_one(sel)
        except Exception:
            node = None
        if node and node.get_text(strip=True):
            # ana konteyner içindeki artık script/style'ı da temizle
            for t in node.find_all(["script", "style", "noscript"]):
                t.decompose()
            return node

    # 2) Konteyner yoksa: body'den boilerplate'i sök
    body = soup.body or soup
    for t in body.find_all(STRIP_TAGS):
        t.decompose()
    for t in body.find_all(attrs={"class": STRIP_KEYWORDS}):
        t.decompose()
    for t in body.find_all(attrs={"id": STRIP_KEYWORDS}):
        t.decompose()
    return body


def extract_page(url, html, content_selector=None):
    soup = BeautifulSoup(html, "lxml")

    # title / meta / canonical HEAD'den alınır (içerik konteynerinden bağımsız)
    title = soup.title.get_text(strip=True) if soup.title else ""

    def meta(attr, val):
        tag = soup.find("meta", attrs={attr: val})
        return tag["content"].strip() if tag and tag.get("content") else ""

    description = meta("name", "description")
    canonical_tag = soup.find("link", rel="canonical")
    canonical = canonical_tag["href"].strip() if canonical_tag and canonical_tag.get("href") else ""

    # ANA İÇERİK düğümü — header/menü/footer burada YOK
    main = get_main_node(soup, content_selector)

    headings = [{"level": h.name, "text": h.get_text(" ", strip=True)}
                for h in main.find_all(re.compile(r"^h[1-6]$"))
                if h.get_text(strip=True)]

    text = re.sub(r"\n{3,}", "\n\n", main.get_text("\n", strip=True))

    base_netloc = urlparse(url).netloc
    links = []
    for a in main.find_all("a", href=True):   # sadece içerik-içi linkler
        href = a["href"].strip()
        if href.startswith(("mailto:", "tel:", "javascript:", "#")):
            continue
        abs_url = normalize_url(urljoin(url, href))
        links.append({
            "text": a.get_text(" ", strip=True),
            "url": abs_url,
            "type": "internal" if same_domain(abs_url, base_netloc) else "external",
        })

    images = [{"src": urljoin(url, img["src"].strip()), "alt": img.get("alt", "").strip()}
              for img in main.find_all("img", src=True)]

    return {
        "url": url, "title": title, "meta_description": description,
        "canonical": canonical, "headings": headings, "text": text,
        "word_count": len(text.split()), "links": links, "images": images,
    }


def crawl(base_url, max_pages, delay, content_selector):
    base_url = base_url.rstrip("/")
    base_netloc = urlparse(base_url).netloc
    session = requests.Session()
    session.headers.update(HEADERS)

    print("Sitemap aranıyor...")
    seen, queue = set(), deque()
    sitemap_urls = discover_from_sitemap(base_url, session)
    if sitemap_urls:
        print(f"  Sitemap'ten {len(sitemap_urls)} URL bulundu.")
        for u in sitemap_urls:
            if u not in seen:
                seen.add(u); queue.append(u)
    else:
        print("  Sitemap yok, ana sayfadan gezilecek.")
        start = normalize_url(base_url); seen.add(start); queue.append(start)

    results = []
    while queue and len(results) < max_pages:
        url = queue.popleft()
        try:
            r = session.get(url, timeout=20)
        except requests.RequestException as e:
            print(f"  [HATA] {url} -> {e}")
            results.append({"url": url, "status": "ERROR", "error": str(e)})
            continue

        if "text/html" not in r.headers.get("Content-Type", ""):
            continue

        data = extract_page(url, r.text, content_selector)
        data["status"] = r.status_code
        results.append(data)
        print(f"  [{r.status_code}] ({len(results)}) {url}")

        # yeni iç linkleri kuyruğa ekle (içerik-içi linklerden — menüden değil)
        for link in data["links"]:
            lu = link["url"]
            if link["type"] == "internal" and lu not in seen and same_domain(lu, base_netloc):
                seen.add(lu); queue.append(lu)

        time.sleep(delay)

    return results


def save_outputs(results, out_dir="."):
    with open(f"{out_dir}/site_content.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    with open(f"{out_dir}/urls.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["url", "status", "title", "meta_description", "h1", "word_count"])
        for p in results:
            h1 = next((h["text"] for h in p.get("headings", []) if h["level"] == "h1"), "")
            w.writerow([p.get("url", ""), p.get("status", ""), p.get("title", ""),
                        p.get("meta_description", ""), h1, p.get("word_count", "")])

    with open(f"{out_dir}/site_content.md", "w", encoding="utf-8") as f:
        f.write(f"# Site İçerik Dökümü ({len(results)} sayfa)\n\n")
        for p in results:
            if "text" not in p:
                f.write(f"## [HATA] {p.get('url')}\n\n---\n\n"); continue
            f.write(f"## {p['title'] or '(başlıksız)'}\n\n")
            f.write(f"- **URL:** {p['url']}\n- **Durum:** {p['status']}\n")
            if p["canonical"]:
                f.write(f"- **Canonical:** {p['canonical']}\n")
            f.write(f"- **Meta description:** {p['meta_description'] or '(yok)'}\n\n")
            if p["headings"]:
                f.write("### Başlıklar\n")
                for h in p["headings"]:
                    f.write(f"- `{h['level'].upper()}` {h['text']}\n")
                f.write("\n")
            f.write("### İçerik\n" + p["text"] + "\n\n")
            if p["links"]:
                f.write("### İçerikteki Linkler\n")
                for l in p["links"]:
                    tag = "iç" if l["type"] == "internal" else "dış"
                    f.write(f"- ({tag}) [{l['text'] or l['url']}]({l['url']})\n")
                f.write("\n")
            if p["images"]:
                f.write("### Görseller\n")
                for img in p["images"]:
                    f.write(f"- {img['src']} — alt: {img['alt'] or '(yok)'}\n")
                f.write("\n")
            f.write("---\n\n")

    print(f"\nBitti. {len(results)} sayfa kaydedildi:")
    print(f"  - {out_dir}/site_content.md")
    print(f"  - {out_dir}/site_content.json")
    print(f"  - {out_dir}/urls.csv")


def main():
    ap = argparse.ArgumentParser(description="Web sitesi ana-içerik çıkarıcı (v2)")
    ap.add_argument("url", help="Ana adres, ör: https://ornek-site.com")
    ap.add_argument("--max-pages", type=int, default=500)
    ap.add_argument("--delay", type=float, default=0.5)
    ap.add_argument("--out-dir", default=".")
    ap.add_argument("--content-selector", default=None,
                    help="Ana içerik konteyneri (ör: '#sp-component'). Boşsa otomatik.")
    args = ap.parse_args()

    if not args.url.startswith("http"):
        print("URL http:// veya https:// ile başlamalı."); sys.exit(1)

    results = crawl(args.url, args.max_pages, args.delay, args.content_selector)
    save_outputs(results, args.out_dir)


if __name__ == "__main__":
    main()
