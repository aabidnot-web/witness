"use client";

import { useEffect, useRef } from "react";
import { clamp, lerp, smoothstep } from "@/lib/utils";

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Technology", href: "#how-it-works" },
  { label: "Manifesto", href: "#manifesto" },
];

function getHeaderMetrics(viewportWidth: number) {
  if (viewportWidth <= 640) {
    return {
      wideInset: 16,
      wideMax: viewportWidth - 32,
      compactWidth: viewportWidth - 24,
      topExpanded: 14, topCompact: 10,
      shellHeightExpanded: 48, shellHeightCompact: 44,
      shellPaddingExpanded: 16, shellPaddingCompact: 12,
      shellGapExpanded: 12, shellGapCompact: 8,
      navGapExpanded: 8, navGapCompact: 4,
      navLinkPadXExpanded: 10, navLinkPadXCompact: 6,
      navLinkPadYExpanded: 6, navLinkPadYCompact: 4,
      ctaHeightExpanded: 34, ctaHeightCompact: 30,
      ctaPadExpanded: 12, ctaPadCompact: 10,
      radiusExpanded: 24, radiusCompact: 999,
      blurExpanded: 16, blurCompact: 22,
      bgExpanded: 0.24, bgCompact: 0.38,
      borderExpanded: 0.16, borderCompact: 0.22,
      shadowExpanded: 0.16, shadowCompact: 0.24,
      shadowYExpanded: 14, shadowYCompact: 20,
      shadowBlurExpanded: 34, shadowBlurCompact: 48,
      brandExpanded: 26, brandCompact: 22,
      liftExpanded: 0, liftCompact: -1,
      highlightExpanded: 0.08, highlightCompact: 0.11,
      saturateExpanded: 132, saturateCompact: 148,
      sheenExpanded: 0.07, sheenCompact: 0.12,
      blurBandExpanded: 82, blurBandCompact: 94,
      blurOpacityExpanded: 0.14, blurOpacityCompact: 0.72,
      blurWidthOffsetExpanded: 48, blurWidthOffsetCompact: 92,
    };
  }

  if (viewportWidth <= 960) {
    return {
      wideInset: 24,
      wideMax: viewportWidth - 48,
      compactWidth: Math.min(viewportWidth - 112, 660),
      topExpanded: 18, topCompact: 12,
      shellHeightExpanded: 50, shellHeightCompact: 46,
      shellPaddingExpanded: 18, shellPaddingCompact: 14,
      shellGapExpanded: 14, shellGapCompact: 9,
      navGapExpanded: 8, navGapCompact: 5,
      navLinkPadXExpanded: 11, navLinkPadXCompact: 7,
      navLinkPadYExpanded: 6, navLinkPadYCompact: 4,
      ctaHeightExpanded: 35, ctaHeightCompact: 31,
      ctaPadExpanded: 13, ctaPadCompact: 10,
      radiusExpanded: 26, radiusCompact: 999,
      blurExpanded: 18, blurCompact: 24,
      bgExpanded: 0.22, bgCompact: 0.38,
      borderExpanded: 0.16, borderCompact: 0.22,
      shadowExpanded: 0.16, shadowCompact: 0.24,
      shadowYExpanded: 14, shadowYCompact: 20,
      shadowBlurExpanded: 34, shadowBlurCompact: 48,
      brandExpanded: 30, brandCompact: 24,
      liftExpanded: 0, liftCompact: -1,
      highlightExpanded: 0.08, highlightCompact: 0.11,
      saturateExpanded: 132, saturateCompact: 148,
      sheenExpanded: 0.07, sheenCompact: 0.12,
      blurBandExpanded: 90, blurBandCompact: 106,
      blurOpacityExpanded: 0.13, blurOpacityCompact: 0.68,
      blurWidthOffsetExpanded: 76, blurWidthOffsetCompact: 116,
    };
  }

  return {
    wideInset: 48,
    wideMax: 1540,
    compactWidth: viewportWidth >= 1280 ? 760 : 700,
    topExpanded: 24, topCompact: 14,
    shellHeightExpanded: 54, shellHeightCompact: 47,
    shellPaddingExpanded: 22, shellPaddingCompact: 16,
    shellGapExpanded: 16, shellGapCompact: 10,
    navGapExpanded: 8, navGapCompact: 5,
    navLinkPadXExpanded: 12, navLinkPadXCompact: 8,
    navLinkPadYExpanded: 6, navLinkPadYCompact: 4,
    ctaHeightExpanded: 36, ctaHeightCompact: 32,
    ctaPadExpanded: 14, ctaPadCompact: 11,
    radiusExpanded: 28, radiusCompact: 999,
    blurExpanded: 20, blurCompact: 28,
    bgExpanded: 0.2, bgCompact: 0.38,
    borderExpanded: 0.15, borderCompact: 0.22,
    shadowExpanded: 0.14, shadowCompact: 0.24,
    shadowYExpanded: 14, shadowYCompact: 22,
    shadowBlurExpanded: 34, shadowBlurCompact: 52,
    brandExpanded: 34, brandCompact: 26,
    liftExpanded: 0, liftCompact: -1.5,
    highlightExpanded: 0.08, highlightCompact: 0.12,
    saturateExpanded: 132, saturateCompact: 150,
    sheenExpanded: 0.07, sheenCompact: 0.12,
    blurBandExpanded: 96, blurBandCompact: 126,
    blurOpacityExpanded: 0.12, blurOpacityCompact: 0.62,
    blurWidthOffsetExpanded: 112, blurWidthOffsetCompact: 156,
  };
}

