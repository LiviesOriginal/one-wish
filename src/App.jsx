import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FONTS_CSS, STYLE } from "./appStyles.js";
import { grantWish, verdictLabel as defaultVerdict } from "./wishGrant.js";
import {
  loadWishHistory,
  saveWishEntry,
  clearWishHistory,
} from "./storage.js";

function CurvedLogo() {
  return (
    <svg className="oww-logo-svg" viewBox="0 0 460 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="logoArc" d="M 30 110 Q 230 -20 430 110" fill="none" />
        <linearGradient id="bloodGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b32839" />
          <stop offset="50%" stopColor="#8b1820" />
          <stop offset="100%" stopColor="#5e0e15" />
        </linearGradient>
        <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="0" floodColor="#5e0e15" floodOpacity="0.4" />
        </filter>
      </defs>
      <g fill="#8b1820" opacity="0.9">
        <path d="M 18 60 L 21 66 L 27 67 L 22 71 L 24 78 L 18 74 L 12 78 L 14 71 L 9 67 L 15 66 Z" />
        <path d="M 442 60 L 445 66 L 451 67 L 446 71 L 448 78 L 442 74 L 436 78 L 438 71 L 433 67 L 439 66 Z" />
      </g>
      <text
        fill="url(#bloodGrad)"
        fontFamily="'Yeseva One', serif"
        fontSize="42"
        fontStyle="italic"
        textAnchor="middle"
        filter="url(#logoShadow)"
      >
        <textPath href="#logoArc" startOffset="50%">
          One Wish Willow
        </textPath>
      </text>
      <text
        x="230"
        y="135"
        fill="#8b1820"
        fontFamily="'DM Mono', monospace"
        fontSize="10"
        letterSpacing="4"
        textAnchor="middle"
        opacity="0.85"
      >
        ★  ONE WISH PER LIFETIME  ★
      </text>
    </svg>
  );
}

const SEED_COUNT = 32;
const PUFF_CENTER_X = 200;
const PUFF_CENTER_Y = 160;
const PUFF_RADIUS = 70;

function seedPositions() {
  const seeds = [];
  for (let i = 0; i < SEED_COUNT; i++) {
    const angle = i * 2.39996323 + (i % 2 === 0 ? 0 : 0.15);
    const layer = 0.6 + ((i * 7) % 10) / 25;
    const r = PUFF_RADIUS * layer;
    const cx = PUFF_CENTER_X + Math.cos(angle) * r;
    const cy = PUFF_CENTER_Y + Math.sin(angle) * r * 0.95;
    seeds.push({ id: i, angle, cx, cy, layer });
  }
  return seeds;
}

