import { useState, useEffect, useRef } from 'react';
import { images } from '../assets/images';
import redHoodCover from '../assets/RedHood/cover.jpg';
import redRobinCover from '../assets/RedRobin/cover.jpg';
import damianCharImg from '../assets/Robin/charselect.jpg';

const SELECTABLE = ['batman', 'nightwing', 'redhood', 'redrobin', 'damian'];

export default function CharSelect({ onSelect }) {
    const [focusIndex, setFocusIndex] = useState(0);
    const btnRefs = useRef([]);
    const [hoveredSequence, setHoveredSequence] = useState([]);
    const [familyUnited, setFamilyUnited] = useState(false);
    const hoverTimer = useRef(null);

    const onCardHover = (idx) => {
        setHoveredSequence(prev => {
            const next = [...prev, idx];
            // Check if all 5 chars hovered in order 0→4
            if (next.length >= 5 && next.slice(-5).every((v, i) => v === i)) {
                setFamilyUnited(true);
                setTimeout(() => setFamilyUnited(false), 4000);
                return [];
            }
            // Reset if wrong order
            if (next.length > 1 && next[next.length - 1] !== next.length - 1) return [idx === 0 ? 0 : -1];
            clearTimeout(hoverTimer.current);
            hoverTimer.current = setTimeout(() => setHoveredSequence([]), 3000);
            return next;
        });
    };

    useEffect(() => {
        btnRefs.current[focusIndex]?.focus();
    }, [focusIndex]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                setFocusIndex(i => Math.min(i + 1, SELECTABLE.length - 1));
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                setFocusIndex(i => Math.max(i - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                onSelect(SELECTABLE[focusIndex]);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [focusIndex, onSelect]);

    return (
        <div id="char-select" className="active">
            <div className="cs-bg-glow"></div>
            <div className="cs-header">
                <p className="cs-eyebrow">Gotham City</p>
                <h1 className="cs-title">Select Your Guardian</h1>
                <p className="cs-subtitle">Choose who watches over Gotham tonight</p>
            </div>
            {familyUnited && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none', animation: 'ee-fade-in 0.4s ease both',
                }}>
                    <div style={{ fontSize: '4rem', letterSpacing: '0.5rem', marginBottom: '20px' }}>🦇💙🔴🔴🐦</div>
                    <p style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.2rem,3vw,1.8rem)', color: '#f5c518', letterSpacing: '0.3em', textAlign: 'center' }}>
                        THE BAT-FAMILY<br />STANDS UNITED
                    </p>
                    <p style={{ color: '#555', fontFamily: 'Raleway, sans-serif', fontSize: '0.75rem', marginTop: '16px', letterSpacing: '0.2em' }}>
                        You hovered all Guardians in order. Well done, Detective.
                    </p>
                </div>
            )}

            <div className="cs-grid">

                <div className={`cs-card ${focusIndex === 0 ? 'cs-card--focused' : ''}`} id="cs-batman" onMouseEnter={() => onCardHover(0)}>
                    <div className="cs-card-frame">
                        <img src={images.absolute} alt="Batman" className="cs-card-img" />
                    </div>
                    <div className="cs-card-footer">
                        <h3 className="cs-card-name">Batman</h3>
                        <p className="cs-card-role">The Dark Knight</p>
                        <button
                            className="cs-select-btn"
                            ref={el => btnRefs.current[0] = el}
                            onClick={() => onSelect('batman')}
                            onFocus={() => setFocusIndex(0)}
                        >
                            <span>Select</span>
                        </button>
                    </div>
                </div>

                <div className={`cs-card ${focusIndex === 1 ? 'cs-card--focused' : ''}`} id="cs-nightwing" onMouseEnter={() => onCardHover(1)}>
                    <div className="cs-card-frame">
                        <img src={images.allies.nightwing} alt="Nightwing" className="cs-card-img" />
                    </div>
                    <div className="cs-card-footer">
                        <h3 className="cs-card-name">Nightwing</h3>
                        <p className="cs-card-role">Protector of Blüdhaven</p>
                        <button
                            className="cs-select-btn"
                            ref={el => btnRefs.current[1] = el}
                            onClick={() => onSelect('nightwing')}
                            onFocus={() => setFocusIndex(1)}
                        >
                            <span>Select</span>
                        </button>
                    </div>
                </div>

                <div className={`cs-card ${focusIndex === 2 ? 'cs-card--focused' : ''}`} id="cs-redhood" onMouseEnter={() => onCardHover(2)}>
                    <div className="cs-card-frame">
                        <img src={redHoodCover} alt="Red Hood" className="cs-card-img" />
                    </div>

                    <div className="cs-card-footer">
                        <h3 className="cs-card-name">Red Hood</h3>
                        <p className="cs-card-role">The Fallen Robin</p>

                        <button
                            className="cs-select-btn"
                            ref={el => btnRefs.current[2] = el}
                            onClick={() => onSelect('redhood')}
                            onFocus={() => setFocusIndex(2)}
                        >
                            <span>Select</span>
                        </button>
                    </div>
                </div>

                <div className={`cs-card ${focusIndex === 3 ? 'cs-card--focused' : ''}`} id="cs-redrobin" onMouseEnter={() => onCardHover(3)}>
                    <div className="cs-card-frame">
                        <img src="/src/assets/RedRobin/char.jpg" alt="Red Robin" className="cs-card-img cs-card-img--redrobin" />
                    </div>
                    <div className="cs-card-footer">
                        <h3 className="cs-card-name">Red Robin</h3>
                        <p className="cs-card-role">The Detective Heir</p>
                        <button
                            className="cs-select-btn"
                            ref={el => btnRefs.current[3] = el}
                            onClick={() => onSelect('redrobin')}
                            onFocus={() => setFocusIndex(3)}
                        >
                            <span>Select</span>
                        </button>
                    </div>
                </div>

                <div className={`cs-card ${focusIndex === 4 ? 'cs-card--focused' : ''}`} id="cs-damian" onMouseEnter={() => onCardHover(4)}>
                    <div className="cs-card-frame">
                        {/* Styled placeholder until DamianWayne/char.jpg is provided */}
                        <img src={damianCharImg} alt="Damian Wayne" className="cs-card-img" />
                    </div>
                    <div className="cs-card-footer">
                        <h3 className="cs-card-name">Robin</h3>
                        <p className="cs-card-role">The Son of Batman</p>
                        <button
                            className="cs-select-btn"
                            ref={el => btnRefs.current[4] = el}
                            onClick={() => onSelect('damian')}
                            onFocus={() => setFocusIndex(4)}
                        >
                            <span>Select</span>
                        </button>
                    </div>
                </div>

            </div>
            <p className="cs-instruction">
                <span>↑ ↓ ← →</span> Navigate &nbsp;&nbsp; <span>Enter</span> Select &nbsp;&nbsp; <span>Esc</span> Back
            </p>
        </div>
    );
}
