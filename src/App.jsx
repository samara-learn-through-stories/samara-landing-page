import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Footer from "./Footer.jsx";
import { useLanguage } from "./i18n.jsx";

const GLOSSARY = {
  himar: {
    ar: "الحِمار",
    tr: "al-ḥimār",
    en: "the donkey",
    fr: "l'âne",
  },
  fil: {
    ar: "الفيل",
    tr: "al-fīl",
    en: "the elephant",
    fr: "l'éléphant",
  },
};

const TALLY_URL = `https://tally.so/r/${import.meta.env.VITE_TALLY_FORM_ID || "EkVqAX"}`;


function WaitlistCta({ id }) {
  const { t } = useLanguage();
  return (
    <>
      <a
        className="wl-cta"
        href={TALLY_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("hero.cta")}
      </a>
      <div className="wlnote">
        {id === "hero" ? t("hero.note") : t("final.note")}
      </div>
    </>
  );
}


function FlipWord({ word, wordAr }) {
  const [showAr, setShowAr] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setShowAr((v) => !v), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flip-word">
      <span className={`flip-face${showAr ? " out" : " in"}`}>{word}</span>
      <span className={`flip-face flip-ar${showAr ? " in" : " out"}`}>{wordAr}</span>
    </span>
  );
}

function RevealWrap({ children, className = "", style, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          obs.unobserve(el);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const s = delay ? { ...style, transitionDelay: delay } : style;

  return (
    <div ref={ref} className={`rv ${className}`} style={s}>
      {children}
    </div>
  );
}

function Demo() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState(null);
  const [memorised, setMemorised] = useState({});

  const tap = useCallback((id) => setActive(id), []);
  const g = active ? GLOSSARY[active] : null;
  const meaning = g
    ? locale === "fr"
      ? g.fr
      : locale === "ar"
        ? g.en
        : g.en
    : null;

  const handleMemorise = () => {
    if (!active) return;
    setMemorised((m) => ({ ...m, [active]: true }));
    setTimeout(() => {
      document
        .getElementById("step-remember")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 600);
  };

  return (
    <div className="demo">
      <div className="pic">
        <img src="/lion/s4.webp" alt={t("demo.alt")} />
        <div className="vig" />
        <div className="cap">{t("demo.cap")}</div>
        <div
          className={`spot ${active === "himar" ? "on" : ""}`}
          style={{ left: "47%", top: "45%" }}
          onClick={() => tap("himar")}
        >
          <i />
        </div>
        <div
          className={`spot ${active === "fil" ? "on" : ""}`}
          style={{ left: "86%", top: "43%" }}
          onClick={() => tap("fil")}
        >
          <i />
        </div>
      </div>
      <div className="txt">
        <div className="line">
          {"ثُمَّ تبِعَه "}
          <span
            className={`w ${active === "fil" ? "on" : ""}`}
            onClick={() => tap("fil")}
          >
            {"الفيلُ"}
          </span>
          {" فأبدعَ في الوَصْفِ. وكان مِمَّن حَضر، "}
          <span
            className={`w ${active === "himar" ? "on" : ""}`}
            onClick={() => tap("himar")}
          >
            {"الحِمارُ"}
          </span>
          {
            " الذي أرادَ المُشاركةَ بِالمَديح، فوَقفَ على رِجْلَيْهِ الخَلْفيَّتَيْنِ."
          }
        </div>
        <div className={`glossbar${g ? " active" : ""}`}>
          {g ? (
            <>
              <div className="gl-ar">{g.ar}</div>
              <div className="gl-tx">
                <div className="gl-en">{meaning}</div>
                <div className="gl-tr">/ {g.tr} /</div>
              </div>
              <button
                className={`gl-mem${memorised[active] ? " done" : ""}`}
                onClick={handleMemorise}
              >
                {memorised[active] ? t("demo.memorised") : t("demo.memorise")}
              </button>
            </>
          ) : (
            <div className="gl-hint">{t("demo.hint")}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Spaced-rep card showcase ──────────────────────────── */
function CardShowcase() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState(false);
  const [fireflyFreed, setFireflyFreed] = useState(false);

  const days = useMemo(
    () => [
      { side: "front", label: t("sr.translate"), sub: t("sr.return24") },
      { side: "back", label: t("sr.write"), sub: t("sr.return24") },
      { side: "front", label: t("sr.translate"), sub: t("sr.return24") },
      { side: "back", label: t("sr.write"), sub: t("sr.oneMore") },
      { side: "front", label: t("sr.finalRecall"), sub: null },
    ],
    [t],
  );

  const day = phase <= 4 ? phase + 1 : phase === 5 ? 5 : 0;
  const freed = phase === 5;
  const missed = phase === 6;
  const info = phase <= 4 ? days[phase] : null;
  const isBack = info?.side === "back";

  useEffect(() => {
    setTyped(false);
    setFireflyFreed(false);
    const t1 = setTimeout(() => setTyped(true), 1000);
    const t2 =
      phase === 4 ? setTimeout(() => setFireflyFreed(true), 2000) : null;
    const dur = [2800, 2500, 2500, 2500, 3200, 3800, 3600];
    const tNext = setTimeout(() => setPhase((p) => (p + 1) % 7), dur[phase]);
    return () => {
      clearTimeout(t1);
      if (t2) clearTimeout(t2);
      clearTimeout(tNext);
    };
  }, [phase]);

  return (
    <div className="sr">
      <div className={`sr-card-wrap${missed ? " missed" : ""}`}>
        <div className="fc-scene">
          <div
            className={`fc-card${isBack ? " flipped" : ""}${missed ? " missed" : ""}`}
            onClick={() => setPhase((p) => (p + 1) % 7)}
          >
            <div className="fc-face fc-front">
              <div className="fc-side-label">{t("sr.translate")}</div>
              <div className="fc-ar">أَسَد</div>
              <div className="fc-tr">/ asad /</div>
              <div className={`fc-input${typed && !isBack ? " typed" : ""}`}>
                {typed && !isBack ? "lion" : t("sr.typeMeaning")}
              </div>
            </div>
            <div className="fc-face fc-back">
              <div className="fc-side-label">{t("sr.write")}</div>
              <div className="fc-en">lion</div>
              <div className="fc-tr">/ asad /</div>
              <div
                className={`fc-input${typed && isBack ? " typed" : ""}`}
                style={{
                  direction: "rtl",
                  fontFamily: "'Amiri', serif",
                  fontSize: "20px",
                }}
              >
                {typed && isBack ? "أسد" : t("sr.typeArabic")}
              </div>
            </div>
          </div>
        </div>

        {freed && (
          <div className="sr-fly">
            <img src="/logo.png" alt="" width="44" height="44" />
          </div>
        )}
      </div>

      <div className="sr-dots">
        {[1, 2, 3, 4, 5].map((d) => (
          <div
            key={d}
            className={`sr-dot${d <= day ? " lit" : ""}${d === day && !freed && !missed ? " now" : ""}${freed && d === 5 ? " burst" : ""}`}
            onClick={() => setPhase(d - 1)}
          >
            {d}
          </div>
        ))}
      </div>

      <div
        className={`sr-label${freed ? " gold" : ""}${missed ? " red" : ""}`}
        key={phase}
      >
        {freed
          ? t("sr.freed")
          : missed
            ? t("sr.missed")
            : t("sr.dayLabel", { n: day, label: info?.label })}
      </div>
      {info?.sub && !freed && !missed && (
        <div className="sr-sub" key={`sub${phase}`}>
          {info.sub}
        </div>
      )}
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

function Nav() {
  const { t } = useLanguage();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setStuck(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className={`nav-float${stuck ? " stuck" : ""}`}>
      <div className={`nav-pill${open ? " open" : ""}`}>
        <a href="#" className="nav-brand" onClick={close}>
          <img src="/logo.png" alt="Samara" width="26" height="26" />
          <span>Samara</span>
        </a>
        <div className={`nav-links${open ? " open" : ""}`}>
          <a href="#method" onClick={close}>
            {t("nav.method")}
          </a>
          <a href="#stories" onClick={close}>
            {t("nav.stories")}
          </a>
          <a href="#origin" onClick={close}>
            {t("nav.origin")}
          </a>
        </div>
        <a
          href={TALLY_URL}
          className="nav-cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          {t("nav.cta")}
        </a>
        <button
          className={`nav-burger${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={t("nav.menu")}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && <div className="nav-backdrop" onClick={close} />}
    </nav>
  );
}

export default function App() {
  const { t, locale } = useLanguage();
  const isFr = locale === "fr";

  return (
    <>
      <Nav />

      {/* Hero */}
      <header className="hero-bg">
        <div className="hero-overlay" />
        <div className="hero wrap">
          <RevealWrap>
            <h1 className="h1">
              {t("hero.title.1").split("\n").map((l, i) => (
                <span key={i}>{l}<br /></span>
              ))}
              <FlipWord word={t("hero.title.2")} wordAr={t("hero.title.2ar")} />
            </h1>
            <p className="hero-lede">
              {t("hero.lede").split("\n").map((l, i) => (
                <span key={i}>{l}<br /></span>
              ))}
            </p>
            <div className="hero-actions">
              <a className="hero-cta" href={TALLY_URL} target="_blank" rel="noopener noreferrer">
                {t("hero.cta")} <span aria-hidden="true">&rarr;</span>
              </a>
              <div className="hero-badges">
                <div className="store-badge soon" aria-label="App Store">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none"><path d="M16.5 20.3c-.9 1.3-1.9 2.6-3.3 2.6-1.5 0-1.9-1-3.6-1s-2.2 1-3.5 1c-1.5.1-2.6-1.4-3.6-2.7C.6 17.3-.5 13.2.8 10.4c.9-1.9 2.5-3.1 4.2-3.1 1.5 0 2.5 1 3.6 1s2-1 3.8-1c1.3 0 2.8.7 3.7 2-3.2 1.8-2.7 6.4.5 7.6-.6 1.6-1.3 3-2.1 4.4zM13.2 4.7C14 3.7 14.5 2.4 14.4 1c-1.3.1-2.8.9-3.7 2-.8.9-1.5 2.3-1.3 3.6 1.4.1 2.9-.7 3.8-1.9z" fill="currentColor"/></svg>
                  <div><small>{isFr ? "Bientôt sur" : "Coming soon on"}</small><strong>{isFr ? "l'App Store" : "App Store"}</strong></div>
                </div>
                <div className="store-badge soon" aria-label="Google Play">
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none"><path d="M.6.4L11.2 11 .6 21.6c-.4-.3-.6-.8-.6-1.4V1.8C0 1.2.2.7.6.4z" fill="#4285F4"/><path d="M14.8 7.5L11.2 11l3.6 3.5 4-2.3c.7-.4.7-1 0-1.4l-4-2.3z" fill="#FBBC04"/><path d="M.6 21.6L11.2 11l3.6 3.5-11.8 6.8c-.4.2-.9.3-1.4.2-.4 0-.7-.3-1-.9z" fill="#EA4335"/><path d="M.6.4C.9.1 1.2 0 1.6 0c.5 0 .9.1 1.2.3l11.8 6.8L11.2 11 .6.4z" fill="#34A853"/></svg>
                  <div><small>{isFr ? "Bientôt sur" : "Coming soon on"}</small><strong>Google Play</strong></div>
                </div>
              </div>
            </div>
          </RevealWrap>
        </div>
      </header>

      {/* Transition */}
      <div className="hero-transition">
        <div className="rule"><i /><b /><i /></div>
      </div>

      {/* Phone Showcase */}
      <section className="showcase" id="method">
        {/* Step 1 — 3 phones */}
        <div className="sc-step">
          <RevealWrap className="sc-text">
            <div className="sc-num-row">
              <span className="sc-num">01</span>
              <span className="sc-kicker">{isFr ? "LA MÉTHODE" : "THE METHOD"}</span>
            </div>
            <h3 className="sc-title">{isFr ? "Lis." : "Read."}</h3>
            <p className="sc-body">
              {isFr
                ? "Des histoires courtes issues de la tradition arabe ancienne, contes et fables, adaptées à ton niveau de lecture."
                : "Short stories from the ancient Arabic tradition, tales and fables, adapted to your reading level."}
            </p>
            <p className="sc-cta">{isFr ? "Découvrir la méthode" : "Discover the method"} &rarr;</p>
          </RevealWrap>
          <RevealWrap className="sc-phone-wrap sc-hero-img">
            <img src="/demo/1-lis.png" alt="" className="sc-demo-img" />
          </RevealWrap>
        </div>

        {/* Steps 2-4 */}
        {[
          {
            num: "02",
            kicker: isFr ? "COMPRÉHENSION" : "COMPREHENSION",
            title: isFr ? "Découvre." : "Discover.",
            body: isFr
              ? "Touche un mot pour voir son sens, sa translittération et l'entendre."
              : "Tap a word to see its meaning, transliteration and hear it.",
            cta: isFr ? "Voir un aperçu" : "See a preview",
            screen: "/demo/2-discover.mp4",
            isVideo: true,
          },
          {
            num: "03",
            kicker: isFr ? "MÉMO" : "MEMO",
            title: isFr ? "Mémorise." : "Memorize.",
            body: isFr
              ? "Reviens 24h plus tard, tous les jours pendant 5 jours. Un jour la traduction, l'autre écris en arabe."
              : "Come back 24h later, every day for 5 days. One day the translation, the next write in Arabic.",
            cta: isFr ? "En savoir plus" : "Learn more",
            screen: "/demo/3-memorize.mp4",
            isVideo: true,
          },
          {
            num: "04",
            kicker: isFr ? "ANCRAGE" : "ANCHORING",
            title: isFr ? "Ancre." : "Anchor.",
            body: isFr
              ? "Révise chaque jour avec des exercices courts. En 5 jours, le mot est à toi."
              : "Review daily with short exercises. In 5 days, the word is yours.",
            cta: isFr ? "Commencer" : "Get started",
            screen: "/demo/4-ancre.png",
          },
        ].map((step, i) => (
          <div className="sc-step" key={i}>
            <RevealWrap className="sc-text">
              <div className="sc-num-row">
                <span className="sc-num">{step.num}</span>
                <span className="sc-kicker">{step.kicker}</span>
              </div>
              <h3 className="sc-title">{step.title}</h3>
              <p className="sc-body">{step.body}</p>
              <p className="sc-cta">{step.cta} &rarr;</p>
            </RevealWrap>
            <RevealWrap className="sc-phone-wrap" delay={`.${i > 0 ? 2 : 1}s`}>
              {step.isVideo ? (
                <div className="sc-phone">
                  <video
                    src={step.screen}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              ) : (
                <div className="sc-phone">
                  <img src={step.screen} alt={step.title} />
                </div>
              )}
            </RevealWrap>
          </div>
        ))}
      </section>

      {/* Origin */}
      <section className="origin-simple" id="origin">
        <div className="wrap">
          <RevealWrap>
            <div className="kicker">{t("origin.kicker")}</div>
            <p className="origin-body">{t("origin.p1")}</p>
          </RevealWrap>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final" id="join">
        <div className="wrap inner">
          <RevealWrap>
            <h2
              className="stitle"
              style={{ fontSize: "clamp(30px,4.4vw,50px)" }}
            >
              {t("final.title.1")} <em>{t("final.title.2")}</em>
            </h2>
            <div className="wl" style={{ marginTop: 34 }}>
              <WaitlistCta id="final" />
            </div>
          </RevealWrap>
        </div>
      </section>

      <Footer />
    </>
  );
}
