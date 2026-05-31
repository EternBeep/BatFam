import { useEffect, useState } from 'react';
import '../styles/damian-transition.css';

// Smoke cloud config
const SMOKE = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${2 + i * 3.2}%`,
    size: `${70 + (i % 6) * 24}px`,
    dur: `${2.4 + (i % 5) * 0.4}s`,
    delay: `${(i % 10) * 0.12}s`,
    drift: `${i % 2 === 0 ? '-' : ''}${12 + (i % 7) * 9}px`,
}));

// Rain drops
const RAIN = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${i * 2.5}%`,
    dur: `${0.6 + (i % 5) * 0.15}s`,
    delay: `${(i % 12) * 0.06}s`,
    h: `${60 + (i % 4) * 30}px`,
}));

// Shards from slash impact
const SHARDS = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    angle: (i / 16) * 360,
    dist: `${80 + (i % 4) * 40}px`,
    dur: `${0.5 + (i % 3) * 0.15}s`,
    delay: `${i * 0.03}s`,
    size: `${3 + (i % 3) * 2}px`,
}));

export default function DamianTransition({ onDone }) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        // 6-phase sequence — each phase layers new effects
        const t1 = setTimeout(() => setPhase(1), 80);    // atmosphere + rain + smoke build
        const t2 = setTimeout(() => setPhase(2), 700);   // katana descends
        const t3 = setTimeout(() => setPhase(3), 1300);  // first slash + screen shake
        const t4 = setTimeout(() => setPhase(4), 1650);  // second slash + shard burst + flash
        const t5 = setTimeout(() => setPhase(5), 2100);  // text reveal
        const t6 = setTimeout(() => setPhase(6), 2700);  // final wipe
        const t7 = setTimeout(() => onDone(), 3400);
        return () => [t1, t2, t3, t4, t5, t6, t7].forEach(clearTimeout);
    }, [onDone]);

    return (
        <div className={`dw-transition phase-${phase}`}>
            {/* Base atmosphere */}
            <div className="dw-t-bg" />
            <div className="dw-t-fog" />
            <div className="dw-t-scanlines" />
            <div className="dw-t-vignette" />

            {/* Corner marks */}
            <div className="dw-corner dw-corner--tl" />
            <div className="dw-corner dw-corner--tr" />
            <div className="dw-corner dw-corner--bl" />
            <div className="dw-corner dw-corner--br" />

            {/* Kanji watermarks */}
            <div className="dw-t-kanji dw-t-kanji--l" aria-hidden>忍</div>
            <div className="dw-t-kanji dw-t-kanji--r" aria-hidden>義</div>

            {/* Rain — jade drops falling */}
            <div className="dw-t-rain" aria-hidden>
                {RAIN.map(r => (
                    <div
                        key={r.id}
                        className="dw-rain-drop"
                        style={{
                            left: r.left,
                            '--dur': r.dur,
                            '--delay': r.delay,
                            '--h': r.h,
                        }}
                    />
                ))}
            </div>

            {/* Smoke */}
            <div className="dw-t-smoke" aria-hidden>
                {SMOKE.map(p => (
                    <div
                        key={p.id}
                        className="dw-smoke-particle"
                        style={{
                            left: p.left,
                            '--size': p.size,
                            '--dur': p.dur,
                            '--delay': p.delay,
                            '--drift': p.drift,
                        }}
                    />
                ))}
            </div>

            {/* Slash 1 — diagonal top-left to bottom-right */}
            <div className="dw-t-slash dw-t-slash--1" />
            {/* Slash 2 — opposite diagonal */}
            <div className="dw-t-slash dw-t-slash--2" />
            {/* Slash 3 — horizontal */}
            <div className="dw-t-slash dw-t-slash--3" />

            {/* Flash */}
            <div className="dw-t-flash" />

            {/* Shard burst from centre */}
            <div className="dw-t-shards" aria-hidden>
                {SHARDS.map(s => (
                    <div
                        key={s.id}
                        className="dw-shard"
                        style={{
                            '--angle': `${s.angle}deg`,
                            '--dist': s.dist,
                            '--dur': s.dur,
                            '--delay': s.delay,
                            '--size': s.size,
                        }}
                    />
                ))}
            </div>

            {/* Screen shake wrapper */}
            <div className="dw-t-center">
                {/* Katana */}
                <div className="dw-katana-wrap">
                    <div className="dw-katana-ring" />
                    <div className="dw-katana-ring dw-katana-ring--2" />
                    <div className="dw-katana-ring dw-katana-ring--3" />

                    <svg viewBox="0 0 40 380" className="dw-katana-svg" xmlns="http://www.w3.org/2000/svg" aria-label="Katana">
                        <defs>
                            <linearGradient id="bladeG" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#050d05" />
                                <stop offset="30%"  stopColor="#1a4a1a" />
                                <stop offset="50%"  stopColor="#d0d8c0" />
                                <stop offset="70%"  stopColor="#1a4a1a" />
                                <stop offset="100%" stopColor="#050d05" />
                            </linearGradient>
                            <linearGradient id="guardG" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#2a2010" />
                                <stop offset="50%"  stopColor="#d4a840" />
                                <stop offset="100%" stopColor="#2a2010" />
                            </linearGradient>
                            <linearGradient id="handleG" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#060d06" />
                                <stop offset="50%"  stopColor="#1a3a1a" />
                                <stop offset="100%" stopColor="#060d06" />
                            </linearGradient>
                            <filter id="bGlow" x="-100%" y="-5%" width="300%" height="110%">
                                <feGaussianBlur stdDeviation="4" result="b" />
                                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                            <filter id="gGlow" x="-150%" y="-150%" width="400%" height="400%">
                                <feGaussianBlur stdDeviation="3" result="b" />
                                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                            </filter>
                        </defs>

                        {/* Blade tip */}
                        <polygon points="20,2 23,32 17,32" fill="url(#bladeG)" filter="url(#bGlow)" />
                        {/* Blade body */}
                        <rect x="17" y="32" width="6" height="70" fill="url(#bladeG)" filter="url(#bGlow)" />
                        {/* Hamon edge */}
                        <line x1="18.5" y1="8" x2="18.5" y2="100" stroke="#28a044" strokeWidth="0.6" opacity="0.7" />
                        {/* Hi groove */}
                        <line x1="21.5" y1="18" x2="21.5" y2="98" stroke="#1d7a32" strokeWidth="0.4" opacity="0.5" />

                        {/* Tsuba */}
                        <ellipse cx="20" cy="106" rx="17" ry="6" fill="url(#guardG)" filter="url(#gGlow)" />
                        <ellipse cx="20" cy="106" rx="12" ry="4" fill="none" stroke="#d4a840" strokeWidth="0.5" opacity="0.6" />
                        <ellipse cx="20" cy="106" rx="7"  ry="2" fill="none" stroke="#d4a840" strokeWidth="0.3" opacity="0.4" />

                        {/* Habaki */}
                        <rect x="17.5" y="112" width="5" height="12" fill="#3a2a10" stroke="#d4a840" strokeWidth="0.4" opacity="0.8" />

                        {/* Tsuka */}
                        <rect x="17" y="124" width="6" height="90" rx="2" fill="url(#handleG)" stroke="#1d7a32" strokeWidth="0.5" />
                        {Array.from({ length: 11 }, (_, i) => (
                            <line key={i} x1="17" y1={128 + i * 8} x2="23" y2={132 + i * 8}
                                stroke="#0a1a0a" strokeWidth="1.8" opacity="0.7" />
                        ))}
                        <circle cx="20" cy="170" r="3.5" fill="#d4a840" opacity="0.8" filter="url(#gGlow)" />

                        {/* Kashira */}
                        <ellipse cx="20" cy="218" rx="8" ry="4" fill="url(#guardG)" filter="url(#gGlow)" />
                    </svg>
                </div>

                {/* Name label */}
                <div className="dw-t-label">
                    {'DAMIAN WAYNE'.split('').map((c, i) => (
                        <span key={i}>{c === ' ' ? '\u00A0' : c}</span>
                    ))}
                </div>

                <div className="dw-t-sublabel">SON OF BATMAN · ROBIN V · LEAGUE OF SHADOWS</div>
            </div>

            {/* Final wipe */}
            <div className="dw-t-wipe" />
        </div>
    );
}
