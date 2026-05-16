import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './References.css';

/**
 * Chapter 12 · References File · Advanced Template Library
 *
 * Voiceover source (article/voiceover-script.md L218):
 *   "The Skill also comes with a references file, containing some typical code templates.
 *    The inspiration comes from Claude Design's `copy_starter_component`."
 *
 * Rhythm (4 steps / step 0..3):
 *  0  hero · references / advanced-patterns.md filename large text + path tag
 *  1  7 template categories · card waterfall fade in sequence
 *  2  Inspiration source · Claude Design's copy_starter_component
 *  3  Close: "Give AI high-quality starter scaffolding —— rather than drawing from scratch"
 */

interface Tpl {
  id: string;
  num: string;
  name: string;
  cn: string;
  desc: string;
  glyph: string;
}

const TEMPLATES: Tpl[] = [
  { id: 'slide',  num: '01', name: 'Responsive Slide Engine',     cn: 'Responsive Slide Deck', desc: '1920×1080 Auto-Scale / 1-Indexed Numbering / localStorage Resume', glyph: '▭' },
  { id: 'frame',  num: '02', name: 'Device Simulation Frames',    cn: 'Device Simulation Frame',     desc: 'iPhone / Android / Browser Window —— Make Prototypes Feel Like Real Devices', glyph: '▢' },
  { id: 'tweak',  num: '03', name: 'Tweaks Panel',                cn: 'Runtime Tweaks Panel',   desc: 'Floating Bottom-Right Panel: Theme / Font Size / Dark Mode / Spacing One-Click Switch', glyph: '⚙' },
  { id: 'time',   num: '04', name: 'Animation Timeline Engine',   cn: 'Animation Timeline',   desc: 'useTime + Easing + Interpolate —— Draggable Timeline', glyph: '⌁' },
  { id: 'canvas', num: '05', name: 'Design Canvas',               cn: 'Design Comparison Canvas',   desc: 'Lay N Variants Side by Side, Let Users Pick at a Glance', glyph: '◫' },
  { id: 'dark',   num: '06', name: 'Dark Mode Toggle',            cn: 'Dark Mode Toggle',     desc: 'prefers-color-scheme + Manual Override, Token One-Click Flip', glyph: '◐' },
  { id: 'data',   num: '07', name: 'Data Visualization',          cn: 'Data Visualization',   desc: 'Chart.js / D3 / oklch Palette —— Data-Ink Ratio First', glyph: '◢' },
];

