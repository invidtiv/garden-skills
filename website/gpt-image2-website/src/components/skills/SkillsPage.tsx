import { useEffect, useMemo, useState } from 'react';
import type { Route } from '../../types';
import { cases, ORDERED_CATEGORIES } from '../../lib/data';
import './SkillsPage.css';

interface Props {
  navigate: (r: Route) => void;
}

const REPO_URL = 'https://github.com/ConardLi/garden-skills';
const SKILL_TREE_URL = `${REPO_URL}/tree/main/skills/gpt-image-2`;

const MODES = [
  {
    tag: 'A',
    name: 'Garden Local',
    eyebrow: 'FULL CONTROL',
    trigger: (
      <>
        <code>ENABLE_GARDEN_IMAGEGEN=1</code>
        <span className="and">AND</span>
        <code>OPENAI_API_KEY</code>
      </>
    ),
    body: 'Full pipeline: select template → render prompt → call script → output to disk. Skill is the true image tool holder.',
    flow: [
      'scripts/check-mode.js',
      'references/<cat>/<tpl>.md',
      'scripts/generate.js · scripts/edit.js',
      'garden-gpt-image-2/image/*.png',
    ],
  },
  {
    tag: 'B',
    name: 'Host-Native',
    eyebrow: 'DELEGATED',
    trigger: (
      <>
        <code>ENABLE_GARDEN_IMAGEGEN</code>
        <span className="and">not enabled</span>
        <span>·</span>
        <span>host has native image_generation</span>
      </>
    ),
    body: 'This Skill degrades to prompt engineering guidance; the final prompt is handed to ChatGPT / Codex / Gemini / Cursor etc. host native image tools.',
    flow: [
      'scripts/check-mode.js',
      'references/<cat>/<tpl>.md',
      'host image_generation()',
      'host decides save location',
    ],
  },
  {
    tag: 'C',
    name: 'Advisor',
    eyebrow: 'PROMPT ONLY',
    trigger: (
      <>
        <code>ENABLE_GARDEN_IMAGEGEN</code>
        <span className="and">not enabled</span>
        <span>·</span>
        <span>host has no image tools</span>
      </>
    ),
    body: 'Degrades to prompt advisor. Once the final prompt is written, hand it to the user to execute in ChatGPT / Midjourney / DALL·E / Sora / Nano Banana or any other tool.',
    flow: [
      'scripts/check-mode.js',
      'references/<cat>/<tpl>.md',
      'rendered prompt (save + display)',
      'user executes',
    ],
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Detect Run Mode',
    body: 'First step for any task: run check-mode.js, get A / B / C, decide which branch to follow.',
    code: 'node skills/gpt-image-2/scripts/check-mode.js --json',
  },
  {
    n: '02',
    title: 'Identify Visual Type',
    body: 'Determine which of the 18 categories the task belongs to (poster / UI / product / academic / infographic / editing workflow …).',
    code: null,
  },
  {
    n: '03',
    title: 'Read Only the Nearest Template',
    body: 'From references/, open only the single template most relevant to the current task, following the <category>/<template>.md hierarchy.',
    code: 'references/poster-and-campaigns/banner-hero.md',
  },
  {
    n: '04',
    title: 'Map User Input to Fields',
    body: 'In JSON templates {argument …} are fillable slots; fill what the user provided, defaults can cover gaps, only ask precise questions when critical info is missing.',
    code: null,
  },
  {
    n: '05',
    title: 'Render Final Prompt',
    body: 'Flatten JSON or preserve structured natural language paragraphs (some hand-drawn / scientific templates), output a string ready to feed directly to the image model.',
    code: null,
  },
  {
    n: '06',
    title: 'Branch by Mode',
    body: 'Mode A calls script to generate, Mode B calls host tool, Mode C gives prompt to user. One-line summary: current mode / prompt destination / image destination.',
    code: null,
  },
];

