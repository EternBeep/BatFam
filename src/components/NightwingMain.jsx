import { useState, useEffect, useRef } from 'react';
import '../styles/nightwing-main.css';
import ReviewSection from './ReviewSection';

// ── Image imports — update these paths to match your assets folder ──
import nightwingImg from '../assets/NightWing/nightwing.png';
import firstCoverImg from '../assets/NightWing/first cover.jpg';
import blockbusterImg from '../assets/NightWing/Villains/blockbuster.jpg';
import deathstrokeImg from '../assets/NightWing/Villains/deathstroke.jpg';
import talonImg from '../assets/NightWing/Villains/talon.jpg';
import tonyZuccoImg from '../assets/NightWing/Villains/tony zucco.jpg';

const STATS = [
    { label: 'Acrobatic Rating', value: 99, suffix: '%' },
    { label: 'Combat IQ', value: 97, suffix: '%' },
    { label: 'Escrima Proficiency', value: 100, suffix: '%' },
    { label: 'Leadership Score', value: 94, suffix: '%' },
];

const MISSIONS = [
    { id: '001', status: 'COMPLETE', city: 'BLÜDHAVEN', title: 'Port Authority Takedown', threat: 'HIGH', year: '2019' },
    { id: '002', status: 'COMPLETE', city: 'GOTHAM', title: 'Joker Containment Assist', threat: 'CRITICAL', year: '2020' },
    { id: '003', status: 'ACTIVE', city: 'BLÜDHAVEN', title: 'Blockbuster Investigation', threat: 'EXTREME', year: '2024' },
    { id: '004', status: 'PENDING', city: 'CLASSIFIED', title: 'Titans Coordination', threat: 'MEDIUM', year: '2025' },
];

const GEAR = [
    { name: 'Escrima Sticks', desc: 'Electrified polymer batons charged to 100kV. Primary close-combat weapon', icon: '⚡' },
    { name: 'Wing Ding', desc: 'Wing-shaped shuriken reinforced with titanium alloy. Aerodynamically optimized', icon: '🪃' },
    { name: 'Grappling Hook', desc: 'Multi-directional grapple launcher. 80m cable, silent deployment', icon: '🎯' },
    { name: 'Suit', desc: 'Custom aramid-spandex blend. Full-body motion capture sensors, armored plates', icon: '🔷' },
];

const VILLAINS = [
    {
        img: blockbusterImg,
        name: 'BLOCKBUSTER',
        alias: 'Roland Desmond',
        role: 'Crime Lord of Blüdhaven',
        threat: 'EXTREME',
        desc: 'The iron fist behind Blüdhaven\'s criminal empire. Blockbuster controls the entire city\'s underworld from the shadows — a genius intellect trapped inside a monster\'s body. His obsession with destroying Nightwing has consumed him.',
        tag: 'NEMESIS',
    },
    {
        img: deathstrokeImg,
        name: 'DEATHSTROKE',
        alias: 'Slade Wilson',
        role: 'The World\'s Greatest Assassin',
        threat: 'CRITICAL',
        desc: 'Enhanced by an experimental super-soldier serum, Slade Wilson is a tactical and physical machine. He has made it his personal mission to dismantle everything Dick Grayson protects — starting with Blüdhaven.',
        tag: 'ASSASSIN',
    },
    {
        img: talonImg,
        name: 'TALON',
        alias: 'Court of Owls Agent',
        role: 'Undying Enforcer',
        threat: 'HIGH',
        desc: 'A resurrected Court of Owls assassin infused with electrum, making him near-impossible to kill. Talon was sent specifically to eliminate Nightwing — a target the Court has marked since Dick Grayson\'s circus days.',
        tag: 'UNDYING',
    },
    {
        img: tonyZuccoImg,
        name: 'TONY ZUCCO',
        alias: 'Anthony Zucco',
        role: 'The Man Who Started It All',
        threat: 'HIGH',
        desc: 'The Gotham mobster who cut the trapeze wire at Haley\'s Circus, killing John and Mary Grayson. Zucco\'s act of murder created Nightwing. He is the reason Dick Grayson became a vigilante — the sin that cannot be forgiven.',
        tag: 'ORIGIN',
    },
];

