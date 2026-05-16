import { useEffect, useRef } from 'react';
import type { ChapterContext, ChapterDef } from '../types';
import { Reveal } from '../../shared/Reveal';
import './Video.css';

/**
 * Chapter 02 · Anthropic Official Promo Embed
 *
 * Light paper-textured background + virtual TV frame + 16:9 video. Source: /video.mp4
 *
 * Keep only the TV frame —— no copy / eyebrow / caption.
 * - Mute autoplay on entry (bypass browser policy); users can unmute / pause via controls
 * - TV + stand data-no-step; operating controls won't advance
 * - Clicking the margin outside the TV advances to Ch03
 */
function VideoChapter(_: ChapterContext) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    const play = v.play();
    if (play && typeof play.catch === 'function') {
      play.catch(() => {/* user must click to play */});
    }
    return () => {
      v.pause();
    };
  }, []);

  return (
    <section className="vid">
      <Reveal kind="rise" duration={900} delay={120} className="vid__tv-wrap">
        <div className="vid__tv" data-no-step>
          {/* 4 corner screws */}
          <span className="vid__screw vid__screw--tl" />
          <span className="vid__screw vid__screw--tr" />
          <span className="vid__screw vid__screw--bl" />
          <span className="vid__screw vid__screw--br" />

          {/* Top status bar */}
          <div className="vid__topstrip">
            <span className="vid__led" />
            <span>ON · CH · 02</span>
            <span className="vid__topstrip-spacer" />
            <span>SIGNAL · STABLE</span>
          </div>

          {/* Screen */}
          <div className="vid__screen">
            <div className="vid__scanlines" aria-hidden />
            <video
              ref={videoRef}
              src="/video.mp4"
              className="vid__video"
              controls
              playsInline
              muted
              autoPlay
            />
          </div>

          {/* Bottom brand bar */}
          <div className="vid__brandstrip">
            <span className="vid__brand-mark" />
            <span className="vid__brand-name">ANTHROPIC</span>
          </div>
        </div>

        {/* Stand */}
        <div className="vid__stand" data-no-step>
          <span className="vid__stand-neck" />
          <span className="vid__stand-base" />
        </div>
      </Reveal>
    </section>
  );
}

const def: ChapterDef = {
  id: 'video',
  title: 'Official Promo',
  eyebrow: '02',
  steps: 1,
  theme: 'light',
  Component: VideoChapter,
};

export default def;
