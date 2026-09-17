import Footer from "./Footer.jsx";
import { useLanguage } from "./i18n.jsx";

export default function Support() {
  const { locale } = useLanguage();
  const isFr = locale === "fr";

  return (
    <>
      <div className="legal-page">
        <a href="/" className="legal-back">
          <img src="/logo.png" alt="Samara" width="22" height="22" />
          <span>Samara</span>
        </a>

        <article className="legal-article">
          <h1>{isFr ? "Support" : "Support"}</h1>
          <p className="legal-updated">
            {isFr ? "Nous sommes la pour vous aider." : "We're here to help."}
          </p>

          {isFr ? <ContentFr /> : <ContentEn />}
        </article>
      </div>

      <Footer />
    </>
  );
}

function ContentFr() {
  return (
    <>
      <h2>Nous contacter</h2>
      <p>
        Pour toute question, signalement de bug ou demande d'assistance, envoyez-nous un e-mail
        a l'adresse suivante :
      </p>
      <p>
        <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a>
      </p>
      <p>Nous faisons de notre mieux pour repondre sous 48 heures.</p>

      <h2>Questions frequentes</h2>

      <h3>Comment recuperer ma progression ?</h3>
      <p>
        Si vous avez renseigne votre adresse e-mail dans l'application, contactez-nous et nous
        pourrons vous aider a retrouver votre progression.
      </p>

      <h3>Comment supprimer mes donnees ?</h3>
      <p>
        Ouvrez l'application, allez dans <strong>Profil</strong>, puis appuyez sur{" "}
        <strong>Supprimer mes donnees</strong>. Vos donnees seront effacees de votre appareil
        et de nos serveurs. Vous pouvez aussi nous contacter par e-mail pour demander la
        suppression.
      </p>

      <h3>Comment desactiver les notifications ?</h3>
      <p>
        Vous pouvez modifier l'heure de rappel dans <strong>Profil &rarr; Rappel</strong>, ou
        desactiver les notifications dans les reglages de votre telephone
        (Reglages &rarr; Notifications &rarr; Samara Stories).
      </p>

      <h3>L'application est-elle gratuite ?</h3>
      <p>
        Oui, Samara Stories est actuellement gratuite. Des fonctionnalites premium pourront etre
        proposees a l'avenir.
      </p>

      <h3>Quelles langues sont disponibles ?</h3>
      <p>
        L'interface de l'application est actuellement en francais. Les histoires sont en arabe
        avec traductions et transliterations.
      </p>

      <h2>Signaler un bug</h2>
      <p>
        Si vous rencontrez un probleme technique, merci de nous envoyer un e-mail a{" "}
        <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a> en precisant :
      </p>
      <ul>
        <li>Le modele de votre appareil (ex : iPhone 15, iPad Air...)</li>
        <li>La version d'iOS</li>
        <li>Une description du probleme rencontre</li>
      </ul>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <h2>Contact Us</h2>
      <p>
        For any questions, bug reports, or support requests, send us an email at:
      </p>
      <p>
        <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a>
      </p>
      <p>We do our best to respond within 48 hours.</p>

      <h2>Frequently Asked Questions</h2>

      <h3>How can I recover my progress?</h3>
      <p>
        If you provided your email address in the app, contact us and we can help you recover
        your progress.
      </p>

      <h3>How do I delete my data?</h3>
      <p>
        Open the app, go to <strong>Profile</strong>, then tap{" "}
        <strong>Delete my data</strong>. Your data will be erased from your device and our
        servers. You can also contact us by email to request deletion.
      </p>

      <h3>How do I disable notifications?</h3>
      <p>
        You can change the reminder time in <strong>Profile &rarr; Reminder</strong>, or
        disable notifications in your phone settings
        (Settings &rarr; Notifications &rarr; Samara Stories).
      </p>

      <h3>Is the app free?</h3>
      <p>
        Yes, Samara Stories is currently free. Premium features may be offered in the future.
      </p>

      <h3>What languages are available?</h3>
      <p>
        The app interface is currently in French. Stories are in Arabic with translations and
        transliterations.
      </p>

      <h2>Report a Bug</h2>
      <p>
        If you encounter a technical issue, please email us at{" "}
        <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a> with:
      </p>
      <ul>
        <li>Your device model (e.g., iPhone 15, iPad Air...)</li>
        <li>Your iOS version</li>
        <li>A description of the issue</li>
      </ul>
    </>
  );
}