function Dandelion({ stage, scatterMode }) {
  const seeds = useMemo(() => seedPositions(), []);

  const seedTransforms = useMemo(() => {
    return seeds.map((s) => {
      const baseAngle = Math.atan2(s.cy - PUFF_CENTER_Y, s.cx - PUFF_CENTER_X);
      let dx, dy, rot;
      const dist = 600 + Math.random() * 400;

      if (scatterMode === "blow") {
        const windAngle = -Math.PI / 3 + (Math.random() - 0.5) * 0.7;
        dx = Math.cos(windAngle) * dist;
        dy = Math.sin(windAngle) * dist;
        rot = (Math.random() - 0.5) * 540;
      } else if (scatterMode === "shake") {
        const burstAngle = baseAngle + (Math.random() - 0.5) * 0.6;
        dx = Math.cos(burstAngle) * dist * 1.2;
        dy = Math.sin(burstAngle) * dist * 1.2 - 100;
        rot = (Math.random() - 0.5) * 900;
      } else {
        dx = Math.cos(baseAngle) * dist * 0.85;
        dy = Math.sin(baseAngle) * dist * 0.85 - 200;
        rot = (Math.random() - 0.5) * 360;
      }
      const delay = Math.random() * 0.25;
      return { dx, dy, rot, delay };
    });
  }, [scatterMode, seeds]);

  return (
    <svg className="oww-dandy-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a9d5c" />
          <stop offset="50%" stopColor="#5d7d44" />
          <stop offset="100%" stopColor="#3e5a2e" />
        </linearGradient>
        <radialGradient id="receptacle" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#94b56e" />
          <stop offset="100%" stopColor="#4a6b35" />
        </radialGradient>
      </defs>
      <path
        d="M 198 380 Q 196 320 199 270 Q 201 220 200 180"
        stroke="url(#stemGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 199 320 Q 178 314 168 322 Q 180 326 199 322 Z"
        fill="#5d7d44"
        opacity="0.85"
      />
      <path
        d="M 199 290 Q 218 286 226 294 Q 214 297 199 292 Z"
        fill="#5d7d44"
        opacity="0.85"
      />
      <ellipse cx="200" cy="180" rx="8" ry="6" fill="url(#receptacle)" />
      <ellipse cx="200" cy="178" rx="6" ry="4" fill="#3e5a2e" opacity="0.5" />
      {seeds.map((s, i) => {
        const t = seedTransforms[i];
        const gone = stage === "scatter";
        const style = gone
          ? {
              transform: `translate(${t.dx}px, ${t.dy}px) rotate(${t.rot}deg)`,
              transitionDelay: `${t.delay}s`,
            }
          : { transform: "translate(0px, 0px) rotate(0deg)" };
        return (
          <g
            key={s.id}
            className={`oww-seed ${gone ? "gone" : ""}`}
            style={style}
            transform={`translate(${s.cx - PUFF_CENTER_X}, ${s.cy - PUFF_CENTER_Y})`}
          >
            <g transform={`translate(${PUFF_CENTER_X}, ${PUFF_CENTER_Y})`}>
              <line
                x1="0"
                y1="0"
                x2={(s.cx - PUFF_CENTER_X) * 0.95}
                y2={(s.cy - PUFF_CENTER_Y) * 0.95}
                stroke="#d9c896"
                strokeWidth="0.6"
                opacity="0.55"
              />
            </g>
            <g transform={`translate(${s.cx}, ${s.cy})`}>
              {Array.from({ length: 9 }, (_, k) => {
                const a = (k / 9) * Math.PI * 2;
                const len = 8 + (k % 2) * 2;
                return (
                  <line
                    key={k}
                    x1="0"
                    y1="0"
                    x2={Math.cos(a) * len}
                    y2={Math.sin(a) * len}
                    stroke="#fbf3dc"
                    strokeOpacity="0.95"
                    strokeWidth="0.7"
                  />
                );
              })}
              <circle cx="0" cy="0" r="1.2" fill="#8a7b4a" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function normalizeEntry(entry) {
  if (!entry?.wish) return entry;

  const hasFullStory =
    entry.paragraphs?.length === 3 && entry.story?.includes("happily ever after");

  if (hasFullStory) {
    return {
      ...entry,
      tone: "yes",
      verdict: entry.verdict || defaultVerdict(),
    };
  }

  const grant = grantWish(entry.wish);
  return {
    ...entry,
    paragraphs: grant.paragraphs,
    story: grant.story,
    verdict: grant.verdict,
    tone: "yes",
  };
}

function entrySnippet(entry) {
  const norm = normalizeEntry(entry);
  const first = norm.paragraphs[0] || norm.story || "";
  return first.length > 120 ? `${first.slice(0, 117)}…` : first;
}

function App() {
  const [wish, setWish] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [verdict, setVerdict] = useState("");
  const [answerTone, setAnswerTone] = useState("yes");
  const [phase, setPhase] = useState("idle");
  const [scatterMode] = useState("tap");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const wishRef = useRef("");
  const phaseRef = useRef("idle");
  const timersRef = useRef([]);
  const inputRef = useRef(null);
  const storyRef = useRef(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    wishRef.current = wish;
  }, [wish]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    loadWishHistory()
      .then((items) => setHistory(items.map(normalizeEntry)))
      .catch(() => {});
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  function applyGrant(w, grant) {
    setParagraphs(grant.paragraphs);
    setVerdict(grant.verdict);
    setAnswerTone(grant.tone);
    setPhase("story");

    const entry = {
      id: Date.now().toString(),
      wish: w,
      story: grant.story,
      paragraphs: grant.paragraphs,
      verdict: grant.verdict,
      tone: grant.tone,
      ts: Date.now(),
    };

    setHistory((prev) => [entry, ...prev].slice(0, 50));
    saveWishEntry(entry).catch(() => {});

    setTimeout(() => {
      storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  }

  async function trigger() {
    if (phaseRef.current !== "idle") return;
    const w = wishRef.current.trim();
    if (!w) {
      inputRef.current?.focus();
      return;
    }
    setError("");
    clearTimers();
    setPhase("scatter");

    schedule(() => {
      if (phaseRef.current === "scatter") setPhase("loading");
    }, 1700);

    schedule(() => {
      if (phaseRef.current !== "loading" && phaseRef.current !== "scatter") return;
      applyGrant(w, grantWish(w));
    }, 3000);
  }

  async function handleClearHistory() {
    if (!history.length) return;
    if (!window.confirm("Clear all past wishes from this device?")) return;
    await clearWishHistory();
    setHistory([]);
    if (phase === "story") reset();
  }

  function reset() {
    setWish("");
    setParagraphs([]);
    setVerdict("");
    setError("");
    setPhase("idle");
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function viewEntry(entry) {
    const norm = normalizeEntry(entry);
    setWish(norm.wish);
    setParagraphs(norm.paragraphs);
    setVerdict(norm.verdict || "");
    setAnswerTone("yes");
    setPhase("story");
    setDrawerOpen(false);
    setTimeout(() => {
      storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  }

  const dandelionStage = phase === "idle" ? "idle" : "scatter";
  const armed = phase === "idle" && wish.trim().length > 0;

  return (
    <div className="oww-app">
      <style dangerouslySetInnerHTML={{ __html: FONTS_CSS + STYLE }} />
      <div className="oww-paper" />
      <div className="oww-edges" />

      <div className="oww-stage">
        <div className="oww-topbar">
          <div className="oww-brand">
            AMAZE YOUR FRIENDS <span className="pip">●</span> EST. 2026
          </div>
          <button type="button" className="oww-link" onClick={() => setDrawerOpen(true)}>
            Wishes · {history.length}
          </button>
        </div>

        <div className="oww-logo-wrap">
          <CurvedLogo />
        </div>

        <div className="oww-hero">
          <div className="tagline">Every wish a beginning.</div>
          <div className="strap">
            <span className="star">★</span> AS WHISPERED BY THE WILLOW <span className="star">★</span>
          </div>
        </div>

        <div
          className={`oww-dandy-wrap ${armed ? "armed" : ""}`}
          onClick={() => {
            if (phase === "idle" && wish.trim()) trigger();
          }}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && phase === "idle" && wish.trim()) {
              e.preventDefault();
              trigger();
            }
          }}
          role="button"
          tabIndex={armed ? 0 : -1}
          aria-label="Scatter the dandelion and receive your answer"
        >
          <div className="oww-dandy-glow" />
          <Dandelion stage={dandelionStage} scatterMode={scatterMode} />
          {phase === "idle" && wish.trim() && (
            <div className="oww-tap-hint">★ Tap the dandelion ★</div>
          )}
        </div>

        {phase === "idle" && (
          <div className="oww-wish-block">
            <div className="oww-wish-label">Make Your Wish Now</div>
            <div className="oww-wish-sub">
              Ask anything. 
            </div>
            <div className="oww-input-wrap">
              <input
                ref={inputRef}
                className="oww-input"
                type="text"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && trigger()}
                placeholder="Spark the middle and break in half."
                maxLength={280}
                autoFocus
              />
            </div>
            <button type="button" className="oww-cta" onClick={() => trigger()} disabled={!wish.trim()}>
              What will it be? <span className="arrow">→</span>
            </button>
            <div className="oww-fineprint">
              <span className="warn">⚠</span> Once made, a wish cannot be unwished
            </div>
            {error && <div className="oww-error">{error}</div>}
          </div>
        )}

        {phase === "scatter" && (
          <div className="oww-loading">
            <div className="oww-loading-text">your wish is on the wind</div>
            <div className="oww-loading-strap">★ ★ ★</div>
          </div>
        )}

        {phase === "loading" && (
          <div className="oww-loading">
            <div className="oww-loading-text">one wish for a lifetime</div>
            <div className="oww-loading-strap">★ wish in transit ★</div>
          </div>
        )}

        {phase === "story" && (
          <div className="oww-story-card" ref={storyRef}>
            <div className="oww-story-badge">
              <span className="s">★</span> THE WILLOW&apos;S PROMISE <span className="s">★</span>
            </div>
            <div className="oww-story-wish">{wish}</div>
            <div className="oww-story-divider" />
            {verdict && (
              <div className={`oww-verdict oww-verdict--${answerTone}`}>{verdict}</div>
            )}
            <div className="oww-story-body">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="oww-story-actions">
              <button type="button" className="oww-cta" onClick={reset}>
                Ask Again <span className="arrow">→</span>
              </button>
              <button type="button" className="oww-action-secondary" onClick={() => setDrawerOpen(true)}>
                Past Wishes
              </button>
            </div>
          </div>
        )}

        <div className="oww-footer">
          <div className="oww-footer-divider" />
          <div className="oww-footer-line">★ 100% MAGICAL · 0% REAL · BE CAREFUL WHAT YOU WISH FOR ★</div>
          <div className="oww-footer-line muted">Amaze Your Friends · All Wishes Final</div>
        </div>
      </div>

      <div
        className={`oww-drawer-bg ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden={!drawerOpen}
      />
      <aside
        className={`oww-drawer ${drawerOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="oww-drawer-title"
        aria-hidden={!drawerOpen}
      >
        <div className="oww-drawer-head">
          <h2 id="oww-drawer-title" className="oww-drawer-title">
            Wishes you&apos;ve made
          </h2>
          <button
            type="button"
            className="oww-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="oww-drawer-body">
          {history.length > 0 && (
            <button type="button" className="oww-clear-history" onClick={handleClearHistory}>
              Clear all wishes
            </button>
          )}
          {history.length === 0 ? (
            <div className="oww-empty">
              No wishes yet.
              <br />
              The one wish willow waits...
            </div>
          ) : (
            history.map((h) => (
              <div key={h.id} className="oww-entry" onClick={() => viewEntry(h)}>
                <div className="oww-entry-wish">{h.wish}</div>
                <div className="oww-entry-snippet">{entrySnippet(h)}</div>
                <div className="oww-entry-date">{formatDate(h.ts)}</div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}

export default App;
