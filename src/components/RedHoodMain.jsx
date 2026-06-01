import { useState, useEffect, useRef } from 'react';
import '../styles/redhood-main.css';
import ReviewSection from './ReviewSection';

import redHoodImg from '../assets/RedHood/redhood.png';
import jokerImg from '../assets/RedHood/Villains/joker.jpg';
import blackMaskImg from '../assets/RedHood/Villains/blackmask.jpg';
import batmanImg from '../assets/RedHood/Villains/batman.jpg';
import deathstrokeImg from '../assets/RedHood/Villains/deathstroke.jpg';

// ─────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────

const ABILITIES = [
    { label: 'Combat Proficiency', pct: 97 },
    { label: 'Marksmanship', pct: 99 },
    { label: 'Tactical Intelligence', pct: 94 },
    { label: 'Survivability', pct: 98 },
    { label: 'Stealth', pct: 90 },
    { label: 'Pain Tolerance', pct: 100 },
];

const PHILOSOPHY = [
    {
        n: '01',
        title: 'Killers Deserve to Die',
        desc: "Batman refuses to kill and calls it justice. Jason calls it cowardice. If you put a monster back on the street, the blood of his next victim is on your hands. Jason Todd ended the cycle. Not with faith in the system — with a bullet. Every murderer he removes from the world is a life saved. Batman can lecture him from the moral high ground all he wants. Red Hood will do what needs to be done.",
    },
    {
        n: '02',
        title: 'Fear Without Rules',
        desc: "Batman uses fear as a tool but chains himself with a no-kill rule. Red Hood uses fear without the leash. When criminals know the Red Hood is hunting them, they know there is no arrest coming. No rehabilitation. No second chance. The terror this creates is more effective than any bat-symbol ever cast into the sky. Real fear has consequences.",
    },
    {
        n: '03',
        title: "Control the Crime, Don't Pretend to End It",
        desc: "Gotham will always have crime. Batman's war is a fantasy — you cannot eliminate evil from a city like Gotham. Jason learned the hard way what happens when you believe the fairy tale. His approach is surgical: control the narcotics trade, regulate the violence, eliminate the sadists. Keep the poison from reaching children. It's not clean. It was never supposed to be.",
    },
    {
        n: '04',
        title: 'Loyalty Is Earned, Not Inherited',
        desc: "Bruce Wayne took in a grieving street kid and told him he was family. He sent that family to die and chose the Joker's life over his. Jason owes the Batman nothing. Every ally he keeps now is one who has earned it through fire and blood — not through obligation or legacy. The Bat-Family is a myth. Red Hood has a crew.",
    },
    {
        n: '05',
        title: "The Cowl Doesn't Make You Right",
        desc: "The Batman is not a god. He is a man in a costume who has made one catastrophically wrong decision for decades and convinced himself it is a principle. Jason Todd is done being defined by what Batman thinks of him. The cape was never his identity. The hood is.",
    },
];

const WEAPONS = [
    { icon: '🔫', name: 'Dual Pistols', desc: "Twin semi-automatic handguns with custom armour-piercing ammunition. His trademark departure from Batman's no-firearms rule. He fires because he means it.", tag: 'Lethal Force' },
    { icon: '🔴', name: 'The Red Hood', desc: 'Bulletproof helmet with HUD, scanner, voice modulator, and gas filter. A deliberate psychological weapon — identical to the mask Joker wore the night he became what he is.', tag: 'Armour / Symbol' },
    { icon: '⚔️', name: 'Tactical Knife', desc: 'Combat blade carried at all times. Ceramic coated, non-metallic, undetectable by scanners. Used in close quarters when silence is required.', tag: 'Close Combat' },
    { icon: '💣', name: 'Explosive Ordnance', desc: 'Custom fragmentation grenades, EMP devices, and det-cord. Jason is a demolitions expert — a skill honed during his years of global mercenary training.', tag: 'Demolitions' },
    { icon: '🛡️', name: 'Combat Suit', desc: 'Titanium-reinforced body armour with integrated trauma kit. Designed to absorb punishment — because Jason Todd already knows exactly how much the human body can take.', tag: 'Defence' },
    { icon: '🎯', name: 'League Training', desc: 'Resurrected via the Lazarus Pit and trained by Talia al Ghul and the League of Assassins. His martial arts mastery rivals Bruce Wayne himself — without the restraint.', tag: 'Mastery' },
];

