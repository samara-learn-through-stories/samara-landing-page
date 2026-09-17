import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import { LanguageProvider } from "./i18n.jsx";
import "./styles.css";

const Page = window.location.pathname === "/privacy" ? PrivacyPolicy : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  </StrictMode>,
);
