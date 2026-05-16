import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './Restraint.css';

/**
 * Chapter 08 · Part Five: Content Restraint
 *
 * Voiceover script (strictly aligned):
 *   1. "The prompt quotes a classic Steve Jobs line: 'A thousand No's for every Yes'."
 *   2. "AI has a bad habit when designing —— it can't wait to fill every inch of space."
 *      "Hero, features, testimonials, data, FAQ, contact info… everything at once, but each block is mediocre."
 *   3. "Claude Design's stance is clear: every element must justify why it deserves to be there."
 *   4. "Want to add something? Ask the user first. Page looks empty? That's a layout problem, solve it with whitespace, not by stuffing more content."
 *   5. "One bold whitespace is far more expressive than ten filler sections."
 *
 * Pacing (6 steps / step 0..5):
 *  0  hero "1000 No · 1 Yes" big opening + Steve Jobs + original prompt (L75)
 *  1  Transition to AI landing page: 6 section wireframes appear in sequence
 *  2  filler content stuffed full ("can't wait to fill every inch")
 *  3  Red × cuts them one by one ("every element must justify itself")
 *  4  State principle at center after whitespace: "Want to add? Ask first. Empty? Use whitespace" + earn-its-place prompt
 *  5  Closing: "One bold whitespace > ten filler sections"
 */

interface Section {
  id: string;
  label: string;
  cn: string;
}

const SECTIONS: Section[] = [
  { id: 'hero',     label: 'HERO',         cn: 'Hero' },
  { id: 'feat',     label: 'FEATURES',     cn: '6 Key Features' },
  { id: 'social',   label: 'TESTIMONIALS', cn: 'Testimonials' },
  { id: 'data',     label: 'DATA',         cn: 'Data Showcase' },
  { id: 'faq',      label: 'FAQ',          cn: 'FAQ' },
  { id: 'contact',  label: 'CONTACT',      cn: 'Contact' },
];

function SectionBlock({
  s,
  index,
  filled,
  pruned,
}: {
  s: Section;
  index: number;
  filled: boolean;
  pruned: boolean;
}) {
  return (
    <div
      className={`re__sec ${filled ? 'is-filled' : ''} ${pruned ? 'is-pruned' : ''}`}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="re__sec-head">
        <span className="re__sec-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="re__sec-label">{s.label}</span>
        <span className="re__sec-dot" />
        <span className="re__sec-cn">{s.cn}</span>
      </div>
      <div className="re__sec-body">
        {!filled && (
          <>
            <span className="re__sec-bar re__sec-bar--w70" />
            <span className="re__sec-bar re__sec-bar--w50" />
          </>
        )}
        {filled && s.id === 'hero' && (
          <div className="re__filler re__filler--hero">
            <span className="re__filler-h">Build the Future. Today.</span>
            <span className="re__filler-sub">The all-in-one platform for the modern team — fast, simple, powerful.</span>
            <span className="re__filler-cta">Get Started →</span>
          </div>
        )}
        {filled && s.id === 'feat' && (
          <div className="re__filler re__filler--feat">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="re__filler-card">
                <span className="re__filler-card-icon">★</span>
                <span className="re__filler-card-t" />
                <span className="re__filler-card-l" />
              </span>
            ))}
          </div>
        )}
        {filled && s.id === 'social' && (
          <div className="re__filler re__filler--social">
            {[0, 1, 2].map((i) => (
              <span key={i} className="re__filler-quote">
                <span className="re__filler-quote-mark">"</span>
                Best product I've ever used. 10/10.
                <span className="re__filler-quote-by">— User #{i + 1}</span>
              </span>
            ))}
          </div>
        )}
        {filled && s.id === 'data' && (
          <div className="re__filler re__filler--data">
            <span><b>10k+</b> users</span>
            <span><b>99.9%</b> uptime</span>
            <span><b>4.9★</b> rating</span>
            <span><b>+42%</b> growth</span>
          </div>
        )}
        {filled && s.id === 'faq' && (
          <div className="re__filler re__filler--faq">
            <span>＋ How does it work?</span>
            <span>＋ Is there a free trial?</span>
            <span>＋ Can I cancel anytime?</span>
          </div>
        )}
        {filled && s.id === 'contact' && (
          <div className="re__filler re__filler--contact">
            <span className="re__filler-input" />
            <span className="re__filler-input" />
            <span className="re__filler-btn">Send Message</span>
          </div>
        )}
      </div>

      <div className="re__sec-prune" aria-hidden>
        <span className="re__sec-prune-mark">×</span>
        <span className="re__sec-prune-line" />
      </div>
    </div>
  );
}

