import type { ReactNode } from 'react';
import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './SkillChanges.css';

/**
 * Chapter 11 · Key Skill Changes (Redux)
 *
 * Voiceover original order (strictly aligned with article/voiceover-script.md):
 *   "This Skill is about 400 lines. First, I stripped out Claude Design's proprietary tool and environment descriptions,
 *    keeping only the universal, most valuable parts, and on top of that I optimized several areas:"
 *   ① Before writing code, must first articulate the design system in natural language — colors, fonts, spacing, all listed out.
 *   ② Require it to ship a minimal version with assumptions and placeholders early (v0).
 *   ③ On top of Claude Design's foundation, added more de-AI-style items.
 *   ④ Added several verified color × font pairing reference tables — giving AI a reliable starting point.
 *
 * Rhythm (8 steps / step 0..7):
 *  0  Full Skill view —— file directory tree (SKILL.md ≈ 400 lines / references ≈ 520 lines)
 *  1  SKILL.md real source scroll display (fake editor continuous scroll)
 *  2  First cut: strip —— tools/environment vs universal essence
 *  3  + Change 01 · Declare design system first  + SKILL.md L79-91 source excerpt (key highlight / context blur)
 *  4  + Change 02 · v0 draft first  + SKILL.md L93-101 source excerpt
 *  5  + Change 03 · Anti-AI style expansion  + SKILL.md L200-219 source excerpt
 *  6  + Change 04 · Color × font pairings  + advanced-patterns.md L505-516 source excerpt
 *  7  Close: "Give AI a reliable starting point —— more stable than letting it improvise"
 */

/* ──────────────────────────────────────────────────────────────────
 * Reusable: source excerpt code panel (key line highlight, context blur)
 * ────────────────────────────────────────────────────────────────── */

interface CodeLine {
  /** Real line number (for left gutter) */
  n: number;
  /** Line content */
  text: ReactNode;
  /** Whether highlighted (not blurred, not muted) */
  hi?: boolean;
  /** Visual indent per level (16px each) */
  indent?: number;
}

interface ExcerptProps {
  filePath: string;
  range: string;
  caption?: ReactNode;
  lines: CodeLine[];
  /** delay before highlight pulse */
  pulseDelay?: number;
}

