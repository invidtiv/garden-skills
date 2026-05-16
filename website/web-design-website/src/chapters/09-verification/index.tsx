import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './Verification.css';

/**
 * Chapter 09 · Part 6: Verification Loop
 *
 * Voiceover original order (strictly aligned):
 *   1. "Sixth point, verification."
 *   2. "After development completes, it forks an independent sub-agent, then does a comprehensive check on the current completed webpage."
 *   3. "When the same agent checks its own output, it naturally tends to think there's no problem."
 *   4. "Switch to a brand new context, and this 'self-satisfaction' is easily broken."
 *
 * Original text (L22):
 *   "Finish: call `done` to surface the file to the user and check it loads cleanly.
 *    If errors, fix and `done` again. If clean, call `fork_verifier_agent`."
 *
 * Rhythm (5 steps / step 0..4):
 *  0  hero · prompt source text (L22) + large text "Verification —— Don't Trust Your Own Output"
 *  1  main Agent node appears, with self-loop ("Did I do it right?") → labeled "Confirmation Bias"
 *  2  fork → sub-Agent node pops up, labeled "fresh context"
 *  3  sub-Agent runs 4 checks: SCREENSHOT / CONSOLE / LAYOUT / JS PROBE staggered ticks
 *  4  closing large text: "Switch to a Fresh Brain / Break Out of Self-Deception"
 */

interface Check {
  id: string;
  label: string;
  cn: string;
}

const CHECKS: Check[] = [
  { id: 'shot',   label: 'SCREENSHOT',   cn: 'Screenshot Compare' },
  { id: 'cons',   label: 'CONSOLE LOGS', cn: 'Console Errors' },
  { id: 'lay',    label: 'LAYOUT',       cn: 'Layout Shift' },
  { id: 'js',     label: 'JS PROBE',     cn: 'DOM Probe' },
];

