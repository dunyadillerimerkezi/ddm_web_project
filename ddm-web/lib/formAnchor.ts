/**
 * PF (2026-09-29) — iletişim formunun sayfadaki çapası. Formun konduğu her sayfada `ContactForm` bu id'yi taşır;
 * üst menü ve mobil alt çubuğun "Bilgi Al / Kayıt Ol" düğmesi VARSAYILAN olarak buraya gider (`SiteHeader`,
 * `MobileBottomBar`). Formsuz sayfalar (kurs tarihi, 404) `ctaHref` ile başka hedef verir.
 */
export const FORM_ID = "kayit";
export const FORM_HREF = `#${FORM_ID}`;
