import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/easter-eggs.css';

// ── Console Art ────────────────────────────────────────────────────────────────
function printConsoleArt() {
    const batman = `
%c
  ██████████████████████████████████████████████████████████████████████████████
  ██                                                                          ██
  ██          ██████         ██       ██    ██  ██████ ██  ██                ██
  ██          ██   ██       ████     ████  ████  ██    ████  ██              ██
  ██          ██████       ██  ██   ██  ████  ██  ████  ██  ████             ██
  ██          ██   ██     ████████  ██  ████  ██  ██    ██  ████             ██
  ██          ██████     ██      ██ ██   ██   ██ ██████ ██  ████             ██
  ██                                                                          ██
  ██   %c  I   A M   T H E   N I G H T  %c                                       ██
  ██                                                                          ██
  ██   %c You found the Bat-Computer terminal. Type one of these in the page:   ██
  ██   → BATMAN  → JOKER  → ALFRED  → GOTHAM  → ROBIN  → RIDDLER             ██
  ██   → Konami Code: ↑↑↓↓←→←→BA                                             ██
  ██   → Click the bat logo 5×  ·  Triple-click anywhere  ·  Idle 35s        ██
  ██   → Click villains in the Rogues Gallery (each has a unique secret!)     ██
  ██   → There are %c 20+ %c easter eggs hidden across Gotham. Find them all.    ██
  ██                                                                          ██
  ██████████████████████████████████████████████████████████████████████████████
`;
    console.log(
        batman,
        'background:#0a0a0f;color:#f5c518;font-family:monospace;font-size:10px;line-height:1.2;',
        'background:#f5c518;color:#0a0a0f;font-weight:bold;padding:2px 8px;',
        'background:#0a0a0f;color:#f5c518;font-family:monospace;font-size:10px;',
        'background:#0a0a0f;color:#888;font-family:monospace;font-size:10px;',
        'background:#0a0a0f;color:#f5c518;font-weight:bold;font-size:12px;',
        'background:#0a0a0f;color:#888;font-family:monospace;font-size:10px;',
    );
}

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ messages, onRemove }) {
    return (
        <div className="ee-toast-container">
            {messages.map(msg => (
                <div key={msg.id} className={`ee-toast ee-toast--${msg.type || 'default'}`}>
                    <span className="ee-toast-icon">{msg.icon || '🦇'}</span>
                    <span className="ee-toast-text">{msg.text}</span>
                    <button className="ee-toast-close" onClick={() => onRemove(msg.id)}>×</button>
                </div>
            ))}
        </div>
    );
}

// ── Bat Symbol click burst ─────────────────────────────────────────────────────
function BatSymbols({ symbols }) {
    return (
        <>
            {symbols.map(s => (
                <div key={s.id} className="ee-bat-symbol" style={{ left: s.x, top: s.y }}>🦇</div>
            ))}
        </>
    );
}

// ── Batarang Rain ──────────────────────────────────────────────────────────────
function BatarangRain({ active }) {
    if (!active) return null;
    return (
        <div className="ee-batarang-rain">
            {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="ee-batarang-item" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    animationDuration: `${1.2 + Math.random() * 1.2}s`,
                    fontSize: `${14 + Math.random() * 18}px`,
                }}>🪃</div>
            ))}
        </div>
    );
}

// ── JOKER — HA HA HA ──────────────────────────────────────────────────────────
function JokerMode({ active }) {
    if (!active) return null;
    return (
        <div className="ee-joker-overlay">
            <div className="ee-joker-ha">
                {['HA','HA','HA','HA','HA','HA','HA','HA','HA'].map((ha, i) => (
                    <span key={i} className="ee-joker-word" style={{ animationDelay: `${i * 0.12}s` }}>{ha}</span>
                ))}
            </div>
            <div className="ee-joker-face">🃏</div>
            <p className="ee-joker-quote">"Why so serious?"</p>
        </div>
    );
}

