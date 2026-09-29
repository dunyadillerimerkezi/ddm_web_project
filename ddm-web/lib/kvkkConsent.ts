/**
 * PF (2026-09-29) — formdaki KVKK onay kutusunun etiketi ve aydınlatma metninin adresi. Hafif modül: form her sayfada
 * bunu okur, `site_content.json`'a dokunmaz. Etiketin kaynakta (5 şube iletişim kaydı) aynen geçtiğini
 * `lib/kvkkContent.ts` build'de denetler.
 */

/** Eski formun onay kutusu etiketi (kaynaktaki gibi). */
export const CONSENT_LABEL = "Kişisel verilerin işlenmesine dair bilgilendirme metnini okudum onaylıyorum";

/** Etiket üç parça: [önce, aydınlatma metnine bağlanan kısım, sonra]. */
export type ConsentParts = [string, string, string];

const LINK = "bilgilendirme metnini";
const AT = CONSENT_LABEL.indexOf(LINK);
export const CONSENT_PARTS: ConsentParts = [CONSENT_LABEL.slice(0, AT), LINK, CONSENT_LABEL.slice(AT + LINK.length)];

/** Aydınlatma metninin tamamı tek yerde durur (Şube İletişim ana sayfasının sonu) — 131 sayfada tekrar etmesin. */
export const KVKK_ID = "kvkk-aydinlatma-metni";
export const KVKK_HREF = `/ddm-iletisim#${KVKK_ID}`;