const SKILLS = [
    { label: 'Hand-to-Hand Combat', value: 98, color: 'blue' },
    { label: 'Acrobatics & Parkour', value: 100, color: 'cyan' },
    { label: 'Tactical Intelligence', value: 95, color: 'green' },
    { label: 'Weapons Mastery', value: 92, color: 'blue' },
    { label: 'Stealth & Infiltration', value: 88, color: 'gold' },
    { label: 'Leadership', value: 94, color: 'green' },
    { label: 'Detective Work', value: 89, color: 'gold' },
];

const SUITS = [
    {
        year: '1984',
        name: 'ROBIN SUIT',
        tag: 'PRE-NIGHTWING',
        specs: ['Red-green tights', 'Cape & pixie boots', 'No armour plating', 'Utility belt v1'],
    },
    {
        year: '1984',
        name: 'NIGHTWING V1',
        tag: 'CLASSIC',
        specs: ['Blue disco collar', 'Full-body black suit', 'Escrima loops', 'Kryptonian-inspired'],
    },
    {
        year: '1995',
        name: 'NIGHTWING V2',
        tag: 'SOLO ERA',
        specs: ['Blue chest chevron', 'Reinforced torso', 'Integrated escrima holsters', 'Blüdhaven-spec build'],
    },
    {
        year: '2000',
        name: 'NIGHTWING V3',
        tag: 'ARMOURED',
        specs: ['Kevlar weave full body', 'Extended wing glyph', 'Impact-resistant plating', 'EMP hardened'],
    },
    {
        year: '2011',
        name: 'NEW 52 SUIT',
        tag: 'REBRAND',
        specs: ['Red chest chevron', 'Streamlined profile', 'Shock-absorbing panels', 'Integrated comm array'],
    },
    {
        year: '2016',
        name: 'REBIRTH SUIT',
        tag: 'CURRENT',
        specs: ['Blue wing glyph return', 'Nano-fibre weave', 'Escrima charge ports', 'Batman-tech assisted'],
        active: true,
    },
];

const COMIC_RUNS = [
    {
        title: 'A KNIGHT IN BLÜDHAVEN',
        arc: 'NIGHTWING VOL.2 #1–8',
        issues: '#1–8 · 1996',
        rating: '★★★★★',
        desc: 'The definitive origin of Nightwing\'s Blüdhaven era. Dick Grayson arrives in a city more corrupt than Gotham — and makes it his own. Chuck Dixon and Scott McDaniel set the template for everything that followed.',
        tags: ['CHUCK DIXON', 'SCOTT MCDANIEL', 'SOLO DEBUT', 'ESSENTIAL'],
        delay: '0s',
    },
    {
        title: 'HUNT FOR ORACLE',
        arc: 'NIGHTWING VOL.2 #41–46',
        issues: '#41–46 · 2000',
        rating: '★★★★☆',
        desc: 'Blockbuster tightens his grip on Blüdhaven while Nightwing races to protect Oracle. A masterclass in tension between personal loyalty and city-wide duty — the arc that proved Dick Grayson fights smarter, not harder.',
        tags: ['BLOCKBUSTER', 'ORACLE', 'CONSPIRACY', 'BLÜDHAVEN'],
        delay: '0.1s',
    },
    {
        title: 'PRODIGAL',
        arc: 'BATMAN #512–514 · DETECTIVE #679',
        issues: 'CROSSOVER · 1994',
        rating: '★★★★★',
        desc: 'Following Knightfall, Dick Grayson briefly takes up the Batman cowl to protect Gotham. The arc forced him to confront everything he\'d spent years moving away from — and proved he was never just Robin.',
        tags: ['BATMAN MANTLE', 'CROSSOVER', 'LEGACY', 'KNIGHTFALL TIE-IN'],
        delay: '0.2s',
    },
    {
        title: 'THE TERRIBLE COST',
        arc: 'NIGHTWING VOL.2 #93–101',
        issues: '#93–101 · 2004',
        rating: '★★★★★',
        desc: 'The darkest chapter. Blockbuster\'s death. Catalysts\' manipulation. Dick Grayson at his absolute lowest — grappling with guilt, identity and whether the city he loves can be saved. A gut-punch of a run.',
        tags: ['BLOCKBUSTER DEATH', 'CATALYST', 'DARKEST ARC', 'TURNING POINT'],
        delay: '0.3s',
    },
    {
        title: 'NIGHTWING: YEAR ONE',
        arc: 'NIGHTWING VOL.2 #101–106',
        issues: '#101–106 · 2005',
        rating: '★★★★★',
        desc: 'A definitive retelling of Dick Grayson\'s transition from Robin to Nightwing. Explores his fallout with Batman, his time with the Titans, and the moment he chose to become something entirely his own.',
        tags: ['ORIGIN RETOLD', 'CHUCK DIXON', 'MUST READ', 'DEFINITIVE'],
        delay: '0.4s',
    },
    {
        title: 'BETTER THAN BATMAN',
        arc: 'NIGHTWING REBIRTH VOL.1',
        issues: '#1–8 · 2016',
        rating: '★★★★☆',
        desc: 'The Rebirth era kicks off with Nightwing hunting the Parliament of Owls alongside Raptor — a mission that forces Dick to question Batman\'s methods and define his own moral code once and for all.',
        tags: ['REBIRTH', 'PARLIAMENT OF OWLS', 'TIM SEELEY', 'MODERN ERA'],
        delay: '0.5s',
    },
];

