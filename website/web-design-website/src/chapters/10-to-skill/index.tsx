import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './ToSkill.css';

/**
 * Chapter 10 · Transition to Skill
 *
 * Voiceover original order (strictly aligned):
 *   1. "That's the most core stuff in the Claude Design prompt."
 *   2. "But there's a real problem — Anthropic's products are very hard to use in China."
 *      "I got three accounts banned myself, completely gave up on official channels."
 *      "And there's no API, can't integrate it into my workflow."
 *   3. "But the good news is: the prompt has already leaked.
 *       Claude Design's other half of greatness is mainly in this prompt."
 *   4. "So I made a Skill called web-design-engineer,
 *       distilling the essence of this prompt."
 *   5. "Claude Code, Cursor, Codex can all use it directly — anyone can become a top web designer."
 *
 * Rhythm (6 steps / step 0..5):
 *  0  Recap: "That covers — the most core stuff in the prompt" + five small hooks
 *  1  Pivot large text "But..." + "Anthropic in China — hard"
 *  2  Three account cards fall in sequence + BANNED red stamp + "No API" note
 *  3  Pivot: "Good news — the prompt has already leaked"
 *  4  Skill card: web-design-engineer terminal-style display + three applicable tools
 *  5  Closing large text "Anyone can become a top web designer"
 */

const RECAP_POINTS = [
  'Role Definition',
  'Workflow',
  'De-AI Style',
  'oklch Colors',
  'Content Restraint',
  'Verification Loop',
];

const TOOLS = [
  { id: 'cc', name: 'Claude Code', mono: 'claude.code' },
  { id: 'cu', name: 'Cursor',      mono: 'cursor.sh'   },
  { id: 'cx', name: 'Codex',       mono: 'codex.cli'   },
];

