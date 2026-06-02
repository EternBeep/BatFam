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
  ██   → BATMAN  → JOKER  → GOTHAM  → ROBIN  → RIDDLER                      ██
  ██   → Konami Code: ↑↑↓↓←→←→BA                                             ██
  ██   → Click the bat logo 5×  ·  Triple-click anywhere                     ██
  ██   → Click villains in the Rogues Gallery (each has a unique secret!)     ██
  ██   → On mobile: shake, long-press, swipe right for hidden secrets!        ██
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

// ── Phone Shake Flash ──────────────────────────────────────────────────────────
function ShakeFlash({ active }) {
    if (!active) return null;
    return <div className="ee-shake-flash" />;
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

// ── Phone Ripple (tap easter egg) ─────────────────────────────────────────────
function TapRipples({ ripples }) {
    return (
        <>
            {ripples.map(r => (
                <div key={r.id} className="ee-tap-ripple" style={{ left: r.x, top: r.y }} />
            ))}
        </>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
// Main Easter Eggs Component
// ══════════════════════════════════════════════════════════════════════════════
export default function EasterEggs() {
    const [toasts, setToasts] = useState([]);
    const [batSymbols, setBatSymbols] = useState([]);
    const [tapRipples, setTapRipples] = useState([]);
    const [batarangRain, setBatarangRain] = useState(false);
    const [shakeFlash, setShakeFlash] = useState(false);
    const [jokerMode, setJokerMode] = useState(false);
    const [twoFaceMode, setTwoFaceMode] = useState(false);
    const [baneMode, setBaneMode] = useState(false);
    const [riddlerMode, setRiddlerMode] = useState(false);
    const [scarecrowMode, setScarecrowMode] = useState(false);
    const [rasMode, setRasMode] = useState(false);
    const [batSignal, setBatSignal] = useState(false);
    const [gothamSkyline, setGothamSkyline] = useState(false);
    const [konamiActive, setKonamiActive] = useState(false);

    const keyBuffer = useRef([]);
    const tripleClickRef = useRef({ count: 0, timer: null, x: 0, y: 0 });
    const logoClickRef = useRef(0);
    const logoClickTimer = useRef(null);
    const toastIdRef = useRef(0);

    // Per-villain click counters
    const villainClicks = useRef({
        joker:     { count: 0, timer: null, needed: 3 },
        twoface:   { count: 0, timer: null, needed: 2 },
        bane:      { count: 0, timer: null, needed: 3 },
        riddler:   { count: 0, timer: null, needed: 1 },
        scarecrow: { count: 0, timer: null, needed: 3 },
        ras:       { count: 0, timer: null, needed: 2 },
    });

    // Per-villain double-tap tracker (mobile)
    const villainDoubleTap = useRef({});

    const addToast = useCallback((text, type = 'default', icon = '🦇') => {
        const id = ++toastIdRef.current;
        // Keep max 3 toasts at a time
        setToasts(prev => [...prev.slice(-2), { id, text, type, icon }]);
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
            'scarecrow':() => { setScarecrowMode(true); setTimeout(() => setScarecrowMode(false), 4000); },
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
                }
            }
        };
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [addToast]);

    // ── Villain card clicks — desktop (click counting) ────────────────────────
    useEffect(() => {
        const actions = VILLAIN_ACTIONS();

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

    // ══════════════════════════════════════════════════════════════════════════
    // MOBILE / PHONE EASTER EGGS
    // ══════════════════════════════════════════════════════════════════════════

    // ── Shake detection → Batarang Rain ──────────────────────────────────────
    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        if (!isMobile) return;

        let lastShakeTime = 0;
        let lastAcc = { x: 0, y: 0, z: 0 };

        const onMotion = (e) => {
            const acc = e.accelerationIncludingGravity;
            if (!acc) return;
            const dx = Math.abs((acc.x || 0) - lastAcc.x);
            const dy = Math.abs((acc.y || 0) - lastAcc.y);
            const dz = Math.abs((acc.z || 0) - lastAcc.z);
            lastAcc = { x: acc.x || 0, y: acc.y || 0, z: acc.z || 0 };
            const total = dx + dy + dz;
            const now = Date.now();
            if (total > 30 && now - lastShakeTime > 4000) {
                lastShakeTime = now;
                setShakeFlash(true);
                setBatarangRain(true);
                addToast('Gotham trembles! Batarangs deployed.', 'bat', '🪃');
                setTimeout(() => { setBatarangRain(false); setShakeFlash(false); }, 3000);
            }
        };

        const setup = () => {
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                // iOS 13+ requires explicit permission on user gesture
                const requestOnce = async () => {
                    try {
                        const perm = await DeviceMotionEvent.requestPermission();
                        if (perm === 'granted') window.addEventListener('devicemotion', onMotion);
                    } catch { /* permission denied */ }
                    window.removeEventListener('touchstart', requestOnce);
                };
                window.addEventListener('touchstart', requestOnce, { once: true });
            } else {
                window.addEventListener('devicemotion', onMotion);
            }
        };

        setup();
        return () => window.removeEventListener('devicemotion', onMotion);
    }, [addToast]);

    // ── Long-press on hero → Bat-Signal ──────────────────────────────────────
    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        if (!isMobile) return;

        let longPressTimer = null;
        let moved = false;

        const onTouchStart = (e) => {
            const el = e.target;
            if (!el.closest('.hero')) return;
            moved = false;
            longPressTimer = setTimeout(() => {
                if (moved) return;
                setBatSignal(true);
                addToast('The signal lights Gotham\'s sky.', 'bat', '🔦');
                setTimeout(() => setBatSignal(false), 5000);
            }, 700);
        };
        const onTouchMove = () => { moved = true; clearTimeout(longPressTimer); };
        const onTouchEnd = () => clearTimeout(longPressTimer);

        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchend', onTouchEnd);
        return () => {
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [addToast]);

    // ── Swipe right fast → Gotham Skyline ────────────────────────────────────
    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        if (!isMobile) return;

        let swipeStartX = 0, swipeStartY = 0, swipeStartTime = 0;
        let lastSkylineTime = 0;

        const onTouchStart = (e) => {
            swipeStartX = e.touches[0].clientX;
            swipeStartY = e.touches[0].clientY;
            swipeStartTime = Date.now();
        };
        const onTouchEnd = (e) => {
            const dx = e.changedTouches[0].clientX - swipeStartX;
            const dy = e.changedTouches[0].clientY - swipeStartY;
            const dt = Date.now() - swipeStartTime;
            const now = Date.now();
            if (
                dx > 100 &&
                Math.abs(dy) < 60 &&
                dt < 300 &&
                now - lastSkylineTime > 6000
            ) {
                lastSkylineTime = now;
                setGothamSkyline(true);
                addToast('Gotham rises from the shadows.', 'gotham', '🌆');
                setTimeout(() => setGothamSkyline(false), 4000);
            }
        };

        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchend', onTouchEnd);
        return () => {
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [addToast]);

    // ── Double-tap villain → instant trigger (mobile) ─────────────────────────
    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        if (!isMobile) return;

        const actions = VILLAIN_ACTIONS();
        const lastTap = {};

        const onTouchEnd = (e) => {
            const el = e.target;
            for (const villain of Object.keys(villainClicks.current)) {
                if (el.closest(`[data-villain="${villain}"]`)) {
                    const now = Date.now();
                    if (lastTap[villain] && now - lastTap[villain] < 400) {
                        delete lastTap[villain];
                        actions[villain]?.();
                    } else {
                        lastTap[villain] = now;
                    }
                    break;
                }
            }
        };

        window.addEventListener('touchend', onTouchEnd);
        return () => window.removeEventListener('touchend', onTouchEnd);
    }, [VILLAIN_ACTIONS]);

    // ── Tap ripples (mobile touch feedback) ───────────────────────────────────
    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        if (!isMobile) return;

        const onTouchStart = (e) => {
            const touch = e.touches[0];
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            // Only ripple on interactive-looking areas, not scrolling
            if (!el?.closest('button, [data-villain], .rogue-card, .ally-card, .arsenal-item, nav')) return;
            const id = Date.now() + Math.random();
            setTapRipples(prev => [...prev.slice(-3), { id, x: touch.clientX - 20, y: touch.clientY - 20 }]);
            setTimeout(() => setTapRipples(prev => prev.filter(r => r.id !== id)), 700);
        };

        window.addEventListener('touchstart', onTouchStart, { passive: true });
        return () => window.removeEventListener('touchstart', onTouchStart);
    }, []);

    // ── 5-finger tap → Konami unlock (mobile cheat) ───────────────────────────
    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        if (!isMobile) return;

        const onTouchStart = (e) => {
            if (e.touches.length >= 4) {
                setKonamiActive(true);
                addToast('🎮 Secret touch code! Welcome to the Batcave.', 'konami', '🎮');
                setTimeout(() => setKonamiActive(false), 4000);
            }
        };

        window.addEventListener('touchstart', onTouchStart, { passive: true });
        return () => window.removeEventListener('touchstart', onTouchStart);
    }, [addToast]);

    return (
        <>
            <Toast messages={toasts} onRemove={removeToast} />
            <BatSymbols symbols={batSymbols} />
            <TapRipples ripples={tapRipples} />
            <ShakeFlash active={shakeFlash} />
            <BatarangRain active={batarangRain} />
            <JokerMode active={jokerMode} />
            <TwoFaceMode active={twoFaceMode} />
            <BaneMode active={baneMode} />
            <RiddlerMode active={riddlerMode} />
            <ScarecrowMode active={scarecrowMode} />
            <RasMode active={rasMode} />
            <BatSignal active={batSignal} />
            <GothamSkyline active={gothamSkyline} />
            <KonamiOverlay active={konamiActive} />
        </>
    );
}
