import { useEffect, useState } from 'react';
import '../styles/redrobin-transition.css';

const SHARDS = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${8 + (i * 5.2)}%`,
    delay: `${0.08 + (i % 6) * 0.07}s`,
    drift: `${i % 2 === 0 ? -1 : 1}${18 + i * 3}px`,
}));

export default function RedRobinTransition({ onDone }) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 120);
        const t2 = setTimeout(() => setPhase(2), 950);
        const t3 = setTimeout(() => setPhase(3), 1800);
        const t4 = setTimeout(() => onDone(), 1000);
        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, [onDone]);

    return (
        <div className={`rr-transition phase-${phase}`}>
            <div className="rr-transition__bg" />
            <div className="rr-transition__grid" />
            <div className="rr-transition__scan" />

            <div className="rr-transition__shards">
                {SHARDS.map((shard) => (
                    <span
                        key={shard.id}
                        style={{
                            left: shard.left,
                            '--delay': shard.delay,
                            '--drift': shard.drift,
                        }}
                    />
                ))}
            </div>

            <div className="rr-transition__center">
                <div className="rr-transition__ring rr-transition__ring--outer" />
                <div className="rr-transition__ring rr-transition__ring--inner" />
                <svg className="rr-transition__symbol" viewBox="0 0 240 180" aria-label="Red Robin emblem">
                    <defs>
                        <linearGradient id="rrWing" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d7b15a" />
                            <stop offset="36%" stopColor="#8f1021" />
                            <stop offset="72%" stopColor="#09100f" />
                            <stop offset="100%" stopColor="#3ec7ad" />
                        </linearGradient>
                        <filter id="rrGlow" x="-40%" y="-40%" width="180%" height="180%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path
                        className="rr-transition__wing rr-transition__wing--left"
                        d="M120 28 C93 42 65 61 26 58 C44 81 66 97 96 101 C74 111 55 125 43 151 C79 144 106 126 120 101 Z"
                        fill="url(#rrWing)"
                        filter="url(#rrGlow)"
                    />
                    <path
                        className="rr-transition__wing rr-transition__wing--right"
                        d="M120 28 C147 42 175 61 214 58 C196 81 174 97 144 101 C166 111 185 125 197 151 C161 144 134 126 120 101 Z"
                        fill="url(#rrWing)"
                        filter="url(#rrGlow)"
                    />
                    <path
                        className="rr-transition__core"
                        d="M120 28 C108 52 108 82 120 110 C132 82 132 52 120 28 Z"
                        fill="#d7b15a"
                    />
                </svg>
                <div className="rr-transition__label">
                    {'RED ROBIN'.split('').map((char, i) => (
                        <span key={`${char}-${i}`}>{char === ' ' ? '\u00A0' : char}</span>
                    ))}
                </div>
            </div>

            <div className="rr-transition__wipe" />
        </div>
    );
}
