import { useLanguage } from "./i18n.jsx";

export default function Footer() {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  return (
    <footer className="foot">
      <div className="foot-left">
        <span className="foot-copy">&copy;2026 built by</span>
        <img src="/logo.png" alt="Samara" width="18" height="18" className="foot-logo" />
        <span className="foot-name">Samara</span>
      </div>
      <div className="foot-right">
        <a href="/support">Support</a>
        <a href="https://www.instagram.com/samarastoriesapp/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.tiktok.com/@samarastoriesapp" target="_blank" rel="noopener noreferrer">TikTok</a>
        <a href="/privacy">{isFr ? "Confidentialité" : "Privacy & Terms"}</a>
      </div>
    </footer>
  );
}
