import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './Outro.css';

/**
 * Chapter 14 · Outro · Project Preview + Triple Action
 *
 * Narration order (strictly aligned with article/口播稿.md L284-295):
 *   1. "The full Skill code, the original Claude Design reference prompt, and several demo websites
 *       are all packaged together and open-sourced. Check the description and comments."
 *   2. "Finally, let me recommend the Easy Agent open-source project I've been working on."
 *   3. "The goal of this project is to learn how Claude Code's Harness is built,
 *       so that anyone who follows through can develop enterprise-grade Agents from scratch."
 *   4. "If this tutorial helped you, a free triple action would be appreciated —"
 *   5. "See you next time."
 *
 * Rhythm (5 steps / step 0..4):
 *  0  Open-source resource card · "All packaged & open-sourced" + three content tag cards (Skill / Prompt / DEMOs)
 *  1  Easy Agent · Project hero + subtitle "Recreating Claude Code · Harness from scratch"
 *  2  Project goal · "Follow through → Enterprise-grade Agent development capability"
 *  3  Triple CTA · Self-drawn geometric like / star / follow (no emoji)
 *  4  See you next time · Big farewell text
 */

interface Resource {
  id: string;
  num: string;
  name: string;
  cn: string;
  desc: string;
}

const RESOURCES: Resource[] = [
  { id: 'skill',  num: '01', name: 'web-design-engineer',         cn: 'Full Skill Source Code',  desc: 'The star of the show · SKILL.md + references' },
  { id: 'prompt', num: '02', name: 'claude-design / system.md',   cn: 'Original Reference Prompt', desc: 'Claude Design system prompt original · ≈ 420 lines' },
  { id: 'demo',   num: '03', name: 'demos /',                     cn: 'Demo Websites',  desc: 'All output sites used in this demo' },
];

/* ──────────────────────────────────────────────────────────────────
 * Self-drawn geometric triple icons (line-art · no emoji)
 *   - like:   thumb (rounded rect + semi-circle)
 *   - star:   five-pointed star
 *   - follow: circle + embedded +
 * ────────────────────────────────────────────────────────────────── */

