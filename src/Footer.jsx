import { LOCALES, useLanguage } from "./i18n.jsx";

function FooterLangPicker() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="foot-lang">
      <select
        className="foot-lang-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        aria-label="Language"
      >
        {LOCALES.map((l) => (
          <option key={l.id} value={l.id}>
            {l.flag}  {l.native}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <div className="foot-float">
        <div className="foot-pill">
          <div className="foot-brand">
            <img src="/logo.png" alt="" width="22" height="22" />
            <span>Samara</span>
            <em>{"\u0633\u0645\u0631\u0629"}</em>
          </div>
          <div className="foot-sep" aria-hidden="true" />
          <p className="foot-tag">{t("footer.tag")}</p>
          <div className="foot-sep" aria-hidden="true" />
          <FooterLangPicker />
        </div>
      </div>
    </footer>
  );
}