function Verification({ localStep }: ChapterContext) {
  const sceneIntro  = localStep <= 0;
  const sceneAgent  = localStep === 1;
  const sceneFork   = localStep === 2;
  const sceneCheck  = localStep === 3;
  const sceneClose  = localStep >= 4;

  return (
    <section className="vf">
      {/* ════════ Scene INTRO（step 0）════════ */}
      <SceneFade active={sceneIntro} exitMs={420} enterDelayMs={120}>
        <div className="vf__intro">
          <Reveal kind="fade" duration={620} delay={80} className="vf__intro-tag">
            <span className="vf__src-bracket">[</span>
            <span className="vf__src-label">SYSTEM PROMPT</span>
            <span className="vf__src-sep">·</span>
            <span className="vf__src-line">L22</span>
            <span className="vf__src-bracket">]</span>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={300} className="vf__intro-code">
            <span className="vf__intro-code-num">5.</span>
            <span className="vf__intro-code-text">
              Finish: call <em className="vf__intro-fn">done</em>.<br />
              If errors, <em>fix</em> and <em className="vf__intro-fn">done</em> again.<br />
              If clean, call <em className="vf__intro-fn">fork_verifier_agent()</em>.
            </span>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={1700} className="vf__intro-title" as="h1">
            Verification —— Don't Trust<em>Your Own</em> Output
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene AGENT（step 1）—— Main Agent + self-loop ════════ */}
      <SceneFade active={sceneAgent} exitMs={420} enterDelayMs={420}>
        <div className="vf__agent-scene">
          <Reveal kind="fade" duration={620} delay={80} className="vf__agent-cap">
            What Happens When an Agent <em>Checks Itself</em>?
          </Reveal>

          <div className="vf__board">
            {/* Main Agent node */}
            <div className="vf__node vf__node--main">
              <div className="vf__node-tag">MAIN AGENT</div>
              <div className="vf__node-title">opus 4.7</div>
              <div className="vf__node-meta">role · designer · L01</div>

              {/* Self-loop arrow (SVG) */}
              <svg className="vf__loop" viewBox="0 0 200 200" aria-hidden>
                <defs>
                  <marker
                    id="vf-loop-head"
                    viewBox="0 0 10 10"
                    refX="6" refY="5"
                    markerWidth="8" markerHeight="8"
                    orient="auto-start-reverse"
                  >
                    <path d="M0 0 L10 5 L0 10 Z" fill="var(--accent)" />
                  </marker>
                </defs>
                <circle
                  cx="100" cy="100" r="86"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  className="vf__loop-ring"
                  markerEnd="url(#vf-loop-head)"
                  pathLength="100"
                  strokeDashoffset="0"
                />
              </svg>

              {/* Self-talk bubble */}
              <div className="vf__bubble vf__bubble--self">
                "I probably did it right, didn't I?"
              </div>
            </div>
          </div>

          <Reveal kind="rise" duration={780} delay={1500} className="vf__agent-verdict">
            <span className="vf__agent-verdict-x">×</span>
            Naturally Inclined to <em>Think It's Fine</em> —— This Is <em>Confirmation Bias</em>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene FORK（step 2）—— fork sub-Agent ════════ */}
      <SceneFade active={sceneFork} exitMs={420} enterDelayMs={420}>
        <div className="vf__fork-scene">
          <Reveal kind="fade" duration={620} delay={80} className="vf__fork-cap">
            <span className="vf__fork-cap-fn">fork_verifier_agent()</span>
            <span className="vf__fork-cap-arrow">→</span>
            <span>Spin Up a <em>Fresh Brain</em></span>
          </Reveal>

          <div className="vf__board vf__board--fork">
            {/* Main Agent (left) */}
            <div className="vf__node vf__node--main vf__node--small">
              <div className="vf__node-tag">MAIN AGENT</div>
              <div className="vf__node-title">opus 4.7</div>
              <div className="vf__node-meta">Done · Awaiting Review</div>
            </div>

            {/* fork connection line */}
            <svg className="vf__fork-link" viewBox="0 0 600 220" preserveAspectRatio="none">
              <defs>
                <marker
                  id="vf-fork-head"
                  viewBox="0 0 10 10"
                  refX="9" refY="5"
                  markerWidth="10" markerHeight="10"
                  orient="auto"
                >
                  <path d="M0 0 L10 5 L0 10 Z" fill="var(--accent)" />
                </marker>
              </defs>
              {/* main line */}
              <path
                d="M0 110 L240 110"
                stroke="var(--line-strong)"
                strokeWidth="2"
                fill="none"
              />
              {/* branch line (elastic curve) */}
              <path
                className="vf__fork-link-branch"
                d="M240 110 C 320 110, 360 40, 580 40"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                fill="none"
                markerEnd="url(#vf-fork-head)"
              />
              {/* node dot */}
              <circle cx="240" cy="110" r="6" fill="var(--accent)" />
            </svg>

            {/* Sub-Agent (top-right) */}
            <div className="vf__node vf__node--verifier">
              <div className="vf__node-tag vf__node-tag--alt">VERIFIER AGENT</div>
              <div className="vf__node-title">subagent · 0x9c</div>
              <div className="vf__node-meta">
                <span className="vf__node-fresh">● fresh context</span>
              </div>
              <div className="vf__node-iframe">
                <span className="vf__node-iframe-bar">
                  <span className="vf__node-iframe-dot" />
                  <span className="vf__node-iframe-dot" />
                  <span className="vf__node-iframe-dot" />
                  <span className="vf__node-iframe-url">about:blank</span>
                </span>
                <span className="vf__node-iframe-body">
                  <span className="vf__node-iframe-flash" />
                </span>
              </div>
            </div>
          </div>

          <Reveal kind="rise" duration={780} delay={1100} className="vf__fork-verdict">
            <em>Isolated iframe</em> · <em>Isolated Context</em> · Run Full Checks, Then Report Back
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene CHECK（step 3）—— sub-Agent runs checklist ════════ */}
      <SceneFade active={sceneCheck} exitMs={420} enterDelayMs={420}>
        <div className="vf__check-scene">
          <Reveal kind="fade" duration={620} delay={80} className="vf__check-cap">
            Sub-Agent · Full Inspection
          </Reveal>

          <div className="vf__check-panel">
            <div className="vf__check-panel-bar">
              <span className="vf__check-panel-dot" />
              <span className="vf__check-panel-dot" />
              <span className="vf__check-panel-dot" />
              <span className="vf__check-panel-name">verifier · subagent · 0x9c</span>
              <span className="vf__check-panel-status">RUNNING…</span>
            </div>
            <div className="vf__check-list">
              {CHECKS.map((c, i) => (
                <div
                  key={c.id}
                  className={`vf__check-row vf__check-row--${c.id}`}
                  style={{ animationDelay: `${i * 220}ms` }}
                >
                  <span className="vf__check-num">0{i + 1}</span>
                  <span className="vf__check-label">{c.label}</span>
                  <span className="vf__check-cn">/ {c.cn}</span>
                  <span className="vf__check-bar" />
                  <span className="vf__check-mark">
                    <span className="vf__check-mark-spin" />
                    <span className="vf__check-mark-tick">✓</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="vf__check-foot">
              <span className="vf__check-foot-tag vf__check-foot-tag--pass">PASS</span>
              <span>silent on pass · Don't Interrupt Main Agent</span>
            </div>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene CLOSE（step 4）════════ */}
      <SceneFade active={sceneClose} exitMs={420} enterDelayMs={420}>
        <div className="vf__close">
          <Reveal kind="rise" duration={1100} delay={120} className="vf__close-l1" as="h1">
            Switch to a <em>Fresh Brain</em>
          </Reveal>
          <Reveal kind="rise" duration={1100} delay={680} className="vf__close-l2" as="h1">
            to Break Out of <em>Self-Deception</em>
          </Reveal>
          <Reveal kind="fade" duration={780} delay={1500} className="vf__close-cap" as="p">
            AI Needs an Editor Too
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'verification',
  title: 'Part 6 · Verification Loop',
  eyebrow: '09',
  steps: 5,
  theme: 'ink',
  Component: Verification,
};

export default def;
