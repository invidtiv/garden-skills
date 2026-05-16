import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import { SceneFade } from '../../shared/SceneFade';
import './Workflow.css';

/**
 * Chapter 05 · Part Two: Workflow
 *
 * Voiceover gist:
 *   - Six-step flow: Understand needs → Explore resources → Make a plan → Build structure → Verify → Ultra-brief summary
 *   - Detail ①: When to ask / when to just build —— build when informed, ask when unclear
 *       User: "Make a presentation"               → AI asks a few questions first
 *       User: "Make a presentation, engineering all-hands, 10 min" → AI starts building immediately
 *   - Detail ②: Ultra-brief summary —— "Summarize EXTREMELY BRIEFLY"
 *
 * Pacing (7 steps / step 0..6):
 *  0  Setup (eyebrow)
 *  1  Original prompt block + six-station pipeline (empty)
 *  2  Light up stations 1-3 (line advances)
 *  3  Light up stations 4-6
 *  4  pivot: Detail ① "When to ask vs when to build"
 *  5  Two-column chat bubble comparison
 *  6  Detail ② "Summarize EXTREMELY BRIEFLY" original + bad / good example comparison
 */

interface Station {
  no: string;
  en: string;
  cn: string;
}

const STATIONS: Station[] = [
  { no: '1', en: 'Understand',  cn: 'Understand Needs' },
  { no: '2', en: 'Explore',     cn: 'Explore Resources' },
  { no: '3', en: 'Plan',        cn: 'Make a Plan' },
  { no: '4', en: 'Build',       cn: 'Build Structure' },
  { no: '5', en: 'Verify',      cn: 'Verify & Finish' },
  { no: '6', en: 'Brief',       cn: 'Ultra-Brief Summary' },
];

