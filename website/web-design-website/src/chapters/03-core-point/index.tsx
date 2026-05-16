import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import { NumberTicker } from '../../shared/NumberTicker';
import './CorePoint.css';

/**
 * Chapter 03 · Core Point
 *
 * Voiceover theme:
 *  "Claude Design is strong because half is Opus 4.7, the other half is carefully crafted prompts.
 *   Launched less than 24 hours, the full system prompt was leaked. Next, we break it down line by line."
 *
 * Pacing (6 steps / step 0..5):
 *  0  Environment (dark ink background + grid vibe, one-line eyebrow)
 *  1  Hero question: "Claude Design · Why so strong?"
 *  2  Answer unfolds: 50/50 split, left OPUS 4.7 / right SYSTEM PROMPT
 *  3  Right side "prompts fall from the sky" — real snippets drop into doc preview one by one
 *  4  Leaked event badge: "< 24 HOURS · LEAKED"
 *  5  Transition cue: "Next, we break it down line by line ↓"
 */

const PROMPT_LINES: string[] = [
  'You are an expert designer working with the user as a manager.',
  'You produce design artifacts on behalf of the user using HTML.',
  'HTML is your tool, but your medium and output format vary.',
  'You must embody an expert in that domain:',
  '  animator, UX designer, slide designer, prototyper, etc.',
  'Avoid web design tropes and conventions',
  '  unless you are making a web page.',
  '## Your workflow',
  '1. Understand user needs. Ask clarifying questions ...',
  '2. Explore provided resources. Read the design system ...',
];

function CorePoint({ localStep }: ChapterContext) {
  const at = (n: number) => localStep >= n;

  // Scene: 1+ enters analysis; before 2 is solo hero centered
  const sceneHero = localStep <= 1;
  const sceneSplit = localStep >= 2;

  return (
    <section className="cp">
      {/* Decorative background grid + corner coordinates */}
      <div className="cp__grid" aria-hidden />
      <div className="cp__cornerTL" aria-hidden>
        <span /><span />
      </div>
      <div className="cp__cornerBR" aria-hidden>
        <span /><span />
      </div>

      {/* ───────── Scene HERO（step 0..1）───────── */}
      <SceneFade active={sceneHero} exitMs={420} enterDelayMs={120}>
        <div className="cp__hero">
          <Reveal kind="fade" duration={700} delay={120} className="cp__hero-eyebrow">
            <span className="cp__hero-eyebrow-bar" />
            <span>03 · Core Point</span>
            <span className="cp__hero-eyebrow-bar" />
          </Reveal>

          {at(1) && (
            <Reveal kind="rise" duration={1100} delay={80} className="cp__hero-title" as="h1">
              Claude Design<br />
              <em className="cp__hero-em">Why so strong?</em>
            </Reveal>
          )}
        </div>
      </SceneFade>

      {/* ───────── Scene SPLIT（step 2..5）───────── */}
      <SceneFade active={sceneSplit} exitMs={420} enterDelayMs={420}>
        <div className="cp__split">
          {/* Small echo of the question at top (no longer big text) */}
          <Reveal kind="fade" duration={620} delay={120} className="cp__split-eyebrow">
            <span>Why so strong?</span>
            <span className="cp__split-eyebrow-arrow">→</span>
            <span>The answer is</span>
          </Reveal>

          {/* Central divider */}
          <Reveal kind="fade" duration={900} delay={300} className="cp__split-divider">
            <span className="cp__split-divider-line" />
            <span className="cp__split-divider-knob">+</span>
            <span className="cp__split-divider-line" />
          </Reveal>

          <div className="cp__columns">
            {/* —— Left: OPUS 4.7 —— */}
            <Reveal kind="rise" duration={900} delay={420} className="cp__col cp__col--left">
              <div className="cp__col-pct">
                <NumberTicker to={50} duration={1100} decimals={0} />
                <span className="cp__col-pct-sign">%</span>
              </div>
              <div className="cp__col-kicker">MODEL</div>
              <h2 className="cp__col-title">Opus 4.7</h2>
              <p className="cp__col-desc">
                Anthropic's current flagship model ——<br />
                The combined ceiling of decision-making, taste, long-chain reasoning, and coding ability
              </p>

              <div className="cp__col-meter">
                <div className="cp__col-meter-bar" style={{ width: at(2) ? '50%' : '0%' }} />
                <div className="cp__col-meter-ticks">
                  <span /><span /><span /><span /><span />
                </div>
              </div>

              <div className="cp__col-tags">
                <span>reasoning</span>
                <span>taste</span>
                <span>code</span>
              </div>
            </Reveal>

            {/* —— Right: SYSTEM PROMPT —— */}
            <Reveal kind="rise" duration={900} delay={560} className="cp__col cp__col--right">
              <div className="cp__col-pct">
                <NumberTicker to={50} duration={1100} delay={140} decimals={0} />
                <span className="cp__col-pct-sign">%</span>
              </div>
              <div className="cp__col-kicker">SYSTEM PROMPT</div>
              <h2 className="cp__col-title">Prompt Engineering</h2>
              <p className="cp__col-desc">
                ~420 lines of expert-level system prompt ——<br />
                Strong constraints on the model's "role / workflow / boundaries / taste"
              </p>

              {/* Doc preview */}
              <div className="cp__doc">
                <div className="cp__doc-bar">
                  <span className="cp__doc-bar-dot" />
                  <span className="cp__doc-bar-dot" />
                  <span className="cp__doc-bar-dot" />
                  <span className="cp__doc-bar-name">claude-design.system.md</span>
                </div>
                <div className="cp__doc-body">
                  {at(3) && PROMPT_LINES.map((line, i) => (
                    <Reveal
                      key={`pl-${i}-${localStep}`}
                      kind="fall"
                      duration={520}
                      delay={i * 90}
                      className="cp__doc-line"
                    >
                      <span className="cp__doc-line-no">{String(i + 1).padStart(2, '0')}</span>
                      <span className="cp__doc-line-text">{line}</span>
                    </Reveal>
                  ))}
                  {at(3) && (
                    <Reveal kind="fade" duration={400} delay={PROMPT_LINES.length * 90 + 200}>
                      <span className="cp__doc-cursor">▍</span>
                    </Reveal>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Leaked badge */}
          {at(4) && (
            <Reveal kind="rise" duration={780} className="cp__leaked">
              <div className="cp__leaked-stamp">
                <span className="cp__leaked-stamp-dot" />
                LEAKED
              </div>
              <div className="cp__leaked-meta">
                <div className="cp__leaked-meta-time">
                  <span className="cp__leaked-meta-lt">&lt;</span>
                  <NumberTicker to={24} duration={900} decimals={0} />
                  <span className="cp__leaked-meta-unit">HOURS</span>
                </div>
                <div className="cp__leaked-meta-text">
                  Launched less than 24 hours, the full system prompt was leaked,<br />
                  widely circulated in security / prompt engineering circles
                </div>
              </div>
            </Reveal>
          )}

          {/* Transition cue */}
          {at(5) && (
            <Reveal kind="rise" duration={760} delay={120} className="cp__pivot">
              <span className="cp__pivot-arrow" />
              <span className="cp__pivot-text">Next, we break down this prompt line by line</span>
            </Reveal>
          )}
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'core-point',
  title: 'Core Point',
  eyebrow: '03',
  steps: 6,
  theme: 'ink',
  Component: CorePoint,
};

export default def;