const VILLAINS = [
    {
        name: 'THE JOKER',
        alias: 'The Clown Prince of Crime',
        role: 'The Man Who Killed Him',
        threat: 'EXTREME',
        tag: 'PERSONAL',
        desc: "The one enemy Jason cannot kill. Not because he lacks the will — he has put a gun to Joker's head. But because Batman will always intervene. The Joker is the proof of everything Jason believes is wrong with Bruce Wayne's code. He is the wound that never closed. The ghost that drives every decision the Red Hood has ever made.",
        img: jokerImg,
    },
    {
        name: 'BLACK MASK',
        alias: 'Roman Sionis',
        role: "Gotham's Crime Lord",
        threat: 'CRITICAL',
        tag: 'RIVAL',
        desc: "The man who tried to fill the power vacuum Jason created when he dismantled Gotham's crime families — and did it poorly. Black Mask is everything wrong with conventional criminal empire: vicious without vision, brutal without purpose. Jason has dismantled his operations four times. Sionis keeps rebuilding. The war is ongoing.",
        img: blackMaskImg,
    },
    {
        name: 'BATMAN',
        alias: 'Bruce Wayne',
        role: 'The Man Who Let Him Die',
        threat: 'HIGH',
        tag: 'NEMESIS',
        desc: "Not a villain in the traditional sense. But the man whose choice — whose single deliberate refusal to end the Joker — led to Jason Todd's death. Every confrontation between them is the same argument wearing different costumes: was the no-kill rule worth more than Jason's life? Bruce still believes yes. Jason will never forgive him.",
        img: batmanImg,
    },
    {
        name: 'DEATHSTROKE',
        alias: 'Slade Wilson',
        role: "The World's Greatest Assassin",
        threat: 'CRITICAL',
        tag: 'CONTRACT',
        desc: "The only person Jason respects and genuinely fears in equal measure. Deathstroke has been hired against Red Hood multiple times, usually by parties whose criminal operations Jason has destroyed. Their encounters are brutal, technical, and expensive for both of them. Neither has achieved a clean win.",
        img: deathstrokeImg,
    },
];

// Simple flat list — avoids all the broken CSS-grid inline-style tricks
const DEATH_EVENTS = [
    {
        side: 'left',
        tag: 'THE MISSION',
        title: 'Following a Ghost',
        brutal: false,
        text: "Jason discovers his biological mother, Sheila Haywood, is alive and working in Africa. He doesn't tell Bruce. He just goes. He is sixteen years old and desperately wants something that was taken from him — a mother. He is about to learn that some things are taken for a reason.",
    },
    {
        side: 'right',
        tag: 'THE BETRAYAL',
        title: 'Sold by His Own Blood',
        brutal: false,
        text: "Sheila Haywood has already made a deal with the Joker. Her son's location, in exchange for her own life. She takes the deal. She tells the Joker. She watches them drag her boy away. Some wounds are inflicted by strangers. This one came from family.",
    },
    {
        side: 'left',
        tag: 'THE WAREHOUSE — THE MOMENT',
        title: 'The Clown. The Crowbar.',
        brutal: true,
        text: "The Joker beats Jason Todd with a crowbar. He is methodical. There is no frenzy. He takes his time. Jason is strong — he was trained by Batman — but he is sixteen and broken and his hands are tied. He does not beg. He screams. The Joker laughs. He beats him until the laughter is the only sound in the warehouse. Then he sets a timer on a bomb and walks away.",
    },
    {
        side: 'right',
        tag: 'THE CHOICE',
        title: 'He Shields Her',
        brutal: false,
        text: "Jason's mother is also in the warehouse. Despite everything — despite the betrayal — Jason tries to shield her with his body when the bomb goes off. The explosion kills them both. This is who he was: a boy who still believed in something, even in the last moment he had left. Batman arrives. Minutes too late. He finds the body of his son.",
    },
    {
        side: 'left',
        tag: 'THE AFTERMATH',
        title: 'The Choice Batman Made',
        brutal: false,
        text: "Batman catches the Joker. He is broken with grief. He has his hands around the Joker's throat. He does not kill him. He puts him in Arkham. The Joker escapes. Again. As he always does. The memorial case in the Batcave — Robin's uniform, behind glass — is Bruce Wayne's monument to the single worst decision of his career. Jason doesn't see it that way. Jason sees it as proof of what Batman really is.",
    },
    {
        side: 'right',
        tag: 'THE QUESTION',
        title: 'Was the Rule Worth It?',
        brutal: false,
        text: "This is the wound that never closes. This is the argument at the heart of everything Jason Todd has done since he came back from the dead. Batman had a choice: end the Joker, or let him live. He let him live. A boy is dead because of it. And the Joker? He's still out there. Still laughing. Batman calls it principle. Jason calls it by a different name.",
    },
];

