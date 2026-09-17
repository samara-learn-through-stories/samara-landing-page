import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import Support from "./Support.jsx";
import { LanguageProvider } from "./i18n.jsx";
import "./styles.css";

const pages = { "/privacy": PrivacyPolicy, "/support": Support };
const Page = pages[window.location.pathname] || App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  </StrictMode>,
);
