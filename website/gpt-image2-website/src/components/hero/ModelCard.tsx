import { useEffect } from 'react';
import './ModelCard.css';

interface Props {
  expanded: boolean;
  onClose: () => void;
}

const STRENGTHS = [
  {
    n: '01',
    title: 'Text Rendering',
    en: 'Text Rendering',
    body: 'Posters, menus, signage, UI labels, infographics — Chinese / Japanese / Korean / Hindi text in images is trained as a core capability. Say goodbye to the "text gibberish" problem that plagued previous-gen AI images.',
  },
  {
    n: '02',
    title: 'Instruction Following',
    en: 'Instruction Following',
    body: 'You can be very specific: where to place the subject, how to arrange copy, whether the style leans magazine or e-commerce, which elements must stay. Much closer to "brief-to-image" than the previous generation.',
  },
  {
    n: '03',
    title: 'Image Editing',
    en: 'Image Editing',
    body: 'Ingest reference images, product shots, logos, sketches — then replace backgrounds, inpaint locally, unify style, preserve logo / packaging. It\'s a "visual workflow engine" not just a slot machine.',
  },
  {
    n: '04',
    title: 'Resolution Flexibility',
    en: 'Resolution Flexibility',
    body: '1024 square · 1536×1024 · 1024×1536 · 2K · 4K landscape and portrait. Outputs above 2560×1440 are still marked experimental.',
  },
];

const SURFACES = [
  { name: 'ChatGPT', tag: 'Images 2.0', body: 'Available on all plans; Images with Thinking requires Plus / Pro / Business.' },
  { name: 'OpenAI API', tag: 'gpt-image-2', body: '/images/generations & /images/edits — plug into your own product.' },
  { name: 'Codex', tag: 'via tooling', body: 'Depends on whether the environment has image tools wired in; lets Codex write prompt + call tool in one go.' },
  { name: 'Lovart', tag: 'design-grade', body: 'Commercial visuals, UI mockups, multilingual posters — packaged as a design platform.' },
  { name: 'OpenRouter', tag: 'gpt-5.4-image-2', body: 'Combines GPT-5.4 reasoning + Image 2 generation in a conversational flow.' },
  { name: '302.ai', tag: 'compatible gateway', body: 'Provides gpt-image-2 generation / editing APIs — third-party gateway entry.' },
];

export function ModelCard({ expanded, onClose }: Props) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expanded) onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [expanded, onClose]);

  return (
    <div className={`mc-overlay ${expanded ? 'mc-overlay-open' : ''}`}>
      <button
        className="mc-backdrop"
        onClick={onClose}
        aria-label="Close model card"
      />
      <div className="mc-card" role="dialog" aria-modal="true" aria-labelledby="mc-title">
        <header className="mc-head">
          <div>
            <div className="mono mc-eyebrow">MODEL CARD · 2026 EDITION</div>
            <h2 id="mc-title" className="mc-title serif">
              <span className="serif-italic">gpt</span>‑image‑2
            </h2>
            <p className="mc-sub">
              OpenAI's visual production model released April 21, 2026. Its strength isn't "more dazzling" —
              it's "more usable" — bundling text rendering, reference-image editing, multilingual layout, and flexible sizing
              into a multimodal image model that fits real workflows.
            </p>
          </div>
          <button className="mc-close" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <section className="mc-section">
          <div className="mc-sec-label mono">01 · Key Capabilities</div>
          <div className="mc-strengths">
            {STRENGTHS.map((s) => (
              <article key={s.n} className="mc-strength">
                <div className="mc-strength-head">
                  <span className="mono mc-strength-n">{s.n}</span>
                  <h3 className="mc-strength-title serif">{s.title}</h3>
                  <span className="mono mc-strength-en">/ {s.en}</span>
                </div>
                <p className="mc-strength-body">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mc-section">
          <div className="mc-sec-label mono">02 · Entry Points</div>
          <div className="mc-surfaces">
            {SURFACES.map((s) => (
              <article key={s.name} className="mc-surface">
                <div className="mc-surface-head">
                  <span className="mc-surface-name">{s.name}</span>
                  <span className="mono mc-surface-tag">{s.tag}</span>
                </div>
                <p className="mc-surface-body">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mc-section">
          <div className="mc-sec-label mono">03 · One-Line Summary</div>
          <blockquote className="mc-quote serif">
            <span className="mc-quote-mark">"</span>
            <span>
              GPT-Image-2's strength isn't just "drawing better" — it's approaching a visual production model that understands
              <span className="mc-em">copy, layout, brand, reference images, and end use</span>
              .
            </span>
          </blockquote>
        </section>

        <footer className="mc-foot">
          <div className="mono mc-foot-info">
            <span>SOURCE</span>
            <span>OpenAI Platform · Image API · Lovart</span>
          </div>
          <button className="btn btn-ghost" onClick={onClose}>
            <span>Collapse Card</span>
            <span className="btn-arrow">↑</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