const TIMELINE = [
    { year: '1983', tag: 'ORIGIN', death: false, title: 'Born to Ruin', text: "Jason Peter Todd is born to Willis Todd and Sheila Haywood — a petty criminal and an absent mother who abandoned him. He grows up in Gotham's Crime Alley, learning to survive before he learns to read. By nine he is stealing to eat. By twelve he is running numbers for street gangs." },
    { year: '1987', tag: 'DISCOVERY', death: false, title: "The Boy Who Stole the Batmobile's Tires", text: "Batman catches Jason Todd attempting to strip the tires off the Batmobile. Most would expect punishment. Bruce Wayne sees something else — a reckless fearlessness he recognises from a mirror. He takes the boy in. Against Alfred's cautious counsel. Against every rational instinct. He makes him Robin." },
    { year: '1988', tag: 'THE HUNT', death: false, title: "The Mother's Trap", text: "Jason discovers his biological mother Sheila Haywood is alive, working in Ethiopia with a humanitarian organisation. He runs away from Wayne Manor to find her — without telling Bruce. What he finds is a woman who has already sold him to the Joker in exchange for her own life. The warehouse in Qurac becomes his execution chamber." },
    { year: '1988', tag: 'DEATH — A DEATH IN THE FAMILY', death: true, title: 'The Crowbar. The Bomb. The Silence.', text: "The Joker beats Jason Todd with a crowbar. Not quickly. Not mercifully. He takes his time. He laughs. When Jason is broken and bleeding on the warehouse floor, the Joker leaves a bomb with a timer. Jason tries to shield his mother with his body. The explosion kills them both. Batman arrives minutes too late. He finds a boy — his son, in every way that matters — dead in the rubble. He carries him out and does nothing. The Joker goes on living." },
    { year: '2005', tag: 'RESURRECTION', death: false, title: 'Lazarus Rises', text: "Ra's al Ghul, feeling guilt for his role in Batman's grief, submerges Jason Todd's corpse in a Lazarus Pit. Jason comes back. Not cleanly. Not sanely. The Pit gives life but takes something irreplaceable in return — a fracture in the mind that never fully heals. He wanders the world alone, consumed by rage, memory, and questions. Why didn't Bruce come for him? Why is the Joker still breathing?" },
    { year: '2005', tag: 'TRAINING', death: false, title: "The League's Weapon", text: "Talia al Ghul finds Jason and arranges training under the League of Assassins — the same organisation that trained Bruce Wayne. Jason exceeds every expectation. He has the Batman's discipline without the Batman's mercy. He becomes a ghost. A weapon. A man who is exactly what Bruce was afraid Robin might become." },
    { year: '2006', tag: 'RETURN', death: false, title: 'Under the Hood', text: "Jason Todd returns to Gotham under the alias Red Hood — the name the Joker wore at the chemical plant where he fell into the vat that made him. It is not a coincidence. It is a statement. He dismantles Gotham's drug trade, installs himself as its controller, and leaves a bag containing the heads of seven Black Mask operatives on a table. He has come home. Gotham will never be the same." },
    { year: 'NOW', tag: 'PRESENT', death: false, title: 'Still Standing', text: "Red Hood operates across Gotham, Bludhaven, and wherever the mission demands. He has saved lives Batman refused to end villains to protect. He has done things Bruce Wayne will never sanction. He has no apologies. He is the Robin who was failed — and the weapon that failure forged. Jason Todd died once. He won't again." },
];

// ─────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────

function CrosshairCursor() {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0 });
    const trailPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);

    useEffect(() => {
        const onMove = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; };
        const animate = () => {
            trailPos.current.x += (posRef.current.x - trailPos.current.x) * 0.1;
            trailPos.current.y += (posRef.current.y - trailPos.current.y) * 0.1;
            if (cursorRef.current)
                cursorRef.current.style.transform = `translate(${posRef.current.x}px,${posRef.current.y}px) translate(-50%,-50%)`;
            if (trailRef.current)
                trailRef.current.style.transform = `translate(${trailPos.current.x}px,${trailPos.current.y}px) translate(-50%,-50%) scale(1.5)`;
            rafRef.current = requestAnimationFrame(animate);
        };
        window.addEventListener('mousemove', onMove);
        rafRef.current = requestAnimationFrame(animate);
        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current); };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="rh-cursor">
                <div className="rh-cursor__inner">
                    <div className="rh-cursor__ring" />
                    <div className="rh-cursor__dot" />
                </div>
            </div>
            <div ref={trailRef} className="rh-cursor rh-cursor--trail">
                <div className="rh-cursor__inner" />
            </div>
        </>
    );
}

