import { useState, useEffect, useRef } from 'react';
import '../styles/damian-main.css';
import ReviewSection from './ReviewSection';

import rasImg from '../assets/Robin/Villains/ras.jpg';
import taliaImg from '../assets/Robin/Villains/talia.jpg';
import nobodyImg from '../assets/Robin/Villains/nobody.jpg';
import hereticImg from '../assets/Robin/Villains/heretic.jpg';
import deathstrokeImg from '../assets/Robin/Villains/deathstroke.jpg';
import batImg from '../assets/Robin/Villains/bat.jpg';
import cover1Img from '../assets/Robin/covers/cover_1.jpg';
import cover2Img from '../assets/Robin/covers/cover_2.jpg';
import cover3Img from '../assets/Robin/covers/cover_3.jpg';
import cover4Img from '../assets/Robin/covers/cover_4.jpg';

/* ══════════════════════════════════════════════════════════
   DAMIAN WAYNE — SON OF BATMAN · ROBIN V
   Redesigned: Minimal centred hero · Duality Index · Katana Skill Tree
               Cipher Notes · Bat-Family Web · + original sections
   ══════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────

const DUALITY_DATA = [
    { aspect: 'COMBAT STYLE', wayne: 35, league: 65 },
    { aspect: 'ETHICS', wayne: 80, league: 20 },
    { aspect: 'STRATEGY', wayne: 45, league: 55 },
    { aspect: 'STEALTH', wayne: 30, league: 70 },
    { aspect: 'MOTIVATION', wayne: 85, league: 15 },
    { aspect: 'MERCY', wayne: 78, league: 22 },
    { aspect: 'LOYALTY', wayne: 90, league: 10 },
    { aspect: 'TEMPERAMENT', wayne: 25, league: 75 },
];

const SKILL_GROUPS = [
    {
        label: 'COMBAT ARTS', color: 'jade', skills: [
            { name: 'NINJUTSU / NINJATO', pct: 100 },
            { name: 'MUAY THAI', pct: 98 },
            { name: 'LEAGUE BLADE FORMS', pct: 100 },
            { name: 'SILAT / KRAV MAGA', pct: 97 },
        ]
    },
    {
        label: 'TACTICAL SKILLS', color: 'gold', skills: [
            { name: 'ASSASSINATION ARTS', pct: 98 },
            { name: 'STEALTH INFILTRATION', pct: 99 },
            { name: 'NERVE AGENT USE', pct: 95 },
            { name: 'ACROBATICS', pct: 97 },
        ]
    },
    {
        label: 'WAYNE DISCIPLINES', color: 'steel', skills: [
            { name: 'DETECTIVE METHOD', pct: 92 },
            { name: 'FORENSICS', pct: 88 },
            { name: 'RESTRAINT / NO-KILL', pct: 85 },
        ]
    },
];

const CIPHER_DATA = [
    {
        label: 'REC-01',
        encrypted: '01000100 00100111 01101101 00100000 01101110 01101111 01110100 00100000 01111001 01101111 01110101 01110010...',
        decoded: "I am not your soldier. I am not your weapon. I am not your heir. I am Robin.",
        msg: '"I am not your soldier..." — Damian to Talia, age 10',
    },
    {
        label: 'REC-02',
        encrypted: '.. ._._ ._. . / ._ / .._. ._. / _ .... . / ._ .__. ._ _. / ._ __ ._ / .._. ._. . ._ _ ...',
        decoded: "I wear a father's name, a grandfather's face, and a mother's silence. I choose what to do with them.",
        msg: '"I wear a father\'s name..." — Personal journal',
    },
    {
        label: 'REC-03',
        encrypted: '44 61 6d 69 61 6e 20 57 61 79 6e 65 20 68 61 73 20 6e 65 76 65 72 20 6c 6f 73 74 20 61 20 66 69 67 68 74...',
        decoded: "He does not kill. Not because he cannot. Because he decided. That is the difference.",
        msg: 'Bat-computer threat assessment, addendum by Bruce Wayne',
    },
    {
        label: 'REC-04',
        encrypted: '---- .-.. / --. .... ..- .-.. / -... .-.. --- --- -.. / --. .. ...- . ... / .-- . .- .--. --- -.',
        decoded: "The al Ghul blood gives weapon. The Wayne blood gives cause. The difference between the two is everything.",
        msg: 'Field psych evaluation — Gotham PD, classified',
    },
];

const FAMILY_DATA = [
    { name: 'DICK GRAYSON', alias: 'Nightwing / Batman II', rel: 'BIG BROTHER', relColor: '#28a044', dotColor: '#28a044', center: false, note: "The only partner Damian never had to fight to respect. Their Batman–Robin dynamic is the best in the franchise's history." },
    { name: 'BRUCE WAYNE', alias: 'Batman / Father', rel: 'FATHER', relColor: '#d4a840', dotColor: '#d4a840', center: true, note: "The standard Damian measures everything against — and the one person whose approval he will never stop seeking." },
    { name: 'TIM DRAKE', alias: 'Red Robin / Robin III', rel: 'RIVAL', relColor: '#8b1515', dotColor: '#8b1515', center: false, note: "They clash constantly. Damian respects him in the way you respect someone you can never quite beat on every axis." },
    { name: 'ALFRED', alias: 'Alfred Pennyworth', rel: 'ANCHOR', relColor: '#28a044', dotColor: '#28a044', center: false, note: "The one adult Damian never weaponises his arrogance against. The first person he ever quietly trusted." },
    { name: 'TALIA AL GHUL', alias: 'Mother / Architect', rel: 'ARCHITECT', relColor: '#8b1515', dotColor: '#8b1515', center: false, note: "She created him. She built the thing that killed him. He understands her. He does not forgive her." },
    { name: 'JASON TODD', alias: 'Red Hood / Robin II', rel: 'KINSHIP', relColor: '#d4a840', dotColor: '#d4a840', center: false, note: "Two Robins who understand what it costs to come back from the dead — and still choose the uniform." },
];

const WEAPONS = [
    { icon: '⚔️', name: 'Katana', desc: "Hand-forged League blade, passed through the al Ghul line. Damian wields it with lethal precision. He has drawn it against Batman. He has drawn it against Ra's. He always sheathes it when he chooses to.", tag: 'Primary Blade' },
    { icon: '✦', name: 'Shuriken / R-Disc', desc: "The Robin R-disc is the public face; the shuriken is the League version. Thrown with lethal accuracy from thirty metres. Twelve at all times, magnetised in a shoulder brace only he knows is there.", tag: 'Ranged / Thrown' },
    { icon: '🗡️', name: 'League Blade Forms', desc: "Fourteen forms mastered before age seven. The Naga-Dair serpent strike. The Djinn's shadow cut. Methods Batman forbade — which is why Damian only uses them when Batman isn't watching.", tag: 'Assassination Arts' },
    { icon: '🏹', name: 'Grapnel — Modified', desc: 'Standard Bat-Family grapnel with a second charge that fires a blade anchor instead of a hook — allowing him to swing through glass, not around it.', tag: 'Mobility' },
    { icon: '🛡️', name: 'Robin Suit — Damian', desc: 'Titanium-weave under the tunic, ceramic bracers, a hidden throat guard. Looks traditional Robin. Is not. Designed by Damian using Wayne Tech materials and League fabrication.', tag: 'Armour' },
    { icon: '💉', name: 'League Nerve Agents', desc: 'Synthesised from Nanda Parbat greenhouse plants. A touch on the correct pressure point renders a subject unconscious in four seconds. Damian calls this restraint. Batman disagrees.', tag: 'Chemical Arsenal' },
];

const PHILOSOPHY = [
    { n: '01', title: 'Perfection Is the Only Standard', text: "Damian Wayne was not raised to be good enough. He was raised to be the best — at everything. This is not arrogance. It is the foundational logic of a child told from birth that he would inherit an empire. He applies it to combat, strategy, art, and every discipline Batman has handed him. Second place is failure. He is still learning that humanity is not a competition." },
    { n: '02', title: 'Legacy Is a Burden and a Weapon', text: "He inherits two of the most powerful legacies in the world — and the impossible task of synthesising them. The al Ghul blood gives him precision, ruthlessness, and a complete understanding of how power actually functions. The Wayne blood gives him something the League never had: a reason to use that power for something other than itself." },
    { n: '03', title: 'Mercy Is a Choice, Not a Weakness', text: "The League taught Damian that mercy is a mistake. Batman taught him the no-kill rule. Damian has lived both fully. He has chosen Batman's path not because he was told to, but because he has watched what the League's path produces. He shows mercy because he understands what it costs. That makes it mean something." },
    { n: '04', title: 'Loyalty Earned — Then Absolute', text: "He tested every member of the Bat-Family. He attacked Grayson. He provoked Drake until Drake responded. He demanded things no one demands of Alfred. He has concluded they are all worthy. Now he would die for any of them — and they know it, even if he would never say so." },
    { n: '05', title: 'The Mission Defines the Man', text: "Bruce Wayne became Batman because crime took everything from him. Damian became Robin because he chose it — over an empire, over immortality, over everything the al Ghul line offered. That choice is the most significant thing he has ever done. He makes it again every time he puts on the uniform and goes out into Gotham with no intention of killing anyone." },
];

const MISSIONS = [
    { id: 'RV-001', city: 'GOTHAM CITY', status: 'CLOSED', light: 'closed', title: 'The Heir Apparent', threat: 'CRITICAL', desc: 'First independent patrol. Four armed men, Gotham East. Damian neutralised all four, dislocated their joints, and left them zip-tied to a lamppost with a note in Arabic. Bruce found the note. He said nothing.' },
    { id: 'RV-014', city: 'NANDA PARBAT', status: 'SOLVED', light: 'solved', title: "Ra's al Ghul's Gambit", threat: 'EXTREME', desc: "Ra's made Damian an offer: return to the League, claim the al Ghul name, rule an empire. Damian declined in person, at the edge of a Lazarus Pit, in a sword fight that lasted eleven minutes. Ra's called it the proudest moment of his long life." },
    { id: 'RV-027', city: 'GLOBAL OPS', status: 'ACTIVE', light: 'active', title: 'Nobody Hunts Robin', threat: 'CRITICAL', desc: "Morgan Ducard attacked Dick Grayson to draw Damian out. Damian obliged. The fight pushed him closer to killing than he has ever been in the Robin uniform. He stopped. Barely." },
    { id: 'RV-031', city: 'GOTHAM CITY', status: 'ONGOING', light: 'ongoing', title: 'The Heretic Protocol', threat: 'EXTREME', desc: "A weapon built from Damian's own DNA. The Heretic: everything Damian was trained to be, without any of the choices Damian made. The confrontation is not a fight — it is a mirror that refuses to blink." },
];

const VILLAINS = [
    { name: "RA'S AL GHUL", alias: "The Demon's Head", role: 'Immortal Grandfather / Architect', threat: 'EXTREME', tag: 'BLOODLINE', img: rasImg, desc: "Ra's is not Damian's enemy in the conventional sense. He is his grandfather, his legacy, and the person who most completely represents the life Damian chose to walk away from. Every encounter is a test — Ra's checking whether his finest creation will finally return. Damian checking whether he can keep refusing." },
    { name: 'TALIA AL GHUL', alias: "Daughter of the Demon", role: 'Mother / Architect / Nightmare', threat: 'EXTREME', tag: 'PERSONAL', img: taliaImg, desc: "Talia created Damian from Bruce Wayne's stolen DNA and raised him as the League's ultimate weapon. She loves him in the way the League understands love — as ownership. When Damian chose Batman over her, she did not mourn. She built the Heretic." },
    { name: 'NOBODY', alias: 'Morgan Ducard', role: 'Assassin / Rival Heir', threat: 'CRITICAL', tag: 'MIRROR', img: nobodyImg, desc: "Henri Ducard's son — trained the same way Damian was trained, except without the Bruce Wayne half to pull him back. Nobody is what Damian almost became: brilliant, lethal, and entirely unrestrained. Their conflict is not about power. It is about what you choose to do with a training that never had mercy in its curriculum." },
    { name: 'THE HERETIC', alias: "Damian's Clone", role: "Talia's Weapon / Dark Mirror", threat: 'EXTREME', tag: 'ANTI-DAMIAN', img: hereticImg, desc: "Cloned from Damian's own DNA, aged in a Lazarus Pit, trained and implanted with a dead warrior's memories. The Heretic is everything Damian was supposed to be before Bruce Wayne intervened. He killed Damian. He was built to. That Damian came back says everything about what Batman gave him." },
    { name: 'DEATHSTROKE', alias: 'Slade Wilson', role: "The World's Finest Assassin", threat: 'CRITICAL', tag: 'RIVAL', img: deathstrokeImg, desc: "Contracted against the Bat-Family more times than anyone counts. Against Damian specifically, their fights are uniquely brutal — Slade recognises the League training instantly. Damian respects him the way you respect a weapon. He does not underestimate him." },
    { name: 'BATMAN', alias: 'Bruce Wayne', role: 'Father / Teacher / Impossible Standard', threat: 'HIGH', tag: 'FAMILY', img: batImg, desc: "Not a villain. But the man whose standard Damian is still trying to meet and still fighting against in equal measure. Every argument between them is about whether Damian's potential should be directed or unleashed. Bruce says directed. Damian keeps testing the boundary." },
];
const TIMELINE = [
    { year: '2000', tag: 'ORIGIN', dot: 'default', title: 'Born to Rule', text: "Talia al Ghul uses Bruce Wayne's genetic material without his knowledge to conceive a child. Born in a League facility at Nanda Parbat. Named Damian. Trained from day one." },
    { year: '2001–08', tag: 'TRAINING', dot: 'default', title: "The League's Weapon", text: "Fourteen martial arts forms. Six languages. Poison resistance, anatomy, psychological manipulation. He kills for the first time at a League instructor's order. He is eight years old. He is not told to feel anything about it." },
    { year: '2009', tag: 'MEETING', dot: 'default', title: 'Delivered to the Father', text: "Talia brings Damian to Bruce Wayne and leaves him there. The meeting is explosive. Damian immediately attacks Tim Drake, fights Dick Grayson to a standstill, argues with Alfred. He tells Bruce Wayne he intends to replace Batman and do it correctly. Bruce is furious. He is also, secretly, proud." },
    { year: '2009', tag: 'MANTLE', dot: 'default', title: 'Robin — The Fifth', text: "Dick Grayson becomes Batman following Bruce's apparent death. He chooses Damian as Robin over Tim Drake's protests. It is the right choice. Damian and Dick's partnership is the most unlikely and most effective in the history of the role." },
    { year: '2011', tag: 'FATHER', dot: 'default', title: 'Bruce Returns', text: "Bruce Wayne returns and reclaims the cowl. He and Damian begin their true partnership — father and son, Batman and Robin. Bruce is terrified of what Damian was made to be. Damian is terrified of disappointing the one person whose standard is not the League's." },
    { year: '2013', tag: 'DEATH', dot: 'death', title: 'Killed by His Own Blood', text: "The Heretic — Damian's clone built by Talia — kills Damian Wayne in combat. A spear through the chest. Damian dies in uniform, protecting civilians, facing an enemy that wore his own face. Bruce holds him and does not speak for three hours." },
    { year: '2013', tag: 'RESURRECTION', dot: 'resurrection', title: 'Son of Superman, Resurrected', text: "Ra's and Talia fight over Damian's corpse. Bruce reaches the body first. Superman retrieves a Chaos Shard powerful enough to restore life. Damian returns — with his Wayne heritage intact, his League training intact, and briefly with supernatural abilities he learns to relinquish." },
    { year: 'NOW', tag: 'PRESENT', dot: 'default', title: 'The Choice, Continued', text: "Damian Wayne is Robin. Not because he was born to it — because he decides to be, every single night. He still argues with Tim Drake. He still feeds his cat. He is the most dangerous Robin who has ever lived, and he has chosen to use that for something other than empire." },
];

const FIRST_EDITIONS = [
    { issue: 'BATMAN #655', title: 'Batman & Son', year: '2006', writer: 'Grant Morrison', artist: 'Andy Kubert', note: 'First appearance of Damian Wayne', stamp: 'ORIGIN ISSUE', img: cover1Img },
    { issue: 'BATMAN #657', title: 'Robin — The Fifth', year: '2006', writer: 'Grant Morrison', artist: 'Andy Kubert', note: 'Damian dons the Robin costume for the first time', stamp: '1ST AS ROBIN', img: cover2Img },
    { issue: 'BATMAN & ROBIN #1', title: 'Batman Reborn', year: '2009', writer: 'Grant Morrison', artist: 'Frank Quitely', note: 'Dick Grayson as Batman, Damian as Robin', stamp: 'KEY ISSUE', img: cover3Img },
    { issue: 'BATMAN INC. #8', title: 'Leviathan Strikes', year: '2013', writer: 'Grant Morrison', artist: 'Chris Burnham', note: 'Death of Damian Wayne', stamp: 'DEATH ISSUE', img: cover4Img },
];

const NAV_ITEMS = ['identity', 'duality', 'skills', 'code', 'arsenal', 'missions', 'rogues', 'family', 'covers', 'legacy'];

// ─────────────────────────────────────────────────────────
// SHARED HOOK
// ─────────────────────────────────────────────────────────

function useInView(threshold = 0.2) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

// ─────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────

/* ── NINJA CURSOR ── */
function NinjaCursor() {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const trail = useRef({ x: 0, y: 0 });
    const velRef = useRef(0);
    const prevPos = useRef({ x: 0, y: 0 });
    const angle = useRef(0);
    const raf = useRef(null);
    const trailOpacity = useRef(0);

    useEffect(() => {
        const onMove = (e) => {
            const dx = e.clientX - prevPos.current.x;
            const dy = e.clientY - prevPos.current.y;
            velRef.current = Math.sqrt(dx * dx + dy * dy);
            prevPos.current = { x: e.clientX, y: e.clientY };
            pos.current = { x: e.clientX, y: e.clientY };
        };
        const animate = () => {
            trail.current.x += (pos.current.x - trail.current.x) * 0.1;
            trail.current.y += (pos.current.y - trail.current.y) * 0.1;
            angle.current += 1.5 + velRef.current * 0.3;
            velRef.current *= 0.85;
            trailOpacity.current += (Math.min(velRef.current / 12, 1) - trailOpacity.current) * 0.15;
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
                const svg = cursorRef.current.querySelector('.dw-cursor__svg');
                if (svg) svg.style.transform = `rotate(${angle.current}deg)`;
            }
            if (trailRef.current) {
                trailRef.current.style.transform = `translate(${trail.current.x}px,${trail.current.y}px) translate(-50%,-50%)`;
                trailRef.current.style.opacity = trailOpacity.current;
                const svg = trailRef.current.querySelector('.dw-cursor__svg');
                if (svg) svg.style.transform = `rotate(${angle.current * 0.7}deg)`;
            }
            raf.current = requestAnimationFrame(animate);
        };
        window.addEventListener('mousemove', onMove);
        raf.current = requestAnimationFrame(animate);
        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
    }, []);

    const Shuriken = ({ size }) => (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="dw-cursor__svg">
            <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" fill="#1d7a32" opacity="0.95" />
            <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" fill="#28a044" opacity="0.45" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="6" fill="#28a044" />
            <circle cx="50" cy="50" r="3" fill="#1d7a32" />
        </svg>
    );

    return (
        <>
            <div ref={cursorRef} className="dw-cursor"><Shuriken size={22} /></div>
            <div ref={trailRef} className="dw-cursor dw-cursor--trail"><Shuriken size={15} /></div>
        </>
    );
}

