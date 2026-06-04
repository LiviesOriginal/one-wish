export const FONTS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&family=Alfa+Slab+One&family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
`;

export const STYLE = `
:root {
  --cream: #f7ebd0;
  --cream-soft: #f1e0b8;
  --cream-deep: #e6d29a;
  --paper: #fbf3dc;
  --paper-edge: #d9c89a;
  --blood: #8b1820;
  --blood-deep: #5e0e15;
  --blood-bright: #b32839;
  --ember: #c93a3a;
  --gold: #b9892d;
  --ink: #2a0a0d;
  --ink-soft: #4a1a1f;
  --stem: #6b8e4e;
  --stem-deep: #4a6b35;
}

* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

html, body, #root {
  margin: 0; padding: 0; min-height: 100vh;
  background: var(--cream); color: var(--ink);
  font-family: 'DM Sans', sans-serif;
  overflow-x: hidden;
}

.oww-app {
  min-height: 100vh; position: relative;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, var(--paper), transparent 60%),
    radial-gradient(ellipse 100% 60% at 50% 100%, var(--cream-deep), transparent 60%),
    var(--cream);
  overflow: hidden;
}

.oww-paper {
  position: fixed; inset: 0; pointer-events: none; z-index: 1;
  opacity: 0.22; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.oww-edges {
  position: fixed; inset: 0; pointer-events: none; z-index: 2;
  background:
    radial-gradient(ellipse at center, transparent 55%, rgba(139, 24, 32, 0.08) 100%);
}

.oww-stage {
  position: relative; z-index: 5;
  max-width: 560px; margin: 0 auto;
  padding: 18px 18px 60px;
  display: flex; flex-direction: column; min-height: 100vh;
}

.oww-topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 0 12px;
  border-bottom: 2px solid var(--blood);
}
.oww-brand {
  font-family: 'DM Mono', monospace;
  font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--blood);
}
.oww-brand .pip { color: var(--ember); margin: 0 4px; }
.oww-link {
  background: transparent; border: 2px solid var(--blood);
  color: var(--blood); font-family: 'DM Mono', monospace;
  font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase;
  padding: 6px 10px; cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}
.oww-link:hover { background: var(--blood); color: var(--cream); }
.oww-link:focus-visible,
.oww-cta:focus-visible,
.oww-action-secondary:focus-visible,
.oww-close:focus-visible,
.oww-clear-history:focus-visible {
  outline: 2px solid var(--blood-bright);
  outline-offset: 2px;
}
.oww-input:focus-visible {
  outline: 2px solid var(--blood-bright);
  outline-offset: 2px;
}
.oww-dandy-wrap:focus-visible {
  outline: 2px solid var(--blood);
  outline-offset: 4px;
  border-radius: 4px;
}

.oww-logo-wrap { display: flex; justify-content: center; margin-top: 18px; }
.oww-logo-svg { width: 100%; max-width: 460px; height: auto; }

.oww-hero { text-align: center; margin-top: 2px; }
.oww-hero .tagline {
  font-family: 'Yeseva One', serif;
  font-size: clamp(18px, 5vw, 24px);
  color: var(--blood-deep); font-style: italic;
}
.oww-hero .strap {
  font-family: 'DM Mono', monospace;
  font-size: 10px; letter-spacing: 0.42em; text-transform: uppercase;
  color: var(--blood); margin-top: 6px;
}
.oww-hero .strap .star { color: var(--ember); margin: 0 8px; }

.oww-dandy-wrap {
  position: relative; margin: 6px auto 0;
  width: 100%; max-width: 360px; aspect-ratio: 1 / 1;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}
.oww-dandy-wrap.armed { animation: sway 5s ease-in-out infinite; }
@keyframes sway {
  0%, 100% { transform: rotate(-1deg); }
  50% { transform: rotate(1deg); }
}
.oww-dandy-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 38%, rgba(247, 235, 208, 0.85), transparent 50%);
  filter: blur(20px);
  animation: breathe 5s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { opacity: 0.55; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
}
.oww-dandy-svg { width: 100%; height: 100%; position: relative; z-index: 2; }

.oww-seed {
  transition: transform 2.6s cubic-bezier(0.16, 0.85, 0.3, 1), opacity 2.4s ease-out;
  transform-origin: 200px 160px;
  will-change: transform, opacity;
}
.oww-seed.gone { opacity: 0; }

.oww-tap-hint {
  position: absolute; bottom: 4%; left: 50%; transform: translateX(-50%);
  font-family: 'DM Mono', monospace;
  font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--blood); opacity: 0.55;
  pointer-events: none; white-space: nowrap;
}

