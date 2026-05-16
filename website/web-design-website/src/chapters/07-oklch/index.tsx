import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './Oklch.css';

/**
 * Chapter 07 · Part Four: oklch Color
 *
 * Voiceover script (strictly aligned):
 *   1. "His color strategy is divided into: prioritize brand colors; if not enough, use oklch derived colors; never invent new colors from scratch."
 *   2. "Why oklch?"
 *   3. "Traditional HSL color space has a big problem — perceptual non-uniformity."
 *      "The same lightness value, yellow looks much brighter than blue."
 *   4. "oklch is a perceptually uniform color space. Keep lightness and chroma fixed, only rotate hue angle, and the resulting colors are naturally harmonious."
 *   5. "This detail looks small, but the sense of refinement on the web page instantly elevates."
 *
 * Pacing (5 steps / step 0..4):
 *  0  Original prompt (L41-43) three paragraphs lit up sentence by sentence —— introducing the strategy source
 *  1  Three-layer strategy cards: ① Brand colors ② oklch derivatives ③ Ban inventing colors from scratch
 *  2  pivot big text "Why oklch?" + sub: "HSL has a big problem —— perceptual non-uniformity"
 *  3  HSL vs OKLCH dual hue strip comparison + perceived brightness curve + yellow spotlight
 *  4  Closing: "Web refinement ↑"
 */

const HUES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