// ── TWO-FACE — Coin flip, split screen ────────────────────────────────────────
function TwoFaceMode({ active }) {
    if (!active) return null;
    return (
        <div className="ee-twoface-overlay">
            <div className="ee-twoface-left">
                <p className="ee-twoface-side-label">HARVEY DENT</p>
                <p className="ee-twoface-sub">Gotham's White Knight</p>
            </div>
            <div className="ee-twoface-divider">
                <div className="ee-twoface-coin">
                    <div className="ee-twoface-coin-inner">
                        <div className="ee-twoface-coin-front">H</div>
                        <div className="ee-twoface-coin-back">T</div>
                    </div>
                </div>
                <p className="ee-twoface-fate">"The world is cruel.<br />Let fate decide."</p>
            </div>
            <div className="ee-twoface-right">
                <p className="ee-twoface-side-label">TWO-FACE</p>
                <p className="ee-twoface-sub">Gotham's Fallen D.A.</p>
            </div>
        </div>
    );
}

// ── BANE — Screen crack + shake ───────────────────────────────────────────────
function BaneMode({ active }) {
    if (!active) return null;
    return (
        <div className="ee-bane-overlay">
            <div className="ee-bane-crack">
                <svg viewBox="0 0 400 300" className="ee-bane-crack-svg" preserveAspectRatio="none">
                    <path d="M200 0 L180 80 L220 100 L170 180 L210 200 L160 300" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" />
                    <path d="M200 0 L230 70 L190 110 L240 190 L200 220 L250 300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                    <path d="M0 150 L80 140 L120 160 L200 150 L270 145 L400 155" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
                </svg>
            </div>
            <div className="ee-bane-center">
                <p className="ee-bane-title">KNIGHTFALL</p>
                <p className="ee-bane-quote">"I will break you, Batman."</p>
                <p className="ee-bane-sub">— Bane, 1993</p>
            </div>
        </div>
    );
}

// ── RIDDLER — Question marks rain + riddle ────────────────────────────────────
function RiddlerMode({ active }) {
    if (!active) return null;
    const riddles = [
        { q: 'I have cities, but no houses live there.\nMountains, but no trees grow there.\nWater, but no fish swim there.\nWhat am I?', a: 'A Map of Gotham' },
        { q: 'The more you take, the more you leave behind.\nWhat am I?', a: 'Footsteps — in Crime Alley' },
        { q: 'I speak without a mouth and hear without ears.\nI have no body, but I come alive with wind.\nWhat am I?', a: 'An Echo — in the Batcave' },
    ];
    const riddle = riddles[Math.floor(Math.random() * riddles.length)];
    return (
        <div className="ee-riddler-overlay">
            {Array.from({ length: 30 }).map((_, i) => (
                <span key={i} className="ee-riddler-q" style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    fontSize: `${20 + Math.random() * 60}px`,
                    animationDelay: `${Math.random() * 1}s`,
                    opacity: 0.2 + Math.random() * 0.7,
                }}>?</span>
            ))}
            <p className="ee-riddler-riddle">
                "{riddle.q}"
                <span className="ee-riddler-answer">— {riddle.a}</span>
            </p>
        </div>
    );
}

// ── SCARECROW — Fear Toxin blur + horror text ─────────────────────────────────
function ScarecrowMode({ active }) {
    if (!active) return null;
    const fears = ['DARKNESS', 'FAILURE', 'DEATH', 'LOSS', 'FEAR ITSELF'];
    return (
        <div className="ee-scarecrow-overlay">
            <div className="ee-scarecrow-blur-bg"></div>
            {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="ee-scarecrow-word" style={{
                    left: `${Math.random() * 90}%`,
                    top: `${Math.random() * 90}%`,
                    fontSize: `${16 + Math.random() * 40}px`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    opacity: 0.1 + Math.random() * 0.4,
                }}>
                    {fears[Math.floor(Math.random() * fears.length)]}
                </span>
            ))}
            <div className="ee-scarecrow-center">
                <p className="ee-scarecrow-face">💀</p>
                <p className="ee-scarecrow-title">FEAR TOXIN DETECTED</p>
                <p className="ee-scarecrow-quote">"What are you afraid of, Batman?"<br /><span>— Dr. Jonathan Crane</span></p>
            </div>
        </div>
    );
}