.oww-wish-block {
  margin-top: 14px; padding: 22px 18px;
  text-align: center;
  border-top: 3px double var(--blood);
  border-bottom: 3px double var(--blood);
  background: linear-gradient(180deg, rgba(251, 243, 220, 0.5) 0%, rgba(251, 243, 220, 0) 100%);
}
.oww-wish-label {
  font-family: 'Alfa Slab One', serif;
  font-size: clamp(30px, 7.5vw, 48px);
  color: var(--blood);
  text-transform: uppercase;
  text-shadow: 1px 1px 0 var(--cream-deep), 2px 2px 0 var(--cream-deep),
    3px 3px 0 var(--blood-deep), 4px 4px 0 var(--blood-deep);
  margin-bottom: 4px; line-height: 1.05;
}
.oww-wish-sub {
  font-family: 'Yeseva One', serif; font-style: italic;
  font-size: 15px; color: var(--ink-soft);
  margin: 12px 0 22px;
}
.oww-input-wrap { position: relative; max-width: 480px; margin: 0 auto; }
.oww-input {
  width: 100%; background: var(--paper);
  border: 2px solid var(--blood); border-radius: 2px;
  color: var(--ink);
  font-family: 'DM Serif Display', serif; font-style: italic;
  font-size: 22px; padding: 14px 18px; text-align: center;
  outline: none;
  box-shadow: 0 3px 0 var(--blood-deep), 0 6px 16px rgba(139, 24, 32, 0.15);
}
.oww-input::placeholder { color: rgba(74, 26, 31, 0.35); }
.oww-input:focus { border-color: var(--blood-deep); background: var(--cream); }

.oww-cta {
  display: block; margin: 22px auto 0;
  background: linear-gradient(180deg, var(--blood-bright) 0%, var(--blood) 60%, var(--blood-deep) 100%);
  color: var(--cream);
  font-family: 'Alfa Slab One', serif;
  font-size: 18px; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 16px 28px;
  border: 2px solid var(--blood-deep); border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 4px 0 var(--blood-deep), 0 8px 20px rgba(139, 24, 32, 0.3);
  transition: all 0.15s ease;
}
.oww-cta:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 var(--blood-deep), 0 10px 26px rgba(139, 24, 32, 0.4);
}
.oww-cta:active:not(:disabled) {
  transform: translateY(3px);
  box-shadow: 0 1px 0 var(--blood-deep), 0 3px 8px rgba(139, 24, 32, 0.25);
}
.oww-cta:disabled { opacity: 0.45; cursor: not-allowed; }
.oww-cta .arrow { display: inline-block; margin-left: 8px; }

.oww-fineprint {
  font-family: 'DM Mono', monospace;
  font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--blood-deep); opacity: 0.75; margin-top: 16px;
}
.oww-fineprint .warn { color: var(--ember); margin-right: 6px; }

.oww-error {
  margin-top: 14px; padding: 12px;
  border: 2px solid var(--ember);
  background: rgba(201, 58, 58, 0.08);
  color: var(--blood-deep);
  font-size: 14px;
}

.oww-loading { text-align: center; padding: 28px 16px; }
.oww-loading-text {
  font-family: 'Yeseva One', serif; font-style: italic;
  font-size: 22px; color: var(--blood);
}
.oww-loading-text::after {
  content: '...';
  display: inline-block; width: 1.6em; text-align: left;
  animation: dots 1.4s infinite;
}
@keyframes dots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}
.oww-loading-strap {
  margin-top: 10px;
  font-family: 'DM Mono', monospace;
  font-size: 9.5px; letter-spacing: 0.32em; text-transform: uppercase;
  color: var(--blood-deep); opacity: 0.7;
}

.oww-story-card {
  margin-top: 18px;
  background: var(--paper);
  border: 3px solid var(--blood);
  padding: 28px 22px 22px;
  box-shadow: 0 6px 0 var(--blood-deep), 0 14px 32px rgba(139, 24, 32, 0.2);
  position: relative;
  opacity: 0;
  transform: translateY(24px);
  animation: rise 1s 0.3s ease forwards;
}
@keyframes rise { to { opacity: 1; transform: translateY(0); } }
.oww-story-card::before {
  content: ''; position: absolute; inset: -3px;
  border: 1px solid var(--blood-deep);
  pointer-events: none; opacity: 0.5; margin: 4px;
}
.oww-story-badge {
  display: inline-block;
  background: var(--blood); color: var(--cream);
  font-family: 'Alfa Slab One', serif;
  font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
  padding: 6px 14px;
  box-shadow: 0 3px 0 var(--blood-deep);
  position: absolute;
  top: -16px; left: 50%; transform: translateX(-50%);
  white-space: nowrap;
}
.oww-story-badge .s { color: var(--cream-deep); margin: 0 6px; }

.oww-story-wish {
  text-align: center;
  font-family: 'Yeseva One', serif; font-style: italic;
  font-size: 19px; color: var(--blood-deep);
  margin: 6px 0 16px; line-height: 1.35; padding: 0 8px;
}
.oww-story-wish::before { content: '\\201C'; color: var(--blood); margin-right: 4px; }
.oww-story-wish::after { content: '\\201D'; color: var(--blood); margin-left: 4px; }

