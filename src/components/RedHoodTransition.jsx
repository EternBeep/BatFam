import { useEffect, useState } from 'react';
import '../styles/redhood-transition.css';

const DRIPS = [
    { left: '8%', height: 120, dur: '1.2s', delay: '0.1s' },
    { left: '15%', height: 80, dur: '0.9s', delay: '0.3s' },
    { left: '24%', height: 150, dur: '1.4s', delay: '0s' },
    { left: '33%', height: 60, dur: '0.8s', delay: '0.5s' },
    { left: '41%', height: 200, dur: '1.6s', delay: '0.2s' },
    { left: '50%', height: 90, dur: '1.1s', delay: '0.4s' },
    { left: '58%', height: 130, dur: '1.3s', delay: '0.1s' },
    { left: '67%', height: 70, dur: '0.9s', delay: '0.6s' },
    { left: '75%', height: 180, dur: '1.5s', delay: '0.2s' },
    { left: '84%', height: 110, dur: '1.0s', delay: '0.3s' },
    { left: '92%', height: 50, dur: '0.7s', delay: '0.5s' },
];

/*
  Batarang SVG — Dark Knight / Begins silhouette, split exactly at x=200 (center of 400-wide viewBox).
  Left half  → clipPath id="btLeft"  (x 0–200)
  Right half → clipPath id="btRight" (x 200–400)

  The shape is drawn as a single filled path then clipped into two halves.
  Crack fracture is a jagged polyline drawn at the split seam.
*/
const BATARANG_PATH =
    // Entire batarang outline, centred on 200,80 in a 400×160 viewBox
    // Drawn clockwise from top-centre notch
    `
    M 200 30
    L 208 42  L 215 38  L 220 44  L 212 52
    L 230 56  L 280 40  L 340 24  L 390 10
    L 380 40  L 370 55  L 360 62  L 320 68
    L 290 72  L 270 80  L 260 90  L 248 112
    L 240 130
    L 200 100
    L 160 130
    L 152 112  L 140 90  L 130 80  L 110 72
    L 80 68   L 40 62   L 30 55   L 20 40
    L 10 10   L 60 24   L 120 40  L 170 56
    L 188 52  L 180 44  L 185 38  L 192 42
    Z
    `;

export default function RedHoodTransition({ onDone }) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 120);   // batarang appears
        const t2 = setTimeout(() => setPhase(2), 1000);  // crowbar slash + crack starts
        const t3 = setTimeout(() => setPhase(3), 1700);  // shatter apart + wipe
        const t4 = setTimeout(() => onDone(), 2500);
        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, [onDone]);

    return (
        <div className={`rh-transition phase-${phase}`}>
            <div className="rh-transition__bg" />
            <div className="rh-transition__noise" />
            <div className="rh-transition__scanlines" />

            {/* Blood drips from ceiling */}
            <div className="rh-transition__drips">
                {DRIPS.map((d, i) => (
                    <div
                        key={i}
                        className="rh-drip"
                        style={{
                            left: d.left,
                            height: d.height,
                            '--dur': d.dur,
                            '--delay': d.delay,
                        }}
                    />
                ))}
            </div>

            {/* Crowbar slash */}
            <div className="rh-transition__crowbar" />

            {/* Central batarang that cracks in half */}
            <div className="rh-transition__center">
                <div className="rh-batarang-wrap">

                    {/* Outer glow rings */}
                    <div className="rh-batarang-ring" />
                    <div className="rh-batarang-ring rh-batarang-ring--2" />

                    <svg
                        viewBox="0 0 400 160"
                        className="rh-batarang-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Batarang"
                    >
                        <defs>
                            {/* Left half clip (x 0 → 200) */}
                            <clipPath id="btLeft">
                                <rect x="0" y="0" width="200" height="160" />
                            </clipPath>
                            {/* Right half clip (x 200 → 400) */}
                            <clipPath id="btRight">
                                <rect x="200" y="0" width="200" height="160" />
                            </clipPath>

                            {/* Red glow filter */}
                            <filter id="btGlow" x="-30%" y="-60%" width="160%" height="220%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Hot-crack glow */}
                            <filter id="crackGlow" x="-50%" y="-200%" width="200%" height="500%">
                                <feGaussianBlur stdDeviation="2.5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Metallic gradient — dark steel with red rim light */}
                            <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#1a0000" />
                                <stop offset="30%" stopColor="#2a0000" />
                                <stop offset="60%" stopColor="#0d0000" />
                                <stop offset="100%" stopColor="#050000" />
                            </linearGradient>

                            {/* Sheen line across the top edge */}
                            <linearGradient id="sheenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="40%" stopColor="#cc000030" />
                                <stop offset="50%" stopColor="#cc000060" />
                                <stop offset="60%" stopColor="#cc000030" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>

                        {/* ── LEFT WING HALF ── */}
                        <g className="rh-bt-left" clipPath="url(#btLeft)" filter="url(#btGlow)">
                            <path d={BATARANG_PATH} fill="url(#wingGrad)" stroke="#cc0000" strokeWidth="1.2" />
                            {/* red rim sheen */}
                            <path d={BATARANG_PATH} fill="url(#sheenGrad)" opacity="0.4" />
                        </g>

                        {/* ── RIGHT WING HALF ── */}
                        <g className="rh-bt-right" clipPath="url(#btRight)" filter="url(#btGlow)">
                            <path d={BATARANG_PATH} fill="url(#wingGrad)" stroke="#cc0000" strokeWidth="1.2" />
                            <path d={BATARANG_PATH} fill="url(#sheenGrad)" opacity="0.4" />
                        </g>

                        {/* ── FRACTURE LINE ── jagged vertical crack at x=200 */}
                        <polyline
                            className="rh-bt-crack"
                            points="200,10 197,28 203,44 196,60 204,76 197,92 203,108 198,128 200,150"
                            stroke="#ff1a1a"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            filter="url(#crackGlow)"
                            opacity="0"
                        />

                        {/* Secondary hairline crack for depth */}
                        <polyline
                            className="rh-bt-crack rh-bt-crack--2"
                            points="200,10 202,30 198,50 201,68 199,85 202,100 200,120 201,145"
                            stroke="#8b0000"
                            strokeWidth="0.6"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0"
                            style={{ animationDelay: '0.05s' }}
                        />

                        {/* Crack sparks — tiny radial lines at split point */}
                        <g className="rh-bt-sparks" opacity="0">
                            {[[-12, -8], [-6, -14], [6, -12], [14, -6], [-14, 4], [-8, 12], [10, 8], [14, 2]].map(([dx, dy], i) => (
                                <line
                                    key={i}
                                    x1="200" y1="80"
                                    x2={200 + dx} y2={80 + dy}
                                    stroke="#ff4444"
                                    strokeWidth="1"
                                    opacity="0.8"
                                />
                            ))}
                        </g>
                    </svg>
                </div>

                {/* Label */}
                <div className="rh-transition__label">
                    {'RED HOOD'.split('').map((c, i) => (
                        <span key={i}>{c === ' ' ? '\u00A0' : c}</span>
                    ))}
                </div>
            </div>

            {/* Crack flash */}
            <div className="rh-transition__crack-flash" />

            {/* Wipe */}
            <div className="rh-transition__wipe" />
        </div>
    );
}