function Restraint({ localStep }: ChapterContext) {
  const at = (n: number) => localStep >= n;
  void at;

  const sceneJobs   = localStep <= 0;
  const scenePage   = localStep >= 1 && localStep <= 3;
  const scenePrinc  = localStep === 4;
  const sceneClose  = localStep >= 5;

  const filled = localStep >= 2;
  const pruned = localStep >= 3;

  return (
    <section className="re">
      {/* ════════ Scene JOBS (step 0) —— Jobs quote opening ════════ */}
      <SceneFade active={sceneJobs} exitMs={420} enterDelayMs={120}>
        <div className="re__jobs">
          <Reveal kind="fade" duration={780} delay={120} className="re__jobs-by">
            —— STEVE JOBS · Prompt Original Quote
          </Reveal>

          <div className="re__jobs-row">
            <Reveal kind="rise" duration={1100} delay={300} className="re__jobs-num re__jobs-num--no">
              <span className="re__jobs-num-figure">1000</span>
              <span className="re__jobs-num-label">No</span>
            </Reveal>

            <Reveal kind="fade" duration={780} delay={760} className="re__jobs-arrow" as="span">
              for
            </Reveal>

            <Reveal kind="rise" duration={1100} delay={1000} className="re__jobs-num re__jobs-num--yes">
              <span className="re__jobs-num-figure">1</span>
              <span className="re__jobs-num-label">Yes</span>
            </Reveal>
          </div>

          <Reveal kind="fade" duration={780} delay={1500} className="re__jobs-quote" as="p">
            <em>"</em>
            One thousand no's for every yes.
            <em>"</em>
          </Reveal>

          <Reveal kind="rise" duration={780} delay={1900} className="re__jobs-src">
            <span className="re__src-bracket">[</span>
            <span className="re__src-label">SYSTEM PROMPT</span>
            <span className="re__src-sep">·</span>
            <span className="re__src-line">L77</span>
            <span className="re__src-bracket">]</span>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene PAGE (step 1..3) —— AI stuffs 6 sections full → cuts ════════ */}
      <SceneFade active={scenePage} exitMs={420} enterDelayMs={420}>
        <div className="re__page-scene">
          <Reveal kind="fade" duration={620} delay={80} className="re__page-cap">
            <span className="re__page-cap-tag">A TYPICAL "AI" LANDING PAGE</span>
            <span className="re__page-cap-sep">/</span>
            <span className="re__page-cap-text">
              {!filled && 'AI lays out all 6 sections at once ——'}
              {filled && !pruned && 'Then fills every slot to the brim ——'}
              {pruned && 'Interrogate each one: why are you here?'}
            </span>
          </Reveal>

          <div className="re__browser">
            <div className="re__browser-bar">
              <span className="re__browser-dot" />
              <span className="re__browser-dot" />
              <span className="re__browser-dot" />
              <span className="re__browser-url">claude-design.demo / fake-landing-page</span>
            </div>
            <div className="re__browser-body">
              <div className="re__page">
                {SECTIONS.map((s, i) => (
                  <SectionBlock
                    key={s.id}
                    s={s}
                    index={i}
                    filled={filled}
                    pruned={pruned}
                  />
                ))}
              </div>
            </div>
          </div>

          {pruned && (
            <Reveal kind="fade" duration={620} delay={620} className="re__page-verdict">
              <span className="re__page-verdict-mark">×</span>
              Each block is "fine", but together —— still <em>mediocre</em>
            </Reveal>
          )}
        </div>
      </SceneFade>

      {/* ════════ Scene PRINCIPLE (step 4) —— state principle ════════ */}
      <SceneFade active={scenePrinc} exitMs={420} enterDelayMs={420}>
        <div className="re__princ">
          <Reveal kind="rise" duration={780} delay={80} className="re__princ-head" as="h2">
            Claude Design's Stance ——
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={360} className="re__princ-line" as="p">
            Every element must <em>justify</em> why it deserves to be there.
          </Reveal>

          <div className="re__princ-rules">
            <Reveal kind="rise" duration={720} delay={760} className="re__princ-rule">
              <span className="re__princ-q">Want to add something?</span>
              <span className="re__princ-arrow">→</span>
              <span className="re__princ-a">Ask the user first</span>
            </Reveal>
            <Reveal kind="rise" duration={720} delay={1000} className="re__princ-rule">
              <span className="re__princ-q">Page looks empty?</span>
              <span className="re__princ-arrow">→</span>
              <span className="re__princ-a">Solve it with <em>whitespace</em>, not more content</span>
            </Reveal>
          </div>

          <Reveal kind="rise" duration={780} delay={1400} className="re__princ-excerpt">
            <div className="re__princ-excerpt-head">
              <span className="re__src-bracket">[</span>
              <span className="re__src-label">SYSTEM PROMPT</span>
              <span className="re__src-sep">·</span>
              <span className="re__src-line">L75</span>
              <span className="re__src-bracket">]</span>
            </div>
            <div className="re__princ-excerpt-body">
              <span className="re__princ-excerpt-gt">&gt;</span>
              <span className="re__princ-excerpt-text">
                Never pad a design with{' '}
                <em>placeholder text, dummy sections</em>{' '}
                just to fill space. <em>Every element should earn its place.</em>
              </span>
            </div>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene CLOSE (step 5) —— bold whitespace ════════ */}
      <SceneFade active={sceneClose} exitMs={420} enterDelayMs={420}>
        <div className="re__close">
          <Reveal kind="rise" duration={1300} delay={120} className="re__close-line" as="h1">
            One bold <em>whitespace</em>,
          </Reveal>

          <Reveal kind="rise" duration={1300} delay={780} className="re__close-line re__close-line--alt" as="h1">
            is more <em>expressive</em> than ten filler sections.
          </Reveal>

          <Reveal kind="fade" duration={780} delay={1700} className="re__close-foot">
            <span>Whitespace</span>
            <span className="re__close-foot-eq">=</span>
            <span>Design</span>
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'restraint',
  title: 'Part Five · Content Restraint',
  eyebrow: '08',
  steps: 6,
  theme: 'light',
  Component: Restraint,
};

export default def;
