import { useEffect, useRef, useState } from 'react';
import '../styles/nightwing-loader.css';

export default function NightwingLoader({ onEnter }) {
    const canvasRef = useRef(null);
    const [phase, setPhase] = useState('lines'); // lines -> logo -> enter
    const [glitchText, setGlitchText] = useState('NIGHTWING');

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let animId;
        let particles = [];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.6 + 0.2,
                color: Math.random() > 0.5 ? '#1e90ff' : '#00d4ff',
            });
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(2, 4, 12, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            // connect close particles
            particles.forEach((p, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p.x - p2.x, dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = '#1e90ff';
                        ctx.globalAlpha = (1 - dist / 100) * 0.15;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                });
            });

            animId = requestAnimationFrame(draw);
        };
        draw();

        const t1 = setTimeout(() => setPhase('logo'), 600);
        const t2 = setTimeout(() => setPhase('enter'), 2000);

        return () => {
            cancelAnimationFrame(animId);
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
        const original = 'NIGHTWING';
        let iteration = 0;
        const interval = setInterval(() => {
            setGlitchText(
                original.split('').map((l, i) =>
                    i < iteration ? l : chars[Math.floor(Math.random() * chars.length)]
                ).join('')
            );
            if (iteration >= original.length) clearInterval(interval);
            iteration += 0.4;
        }, 60);
        return () => clearInterval(interval);
    }, [phase === 'logo']);

    return (
        <div className="nw-loader">
            <canvas ref={canvasRef} className="nw-loader__canvas" />

            <div className={`nw-loader__content ${phase}`}>
                <div className="nw-loader__emblem">
                    <svg viewBox="0 0 120 60" className="nw-escrima">
                        <ellipse cx="30" cy="30" rx="25" ry="10" stroke="#1e90ff" strokeWidth="2" fill="none" />
                        <ellipse cx="90" cy="30" rx="25" ry="10" stroke="#1e90ff" strokeWidth="2" fill="none" />
                        <line x1="5" y1="30" x2="115" y2="30" stroke="#00d4ff" strokeWidth="1" strokeDasharray="4,3" />
                    </svg>
                </div>

                <h1 className="nw-loader__title">{glitchText}</h1>
                <p className="nw-loader__sub">BLÜDHAVEN'S GUARDIAN</p>

                {phase === 'enter' && (
                    <button className="nw-loader__enter" onClick={onEnter}>
                        <span>ENTER THE CITY</span>
                        <div className="nw-loader__enter-line" />
                    </button>
                )}
            </div>

            <div className="nw-loader__scanline" />
            <div className="nw-loader__corner nw-loader__corner--tl" />
            <div className="nw-loader__corner nw-loader__corner--tr" />
            <div className="nw-loader__corner nw-loader__corner--bl" />
            <div className="nw-loader__corner nw-loader__corner--br" />
        </div>
    );
}