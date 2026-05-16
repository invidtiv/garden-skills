import { useEffect, useRef, useState } from 'react';
import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './Closing.css';

/**
 * Chapter 13 · Closing · 85 → 95 Points
 *
 * Narration order (strictly aligned with article/口播稿.md L274-281):
 *   1. "The version without Skill is honestly already quite good.
 *       What Opus 4.7 produces raw is stronger than what most programmers write by hand."
 *   2. "The improvement Skill brings is roughly the gap from 85 points to 95 points."
 *   3. "From usable to beautiful, from complete to polished, from passable to distinctive."
 *   4. "That 10-point gap? It's those seemingly trivial rules in the Skill."
 *   5. "Each one alone doesn't have much effect, but together they create a qualitative leap."
 *
 * Rhythm (5 steps / step 0..4):
 *  0  Fair statement · "The version without Skill — is already quite good"
 *  1  hero · Big 85 → 95 number ticker (central eye-catching animation)
 *  2  Three word pairs · Usable → Beautiful / Complete → Polished / Passable → Distinctive
 *  3  +10 points gap · 10+ "trivial rules" chips fly in and gather
 *  4  Quantity → Quality · Big closing text
 */

/* ──────────────────────────────────────────────────────────────────
 * NumberTicker: smooth interpolation from → to (visual "score jump" in center)
 * Runs once on mount / active toggle
 * ────────────────────────────────────────────────────────────────── */

interface TickerProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  /** Whether in active scene; resets on toggle */
  active: boolean;
}

