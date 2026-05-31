import { useEffect, useState } from 'react';
import '../styles/nightwing-transition.css';

export default function NightwingTransition({ onDone }) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 100);
        const t2 = setTimeout(() => setPhase(2), 1000);
        const t3 = setTimeout(() => setPhase(3), 1800);
        const t4 = setTimeout(() => onDone(), 2600);
        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, []);

    return (
        <div className={`nw-transition phase-${phase}`}>
            <div className="nw-transition__bg" />

            {/* Escrima sticks cross sweep — NO name text */}
            <div className="nw-transition__stick nw-transition__stick--left" />
            <div className="nw-transition__stick nw-transition__stick--right" />

            {/* Energy burst circle */}
            <div className="nw-transition__burst">
                <div className="nw-transition__burst-ring" />
                <div className="nw-transition__burst-ring nw-transition__burst-ring--2" />
                <svg viewBox="0 0 100 60" className="nw-transition__symbol">
                    <ellipse cx="25" cy="30" rx="20" ry="8" stroke="#00d4ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <ellipse cx="75" cy="30" rx="20" ry="8" stroke="#00d4ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <circle cx="50" cy="30" r="4" fill="#1e90ff" />
                </svg>
            </div>

            {/* Wipe overlay — no text */}
            <div className="nw-transition__wipe" />
        </div>
    );
}