// ── RA'S AL GHUL — Lazarus Pit green glow ─────────────────────────────────────
function RasMode({ active }) {
    if (!active) return null;
    return (
        <div className="ee-ras-overlay">
            <div className="ee-ras-pit">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="ee-ras-bubble" style={{
                        left: `${10 + Math.random() * 80}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${1.5 + Math.random() * 2}s`,
                        width: `${6 + Math.random() * 20}px`,
                        height: `${6 + Math.random() * 20}px`,
                    }} />
                ))}
            </div>
            <div className="ee-ras-center">
                <p className="ee-ras-icon">🗡️</p>
                <p className="ee-ras-title">THE DEMON'S HEAD</p>
                <p className="ee-ras-quote">
                    "Centuries do not weaken me, Detective.<br />
                    The Lazarus Pit has seen to that."
                </p>
                <p className="ee-ras-name">— Ra's al Ghul · The League of Shadows</p>
            </div>
        </div>
    );
}

// ── Bat Signal ────────────────────────────────────────────────────────────────
function BatSignal({ active }) {
    if (!active) return null;
    return (
        <div className="ee-bat-signal-overlay">
            <div className="ee-bat-signal-beam"></div>
            <div className="ee-bat-signal-circle">
                <svg viewBox="0 0 100 100" className="ee-bat-signal-svg">
                    <ellipse cx="50" cy="60" rx="35" ry="22" fill="#0a0a0f" />
                    <path d="M50 20 C30 20 15 40 20 55 C25 70 75 70 80 55 C85 40 70 20 50 20 Z" fill="#0a0a0f" />
                    <path d="M50 20 L35 38 L50 32 L65 38 Z" fill="#0a0a0f" />
                </svg>
            </div>
            <p className="ee-bat-signal-text">I AM THE NIGHT</p>
        </div>
    );
}

// ── Alfred Modal ──────────────────────────────────────────────────────────────
function AlfredModal({ active, onClose }) {
    const messages = [
        "Yes, Master Bruce. Your tea is ready in the study.",
        "Shall I prepare the Batmobile, sir?",
        "I've taken the liberty of pressing your cape.",
        "Master Bruce, perhaps a night off wouldn't go amiss?",
        "Your father would be proud, sir.",
        "The Batcave is fully operational, sir. As always.",
        "I noticed you've been staring at the Rogues Gallery for some time, sir.",
    ];
    const [msg] = useState(() => messages[Math.floor(Math.random() * messages.length)]);
    if (!active) return null;
    return (
        <div className="ee-alfred-overlay" onClick={onClose}>
            <div className="ee-alfred-modal" onClick={e => e.stopPropagation()}>
                <div className="ee-alfred-avatar">🎩</div>
                <p className="ee-alfred-name">Alfred Pennyworth</p>
                <p className="ee-alfred-message">"{msg}"</p>
                <button className="ee-alfred-close" onClick={onClose}>Dismiss, Alfred</button>
            </div>
        </div>
    );
}

// ── Gotham Skyline ────────────────────────────────────────────────────────────
function GothamSkyline({ active }) {
    if (!active) return null;
    return (
        <div className="ee-gotham-skyline">
            <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="ee-skyline-svg">
                <rect x="0" y="200" width="1200" height="100" fill="#0a0a0f" />
                {[
                    [50,80,120],[100,60,140],[140,100,100],[200,40,160],[245,70,130],
                    [280,30,170],[350,80,120],[405,50,150],[445,20,180],[495,60,140],
                    [540,90,110],[605,40,160],[645,70,130],[700,30,170],[745,50,150],
                    [780,80,120],[850,60,140],[900,20,180],[945,50,150],[1005,70,130],
                    [1045,40,160],[1100,80,120],[1145,50,150],
                ].map(([x, w, h], i) => (
                    <rect key={i} x={x} y={200 - h} width={w} height={h} fill="#111" stroke="#222" strokeWidth="0.5" />
                ))}
                <text x="600" y="170" textAnchor="middle" fill="#f5c518" fontSize="22" fontFamily="Cinzel,serif" letterSpacing="8">
                    GOTHAM CITY
                </text>
            </svg>
        </div>
    );
}

