import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ─── Inline Styles ────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  /* ── RESET & VARS ────────────────────────────────────────────── */
  .hp {
    --white: #ffffff;
    --bg: #fafafa;
    --bg-alt: #f4f4f5;
    --surface: #ffffff;
    --border: #e4e4e7;
    --border-light: #f4f4f5;
    --text: #09090b;
    --text-2: #3f3f46;
    --text-3: #71717a;
    --text-4: #a1a1aa;
    --accent: #6366f1;
    --accent-2: #818cf8;
    --accent-3: #4f46e5;
    --accent-bg: #eef2ff;
    --accent-glow: rgba(99,102,241,.18);
    --green: #10b981;
    --green-bg: #ecfdf5;
    --amber: #f59e0b;
    --amber-bg: #fffbeb;
    --red: #ef4444;
    --red-bg: #fef2f2;
    --cyan: #06b6d4;
    --cyan-bg: #ecfeff;
    --violet: #8b5cf6;
    --violet-bg: #f5f3ff;
    --font: 'Inter', -apple-system, system-ui, sans-serif;
    --nav-h: 64px;
    --max-w: 1180px;
    --radius: 16px;
    --radius-sm: 10px;
    --radius-xs: 6px;
    --shadow-sm: 0 1px 2px rgba(0,0,0,.05);
    --shadow: 0 4px 20px rgba(0,0,0,.06);
    --shadow-lg: 0 16px 48px rgba(0,0,0,.08);
    --ease: cubic-bezier(.4,0,.2,1);
    font-family: var(--font);
    color: var(--text);
    background: var(--bg);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;

    /* Cancel parent main-content margin/padding */
    margin-left: -272px;
    margin-top: -64px;
    padding-top: 0;
    width: calc(100% + 272px);
    position: relative;
  }
  @media (max-width: 1024px) {
    .hp { margin-left: 0; width: 100%; margin-top: -64px; }
  }

  .hp *, .hp *::before, .hp *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .hp a { color: inherit; text-decoration: none; }
  .hp button { font-family: inherit; cursor: pointer; border: none; background: none; }

  /* ── ANIMATIONS ──────────────────────────────────────────────── */
  @keyframes hp-fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hp-fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes hp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes hp-pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
  @keyframes hp-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes hp-orbit { 0%{transform:rotate(0deg) translateX(140px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(140px) rotate(-360deg)} }
  @keyframes hp-spin { to{transform:rotate(360deg)} }
  @keyframes hp-gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes hp-scale-in { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }

  /* ── NAVBAR ──────────────────────────────────────────────────── */
  .hp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: var(--nav-h);
    background: rgba(250,250,250,.8);
    backdrop-filter: blur(20px) saturate(1.6);
    -webkit-backdrop-filter: blur(20px) saturate(1.6);
    border-bottom: 1px solid rgba(228,228,231,.6);
    transition: all .3s var(--ease);
  }
  .hp-nav.scrolled { background: rgba(255,255,255,.92); box-shadow: 0 1px 12px rgba(0,0,0,.06); }
  .hp-nav-inner {
    max-width: var(--max-w); margin: 0 auto; height: 100%;
    padding: 0 24px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .hp-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
  .hp-brand-icon {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, var(--accent), var(--violet));
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: #fff; font-weight: 800;
    box-shadow: 0 2px 8px var(--accent-glow);
  }
  .hp-brand-name { font-weight: 700; font-size: .95rem; color: var(--text); letter-spacing: -.02em; }
  .hp-brand-name span { color: var(--accent); }

  .hp-nav-links { display: flex; align-items: center; gap: 2px; list-style: none; }
  .hp-nav-links a {
    font-size: .85rem; font-weight: 500; color: var(--text-3);
    padding: 6px 14px; border-radius: var(--radius-xs);
    transition: all .2s var(--ease);
  }
  .hp-nav-links a:hover { color: var(--text); background: var(--bg-alt); }

  .hp-nav-cta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .hp-btn-ghost {
    font-size: .85rem; font-weight: 500; color: var(--text-2);
    padding: 7px 16px; border-radius: var(--radius-xs);
    border: 1px solid var(--border); background: var(--white);
    transition: all .2s var(--ease);
  }
  .hp-btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

  .hp-btn-primary {
    font-size: .85rem; font-weight: 600; color: #fff;
    padding: 7px 18px; border-radius: var(--radius-xs);
    background: var(--accent); border: none;
    display: inline-flex; align-items: center; gap: 6px;
    transition: all .2s var(--ease);
    box-shadow: 0 1px 4px var(--accent-glow);
  }
  .hp-btn-primary:hover { background: var(--accent-3); transform: translateY(-1px); box-shadow: 0 4px 16px var(--accent-glow); }

  .hp-hamburger {
    display: none; width: 36px; height: 36px; border-radius: var(--radius-xs);
    border: 1px solid var(--border); align-items: center; justify-content: center;
    font-size: 16px; color: var(--text);
  }
  .hp-hamburger:hover { background: var(--bg-alt); }

  .hp-mobile-menu {
    position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 99;
    background: var(--white); border-bottom: 1px solid var(--border);
    padding: 12px 24px 20px;
    display: flex; flex-direction: column; gap: 2px;
    box-shadow: var(--shadow);
    animation: hp-fadeIn .15s var(--ease);
  }
  .hp-mobile-menu a {
    font-size: .9rem; font-weight: 500; color: var(--text-2);
    padding: 10px 12px; border-radius: var(--radius-xs);
    transition: all .15s var(--ease);
  }
  .hp-mobile-menu a:hover { background: var(--bg-alt); color: var(--text); }
  .hp-mobile-menu .hp-mobile-cta { margin-top: 12px; }
  .hp-mobile-menu .hp-btn-primary { width: 100%; justify-content: center; padding: 11px; }

  /* ── HERO ────────────────────────────────────────────────────── */
  .hp-hero {
    padding: calc(var(--nav-h) + 80px) 24px 60px;
    max-width: var(--max-w); margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 56px; align-items: center;
    min-height: calc(100vh - 60px);
  }
  .hp-hero-left { animation: hp-fadeUp .7s var(--ease) both; }

  .hp-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 14px 5px 8px; border-radius: 100px;
    background: var(--accent-bg); border: 1px solid rgba(99,102,241,.15);
    font-size: .78rem; font-weight: 600; color: var(--accent);
    letter-spacing: .02em; margin-bottom: 24px;
  }
  .hp-hero-badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent); animation: hp-pulse 2s infinite;
  }

  .hp-hero-h1 {
    font-size: clamp(2.4rem, 4.5vw, 3.6rem);
    font-weight: 800; line-height: 1.08; letter-spacing: -.045em;
    color: var(--text); margin-bottom: 20px;
  }
  .hp-hero-h1 .hp-gradient {
    background: linear-gradient(135deg, var(--accent) 0%, var(--violet) 50%, var(--cyan) 100%);
    background-size: 200% 200%; animation: hp-gradient 4s ease infinite;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hp-hero-desc {
    font-size: 1.05rem; color: var(--text-3);
    line-height: 1.7; max-width: 460px; margin-bottom: 32px;
    font-weight: 400;
  }

  .hp-hero-btns {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    margin-bottom: 36px;
  }
  .hp-hero-btns .hp-btn-primary { padding: 11px 24px; font-size: .9rem; border-radius: var(--radius-sm); }
  .hp-hero-btns .hp-btn-ghost { padding: 10px 22px; font-size: .9rem; border-radius: var(--radius-sm); }

  .hp-hero-trust {
    display: flex; align-items: center; gap: 10px;
    animation: hp-fadeUp .7s .4s var(--ease) both;
  }
  .hp-trust-avatars { display: flex; }
  .hp-trust-av {
    width: 28px; height: 28px; border-radius: 50%;
    border: 2px solid var(--white); margin-left: -6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; color: #fff; font-weight: 700;
    box-shadow: var(--shadow-sm);
  }
  .hp-trust-av:first-child { margin-left: 0; }
  .hp-trust-text { font-size: .78rem; color: var(--text-4); }
  .hp-trust-text strong { color: var(--text-2); font-weight: 600; }

  /* Hero Visual */
  .hp-hero-right { position: relative; animation: hp-scale-in .8s .2s var(--ease) both; }

  .hp-hero-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 0;
    box-shadow: var(--shadow-lg);
    overflow: hidden; position: relative;
  }
  .hp-hero-card-bar {
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--violet), var(--cyan));
  }
  .hp-hero-card-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; border-bottom: 1px solid var(--border-light);
  }
  .hp-hero-card-title { font-size: .88rem; font-weight: 700; color: var(--text); }
  .hp-hero-card-live {
    font-size: .68rem; font-weight: 600; color: var(--green);
    background: var(--green-bg); border: 1px solid rgba(16,185,129,.15);
    padding: 2px 10px; border-radius: 100px;
    display: flex; align-items: center; gap: 5px;
  }
  .hp-live-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); animation: hp-pulse 1.5s infinite; }

  .hp-hero-card-body { padding: 16px 20px; }

  .hp-card-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .hp-card-stat {
    padding: 14px; border-radius: var(--radius-sm);
    background: var(--bg); border: 1px solid var(--border-light);
    transition: all .2s var(--ease);
  }
  .hp-card-stat:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }
  .hp-card-stat-val { font-size: 1.5rem; font-weight: 800; color: var(--text); line-height: 1; margin-bottom: 3px; letter-spacing: -.03em; }
  .hp-card-stat-lbl { font-size: .7rem; color: var(--text-4); font-weight: 500; }

  .hp-card-rows { display: flex; flex-direction: column; gap: 6px; }
  .hp-card-row {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 12px; border-radius: var(--radius-xs);
    background: var(--bg); border: 1px solid var(--border-light);
    font-size: .8rem;
  }
  .hp-card-row-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .hp-card-row-title { flex: 1; color: var(--text-2); font-weight: 500; }
  .hp-card-row-tag {
    font-size: .65rem; font-weight: 700; padding: 1px 8px;
    border-radius: 100px; text-transform: uppercase; letter-spacing: .04em;
  }

  /* Floating overlay cards */
  .hp-float {
    position: absolute; background: var(--white);
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    padding: 10px 14px; box-shadow: var(--shadow);
    display: flex; align-items: center; gap: 10px;
    font-size: .78rem; animation: hp-float 4s ease-in-out infinite;
    z-index: 2;
  }
  .hp-float-1 { top: -14px; right: -12px; animation-delay: 0s; }
  .hp-float-2 { bottom: 28px; left: -16px; animation-delay: 1.8s; }
  .hp-float-icon { font-size: 18px; }
  .hp-float-label { font-weight: 600; color: var(--text); }
  .hp-float-sub { font-size: .68rem; color: var(--text-4); }

  /* ── FEATURES STRIP ──────────────────────────────────────────── */
  .hp-strip {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-3) 100%);
    padding: 14px 24px; overflow: hidden;
  }
  .hp-strip-inner {
    max-width: var(--max-w); margin: 0 auto;
    display: flex; align-items: center; justify-content: center;
    gap: 28px; flex-wrap: wrap;
  }
  .hp-strip-item {
    display: flex; align-items: center; gap: 7px;
    font-size: .8rem; font-weight: 500; color: rgba(255,255,255,.92);
    white-space: nowrap;
  }
  .hp-strip-check { width: 14px; height: 14px; opacity: .85; }

  /* ── SECTION ─────────────────────────────────────────────────── */
  .hp-section {
    max-width: var(--max-w); margin: 0 auto;
    padding: 88px 24px;
  }
  .hp-section-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: .72rem; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 10px;
  }
  .hp-section-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }
  .hp-section-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 800; letter-spacing: -.04em;
    color: var(--text); line-height: 1.12; margin-bottom: 12px;
  }
  .hp-section-desc {
    font-size: .95rem; color: var(--text-3);
    max-width: 500px; line-height: 1.7; font-weight: 400;
  }
  .hp-section-head { margin-bottom: 48px; }
  .hp-section-head-center { text-align: center; }
  .hp-section-head-center .hp-section-desc { margin: 0 auto; }
  .hp-section-head-center .hp-section-tag { justify-content: center; }

  /* ── FEATURES GRID ───────────────────────────────────────────── */
  .hp-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .hp-feature {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 28px 24px;
    transition: all .25s var(--ease); position: relative; overflow: hidden;
  }
  .hp-feature::after {
    content:''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--_fc, var(--accent)); opacity: 0;
    transition: opacity .25s var(--ease);
  }
  .hp-feature:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); border-color: transparent; }
  .hp-feature:hover::after { opacity: 1; }
  .hp-feature-icon {
    width: 46px; height: 46px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 16px;
    transition: transform .25s var(--ease);
  }
  .hp-feature:hover .hp-feature-icon { transform: scale(1.08) rotate(-3deg); }
  .hp-feature-title { font-size: .95rem; font-weight: 700; color: var(--text); margin-bottom: 6px; letter-spacing: -.01em; }
  .hp-feature-desc { font-size: .82rem; color: var(--text-3); line-height: 1.6; }
  .hp-feature-link {
    display: inline-flex; align-items: center; gap: 4px;
    margin-top: 14px; font-size: .78rem; font-weight: 600; color: var(--accent);
    transition: gap .2s var(--ease);
  }
  .hp-feature-link:hover { gap: 8px; }
  .hp-feature-link svg { width: 12px; height: 12px; }

  /* ── ROLES ───────────────────────────────────────────────────── */
  .hp-roles-bg { background: var(--white); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .hp-roles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .hp-role {
    border: 1px solid var(--border); border-radius: var(--radius);
    padding: 28px 24px; transition: all .25s var(--ease); position: relative; overflow: hidden;
  }
  .hp-role:hover { box-shadow: var(--shadow); transform: translateY(-3px); border-color: var(--_rc, var(--accent)); }
  .hp-role-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .hp-role-icon { width: 48px; height: 48px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .hp-role-name { font-size: 1rem; font-weight: 700; letter-spacing: -.02em; color: var(--text); }
  .hp-role-tag { font-size: .65rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; margin-top: 2px; display: inline-block; }
  .hp-role-desc { font-size: .82rem; color: var(--text-3); line-height: 1.65; margin-bottom: 16px; }
  .hp-role-perms { display: flex; flex-direction: column; gap: 7px; }
  .hp-role-perm { display: flex; align-items: center; gap: 8px; font-size: .78rem; color: var(--text-3); }
  .hp-perm-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  /* ── STATS BAND ──────────────────────────────────────────────── */
  .hp-stats-band {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e3a5f 100%);
    position: relative; overflow: hidden;
  }
  .hp-stats-band::before {
    content:''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 50%, rgba(99,102,241,.12) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 80%, rgba(6,182,212,.08) 0%, transparent 50%);
  }
  .hp-stats-inner {
    max-width: var(--max-w); margin: 0 auto; padding: 72px 24px;
    display: grid; grid-template-columns: 1fr auto; gap: 56px; align-items: center;
    position: relative;
  }
  .hp-stats-title {
    font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800;
    color: #fff; letter-spacing: -.04em; line-height: 1.15; margin-bottom: 12px;
  }
  .hp-stats-desc { font-size: .92rem; color: rgba(255,255,255,.65); line-height: 1.7; max-width: 440px; }
  .hp-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .hp-stat {
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(12px); border-radius: var(--radius-sm);
    padding: 20px 22px; text-align: center;
    transition: all .2s var(--ease);
  }
  .hp-stat:hover { background: rgba(255,255,255,.1); transform: translateY(-2px); }
  .hp-stat-val { font-size: 2rem; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 4px; letter-spacing: -.03em; }
  .hp-stat-lbl { font-size: .72rem; color: rgba(255,255,255,.55); font-weight: 500; }

  /* ── HOW IT WORKS ────────────────────────────────────────────── */
  .hp-steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .hp-step {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 28px 20px; text-align: center;
    transition: all .25s var(--ease); position: relative;
  }
  .hp-step:hover { box-shadow: var(--shadow); transform: translateY(-3px); }
  .hp-step-num {
    font-size: 2.8rem; font-weight: 900; color: var(--border-light);
    position: absolute; top: 12px; right: 14px; line-height: 1;
  }
  .hp-step-icon { font-size: 26px; margin-bottom: 12px; }
  .hp-step-title { font-size: .88rem; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .hp-step-desc { font-size: .78rem; color: var(--text-3); line-height: 1.6; }
  .hp-step-arrow {
    position: absolute; top: 50%; right: -14px; transform: translateY(-50%);
    color: var(--text-4); font-size: 1rem; pointer-events: none; z-index: 1;
  }

  /* ── CTA ─────────────────────────────────────────────────────── */
  .hp-cta-wrap { padding: 80px 24px; max-width: var(--max-w); margin: 0 auto; }
  .hp-cta {
    background: var(--white); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 56px 64px; text-align: center;
    position: relative; overflow: hidden; box-shadow: var(--shadow-lg);
  }
  .hp-cta::before {
    content:''; position: absolute; top: -70px; right: -70px;
    width: 260px; height: 260px; border-radius: 50%;
    background: var(--accent-bg); opacity: .7; pointer-events: none;
  }
  .hp-cta::after {
    content:''; position: absolute; bottom: -50px; left: -50px;
    width: 180px; height: 180px; border-radius: 50%;
    background: var(--violet-bg); opacity: .5; pointer-events: none;
  }
  .hp-cta-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800;
    letter-spacing: -.04em; color: var(--text);
    margin-bottom: 12px; position: relative; z-index: 1;
  }
  .hp-cta-desc {
    font-size: .92rem; color: var(--text-3); max-width: 440px;
    margin: 0 auto 28px; line-height: 1.7;
    position: relative; z-index: 1;
  }
  .hp-cta-btns { display: flex; align-items: center; gap: 12px; justify-content: center; position: relative; z-index: 1; }
  .hp-cta-btns .hp-btn-primary { padding: 12px 28px; font-size: .92rem; border-radius: var(--radius-sm); }
  .hp-cta-btns .hp-btn-ghost { padding: 11px 24px; font-size: .92rem; border-radius: var(--radius-sm); }

  /* ── FOOTER ──────────────────────────────────────────────────── */
  .hp-footer {
    background: #0f172a; color: rgba(255,255,255,.7);
    padding: 56px 24px 28px;
  }
  .hp-footer-inner { max-width: var(--max-w); margin: 0 auto; }
  .hp-footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px; padding-bottom: 40px;
    border-bottom: 1px solid rgba(255,255,255,.08);
    margin-bottom: 24px;
  }
  .hp-footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .hp-footer-brand-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--accent); display: flex; align-items: center; justify-content: center;
    font-size: 14px; box-shadow: 0 2px 8px rgba(99,102,241,.4);
  }
  .hp-footer-brand-name { font-weight: 700; font-size: .88rem; color: #fff; }
  .hp-footer-tagline { font-size: .78rem; line-height: 1.65; margin-bottom: 16px; max-width: 240px; color: rgba(255,255,255,.5); }
  .hp-footer-socials { display: flex; gap: 6px; }
  .hp-footer-social {
    width: 32px; height: 32px; border-radius: 7px;
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; color: rgba(255,255,255,.6);
    transition: all .2s var(--ease);
  }
  .hp-footer-social:hover { background: var(--accent); border-color: var(--accent); color: #fff; }
  .hp-footer-col-title {
    font-weight: 700; font-size: .75rem; letter-spacing: .07em;
    text-transform: uppercase; color: #fff; margin-bottom: 14px;
  }
  .hp-footer-links { list-style: none; display: flex; flex-direction: column; gap: 7px; }
  .hp-footer-links a {
    font-size: .78rem; color: rgba(255,255,255,.5);
    transition: color .2s var(--ease);
  }
  .hp-footer-links a:hover { color: #fff; }

  .hp-footer-bottom {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 10px;
  }
  .hp-footer-copy { font-size: .72rem; color: rgba(255,255,255,.4); }
  .hp-footer-legal { display: flex; gap: 14px; }
  .hp-footer-legal a { font-size: .72rem; color: rgba(255,255,255,.4); transition: color .2s var(--ease); }
  .hp-footer-legal a:hover { color: rgba(255,255,255,.8); }

  /* ── RESPONSIVE ──────────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .hp-features { grid-template-columns: repeat(2, 1fr); }
    .hp-roles-grid { grid-template-columns: repeat(2, 1fr); }
    .hp-steps-grid { grid-template-columns: repeat(2, 1fr); }
    .hp-step-arrow { display: none; }
    .hp-footer-top { grid-template-columns: 1fr 1fr; }
    .hp-stats-inner { grid-template-columns: 1fr; }
  }
  @media (max-width: 768px) {
    .hp-hero { grid-template-columns: 1fr; padding-top: calc(var(--nav-h) + 48px); min-height: auto; }
    .hp-hero-right { display: none; }
    .hp-features { grid-template-columns: 1fr; }
    .hp-roles-grid { grid-template-columns: 1fr; }
    .hp-steps-grid { grid-template-columns: 1fr; }
    .hp-cta { padding: 36px 24px; }
    .hp-footer-top { grid-template-columns: 1fr 1fr; gap: 28px; }
    .hp-footer-top > div:first-child { grid-column: 1 / -1; }
    .hp-nav-links, .hp-nav-cta .hp-btn-ghost { display: none; }
    .hp-hamburger { display: flex; }
    .hp-stats-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .hp-hero-btns { flex-direction: column; align-items: stretch; }
    .hp-cta-btns { flex-direction: column; }
    .hp-footer-top { grid-template-columns: 1fr; }
    .hp-footer-bottom { flex-direction: column; align-items: flex-start; }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  { icon: '🚨', title: 'Incident Management', desc: 'Log, track, and resolve campus incidents from a single dashboard. Assign to technicians with live progress updates.', color: '#ef4444', bg: '#fef2f2' },
  { icon: '📅', title: 'Smart Bookings', desc: 'Reserve rooms, labs, and equipment instantly with real-time availability and streamlined approval workflows.', color: '#2563eb', bg: '#eff4ff' },
  { icon: '🏢', title: 'Resource Catalogue', desc: 'Browse and manage every campus resource — classrooms, labs, AV equipment — with live status indicators.', color: '#16a34a', bg: '#f0fdf4' },
  { icon: '🔔', title: 'Live Notifications', desc: 'Real-time push alerts keep every stakeholder informed. Never miss an approval, assignment, or system update.', color: '#d97706', bg: '#fffbeb' },
  { icon: '🛡️', title: 'Role-Based Access', desc: 'Granular permissions for Users, Technicians, and Admins — the right tools for the right person, always.', color: '#7c3aed', bg: '#f5f3ff' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'Understand trends, workload distribution, and system health at a glance with rich visual insights.', color: '#0891b2', bg: '#ecfeff' },
];

const roles = [
  { icon: '👤', name: 'User', tag: 'STAFF / STUDENT', desc: 'Create and track incidents, book resources, and receive updates — everything you need for campus support.', perms: ['Submit & track incidents', 'Book campus resources', 'Receive live notifications', 'View booking history'], color: '#2563eb', bg: '#eff4ff', tagBg: '#dbeafe', tagC: '#1d4ed8' },
  { icon: '🔧', name: 'Technician', tag: 'SUPPORT STAFF', desc: 'View assigned incidents, update resolution status, and collaborate with the team to keep campus running.', perms: ['View assigned incidents', 'Update incident status', 'Manage booking schedules', 'Access technical logs'], color: '#16a34a', bg: '#f0fdf4', tagBg: '#dcfce7', tagC: '#15803d' },
  { icon: '⚙️', name: 'Admin', tag: 'ADMINISTRATOR', desc: 'Full oversight: manage users, assign technicians, configure resources, and access system-wide reporting.', perms: ['Full incident oversight', 'Manage all bookings', 'User & role management', 'Resource configuration'], color: '#7c3aed', bg: '#f5f3ff', tagBg: '#ede9fe', tagC: '#6d28d9' },
];

const steps = [
  { icon: '🔐', title: 'Sign In', desc: 'Authenticate securely with your university Google account.', n: '01' },
  { icon: '📋', title: 'Create Request', desc: 'Submit an incident or book a resource in under 60 seconds.', n: '02' },
  { icon: '🔔', title: 'Get Updates', desc: 'Track real-time status changes with instant notifications.', n: '03' },
  { icon: '✅', title: 'Resolved', desc: 'Issues resolved, bookings confirmed — full audit trail kept.', n: '04' },
];

const stripItems = ['Secure Google Login', 'Role-Based Access', 'Real-Time Notifications', 'Resource Booking', 'Incident Tracking', 'Admin Controls'];

// ─── Components ───────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Roles', href: '#roles' },
    { label: 'How it Works', href: '#how' },
    { label: 'About', href: '#about' },
  ];
  return (
    <>
      <nav className={`hp-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="hp-nav-inner">
          <a href="#" className="hp-brand">
            <div className="hp-brand-icon">SC</div>
            <span className="hp-brand-name">Smart<span>Campus</span></span>
          </a>
          <ul className="hp-nav-links">
            {links.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
          </ul>
          <div className="hp-nav-cta">
            <Link to="/login" className="hp-btn-ghost">Sign In</Link>
            <Link to="/login" className="hp-btn-primary">Get Started <span>→</span></Link>
            <button className="hp-hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div className="hp-mobile-menu">
          {links.map(l => <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</a>)}
          <div className="hp-mobile-cta">
            <Link to="/login" className="hp-btn-primary" onClick={() => setMobileOpen(false)}>Get Started →</Link>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="hp-hero">
      <div className="hp-hero-left">
        <div className="hp-hero-badge">
          <span className="hp-hero-badge-dot" />
          Smart Campus Operations Hub
        </div>
        <h1 className="hp-hero-h1">
          One platform for<br />
          <span className="hp-gradient">every campus</span><br />
          operation
        </h1>
        <p className="hp-hero-desc">
          Incidents, bookings, resources and notifications — unified in a single intelligent platform built for modern university campuses.
        </p>
        <div className="hp-hero-btns">
          <Link to="/login" className="hp-btn-primary">Access Dashboard <span>→</span></Link>
          <a href="#features" className="hp-btn-ghost">Explore Features</a>
        </div>
        <div className="hp-hero-trust">
          <div className="hp-trust-avatars">
            {[{bg:'#6366f1',l:'S'},{bg:'#8b5cf6',l:'T'},{bg:'#06b6d4',l:'A'},{bg:'#10b981',l:'U'}].map((a,i)=>(
              <div className="hp-trust-av" key={i} style={{background:a.bg}}>{a.l}</div>
            ))}
          </div>
          <span className="hp-trust-text">Trusted by <strong>3 user roles</strong> across campus departments</span>
        </div>
      </div>
      <div className="hp-hero-right">
        <div className="hp-float hp-float-1">
          <span className="hp-float-icon">✅</span>
          <div><div className="hp-float-label">Incident Resolved</div><div className="hp-float-sub">Lab A — Projector fixed</div></div>
        </div>
        <div className="hp-hero-card">
          <div className="hp-hero-card-bar" />
          <div className="hp-hero-card-head">
            <span className="hp-hero-card-title">Today's Overview</span>
            <span className="hp-hero-card-live"><span className="hp-live-dot" /> Live</span>
          </div>
          <div className="hp-hero-card-body">
            <div className="hp-card-stats">
              {[{v:'24',l:'Open Incidents'},{v:'8',l:'Active Bookings'},{v:'3',l:'Alerts Today'},{v:'97%',l:'Resolution Rate'}].map((s,i)=>(
                <div className="hp-card-stat" key={i}><div className="hp-card-stat-val">{s.v}</div><div className="hp-card-stat-lbl">{s.l}</div></div>
              ))}
            </div>
            <div className="hp-card-rows">
              {[{t:'Lecture Hall B — AC fault',dot:'#ef4444',tag:'HIGH',tagBg:'#fef2f2',tagC:'#dc2626'},{t:'Library PC Lab — Network',dot:'#d97706',tag:'MED',tagBg:'#fffbeb',tagC:'#b45309'},{t:'Parking Gate — Sensor',dot:'#10b981',tag:'LOW',tagBg:'#f0fdf4',tagC:'#15803d'}].map((r,i)=>(
                <div className="hp-card-row" key={i}>
                  <div className="hp-card-row-dot" style={{background:r.dot}} />
                  <span className="hp-card-row-title">{r.t}</span>
                  <span className="hp-card-row-tag" style={{background:r.tagBg,color:r.tagC}}>{r.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hp-float hp-float-2">
          <span className="hp-float-icon">📅</span>
          <div><div className="hp-float-label">Booking Confirmed</div><div className="hp-float-sub">Seminar Room 3 · 2 PM</div></div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="hp">
      <style>{css}</style>
      <Nav />

      <main>
        <Hero />

        {/* Strip */}
        <div className="hp-strip">
          <div className="hp-strip-inner">
            {stripItems.map(item => (
              <div className="hp-strip-item" key={item}>
                <svg className="hp-strip-check" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <section className="hp-section" id="features">
          <div className="hp-section-head">
            <div className="hp-section-tag"><span className="hp-section-tag-dot" /> Everything You Need</div>
            <h2 className="hp-section-title">Built for how your<br/>campus really works</h2>
            <p className="hp-section-desc">Six powerful modules that cover every operational workflow — from the first report to final resolution.</p>
          </div>
          <div className="hp-features">
            {features.map(f => (
              <div className="hp-feature" key={f.title} style={{'--_fc': f.color}}>
                <div className="hp-feature-icon" style={{background: f.bg, color: f.color}}>{f.icon}</div>
                <div className="hp-feature-title">{f.title}</div>
                <p className="hp-feature-desc">{f.desc}</p>
                <Link to="/login" className="hp-feature-link">
                  Explore <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Roles */}
        <section className="hp-roles-bg" id="roles">
          <div className="hp-section">
            <div className="hp-section-head hp-section-head-center">
              <div className="hp-section-tag"><span className="hp-section-tag-dot" /> Role-Based Platform</div>
              <h2 className="hp-section-title">The right tools for<br/>every person on campus</h2>
              <p className="hp-section-desc">Three distinct roles, one unified system. Everyone sees exactly what they need — nothing more, nothing less.</p>
            </div>
            <div className="hp-roles-grid">
              {roles.map(r => (
                <div className="hp-role" key={r.name} style={{'--_rc': r.color}}>
                  <div className="hp-role-top">
                    <div className="hp-role-icon" style={{background: r.bg}}>{r.icon}</div>
                    <div>
                      <div className="hp-role-name">{r.name}</div>
                      <div className="hp-role-tag" style={{background: r.tagBg, color: r.tagC}}>{r.tag}</div>
                    </div>
                  </div>
                  <p className="hp-role-desc">{r.desc}</p>
                  <div className="hp-role-perms">
                    {r.perms.map(p => <div className="hp-role-perm" key={p}><div className="hp-perm-dot" style={{background: r.color}} />{p}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="hp-stats-band" id="about">
          <div className="hp-stats-inner">
            <div>
              <h2 className="hp-stats-title">Operational excellence,<br/>measurable results</h2>
              <p className="hp-stats-desc">Smart Campus centralises every operational touchpoint, reducing response times and eliminating disconnected tools.</p>
            </div>
            <div className="hp-stats-grid">
              {[{v:'< 2min',l:'Avg. booking time'},{v:'97%',l:'Issue resolution rate'},{v:'3 Roles',l:'Covered by one platform'},{v:'24/7',l:'System availability'}].map(s => (
                <div className="hp-stat" key={s.l}><div className="hp-stat-val">{s.v}</div><div className="hp-stat-lbl">{s.l}</div></div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="hp-section" id="how">
          <div className="hp-section-head hp-section-head-center">
            <div className="hp-section-tag"><span className="hp-section-tag-dot" /> Simple Process</div>
            <h2 className="hp-section-title">Up and running<br/>in four steps</h2>
            <p className="hp-section-desc">No training required. The platform is intuitive by design — built around how campus staff actually think.</p>
          </div>
          <div className="hp-steps-grid">
            {steps.map((s, i) => (
              <div className="hp-step" key={s.title}>
                <div className="hp-step-num">{s.n}</div>
                <div className="hp-step-icon">{s.icon}</div>
                <div className="hp-step-title">{s.title}</div>
                <p className="hp-step-desc">{s.desc}</p>
                {i < steps.length - 1 && <span className="hp-step-arrow">→</span>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="hp-cta-wrap">
          <div className="hp-cta">
            <h2 className="hp-cta-title">Ready to modernise<br/>your campus operations?</h2>
            <p className="hp-cta-desc">Sign in with your university Google account and get started immediately. No setup required.</p>
            <div className="hp-cta-btns">
              <Link to="/login" className="hp-btn-primary">Get Started Free <span>→</span></Link>
              <a href="#features" className="hp-btn-ghost">Learn More</a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="hp-footer">
        <div className="hp-footer-inner">
          <div className="hp-footer-top">
            <div>
              <div className="hp-footer-brand">
                <div className="hp-footer-brand-icon">🏫</div>
                <span className="hp-footer-brand-name">SmartCampus</span>
              </div>
              <p className="hp-footer-tagline">A unified operations hub for modern university campuses — managing incidents, bookings, and resources seamlessly.</p>
              <div className="hp-footer-socials">
                {['✉️','🔗','🐦','💻'].map((s,i) => <a key={i} href="#" className="hp-footer-social">{s}</a>)}
              </div>
            </div>
            <div>
              <div className="hp-footer-col-title">Platform</div>
              <ul className="hp-footer-links">
                {['Dashboard','Bookings','Incidents','Resources','Notifications'].map(l => <li key={l}><Link to="/login">{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="hp-footer-col-title">Roles</div>
              <ul className="hp-footer-links">
                {['For Students','For Staff','For Technicians','For Admins','Access Control'].map(l => <li key={l}><Link to="/login">{l}</Link></li>)}
              </ul>
            </div>
            <div>
              <div className="hp-footer-col-title">Support</div>
              <ul className="hp-footer-links">
                {['Help Center','User Guide','Contact IT','Report a Bug','System Status'].map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          </div>
          <div className="hp-footer-bottom">
            <span className="hp-footer-copy">© {new Date().getFullYear()} Smart Campus Operations Hub. All rights reserved.</span>
            <div className="hp-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