/* ── CIRCULAR SKILL RING (kept for section 02) ── */
function CircleSkill({ label, value, gold, index }) {
    const [displayed, setDisplayed] = useState(0);
    const ref = useRef(null);
    const R = 38;
    const circ = 2 * Math.PI * R;
    const offset = circ - (displayed / 100) * circ;

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setTimeout(() => setDisplayed(value), index * 100); obs.disconnect(); }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [value, index]);

    return (
        <div className="dw-ring-item" ref={ref}>
            <svg width="90" height="90" viewBox="0 0 90 90" className="dw-ring-svg">
                <circle className="dw-ring-bg" cx="45" cy="45" r={R} />
                <circle
                    className={`dw-ring-fill${gold ? ' dw-ring-fill--gold' : ' dw-ring-fill--jade'}`}
                    cx="45" cy="45" r={R}
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms` }}
                />
                <text className="dw-ring-val" x="45" y="40">{displayed}</text>
                <text className="dw-ring-pct-label" x="45" y="55">%</text>
            </svg>
            <div className="dw-ring-label">{label}</div>
        </div>
    );
}

/* ── TARGETING HUD VILLAIN ── */
function TargetCard({ villain, index }) {
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.disconnect(); } },
            { threshold: 0.08 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    const threatClass = `dw-t--${villain.threat.toLowerCase()}`;
    return (
        <div className="dw-target" ref={ref} style={{ transitionDelay: `${index * 0.1}s` }}>
            <div className="dw-target__corner dw-target__corner--tl" />
            <div className="dw-target__corner dw-target__corner--tr" />
            <div className="dw-target__corner dw-target__corner--bl" />
            <div className="dw-target__corner dw-target__corner--br" />
            <div className="dw-target__scan" />
            <div className="dw-target__img">
                {villain.img && (
                    <img src={villain.img} alt={villain.name} className="dw-target__real-img" />
                )}
                <div className="dw-target__img-overlay" />
                <div className={`dw-target__img-threat ${threatClass}`}>⬤ {villain.threat}</div>
                <div className="dw-target__img-class">CLASSIFIED</div>
            </div>

            <div className="dw-target__top">
                <span className="dw-target__tag">{villain.tag}</span>
                <span className={`dw-target__threat ${threatClass}`}>{villain.threat}</span>
            </div>
            <div className="dw-target__body">
                <div className="dw-target__name">{villain.name}</div>
                <div className="dw-target__alias">{villain.alias}</div>
                <div className="dw-target__role">{villain.role}</div>
                <p className="dw-target__desc">{villain.desc}</p>
            </div>
        </div>
    );
}

/* ── PARCHMENT SCROLL CARD ── */
function ScrollCard({ rule }) {
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                const line = e.target.querySelector('.dw-scroll__line');
                if (line) { line.style.transition = 'width 0.9s cubic-bezier(0.2,0,0,1) 0.15s'; line.style.width = '100%'; }
                obs.disconnect();
            }
        }, { threshold: 0.25 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <div className="dw-scroll" ref={ref}>
            <div className="dw-scroll__bar">
                <div className="dw-scroll__num">{rule.n}</div>
                <div className="dw-scroll__seal" aria-hidden="true">印</div>
            </div>
            <div className="dw-scroll__body">
                <div className="dw-scroll__title">{rule.title}</div>
                <p className="dw-scroll__text">{rule.text}</p>
            </div>
            <div className="dw-scroll__line" />
        </div>
    );
}

/* ── CIPHER ROW ── */
function CipherRow({ data }) {
    const [decoded, setDecoded] = useState(false);
    return (
        <div className="dw-cipher__row">
            <div className="dw-cipher__cell dw-cipher__cell--label">{data.label}</div>
            <div className="dw-cipher__cell">
                <span className={`dw-cipher__status ${decoded ? 'dw-cipher__status--dec' : 'dw-cipher__status--enc'}`}>
                    {decoded ? 'DECODED' : 'ENCRYPTED'}
                </span>
                <div
                    className={`dw-cipher__text ${decoded ? 'dw-cipher__text--revealed' : 'dw-cipher__text--locked'}`}
                    onClick={() => setDecoded(true)}
                >
                    {decoded ? data.decoded : data.encrypted}
                </div>
            </div>
            <div className="dw-cipher__cell dw-cipher__msg">
                {decoded ? data.msg : ''}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────

export default function DamianMain({ onBack }) {
    const [navOpen, setNavOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);

    // Duality bar animation
    const [dualityRef, dualityInView] = useInView(0.2);
    const [dualityReading, setDualityReading] = useState(false);
    useEffect(() => {
        if (dualityInView) {
            const t = setTimeout(() => setDualityReading(true), 1100);
            return () => clearTimeout(t);
        }
    }, [dualityInView]);

    // Skill tree animation
    const [skillRef, skillInView] = useInView(0.1);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setNavOpen(false);
        setNavHidden(false);
    };

    useEffect(() => {
        const revealEls = document.querySelectorAll('.dw-rv');
        const revealObs = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
            }),
            { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
        );
        revealEls.forEach(el => revealObs.observe(el));
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            if (!navOpen) setNavHidden(y > lastY && y > 100);
            lastY = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { revealObs.disconnect(); window.removeEventListener('scroll', onScroll); };
    }, [navOpen]);

    return (
        <div className="dw-main">
            <NinjaCursor />

            {/* ── NAV ── */}
            <nav className={`dw-nav${navHidden ? ' dw-nav--hidden' : ''}`}>
                <div className="dw-nav__logo">
                    <svg viewBox="0 0 80 80" width="24" aria-hidden="true">
                        <polygon points="40,4 46,34 76,40 46,46 40,76 34,46 4,40 34,34" stroke="#1d7a32" strokeWidth="2" fill="none" />
                        <text x="40" y="52" textAnchor="middle" fontFamily="Bebas Neue, sans-serif" fontSize="28" fill="#1d7a32">R</text>
                    </svg>
                    DAMIAN WAYNE
                </div>
                <div className={`dw-nav__links${navOpen ? ' open' : ''}`}>
                    {NAV_ITEMS.map(s => (
                        <button key={s} className="dw-nav__link" onClick={() => scrollTo(s)}>{s.toUpperCase()}</button>
                    ))}
                </div>
                {onBack && <button className="dw-nav__back" onClick={onBack}>← CHANGE GUARDIAN</button>}
                <button className="dw-nav__toggle" aria-label="Toggle nav" onClick={() => setNavOpen(o => !o)}>
                    <span /><span /><span />
                </button>
            </nav>

            {/* ══════════════════════════════════════════════
                HERO — REDESIGNED: Minimal centred layout
                ══════════════════════════════════════════════ */}
            <section className="dw-hero">
                <div className="dw-hero__bg" />
                <div className="dw-hero__rules" aria-hidden="true">
                    <div className="dw-hero__rule-v" />
                    <div className="dw-hero__rule-v" />
                </div>

                <div className="dw-hero__eyebrow">SON OF BATMAN · HEIR OF AL GHUL · ROBIN V</div>

                <h1 className="dw-hero__name">
                    DAMIAN<br /><em>WAYNE</em>
                </h1>

                <div className="dw-hero__rule-h" />

                <div className="dw-hero__dual">
                    <div className="dw-hero__dual-half dw-hero__dual-half--wayne">
                        <div className="dw-hero__dual-tag">THE WAYNE BLOODLINE</div>
                        <div className="dw-hero__dual-title">BRUCE WAYNE&apos;S SON</div>
                        <p className="dw-hero__dual-text">
                            Detective genius. Peak physical conditioning. A reason to fight that the League never taught him.
                        </p>
                    </div>
                    <div className="dw-hero__dual-divider">
                        <div className="dw-hero__dual-divider-dot" />
                    </div>
                    <div className="dw-hero__dual-half dw-hero__dual-half--league">
                        <div className="dw-hero__dual-tag">THE AL GHUL BLOODLINE</div>
                        <div className="dw-hero__dual-title">THE DEMON&apos;S HEIR</div>
                        <p className="dw-hero__dual-text">
                            Fourteen combat forms before age seven. Precision to end a life — and the choice not to.
                        </p>
                    </div>
                </div>

                <div className="dw-hero__tags">
                    {['DETECTIVE MIND', 'NO-KILL CODE', 'LEAGUE-TRAINED', 'GOTHAM OPERATIVE', 'BATMAN INC.'].map(t => (
                        <span key={t} className="dw-hero__tag">{t}</span>
                    ))}
                </div>

                <div className="dw-hero__actions">
                    <button className="dw-btn dw-btn--jade" onClick={() => scrollTo('duality')}>DUALITY INDEX</button>
                    <button className="dw-btn dw-btn--ghost" onClick={() => scrollTo('cipher')}>FIELD NOTES</button>
                </div>
            </section>

            {/* ── 01 IDENTITY ── */}
            <section id="identity" className="dw-id-section">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">01</div>
                        <h2 className="dw-sh__title">OPERATIVE FILE</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">忍</span>
                        <div className="dw-sh__line" />
                    </div>
                    <div className="dw-id-grid">
                        <div>
                            {/* ── CHARACTER PHOTO PLACEHOLDER ── */}
                            <div className="dw-id-photo">
                                <div className="dw-id-photo__corner dw-id-photo__corner--tl" />
                                <div className="dw-id-photo__corner dw-id-photo__corner--tr" />
                                <div className="dw-id-photo__corner dw-id-photo__corner--bl" />
                                <div className="dw-id-photo__corner dw-id-photo__corner--br" />
                                <div className="dw-id-photo__scan" />
                                <img
                                    src="/src/assets/Robin/op_file.jpg"
                                    alt="Damian Wayne"
                                    className="dw-id-photo__img"
                                />
                                <div className="dw-id-photo__glitch-r" aria-hidden="true" />
                                <div className="dw-id-photo__glitch-b" aria-hidden="true" />
                                <div className="dw-id-photo__scanlines" aria-hidden="true" />
                                <div className="dw-id-photo__noise" aria-hidden="true" />
                                <div className="dw-id-photo__tag">CLASSIFIED — OMEGA CLEARANCE</div>
                            </div>

                            <div className="dw-id-card">
                                <div className="dw-id-card__head">
                                    <span>LEAGUE OPERATIVE DOSSIER</span>
                                    <span className="dw-id-card__clearance">Ω OMEGA</span>
                                </div>
                                <div className="dw-id-card__body">
                                    <div className="dw-id-row"><span>ALIAS</span>       <strong>ROBIN / BATMAN II</strong></div>
                                    <div className="dw-id-row"><span>REAL NAME</span>   <strong>DAMIAN AL GHUL WAYNE</strong></div>
                                    <div className="dw-id-row"><span>PARENTS</span>     <strong>BRUCE WAYNE · TALIA AL GHUL</strong></div>
                                    <div className="dw-id-row"><span>STATUS</span>      <strong className="dw-id-status-a">● ACTIVE — ROBIN V</strong></div>
                                    <div className="dw-id-row"><span>THREAT</span>      <strong className="dw-id-status-e">ELITE — LEAGUE-TRAINED</strong></div>
                                    <div className="dw-id-row"><span>BASE</span>        <strong>GOTHAM — BATCAVE</strong></div>
                                    <div className="dw-id-row"><span>AFFILIATION</span> <strong>BAT-FAMILY · BATMAN INC.</strong></div>
                                </div>
                            </div>
                            <div className="dw-id-stats">
                                <div className="dw-id-stat"><div className="dw-id-stat__label">FIRST APPEARANCE</div><div className="dw-id-stat__value">Batman #655 (2006)</div></div>
                                <div className="dw-id-stat"><div className="dw-id-stat__label">BECAME ROBIN</div>    <div className="dw-id-stat__value">Batman #657 (2006)</div></div>
                                <div className="dw-id-stat"><div className="dw-id-stat__label">DEATH</div>           <div className="dw-id-stat__value">Batman Inc. #8 (2013)</div></div>
                                <div className="dw-id-stat"><div className="dw-id-stat__label">CREATED BY</div>      <div className="dw-id-stat__value">Grant Morrison</div></div>
                            </div>
                        </div>
                        <div className="dw-id-text">
                            <p className="dw-id-quote">&ldquo;I know what I am. I know what I was made to be. The question isn&apos;t whether I&apos;m dangerous. The question is what I do with it.&rdquo;</p>
                            <p>What makes Damian remarkable is not the training. Plenty of people have been trained by the League. What makes him remarkable is that he met Bruce Wayne at nine years old, decided his father&apos;s way was worth choosing, and has spent every day since proving it — not to anyone else, only to himself.</p>
                            <p>He is the most naturally gifted combatant in the history of the Robin mantle. He carries that weight with a seriousness that Dick Grayson never needed and Jason Todd eventually abandoned. Damian Wayne chose this. That is everything.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ NEW A: DUALITY INDEX ══════════════════════ */}
            <section id="duality" className="dw-duality-section">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">A</div>
                        <h2 className="dw-sh__title">THE DUALITY INDEX</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">二</span>
                        <div className="dw-sh__line" />
                    </div>

                    <div className="dw-duality__labels">
                        <div className="dw-duality__label-wayne">◀ WAYNE DOMINANCE</div>
                        <div className="dw-duality__label-sep">—</div>
                        <div className="dw-duality__label-league">LEAGUE DOMINANCE ▶</div>
                    </div>

                    <div ref={dualityRef}>
                        {DUALITY_DATA.map(d => (
                            <div key={d.aspect} className="dw-duality__item">
                                <div className="dw-duality__aspect">{d.aspect}</div>
                                <div className="dw-duality__bar-wrap">
                                    <div className="dw-duality__bar-l" style={{ width: dualityInView ? `${d.wayne}%` : '0%' }} />
                                    <div className="dw-duality__center" />
                                    <div className="dw-duality__bar-r" style={{ width: dualityInView ? `${d.league}%` : '0%' }} />
                                </div>
                            </div>
                        ))}
                        <div className="dw-duality__reading">
                            {dualityReading
                                ? '62% WAYNE ETHIC · PSYCHOGRAPHIC: SYNTHESIS ACHIEVED · THREAT MODIFIER: EXCEPTIONAL'
                                : 'CALCULATING PSYCHOGRAPHIC BALANCE...'}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 02 TRAINING ── */}
            <section id="training">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">02</div>
                        <h2 className="dw-sh__title">THE LEAGUE&apos;S WEAPON</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">武</span>
                        <div className="dw-sh__line" />
                    </div>
                    <div className="dw-train-grid">
                        <div>
                            <div className="dw-rings-grid">
                                {[
                                    { label: 'MARTIAL ARTS', value: 100, gold: false },
                                    { label: 'ASSASSINATION', value: 98, gold: true },
                                    { label: 'STEALTH', value: 99, gold: false },
                                    { label: 'SWORDSMANSHIP', value: 100, gold: true },
                                    { label: 'ACROBATICS', value: 97, gold: false },
                                    { label: 'INTELLIGENCE', value: 95, gold: false },
                                ].map((s, i) => (
                                    <CircleSkill key={s.label} label={s.label} value={s.value} gold={s.gold} index={i} />
                                ))}
                            </div>
                            <div className="dw-mentors">
                                <div className="dw-mentors__title">TRAINED BY</div>
                                {[
                                    { tag: 'BATMAN', desc: 'Detective methodology, restraint, no-kill code, Gotham fieldwork' },
                                    { tag: "RA'S AL GHUL", desc: 'Empire strategy, psychological warfare, extended combat endurance' },
                                    { tag: 'TALIA AL GHUL', desc: 'League assassination forms, poison synthesis, stealth infiltration' },
                                    { tag: 'LEAGUE MASTERS', desc: '14 martial arts including Ninjutsu, Muay Thai, Silat, Krav Maga' },
                                    { tag: 'DICK GRAYSON', desc: 'Acrobatics, team leadership, emotional intelligence — reluctantly' },
                                ].map(m => (
                                    <div className="dw-mentor" key={m.tag}>
                                        <span className="dw-mentor__tag">{m.tag}</span>
                                        <span className="dw-mentor__desc">{m.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <blockquote style={{ fontFamily: "'Crimson Pro',serif", fontStyle: 'italic', fontSize: '1.25rem', lineHeight: '1.85', color: '#8ac898', borderLeft: '2px solid #1d7a32', paddingLeft: '20px', marginBottom: '40px' }}>
                                &ldquo;He trained from birth. By age four he was sparring adults. By eight he was winning. The League does not produce soldiers — it produces instruments.&rdquo;
                            </blockquote>
                            <p style={{ fontFamily: "'Oswald',sans-serif", fontSize: '1rem', fontWeight: 300, lineHeight: '1.9', color: '#6a846a' }}>
                                Bruce Wayne could not match the League&apos;s training breadth — but he showed Damian what to do with it. The discipline was already there. The direction changed. The result: League precision, Bat-Family restraint — and the knowledge to choose between them in real time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ NEW B: KATANA SKILL TREE ══════════════════ */}
            <section id="skills">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">B</div>
                        <h2 className="dw-sh__title">KATANA SKILL TREE</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">刀</span>
                        <div className="dw-sh__line" />
                    </div>
                    <div className="dw-katana-tree" ref={skillRef}>
                        {/* SVG Katana */}
                        <div className="dw-katana-tree__svg-wrap">
                            <svg width="44" height="320" viewBox="0 0 44 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <filter id="kt-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                                </defs>
                                <polygon points="22,0 26,260 22,270 18,260" fill="#1d1d1d" stroke="#28a044" strokeWidth="0.8" filter="url(#kt-glow)" opacity="0.9" />
                                <line x1="22" y1="4" x2="24" y2="255" stroke="#fff" strokeWidth="0.5" opacity="0.15" />
                                <rect x="16" y="258" width="12" height="8" fill="#b89030" opacity="0.7" />
                                <ellipse cx="22" cy="272" rx="18" ry="5" fill="none" stroke="#d4a840" strokeWidth="1.2" />
                                <ellipse cx="22" cy="272" rx="10" ry="3" fill="#d4a84020" stroke="#b89030" strokeWidth="0.6" />
                                {[280, 287, 294, 301].map(y => <line key={y} x1="18" y1={y} x2="26" y2={y} stroke="#6a4a1a" strokeWidth="2.5" />)}
                                <ellipse cx="22" cy="312" rx="7" ry="4" fill="#b89030" opacity="0.8" />
                                {[{ y: 60, o: 0.8 }, { y: 120, o: 0.7 }, { y: 180, o: 0.7 }, { y: 230, o: 0.6 }].map((d, i) =>
                                    <circle key={i} cx="22" cy={d.y} r="2.5" fill="#28a044" opacity={d.o} />
                                )}
                            </svg>
                        </div>
                        {/* Skill branches */}
                        <div className="dw-katana-tree__right">
                            {SKILL_GROUPS.map(group => (
                                <div key={group.label}>
                                    <div className="dw-katana-tree__group-label">{group.label}</div>
                                    {group.skills.map((skill, i) => (
                                        <div key={skill.name} className="dw-katana-tree__branch">
                                            <div className="dw-katana-tree__skill-name">{skill.name}</div>
                                            <div className="dw-katana-tree__bar-wrap">
                                                <div className="dw-katana-tree__bar">
                                                    <div
                                                        className={`dw-katana-tree__fill dw-katana-tree__fill--${group.color}`}
                                                        style={{ width: skillInView ? `${skill.pct}%` : '0%', transitionDelay: skillInView ? `${i * 80}ms` : '0ms' }}
                                                    />
                                                </div>
                                                <div className="dw-katana-tree__pct">{skill.pct}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <p className="dw-katana-tree__note">Each skill represents mastery built before most people begin training. The restraint entries are the hardest won.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 03 CODE ── */}
            <section id="code" className="dw-scroll-section">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">03</div>
                        <h2 className="dw-sh__title">THE ASSASSIN&apos;S CODE</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">義</span>
                        <div className="dw-sh__line" />
                    </div>
                    <div className="dw-scrolls">
                        {PHILOSOPHY.map((rule) => <ScrollCard key={rule.n} rule={rule} />)}
                    </div>
                </div>
            </section>

            {/* ══ NEW C: ENCRYPTED FIELD NOTES ═════════════ */}
            <section id="cipher">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">C</div>
                        <h2 className="dw-sh__title">ENCRYPTED FIELD NOTES</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">秘</span>
                        <div className="dw-sh__line" />
                    </div>
                    <p className="dw-cipher__intro">TRANSMISSION ENCRYPTED — TAP CELL TO DECODE — LEAGUE CIPHER PROTOCOL IV</p>
                    <div className="dw-cipher__grid">
                        {CIPHER_DATA.map(c => <CipherRow key={c.label} data={c} />)}
                    </div>
                </div>
            </section>

            {/* ── 04 ARSENAL ── */}
            <section id="arsenal">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">04</div>
                        <h2 className="dw-sh__title">ARSENAL</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">刀</span>
                        <div className="dw-sh__line" />
                    </div>
                    <div className="dw-armory">
                        {WEAPONS.map(w => (
                            <div className="dw-arm-card" key={w.name}>
                                <span className="dw-arm-card__icon">{w.icon}</span>
                                <div className="dw-arm-card__name">{w.name}</div>
                                <p className="dw-arm-card__desc">{w.desc}</p>
                                <div className="dw-arm-card__tag">{w.tag}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 05 MISSIONS ── */}
            <section id="missions">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">05</div>
                        <h2 className="dw-sh__title">FIELD OPERATIONS</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">命</span>
                        <div className="dw-sh__line" />
                    </div>
                    <div className="dw-briefs">
                        {MISSIONS.map(m => (
                            <div className="dw-brief" key={m.id}>
                                <div className="dw-brief__head">
                                    <span className="dw-brief__id">{m.id}</span>
                                    <span className={`dw-brief__threat dw-t--${m.threat.toLowerCase()}`}>{m.threat}</span>
                                </div>
                                <div className="dw-brief__body">
                                    <div className="dw-brief__city">{m.city}</div>
                                    <div className="dw-brief__title">{m.title}</div>
                                    <p className="dw-brief__desc">{m.desc}</p>
                                    <div className="dw-brief__foot">
                                        <span className="dw-brief__status">STATUS: {m.status}</span>
                                        <span className={`dw-brief__light dw-brief__light--${m.light}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 06 ROGUES ── */}
            <section id="rogues" className="dw-targets-section">
                <div className="dw-wrap">
                    <div className="dw-sh dw-rv">
                        <div className="dw-sh__num">06</div>
                        <h2 className="dw-sh__title">TARGET ACQUISITION</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">敵</span>
                        <div className="dw-sh__line" />
                    </div>
                    <p className="dw-targets-intro dw-rv">
                        Damian Wayne&apos;s enemies are not random criminals. They are the people who built him, the people who want to reclaim him, and the dark mirrors that show what he almost became. Every confrontation is personal.
                    </p>
                    <div className="dw-targets-grid">
                        {VILLAINS.map((v, i) => <TargetCard key={v.name} villain={v} index={i} />)}
                    </div>
                </div>
            </section>

            {/* ══ NEW D: BAT-FAMILY WEB ═════════════════════ */}
            <section id="family">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">D</div>
                        <h2 className="dw-sh__title">BAT-FAMILY RELATIONSHIP WEB</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">絆</span>
                        <div className="dw-sh__line" />
                    </div>
                    <div className="dw-web__legend">
                        {[{ label: 'ALLY', color: '#28a044' }, { label: 'COMPLEX', color: '#d4a840' }, { label: 'RIVAL', color: '#8b1515' }].map(l => (
                            <div key={l.label} className="dw-web__legend-item">
                                <div className="dw-web__legend-dot" style={{ background: l.color, boxShadow: `0 0 8px ${l.color}` }} />
                                {l.label}
                            </div>
                        ))}
                    </div>
                    <div className="dw-web__grid">
                        {FAMILY_DATA.map(f => (
                            <div key={f.name} className={`dw-web__card${f.center ? ' dw-web__card--center' : ''}`}>
                                <div className="dw-web__card-dot" style={{ background: f.dotColor, color: f.dotColor }} />
                                <div className="dw-web__card-name">{f.name}</div>
                                <div className="dw-web__card-alias">{f.alias}</div>
                                <div className="dw-web__card-rel" style={{ color: f.relColor, borderColor: `${f.relColor}30` }}>{f.rel}</div>
                                <p className="dw-web__card-note">{f.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ FIRST EDITION COVERS ══════════════════════ */}
            <section id="covers" className="dw-covers-section">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">E</div>
                        <h2 className="dw-sh__title">FIRST EDITIONS</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">典</span>
                        <div className="dw-sh__line" />
                    </div>
                    <p className="dw-covers-intro">
                        The key issues that defined Damian Wayne — from his first appearance in 2006 to the death that proved he was more than what he was made to be. Replace the placeholders below with your own cover scans or art.
                    </p>
                    <div className="dw-covers-grid">
                        {FIRST_EDITIONS.map((c, i) => (
                            <div className="dw-cover-card" key={c.issue}>
                                {/* Cover image placeholder */}
                                <div className="dw-cover-card__img">
                                    <img src={c.img} alt={c.title} className="dw-cover-card__real-img" />
                                    <div className="dw-cover-card__corner dw-cover-card__corner--tl" />
                                    <div className="dw-cover-card__corner dw-cover-card__corner--tr" />
                                    <div className="dw-cover-card__corner dw-cover-card__corner--bl" />
                                    <div className="dw-cover-card__corner dw-cover-card__corner--br" />
                                    <div className="dw-cover-card__img-scan" />
                                    <div className="dw-cover-card__stamp">{c.stamp}</div>
                                </div>
                                {/* Info */}
                                <div className="dw-cover-card__info">
                                    <div className="dw-cover-card__issue">{c.issue} · {c.year}</div>
                                    <div className="dw-cover-card__title">{c.title}</div>
                                    <div className="dw-cover-card__meta">
                                        W: {c.writer}<br />
                                        A: {c.artist}
                                    </div>
                                    <div className="dw-cover-card__sig">{c.note}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 07 LEGACY ── */}
            <section id="legacy">
                <div className="dw-wrap dw-rv">
                    <div className="dw-sh">
                        <div className="dw-sh__num">07</div>
                        <h2 className="dw-sh__title">THE LIFE OF DAMIAN WAYNE</h2>
                        <span className="dw-sh__kanji" aria-hidden="true">史</span>
                        <div className="dw-sh__line" />
                    </div>
                    <div className="dw-chronicle">
                        {TIMELINE.map(e => (
                            <div className="dw-chron-item" key={`${e.year}-${e.tag}`}>
                                <div className="dw-chron-year">{e.year}</div>
                                <div className={`dw-chron-dot${e.dot !== 'default' ? ` dw-chron-dot--${e.dot}` : ''}`} />
                                <div className="dw-chron-content">
                                    <span className="dw-chron-tag">{e.tag}</span>
                                    <div className="dw-chron-title">{e.title}</div>
                                    <p>{e.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CREED ── */}
            <section className="dw-creed">
                <div className="dw-creed__rule" />
                <blockquote>
                    &ldquo;I don&apos;t need your approval. I don&apos;t need your code. I have my own. My father taught me what to fight for. My mother taught me how. And I decided which one matters.&rdquo;
                    <cite>— Damian Wayne / Robin V</cite>
                </blockquote>
                <div className="dw-creed__rule" />
            </section>

            {/* ── REVIEW ── */}
            <ReviewSection character="damian" />

            {/* ── FOOTER ── */}
            <footer className="dw-footer">
                <div>
                    <div className="dw-footer__logo">✦ DAMIAN WAYNE</div>
                    <div className="dw-footer__sub">SON OF BATMAN · ROBIN V · LEAGUE-TRAINED · GOTHAM&apos;S FINEST</div>
                </div>
                {onBack && <button className="dw-btn dw-btn--ghost" onClick={onBack}>← CHANGE GUARDIAN</button>}
                <div className="dw-footer__copy">© DC COMICS · DAMIAN WAYNE 2006 · GRANT MORRISON</div>
                <div className="dev-credit">
                    <span className="dev-credit__label">Developed by</span>
                    <span className="dev-credit__name" style={{ color: '#28a044' }}>Nihan</span>
                </div>
            </footer>
        </div>
    );
}