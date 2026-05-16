import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './AntiAi.css';

/**
 * Chapter 06 · Part Three: De-AI-ing
 *
 * Voiceover gist:
 *   - "AI look" comes from recurring visual tropes: gradients / Emoji / left color bar cards / overused fonts / data slop / over-drawn SVG
 *   - Any one alone is fine, repeated use becomes a "look"
 *   - Font list: the point isn't what to use, it's what NOT to use (Inter / Roboto / Arial / Fraunces / system-ui)
 *   - Alternatives are niche but high-quality fonts (Plus Jakarta Sans / Space Grotesk / Sora / Newsreader)
 *
 * Pacing (6 steps / step 0..5):
 *  0  Setup (eyebrow)
 *  1  hero "What is that AI look?" + original prompt block
 *  2  6 anti-pattern cards appear in sequence (stagger)
 *  3  All slashed with red lines
 *  4  Font mini-topic: blacklist (actual font rendering)
 *  5  Recommended alternatives (actual font rendering) + takeaway
 */

interface AntiPattern {
  id: string;
  cn: string;
  en: string;
}

const PATTERNS: AntiPattern[] = [
  { id: 'gradient', cn: 'Pastel Gradient Background',  en: 'PASTEL GRADIENT' },
  { id: 'emoji',    cn: 'Emoji as Icons',     en: 'EMOJI ICONS'    },
  { id: 'leftbar',  cn: 'Left Color Bar Cards',   en: 'LEFT COLOR BAR' },
  { id: 'font',     cn: 'Overused Fonts',       en: 'STOCK FONTS'    },
  { id: 'data',     cn: 'Fake Data Slop',       en: 'DATA SLOP'      },
  { id: 'svg',      cn: 'Over-Drawn SVG',     en: 'OVER-DRAWN SVG' },
];

const BANNED_FONTS = [
  { name: 'Inter',     family: 'Inter, sans-serif',     sample: 'AaBbCc 123' },
  { name: 'Roboto',    family: 'Roboto, sans-serif',    sample: 'AaBbCc 123' },
  { name: 'Arial',     family: 'Arial, sans-serif',     sample: 'AaBbCc 123' },
  { name: 'Fraunces',  family: '"Fraunces", serif',     sample: 'AaBbCc 123' },
  { name: 'system-ui', family: 'system-ui, sans-serif', sample: 'AaBbCc 123' },
];

const BETTER_FONTS = [
  { name: 'Plus Jakarta Sans', family: '"Plus Jakarta Sans", sans-serif', sample: 'AaBbCc 123', tag: 'sans · workhorse' },
  { name: 'Space Grotesk',     family: '"Space Grotesk", sans-serif',     sample: 'AaBbCc 123', tag: 'sans · engineering feel'    },
  { name: 'Sora',              family: '"Sora", sans-serif',              sample: 'AaBbCc 123', tag: 'sans · modern restraint'  },
  { name: 'Newsreader',        family: '"Newsreader", serif',             sample: 'AaBbCc 123', tag: 'serif · editorial feel'  },
];