// ── Custom Escrima Cursor ─────────────────────────────
function EscrimaCursor() {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const trail = useRef({ x: 0, y: 0 });
    const angle = useRef(45);
    const prevPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        const onMove = (e) => {
            const dx = e.clientX - prevPos.current.x;
            const dy = e.clientY - prevPos.current.y;
            if (Math.sqrt(dx * dx + dy * dy) > 1) {
                angle.current = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
            }
            prevPos.current = { x: e.clientX, y: e.clientY };
            pos.current = { x: e.clientX, y: e.clientY };
        };
        const animate = () => {
            trail.current.x += (pos.current.x - trail.current.x) * 0.12;
            trail.current.y += (pos.current.y - trail.current.y) * 0.12;
            if (cursorRef.current)
                cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${angle.current}deg)`;
            if (trailRef.current)
                trailRef.current.style.transform = `translate(${trail.current.x}px, ${trail.current.y}px) rotate(${angle.current}deg)`;
            rafRef.current = requestAnimationFrame(animate);
        };
        window.addEventListener('mousemove', onMove);
        rafRef.current = requestAnimationFrame(animate);
        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current); };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="nw-cursor">
                <svg width="40" height="8" viewBox="0 0 40 8">
                    <defs>
                        <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0a1628" />
                            <stop offset="30%" stopColor="#1e90ff" />
                            <stop offset="70%" stopColor="#00d4ff" />
                            <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                    </defs>
                    <rect x="2" y="3" width="36" height="2.5" rx="1.25" fill="url(#sg)" />
                    <rect x="6" y="2.5" width="2" height="3" rx="0.5" fill="#1e90ff" opacity="0.6" />
                    <rect x="10" y="2.5" width="2" height="3" rx="0.5" fill="#1e90ff" opacity="0.6" />
                    <rect x="14" y="2.5" width="2" height="3" rx="0.5" fill="#1e90ff" opacity="0.6" />
                    <circle cx="38" cy="4" r="3" fill="#00d4ff" opacity="0.9" />
                    <circle cx="38" cy="4" r="1.5" fill="#ffffff" />
                    <circle cx="2" cy="4" r="2" fill="#0a4080" />
                </svg>
            </div>
            <div ref={trailRef} className="nw-cursor nw-cursor--trail">
                <svg width="40" height="8" viewBox="0 0 40 8">
                    <defs>
                        <linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#1e90ff" />
                            <stop offset="100%" stopColor="#00d4ff" />
                        </linearGradient>
                    </defs>
                    <rect x="2" y="3" width="36" height="2.5" rx="1.25" fill="url(#sg2)" opacity="0.3" />
                    <circle cx="38" cy="4" r="2" fill="#00d4ff" opacity="0.3" />
                </svg>
            </div>
        </>
    );
}

function StatBar({ label, value, suffix, delay }) {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setTimeout(() => setWidth(value), delay);
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div className="nw-stat" ref={ref}>
            <div className="nw-stat__header">
                <span className="nw-stat__label">{label}</span>
                <span className="nw-stat__value">{width}{suffix}</span>
            </div>
            <div className="nw-stat__track">
                <div className="nw-stat__fill" style={{ width: `${width}%`, transitionDelay: `${delay}ms` }} />
            </div>
        </div>
    );
}

function SkillBar({ label, value, color, delay }) {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setTimeout(() => setWidth(value), delay * 150);
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div className="nw-skill" ref={ref}>
            <div className="nw-skill__header">
                <span className="nw-skill__label">{label}</span>
                <span className="nw-skill__score">{width}</span>
            </div>
            <div className="nw-skill__track">
                <div
                    className={`nw-skill__fill nw-skill__fill--${color}`}
                    style={{ width: `${width}%`, transitionDelay: `${delay * 150}ms` }}
                />
            </div>
        </div>
    );
}

function RadarChart() {
    const points = [
        { label: 'COMBAT', value: 0.98 },
        { label: 'ACROBATICS', value: 1.00 },
        { label: 'TACTICS', value: 0.95 },
        { label: 'STEALTH', value: 0.88 },
        { label: 'LEADERSHIP', value: 0.94 },
        { label: 'DETECTIVE', value: 0.89 },
    ];
    const cx = 160, cy = 160, r = 110;
    const angleStep = (Math.PI * 2) / points.length;
    const getXY = (i, radius) => ({
        x: cx + Math.cos(i * angleStep - Math.PI / 2) * radius,
        y: cy + Math.sin(i * angleStep - Math.PI / 2) * radius,
    });
    const gridLevels = [0.25, 0.5, 0.75, 1];
    const dataPath = points
        .map((p, i) => { const { x, y } = getXY(i, p.value * r); return `${i === 0 ? 'M' : 'L'}${x},${y}`; })
        .join(' ') + 'Z';

    return (
        <svg viewBox="0 0 320 320" className="nw-training__radar">
            <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e90ff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.15" />
                </linearGradient>
            </defs>
            {gridLevels.map(lvl =>
                <polygon key={lvl}
                    points={points.map((_, i) => { const { x, y } = getXY(i, lvl * r); return `${x},${y}`; }).join(' ')}
                    fill="none" stroke="#1e90ff" strokeWidth="0.5" strokeOpacity="0.2"
                />
            )}
            {points.map((_, i) => {
                const { x, y } = getXY(i, r);
                return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#1e90ff" strokeWidth="0.5" strokeOpacity="0.2" />;
            })}
            <path d={dataPath} fill="url(#rg)" stroke="#00d4ff" strokeWidth="1.5" strokeLinejoin="round" />
            {points.map((p, i) => {
                const { x, y } = getXY(i, p.value * r);
                return <circle key={i} cx={x} cy={y} r="3" fill="#00d4ff" opacity="0.9" />;
            })}
            {points.map((p, i) => {
                const { x, y } = getXY(i, r + 24);
                return (
                    <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                        fill="#4a6580" fontSize="9" fontFamily="'Share Tech Mono', monospace" letterSpacing="0.1em">
                        {p.label}
                    </text>
                );
            })}
        </svg>
    );
}

export default function NightwingMain({ onBack }) {
    const [selectedMission, setSelectedMission] = useState(null);
    const [navOpen, setNavOpen] = useState(false);
    const [activeVillain, setActiveVillain] = useState(null);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setNavOpen(false);
    };

    return (
        <div className="nw-main">
            <EscrimaCursor />

            <nav className="nw-nav">
                <div className="nw-nav__logo">
                    <svg viewBox="0 0 80 40" width="60">
                        <ellipse cx="20" cy="20" rx="16" ry="6" stroke="#1e90ff" strokeWidth="2" fill="none" />
                        <ellipse cx="60" cy="20" rx="16" ry="6" stroke="#1e90ff" strokeWidth="2" fill="none" />
                        <circle cx="40" cy="20" r="3" fill="#00d4ff" />
                    </svg>
                    <span>NIGHTWING</span>
                </div>
                <div className={`nw-nav__links ${navOpen ? 'open' : ''}`}>
                    {['profile', 'origin', 'arsenal', 'missions', 'training', 'suits', 'runs', 'rogues', 'legacy'].map(s => (
                        <button key={s} onClick={() => { scrollTo(s); setNavOpen(false); }} className="nw-nav__link">
                            {s.toUpperCase()}
                        </button>
                    ))}
                    {onBack && (
                        <button className="nw-nav__link nw-nav__link--back" onClick={onBack}>
                            ← CHANGE GUARDIAN
                        </button>
                    )}
                </div>
                {onBack && (
                    <button className="nw-nav__back" onClick={onBack}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9 2L4 7L9 12" stroke="#1e90ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        CHANGE GUARDIAN
                    </button>
                )}
                <button className="nw-nav__toggle" onClick={() => setNavOpen(!navOpen)}>
                    <span /><span /><span />
                </button>
            </nav>

            <section className="nw-hero" id="hero">
                <div className="nw-hero__grid">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="nw-hero__grid-line" style={{ '--i': i }} />
                    ))}
                </div>
                <div className="nw-hero__content">
                    <div className="nw-hero__tag">
                        <span className="nw-hero__tag-dot" />
                        ACTIVE — BLÜDHAVEN
                    </div>
                    <h1 className="nw-hero__title">
                        <span className="nw-hero__title-small">THE ORIGINAL</span>
                        <span className="nw-hero__title-main">NIGHTWING</span>
                        <span className="nw-hero__title-sub">DICK GRAYSON</span>
                    </h1>
                    <p className="nw-hero__desc">
                        First Robin. Founder of the Teen Titans.<br />
                        Batman's successor. Blüdhaven's protector.<br />
                        The greatest acrobat alive.
                    </p>
                    <div className="nw-hero__actions">
                        <button className="nw-btn nw-btn--primary" onClick={() => scrollTo('profile')}>ACCESS FILE</button>
                        <button className="nw-btn nw-btn--ghost" onClick={() => scrollTo('rogues')}>ROGUES GALLERY</button>
                    </div>
                </div>
                <div className="nw-hero__visual">
                    <div className="nw-hero__circle-outer" />
                    <div className="nw-hero__circle-mid" />
                    <div className="nw-hero__circle-inner" />
                    <div className="nw-hero__silhouette">
                        <img src={nightwingImg} alt="Nightwing" className="nw-hero__img" />
                    </div>
                    <div className="nw-hero__data">
                        {['HEIGHT: 6\'0"', 'WEIGHT: 175lbs', 'ORIGIN: HALEY\'S CIRCUS', 'BASE: BLÜDHAVEN'].map(d => (
                            <div key={d} className="nw-hero__data-item">{d}</div>
                        ))}
                    </div>
                </div>
                <div className="nw-hero__scroll">
                    <span>SCROLL</span>
                    <div className="nw-hero__scroll-line" />
                </div>
            </section>

            <section className="nw-section nw-profile" id="profile">
                <div className="nw-section__header">
                    <div className="nw-section__num">01</div>
                    <h2 className="nw-section__title">OPERATIVE PROFILE</h2>
                    <div className="nw-section__line" />
                </div>
                <div className="nw-profile__grid">
                    <div className="nw-profile__bio">
                        <div className="nw-profile__id-card">
                            <div className="nw-profile__id-header">
                                <span>CLASSIFIED DOSSIER</span>
                                <span className="nw-profile__id-clearance">CLEARANCE: A</span>
                            </div>
                            <div className="nw-profile__id-body">
                                <div className="nw-profile__avatar">
                                    <div className="nw-profile__avatar-inner">NW</div>
                                </div>
                                <div className="nw-profile__id-details">
                                    <div className="nw-profile__id-row"><span>ALIAS</span><strong>NIGHTWING</strong></div>
                                    <div className="nw-profile__id-row"><span>REAL NAME</span><strong>DICK GRAYSON</strong></div>
                                    <div className="nw-profile__id-row"><span>AFFILIATION</span><strong>TITANS / BAT-FAMILY</strong></div>
                                    <div className="nw-profile__id-row"><span>STATUS</span><strong className="nw-status-active">● ACTIVE</strong></div>
                                    <div className="nw-profile__id-row"><span>BASE</span><strong>BLÜDHAVEN, NJ</strong></div>
                                </div>
                            </div>
                        </div>
                        <p className="nw-profile__text">
                            Richard John Grayson was the youngest of the Flying Graysons, a world-renowned acrobatic troupe.
                            After his parents were murdered by mobster Tony Zucco, he was taken in by Bruce Wayne and trained as Robin.
                            He later struck out on his own, adopting the Nightwing identity — becoming one of the world's premier
                            vigilantes and a leader in his own right.
                        </p>
                    </div>
                    <div className="nw-profile__stats">
                        <div className="nw-profile__stats-title">COMBAT METRICS</div>
                        {STATS.map((s, i) => <StatBar key={s.label} {...s} delay={i * 150} />)}
                    </div>
                </div>
            </section>

            {/* ── ORIGIN / FIRST COVER ── */}
            <section className="nw-section nw-origin" id="origin">
                <div className="nw-section__header">
                    <div className="nw-section__num">02</div>
                    <h2 className="nw-section__title">ORIGIN</h2>
                    <div className="nw-section__line" />
                </div>
                <div className="nw-origin__grid">
                    <div className="nw-origin__cover">
                        <div className="nw-origin__cover-frame">
                            <img src={firstCoverImg} alt="Nightwing First Cover" className="nw-origin__cover-img" />
                            <div className="nw-origin__cover-label">
                                <span className="nw-origin__cover-issue">NIGHTWING #1</span>
                                <span className="nw-origin__cover-year">SEPTEMBER 1995</span>
                            </div>
                        </div>
                        <div className="nw-origin__cover-glow" />
                    </div>
                    <div className="nw-origin__text">
                        <div className="nw-origin__quote">
                            "I'm not Batman. I never will be.<br />
                            I'm something else entirely."
                        </div>
                        <p>
                            Born into the spotlight of Haley's Circus, Dick Grayson was the third part of the greatest
                            acrobatic act in the world — the Flying Graysons. Everything changed the night Tony Zucco
                            cut the safety wire, sending his parents to their deaths before a sold-out crowd.
                        </p>
                        <p>
                            Taken in by Bruce Wayne, Dick became the first Robin — the bright counterpoint to Batman's
                            darkness. But as he grew, so did the tension between mentor and protégé. Dick Grayson didn't
                            just escape Batman's shadow. He built something entirely his own.
                        </p>
                        <p>
                            Drawing inspiration from a Kryptonian hero of the same name, he became Nightwing — a symbol
                            not of vengeance, but of hope. Blüdhaven was his city. His choice. His legacy.
                        </p>
                        <div className="nw-origin__stats-row">
                            <div className="nw-origin__stat"><span>FIRST APPEARANCE</span><strong>TALES OF TEEN TITANS #44</strong></div>
                            <div className="nw-origin__stat"><span>SOLO DEBUT</span><strong>NIGHTWING #1 — 1995</strong></div>
                            <div className="nw-origin__stat"><span>CREATED BY</span><strong>MARV WOLFMAN</strong></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="nw-section nw-arsenal" id="arsenal">
                <div className="nw-section__header">
                    <div className="nw-section__num">03</div>
                    <h2 className="nw-section__title">ARSENAL</h2>
                    <div className="nw-section__line" />
                </div>
                <div className="nw-arsenal__grid">
                    {GEAR.map((g, i) => (
                        <div className="nw-gear-card" key={g.name} style={{ '--delay': `${i * 0.1}s` }}>
                            <div className="nw-gear-card__icon">{g.icon}</div>
                            <div className="nw-gear-card__content">
                                <h3 className="nw-gear-card__name">{g.name}</h3>
                                <p className="nw-gear-card__desc">{g.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="nw-section nw-missions" id="missions">
                <div className="nw-section__header">
                    <div className="nw-section__num">04</div>
                    <h2 className="nw-section__title">MISSION LOG</h2>
                    <div className="nw-section__line" />
                </div>
                <div className="nw-missions__table">
                    <div className="nw-missions__thead">
                        <span>ID</span><span>STATUS</span><span>LOCATION</span><span>OPERATION</span><span>THREAT</span><span>YEAR</span>
                    </div>
                    {MISSIONS.map(m => (
                        <div
                            className={`nw-missions__row nw-missions__row--${m.status.toLowerCase()}`}
                            key={m.id}
                            onClick={() => setSelectedMission(selectedMission?.id === m.id ? null : m)}
                        >
                            <span className="nw-missions__id">#{m.id}</span>
                            <span className={`nw-missions__status nw-missions__status--${m.status.toLowerCase()}`}>{m.status}</span>
                            <span className="nw-missions__city">{m.city}</span>
                            <span className="nw-missions__title-col">{m.title}</span>
                            <span className={`nw-missions__threat nw-missions__threat--${m.threat.toLowerCase()}`}>{m.threat}</span>
                            <span className="nw-missions__year">{m.year}</span>
                        </div>
                    ))}
                </div>
                {selectedMission && (
                    <div className="nw-missions__detail">
                        <div className="nw-missions__detail-header">
                            OPERATION #{selectedMission.id}: {selectedMission.title.toUpperCase()}
                        </div>
                        <div className="nw-missions__detail-body">
                            Location: <strong>{selectedMission.city}</strong> —
                            Threat Level: <strong className={`nw-missions__threat--${selectedMission.threat.toLowerCase()}`}>{selectedMission.threat}</strong> —
                            Status: <strong>{selectedMission.status}</strong> —
                            Year: <strong>{selectedMission.year}</strong>
                        </div>
                    </div>
                )}
            </section>

            <section className="nw-section nw-training" id="training">
                <div className="nw-section__header">
                    <div className="nw-section__num">05</div>
                    <h2 className="nw-section__title">TRAINING PROTOCOLS</h2>
                    <div className="nw-section__line" />
                </div>
                <div className="nw-training__grid">
                    <div className="nw-training__radar-wrap">
                        <div className="nw-training__radar-title">COMBAT ATTRIBUTE MAP</div>
                        <RadarChart />
                        <div className="nw-training__mentors">
                            <div className="nw-training__mentors-title">TRAINED BY</div>
                            {[
                                { tag: 'BATMAN', desc: 'Detective work, martial arts, tactical discipline' },
                                { tag: 'ALFRED', desc: 'Covert ops, psychological resilience, field medicine' },
                                { tag: 'RICHARD DRAGON', desc: 'Advanced hand-to-hand, pressure points, chi control' },
                                { tag: 'FLYING GRAYSONS', desc: 'Acrobatics, balance, spatial awareness — from birth' },
                            ].map(m => (
                                <div className="nw-training__mentor-row" key={m.tag}>
                                    <span className="nw-training__mentor-tag">{m.tag}</span>
                                    <span className="nw-training__mentor-desc">{m.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="nw-training__bars">
                        <div className="nw-training__bars-title">SKILL BREAKDOWN — PERCENTILE RANK</div>
                        {SKILLS.map((s, i) => (
                            <SkillBar key={s.label} {...s} delay={i} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="nw-section nw-suits" id="suits">
                <div className="nw-section__header">
                    <div className="nw-section__num">06</div>
                    <h2 className="nw-section__title">SUIT EVOLUTION</h2>
                    <div className="nw-section__line" />
                </div>
                <div className="nw-suits__scroll">
                    <div className="nw-suits__track">
                        {SUITS.map((s, i) => (
                            <div className="nw-suit-node" key={s.year + s.name} style={{ '--delay': `${i * 0.1}s` }}>
                                <div className={`nw-suit-node__dot ${s.active ? 'nw-suit-node__dot--active' : ''}`} />
                                <div className="nw-suit-node__card">
                                    <div className="nw-suit-node__tag">{s.tag}</div>
                                    <div className="nw-suit-node__year">{s.year}</div>
                                    <div className="nw-suit-node__name">{s.name}</div>
                                    <div className="nw-suit-node__specs">
                                        {s.specs.map(spec => (
                                            <div className="nw-suit-node__spec" key={spec}>{spec}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="nw-section nw-runs" id="runs">
                <div className="nw-section__header">
                    <div className="nw-section__num">07</div>
                    <h2 className="nw-section__title">ESSENTIAL READING</h2>
                    <div className="nw-section__line" />
                </div>
                <p className="nw-runs__intro">
                    Forty years of stories. These are the runs that defined Nightwing — the arcs every fan should read, from his first solo issue to the Rebirth era.
                </p>
                <div className="nw-runs__grid">
                    {COMIC_RUNS.map(run => (
                        <div className="nw-run-card" key={run.title} style={{ '--delay': run.delay }}>
                            <div className="nw-run-card__header">
                                <span className="nw-run-card__issues">{run.issues}</span>
                                <span className="nw-run-card__rating">{run.rating}</span>
                            </div>
                            <div className="nw-run-card__title">{run.title}</div>
                            <div className="nw-run-card__arc">{run.arc}</div>
                            <p className="nw-run-card__desc">{run.desc}</p>
                            <div className="nw-run-card__meta">
                                {run.tags.map(t => <span className="nw-run-card__tag" key={t}>{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="nw-section nw-rogues" id="rogues">
                <div className="nw-section__header">
                    <div className="nw-section__num">08</div>
                    <h2 className="nw-section__title">ROGUES GALLERY</h2>
                    <div className="nw-section__line" />
                </div>
                <p className="nw-rogues__intro">
                    Every guardian earns his enemies. These are the threats that have tested Nightwing to his limits —
                    the villains that define Blüdhaven's darkness.
                </p>
                <div className="nw-rogues__grid">
                    {VILLAINS.map((v, i) => (
                        <div
                            className={`nw-villain-card ${activeVillain === i ? 'active' : ''}`}
                            key={v.name}
                            onClick={() => setActiveVillain(activeVillain === i ? null : i)}
                            style={{ '--delay': `${i * 0.12}s` }}
                        >
                            <div className="nw-villain-card__img-wrap">
                                <img src={v.img} alt={v.name} className="nw-villain-card__img" />
                                <div className="nw-villain-card__overlay" />
                                <div className="nw-villain-card__tag">{v.tag}</div>
                                <div className={`nw-villain-card__threat nw-missions__threat--${v.threat.toLowerCase()}`}>
                                    ● {v.threat}
                                </div>
                            </div>
                            <div className="nw-villain-card__body">
                                <div className="nw-villain-card__name">{v.name}</div>
                                <div className="nw-villain-card__alias">{v.alias}</div>
                                <div className="nw-villain-card__role">{v.role}</div>
                                <p className={`nw-villain-card__desc ${activeVillain === i ? 'visible' : ''}`}>
                                    {v.desc}
                                </p>
                                <button className="nw-villain-card__btn">
                                    {activeVillain === i ? 'CLOSE FILE' : 'OPEN FILE'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="nw-section nw-legacy" id="legacy">
                <div className="nw-section__header">
                    <div className="nw-section__num">09</div>
                    <h2 className="nw-section__title">LEGACY</h2>
                    <div className="nw-section__line" />
                </div>
                <div className="nw-legacy__timeline">
                    {[
                        { year: '1987', event: 'Adopted the Nightwing identity, leaving Robin behind forever', tag: 'ORIGIN' },
                        { year: '1996', event: 'Founded the modern Teen Titans, proving his leadership', tag: 'LEADERSHIP' },
                        { year: '2003', event: 'Became the full-time protector of Blüdhaven', tag: 'TERRITORY' },
                        { year: '2008', event: 'Temporarily assumed the Batman mantle for Gotham', tag: 'LEGACY' },
                        { year: '2012', event: 'Rejoined the Titans as field commander', tag: 'COMMAND' },
                        { year: '2024', event: 'Active operations ongoing in Blüdhaven', tag: 'PRESENT' },
                    ].map((e, i) => (
                        <div className="nw-timeline-item" key={e.year} style={{ '--delay': `${i * 0.1}s` }}>
                            <div className="nw-timeline-item__year">{e.year}</div>
                            <div className="nw-timeline-item__dot" />
                            <div className="nw-timeline-item__content">
                                <span className="nw-timeline-item__tag">{e.tag}</span>
                                <p>{e.event}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <ReviewSection character="nightwing" />

            <footer className="nw-footer">
                <div className="nw-footer__symbol">
                    <svg viewBox="0 0 80 40" width="50">
                        <ellipse cx="20" cy="20" rx="16" ry="6" stroke="#1e90ff40" strokeWidth="1.5" fill="none" />
                        <ellipse cx="60" cy="20" rx="16" ry="6" stroke="#1e90ff40" strokeWidth="1.5" fill="none" />
                    </svg>
                </div>
                <p className="nw-footer__text">NIGHTWING — BLÜDHAVEN CITY WATCH</p>
                <p className="nw-footer__sub">CLASSIFIED OPERATIONS FILE — AUTHORIZED ACCESS ONLY</p>
                {onBack && (
                    <button className="nw-footer__back" onClick={onBack}>← CHANGE GUARDIAN</button>
                )}
                <div className="dev-credit">
                    <span className="dev-credit__label">Developed by</span>
                    <span className="dev-credit__name" style={{ color: '#1e90ff' }}>Nihan</span>
                </div>
            </footer>
        </div>
    );
}