import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CrossroadsStory from "./CrossroadsStory.jsx";

const GLOSSARY = {
  himar: {
    ar: "الحِمار",
    tr: "al-ḥimār",
    en: "the donkey",
  },
  fil: {
    ar: "الفيل",
    tr: "al-fīl",
    en: "the elephant",
  },
};

const TALLY_URL = `https://tally.so/r/${import.meta.env.VITE_TALLY_FORM_ID || "EkVqAX"}`;

function WaitlistCta({ id }) {
  return (
    <>
      <a
        className="wl-cta"
        href={TALLY_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Request an invite
      </a>
      <div className="wlnote">
        {id === "hero"
          ? "We're opening in small circles. Request an invite to Samara."
          : "No spam. One email when your invite is ready."}
      </div>
    </>
  );
}

function Motes() {
  const motes = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const s = 1.4 + Math.random() * 2.2;
        return {
          key: i,
          style: {
            left: `${6 + Math.random() * 88}%`,
            bottom: `${-4 + Math.random() * 22}%`,
            width: `${s}px`,
            height: `${s}px`,
            animationDuration: `${11 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 14}s`,
            opacity: 0,
          },
        };
      }),
    [],
  );

  return (
    <div>
      {motes.map((m) => (
        <div key={m.key} className="mote" style={m.style} />
      ))}
    </div>
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
  const [active, setActive] = useState(null);
  const [memorised, setMemorised] = useState({});

  const tap = useCallback((id) => setActive(id), []);
  const g = active ? GLOSSARY[active] : null;

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
        <img
          src="/lion/s4.webp"
          alt="The donkey rises before the lion's court"
        />
        <div className="vig" />
        <div className="cap">Book III &middot; The Lion&apos;s Court</div>
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
                <div className="gl-en">{g.en}</div>
                <div className="gl-tr">/ {g.tr} /</div>
              </div>
              <button
                className={`gl-mem${memorised[active] ? " done" : ""}`}
                onClick={handleMemorise}
              >
                {memorised[active] ? "✓" : "Memorise"}
              </button>
            </>
          ) : (
            <div className="gl-hint">Tap an underlined word.</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Spaced-rep card showcase ──────────────────────────── */
const SR_DAYS = [
  { side: "front", label: "see Arabic, type meaning", sub: "return in 24h" },
  { side: "back", label: "see meaning, type Arabic", sub: "return in 24h" },
  { side: "front", label: "Arabic → meaning", sub: "return in 24h" },
  { side: "back", label: "meaning → Arabic", sub: "one more day" },
  { side: "front", label: "final recall", sub: null },
];

function CardShowcase() {
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState(false);
  const [fireflyFreed, setFireflyFreed] = useState(false);

  const day = phase <= 4 ? phase + 1 : phase === 5 ? 5 : 0;
  const freed = phase === 5;
  const missed = phase === 6;
  const info = phase <= 4 ? SR_DAYS[phase] : null;
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
      {/* 3D card */}
      <div className={`sr-card-wrap${missed ? " missed" : ""}`}>
        <div className="fc-scene">
          <div
            className={`fc-card${isBack ? " flipped" : ""}${missed ? " missed" : ""}`}
            onClick={() => setPhase((p) => (p + 1) % 7)}
          >
            <div className="fc-face fc-front">
              <div className="fc-side-label">front</div>
              <div className="fc-ar">أَسَد</div>
              <div className="fc-tr">/ asad /</div>
              <div className={`fc-input${typed && !isBack ? " typed" : ""}`}>
                {typed && !isBack ? "lion" : "type the meaning\u2026"}
              </div>
            </div>
            <div className="fc-face fc-back">
              <div className="fc-side-label">back</div>
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
                {typed && isBack ? "أسد" : "اكتب…"}
              </div>
            </div>
          </div>
        </div>

        {/* yaraa escaping on day 5 */}
        {freed && (
          <div className="sr-fly">
            <img src="/yaraa.svg" alt="" width="44" height="44" />
          </div>
        )}
      </div>

      {/* day dots */}
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

      {/* label */}
      <div
        className={`sr-label${freed ? " gold" : ""}${missed ? " red" : ""}`}
        key={phase}
      >
        {freed
          ? "Word memorised — Yaraa is free"
          : missed
            ? "48h without practice — the word fades"
            : `Day ${day} · ${info?.label}`}
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
          <img src="/yaraa.svg" alt="Yaraa" width="24" height="26" />
          <span>Samara</span>
        </a>
        <div className={`nav-links${open ? " open" : ""}`}>
          <a href="#method" onClick={close}>
            Method
          </a>
          <a href="#stories" onClick={close}>
            Stories
          </a>
          <a href="#origin" onClick={close}>
            Origin
          </a>
        </div>
        <a
          href={TALLY_URL}
          className="nav-cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          Join waitlist
        </a>
        <button
          className={`nav-burger${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
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
  return (
    <>
      <Nav />

      {/* Hero */}
      <header>
        <svg
          className="arch"
          viewBox="0 0 760 520"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M150,520 L150,236 Q150,66 380,66 Q610,66 610,236 L610,520"
            stroke="#cdb898"
            strokeWidth="1.8"
            strokeOpacity=".52"
          />
          <path
            d="M186,520 L186,250 Q186,104 380,104 Q574,104 574,250 L574,520"
            stroke="#cdb898"
            strokeWidth="1.1"
            strokeOpacity=".28"
          />
          <path
            d="M222,520 L222,264 Q222,142 380,142 Q538,142 538,264 L538,520"
            stroke="#cdb898"
            strokeWidth=".8"
            strokeOpacity=".15"
          />
          <path
            d="M380,44 l3.4,9 l9,3.4 l-9,3.4 l-3.4,9 l-3.4,-9 l-9,-3.4 l9,-3.4 Z"
            fill="#cdb898"
            fillOpacity=".62"
          />
        </svg>
        <div className="doorlight" />
        <Motes />
        <div className="hero wrap">
          <RevealWrap>
            <h1 className="h1">
              Learn Arabic
              <br />
              <em>through stories.</em>
            </h1>
            <p className="lede">
              Read illustrated tales, tap the words you want to keep, and lock
              them into memory.
            </p>

            <div className="wl">
              <WaitlistCta id="hero" />
            </div>
          </RevealWrap>
        </div>
      </header>

      {/* Method — one continuous evening */}
      <section className="method" id="method">
        <div className="wrap">
          <RevealWrap className="method-intro center">
            <div className="kicker">the method</div>
            <h2 className="stitle">
              Read, Learn, Repeat.
              <br /> <em>When you're ready.</em>
            </h2>
          </RevealWrap>

          {/* 1 · Read */}
          <div className="method-stage">
            <RevealWrap className="method-copy">
              <div className="method-step">
                <span className="method-num" aria-hidden="true">
                  1
                </span>
                <div className="method-when">read</div>
              </div>
              <h3 className="method-title">
                Tap a word.
                <br />
                <em>Get its meaning.</em>
              </h3>
              <p className="method-body">
                Tap any word in the story. A card appears with the meaning,
                transliteration, and a button to memorise it.
              </p>
              <p className="method-try">Try it &rarr;</p>
            </RevealWrap>
            <RevealWrap>
              <Demo />
            </RevealWrap>
          </div>

          {/* 2 · Remember */}
          <div className="method-stage method-stage-memory" id="step-remember">
            <RevealWrap className="method-copy method-copy-wide">
              <div className="method-step method-step-center">
                <span className="method-num" aria-hidden="true">
                  2
                </span>
                <div className="method-when">remember</div>
              </div>
              <h3 className="method-title">
                Five days to <em>own a word.</em>
              </h3>
              <p className="method-body method-body-center">
                Tapped words become flashcards. Five correct answers across five
                days, and it&apos;s yours.
              </p>
            </RevealWrap>
            <RevealWrap>
              <CardShowcase />
            </RevealWrap>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="center" id="stories">
        <div className="wrap">
          <RevealWrap>
            <div className="kicker">the library</div>
            <h2 className="stitle">
              Tales worth <em>the trouble of reading.</em>
            </h2>
          </RevealWrap>
          <div className="books">
            <RevealWrap>
              <TiltCard className="book">
                <img
                  src="/grocer/s1.webp"
                  alt="The child enters the grocer's shop"
                />
                <div className="sh" />
                <div className="tag">Book I &middot; beginner</div>
                <div className="lb">
                  <div className="a">الوَلَدُ والبَقَّال</div>
                  <div className="t">The Child and the Grocer</div>
                  <div className="m">6 pages &middot; 22 words</div>
                </div>
              </TiltCard>
            </RevealWrap>
            <RevealWrap delay=".1s">
              <TiltCard className="book">
                <img src="/juha/s1.webp" alt="Juha walks at midnight" />
                <div className="sh" />
                <div className="tag">Book II &middot; beginner</div>
                <div className="lb">
                  <div className="a">جُحا والشُّرطِيّ</div>
                  <div className="t">Juha and the Officer</div>
                  <div className="m">6 pages &middot; 29 words</div>
                </div>
              </TiltCard>
            </RevealWrap>
            <RevealWrap delay=".2s">
              <TiltCard className="book">
                <img src="/lion/s8.webp" alt="The lion holds court" />
                <div className="sh" />
                <div className="tag">Book III &middot; intermediate</div>
                <div className="lb">
                  <div className="a">لا يمدح الأسد إلا أسد</div>
                  <div className="t">The Lion&apos;s Court</div>
                  <div className="m">9 pages &middot; 27 words</div>
                </div>
              </TiltCard>
            </RevealWrap>
          </div>
        </div>
      </section>

      {/* The Name — scroll story */}
      <CrossroadsStory />

      {/* Final CTA */}
      <section className="final" id="join">
        <div className="wrap inner">
          <RevealWrap>
            <h2
              className="stitle"
              style={{ fontSize: "clamp(30px,4.4vw,50px)" }}
            >
              Join the <em>first circle.</em>
            </h2>
            <div className="wl" style={{ marginTop: 34 }}>
              <WaitlistCta id="final" />
            </div>
          </RevealWrap>
        </div>
      </section>

      <footer>
        <div className="foot-float">
          <div className="foot-pill">
            <div className="foot-brand">
              <img src="/yaraa.svg" alt="" width="20" height="22" />
              <span>Samara</span>
              <em>سمرة</em>
            </div>
            <div className="foot-sep" aria-hidden="true" />
            <p className="foot-tag">learn Arabic through stories</p>
          </div>
        </div>
      </footer>
    </>
  );
}
