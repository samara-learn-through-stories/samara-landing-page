import Footer from "./Footer.jsx";
import { useLanguage } from "./i18n.jsx";

export default function PrivacyPolicy() {
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
          <h1>{isFr ? "Politique de confidentialite" : "Privacy Policy"}</h1>
          <p className="legal-updated">
            {isFr ? "Derniere mise a jour : 17 septembre 2026" : "Last updated: September 17, 2026"}
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
      <p>
        Samara Stories (&laquo; nous &raquo;, &laquo; notre &raquo;, &laquo; l'application &raquo;)
        est une application d'apprentissage de l'arabe par les histoires. Nous attachons une grande
        importance a la protection de vos donnees personnelles. Cette politique de confidentialite
        explique quelles donnees nous collectons, pourquoi et comment nous les utilisons,
        conformement au Reglement General sur la Protection des Donnees (RGPD).
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Samara Stories<br />
        Contact : <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a>
      </p>

      <h2>2. Donnees collectees</h2>

      <h3>2.1 Donnees fournies volontairement</h3>
      <ul>
        <li>
          <strong>Prenom</strong> (optionnel) &mdash; utilise pour personnaliser votre experience
          dans l'application.
        </li>
        <li>
          <strong>Adresse e-mail</strong> (optionnel) &mdash; utilisee uniquement pour vous
          recontacter en cas de perte de votre progression.
        </li>
      </ul>

      <h3>2.2 Donnees collectees automatiquement</h3>
      <ul>
        <li>
          <strong>Identifiant anonyme</strong> &mdash; un identifiant unique genere sur votre
          appareil (UUID), non lie a votre identite reelle.
        </li>
        <li>
          <strong>Donnees d'utilisation</strong> &mdash; histoires ouvertes, mots consultes,
          resultats des exercices, progression dans l'apprentissage.
        </li>
        <li>
          <strong>Informations techniques</strong> &mdash; systeme d'exploitation, version de l'OS,
          modele de l'appareil, langue du systeme.
        </li>
      </ul>

      <h3>2.3 Donnees NON collectees</h3>
      <ul>
        <li>Nous ne collectons <strong>aucun identifiant publicitaire</strong> (IDFA/GAID).</li>
        <li>Nous n'utilisons <strong>aucun outil de tracking tiers</strong> (pas de Firebase Analytics, Amplitude, etc.).</li>
        <li>Nous ne collectons <strong>aucune donnee de localisation</strong>.</li>
        <li>Nous n'accedons <strong>ni a votre camera, ni a vos photos, ni a vos contacts</strong>.</li>
      </ul>

      <h2>3. Finalites du traitement</h2>
      <table>
        <thead>
          <tr>
            <th>Finalite</th>
            <th>Base legale (RGPD)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sauvegarder et synchroniser votre progression</td>
            <td>Execution du contrat (art. 6.1.b)</td>
          </tr>
          <tr>
            <td>Personnaliser l'experience (prenom)</td>
            <td>Consentement (art. 6.1.a)</td>
          </tr>
          <tr>
            <td>Vous recontacter en cas de perte (e-mail)</td>
            <td>Consentement (art. 6.1.a)</td>
          </tr>
          <tr>
            <td>Ameliorer l'application (statistiques anonymes)</td>
            <td>Interet legitime (art. 6.1.f)</td>
          </tr>
          <tr>
            <td>Envoyer des rappels de revision</td>
            <td>Consentement (art. 6.1.a)</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Stockage et securite des donnees</h2>
      <p>
        Vos donnees sont stockees de maniere securisee sur les serveurs de{" "}
        <strong>Supabase</strong> (infrastructure hebergee en Union europeenne). Les communications
        entre l'application et nos serveurs sont chiffrees via HTTPS/TLS.
      </p>
      <p>
        Votre progression est egalement sauvegardee localement sur votre appareil via SQLite.
      </p>

      <h2>5. Partage des donnees</h2>
      <p>
        Nous ne vendons, ne louons et ne partageons <strong>aucune</strong> de vos donnees
        personnelles avec des tiers a des fins commerciales ou publicitaires.
      </p>
      <p>Vos donnees sont uniquement accessibles a :</p>
      <ul>
        <li>L'equipe Samara Stories, dans le cadre strict du fonctionnement de l'application.</li>
        <li>
          Supabase (sous-traitant), en tant qu'hebergeur de base de donnees, soumis a des
          obligations contractuelles de confidentialite.
        </li>
      </ul>

      <h2>6. Duree de conservation</h2>
      <p>
        Vos donnees sont conservees tant que vous utilisez l'application. Si vous supprimez vos
        donnees via l'application (Profil &rarr; Supprimer mes donnees), elles sont effacees de
        votre appareil et de nos serveurs.
      </p>
      <p>
        En cas d'inactivite prolongee (plus de 24 mois), nous nous reservons le droit de supprimer
        les donnees associees a votre identifiant anonyme.
      </p>

      <h2>7. Vos droits (RGPD)</h2>
      <p>Conformement au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d'acces</strong> &mdash; obtenir une copie de vos donnees.</li>
        <li><strong>Droit de rectification</strong> &mdash; corriger vos informations.</li>
        <li>
          <strong>Droit a l'effacement</strong> &mdash; supprimer vos donnees (disponible
          directement dans l'application via &laquo; Supprimer mes donnees &raquo;).
        </li>
        <li><strong>Droit a la portabilite</strong> &mdash; recevoir vos donnees dans un format structure.</li>
        <li><strong>Droit d'opposition</strong> &mdash; vous opposer au traitement de vos donnees.</li>
        <li>
          <strong>Droit de retrait du consentement</strong> &mdash; retirer votre consentement a
          tout moment (notifications, e-mail, prenom).
        </li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous a :{" "}
        <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a>
      </p>
      <p>
        Vous avez egalement le droit de deposer une reclamation aupres de la{" "}
        <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertes) :{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
      </p>

      <h2>8. Notifications push</h2>
      <p>
        L'application peut vous envoyer des rappels quotidiens de revision. Ces notifications sont
        planifiees localement sur votre appareil. Vous pouvez les desactiver a tout moment dans les
        reglages de votre telephone ou dans l'application.
      </p>

      <h2>9. Mineurs</h2>
      <p>
        L'application est accessible a tous les ages (classee 4+). Aucune donnee sensible n'est
        collectee. Pour les utilisateurs de moins de 16 ans, le consentement du representant legal
        est requis pour la fourniture de l'adresse e-mail.
      </p>

      <h2>10. Cookies et technologies similaires</h2>
      <p>
        L'application mobile n'utilise pas de cookies. Le site web (samara-stories.app) utilise
        uniquement le stockage local du navigateur (localStorage) pour sauvegarder votre preference
        de langue. Aucun cookie de tracking ou publicitaire n'est utilise.
      </p>

      <h2>11. Modifications de cette politique</h2>
      <p>
        Nous pouvons mettre a jour cette politique de confidentialite. En cas de modification
        substantielle, nous vous informerons via l'application. La date de derniere mise a jour est
        indiquee en haut de cette page.
      </p>

      <h2>12. Contact</h2>
      <p>
        Pour toute question relative a cette politique ou a vos donnees personnelles :<br />
        <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a>
      </p>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <p>
        Samara Stories ("we", "our", "the app") is an Arabic language learning app through stories.
        We take the protection of your personal data very seriously. This privacy policy explains
        what data we collect, why, and how we use it, in compliance with the General Data Protection
        Regulation (GDPR).
      </p>

      <h2>1. Data Controller</h2>
      <p>
        Samara Stories<br />
        Contact: <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a>
      </p>

      <h2>2. Data We Collect</h2>

      <h3>2.1 Data you provide voluntarily</h3>
      <ul>
        <li>
          <strong>First name</strong> (optional) &mdash; used to personalize your experience in the
          app.
        </li>
        <li>
          <strong>Email address</strong> (optional) &mdash; used only to contact you if you lose
          your progress.
        </li>
      </ul>

      <h3>2.2 Data collected automatically</h3>
      <ul>
        <li>
          <strong>Anonymous identifier</strong> &mdash; a unique device-generated ID (UUID), not
          linked to your real identity.
        </li>
        <li>
          <strong>Usage data</strong> &mdash; stories opened, words viewed, exercise results,
          learning progress.
        </li>
        <li>
          <strong>Technical information</strong> &mdash; operating system, OS version, device model,
          system language.
        </li>
      </ul>

      <h3>2.3 Data we do NOT collect</h3>
      <ul>
        <li>We do not collect <strong>any advertising identifiers</strong> (IDFA/GAID).</li>
        <li>We do not use <strong>any third-party tracking tools</strong> (no Firebase Analytics, Amplitude, etc.).</li>
        <li>We do not collect <strong>any location data</strong>.</li>
        <li>We do not access <strong>your camera, photos, or contacts</strong>.</li>
      </ul>

      <h2>3. Purpose of Data Processing</h2>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Legal basis (GDPR)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Save and sync your progress</td>
            <td>Performance of contract (Art. 6.1.b)</td>
          </tr>
          <tr>
            <td>Personalize experience (first name)</td>
            <td>Consent (Art. 6.1.a)</td>
          </tr>
          <tr>
            <td>Contact you in case of data loss (email)</td>
            <td>Consent (Art. 6.1.a)</td>
          </tr>
          <tr>
            <td>Improve the app (anonymous statistics)</td>
            <td>Legitimate interest (Art. 6.1.f)</td>
          </tr>
          <tr>
            <td>Send review reminders</td>
            <td>Consent (Art. 6.1.a)</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Data Storage and Security</h2>
      <p>
        Your data is securely stored on <strong>Supabase</strong> servers (hosted in the European
        Union). Communications between the app and our servers are encrypted via HTTPS/TLS.
      </p>
      <p>Your progress is also saved locally on your device via SQLite.</p>

      <h2>5. Data Sharing</h2>
      <p>
        We do not sell, rent, or share <strong>any</strong> of your personal data with third parties
        for commercial or advertising purposes.
      </p>
      <p>Your data is only accessible to:</p>
      <ul>
        <li>The Samara Stories team, strictly for operating the app.</li>
        <li>
          Supabase (data processor), as our database host, bound by contractual confidentiality
          obligations.
        </li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>
        Your data is retained as long as you use the app. If you delete your data via the app
        (Profile &rarr; Delete my data), it is erased from your device and our servers.
      </p>
      <p>
        After prolonged inactivity (more than 24 months), we reserve the right to delete data
        associated with your anonymous identifier.
      </p>

      <h2>7. Your Rights (GDPR)</h2>
      <p>Under the GDPR, you have the following rights:</p>
      <ul>
        <li><strong>Right of access</strong> &mdash; obtain a copy of your data.</li>
        <li><strong>Right to rectification</strong> &mdash; correct your information.</li>
        <li>
          <strong>Right to erasure</strong> &mdash; delete your data (available directly in the app
          via "Delete my data").
        </li>
        <li><strong>Right to data portability</strong> &mdash; receive your data in a structured format.</li>
        <li><strong>Right to object</strong> &mdash; object to the processing of your data.</li>
        <li>
          <strong>Right to withdraw consent</strong> &mdash; withdraw your consent at any time
          (notifications, email, first name).
        </li>
      </ul>
      <p>
        To exercise these rights, contact us at:{" "}
        <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a>
      </p>
      <p>
        You also have the right to lodge a complaint with the{" "}
        <strong>CNIL</strong> (French Data Protection Authority):{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
      </p>

      <h2>8. Push Notifications</h2>
      <p>
        The app may send you daily review reminders. These notifications are scheduled locally on
        your device. You can disable them at any time in your phone settings or in the app.
      </p>

      <h2>9. Children</h2>
      <p>
        The app is suitable for all ages (rated 4+). No sensitive data is collected. For users under
        16, parental consent is required for providing an email address.
      </p>

      <h2>10. Cookies and Similar Technologies</h2>
      <p>
        The mobile app does not use cookies. The website (samara-stories.app) only uses browser
        local storage (localStorage) to save your language preference. No tracking or advertising
        cookies are used.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this privacy policy. In case of substantial changes, we will notify you via
        the app. The last updated date is indicated at the top of this page.
      </p>

      <h2>12. Contact</h2>
      <p>
        For any questions about this policy or your personal data:<br />
        <a href="mailto:contact@samara-stories.app">contact@samara-stories.app</a>
      </p>
    </>
  );
}