// Width animated via React state — not CSS animation — so the bar
// actually triggers after the IntersectionObserver fires.
function AbilityBar({ label, pct, delay }) {
    const [triggered, setTriggered] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setTriggered(true), delay); obs.disconnect(); } },
            { threshold: 0.5 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);

    return (
        <div className="rh-ability" ref={ref}>
            <div className="rh-ability__header">
                <span className="rh-ability__label">{label}</span>
                <span className="rh-ability__pct">{triggered ? pct : 0}%</span>
            </div>
            <div className="rh-ability__track">
                <div
                    className="rh-ability__fill"
                    style={{
                        width: triggered ? `${pct}%` : '0%',
                        transition: triggered
                            ? `width 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
                            : 'none',
                    }}
                />
            </div>
        </div>
    );
}

// Villain row — uses villain.img directly (real image), slides in on scroll
function VillainRow({ villain, index }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
            { threshold: 0.12 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            className="rh-villain-row"
            ref={ref}
            style={{ transitionDelay: `${index * 0.06}s` }}
        >
            <div className="rh-villain-row__img-wrap">
                <img
                    src={villain.img}
                    alt={villain.name}
                    className="rh-villain-row__img"
                />
                <div className="rh-villain-row__img-overlay" />
                <div className={`rh-villain-row__threat rh-threat--${villain.threat.toLowerCase()}`}>
                    ● {villain.threat}
                </div>
                <div className="rh-villain-row__tag">{villain.tag}</div>
            </div>
            <div className="rh-villain-row__body">
                <div className="rh-villain-row__name">{villain.name}</div>
                <div className="rh-villain-row__alias">{villain.alias}</div>
                <div className="rh-villain-row__role">{villain.role}</div>
                <p className="rh-villain-row__desc">{villain.desc}</p>
            </div>
        </div>
    );
}

// Death timeline as a simple vertical list — no broken CSS-grid shenanigans
function DeathEvent({ event }) {
    return (
        <div className={`rh-death-event rh-death-event--${event.side}`}>
            <div className={`rh-death-event__dot${event.brutal ? ' rh-death-event__dot--fatal' : ''}`} />
            <div className="rh-death-event__content">
                <div className="rh-death-event__tag">{event.tag}</div>
                <div className="rh-death-event__title">{event.title}</div>
                <p className={`rh-death-event__text${event.brutal ? ' brutal' : ''}`}>{event.text}</p>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────

// ── Fatson Easter Egg ─────────────────────────────────────────────────────────
function FatsonEasterEgg({ active }) {
    if (!active) return null;
    return (
        <div className="rh-fatson-roller">
            <svg className="rh-fatson-svg" viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg" aria-label="Fatson Todd">
                <ellipse cx="60" cy="75" rx="46" ry="44" fill="#c8a87a" />
                <path d="M28 72 Q60 85 92 72 Q92 95 60 100 Q28 95 28 72Z" fill="#cc0000" />
                <ellipse cx="14" cy="82" rx="10" ry="8" fill="#c8a87a" transform="rotate(-20 14 82)" />
                <ellipse cx="106" cy="82" rx="10" ry="8" fill="#c8a87a" transform="rotate(20 106 82)" />
                <ellipse cx="44" cy="116" rx="11" ry="9" fill="#555" />
                <ellipse cx="76" cy="116" rx="11" ry="9" fill="#555" />
                <ellipse cx="60" cy="42" rx="34" ry="30" fill="#cc0000" />
                <rect x="30" y="44" width="60" height="11" rx="4" fill="#222" />
                <ellipse cx="45" cy="28" rx="8" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-20 45 28)" />
                <circle cx="46" cy="49" r="5" fill="#fff" />
                <circle cx="74" cy="49" r="5" fill="#fff" />
                <circle cx="47" cy="49" r="2.5" fill="#111" />
                <circle cx="75" cy="49" r="2.5" fill="#111" />
                <circle cx="48" cy="48" r="1" fill="#fff" />
                <circle cx="76" cy="48" r="1" fill="#fff" />
                <rect x="2" y="86" width="10" height="5" rx="2" fill="#444" transform="rotate(-10 2 86)" />
                <rect x="108" y="86" width="10" height="5" rx="2" fill="#444" transform="rotate(10 108 86)" />
            </svg>
        </div>
    );
}

const NAV_ITEMS = ['identity', 'fallen', 'philosophy', 'conflict', 'arsenal', 'rogues', 'legacy'];

export default function RedHoodMain({ onBack }) {
    const [navOpen, setNavOpen] = useState(false);
    const [fatsonActive, setFatsonActive] = useState(false);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setNavOpen(false);
    };

    useEffect(() => {
        // Scroll-reveal
        const revealEls = document.querySelectorAll('.rh-reveal');
        const revealObs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } }),
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );
        revealEls.forEach((el) => revealObs.observe(el));

        // Code-rule underline (JS-controlled so it fires reliably)
        const codeObs = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    const line = e.target.querySelector('.rh-code-rule__line');
                    if (line) { line.style.transition = 'width 0.8s cubic-bezier(0.2,0,0,1) 0.2s'; line.style.width = '100%'; }
                    codeObs.unobserve(e.target);
                }
            }),
            { threshold: 0.3 }
        );
        document.querySelectorAll('.rh-code-rule').forEach((r) => codeObs.observe(r));

        // Nav hide-on-scroll-down
        const nav = document.querySelector('.rh-nav');
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            if (nav) {
                const hide = y > lastY && y > 100;
                nav.style.transform = hide ? 'translateY(-100%)' : 'translateY(0)';
                nav.style.opacity = hide ? '0' : '1';
            }
            lastY = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => { revealObs.disconnect(); codeObs.disconnect(); window.removeEventListener('scroll', onScroll); };
    }, []);

    useEffect(() => {
        const buf = [];
        const TARGET = 'fatson';
        const onKey = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
            if (e.key.length === 1) buf.push(e.key.toLowerCase());
            if (buf.length > TARGET.length) buf.shift();
            if (buf.join('') === TARGET) {
                buf.length = 0;
                setFatsonActive(true);
                setTimeout(() => setFatsonActive(false), 3000);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <div className="rh-main">
            <CrosshairCursor />

            {/* ── NAV ── */}
            <nav className="rh-nav" style={{ transition: 'transform 0.2s ease, opacity 0.2s ease' }}>
                <div className="rh-nav__logo">
                    <svg viewBox="0 0 80 80" width="28" aria-hidden="true">
                        <circle cx="40" cy="40" r="36" stroke="#cc0000" strokeWidth="2.5" fill="none" />
                        <text x="40" y="52" textAnchor="middle" fontFamily="Bebas Neue, sans-serif" fontSize="32" fill="#cc0000">R</text>
                    </svg>
                    RED HOOD
                </div>

                <div className={`rh-nav__links${navOpen ? ' open' : ''}`}>
                    {NAV_ITEMS.map((s) => (
                        <button key={s} className="rh-nav__link" onClick={() => scrollTo(s)}>
                            {s.toUpperCase()}
                        </button>
                    ))}
                </div>

                {onBack && (
                    <button className="rh-nav__back" onClick={onBack}>← CHANGE GUARDIAN</button>
                )}

                <button className="rh-nav__toggle" aria-label="Toggle nav" onClick={() => setNavOpen((o) => !o)}>
                    <span /><span /><span />
                </button>
            </nav>

            {/* ── HERO ── */}
            <section className="rh-hero">
                <div className="rh-hero__bg-bleed" />
                <div className="rh-hero__bg-vignette" />

                {/* Glitch lines — animationDuration / animationDelay as inline styles
                    instead of CSS custom properties, which React does NOT forward */}
                <div className="rh-hero__glitch-lines" aria-hidden="true">
                    {[15, 32, 48, 67, 81].map((top, i) => (
                        <div
                            key={i}
                            className="rh-hero__glitch-line"
                            style={{
                                top: `${top}%`,
                                animationDuration: `${6 + i * 1.5}s`,
                                animationDelay: `${i * 0.8}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="rh-hero__content">
                    <div className="rh-hero__warning">
                        <div className="rh-hero__warning-dot" />
                        GOTHAM CITY — CLASSIFIED — LETHAL OPERATIVE — HANDLE WITH EXTREME CAUTION
                    </div>

                    <h1 className="rh-hero__title">
                        <span className="rh-hero__title-the">THE</span>
                        <span className="rh-hero__title-main">RED HOOD</span>
                        <span className="rh-hero__title-sub">JASON PETER TODD — SECOND ROBIN — RESURRECTED</span>
                    </h1>

                    <div className="rh-hero__divider" />

                    <p className="rh-hero__tagline">
                        He was Robin.<br />
                        He was beaten to death with a crowbar by the Joker.<br />
                        Batman chose not to kill his murderer.<br />
                        Jason Todd has never forgotten that.
                    </p>

                    <div className="rh-hero__actions">
                        <button className="rh-btn rh-btn--primary" onClick={() => scrollTo('fallen')}>THE CROWBAR</button>
                        <button className="rh-btn rh-btn--ghost" onClick={() => scrollTo('philosophy')}>HIS CODE</button>
                    </div>
                </div>

                {/* Hero image — real asset */}
                <div className="rh-hero__visual">
                    <div className="rh-hero__red-fog" />
                    <img src={redHoodImg} alt="Red Hood" className="rh-hero__img" />
                </div>
            </section>

            {/* ── 01 IDENTITY ── */}
            <section id="identity">
                <div className="rh-section rh-reveal">
                    <div className="rh-section__header">
                        <div className="rh-section__num">01</div>
                        <h2 className="rh-section__title">OPERATIVE FILE</h2>
                        <div className="rh-section__line" />
                    </div>
                    <div className="rh-identity__grid">
                        <div>
                            <div className="rh-dossier">
                                <div className="rh-dossier__header">
                                    <span>GCPD / BATMAN INC. CLASSIFIED DOSSIER</span>
                                    <span className="rh-dossier__header-clearance">CLEARANCE: LETHAL</span>
                                </div>
                                <div className="rh-dossier__body">
                                    <div className="rh-dossier__photo">RH</div>
                                    <div className="rh-dossier__details">
                                        <div className="rh-dossier__row"><span>ALIAS</span>       <strong>RED HOOD</strong></div>
                                        <div className="rh-dossier__row"><span>REAL NAME</span>   <strong>JASON PETER TODD</strong></div>
                                        <div className="rh-dossier__row"><span>FORMER ID</span>   <strong>ROBIN II</strong></div>
                                        <div className="rh-dossier__row"><span>STATUS</span>      <strong className="rh-status-active">● ACTIVE / ROGUE</strong></div>
                                        <div className="rh-dossier__row"><span>LEGAL STATUS</span><strong>PRESUMED DECEASED</strong></div>
                                        <div className="rh-dossier__row"><span>THREAT LEVEL</span><strong className="rh-status-kia">LETHAL — DO NOT ENGAGE ALONE</strong></div>
                                        <div className="rh-dossier__row"><span>BASE</span>        <strong>GOTHAM CITY — MOBILE</strong></div>
                                        <div className="rh-dossier__row"><span>AFFILIATION</span> <strong>OUTLAWS / INDEPENDENT</strong></div>
                                    </div>
                                </div>
                            </div>
                            <div className="rh-stats-grid">
                                <div className="rh-stat-item"><div className="rh-stat-item__label">FIRST APPEARANCE</div><div className="rh-stat-item__value">Batman #357 (1983)</div></div>
                                <div className="rh-stat-item"><div className="rh-stat-item__label">DEATH</div>          <div className="rh-stat-item__value">Batman #427 (1988)</div></div>
                                <div className="rh-stat-item"><div className="rh-stat-item__label">RESURRECTION</div>  <div className="rh-stat-item__value">Batman #635 (2005)</div></div>
                                <div className="rh-stat-item"><div className="rh-stat-item__label">CREATED BY</div>    <div className="rh-stat-item__value">Max Allan Collins</div></div>
                            </div>
                        </div>
                        <div className="rh-identity__text">
                            <p>Jason Todd did not choose this life. He was a street kid stealing tires off the Batmobile in Crime Alley when Bruce Wayne decided to change his trajectory. What followed was two years as Robin — two years of believing in something. Two years of learning that justice was possible.</p>
                            <p className="rh-quote-inline">"I'm not the one who killed those people, Batman. You are. Every time you let one of them walk."</p>
                            <p>Then the Joker happened. Then the warehouse happened. Then the bomb happened. And Batman made his choice — the same choice he always makes. The Joker kept breathing. Jason Todd bled out in the rubble.</p>
                            <p>He came back. The Lazarus Pit saw to that. But what came back was not the boy Bruce Wayne remembered. It was something harder, colder, and infinitely more honest about what Gotham actually requires.</p>
                            <p>Red Hood is not a villain. He is the conclusion of a lesson Batman taught him and then refused to apply himself.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 02 TORTURE & DEATH ── */}
            <section id="fallen" className="rh-death">
                <div className="rh-death__stain" />
                <div className="rh-death__inner">
                    <div className="rh-section__header rh-reveal">
                        <div className="rh-section__num">02</div>
                        <h2 className="rh-section__title">A DEATH IN THE FAMILY</h2>
                        <div className="rh-section__line" />
                    </div>

                    <div className="rh-crowbar-display rh-reveal">
                        <div className="rh-crowbar-display__weapon">
                            <svg className="rh-crowbar-svg" viewBox="0 0 400 40" xmlns="http://www.w3.org/2000/svg" aria-label="Crowbar">
                                <defs>
                                    <linearGradient id="crowbarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#1a1a1a" />
                                        <stop offset="20%" stopColor="#888" />
                                        <stop offset="50%" stopColor="#bbb" />
                                        <stop offset="80%" stopColor="#666" />
                                        <stop offset="100%" stopColor="#222" />
                                    </linearGradient>
                                    <filter id="metalShadow" x="-20%" y="-100%" width="140%" height="300%">
                                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#cc0000" floodOpacity="0.3" />
                                    </filter>
                                </defs>
                                <rect x="30" y="17" width="330" height="6" rx="2" fill="url(#crowbarGrad)" filter="url(#metalShadow)" />
                                <path d="M 30 20 Q 10 20 8 10 Q 6 2 16 2 Q 26 2 28 8" stroke="#888" strokeWidth="5" fill="none" strokeLinecap="round" />
                                <path d="M 360 17 L 380 12 L 385 20 L 380 28 L 360 23 Z" fill="#999" />
                                <ellipse cx="180" cy="22" rx="8" ry="3" fill="#8b0000" opacity="0.7" />
                                <ellipse cx="220" cy="19" rx="5" ry="2" fill="#cc0000" opacity="0.5" />
                                <ellipse cx="145" cy="23" rx="6" ry="2" fill="#8b0000" opacity="0.6" />
                            </svg>
                        </div>
                        <div className="rh-crowbar-display__label">
                            THE CROWBAR — QURAC WAREHOUSE — 1988<br />
                            USED BY THE JOKER TO BEAT JASON TODD TO DEATH
                        </div>
                    </div>

                    {/* Flat vertical list — no broken 3-col grid */}
                    <div className="rh-death-timeline rh-reveal">
                        {DEATH_EVENTS.map((ev, i) => <DeathEvent key={i} event={ev} />)}
                    </div>
                </div>
            </section>

            {/* ── 03 PHILOSOPHY ── */}
            <section id="philosophy" className="rh-philosophy">
                <div className="rh-section">
                    <div className="rh-section__header rh-reveal">
                        <div className="rh-section__num">03</div>
                        <h2 className="rh-section__title">THE RED HOOD&apos;S CODE</h2>
                        <div className="rh-section__line" />
                    </div>
                    <div className="rh-code-rules">
                        {PHILOSOPHY.map((rule) => (
                            <div className="rh-code-rule" key={rule.n}>
                                <div className="rh-code-rule__num">{rule.n}</div>
                                <div className="rh-code-rule__body">
                                    <h3 className="rh-code-rule__title">{rule.title}</h3>
                                    <p className="rh-code-rule__desc">{rule.desc}</p>
                                </div>
                                <div className="rh-code-rule__line" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 04 BATMAN CONFLICT ── */}
            <section id="conflict" className="rh-batman">
                <div className="rh-batman__inner">
                    <div className="rh-reveal">
                        <blockquote className="rh-batman__quote">
                            &ldquo;I&apos;m not going to kill him. But I am going to make him wish you did.&rdquo;
                            <cite>— Jason Todd, to Batman, regarding the Joker</cite>
                        </blockquote>
                        <div className="rh-batman__text">
                            <p>The conflict between Jason Todd and Bruce Wayne is not a simple villain-versus-hero story. It is a philosophical war between a man who was failed by an ideology and the man who still believes in it.</p>
                            <p>Jason does not hate Bruce. That&apos;s what makes it so devastating. He respects him. He was shaped by him. He is, in almost every way that matters, Bruce Wayne&apos;s truest heir — because he learned Batman&apos;s methods and applied them without flinching at the conclusion they lead to.</p>
                            <p>Batman can put Jason in a glass case in the Batcave, but he cannot undo what the Joker did with a crowbar — or what he himself did by refusing to prevent it.</p>
                        </div>
                    </div>
                    <div className="rh-reveal">
                        <div className="rh-batman__vs">
                            {[
                                { label: 'ON KILLING', bat: 'Never. Absolute.', rh: 'When necessary.' },
                                { label: 'ON CRIMINALS', bat: 'Rehabilitate.', rh: 'Eliminate threats.' },
                                { label: 'ON FEAR', bat: 'Symbol of justice.', rh: 'Loaded weapon.' },
                                { label: 'ON FIREARMS', bat: 'Never carry them.', rh: 'Always carry two.' },
                                { label: 'ON JOKER', bat: 'He will not kill.', rh: 'He already should have.' },
                                { label: 'ON GOTHAM', bat: 'Save the city.', rh: 'Control the disease.' },
                                { label: 'ON JASON', bat: 'A failure to protect.', rh: 'A lesson unlearned.' },
                            ].map((item) => (
                                <div className="rh-vs-item" key={item.label}>
                                    <div className="rh-vs-item__label">{item.label}</div>
                                    <div className="rh-vs-item__batman">{item.bat}</div>
                                    <div className="rh-vs-item__sep">vs</div>
                                    <div className="rh-vs-item__rh">{item.rh}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 05 ABILITIES ── */}
            <section id="abilities" className="rh-abilities">
                <div className="rh-section">
                    <div className="rh-section__header rh-reveal">
                        <div className="rh-section__num">04</div>
                        <h2 className="rh-section__title">COMBAT METRICS</h2>
                        <div className="rh-section__line" />
                    </div>
                    <div className="rh-abilities__grid">
                        <div className="rh-abilities__text rh-reveal">
                            <p>Jason Todd trained under Batman from age fourteen. He learned the same disciplines, the same martial arts, the same detective methodology. He was a natural — Bruce has admitted this to Alfred, quietly, in the dark hours after missions.</p>
                            <p>After his resurrection, he trained under the League of Assassins for years. He was already exceptional. He came back lethal. The difference between Batman and Red Hood is not skill — it is a single decision about what to do with a villain once you have him on his knees.</p>
                            <p>Jason made that decision differently. His metrics reflect someone who trains not to capture — but to end.</p>
                        </div>
                        <div className="rh-reveal">
                            {ABILITIES.map((a, i) => (
                                <AbilityBar key={a.label} label={a.label} pct={a.pct} delay={i * 150} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 06 ARSENAL ── */}
            <section id="arsenal">
                <div className="rh-section rh-reveal">
                    <div className="rh-section__header">
                        <div className="rh-section__num">05</div>
                        <h2 className="rh-section__title">ARSENAL</h2>
                        <div className="rh-section__line" />
                    </div>
                    <div className="rh-arsenal__grid">
                        {WEAPONS.map((w) => (
                            <div className="rh-weapon-card" key={w.name}>
                                <div className="rh-weapon-card__icon">{w.icon}</div>
                                <div className="rh-weapon-card__name">{w.name}</div>
                                <p className="rh-weapon-card__desc">{w.desc}</p>
                                <div className="rh-weapon-card__tag">{w.tag}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 07 ROGUES — vertical scroll-reveal with real images ── */}
            <section id="rogues" className="rh-rogues">
                <div className="rh-section__header rh-reveal" style={{ padding: '0 80px', marginBottom: '40px' }}>
                    <div className="rh-section__num">06</div>
                    <h2 className="rh-section__title">THOSE WHO STAND AGAINST HIM</h2>
                    <div className="rh-section__line" />
                </div>
                <p className="rh-rogues__intro">
                    Jason Todd has survived things that should have broken him. The enemies who face him now are not Gotham&apos;s generic thugs — they are the architects of his worst memories, and the forces that stand between Gotham and whatever brutal equilibrium he is trying to create.
                </p>
                <div className="rh-rogues__list">
                    {VILLAINS.map((v, i) => <VillainRow key={v.name} villain={v} index={i} />)}
                </div>
            </section>

            {/* ── 08 LEGACY TIMELINE ── */}
            <section id="legacy">
                <div className="rh-section rh-reveal">
                    <div className="rh-section__header">
                        <div className="rh-section__num">07</div>
                        <h2 className="rh-section__title">THE LIFE OF JASON TODD</h2>
                        <div className="rh-section__line" />
                    </div>
                    <div className="rh-timeline">
                        {TIMELINE.map((e) => (
                            <div className="rh-timeline-item" key={`${e.year}-${e.tag}`}>
                                <div className="rh-timeline-item__year">{e.year}</div>
                                <div className={`rh-timeline-item__dot${e.death ? ' rh-timeline-item__dot--death' : ''}`} />
                                <div className="rh-timeline-item__content">
                                    <span className="rh-timeline-item__tag">{e.tag}</span>
                                    <div className="rh-timeline-item__title">{e.title}</div>
                                    <p>{e.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CREED ── */}
            <section id="creed" className="rh-creed">
                <blockquote>
                    &ldquo;I&apos;m not letting you walk away from this. I&apos;m not the Batman. I&apos;m not bound by your rules. You killed me once. That&apos;s the only time anyone gets to do that.&rdquo;
                    <cite>— Jason Todd / Red Hood</cite>
                </blockquote>
            </section>

            {/* ── REVIEW ── */}
            <ReviewSection character="redhood" />

            <FatsonEasterEgg active={fatsonActive} />

            {/* ── FOOTER ── */}
            <footer className="rh-footer">
                <div>
                    <div className="rh-footer__logo">&#9861; RED HOOD</div>
                    <div className="rh-footer__sub">JASON PETER TODD — SECOND ROBIN — RESURRECTED — ROGUE</div>
                </div>
                {onBack && (
                    <button className="rh-btn rh-btn--ghost" onClick={onBack}>← CHANGE GUARDIAN</button>
                )}
                <div className="rh-footer__copy">© DC COMICS · JASON TODD CREATED 1983 · ALL RIGHTS RESERVED</div>
                <div className="dev-credit">
                    <span className="dev-credit__label">Developed by</span>
                    <span className="dev-credit__name" style={{ color: '#cc0000' }}>Nihan</span>
                </div>
            </footer>
        </div>
    );
}