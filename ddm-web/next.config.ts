import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slash kararı: URL'lerin sonunda "/" YOK, tutarlı biçimde
  // uygulanıyor (bkz. CLAUDE.md). Next.js varsayılanı zaten bu; kararı
  // dosyada açık tutmak için burada da belirtiliyor.
  trailingSlash: false,

  // NOT: output: "export" (tam statik export) BİLİNÇLİ OLARAK kullanılmıyor.
  // Next.js'in statik export modu next.config'teki redirects()/rewrites()'i
  // desteklemiyor; PROGRESS.md Faz 8, eski .html URL'lerinden yeni temiz
  // URL'lere 301 yönlendirmeyi TAM OLARAK next.config redirects() ile
  // kuruyor. Bu yüzden App Router'ın varsayılan modu (sayfalar build sırasında
  // statik üretilir/SSG, ama redirects() ve gerektiğinde sunucu tarafı
  // özellikler kullanılabilir) korunuyor. Detay: CLAUDE.md "Statik Üretim
  // ve 301 Redirect" bölümü.

  // Faz 8'de eski .html -> yeni temiz URL 301 kuralları burada,
  // `redirects()` altında tanımlanacak. Şimdi (Faz 3) boş bırakılıyor.
};

export default nextConfig;