function Excerpt({ filePath, range, caption, lines, pulseDelay = 600 }: ExcerptProps) {
  return (
    <div className="sk__ex">
      <div className="sk__ex-bar">
        <span className="sk__ex-bar-dot" />
        <span className="sk__ex-bar-dot" />
        <span className="sk__ex-bar-dot" />
        <span className="sk__ex-bar-path">{filePath}</span>
        <span className="sk__ex-bar-range">{range}</span>
      </div>
      <div className="sk__ex-body">
        {lines.map((l, i) => (
          <div
            key={`${l.n}-${i}`}
            className={`sk__ex-line ${l.hi ? 'is-hi' : ''}`}
            style={{
              ['--ex-indent' as string]: `${(l.indent ?? 0) * 16}px`,
              animationDelay: l.hi ? `${pulseDelay + i * 40}ms` : undefined,
            }}
          >
            <span className="sk__ex-num">{l.n}</span>
            <span className="sk__ex-text">{l.text}</span>
          </div>
        ))}
      </div>
      {caption && <div className="sk__ex-caption">{caption}</div>}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * SKILL.md fake-scroll content fragment (close to real, for dynamic scroll display)
 * ────────────────────────────────────────────────────────────────── */

const SCROLL_LINES: { t: ReactNode; hi?: boolean; mute?: boolean }[] = [
  { t: '---', mute: true },
  { t: 'name: web-design-engineer', hi: true },
  { t: 'description: |' },
  { t: '  Build high-quality visual Web artifacts using HTML / CSS / JS / React —' },
  { t: '  web pages, dashboards, prototypes, slide decks, animated demos, …' },
  { t: '  Use this skill whenever the request involves a visual deliverable.' },
  { t: '---', mute: true },
  { t: '' },
  { t: '# Web Design Engineer', hi: true },
  { t: '' },
  { t: 'Core philosophy: the bar is "stunning," not "functional".' },
  { t: 'Every pixel is intentional. Every interaction is deliberate.' },
  { t: '' },
  { t: '## Workflow', hi: true },
  { t: '' },
  { t: '### Step 1 · Understand the Requirements' },
  { t: '### Step 2 · Gather Design Context' },
  { t: '### Step 3 · Declare the Design System Before Writing Code', hi: true },
  { t: '### Step 4 · Show a v0 Draft Early', hi: true },
  { t: '### Step 5 · Full Build' },
  { t: '### Step 6 · Verification' },
  { t: '' },
  { t: '## Technical Specifications' },
  { t: '' },
  { t: '#### Three Non-negotiable Hard Rules', hi: true },
  { t: '1. Never use `const styles = {...}`' },
  { t: '2. Separate <script type="text/babel"> blocks do not share scope' },
  { t: '3. Do not use `scrollIntoView`' },
  { t: '' },
  { t: '## Design Principles' },
  { t: '' },
  { t: '### Avoid AI-Style Clichés', hi: true },
  { t: '- Overuse of gradient backgrounds' },
  { t: '- Cookie-cutter gradient buttons + large-radius cards' },
  { t: '- Overreliance on Inter / Roboto / Arial / Fraunces' },
  { t: '- Meaningless stats / numbers / icon spam' },
  { t: '- Fabricated customer logo walls' },
  { t: '' },
  { t: '### Emoji Rules' },
  { t: '**No emoji by default.** Only when the brand itself uses them.' },
  { t: '' },
  { t: '### Placeholder Philosophy' },
  { t: 'A placeholder signals "real material needed here."' },
  { t: 'A fake signals "I cut corners."', hi: true },
  { t: '' },
  { t: '### Content Principles' },
  { t: '- No filler content — every element must earn its place', hi: true },
  { t: '- Less is more — "1,000 no\'s for every yes"' },
  { t: '- Whitespace is design' },
  { t: '' },
  { t: '## Pre-delivery Checklist', hi: true },
  { t: '- [ ] Browser console shows no errors, no warnings' },
  { t: '- [ ] All colors come from the declared design system' },
  { t: '- [ ] No `scrollIntoView`' },
  { t: '- [ ] No AI clichés (purple-pink gradients, Inter/Roboto, …)' },
  { t: '- [ ] No filler content, no fabricated data' },
  { t: '- [ ] Visual quality at Dribbble / Behance showcase level', hi: true },
  { t: '' },
  { t: '## Further Reference', hi: true },
  { t: '- references/advanced-patterns.md → full code template library' },
  { t: '' },
];

function SkillChanges({ localStep }: ChapterContext) {
  const sceneTree   = localStep <= 0;
  const sceneScroll = localStep === 1;
  const sceneStrip  = localStep === 2;
  const sceneA      = localStep === 3;
  const sceneB      = localStep === 4;
  const sceneC      = localStep === 5;
  const sceneD      = localStep === 6;
  const sceneClose  = localStep >= 7;

  return (
    <section className="sk">
      {/* ════════ Scene TREE（step 0）—— Full file directory view ════════ */}
      <SceneFade active={sceneTree} exitMs={420} enterDelayMs={120}>
        <div className="sk__tree-scene">
          <Reveal kind="fade" duration={620} delay={80} className="sk__tree-eyebrow">
            <span className="sk__src-bracket">[</span>
            <span className="sk__src-label">SKILL · OPEN SOURCE</span>
            <span className="sk__src-bracket">]</span>
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={260} className="sk__tree-title" as="h1">
            Full Skill Overview ——
          </Reveal>

          <Reveal kind="rise" duration={780} delay={620} className="sk__tree-card">
            <div className="sk__tree-bar">
              <span className="sk__tree-bar-dot" />
              <span className="sk__tree-bar-dot" />
              <span className="sk__tree-bar-dot" />
              <span className="sk__tree-bar-path">~ / .claude / skills / web-design-engineer</span>
            </div>
            <div className="sk__tree-body">
              <div className="sk__tree-row sk__tree-row--dir" style={{ animationDelay: '900ms' }}>
                <span className="sk__tree-glyph">▾</span>
                <span className="sk__tree-name">web-design-engineer<span className="sk__tree-slash">/</span></span>
                <span className="sk__tree-meta">root</span>
              </div>
              <div className="sk__tree-row sk__tree-row--file sk__tree-row--main" style={{ animationDelay: '1080ms' }}>
                <span className="sk__tree-pipe">├──</span>
                <span className="sk__tree-name sk__tree-name--md">SKILL.md</span>
                <span className="sk__tree-tag">Main File</span>
                <span className="sk__tree-meta sk__tree-meta--em">≈ 400 lines</span>
              </div>
              <div className="sk__tree-row sk__tree-row--dir sk__tree-row--sub" style={{ animationDelay: '1260ms' }}>
                <span className="sk__tree-pipe">└──</span>
                <span className="sk__tree-glyph">▾</span>
                <span className="sk__tree-name">references<span className="sk__tree-slash">/</span></span>
                <span className="sk__tree-tag">Advanced Templates</span>
              </div>
              <div className="sk__tree-row sk__tree-row--file sk__tree-row--child" style={{ animationDelay: '1440ms' }}>
                <span className="sk__tree-pipe sk__tree-pipe--child">└──</span>
                <span className="sk__tree-name sk__tree-name--md">advanced-patterns.md</span>
                <span className="sk__tree-tag">Starter Scaffolding</span>
                <span className="sk__tree-meta sk__tree-meta--em">≈ 520 lines</span>
              </div>
            </div>
          </Reveal>

          <Reveal kind="fade" duration={780} delay={1700} className="sk__tree-foot">
            Two files, <em>≈ 920 lines</em> total —— a complete <em>designer handbook</em> for AI
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene SCROLL（step 1）—— SKILL.md fake scroll ════════ */}
      <SceneFade active={sceneScroll} exitMs={420} enterDelayMs={420}>
        <div className="sk__scroll-scene">
          <Reveal kind="fade" duration={620} delay={80} className="sk__scroll-eyebrow">
            <span className="sk__src-bracket">[</span>
            <span className="sk__src-label">FILE · SKILL.md</span>
            <span className="sk__src-sep">·</span>
            <span className="sk__src-line">≈ 400 lines</span>
            <span className="sk__src-bracket">]</span>
          </Reveal>

          <Reveal kind="fade" duration={620} delay={260} className="sk__scroll-cap">
            Source —— "Core Philosophy / Workflow / Anti-AI Style / Checklist" <em>All Inside</em>
          </Reveal>

          <Reveal kind="rise" duration={780} delay={460} className="sk__scroll-card">
            <div className="sk__scroll-bar">
              <span className="sk__scroll-bar-dot" />
              <span className="sk__scroll-bar-dot" />
              <span className="sk__scroll-bar-dot" />
              <span className="sk__scroll-bar-path">SKILL.md</span>
              <span className="sk__scroll-bar-meta">utf-8 · markdown · readonly</span>
            </div>
            <div className="sk__scroll-frame">
              <div className="sk__scroll-stream">
                {/* Repeat twice for seamless loop */}
                {[0, 1].map((loop) => (
                  <div key={loop} className="sk__scroll-block">
                    {SCROLL_LINES.map((l, i) => (
                      <div
                        key={`${loop}-${i}`}
                        className={`sk__scroll-line ${l.hi ? 'is-hi' : ''} ${l.mute ? 'is-mute' : ''}`}
                      >
                        <span className="sk__scroll-num">{String(i + 1).padStart(3, '0')}</span>
                        <span className="sk__scroll-text">{l.t || '\u00A0'}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* Top/bottom fade masks, scan line provided by CSS */}
              <div className="sk__scroll-cursor" aria-hidden />
            </div>
          </Reveal>

          <Reveal kind="fade" duration={780} delay={1100} className="sk__scroll-foot">
            <span>Next ——</span>
            <em>First Cut · 4 Changes</em>
            <span>—— Let's Break Them Down</span>
          </Reveal>
        </div>
      </SceneFade>

      {/* ════════ Scene STRIP（step 2）—— First cut: strip ════════ */}
      <SceneFade active={sceneStrip} exitMs={420} enterDelayMs={420}>
        <div className="sk__strip-scene">
          <Reveal kind="fade" duration={620} delay={80} className="sk__chg-num">
            First Cut
          </Reveal>
          <Reveal kind="rise" duration={1100} delay={240} className="sk__chg-title" as="h2">
            <em>Strip Out</em> —— Claude Design-Specific Tools / Environment
          </Reveal>

          <div className="sk__strip">
            {/* Left: keep */}
            <Reveal kind="rise" duration={780} delay={500} className="sk__strip-col sk__strip-col--keep">
              <div className="sk__strip-head">
                <span className="sk__strip-mark sk__strip-mark--keep">✓</span>
                <span>KEEP · Universal Essence</span>
              </div>
              <ul className="sk__strip-list">
                {[
                  'Dynamic Role · Designer Identity Switch',
                  'Six-Step Workflow',
                  'Anti-AI Style Checklist',
                  'oklch Colors',
                  'Content Restraint Principles',
                  'Verification Loop',
                ].map((t, i) => (
                  <li
                    key={t}
                    className="sk__strip-row sk__strip-row--keep"
                    style={{ animationDelay: `${700 + i * 80}ms` }}
                  >
                    <span className="sk__strip-row-glyph">+</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Middle X */}
            <div className="sk__strip-sep" aria-hidden>
              <span className="sk__strip-sep-line" />
              <span className="sk__strip-sep-knob">×</span>
              <span className="sk__strip-sep-line" />
            </div>

            {/* Right: drop */}
            <Reveal kind="rise" duration={780} delay={680} className="sk__strip-col sk__strip-col--drop">
              <div className="sk__strip-head">
                <span className="sk__strip-mark sk__strip-mark--drop">×</span>
                <span>DROP · Proprietary Tools / Environment</span>
              </div>
              <ul className="sk__strip-list">
                {[
                  'show_html()',
                  'show_to_user()',
                  'fork_verifier_agent()',
                  'iframe sandbox',
                  'tweaks panel · runtime',
                  'pptx export',
                  'GitHub integration',
                  'snip tool',
                ].map((t, i) => (
                  <li
                    key={t}
                    className="sk__strip-row sk__strip-row--drop"
                    style={{ animationDelay: `${900 + i * 70}ms` }}
                  >
                    <span className="sk__strip-row-glyph">−</span>
                    <code>{t}</code>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene CHANGE 01（step 3）—— Declare design system first ════════ */}
      <SceneFade active={sceneA} exitMs={420} enterDelayMs={420}>
        <div className="sk__chg-scene">
          <Reveal kind="fade" duration={620} delay={80} className="sk__chg-num">+ Change 01</Reveal>
          <Reveal kind="rise" duration={1100} delay={240} className="sk__chg-title" as="h2">
            Before Writing Code —— <em>Declare the Design System</em> First
          </Reveal>

          <div className="sk__split">
            {/* Left: flow comparison */}
            <Reveal kind="rise" duration={720} delay={500} className="sk__split-left">
              <div className="sk__chg-flow">
                <div className="sk__chg-flow-col sk__chg-flow-col--bad">
                  <div className="sk__chg-flow-tag">
                    <span className="sk__chg-flow-mark sk__chg-flow-mark--bad">×</span>
                    Before
                  </div>
                  <div className="sk__chg-flow-step">Requirements</div>
                  <span className="sk__chg-flow-arrow">↓</span>
                  <div className="sk__chg-flow-step sk__chg-flow-step--code">Write Code Directly</div>
                  <span className="sk__chg-flow-arrow">↓</span>
                  <div className="sk__chg-flow-step sk__chg-flow-step--out">Full Page</div>
                  <div className="sk__chg-flow-tip">Wrong Direction → <em>Start Over</em></div>
                </div>

                <div className="sk__chg-flow-col sk__chg-flow-col--good">
                  <div className="sk__chg-flow-tag">
                    <span className="sk__chg-flow-mark sk__chg-flow-mark--good">✓</span>
                    After Change
                  </div>
                  <div className="sk__chg-flow-step">Requirements</div>
                  <span className="sk__chg-flow-arrow">↓</span>
                  <div className="sk__chg-flow-step sk__chg-flow-step--system">
                    <div className="sk__chg-system">
                      <div className="sk__chg-system-row"><span>palette</span><b>oklch · Warm Brown</b></div>
                      <div className="sk__chg-system-row"><span>fonts</span><b>Newsreader + Sora</b></div>
                      <div className="sk__chg-system-row"><span>spacing</span><b>4 / 8 / 16 / 32</b></div>
                      <div className="sk__chg-system-row"><span>radius</span><b>0 / 2 / 4</b></div>
                    </div>
                  </div>
                  <span className="sk__chg-flow-arrow">↓</span>
                  <div className="sk__chg-flow-step sk__chg-flow-step--code">Write Code</div>
                  <div className="sk__chg-flow-tip">Wrong Direction → <em>Course-Correct Early</em></div>
                </div>
              </div>
            </Reveal>

            {/* Right: source excerpt */}
            <Reveal kind="rise" duration={780} delay={760} className="sk__split-right">
              <Excerpt
                filePath="SKILL.md"
                range="L79 — L91"
                pulseDelay={1000}
                lines={[
                  { n: 77, text: '', },
                  { n: 78, text: '---' },
                  { n: 79, text: <><b>### Step 3:</b> Declare the Design System <em>Before</em> Writing Code</>, hi: true },
                  { n: 80, text: '' },
                  { n: 81, text: <><b>Before writing the first line of code</b>, articulate the design system in</>, hi: true },
                  { n: 82, text: 'Markdown and let the user confirm before proceeding:' , hi: true },
                  { n: 83, text: '' },
                  { n: 84, text: '```markdown' },
                  { n: 85, text: 'Design Decisions:' },
                  { n: 86, text: '- Color palette: [primary / secondary / neutral / accent]', hi: true, indent: 0 },
                  { n: 87, text: '- Typography: [heading font / body font / code font]', hi: true, indent: 0 },
                  { n: 88, text: '- Spacing system: [base unit and multiples]', hi: true, indent: 0 },
                  { n: 89, text: '- Border-radius strategy / Shadow / Motion …' },
                  { n: 90, text: '```' },
                  { n: 91, text: '' },
                  { n: 92, text: '### Step 4: Show a v0 Draft Early' },
                  { n: 93, text: '' },
                ]}
                caption={<><em>Made Explicit</em> the "AI Style" Claude Design Left Unsaid</>}
              />
            </Reveal>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene CHANGE 02（step 4）—— v0 draft ════════ */}
      <SceneFade active={sceneB} exitMs={420} enterDelayMs={420}>
        <div className="sk__chg-scene">
          <Reveal kind="fade" duration={620} delay={80} className="sk__chg-num">+ Change 02</Reveal>
          <Reveal kind="rise" duration={1100} delay={240} className="sk__chg-title" as="h2">
            Ship Early —— <em>v0 Draft</em>
          </Reveal>

          <div className="sk__split">
            <Reveal kind="rise" duration={720} delay={500} className="sk__split-left">
              <div className="sk__v">
                <div className="sk__v-card sk__v-card--v0">
                  <div className="sk__v-tag">
                    <span className="sk__v-mark sk__v-mark--good">✓</span>
                    v0 · Rough but <em>Direction Is Clear</em>
                  </div>
                  <div className="sk__v-mock">
                    <span className="sk__v-mock-bar sk__v-mock-bar--w70" />
                    <span className="sk__v-mock-bar sk__v-mock-bar--w50" />
                    <div className="sk__v-mock-grid">
                      <span /><span /><span />
                    </div>
                    <span className="sk__v-mock-bar sk__v-mock-bar--w40" />
                  </div>
                  <div className="sk__v-foot">Assumptions + Placeholders → Users Can <em>Give Immediate Feedback</em></div>
                </div>

                <div className="sk__v-vs" aria-hidden>vs</div>

                <div className="sk__v-card sk__v-card--v1">
                  <div className="sk__v-tag">
                    <span className="sk__v-mark sk__v-mark--bad">×</span>
                    Polished v1
                  </div>
                  <div className="sk__v-mock sk__v-mock--full">
                    <span className="sk__v-mock-h">Build the Future. Today.</span>
                    <span className="sk__v-mock-sub">Modern. Fast. Powerful.</span>
                    <div className="sk__v-mock-grid sk__v-mock-grid--full">
                      <span><b>★</b></span><span><b>↗</b></span><span><b>◷</b></span>
                    </div>
                    <span className="sk__v-mock-cta">Get Started →</span>
                  </div>
                  <div className="sk__v-foot">3× Time Polishing → Wrong Direction <em>Scrap It All</em></div>
                  <div className="sk__v-strike" aria-hidden>
                    <span className="sk__v-strike-line" />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal kind="rise" duration={780} delay={760} className="sk__split-right">
              <Excerpt
                filePath="SKILL.md"
                range="L93 — L101"
                pulseDelay={1000}
                lines={[
                  { n: 91, text: '' },
                  { n: 92, text: '---' },
                  { n: 93, text: <><b>### Step 4:</b> Show a <em>v0 Draft</em> Early</>, hi: true },
                  { n: 94, text: '' },
                  { n: 95, text: <><b>Don\'t hold back a big reveal.</b> Before writing full components, put</>, hi: true },
                  { n: 96, text: 'together a "viewable v0" using placeholders + key layout +', hi: true },
                  { n: 97, text: 'the declared design system:' },
                  { n: 98, text: '' },
                  { n: 99, text: '- The goal of v0: let the user course-correct early' },
                  { n: 100, text: '- Includes: core structure + tokens + key placeholders' },
                  { n: 101, text: '- Does NOT include: content details, complete components' },
                  { n: 102, text: '' },
                  { n: 103, text: <>A v0 with placeholders is more valuable than a "perfect v1"</>, hi: true },
                  { n: 104, text: <>that took <em>3x the time</em> — if direction is wrong, scrapped.</>, hi: true },
                  { n: 105, text: '' },
                ]}
                caption={<>"A Rough v0 → Users Can Immediately See the <em>Direction</em>"</>}
              />
            </Reveal>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene CHANGE 03（step 5）—— Anti-AI style expansion ════════ */}
      <SceneFade active={sceneC} exitMs={420} enterDelayMs={420}>
        <div className="sk__chg-scene">
          <Reveal kind="fade" duration={620} delay={80} className="sk__chg-num">+ Change 03</Reveal>
          <Reveal kind="rise" duration={1100} delay={240} className="sk__chg-title" as="h2">
            <em>Tougher</em> Anti-AI Style —— Expanded Items
          </Reveal>

          <div className="sk__split">
            <Reveal kind="rise" duration={720} delay={500} className="sk__split-left">
              <div className="sk__cd-col">
                <div className="sk__cd-tag">
                  <span className="sk__cd-mark">+ New</span>
                  Common AI Style · Cut Them All
                </div>
                <ul className="sk__cd-anti">
                  {[
                    'Purple-Pink-Blue Gradient Backgrounds',
                    'Gradient Buttons + Large-Radius Card Combos',
                    'Fake Logo Walls / Fake Reviews / Fake Data',
                    'Meaningless Stats / Numbers / Icon Spam',
                    'Emoji as Icon Substitutes',
                    'Tired Fonts Inter / Roboto / Arial',
                  ].map((t, i) => (
                    <li
                      key={t}
                      className="sk__cd-anti-row"
                      style={{ animationDelay: `${700 + i * 100}ms` }}
                    >
                      <span className="sk__cd-anti-x">×</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal kind="rise" duration={780} delay={760} className="sk__split-right">
              <Excerpt
                filePath="SKILL.md"
                range="L200 — L219"
                pulseDelay={1000}
                lines={[
                  { n: 198, text: '---' },
                  { n: 199, text: '' },
                  { n: 200, text: <><b>### Avoid AI-Style Clichés</b></>, hi: true },
                  { n: 201, text: '' },
                  { n: 202, text: 'Actively avoid these telltale "obviously AI" patterns:' },
                  { n: 203, text: '' },
                  { n: 204, text: '- Overuse of gradient backgrounds (purple-pink-blue)', hi: true },
                  { n: 205, text: '- Rounded cards with a colored left-border accent' },
                  { n: 206, text: '- Cookie-cutter gradient buttons + large-radius cards', hi: true },
                  { n: 207, text: '- Overreliance on Inter / Roboto / Arial / Fraunces', hi: true },
                  { n: 208, text: '- Meaningless stats / numbers / icon spam ("data slop")', hi: true },
                  { n: 209, text: '- Fabricated customer logo walls / fake testimonial counts', hi: true },
                  { n: 210, text: '' },
                  { n: 211, text: '### Emoji Rules' },
                  { n: 212, text: '' },
                  { n: 213, text: <><b>No emoji by default.</b> Only when the brand uses them.</>, hi: true },
                  { n: 214, text: '' },
                  { n: 215, text: '- × Using emoji as icon substitutes' },
                  { n: 216, text: '- × Using emoji as decorative filler' },
                ]}
                caption={<>Made Explicit the "AI Style" Claude Design Left Unsaid —— <em>Listed Concretely</em></>}
              />
            </Reveal>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene CHANGE 04（step 6）—— Color × font pairings ════════ */}
      <SceneFade active={sceneD} exitMs={420} enterDelayMs={420}>
        <div className="sk__chg-scene">
          <Reveal kind="fade" duration={620} delay={80} className="sk__chg-num">+ Change 04</Reveal>
          <Reveal kind="rise" duration={1100} delay={240} className="sk__chg-title" as="h2">
            <em>Color × Font</em> Pairing Reference
          </Reveal>

          <div className="sk__split">
            <Reveal kind="rise" duration={720} delay={500} className="sk__split-left">
              <div className="sk__cd-col">
                <div className="sk__cd-tag">
                  <span className="sk__cd-mark">+ New</span>
                  Battle-Tested · 5 Starting Points
                </div>
                <div className="sk__pairs">
                  {[
                    { tag: 'Elegant Editorial',  color: 'oklch Warm Brown',   font: 'Newsreader + Outfit' },
                    { tag: 'Premium Brand',      color: 'oklch Near-Black',   font: 'Sora + Plus Jakarta Sans' },
                    { tag: 'Minimal Pro',        color: 'oklch Teal-Blue',    font: 'Outfit + Space Grotesk' },
                    { tag: 'Lively Consumer',    color: 'oklch Coral',        font: 'Plus Jakarta Sans + Outfit' },
                    { tag: 'Artisan Warmth',     color: 'oklch Caramel',      font: 'Caveat + Newsreader' },
                  ].map((p, i) => (
                    <div
                      key={p.tag}
                      className="sk__pair"
                      style={{ animationDelay: `${700 + i * 110}ms` }}
                    >
                      <span className="sk__pair-tag">{p.tag}</span>
                      <span className="sk__pair-color">{p.color}</span>
                      <span className="sk__pair-x">×</span>
                      <span className="sk__pair-font">{p.font}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal kind="rise" duration={780} delay={760} className="sk__split-right">
              <Excerpt
                filePath="references / advanced-patterns.md"
                range="L505 — L516"
                pulseDelay={1000}
                lines={[
                  { n: 503, text: '## Color × Font Pairing Reference', },
                  { n: 504, text: '' },
                  { n: 505, text: <>| Style | Primary (oklch) | Font Pairing | Best For |</>, hi: true },
                  { n: 506, text: '|---|---|---|---|' },
                  { n: 507, text: <>| Modern tech | <em>oklch(0.55 0.25 250)</em> | Space Grotesk + Inter | SaaS, AI |</> },
                  { n: 508, text: <>| <b>Elegant editorial</b> | oklch(0.35 0.10 30) warm brown | <em>Newsreader + Outfit</em> | Content, blogs |</>, hi: true },
                  { n: 509, text: <>| <b>Premium brand</b> | oklch(0.20 0.02 250) near-black | <em>Sora + Plus Jakarta Sans</em> | Luxury, finance |</>, hi: true },
                  { n: 510, text: <>| Lively consumer | oklch(0.70 0.20 30) coral | Plus Jakarta Sans + Outfit | E-commerce |</>, hi: true },
                  { n: 511, text: <>| <b>Minimal pro</b> | oklch(0.50 0.15 200) teal-blue | <em>Outfit + Space Grotesk</em> | Data, B2B |</>, hi: true },
                  { n: 512, text: <>| <b>Artisan warmth</b> | oklch(0.55 0.15 80) caramel | <em>Caveat + Newsreader</em> | Food, education |</>, hi: true },
                  { n: 513, text: '' },
                  { n: 514, text: '> The core of these pairings: giving AI a tasteful <em>starting point</em>.', hi: true, },
                  { n: 515, text: '' },
                ]}
                caption={<>Give AI a <em>Solid</em> Starting Point → More Stable Than Letting It Improvise</>}
              />
            </Reveal>
          </div>
        </div>
      </SceneFade>

      {/* ════════ Scene CLOSE（step 7）════════ */}
      <SceneFade active={sceneClose} exitMs={420} enterDelayMs={420}>
        <div className="sk__close">
          <Reveal kind="rise" duration={1100} delay={120} className="sk__close-l1" as="h1">
            Give AI a <em>Solid Starting Point</em>
          </Reveal>
          <Reveal kind="rise" duration={1100} delay={780} className="sk__close-l2" as="h2">
            More Stable Than Letting It <em>Improvise</em>
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'skill-changes',
  title: 'Key Skill Changes',
  eyebrow: '11',
  steps: 8,
  theme: 'light',
  Component: SkillChanges,
};

export default def;
