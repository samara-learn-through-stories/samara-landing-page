import { useEffect, useRef, useMemo } from "react";
import { useLanguage } from "./i18n.jsx";

const ROUTES = [
  "M22,214 C186,168 292,232 500,320",
  "M978,168 C816,150 668,244 500,320",
  "M96,596 C244,540 356,428 500,320",
  "M932,560 C790,532 636,420 500,320",
  "M498,20 C462,116 486,236 500,320",
];

const RIDERS = [
  { path: 0, cls: "r-fa", text: "سُخَن", delay: 0 },
  { path: 1, cls: "r-zh", text: "絲綢", delay: 0.06 },
  { path: 2, cls: "r-ar", text: "حِكاية", delay: 0.03 },
  { path: 3, cls: "r-tr", text: "söz", delay: 0.09 },
  { path: 4, cls: "r-el", text: "λόγος", delay: 0.12 },
];

const STARS = Array.from({ length: 46 }, (_, i) => {
  const s = i % 7 === 0 ? 2.1 : 1.2;
  return {
    key: i,
    style: {
      left: `${(i * 137) % 100}%`,
      top: `${(i * 61) % 88}%`,
      width: `${s}px`,
      height: `${s}px`,
      animationDelay: `${(i % 9) * 0.6}s`,
    },
  };
});

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function CrossroadsStory() {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const mapRef = useRef(null);
  const worldRef = useRef(null);
  const hubRef = useRef(null);
  const nameRef = useRef(null);
  const hintRef = useRef(null);
  const routeRefs = useRef([]);
  const riderRefs = useRef([]);
  const copyRefs = useRef([]);

  const stars = useMemo(() => STARS, []);

  useEffect(() => {
    const map = mapRef.current;
    const world = worldRef.current;
    const track = trackRef.current;
    if (!map || !world || !track) return;

    const routes = routeRefs.current.filter(Boolean);
    const riders = riderRefs.current.filter(Boolean);

    routes.forEach((p) => {
      p.style.setProperty("--len", p.getTotalLength());
    });

    // Keep a fixed 1000×640 coordinate space; scale the whole world to fit.
    // Per-rider transforms fight offset-path on mobile — this avoids that.
    const fit = () => {
      const r = map.getBoundingClientRect();
      const s = Math.min(r.width / 1000, r.height / 640);
      const ox = (r.width - 1000 * s) / 2;
      const oy = (r.height - 640 * s) / 2;
      world.style.transform = `translate(${ox}px,${oy}px) scale(${s})`;
    };

    fit();
    window.addEventListener("resize", fit);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    if (reduced) {
      routes.forEach((el) => el.style.setProperty("--draw", 1));
      riders.forEach((el) => {
        el.style.setProperty("--ride", 1);
        el.style.setProperty("--rop", 0);
      });
      const hub = hubRef.current;
      const name = nameRef.current;
      if (hub) {
        hub.style.setProperty("--cs", 1.8);
        hub.style.setProperty("--ga", 0.41);
        hub.style.setProperty("--gs", 1.17);
        hub.style.setProperty("--rs", 1.05);
        hub.style.setProperty("--ro", 0.8);
        hub.style.opacity = 0.45;
      }
      if (name) {
        name.style.setProperty("--no", 1);
        name.style.setProperty("--ns", 1);
      }
      if (hintRef.current) hintRef.current.style.opacity = 0;
    } else {
      const frame = () => {
        const r = track.getBoundingClientRect();
        const p = clamp(-r.top / (r.height - window.innerHeight));

        routes.forEach((el, i) => {
          el.style.setProperty("--draw", ease(clamp((p - i * 0.018) / 0.3)));
        });

        riders.forEach((el, i) => {
          const delay = RIDERS[i]?.delay ?? 0;
          const t = clamp((p - 0.18 - delay) / 0.44);
          el.style.setProperty("--ride", ease(t));
          el.style.setProperty("--rop", clamp(t * 5) * clamp((1 - t) * 7));
        });

        const conv = ease(clamp((p - 0.3) / 0.38));
        const hub = hubRef.current;
        if (hub) {
          hub.style.setProperty("--cs", 0.3 + conv * 1.5);
          hub.style.setProperty("--ga", 0.07 + conv * 0.34);
          hub.style.setProperty("--gs", 0.55 + conv * 0.62);
          hub.style.setProperty("--rs", 0.5 + conv * 0.55);
          hub.style.setProperty("--ro", conv * 0.8);
          hub.style.setProperty("--rr", `${p * 90}deg`);
        }

        const nm = ease(clamp((p - 0.7) / 0.22));
        const name = nameRef.current;
        if (name) {
          name.style.setProperty("--no", nm);
          name.style.setProperty("--ns", 0.94 + nm * 0.06);
        }
        if (hub) hub.style.opacity = 1 - nm * 0.55;
        if (hintRef.current) hintRef.current.style.opacity = p > 0.04 ? 0 : 0.55;

        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -12% 0px" },
    );
    copyRefs.current.filter(Boolean).forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
      io.observe(el);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      io.disconnect();
    };
  }, []);

  return (
    <section className="origin crossroads" id="origin">
      <div className="xr-track" ref={trackRef}>
        <div className="xr-stage">
          <div className="xr-fade xr-fade-top" aria-hidden="true" />
          <div className="xr-fade xr-fade-bot" aria-hidden="true" />

          <div className="xr-sky" aria-hidden="true">
            {stars.map((s) => (
              <i key={s.key} style={s.style} />
            ))}
          </div>

          <div className="xr-map" ref={mapRef}>
            <div className="xr-world" ref={worldRef}>
              <svg
                viewBox="0 0 1000 640"
                width="1000"
                height="640"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {ROUTES.map((d, i) => (
                  <path
                    key={i}
                    className="xr-route"
                    d={d}
                    ref={(el) => {
                      routeRefs.current[i] = el;
                    }}
                  />
                ))}
              </svg>

              <div className="xr-hub" ref={hubRef}>
                <div className="xr-ring b" />
                <div className="xr-ring" />
                <div className="xr-glow" />
                <div className="xr-core" />
              </div>

              <div className="xr-name" id="xr-name" ref={nameRef}>
                <h2>Samara</h2>
                <div className="xr-sub">{t("origin.sub")}</div>
              </div>

              {RIDERS.map((r, i) => (
                <div
                  key={r.text}
                  className={`xr-rider ${r.cls}`}
                  style={{ offsetPath: `path("${ROUTES[r.path]}")` }}
                  ref={(el) => {
                    riderRefs.current[i] = el;
                  }}
                >
                  <b>{r.text}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="xr-hint" ref={hintRef}>
            {t("origin.hint")}
          </div>
        </div>
      </div>

      <div className="xr-copy">
        <div
          className="kicker xr-ln"
          ref={(el) => {
            copyRefs.current[0] = el;
          }}
        >
          {t("origin.kicker")}
        </div>
        <p>
          <span
            className="xr-ln"
            ref={(el) => {
              copyRefs.current[1] = el;
            }}
          >
            {t("origin.p1")}
          </span>
        </p>
        <p className="xr-last">
          <span
            className="xr-ln"
            ref={(el) => {
              copyRefs.current[2] = el;
            }}
          >
            {t("origin.p2")}
          </span>
        </p>
        <div
          className="rule xr-rule"
          ref={(el) => {
            copyRefs.current[3] = el;
          }}
        >
          <i />
          <b />
          <i />
        </div>
      </div>
    </section>
  );
}