function ToSkill({ localStep }: ChapterContext) {
  const at = (n: number) => localStep >= n;
  void at;

  const sceneRecap   = localStep <= 0;
  const sceneProb    = localStep === 1;
  const sceneBanned  = localStep === 2;
  const scenePivot   = localStep === 3;
  const sceneSkill   = localStep === 4;
  const sceneClose   = localStep >= 5;

  return (
    <section className="ts">
      {/* ════════ Scene RECAP（step 0）════════ */}
      <SceneFade active={sceneRecap} exitMs={420} enterDelayMs={120}>
        <div className="ts__recap">
          <Reveal kind="rise" duration={1100} delay={120} className="ts__recap-title" as="h1">
            That Covers the <em>Core</em><br />
            of the Prompt
          </Reveal>

          <div className="ts__recap-list">
            {RECAP_POINTS.map((p, i) => (
              <div
                key={p}
                className="ts__recap-item"
                style={{ animationDelay: `${640 + i * 120}ms` }}
              >
                <span className="ts__recap-num">0{i + 1}</span>
                <span className="ts__recap-name">{p}</span>
                <span className="ts__recap-tick">✓</span>
              </div>
            ))}
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene PROBLEM（step 1）—— "But..." ════════ */}
      <SceneFade active={sceneProb} exitMs={420} enterDelayMs={420}>
        <div className="ts__prob">
          <Reveal kind="rise" duration={1100} delay={120} className="ts__prob-but" as="h1">
            But ——
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={680} className="ts__prob-line" as="h2">
            Anthropic Products ——<br />
            <em>Really Hard</em> to Use Domestically
          </Reveal>

          <Reveal kind="fade" duration={780} delay={1500} className="ts__prob-meta">
            <span>No Official Payment</span>
            <span className="ts__prob-meta-dot" />
            <span>No API</span>
            <span className="ts__prob-meta-dot" />
            <span>Accounts Easily Banned</span>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene BANNED（step 2）—— three accounts fall ════════ */}
      <SceneFade active={sceneBanned} exitMs={420} enterDelayMs={420}>
        <div className="ts__banned-scene">
          <Reveal kind="fade" duration={620} delay={80} className="ts__banned-cap">
            "I got <em>three accounts</em> banned, completely gave up on official channels."
          </Reveal>

          <div className="ts__banned-row">
            {[1, 2, 3].map((n, i) => (
              <div
                key={n}
                className={`ts__card ts__card--n${n}`}
                style={{ animationDelay: `${i * 320 + 380}ms` }}
              >
                <div className="ts__card-bar">
                  <span className="ts__card-bar-dot" />
                  <span className="ts__card-bar-dot" />
                  <span className="ts__card-bar-dot" />
                  <span className="ts__card-bar-name">claude.ai / account</span>
                </div>
                <div className="ts__card-body">
                  <div className="ts__card-avatar">{['F', 'G', 'H'][i]}</div>
                  <div className="ts__card-info">
                    <div className="ts__card-name">Gardener #{n}</div>
                    <div className="ts__card-mail">flower-{i + 1}@anthropic.user</div>
                    <div className="ts__card-plan">
                      <span className="ts__card-plan-tag">Pro</span>
                      <span>activated · 2026.0{i + 1}</span>
                    </div>
                  </div>
                </div>
                {/* BANNED stamp */}
                <div className="ts__stamp" aria-hidden>
                  <span className="ts__stamp-text">BANNED</span>
                  <span className="ts__stamp-sub">violation · #{n}</span>
                </div>
              </div>
            ))}
          </div>

          <Reveal kind="fade" duration={780} delay={1700} className="ts__banned-foot">
            <span className="ts__banned-foot-x">×</span>
            Plus —— <em>No API</em>, Can't Integrate Into Your Workflow
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene PIVOT（step 3）—— "Good news" ════════ */}
      <SceneFade active={scenePivot} exitMs={420} enterDelayMs={420}>
        <div className="ts__pivot">
          <Reveal kind="fade" duration={620} delay={120} className="ts__pivot-eyebrow">
            However ——
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={320} className="ts__pivot-good" as="h1">
            <em>Good News</em>:
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={920} className="ts__pivot-line" as="h2">
            The Prompt —— <em>Has Already Leaked</em>
          </Reveal>

          <Reveal kind="fade" duration={780} delay={1700} className="ts__pivot-cap">
            "The other half of what makes Claude Design great is mainly in <em>this prompt</em>."
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene SKILL（step 4）—— web-design-engineer ════════ */}
      <SceneFade active={sceneSkill} exitMs={420} enterDelayMs={420}>
        <div className="ts__skill-scene">
          <Reveal kind="fade" duration={620} delay={80} className="ts__skill-eyebrow">
            <span className="ts__src-bracket">[</span>
            <span className="ts__src-label">SKILL · OPEN SOURCE</span>
            <span className="ts__src-bracket">]</span>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={300} className="ts__skill-card">
            <div className="ts__skill-bar">
              <span className="ts__skill-bar-dot" />
              <span className="ts__skill-bar-dot" />
              <span className="ts__skill-bar-dot" />
              <span className="ts__skill-bar-path">.claude / skills / web-design-engineer / SKILL.md</span>
            </div>
            <div className="ts__skill-body">
              <div className="ts__skill-tag">SKILL.md</div>
              <h2 className="ts__skill-name">web-design-engineer</h2>
              <p className="ts__skill-desc">
                Distill the essence of the Claude Design prompt<br />
                into a <em>reusable</em> Skill
              </p>
              <div className="ts__skill-meta">
                <span>≈ 400 lines</span>
                <span className="ts__skill-meta-dot" />
                <span>Open Source</span>
                <span className="ts__skill-meta-dot" />
                <span>Free</span>
              </div>
            </div>
          </Reveal>

          <Reveal kind="fade" duration={620} delay={1100} className="ts__tools-cap">
            <span>Works With ——</span>
          </Reveal>

          <div className="ts__tools-row">
            {TOOLS.map((t, i) => (
              <div
                key={t.id}
                className="ts__tool"
                style={{ animationDelay: `${1300 + i * 180}ms` }}
              >
                <div className="ts__tool-glyph">[ {t.id} ]</div>
                <div className="ts__tool-name">{t.name}</div>
                <div className="ts__tool-mono">{t.mono}</div>
              </div>
            ))}
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene CLOSE（step 5）════════ */}
      <SceneFade active={sceneClose} exitMs={420} enterDelayMs={420}>
        <div className="ts__close">
          <Reveal kind="rise" duration={1100} delay={120} className="ts__close-l1" as="h1">
            Anyone Can Become
          </Reveal>
          <Reveal kind="rise" duration={1300} delay={760} className="ts__close-l2" as="h1">
            <em>a Top Web Designer</em>
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'to-skill',
  title: 'Transition · How the Skill Came to Be',
  eyebrow: '10',
  steps: 6,
  theme: 'light',
  Component: ToSkill,
};

export default def;