function NumberTicker({ from, to, duration = 2200, delay = 0, active }: TickerProps) {
  const [val, setVal] = useState(from);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setVal(from);
      return;
    }
    let start = 0;
    const startTimer = window.setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const t = Math.min((ts - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(from + (to - from) * eased);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      window.clearTimeout(startTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [from, to, duration, delay, active]);

  return <span>{Math.round(val)}</span>;
}

/* ──────────────────────────────────────────────────────────────────
 * Step 3: 10 "trivial rules" chip list
 * ────────────────────────────────────────────────────────────────── */

const SMALL_RULES = [
  { id: 'inter',    text: 'No Inter / Roboto' },
  { id: 'oklch',    text: 'oklch Color System' },
  { id: 'system',   text: 'Declare Design System First' },
  { id: 'v0',       text: 'v0 Draft First' },
  { id: 'restraint', text: 'Content Restraint' },
  { id: 'placeholder', text: 'Placeholders > Fake Images' },
  { id: 'whitespace', text: 'Whitespace = Design' },
  { id: 'nograd',   text: 'No Purple-Pink-Blue Gradients' },
  { id: 'noemoji',  text: 'No Emoji as Icons' },
  { id: 'verify',   text: 'Fork Sub-Agent for Verification' },
];

function Closing({ localStep }: ChapterContext) {
  const sceneFair    = localStep <= 0;
  const sceneJump    = localStep === 1;
  const sceneTrio    = localStep === 2;
  const sceneRules   = localStep === 3;
  const sceneClose   = localStep >= 4;

  return (
    <section className="cl">
      {/* ════════ Scene FAIR（step 0）—— Fair Statement ════════ */}
      <SceneFade active={sceneFair} exitMs={420} enterDelayMs={120}>
        <div className="cl__fair">
          <Reveal kind="fade" duration={620} delay={80} className="cl__fair-eyebrow">
            To wrap up —
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={300} className="cl__fair-line" as="h1">
            The version without Skill — <em>is already quite good</em>
          </Reveal>

          <Reveal kind="fade" duration={780} delay={1300} className="cl__fair-cap" as="p">
            What Opus 4.7 produces raw<br />
            <em>is stronger than what most programmers write by hand</em>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene JUMP（step 1）—— 85 → 95 Big Text ════════ */}
      <SceneFade active={sceneJump} exitMs={420} enterDelayMs={420}>
        <div className="cl__jump">
          <Reveal kind="fade" duration={620} delay={80} className="cl__jump-eyebrow">
            The improvement Skill brings —
          </Reveal>

          <div className="cl__jump-row">
            <Reveal kind="rise" duration={1100} delay={300} className="cl__jump-num cl__jump-num--from">
              <span className="cl__jump-num-figure">
                <NumberTicker from={70} to={85} duration={1100} delay={400} active={sceneJump} />
              </span>
              <span className="cl__jump-num-tag">No Skill</span>
            </Reveal>

            <Reveal kind="fade" duration={780} delay={1500} className="cl__jump-arrow" as="span">
              →
            </Reveal>

            <Reveal kind="rise" duration={1100} delay={1700} className="cl__jump-num cl__jump-num--to">
              <span className="cl__jump-num-figure cl__jump-num-figure--big">
                <NumberTicker from={85} to={95} duration={1500} delay={1900} active={sceneJump} />
              </span>
              <span className="cl__jump-num-tag cl__jump-num-tag--alt">With Skill</span>
            </Reveal>
          </div>

          <Reveal kind="fade" duration={780} delay={3100} className="cl__jump-meta">
            <span className="cl__jump-meta-plus">+ 10</span>
            <span className="cl__jump-meta-text">pts</span>
            <span className="cl__jump-meta-dot" />
            <span className="cl__jump-meta-text">From passable to stunning</span>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene TRIO（step 2）—— Three Word Pairs ════════ */}
      <SceneFade active={sceneTrio} exitMs={420} enterDelayMs={420}>
        <div className="cl__trio">
          <Reveal kind="fade" duration={620} delay={80} className="cl__trio-eyebrow">
            What exactly are these 10 points —
          </Reveal>

          <div className="cl__trio-rows">
            {[
              { from: 'Usable', to: 'Beautiful', delay: 260 },
              { from: 'Complete', to: 'Polished', delay: 720 },
              { from: 'Passable', to: 'Distinctive', delay: 1180 },
            ].map((r) => (
              <div
                key={r.from}
                className="cl__trio-row"
                style={{ ['--d' as string]: `${r.delay}ms` }}
              >
                <span className="cl__trio-from">{r.from}</span>
                <span className="cl__trio-arrow">→</span>
                <span className="cl__trio-to">{r.to}</span>
              </div>
            ))}
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene RULES（step 3）—— 10 Trivial Rules Fly In ════════ */}
      <SceneFade active={sceneRules} exitMs={420} enterDelayMs={420}>
        <div className="cl__rules">
          <Reveal kind="fade" duration={620} delay={80} className="cl__rules-eyebrow">
            These 10 points —<em>come from</em>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={260} className="cl__rules-title" as="h2">
            <em>Seemingly trivial</em> rules, one by one
          </Reveal>

          <div className="cl__rules-cloud">
            {SMALL_RULES.map((r, i) => (
              <span
                key={r.id}
                className={`cl__rules-chip cl__rules-chip--${i % 4}`}
                style={{
                  animationDelay: `${500 + i * 110}ms`,
                  ['--rot' as string]: `${(i % 5 - 2) * 1.6}deg`,
                  ['--shift' as string]: `${(i % 3 - 1) * 18}px`,
                }}
              >
                <span className="cl__rules-chip-mark">+</span>
                {r.text}
              </span>
            ))}
          </div>

          <Reveal kind="fade" duration={780} delay={2100} className="cl__rules-foot">
            Each one alone — doesn't seem to matter much
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene CLOSE（step 4）—— Quantity → Quality ════════ */}
      <SceneFade active={sceneClose} exitMs={420} enterDelayMs={420}>
        <div className="cl__close">
          <Reveal kind="rise" duration={1100} delay={120} className="cl__close-l1" as="h1">
            But together —
          </Reveal>
          <Reveal kind="rise" duration={1300} delay={780} className="cl__close-l2" as="h1">
            <em>Quantity</em> → <em>Quality</em>
          </Reveal>
          <Reveal kind="fade" duration={780} delay={1700} className="cl__close-cap" as="p">
            From "<em>Passable</em>" to "<em>Distinctive</em>"
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'closing',
  title: 'Closing · 85 → 95 Points',
  eyebrow: '13',
  steps: 5,
  theme: 'light',
  Component: Closing,
};

export default def;