/** Single anti-pattern card —— visual demo + name + (later) red slash */
function BadCard({ p, slashed }: { p: AntiPattern; slashed: boolean }) {
  return (
    <div className={`aa__bad ${slashed ? 'is-slashed' : ''}`} data-id={p.id}>
      <div className="aa__bad-canvas">
        {p.id === 'gradient' && (
          <div className="aa__bad-gradient" />
        )}
        {p.id === 'emoji' && (
          <div className="aa__bad-emoji">
            <span>🚀</span><span>🎯</span><span>💡</span><span>⭐</span><span>🔥</span>
          </div>
        )}
        {p.id === 'leftbar' && (
          <div className="aa__bad-leftbar">
            <span className="aa__bad-leftbar-stripe" />
            <div className="aa__bad-leftbar-body">
              <div className="aa__bad-leftbar-t" />
              <div className="aa__bad-leftbar-l" />
              <div className="aa__bad-leftbar-l aa__bad-leftbar-l--short" />
            </div>
          </div>
        )}
        {p.id === 'font' && (
          <div className="aa__bad-font">
            <span style={{ fontFamily: 'Inter, sans-serif' }}>Welcome to Our Platform</span>
            <span style={{ fontFamily: 'Roboto, sans-serif' }}>Get Started in Seconds</span>
          </div>
        )}
        {p.id === 'data' && (
          <div className="aa__bad-data">
            <div><span>★</span><b>4.9</b></div>
            <div><span>↗</span><b>+42%</b></div>
            <div><span>◷</span><b>12k</b></div>
            <div><span>⚡</span><b>99.9%</b></div>
          </div>
        )}
        {p.id === 'svg' && (
          <svg viewBox="0 0 80 80" className="aa__bad-svg">
            <defs>
              <linearGradient id={`g-${p.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"  stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#f0abfc" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
            </defs>
            <path
              d="M40 8 L60 24 L72 48 L60 70 L40 72 L20 70 L8 48 L20 24 Z"
              fill={`url(#g-${p.id})`}
              stroke="#7c3aed"
              strokeWidth="1.5"
            />
            <circle cx="40" cy="40" r="14" fill="white" opacity="0.6" />
            <path d="M30 40 L50 40 M40 30 L40 50" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )}

        {/* Red slash overlay */}
        <div className="aa__bad-slash" aria-hidden>
          <span className="aa__bad-slash-line" />
        </div>
      </div>

      <div className="aa__bad-foot">
        <span className="aa__bad-en">{p.en}</span>
        <span className="aa__bad-cn">{p.cn}</span>
      </div>
    </div>
  );
}

function AntiAi({ localStep }: ChapterContext) {
  const at = (n: number) => localStep >= n;

  const sceneHero  = localStep <= 1;
  const sceneGrid  = localStep === 2 || localStep === 3;
  const sceneFonts = localStep >= 4;

  const slashed = localStep >= 3;
  const showAlt = localStep >= 5;

  return (
    <section className="aa">
      {/* ════════ Scene HERO（step 0..1）════════ */}
      <SceneFade active={sceneHero} exitMs={420} enterDelayMs={120}>
        <div className="aa__hero">
          {at(1) && (
            <>
              <Reveal kind="rise" duration={1100} delay={120} className="aa__hero-title" as="h1">
                What is that <em className="aa__hero-em">AI look</em>?
              </Reveal>

              <Reveal kind="rise" duration={780} delay={520} className="aa__hero-sub" as="p">
                Any one alone isn't wrong ——<br />
                <em>Stack them repeatedly, and it becomes a "look".</em>
              </Reveal>

              <Reveal kind="rise" duration={780} delay={820} className="aa__excerpt">
                <div className="aa__excerpt-head">
                  <span className="aa__src-bracket">[</span>
                  <span className="aa__src-label">SYSTEM PROMPT</span>
                  <span className="aa__src-sep">·</span>
                  <span className="aa__src-line">L04</span>
                  <span className="aa__src-bracket">]</span>
                </div>
                <div className="aa__excerpt-body">
                  <span className="aa__excerpt-gt">&gt;</span>
                  <span className="aa__excerpt-text">
                    Avoid <em>web design tropes and conventions</em> unless you are
                    making a web page.
                  </span>
                </div>
              </Reveal>
            </>
          )}
        </div>
      </SceneFade>

      {/* ════════ Scene GRID（step 2..3）════════ */}
      <SceneFade active={sceneGrid} exitMs={420} enterDelayMs={420}>
        <div className="aa__grid-scene">
          <Reveal kind="fade" duration={620} delay={80} className="aa__grid-cap">
            A few old tropes AI uses over and over —— instantly recognizable
          </Reveal>

          <div className="aa__grid">
            {PATTERNS.map((p, i) => (
              <div
                key={p.id}
                className="aa__grid-slot"
                style={{ animationDelay: `${i * 110}ms` }}
              >
                <BadCard p={p} slashed={slashed} />
              </div>
            ))}
          </div>

          {at(3) && (
            <Reveal kind="fade" duration={620} delay={620} className="aa__grid-verdict">
              <span className="aa__grid-verdict-mark">×</span>
              Claude Design lists these pitfalls <em>one by one</em>, forcing AI to take a new path.
            </Reveal>
          )}
        </div>
      </SceneFade>

      {/* ════════ Scene FONTS（step 4..5）════════ */}
      <SceneFade active={sceneFonts} exitMs={420} enterDelayMs={420}>
        <div className="aa__fonts-scene">
          <Reveal kind="rise" duration={780} delay={80} className="aa__fonts-head">
            <span className="aa__fonts-num">Mini Topic</span>
            <h2 className="aa__fonts-title">
              Font Recommendations —— The Point Is <em>What Not to Use</em>
            </h2>
          </Reveal>

          <div className="aa__fonts-grid">
            {/* Blacklist */}
            <Reveal kind="rise" duration={780} delay={260} className="aa__fonts-col aa__fonts-col--ban">
              <div className="aa__fonts-col-tag">
                <span className="aa__fonts-col-mark">×</span>
                BLACKLIST · Do Not Use
              </div>
              <div className="aa__fonts-list">
                {BANNED_FONTS.map((f, i) => (
                  <div
                    key={f.name}
                    className="aa__fonts-row aa__fonts-row--ban"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="aa__fonts-row-name" style={{ fontFamily: f.family }}>
                      {f.name}
                    </div>
                    <div className="aa__fonts-row-sample" style={{ fontFamily: f.family }}>
                      {f.sample}
                    </div>
                    <span className="aa__fonts-row-strike" />
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Recommended alternatives */}
            {showAlt && (
              <Reveal kind="rise" duration={900} delay={120} className="aa__fonts-col aa__fonts-col--alt">
                <div className="aa__fonts-col-tag">
                  <span className="aa__fonts-col-mark aa__fonts-col-mark--ok">✓</span>
                  ALTERNATIVES · Better Options
                </div>
                <div className="aa__fonts-list">
                  {BETTER_FONTS.map((f, i) => (
                    <div
                      key={f.name}
                      className="aa__fonts-row aa__fonts-row--alt"
                      style={{ animationDelay: `${i * 110}ms` }}
                    >
                      <div className="aa__fonts-row-name" style={{ fontFamily: f.family }}>
                        {f.name}
                      </div>
                      <div className="aa__fonts-row-sample" style={{ fontFamily: f.family }}>
                        {f.sample}
                      </div>
                      <span className="aa__fonts-row-tag">{f.tag}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {showAlt && (
            <Reveal kind="fade" duration={620} delay={620} className="aa__fonts-foot">
              <span>Niche</span>
              <span className="aa__fonts-foot-dot" />
              <span>Free</span>
              <span className="aa__fonts-foot-dot" />
              <span>High Quality</span>
              <span className="aa__fonts-foot-dot" />
              <span>Removes the AI look instantly</span>
            </Reveal>
          )}
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'anti-ai',
  title: 'Part Three · De-AI-ing',
  eyebrow: '06',
  steps: 6,
  theme: 'light',
  Component: AntiAi,
};

export default def;