function Workflow({ localStep }: ChapterContext) {
  const at = (n: number) => localStep >= n;

  // —— Three acts ——
  const scenePipe    = localStep <= 3;
  const sceneDecide  = localStep === 4 || localStep === 5;
  const sceneSummary = localStep >= 6;

  // Pipeline lighting progress 0..6
  const litCount = (() => {
    if (localStep < 1) return 0;
    if (localStep === 1) return 0;
    if (localStep === 2) return 3;
    return 6;
  })();
  const linePct = (litCount / 6) * 100;

  return (
    <section className="wf">
      {/* ════════════ Scene PIPELINE（step 0..3）════════════ */}
      <SceneFade active={scenePipe} exitMs={420} enterDelayMs={120}>
        <div className="wf__pipe-scene">
          {at(1) && (
            <Reveal kind="rise" duration={780} delay={80} className="wf__excerpt">
              <div className="wf__excerpt-head">
                <span className="wf__src-bracket">[</span>
                <span className="wf__src-label">SYSTEM PROMPT</span>
                <span className="wf__src-sep">·</span>
                <span className="wf__src-line">L17-23</span>
                <span className="wf__src-sep">/</span>
                <span className="wf__src-mute">Original</span>
                <span className="wf__src-bracket">]</span>
              </div>
              <div className="wf__excerpt-body">
                <div className="wf__excerpt-title">## Your workflow</div>
                <div className="wf__excerpt-list">
                  <span><b>1.</b> Understand user needs ...</span>
                  <span><b>2.</b> Explore provided resources ...</span>
                  <span><b>3.</b> Plan and/or make a todo list.</span>
                  <span><b>4.</b> Build folder structure ...</span>
                  <span><b>5.</b> Finish: call <code>done</code> ...</span>
                  <span><b>6.</b> Summarize <em>EXTREMELY BRIEFLY</em> — caveats and next steps only.</span>
                </div>
              </div>
            </Reveal>
          )}

          {at(1) && (
            <Reveal kind="rise" duration={900} delay={520} className="wf__pipeline">
              {/* Bottom baseline */}
              <div className="wf__line">
                <div className="wf__line-fill" style={{ width: `${linePct}%` }} />
              </div>

              {/* 6 stations */}
              <div className="wf__stations">
                {STATIONS.map((s, i) => {
                  const lit = i < litCount;
                  return (
                    <div
                      key={s.no}
                      className={`wf__station ${lit ? 'is-lit' : ''}`}
                      style={{ transitionDelay: `${i * 90}ms` }}
                    >
                      <div className="wf__station-cn">{s.cn}</div>
                      <div className="wf__station-node">
                        <span className="wf__station-no">{s.no}</span>
                        <span className="wf__station-pulse" />
                      </div>
                      <div className="wf__station-en">{s.en}</div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}
        </div>
      </SceneFade>

      {/* ════════════ Scene DECIDE（step 4..5）════════════ */}
      <SceneFade active={sceneDecide} exitMs={420} enterDelayMs={420}>
        <div className="wf__decide-scene">
          <Reveal kind="rise" duration={780} delay={80} className="wf__decide-head">
            <span className="wf__decide-num">Detail ①</span>
            <h2 className="wf__decide-title">
              When to <em>Ask</em>? When to <em className="wf__decide-do">Just Build</em>?
            </h2>
            <div className="wf__decide-rule">
              <span className="wf__src-bracket">[</span>
              <span className="wf__src-label">RULE</span>
              <span className="wf__src-bracket">]</span>
              <span className="wf__decide-rule-text">Build when informed · Ask when unclear</span>
            </div>
          </Reveal>

          <div className="wf__decide-grid">
            {/* —— Left: vague request → ask back —— */}
            <Reveal kind="rise" duration={780} delay={260} className="wf__chat wf__chat--ask">
              <div className="wf__chat-tag">
                <span className="wf__chat-tag-dot" />
                AMBIGUOUS · Vague Request
              </div>

              <div className="wf__bubble wf__bubble--user">
                <span className="wf__bubble-meta">USER</span>
                <p>Make me a PPT</p>
              </div>

              <div className="wf__bubble wf__bubble--ai">
                <span className="wf__bubble-meta">CLAUDE</span>
                <p>Audience? Duration? Formality? Brand? Got data?...</p>
                <div className="wf__qmarks">
                  <span style={{ animationDelay: '0ms'   }}>?</span>
                  <span style={{ animationDelay: '180ms' }}>?</span>
                  <span style={{ animationDelay: '360ms' }}>?</span>
                  <span style={{ animationDelay: '540ms' }}>?</span>
                </div>
              </div>

              <div className="wf__chat-verdict wf__chat-verdict--ask">
                → ASK QUESTIONS
              </div>
            </Reveal>

            {/* —— Center divider —— */}
            <div className="wf__decide-vs">
              <span className="wf__decide-vs-line" />
              <span className="wf__decide-vs-knob">vs</span>
              <span className="wf__decide-vs-line" />
            </div>

            {/* —— Right: detailed request → build now —— */}
            {at(5) && (
              <Reveal kind="rise" duration={780} delay={120} className="wf__chat wf__chat--do">
                <div className="wf__chat-tag">
                  <span className="wf__chat-tag-dot wf__chat-tag-dot--do" />
                  ENOUGH INFO · Sufficient Detail
                </div>

                <div className="wf__bubble wf__bubble--user">
                  <span className="wf__bubble-meta">USER</span>
                  <p>Make me a PPT, engineering all-hands, 10&nbsp;min</p>
                </div>

                <div className="wf__bubble wf__bubble--ai">
                  <span className="wf__bubble-meta">CLAUDE</span>
                  <p>Got it, starting ——</p>
                  <div className="wf__action">
                    <span className="wf__action-bar" />
                    <span className="wf__action-bar" />
                    <span className="wf__action-bar" />
                  </div>
                </div>

                <div className="wf__chat-verdict wf__chat-verdict--do">
                  → NO QUESTIONS · GO BUILD
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </SceneFade>

      {/* ════════════ Scene SUMMARY（step 6）════════════ */}
      <SceneFade active={sceneSummary} exitMs={420} enterDelayMs={420}>
        <div className="wf__sum-scene">
          <Reveal kind="fade" duration={620} delay={80} className="wf__sum-num">
            Detail ②
          </Reveal>

          <Reveal kind="rise" duration={1100} delay={180} className="wf__sum-hero" as="h1">
            <span className="wf__sum-hero-en">Summarize <em>EXTREMELY BRIEFLY</em></span>
            <span className="wf__sum-hero-cn">Only <em>caveats</em> and <em>next steps</em>.</span>
          </Reveal>

          <Reveal kind="rise" duration={780} delay={520} className="wf__sum-source">
            <span className="wf__src-bracket">[</span>
            <span className="wf__src-label">SYSTEM PROMPT</span>
            <span className="wf__src-sep">·</span>
            <span className="wf__src-line">L23</span>
            <span className="wf__src-bracket">]</span>
            <span className="wf__sum-source-quote">
              &ldquo;Summarize EXTREMELY BRIEFLY — caveats and next steps only.&rdquo;
            </span>
          </Reveal>

          <Reveal kind="rise" duration={780} delay={760} className="wf__sum-grid">
            {/* Bad example */}
            <div className="wf__sum-card wf__sum-card--bad">
              <div className="wf__sum-card-tag">
                <span className="wf__sum-x">×</span> Recapping what was done
              </div>
              <div className="wf__sum-card-body">
                I first created <s>Header.tsx</s>, then added <s>Hero.tsx</s>,
                then split styles into <s>theme.ts</s>, then added hover to buttons...
              </div>
              <div className="wf__sum-strike" />
            </div>

            {/* Good example */}
            <div className="wf__sum-card wf__sum-card--good">
              <div className="wf__sum-card-tag">
                <span className="wf__sum-check">✓</span> Caveats + Next Steps
              </div>
              <div className="wf__sum-card-body">
                <p><b>caveats</b> — Responsive not yet done / Copy is placeholder</p>
                <p><b>next</b> — Add hover states / Replace with real copy</p>
              </div>
            </div>
          </Reveal>
        </div>
      </SceneFade>
    </section>
  );
}

const def: ChapterDef = {
  id: 'workflow',
  title: 'Part Two · Workflow',
  eyebrow: '05',
  steps: 7,
  theme: 'ink',
  Component: Workflow,
};

export default def;