export default function Header() {
  const chromeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chrome = chromeRef.current;
    if (!chrome) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scrollSmoothing = 0.16;
    const settleThreshold = 0.35;
    let ticking = false;
    let heroHeight = window.innerHeight;
    let latestScrollY = window.scrollY;
    let renderedScrollY = latestScrollY;

    const update = () => {
      heroHeight = window.innerHeight;

      if (prefersReducedMotion) {
        renderedScrollY = latestScrollY;
      } else {
        renderedScrollY = lerp(
          renderedScrollY,
          latestScrollY,
          scrollSmoothing
        );
        if (Math.abs(latestScrollY - renderedScrollY) < settleThreshold) {
          renderedScrollY = latestScrollY;
        }
      }

      const viewportWidth = window.innerWidth;
      const m = getHeaderMetrics(viewportWidth);
      const wideWidth = Math.min(viewportWidth - m.wideInset * 2, m.wideMax);
      const compactWidth = Math.min(m.compactWidth, wideWidth);
      const blurWideWidth = Math.min(
        viewportWidth,
        wideWidth + m.blurWidthOffsetExpanded
      );
      const blurCompactWidth = Math.min(
        viewportWidth,
        compactWidth + m.blurWidthOffsetCompact
      );
      const transitionStart = 5;
      const transitionEnd = 50;
      const rawProgress = clamp(
        (renderedScrollY - transitionStart) / (transitionEnd - transitionStart),
        0,
        1
      );
      const progress = prefersReducedMotion
        ? latestScrollY > transitionStart
          ? 1
          : 0
        : smoothstep(rawProgress);

      const s = chrome.style;
      s.setProperty("--header-top", `${lerp(m.topExpanded, m.topCompact, progress)}px`);
      s.setProperty("--header-width", `${lerp(wideWidth, compactWidth, progress)}px`);
      s.setProperty("--hero-blur-width", `${lerp(blurWideWidth, blurCompactWidth, progress)}px`);
      s.setProperty("--nav-shell-height", `${lerp(m.shellHeightExpanded, m.shellHeightCompact, progress)}px`);
      s.setProperty("--nav-shell-padding-x", `${lerp(m.shellPaddingExpanded, m.shellPaddingCompact, progress)}px`);
      s.setProperty("--nav-shell-gap", `${lerp(m.shellGapExpanded, m.shellGapCompact, progress)}px`);
      s.setProperty("--nav-links-gap", `${lerp(m.navGapExpanded, m.navGapCompact, progress)}px`);
      s.setProperty("--nav-link-padding-x", `${lerp(m.navLinkPadXExpanded, m.navLinkPadXCompact, progress)}px`);
      s.setProperty("--nav-link-padding-y", `${lerp(m.navLinkPadYExpanded, m.navLinkPadYCompact, progress)}px`);
      s.setProperty("--nav-cta-height", `${lerp(m.ctaHeightExpanded, m.ctaHeightCompact, progress)}px`);
      s.setProperty("--nav-cta-padding-x", `${lerp(m.ctaPadExpanded, m.ctaPadCompact, progress)}px`);
      s.setProperty("--nav-radius", `${lerp(m.radiusExpanded, m.radiusCompact, progress)}px`);
      s.setProperty("--nav-blur", `${lerp(m.blurExpanded, m.blurCompact, progress)}px`);
      s.setProperty("--nav-bg-alpha", lerp(m.bgExpanded, m.bgCompact, progress).toFixed(3));
      s.setProperty("--nav-border-alpha", lerp(m.borderExpanded, m.borderCompact, progress).toFixed(3));
      s.setProperty("--nav-shadow-alpha", lerp(m.shadowExpanded, m.shadowCompact, progress).toFixed(3));
      s.setProperty("--nav-shadow-y", `${lerp(m.shadowYExpanded, m.shadowYCompact, progress)}px`);
      s.setProperty("--nav-shadow-blur", `${lerp(m.shadowBlurExpanded, m.shadowBlurCompact, progress)}px`);
      s.setProperty("--nav-brand-size", `${lerp(m.brandExpanded, m.brandCompact, progress)}px`);
      s.setProperty("--nav-lift", `${lerp(m.liftExpanded, m.liftCompact, progress)}px`);
      s.setProperty("--nav-highlight-alpha", lerp(m.highlightExpanded, m.highlightCompact, progress).toFixed(3));
      s.setProperty("--nav-saturate", `${lerp(m.saturateExpanded, m.saturateCompact, progress).toFixed(0)}%`);
      s.setProperty("--nav-sheen-alpha", lerp(m.sheenExpanded, m.sheenCompact, progress).toFixed(3));
      s.setProperty("--nav-progress", progress.toFixed(3));
      s.setProperty("--hero-scroll-progress", progress.toFixed(3));
      s.setProperty("--hero-blur-opacity", lerp(m.blurOpacityExpanded, m.blurOpacityCompact, progress).toFixed(3));
      s.setProperty("--hero-blur-height", `${lerp(m.blurBandExpanded, m.blurBandCompact, progress)}px`);

      if (
        !prefersReducedMotion &&
        Math.abs(latestScrollY - renderedScrollY) > settleThreshold
      ) {
        window.requestAnimationFrame(update);
        return;
      }

      ticking = false;
    };

    const requestUpdate = () => {
      latestScrollY = window.scrollY;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="hero__chrome" ref={chromeRef}>
      <div className="hero__scroll-blur" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`hero__scroll-blur-layer hero__scroll-blur-layer--${i}`}
          />
        ))}
      </div>
      <header className="hero__nav" aria-label="Primary">
        <div className="hero__nav-shell">
          <a className="hero__brand" href="#home">
            <span className="hero__brand-wit">Wit</span>
            <span className="hero__brand-ness">ness</span>
          </a>

          <nav className="hero__nav-links" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} className="hero__nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <button className="hero__nav-cta" type="button">
            Request Access
          </button>
        </div>
      </header>
    </div>
  );
}