/** HSL perceived brightness (rough sRGB BT.709 relative luminance) */
function hslPerceived(h: number): number {
  const s = 0.7;
  const l = 0.6;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r = 0, g = 0, b = 0;
  if      (hh < 1) { r = c; g = x; }
  else if (hh < 2) { r = x; g = c; }
  else if (hh < 3) { g = c; b = x; }
  else if (hh < 4) { g = x; b = c; }
  else if (hh < 5) { r = x; b = c; }
  else             { r = c; b = x; }
  const m = l - c / 2;
  r += m; g += m; b += m;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function Oklch({ localStep }: ChapterContext) {
  const sceneSrc     = localStep <= 0;
  const sceneRules   = localStep === 1;
  const scenePivot   = localStep === 2;
  const sceneCompare = localStep === 3;
  const sceneClose   = localStep >= 4;

  return (
    <section className="ok">
      {/* ════════ Scene SOURCE (step 0) —— original text first ════════ */}
      <SceneFade active={sceneSrc} exitMs={420} enterDelayMs={120}>
        <div className="ok__src-scene">
          <Reveal kind="fade" duration={620} delay={80} className="ok__src-eyebrow">
            <span className="ok__src-bracket">[</span>
            <span className="ok__src-label">SYSTEM PROMPT</span>
            <span className="ok__src-sep">·</span>
            <span className="ok__src-line">L41-43</span>
            <span className="ok__src-sep">/</span>
            <span className="ok__src-mute">Color Strategy Original</span>
            <span className="ok__src-bracket">]</span>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={280} className="ok__src-block">
            <div className="ok__src-line-row ok__src-line-row--1">
              <span className="ok__src-num">L41</span>
              <span className="ok__src-text">
                Color usage: try to use colors from{' '}
                <em className="ok__src-h ok__src-h--1">brand / design system</em>.
              </span>
            </div>
            <div className="ok__src-line-row ok__src-line-row--2">
              <span className="ok__src-num">L42</span>
              <span className="ok__src-text">
                If too restrictive, use{' '}
                <em className="ok__src-h ok__src-h--2">oklch</em>{' '}
                to define harmonious colors that match.
              </span>
            </div>
            <div className="ok__src-line-row ok__src-line-row--3">
              <span className="ok__src-num">L43</span>
              <span className="ok__src-text">
                <em className="ok__src-h ok__src-h--3">Avoid inventing</em>{' '}
                new colors from scratch.
              </span>
            </div>
          </Reveal>

          <Reveal kind="fade" duration={780} delay={2200} className="ok__src-foot">
            Three paragraphs —— a <em>layered</em> color strategy
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene RULES (step 1) —— three-layer strategy ════════ */}
      <SceneFade active={sceneRules} exitMs={420} enterDelayMs={420}>
        <div className="ok__rules-scene">
          <Reveal kind="rise" duration={780} delay={80} className="ok__rules-head" as="h2">
            Color Strategy —— <em>Three Lines of Defense</em>
          </Reveal>

          <div className="ok__rules">
            {/* Layer 1 */}
            <Reveal kind="rise" duration={780} delay={220} className="ok__rule ok__rule--good">
              <div className="ok__rule-num">01</div>
              <div className="ok__rule-body">
                <div className="ok__rule-title">Prioritize Brand Colors</div>
                <div className="ok__rule-desc">Existing design system → reuse directly, don't "reinvent"</div>
                <div className="ok__rule-swatches">
                  <span style={{ background: 'oklch(0.965 0.018 78)' }} />
                  <span style={{ background: 'oklch(0.700 0.170 42)' }} />
                  <span style={{ background: 'oklch(0.275 0.012 60)' }} />
                </div>
              </div>
              <div className="ok__rule-mark ok__rule-mark--good">✓</div>
            </Reveal>

            {/* Layer 2 */}
            <Reveal kind="rise" duration={780} delay={420} className="ok__rule ok__rule--ok">
              <div className="ok__rule-num">02</div>
              <div className="ok__rule-body">
                <div className="ok__rule-title">Not enough? <em>oklch Derivatives</em></div>
                <div className="ok__rule-desc">Keep L / C fixed, rotate h —— automatically get harmonious derivatives</div>
                <div className="ok__rule-swatches">
                  {[42, 90, 150, 200, 260, 320].map((h) => (
                    <span key={h} style={{ background: `oklch(0.70 0.15 ${h})` }} />
                  ))}
                </div>
              </div>
              <div className="ok__rule-mark ok__rule-mark--good">✓</div>
            </Reveal>

            {/* Layer 3 */}
            <Reveal kind="rise" duration={780} delay={620} className="ok__rule ok__rule--bad">
              <div className="ok__rule-num">03</div>
              <div className="ok__rule-body">
                <div className="ok__rule-title">Never Invent Colors from Scratch</div>
                <div className="ok__rule-desc">"I think this purple looks nice" —— that's the source of the AI look</div>
                <div className="ok__rule-swatches">
                  <span style={{ background: '#a78bfa' }} />
                  <span style={{ background: '#f0abfc' }} />
                  <span style={{ background: '#67e8f9' }} />
                  <span style={{ background: '#fda4af' }} />
                </div>
              </div>
              <div className="ok__rule-mark ok__rule-mark--bad">×</div>
            </Reveal>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene PIVOT (step 2) —— big question ════════ */}
      <SceneFade active={scenePivot} exitMs={420} enterDelayMs={420}>
        <div className="ok__pivot">
          <Reveal kind="rise" duration={1100} delay={120} className="ok__pivot-q" as="h1">
            Why <em className="ok__pivot-em">oklch</em>?
          </Reveal>

          <Reveal kind="rise" duration={780} delay={780} className="ok__pivot-sub" as="p">
            <span className="ok__pivot-strike">HSL</span>
            &nbsp;has a big problem ——
          </Reveal>

          <Reveal kind="tight" duration={1100} delay={1200} className="ok__pivot-issue" as="h2">
            Perceptually <em>Non-Uniform</em>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene COMPARE (step 3) —— dual hue strips + curves ════════ */}
      <SceneFade active={sceneCompare} exitMs={420} enterDelayMs={420}>
        <div className="ok__cmp-scene">
          <Reveal kind="fade" duration={620} delay={80} className="ok__cmp-cap">
            Same lightness / saturation · 12 hues —— which looks <em>better</em> to the human eye
          </Reveal>

          <div className="ok__cmp-grid">
            {/* HSL row */}
            <div className="ok__cmp-row">
              <div className="ok__cmp-row-head">
                <span className="ok__cmp-row-tag ok__cmp-row-tag--bad">HSL · Old</span>
                <span className="ok__cmp-row-formula">hsl(h, 70%, 60%)</span>
              </div>
              <div className="ok__cmp-strip">
                {HUES.map((h, i) => (
                  <div
                    key={`hsl-${h}`}
                    className={`ok__cmp-swatch ${h === 60 ? 'is-spot' : ''}`}
                    style={{
                      background: `hsl(${h} 70% 60%)`,
                      animationDelay: `${i * 60}ms`,
                    }}
                  >
                    <span className="ok__cmp-swatch-tick">{h}°</span>
                  </div>
                ))}
              </div>
              <svg
                className="ok__cmp-curve ok__cmp-curve--bad"
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
              >
                <path
                  d={
                    'M0 80 ' +
                    HUES.map((h, i) => {
                      const x = (i / (HUES.length - 1)) * 1200;
                      const y = 78 - hslPerceived(h) * 70;
                      return `L${x.toFixed(1)} ${y.toFixed(1)}`;
                    }).join(' ') +
                    ' L1200 80 Z'
                  }
                  fill="var(--crimson)"
                  fillOpacity="0.12"
                  stroke="var(--crimson)"
                  strokeWidth="2"
                />
              </svg>
              <div className="ok__cmp-callout ok__cmp-callout--bad">
                <span className="ok__cmp-callout-arrow">↑</span>
                <span>Same 60% lightness —— yellow looks spotlit</span>
              </div>
            </div>

            {/* OKLCH row */}
            <div className="ok__cmp-row">
              <div className="ok__cmp-row-head">
                <span className="ok__cmp-row-tag ok__cmp-row-tag--good">OKLCH · New</span>
                <span className="ok__cmp-row-formula">oklch(0.70 0.15 h)</span>
              </div>
              <div className="ok__cmp-strip">
                {HUES.map((h, i) => (
                  <div
                    key={`ok-${h}`}
                    className="ok__cmp-swatch"
                    style={{
                      background: `oklch(0.70 0.15 ${h})`,
                      animationDelay: `${i * 60 + 220}ms`,
                    }}
                  >
                    <span className="ok__cmp-swatch-tick">{h}°</span>
                  </div>
                ))}
              </div>
              <svg
                className="ok__cmp-curve ok__cmp-curve--good"
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
              >
                <path
                  d={'M0 80 L0 30 L1200 30 L1200 80 Z'}
                  fill="var(--accent)"
                  fillOpacity="0.10"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
              </svg>
              <div className="ok__cmp-callout ok__cmp-callout--good">
                <span className="ok__cmp-callout-arrow">→</span>
                <span>L / C unchanged, only rotate h —— lightness stays consistent</span>
              </div>
            </div>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene CLOSE（step 4）════════ */}
      <SceneFade active={sceneClose} exitMs={420} enterDelayMs={420}>
        <div className="ok__close">
          <Reveal kind="fade" duration={780} delay={120} className="ok__close-eyebrow">
            A small detail ——
          </Reveal>

          <Reveal kind="rise" duration={1300} delay={460} className="ok__close-line" as="h1">
            Web <em>Refinement</em>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={1080} className="ok__close-arrow" as="span">
            ↑
          </Reveal>

          <Reveal kind="fade" duration={780} delay={1500} className="ok__close-caption" as="p">
            Instantly elevated
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'oklch',
  title: 'Part Four · oklch Color',
  eyebrow: '07',
  steps: 5,
  theme: 'light',
  Component: Oklch,
};

export default def;