const CONSTRAINTS = [
  {
    eyebrow: 'Maintain',
    title: 'Strict Template Format Rendering',
    body: 'JSON templates output as JSON; structured natural language templates output as paragraphs. Do not stuff "mode explanations" from SKILL.md into the final prompt - that is meta-info for the Agent.',
  },
  {
    eyebrow: 'Prohibit',
    title: 'Fabricated Quantitative Data',
    body: 'In academic / technical diagrams, values, axes, contour lines, color scales, and formulas must be real. If no data exists, deliver a blank diagram - do not fabricate.',
  },
  {
    eyebrow: 'Recommend',
    title: 'Read Only the Nearest Template',
    body: 'Do not read the entire references/ directory at once. Follow the <category>/<template>.md two-level hierarchy and open only the single template most relevant to the current task.',
  },
  {
    eyebrow: 'Recommend',
    title: 'Always Save Prompt to Disk',
    body: 'A = mandatory, B = recommended, C = mandatory. Name like garden-gpt-image-2/prompt/<task-slug>-<YYYYMMDD-HHMMSS>.md for easy reuse and version management.',
  },
];

export function SkillsPage({ navigate }: Props) {
  const [activeMode, setActiveMode] = useState<'A' | 'B' | 'C'>('A');

  useEffect(() => {
    document.title = 'Skill · GPT-IMAGE 2 Toolkit';
    return () => {
      document.title = 'GPT-IMAGE 2 · The Visual Production Model';
    };
  }, []);

  const tplsByCat = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const t of Object.values(cases.templates)) {
      (map[t.category] ||= []).push(t.label);
    }
    return map;
  }, []);

  return (
    <main className="sp">
      {/* === HERO === */}
      <header className="sp-hero">
        <button className="sp-back" onClick={() => navigate({ name: 'home' })}>
          <span aria-hidden="true">←</span> Back to Gallery
        </button>

        <div className="sp-hero-meta mono">
          <span>03 / SKILL DOCS</span>
          <span className="sp-meta-sep" />
          <span>GPT-IMAGE 2 TOOLKIT</span>
          <span className="sp-meta-sep" />
          <span>v1 · {new Date().getFullYear()}</span>
          <span className="sp-meta-sep" />
          <a
            className="sp-hero-source"
            href={SKILL_TREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub: ConardLi/garden-skills"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.16-.89-1.16-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.96 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span>SOURCE · ConardLi/garden-skills</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <h1 className="sp-hero-title serif">
          A <span className="serif-italic">focused</span> Skill
          <br />
          for one model. Three runtimes.
        </h1>

        <p className="sp-hero-lede">
          This is a <strong>focused</strong> Skill for GPT-Image-2. It does only two things -
          generate (<code className="mono">/images/generations</code>) and edit
          (<code className="mono">/images/edits</code>);
          but adapts to three environments: Garden Local, Host-Native delegation, and Advisor mode,
          and distills {Object.keys(cases.categories).length} major categories and {cases.summary.templates}+ structured templates into <code className="mono">references/</code>.
        </p>

        <dl className="sp-hero-stats">
          <div className="sp-hero-stat">
            <dt className="mono">RUNTIME MODES</dt>
            <dd className="serif">3</dd>
          </div>
          <div className="sp-hero-stat">
            <dt className="mono">CATEGORIES</dt>
            <dd className="serif">{Object.keys(cases.categories).length}</dd>
          </div>
          <div className="sp-hero-stat">
            <dt className="mono">TEMPLATES</dt>
            <dd className="serif">{cases.summary.templates}</dd>
          </div>
          <div className="sp-hero-stat">
            <dt className="mono">CASES SHIPPED</dt>
            <dd className="serif">{cases.summary.cases}</dd>
          </div>
        </dl>

        <div className="sp-hero-divider" />

        <p className="sp-hero-quote serif-italic">
          "What ultimately goes to the image model is always the rendered prompt string itself -
          whether flattened JSON or structured natural language paragraphs."
        </p>
      </header>

      {/* === MODES === */}
      <section className="sp-section sp-modes">
        <div className="sp-section-head">
          <span className="eyebrow">01 · RUNTIME MODES</span>
          <h2 className="serif sp-section-title">Step One Is Always check‑mode.js</h2>
          <p className="sp-section-sub">
            The same Skill behaves very differently in three environments. Mode is determined by two environment variables and host capabilities;
            check‑mode.js yields <code className="mono">mode = A / A? / B-or-C</code> and suggests next steps.
          </p>
        </div>

        <div className="sp-mode-tabs" role="tablist">
          {MODES.map((m) => (
            <button
              key={m.tag}
              role="tab"
              aria-selected={activeMode === m.tag}
              className={`sp-mode-tab ${activeMode === m.tag ? 'sp-mode-tab-on' : ''}`}
              onClick={() => setActiveMode(m.tag as 'A' | 'B' | 'C')}
            >
              <span className="sp-mode-tab-tag mono">MODE {m.tag}</span>
              <span className="sp-mode-tab-name">{m.name}</span>
            </button>
          ))}
        </div>

        <div className="sp-mode-cards">
          {MODES.map((m) => (
            <article
              key={m.tag}
              className={`sp-mode-card ${activeMode === m.tag ? 'sp-mode-card-on' : ''}`}
              onMouseEnter={() => setActiveMode(m.tag as 'A' | 'B' | 'C')}
            >
              <header className="sp-mode-card-head">
                <span className="sp-mode-card-tag mono">{m.tag}</span>
                <div>
                  <div className="mono sp-mode-card-eyebrow">{m.eyebrow}</div>
                  <div className="serif sp-mode-card-name">{m.name}</div>
                </div>
              </header>
              <div className="sp-mode-card-trigger mono">{m.trigger}</div>
              <p className="sp-mode-card-body">{m.body}</p>
              <ol className="sp-mode-card-flow">
                {m.flow.map((step, i) => (
                  <li key={i} className="sp-mode-card-flow-item">
                    <span className="mono sp-mode-card-flow-n">{String(i + 1).padStart(2, '0')}</span>
                    <code className="mono">{step}</code>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {/* === WORKFLOW === */}
      <section className="sp-section sp-workflow">
        <div className="sp-section-head">
          <span className="eyebrow">02 · WORKFLOW</span>
          <h2 className="serif sp-section-title">Six Steps Universal · Seventh Step Branches</h2>
          <p className="sp-section-sub">
            Regardless of A / B / C, the first 6 steps are identical; the difference is only in steps 7-8:
            how to send the rendered prompt to the image model, and where to save it.
          </p>
        </div>

        <ol className="sp-steps">
          {STEPS.map((s) => (
            <li key={s.n} className="sp-step">
              <div className="sp-step-meta">
                <span className="mono sp-step-n">{s.n}</span>
                <span className="sp-step-line" />
              </div>
              <div className="sp-step-body">
                <h3 className="serif sp-step-title">{s.title}</h3>
                <p className="sp-step-desc">{s.body}</p>
                {s.code && (
                  <pre className="mono sp-step-code"><code>{s.code}</code></pre>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="sp-fork">
          <div className="sp-fork-head">
            <span className="eyebrow">FORK · STEP 07</span>
            <h3 className="serif sp-fork-title">After Prompt Rendering, Distribute by Mode</h3>
          </div>
          <div className="sp-fork-grid">
            <div className="sp-fork-cell">
              <span className="mono sp-fork-tag">07-A</span>
              <h4 className="serif sp-fork-name">Save + Call Script</h4>
              <p>Save final prompt to <code className="mono">prompt/</code>, call <code className="mono">generate.js</code> / <code className="mono">edit.js</code>, images land in <code className="mono">image/</code>.</p>
            </div>
            <div className="sp-fork-cell">
              <span className="mono sp-fork-tag">07-B</span>
              <h4 className="serif sp-fork-name">Delegate to Host Tool</h4>
              <p>Do not call <code className="mono">generate.js</code> (will fail). Feed prompt directly into host's native <code className="mono">image_generation</code> tools.</p>
            </div>
            <div className="sp-fork-cell">
              <span className="mono sp-fork-tag">07-C</span>
              <h4 className="serif sp-fork-name">Write to User</h4>
              <p>Must save prompt to <code className="mono">prompt/</code> and display it fully in conversation, with a note on "how to use / recommended tools".</p>
            </div>
          </div>
        </div>
      </section>

      {/* === TEMPLATE INDEX === */}
      <section className="sp-section sp-index">
        <div className="sp-section-head">
          <span className="eyebrow">03 · TEMPLATE INDEX</span>
          <h2 className="serif sp-section-title">
            {Object.keys(cases.categories).length} categories · {cases.summary.templates} structured templates
          </h2>
          <p className="sp-section-sub">
            Each template is a Markdown file defining JSON / structured natural language templates,
            parameter tables, variant notes, and typical cases. Click any template to jump to its gallery cases.
          </p>
        </div>

        <div className="sp-index-grid">
          {ORDERED_CATEGORIES.map((catKey, idx) => {
            const cat = cases.categories[catKey];
            if (!cat) return null;
            const tpls = tplsByCat[catKey] || [];
            return (
              <article
                key={catKey}
                className="sp-cat"
                style={{ '--cat-acc': cat.accent } as React.CSSProperties}
              >
                <header className="sp-cat-head">
                  <span className="mono sp-cat-n">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="sp-cat-stack">
                    <h3 className="serif sp-cat-name">{cat.cn}</h3>
                    <span className="mono sp-cat-en">{cat.label}</span>
                  </div>
                  <div className="sp-cat-stat mono">
                    <span className="sp-cat-stat-num">{tpls.length}</span>
                    <span className="sp-cat-stat-x">×</span>
                    <span className="sp-cat-stat-num">{cat.total}</span>
                  </div>
                </header>
                <ul className="sp-cat-tpls">
                  {tpls.map((t) => (
                    <li
                      key={t}
                      className="sp-cat-tpl"
                      onClick={() => navigate({ name: 'home', query: t })}
                      style={{ cursor: 'pointer' }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigate({ name: 'home', query: t });
                        }
                      }}
                    >
                      <span className="sp-cat-tpl-bullet" />
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* === CONSTRAINTS === */}
      <section className="sp-section sp-rules">
        <div className="sp-section-head">
          <span className="eyebrow">04 · GUARDRAILS</span>
          <h2 className="serif sp-section-title">Hard Constraints to Keep Skill Stable</h2>
        </div>
        <div className="sp-rules-grid">
          {CONSTRAINTS.map((c, i) => (
            <article key={i} className="sp-rule">
              <span className="mono sp-rule-eyebrow">{c.eyebrow}</span>
              <h3 className="serif sp-rule-title">{c.title}</h3>
              <p className="sp-rule-body">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* === CTA === */}
      <section className="sp-cta">
        <div className="sp-cta-text">
          <h3 className="serif sp-cta-title">
            Ready? Browse <span className="serif-italic">{cases.summary.cases}</span> proven cases.
          </h3>
          <p className="sp-cta-sub">
            Want to run this Skill yourself? Source / templates / three runtime modes are all open-source at <code className="mono">ConardLi/garden-skills</code>.
          </p>
        </div>
        <div className="sp-cta-actions">
          <button
            className="sp-cta-btn"
            onClick={() => navigate({ name: 'home' })}
          >
            <span>Browse Gallery</span>
            <span className="sp-cta-btn-arrow" aria-hidden="true">→</span>
          </button>
          <a
            className="sp-cta-btn sp-cta-btn-ghost"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.16-.89-1.16-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.96 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.5 7.5 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.08-1.87 3.76-3.65 3.96.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span>Star on GitHub</span>
            <span className="sp-cta-btn-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