.oww-story-divider {
  margin: 0 auto 18px;
  width: 100px; height: 14px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 14'%3E%3Cpath d='M0 7 L40 7 M60 7 L100 7' stroke='%238b1820' stroke-width='1.5'/%3E%3Cpath d='M50 1 L53 5 L58 7 L53 9 L50 13 L47 9 L42 7 L47 5 Z' fill='%238b1820'/%3E%3C/svg%3E") center/contain no-repeat;
}

.oww-verdict {
  text-align: center;
  margin: 0 0 20px;
  font-family: 'DM Mono', monospace;
  font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
}
.oww-verdict--yes { color: var(--stem-deep); }
.oww-verdict--maybe { color: var(--blood); }
.oww-verdict--no { color: var(--ink-soft); }

.oww-story-body {
  font-family: 'DM Serif Display', serif;
  font-size: 18px; line-height: 1.62;
  color: var(--ink); text-align: left;
}
.oww-story-body p {
  margin: 0 0 14px;
  opacity: 0;
  animation: fade-up 0.9s ease forwards;
}
.oww-story-body p:nth-child(1) { animation-delay: 0.2s; }
.oww-story-body p:nth-child(2) { animation-delay: 0.9s; }
.oww-story-body p:nth-child(3) { animation-delay: 1.6s; }
.oww-story-body p:last-child { margin-bottom: 0; }
@keyframes fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.oww-story-body p:first-child::first-letter {
  font-family: 'Yeseva One', serif;
  font-size: 2.8em; line-height: 0.9; float: left;
  margin: 4px 8px -2px 0; color: var(--blood); font-style: italic;
}

.oww-story-actions {
  display: flex; gap: 10px; justify-content: center;
  margin-top: 24px; flex-wrap: wrap;
}
.oww-story-actions .oww-cta { margin: 0; }
.oww-action-secondary {
  background: transparent; border: 2px solid var(--blood);
  color: var(--blood);
  font-family: 'DM Mono', monospace;
  font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
  padding: 12px 16px; cursor: pointer;
  transition: all 0.2s ease;
}
.oww-action-secondary:hover { background: var(--blood); color: var(--cream); }

.oww-drawer-bg {
  position: fixed; inset: 0; z-index: 20;
  background: rgba(42, 10, 13, 0.5); backdrop-filter: blur(4px);
  opacity: 0; pointer-events: none;
  transition: opacity 0.4s ease;
}
.oww-drawer-bg.open { opacity: 1; pointer-events: auto; }
.oww-drawer {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: min(440px, 92vw); z-index: 21;
  background: var(--paper);
  border-left: 3px solid var(--blood);
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex; flex-direction: column;
}
.oww-drawer.open { transform: translateX(0); }
.oww-drawer-head {
  padding: 20px 22px 16px;
  border-bottom: 2px solid var(--blood);
  display: flex; justify-content: space-between; align-items: center;
}
.oww-drawer-title {
  font-family: 'Yeseva One', serif; font-style: italic;
  font-size: 22px; color: var(--blood); margin: 0;
}
.oww-close {
  background: transparent; border: none; color: var(--blood);
  font-size: 28px; cursor: pointer; line-height: 1;
}
.oww-close:hover { color: var(--blood-deep); }
.oww-clear-history {
  display: block;
  width: 100%;
  margin: 12px 0 8px;
  padding: 10px 12px;
  background: transparent;
  border: 1px dashed var(--blood);
  color: var(--blood-deep);
  font-family: 'DM Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
}
.oww-clear-history:hover {
  background: rgba(139, 24, 32, 0.06);
  color: var(--blood);
}
.oww-drawer-body { flex: 1; overflow-y: auto; padding: 6px 18px 24px; }
.oww-entry {
  padding: 14px 12px;
  border-bottom: 1px dashed rgba(139, 24, 32, 0.25);
  cursor: pointer;
  transition: background 0.2s ease;
}
.oww-entry:hover { background: rgba(139, 24, 32, 0.05); }
.oww-entry-wish {
  font-family: 'Yeseva One', serif; font-style: italic;
  font-size: 16px; color: var(--ink);
  margin-bottom: 4px; line-height: 1.35;
}
.oww-entry-snippet {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px; color: var(--ink-soft);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.oww-entry-date {
  font-family: 'DM Mono', monospace;
  font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--blood); opacity: 0.7; margin-top: 6px;
}
.oww-empty {
  text-align: center; padding: 60px 20px;
  font-family: 'Yeseva One', serif; font-style: italic;
  font-size: 17px; color: var(--ink-soft); line-height: 1.6;
}

.oww-footer { margin-top: auto; padding-top: 32px; text-align: center; }
.oww-footer-divider {
  margin: 22px auto 18px;
  width: 100%; height: 2px;
  background: repeating-linear-gradient(90deg, var(--blood) 0 6px, transparent 6px 12px);
  opacity: 0.7;
}
.oww-footer-line {
  font-family: 'DM Mono', monospace;
  font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--blood); opacity: 0.75; line-height: 1.8;
}
.oww-footer-line.muted { color: var(--ink-soft); opacity: 0.55; margin-top: 4px; }
`;