// ── Konami Overlay ────────────────────────────────────────────────────────────
function KonamiOverlay({ active }) {
    if (!active) return null;
    return (
        <div className="ee-konami-overlay">
            <div className="ee-konami-flash"></div>
            <div className="ee-konami-center">
                <svg viewBox="0 0 200 120" className="ee-konami-bat">
                    <ellipse cx="100" cy="75" rx="55" ry="32" fill="#f5c518" />
                    <path d="M100 30 C70 30 45 55 52 72 C60 90 140 90 148 72 C155 55 130 30 100 30 Z" fill="#f5c518" />
                    <path d="M100 30 L80 50 L100 44 L120 50 Z" fill="#f5c518" />
                </svg>
                <p className="ee-konami-text">CHEAT CODE ACTIVATED</p>
                <p className="ee-konami-sub">Welcome to the Batcave, Detective</p>
            </div>
        </div>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// Main Easter Eggs Component
// ══════════════════════════════════════════════════════════════════════════════
export default function EasterEggs() {
    const [toasts, setToasts] = useState([]);
    const [batSymbols, setBatSymbols] = useState([]);
    const [batarangRain, setBatarangRain] = useState(false);
    const [jokerMode, setJokerMode] = useState(false);
    const [twoFaceMode, setTwoFaceMode] = useState(false);
    const [baneMode, setBaneMode] = useState(false);
    const [riddlerMode, setRiddlerMode] = useState(false);
    const [scarecrowMode, setScarecrowMode] = useState(false);
    const [rasMode, setRasMode] = useState(false);
    const [batSignal, setBatSignal] = useState(false);
    const [alfredVisible, setAlfredVisible] = useState(false);
    const [gothamSkyline, setGothamSkyline] = useState(false);
    const [konamiActive, setKonamiActive] = useState(false);

    const keyBuffer = useRef([]);
    const tripleClickRef = useRef({ count: 0, timer: null, x: 0, y: 0 });
    const idleTimer = useRef(null);
    const logoClickRef = useRef(0);
    const logoClickTimer = useRef(null);
    const toastIdRef = useRef(0);
    const activeEffects = useRef(new Set());

    // Per-villain click counters: { count, timer }
    const villainClicks = useRef({
        joker:     { count: 0, timer: null, needed: 3 },
        twoface:   { count: 0, timer: null, needed: 2 },
        bane:      { count: 0, timer: null, needed: 3 },
        riddler:   { count: 0, timer: null, needed: 1 },
        scarecrow: { count: 0, timer: null, needed: 3 },
        ras:       { count: 0, timer: null, needed: 2 },
    });

    const addToast = useCallback((text, type = 'default', icon = '🦇') => {
        const id = ++toastIdRef.current;
        setToasts(prev => [...prev.slice(-4), { id, text, type, icon }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // ── Villain activators ────────────────────────────────────────────────────
    const VILLAIN_ACTIONS = useCallback(() => ({
        joker: () => {
            setJokerMode(true);
            addToast('"Why so serious, Batman?" — The Joker', 'joker', '🃏');
            setTimeout(() => setJokerMode(false), 3500);
        },
        twoface: () => {
            setTwoFaceMode(true);
            addToast('The coin has been flipped. Fate decides your destiny.', 'villain', '🪙');
            setTimeout(() => setTwoFaceMode(false), 4000);
        },
        bane: () => {
            setBaneMode(true);
            addToast('"I will break you, Batman." — Bane, Knightfall 1993', 'villain', '💪');
            setTimeout(() => setBaneMode(false), 3500);
        },
        riddler: () => {
            setRiddlerMode(true);
            addToast('Riddle me this, riddle me that... can you solve it?', 'riddler', '❓');
            setTimeout(() => setRiddlerMode(false), 4500);
        },
        scarecrow: () => {
            setScarecrowMode(true);
            addToast('Fear toxin detected. What are you most afraid of?', 'villain', '💀');
            setTimeout(() => setScarecrowMode(false), 4000);
        },
        ras: () => {
            setRasMode(true);
            addToast('The League of Shadows stirs. Ra\'s al Ghul rises.', 'villain', '🗡️');
            setTimeout(() => setRasMode(false), 4000);
        },
    }), [addToast]);

    // ── Console art ───────────────────────────────────────────────────────────
    useEffect(() => { printConsoleArt(); }, []);

    // ── Idle → Alfred ─────────────────────────────────────────────────────────
    const resetIdleTimer = useCallback(() => {
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
            if (!activeEffects.current.has('alfred')) {
                setAlfredVisible(true);
                activeEffects.current.add('alfred');
            }
        }, 35000);
    }, []);

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach(e => window.addEventListener(e, resetIdleTimer, { passive: true }));
        resetIdleTimer();
        return () => {
            events.forEach(e => window.removeEventListener(e, resetIdleTimer));
            clearTimeout(idleTimer.current);
        };
    }, [resetIdleTimer]);

    // ── Keyboard word/konami detection ────────────────────────────────────────
    useEffect(() => {
        const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

        const WORDS = {
            'batman': () => {
                setBatarangRain(true);
                addToast('🦇 The Dark Knight rises!', 'bat', '🦇');
                setTimeout(() => setBatarangRain(false), 3000);
            },
            'joker':    () => { setJokerMode(true); setTimeout(() => setJokerMode(false), 3500); },
            'twoface':  () => { setTwoFaceMode(true); setTimeout(() => setTwoFaceMode(false), 4000); },
            'bane':     () => { setBaneMode(true); addToast('"Gotham, take control of your city." — Bane', 'villain', '💪'); setTimeout(() => setBaneMode(false), 3500); },
            'riddler':  () => { setRiddlerMode(true); setTimeout(() => setRiddlerMode(false), 4500); },
            'scarecrow':() => { setScarecrowMode(true); addToast('Fear toxin detected in the console!', 'villain', '💀'); setTimeout(() => setScarecrowMode(false), 4000); },
            'alfred':   () => { setAlfredVisible(true); activeEffects.current.add('alfred'); },
            'gotham':   () => {
                setGothamSkyline(true);
                addToast('Gotham City — the city that never sleeps in fear', 'gotham', '🌆');
                setTimeout(() => setGothamSkyline(false), 4000);
            },
            'robin': () => {
                addToast('"Robin? I work alone." — Batman, probably', 'robin', '🐦');
                setTimeout(() => addToast('(He definitely does not work alone)', 'default', '😅'), 1500);
            },
            'nightwing': () => { addToast('Dick Grayson says hi. He\'s cooler than Batman and he knows it.', 'nightwing', '💙'); },
            'oracle':    () => { addToast('ORACLE ONLINE — All Gotham surveillance feeds active.', 'bat', '💻'); },
            'dccomics':  () => { addToast('DC Comics — 85+ years of Gotham\'s finest stories.', 'default', '📚'); },
            'ras':       () => { setRasMode(true); addToast('The League of Shadows watches you. Always.', 'villain', '🗡️'); setTimeout(() => setRasMode(false), 4000); },
        };

        const onKey = (e) => {
            if (['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
            keyBuffer.current.push(e.key);
            if (keyBuffer.current.length > 20) keyBuffer.current.shift();

            const buf = keyBuffer.current;

            // Konami
            if (buf.length >= KONAMI.length) {
                const tail = buf.slice(-KONAMI.length);
                if (tail.every((k, i) => k === KONAMI[i])) {
                    keyBuffer.current = [];
                    setKonamiActive(true);
                    addToast('🎮 KONAMI CODE! Welcome to the Batcave, Detective.', 'konami', '🎮');
                    setTimeout(() => setKonamiActive(false), 4000);
                    return;
                }
            }

            // Words
            const typed = buf.filter(k => k.length === 1).join('').toLowerCase();
            for (const [word, action] of Object.entries(WORDS)) {
                if (typed.endsWith(word)) {
                    keyBuffer.current = [];
                    action();
                    break;
                }
            }
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [addToast]);

    // ── Triple-click → bat symbol ─────────────────────────────────────────────
    useEffect(() => {
        const onClick = (e) => {
            const ref = tripleClickRef.current;
            ref.count++;
            ref.x = e.clientX;
            ref.y = e.clientY;
            clearTimeout(ref.timer);
            ref.timer = setTimeout(() => { ref.count = 0; }, 500);
            if (ref.count >= 3) {
                ref.count = 0;
                const id = Date.now();
                setBatSymbols(prev => [...prev, { id, x: ref.x - 12, y: ref.y - 12 }]);
                setTimeout(() => setBatSymbols(prev => prev.filter(s => s.id !== id)), 1500);
            }
        };
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, []);

    // ── Logo click 5× → Bat-Signal ───────────────────────────────────────────
    useEffect(() => {
        const onClick = (e) => {
            const el = e.target;
            if (
                el.classList.contains('bat-nav-logo') || el.closest('.bat-nav-logo') ||
                el.classList.contains('loader-wordmark') ||
                el.classList.contains('batarang-svg') || el.closest('.batarang-wrap')
            ) {
                logoClickRef.current++;
                clearTimeout(logoClickTimer.current);
                logoClickTimer.current = setTimeout(() => { logoClickRef.current = 0; }, 2000);
                if (logoClickRef.current >= 5) {
                    logoClickRef.current = 0;
                    setBatSignal(true);
                    addToast('🔦 BAT-SIGNAL ACTIVATED!', 'bat', '🔦');
                    setTimeout(() => setBatSignal(false), 5000);
                } else if (logoClickRef.current === 1) {
                    addToast(`Click ${5 - logoClickRef.current} more times...`, 'hint', '🦇');
                }
            }
        };
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [addToast]);

    // ── Villain card clicks — each villain has unique action + click count ────
    useEffect(() => {
        const actions = VILLAIN_ACTIONS();

        // Hint messages shown on first click before threshold
        const hints = {
            joker:     (n, needed) => `🃏 ${needed - n} more clicks to unleash the Joker...`,
            twoface:   (n, needed) => `🪙 ${needed - n} more — the coin is spinning...`,
            bane:      (n, needed) => `💪 ${needed - n} more — Bane is gathering strength...`,
            riddler:   () => null,
            scarecrow: (n, needed) => `💀 ${needed - n} more — fear toxin building...`,
            ras:       (n, needed) => `🗡️ ${needed - n} more — the Pit grows restless...`,
        };

        const onClick = (e) => {
            const el = e.target;
            for (const [villain, state] of Object.entries(villainClicks.current)) {
                if (el.closest(`[data-villain="${villain}"]`)) {
                    state.count++;
                    clearTimeout(state.timer);
                    state.timer = setTimeout(() => { state.count = 0; }, 2000);

                    if (state.count >= state.needed) {
                        state.count = 0;
                        actions[villain]?.();
                    } else {
                        const hint = hints[villain]?.(state.count, state.needed);
                        if (hint) addToast(hint, 'hint', '');
                    }
                    break;
                }
            }
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [addToast, VILLAIN_ACTIONS]);

    // ── Copy → secret message ─────────────────────────────────────────────────
    useEffect(() => {
        const onCopy = () => addToast('"I am the night. And I am watching." — Batman', 'bat', '🌑');
        document.addEventListener('copy', onCopy);
        return () => document.removeEventListener('copy', onCopy);
    }, [addToast]);

    // ── Right-click → Batman quote ────────────────────────────────────────────
    useEffect(() => {
        const msgs = [
            'The shadows hide many secrets, Detective.',
            'You are being watched.',
            'Gotham never sleeps. Neither do I.',
            'Find all the easter eggs. I dare you.',
        ];
        let idx = 0;
        const onContext = (e) => {
            e.preventDefault();
            addToast(msgs[idx++ % msgs.length], 'default', '🌑');
        };
        window.addEventListener('contextmenu', onContext);
        return () => window.removeEventListener('contextmenu', onContext);
    }, [addToast]);

    // ── Scroll to bottom ──────────────────────────────────────────────────────
    useEffect(() => {
        let triggered = false;
        const onScroll = () => {
            if (triggered) return;
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80) {
                triggered = true;
                addToast('You reached the end of Gotham. Thank you for watching over this city.', 'bat', '🦇');
                setTimeout(() => { triggered = false; }, 30000);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [addToast]);

    // ── Hint toast after 8s ───────────────────────────────────────────────────
    useEffect(() => {
        const t = setTimeout(() => {
            addToast('💡 20+ easter eggs hidden in Gotham — try clicking the Rogues Gallery!', 'hint', '💡');
        }, 8000);
        return () => clearTimeout(t);
    }, [addToast]);

    return (
        <>
            <Toast messages={toasts} onRemove={removeToast} />
            <BatSymbols symbols={batSymbols} />
            <BatarangRain active={batarangRain} />
            <JokerMode active={jokerMode} />
            <TwoFaceMode active={twoFaceMode} />
            <BaneMode active={baneMode} />
            <RiddlerMode active={riddlerMode} />
            <ScarecrowMode active={scarecrowMode} />
            <RasMode active={rasMode} />
            <BatSignal active={batSignal} />
            <AlfredModal active={alfredVisible} onClose={() => { setAlfredVisible(false); activeEffects.current.delete('alfred'); }} />
            <GothamSkyline active={gothamSkyline} />
            <KonamiOverlay active={konamiActive} />
        </>
    );
}