function IconLike() {
  return (
    <svg className="ot__icon" viewBox="0 0 64 64" aria-hidden>
      <path
        d="M22 28 L22 56 L46 56 C50 56 52 53 52 50 L54 36 C54.5 33 52.5 31 50 31 L40 31 L42 22 C43 18 41 14 37 14 C35 14 34 15 33 17 L26 28 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect
        x="10" y="28" width="10" height="28"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function IconStar() {
  return (
    <svg className="ot__icon" viewBox="0 0 64 64" aria-hidden>
      <path
        d="M32 8 L40 24 L58 26.5 L45 39 L48 56 L32 47.5 L16 56 L19 39 L6 26.5 L24 24 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconFollow() {
  return (
    <svg className="ot__icon" viewBox="0 0 64 64" aria-hidden>
      <circle
        cx="32" cy="32" r="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M32 21 L32 43 M21 32 L43 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const TRIPLE = [
  { id: 'like',   icon: <IconLike   />, label: 'Like',    mono: 'LIKE'    },
  { id: 'star',   icon: <IconStar   />, label: 'Collect', mono: 'COLLECT' },
  { id: 'follow', icon: <IconFollow />, label: 'Follow',  mono: 'FOLLOW'  },
];

function Outro({ localStep }: ChapterContext) {
  const sceneOpen     = localStep <= 0;
  const sceneEasy     = localStep === 1;
  const sceneGoal     = localStep === 2;
  const sceneTriple   = localStep === 3;
  const sceneBye      = localStep >= 4;

  return (
    <section className="ot">
      {/* ════════ Scene OPEN（step 0）—— Open-Source Resource Cards ════════ */}
      <SceneFade active={sceneOpen} exitMs={420} enterDelayMs={120}>
        <div className="ot__open">
          <Reveal kind="fade" duration={620} delay={80} className="ot__open-eyebrow">
            Finally —
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={300} className="ot__open-title" as="h1">
            <em>All Packaged & Open-Sourced</em> · Check Description / Comments
          </Reveal>

          <div className="ot__open-grid">
            {RESOURCES.map((r, i) => (
              <div
                key={r.id}
                className="ot__open-card"
                style={{ animationDelay: `${700 + i * 160}ms` }}
              >
                <div className="ot__open-card-num">{r.num}</div>
                <div className="ot__open-card-name">{r.name}</div>
                <div className="ot__open-card-cn">{r.cn}</div>
                <div className="ot__open-card-desc">{r.desc}</div>
                <div className="ot__open-card-foot">
                  <span className="ot__open-card-foot-arrow">↗</span>
                  <span className="ot__open-card-foot-text">open</span>
                </div>
              </div>
            ))}
          </div>

          <Reveal kind="fade" duration={780} delay={1500} className="ot__open-foot">
            One-click bundle — no need to search around
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene EASY（step 1）—— Easy Agent Project Preview ════════ */}
      <SceneFade active={sceneEasy} exitMs={420} enterDelayMs={420}>
        <div className="ot__easy">
          <Reveal kind="fade" duration={620} delay={80} className="ot__easy-eyebrow">
            <span className="ot__src-bracket">[</span>
            <span className="ot__src-label">Work in Progress · Open Source Project</span>
            <span className="ot__src-bracket">]</span>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={260} className="ot__easy-pre" as="p">
            Final recommendation —
          </Reveal>

          <Reveal kind="rise" duration={1300} delay={620} className="ot__easy-name" as="h1">
            <em>Easy Agent</em>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={1300} className="ot__easy-sub" as="h2">
            Recreating Claude Code's <em>Harness</em> from Scratch
          </Reveal>

          <Reveal kind="fade" duration={780} delay={1900} className="ot__easy-meta">
            <span>open source</span>
            <span className="ot__easy-meta-dot" />
            <span>step-by-step</span>
            <span className="ot__easy-meta-dot" />
            <span>enterprise agent</span>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene GOAL（step 2）—— Project Goal ════════ */}
      <SceneFade active={sceneGoal} exitMs={420} enterDelayMs={420}>
        <div className="ot__goal">
          <Reveal kind="fade" duration={620} delay={80} className="ot__goal-eyebrow">
            Follow through to the end —
          </Reveal>

          <div className="ot__goal-flow">
            <Reveal kind="rise" duration={780} delay={260} className="ot__goal-step ot__goal-step--from">
              <div className="ot__goal-step-tag">YOU · Now</div>
              <div className="ot__goal-step-line">Want to switch to AI Agent development</div>
            </Reveal>

            <Reveal kind="fade" duration={780} delay={620} className="ot__goal-arrow" as="span">
              <span className="ot__goal-arrow-line" />
              <span className="ot__goal-arrow-text">Easy Agent</span>
              <span className="ot__goal-arrow-head">→</span>
            </Reveal>

            <Reveal kind="rise" duration={780} delay={900} className="ot__goal-step ot__goal-step--to">
              <div className="ot__goal-step-tag ot__goal-step-tag--alt">YOU · After</div>
              <div className="ot__goal-step-line">Have <em>enterprise-grade</em> Agent development skills</div>
            </Reveal>
          </div>

          <Reveal kind="fade" duration={780} delay={1500} className="ot__goal-foot">
            "AI Transition — <em>Don't Miss Out</em>"
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene TRIPLE（step 3）—— Self-Drawn Triple ════════ */}
      <SceneFade active={sceneTriple} exitMs={420} enterDelayMs={420}>
        <div className="ot__triple">
          <Reveal kind="fade" duration={620} delay={80} className="ot__triple-eyebrow">
            If this episode helped you —
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={260} className="ot__triple-title" as="h1">
            A <em>free triple action</em> would be appreciated
          </Reveal>

          <div className="ot__triple-row">
            {TRIPLE.map((t, i) => (
              <div
                key={t.id}
                className="ot__triple-card"
                style={{ animationDelay: `${600 + i * 200}ms` }}
              >
                <div className="ot__triple-icon-wrap">
                  {t.icon}
                </div>
                <div className="ot__triple-label">{t.label}</div>
                <div className="ot__triple-mono">{t.mono}</div>
              </div>
            ))}
          </div>

          <Reveal kind="fade" duration={780} delay={1700} className="ot__triple-foot">
            More <em>valuable AI tutorials</em> to come
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene BYE（step 4）—— See You Next Time ════════ */}
      <SceneFade active={sceneBye} exitMs={420} enterDelayMs={420}>
        <div className="ot__bye">
          <Reveal kind="fade" duration={780} delay={120} className="ot__bye-eyebrow">
            Thanks for watching —
          </Reveal>
          <Reveal kind="rise" duration={1300} delay={500} className="ot__bye-line" as="h1">
            See you <em>next time</em>
            <span className="ot__bye-arrow">↗</span>
          </Reveal>
          <Reveal kind="fade" duration={780} delay={1500} className="ot__bye-sig">
            <span className="ot__bye-sig-bar" />
            <span className="ot__bye-sig-text">claude-design / web-design-engineer</span>
            <span className="ot__bye-sig-bar" />
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'outro',
  title: 'Outro · Project Preview + Triple Action',
  eyebrow: '14',
  steps: 5,
  theme: 'light',
  Component: Outro,
};

export default def;