function References({ localStep }: ChapterContext) {
  const sceneHero    = localStep <= 0;
  const sceneList    = localStep === 1;
  const sceneOrigin  = localStep === 2;
  const sceneClose   = localStep >= 3;

  return (
    <section className="rf">
      {/* ════════ Scene HERO（step 0）════════ */}
      <SceneFade active={sceneHero} exitMs={420} enterDelayMs={120}>
        <div className="rf__hero">
          <Reveal kind="fade" duration={620} delay={80} className="rf__hero-eyebrow">
            <span className="rf__src-bracket">[</span>
            <span className="rf__src-label">SKILL · BUNDLED FILE</span>
            <span className="rf__src-bracket">]</span>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={260} className="rf__hero-pre" as="p">
            The Skill Also Bundles ——
          </Reveal>

          <Reveal kind="rise" duration={1300} delay={620} className="rf__hero-name" as="h1">
            <span className="rf__hero-dim">references / </span>
            <em>advanced-patterns.md</em>
          </Reveal>

          <Reveal kind="rise" duration={780} delay={1300} className="rf__hero-meta">
            <span>≈ 520 lines</span>
            <span className="rf__hero-meta-dot" />
            <span>7 Templates</span>
            <span className="rf__hero-meta-dot" />
            <span>Ready to Use</span>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene LIST（step 1）—— 7 template waterfall ════════ */}
      <SceneFade active={sceneList} exitMs={420} enterDelayMs={420}>
        <div className="rf__list-scene">
          <Reveal kind="fade" duration={620} delay={80} className="rf__list-cap">
            7 <em>Typical Code Templates</em> · Starter Scaffolding for AI
          </Reveal>

          <div className="rf__grid">
            {TEMPLATES.map((t, i) => (
              <div
                key={t.id}
                className={`rf__card rf__card--${t.id}`}
                style={{ animationDelay: `${260 + i * 110}ms` }}
              >
                <div className="rf__card-num">
                  <span>{t.num}</span>
                  <span className="rf__card-glyph">{t.glyph}</span>
                </div>
                <div className="rf__card-name">{t.name}</div>
                <div className="rf__card-cn">{t.cn}</div>
                <div className="rf__card-desc">{t.desc}</div>
                <div className="rf__card-foot">
                  <span className="rf__card-foot-mono">references/advanced-patterns.md</span>
                  <span className="rf__card-foot-arrow">→</span>
                </div>
              </div>
            ))}

            {/* 8th slot: "Still Updating" small tag */}
            <div
              className="rf__card rf__card--hint"
              style={{ animationDelay: `${260 + 7 * 110}ms` }}
            >
              <div className="rf__card-hint-eyebrow">+ Still Updating</div>
              <div className="rf__card-hint-line">
                Every Template Is <em>Battle-Tested in Real Projects</em>,<br />
                Not "AI-Generated" Content.
              </div>
            </div>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene ORIGIN（step 2）—— Inspiration source ════════ */}
      <SceneFade active={sceneOrigin} exitMs={420} enterDelayMs={420}>
        <div className="rf__origin">
          <Reveal kind="fade" duration={620} delay={80} className="rf__origin-eyebrow">
            Inspired By ——
          </Reveal>

          <div className="rf__origin-row">
            {/* Left: Claude Design original function */}
            <Reveal kind="rise" duration={780} delay={300} className="rf__origin-card rf__origin-card--src">
              <div className="rf__origin-card-tag">
                <span className="rf__src-bracket">[</span>
                <span className="rf__src-label">CLAUDE DESIGN · TOOL</span>
                <span className="rf__src-bracket">]</span>
              </div>
              <div className="rf__origin-card-fn">
                <span className="rf__origin-card-fn-name">copy_starter_component</span>
                <span className="rf__origin-card-fn-paren">()</span>
              </div>
              <div className="rf__origin-card-desc">
                Give Agents <em>High-Quality Starter Scaffolding</em> ——<br />
                Instead of Letting Them <em>"Improvise"</em> From Scratch.
              </div>
            </Reveal>

            {/* Middle: arrow */}
            <Reveal kind="fade" duration={780} delay={780} className="rf__origin-arrow" as="span">
              <span className="rf__origin-arrow-line" />
              <span className="rf__origin-arrow-text">Distilled</span>
              <span className="rf__origin-arrow-head">→</span>
            </Reveal>

            {/* Right: references */}
            <Reveal kind="rise" duration={780} delay={900} className="rf__origin-card rf__origin-card--dst">
              <div className="rf__origin-card-tag rf__origin-card-tag--dst">
                <span className="rf__src-bracket">[</span>
                <span className="rf__src-label">SKILL · references/</span>
                <span className="rf__src-bracket">]</span>
              </div>
              <div className="rf__origin-card-fn">
                <span className="rf__origin-card-fn-name">advanced-patterns.md</span>
              </div>
              <div className="rf__origin-card-desc">
                7 <em>Ready-to-Use</em> Code Templates ——<br />
                Claude Code · Cursor · Codex Can All Import Directly.
              </div>
            </Reveal>
          </div>

          <Reveal kind="fade" duration={780} delay={1500} className="rf__origin-foot">
            Take Anthropic's <em>Secret Sauce</em>, Use It in Any Tool
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene CLOSE（step 3）════════ */}
      <SceneFade active={sceneClose} exitMs={420} enterDelayMs={420}>
        <div className="rf__close">
          <Reveal kind="rise" duration={1100} delay={120} className="rf__close-l1" as="h1">
            High-Quality <em>Starter Scaffolding</em>
          </Reveal>
          <Reveal kind="rise" duration={1100} delay={780} className="rf__close-l2" as="h2">
            ——&nbsp; Much Better Than Making AI <em>Draw From Scratch</em>
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'references',
  title: 'references · Advanced Template Library',
  eyebrow: '12',
  steps: 4,
  theme: 'light',
  Component: References,
};

export default def;
