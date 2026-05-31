import { useEffect, useRef, useState } from 'react';
import '../styles/redrobin-main.css';
import ReviewSection from './ReviewSection';

import redRobinHeroImg from '../assets/RedRobin/red.jpg';
import redRobinCoverImg from '../assets/RedRobin/cover.jpg';
import lonnieImg from '../assets/RedRobin/Villains/lonnie.jpg';
import lynxImg from '../assets/RedRobin/Villains/lynx.jpg';
import rasImg from '../assets/RedRobin/Villains/ras.jpg';
import snakeImg from '../assets/RedRobin/Villains/snake.jpg';
import spidersImg from '../assets/RedRobin/Villains/spiders.jpg';
import ulyssesImg from '../assets/RedRobin/Villains/ulysses.jpg';

const STATS = [
    { label: 'Detective Intelligence', value: 99 },
    { label: 'Tactical Planning', value: 98 },
    { label: 'Bo Staff Mastery', value: 94 },
    { label: 'Systems Intrusion', value: 97 },
    { label: 'Leadership', value: 92 },
];

const GEAR = [
    { name: 'Collapsible Bo Staff', tag: 'Primary Weapon', desc: 'Carbon-weave staff with stun charge, grapnel socket, and silent deployment. Tim fights with reach, rhythm, and precision.' },
    { name: 'Red Robin Cowl', tag: 'Tactical Mask', desc: 'Encrypted comms, thermal overlays, micro-expression capture, and evidence tagging built for live casework.' },
    { name: 'Wing-Cape Glider', tag: 'Mobility', desc: 'Memory-fabric cape tuned for rooftop drops, aerial banking, and controlled citywide pursuit.' },
    { name: 'Birdarangs', tag: 'Utility', desc: 'Compact throwing blades with tracker, flash, EMP, and line-cutter variants depending on the mission loadout.' },
    { name: 'Forensic Kit', tag: 'Investigation', desc: 'Portable chemistry, residue capture, fingerprint lift film, and data extraction tools for crime-scene reads.' },
    { name: 'Nest Network', tag: 'Surveillance', desc: 'Drone relays, hidden servers, and city cameras folded into a private operating picture.' },
];

const CASES = [
    {
        id: 'RR-001',
        city: 'GOTHAM',
        status: 'SOLVED',
        title: 'Identity of the Bat',
        threat: 'HIGH',
        detail: 'Tim reconstructs the impossible by ignoring the cape and studying movement. Dick Grayson performs a quadruple somersault as Robin. Batman appears with the same body language Bruce Wayne carries when grief slips through the mask. One observation becomes a complete identity chain.',
    },
    {
        id: 'RR-014',
        city: 'PARIS',
        status: 'CLOSED',
        title: 'League Signal Trace',
        threat: 'CRITICAL',
        detail: 'While Gotham mourns Bruce Wayne, Tim refuses consensus. He follows League money, dead drops, coded museum routes, and a pattern of impossible historical sightings until the trail points to one answer: Bruce is displaced, not dead.',
    },
    {
        id: 'RR-027',
        city: 'GOTHAM',
        status: 'ACTIVE',
        title: 'Council of Spiders Pattern',
        threat: 'EXTREME',
        detail: 'Assassin movement looks random until Tim maps rooftop pressure points, medical supply thefts, and silence zones in the police grid. The pattern reveals a hunting circle closing around his own patrol route.',
    },
    {
        id: 'RR-031',
        city: 'BLUDHAVEN',
        status: 'OPEN',
        title: 'Gridline Data Theft',
        threat: 'HIGH',
        detail: 'A citywide data breach starts as a finance crime and turns into a Bat-Family vulnerability audit. Tim isolates the intruder by setting a false file path only a strategist would notice.',
    },
];

const DETECTIVE_PROTOCOLS = [
    { code: '01', title: 'Observe the Human Error', text: 'Tim starts with the detail people cannot train away: posture, rhythm, injury compensation, hesitation, and habits under stress.' },
    { code: '02', title: 'Build the Pattern Map', text: 'Every clue becomes a node. Every node gets weighed by motive, access, timing, and risk. The board narrows before the fight begins.' },
    { code: '03', title: 'Pressure Test the Answer', text: 'He does not trust a theory because it feels elegant. He attacks his own conclusion until only the strongest explanation survives.' },
    { code: '04', title: 'Prepare the Exit Chain', text: 'A Tim Drake plan has a primary route, a decoy route, a failure route, and one route nobody knows exists until it saves the mission.' },
];

const NETWORK = [
    { name: 'Batman', role: 'Mentor / Standard', text: 'Bruce trained Tim, but Tim also challenged him. He is one of the few Robins who entered the mission by choice and proved Batman needed him.' },
    { name: 'Nightwing', role: 'Brother / North Star', text: 'Dick shows Tim what Robin can become without losing warmth. Tim studies Dick as both a tactical leader and a healthier kind of legacy.' },
    { name: 'Spoiler', role: 'Partner / Counterweight', text: 'Stephanie Brown keeps Tim from becoming only a computer with a cape. Their partnership adds instinct, humor, and emotional honesty to the mission.' },
    { name: 'Superboy', role: 'Best Friend / Anchor', text: 'Conner Kent brings Tim back from pure calculation. Their friendship is one of Tim\'s clearest reminders that strategy still serves people.' },
    { name: 'Young Justice', role: 'Team / Proof', text: 'With Young Justice and the Teen Titans, Tim becomes more than Batman\'s apprentice. He becomes a field leader among equals.' },
    { name: 'Oracle', role: 'Intel / Systems Link', text: 'Barbara Gordon and Tim share the language of data, preparation, and precision. When the city becomes a puzzle, they are the ones reading it.' },
];

const VILLAINS = [
    {
        name: 'RA\'S AL GHUL',
        alias: 'The Demon\'s Head',
        role: 'Immortal Strategist',
        threat: 'EXTREME',
        tag: 'ARCH-NEMESIS',
        img: rasImg,
        imgPos: 'center top',
        desc: 'Ra\'s recognizes Tim as one of Batman\'s most dangerous successors because Tim wins before the fight begins. Their conflict is a duel of plans: centuries of empire against a teenager who can read the board faster than anyone expects.',
    },
    {
        name: 'LONNIE MACHIN',
        alias: 'Anarky',
        role: 'Radical Systems Saboteur',
        threat: 'HIGH',
        tag: 'IDEOLOGUE',
        img: lonnieImg,
        imgPos: 'center top',
        desc: 'Anarky attacks the machinery of society itself. Against Tim Drake, he becomes a mirror: two brilliant young tacticians, both convinced Gotham can be redesigned, divided by what they are willing to break to get there.',
    },
    {
        name: 'LYNX',
        alias: 'Ghost Dragon Enforcer',
        role: 'Gang Commander',
        threat: 'HIGH',
        tag: 'STREET WAR',
        img: lynxImg,
        imgPos: 'center top',
        desc: 'Lynx brings organized violence, disciplined crews, and deep Chinatown connections. She forces Tim to balance detective work with street-level diplomacy, proving his Robin work was never just sidekick duty.',
    },
    {
        name: 'KING SNAKE',
        alias: 'Sir Edmund Dorrance',
        role: 'Blind Martial Master',
        threat: 'CRITICAL',
        tag: 'COMBATANT',
        img: snakeImg,
        imgPos: 'center top',
        desc: 'King Snake is a brutal hand-to-hand threat whose criminal reach shaped early Robin cases. He challenges Tim physically in the exact place Tim is usually strongest mentally: controlled preparation.',
    },
    {
        name: 'U LYSSES ARMSTRONG',
        alias: 'The General',
        role: 'Child War Planner',
        threat: 'CRITICAL',
        tag: 'TACTICIAN',
        img: ulyssesImg,
        imgPos: 'center top',
        desc: 'A young military genius with no moral brake, the General wages campaigns instead of crimes. His danger is not strength but logistics, escalation, and a talent for turning Gotham into a battlefield.',
    },
    {
        name: 'THE COUNCIL OF SPIDERS',
        alias: 'League Assassins Cell',
        role: 'Elite Hunter Unit',
        threat: 'EXTREME',
        tag: 'ASSASSINS',
        img: spidersImg,
        imgPos: 'center top',
        desc: 'A specialist assassination cadre tied to the League\'s larger game. They test Tim\'s Red Robin identity directly: stealth, countersurveillance, contingency chains, and the question of whether he can survive alone.',
    },
];

const TIMELINE = [
    { year: '1989', tag: 'DEDUCTION', text: 'Tim Drake deduces Batman and Nightwing\'s identities after recognizing Dick Grayson\'s acrobatics.' },
    { year: '1990', tag: 'ROBIN III', text: 'After Jason Todd\'s death, Tim proves Batman needs Robin and earns the mantle through persistence and intellect.' },
    { year: '1993', tag: 'SOLO', text: 'Tim anchors his own Robin series, building a civilian life, a school life, and a superhero life at once.' },
    { year: '2003', tag: 'TITANS', text: 'He becomes a core Young Justice and Teen Titans strategist, leading peers instead of simply following Batman.' },
    { year: '2009', tag: 'RED ROBIN', text: 'Convinced Bruce Wayne is alive, Tim takes the Red Robin identity and hunts for proof across the globe.' },
    { year: 'NOW', tag: 'LEGACY', text: 'Tim remains the Bat-Family\'s sharpest detective mind: the planner, analyst, and successor no one should underestimate.' },
];

function RedRobinCursor() {
    const cursorRef = useRef(null);
    const haloRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const halo = useRef({ x: 0, y: 0 });
    const raf = useRef(null);

    useEffect(() => {
        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };
        const animate = () => {
            halo.current.x += (pos.current.x - halo.current.x) * 0.14;
            halo.current.y += (pos.current.y - halo.current.y) * 0.14;
            if (cursorRef.current) cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
            if (haloRef.current) haloRef.current.style.transform = `translate(${halo.current.x}px, ${halo.current.y}px)`;
            raf.current = requestAnimationFrame(animate);
        };
        window.addEventListener('mousemove', onMove);
        raf.current = requestAnimationFrame(animate);
        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="rr-cursor"><span /></div>
            <div ref={haloRef} className="rr-cursor rr-cursor--halo" />
        </>
    );
}

function StatMeter({ label, value, delay }) {
    const [on, setOn] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => setOn(true), delay);
                obs.disconnect();
            }
        }, { threshold: 0.4 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);

    return (
        <div className="rr-stat" ref={ref}>
            <div className="rr-stat__top">
                <span>{label}</span>
                <strong>{on ? value : 0}%</strong>
            </div>
            <div className="rr-stat__track">
                <div className="rr-stat__fill" style={{ width: on ? `${value}%` : '0%' }} />
            </div>
        </div>
    );
}

function ImageFrame({ src, alt, label, className = '', objectPosition = 'center top' }) {
    return (
        <div className={`rr-image-frame ${className}`}>
            <img src={src} alt={alt} style={{ objectPosition }} />
            <strong>{label}</strong>
        </div>
    );
}

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function RedRobinMain({ onBack }) {
    const [navOpen, setNavOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [activeCase, setActiveCase] = useState(CASES[0]);

    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            const scrollingDown = y > lastY;

            if (navOpen) {
                setNavHidden(false);
            } else if (scrollingDown && y > 100) {
                setNavHidden(true);
            } else {
                setNavHidden(false);
            }

            lastY = y;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [navOpen]);

    const navTo = (id) => {
        scrollToSection(id);
        setNavOpen(false);
        setNavHidden(false);
    };

    return (
        <div className="rr-main">
            <RedRobinCursor />

            <nav className={`rr-nav ${navHidden ? 'rr-nav--hidden' : ''}`}>
                <button className="rr-nav__brand" onClick={() => navTo('hero')} aria-label="Red Robin home">
                    <span className="rr-nav__mark">RR</span>
                    <span>RED ROBIN</span>
                </button>
                <div className={`rr-nav__links ${navOpen ? 'open' : ''}`}>
                    {['profile', 'origin', 'arsenal', 'cases', 'engine', 'network', 'rogues', 'legacy'].map((item) => (
                        <button key={item} onClick={() => navTo(item)}>{item}</button>
                    ))}
                </div>
                {onBack && <button className="rr-nav__back" onClick={onBack}>CHANGE GUARDIAN</button>}
                <button className="rr-nav__toggle" onClick={() => setNavOpen((open) => !open)} aria-label="Toggle navigation">
                    <span /><span /><span />
                </button>
            </nav>

            <section className="rr-hero" id="hero">
                <div className="rr-hero__matrix" />
                <div className="rr-hero__content">
                    <p className="rr-kicker">ACTIVE FILE / BAT-FAMILY INTELLIGENCE</p>
                    <h1>
                        <span>TIM DRAKE</span>
                        RED ROBIN
                    </h1>
                    <p className="rr-hero__copy">
                        The Robin who solved Batman. Detective, strategist, systems architect, and the Bat-Family mind most likely to win the fight before anyone throws a punch.
                    </p>
                    <div className="rr-hero__actions">
                        <button className="rr-btn rr-btn--gold" onClick={() => navTo('profile')}>ACCESS DOSSIER</button>
                        <button className="rr-btn rr-btn--dark" onClick={() => navTo('rogues')}>ROGUES INDEX</button>
                    </div>
                </div>
                <div className="rr-hero__visual">
                    <div className="rr-hero__rings" />
                    <ImageFrame
                        src={redRobinHeroImg}
                        alt="Tim Drake as Red Robin"
                        label=""
                        className="rr-hero__image"
                        objectPosition="center top"
                    />
                    <div className="rr-hero__data">
                        <span>REAL NAME: TIMOTHY JACKSON DRAKE</span>
                        <span>ROLE: DETECTIVE / STRATEGIST</span>
                        <span>BASE: GOTHAM CITY</span>
                        <span>PRIMARY: BO STAFF</span>
                    </div>
                </div>
            </section>

            <section className="rr-section rr-profile" id="profile">
                <div className="rr-section__header">
                    <span>01</span>
                    <h2>Operative Profile</h2>
                    <i />
                </div>
                <div className="rr-profile__grid">
                    <div className="rr-dossier">
                        <div className="rr-dossier__header">
                            <span>BATCOMPUTER DOSSIER</span>
                            <strong>CLEARANCE: ALPHA</strong>
                        </div>
                        <div className="rr-dossier__body">
                            <ImageFrame
                                src="/src/assets/RedRobin/tim.jpg"
                                alt="Red Robin profile portrait"
                                label="Profile portrait"
                                className="rr-dossier__portrait"
                                objectPosition="center top"
                            />
                            <div className="rr-dossier__rows">
                                <p><span>Alias</span><strong>Red Robin</strong></p>
                                <p><span>Real Name</span><strong>Tim Drake</strong></p>
                                <p><span>Former ID</span><strong>Robin III</strong></p>
                                <p><span>Affiliation</span><strong>Bat-Family / Teen Titans</strong></p>
                                <p><span>Status</span><strong className="rr-live">Active</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="rr-profile__text">
                        <p>Tim Drake is different from every Robin before him. Dick Grayson was chosen by tragedy. Jason Todd was found in the street. Tim walked into the myth by solving it. He watched Batman and Robin closely enough to recognize Dick Grayson in the air, then followed the logic all the way to Bruce Wayne.</p>
                        <p>After Jason Todd's death, Batman became colder, harsher, and more reckless. Tim understood the truth Bruce would not admit: Batman needs Robin. Not as a soldier. As a balance. As a light. As proof that the mission can still create something better than fear.</p>
                        <p>As Red Robin, Tim becomes the Bat-Family's premier analyst: the one who tracks patterns, builds contingencies, and sees the hidden structure underneath Gotham's chaos.</p>
                    </div>
                    <div className="rr-profile__stats">
                        {STATS.map((stat, index) => <StatMeter key={stat.label} {...stat} delay={index * 140} />)}
                    </div>
                </div>
            </section>

            <section className="rr-section rr-origin" id="origin">
                <div className="rr-section__header">
                    <span>02</span>
                    <h2>Origin Protocol</h2>
                    <i />
                </div>
                <div className="rr-origin__grid">
                    <ImageFrame
                        src={redRobinCoverImg}
                        alt="Red Robin comic cover"
                        label="Red Robin cover file"
                        className="rr-origin__cover"
                        objectPosition="center top"
                    />
                    <div className="rr-origin__copy">
                        <blockquote>"Batman has to have a Robin."</blockquote>
                        <p>Tim first appears as the rare civilian who can look at Gotham's impossible legend and see the human pattern inside it. He does not become Robin because Batman finds him. He becomes Robin because he finds Batman at the exact moment Batman is losing himself.</p>
                        <p>His Red Robin era begins when almost everyone believes Bruce Wayne is dead. Tim refuses the accepted answer. He follows evidence across continents, challenges Ra's al Ghul, and proves that faith is strongest when it is backed by work.</p>
                        <div className="rr-origin__facts">
                            <div><span>First Appearance</span><strong>Batman #436</strong></div>
                            <div><span>Robin Debut</span><strong>Batman #457</strong></div>
                            <div><span>Red Robin Era</span><strong>Red Robin #1</strong></div>
                            <div><span>Created By</span><strong>Marv Wolfman & Pat Broderick</strong></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rr-section rr-arsenal" id="arsenal">
                <div className="rr-section__header">
                    <span>03</span>
                    <h2>Arsenal</h2>
                    <i />
                </div>
                <div className="rr-arsenal__grid">
                    {GEAR.map((item) => (
                        <article className="rr-gear" key={item.name}>
                            <span>{item.tag}</span>
                            <h3>{item.name}</h3>
                            <p>{item.desc}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="rr-section rr-cases" id="cases">
                <div className="rr-section__header">
                    <span>04</span>
                    <h2>Case Files</h2>
                    <i />
                </div>
                <div className="rr-cases__grid">
                    <div className="rr-cases__list">
                        {CASES.map((caseFile) => (
                            <button
                                className={activeCase.id === caseFile.id ? 'active' : ''}
                                key={caseFile.id}
                                onClick={() => setActiveCase(caseFile)}
                            >
                                <span>{caseFile.id}</span>
                                <strong>{caseFile.title}</strong>
                                <em>{caseFile.status}</em>
                            </button>
                        ))}
                    </div>
                    <div className="rr-case-detail">
                        <p className="rr-kicker">{activeCase.city} / THREAT {activeCase.threat}</p>
                        <h3>{activeCase.title}</h3>
                        <p>Status: <strong>{activeCase.status}</strong></p>
                        <p>{activeCase.detail}</p>
                    </div>
                </div>
            </section>

            <section className="rr-section rr-engine" id="engine">
                <div className="rr-section__header">
                    <span>05</span>
                    <h2>Detective Engine</h2>
                    <i />
                </div>
                <div className="rr-engine__grid">
                    <div className="rr-engine__board">
                        <div className="rr-board-node rr-board-node--primary">BATMAN</div>
                        <div className="rr-board-node">NIGHTWING</div>
                        <div className="rr-board-node">ACROBATICS</div>
                        <div className="rr-board-node">WAYNE MANOR</div>
                        <div className="rr-board-node rr-board-node--gold">IDENTITY CONFIRMED</div>
                        <div className="rr-board-node">GOTHAM PATTERN</div>
                    </div>
                    <div className="rr-engine__protocols">
                        {DETECTIVE_PROTOCOLS.map((protocol) => (
                            <article className="rr-protocol" key={protocol.code}>
                                <span>{protocol.code}</span>
                                <div>
                                    <h3>{protocol.title}</h3>
                                    <p>{protocol.text}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="rr-section rr-network" id="network">
                <div className="rr-section__header">
                    <span>06</span>
                    <h2>Trusted Network</h2>
                    <i />
                </div>
                <p className="rr-network__intro">Tim is not defined by isolation. His strongest stories are built on connection: the people he studies, protects, argues with, leads, and trusts when the plan has to become human.</p>
                <div className="rr-network__grid">
                    {NETWORK.map((ally) => (
                        <article className="rr-network-card" key={ally.name}>
                            <span>{ally.role}</span>
                            <h3>{ally.name}</h3>
                            <p>{ally.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="rr-section rr-rogues" id="rogues">
                <div className="rr-section__header">
                    <span>07</span>
                    <h2>Major Villains</h2>
                    <i />
                </div>
                <p className="rr-rogues__intro">Red Robin's enemies are planners, martial masters, assassins, and ideological extremists. They do not simply test his fists. They test his read of the whole board.</p>
                <div className="rr-rogues__grid">
                    {VILLAINS.map((villain) => (
                        <article className="rr-villain" key={villain.name}>
                            <ImageFrame
                                src={villain.img}
                                alt={villain.name}
                                label={`${villain.name} file image`}
                                className="rr-villain__image"
                                objectPosition={villain.imgPos}
                            />
                            <div className="rr-villain__body">
                                <div className="rr-villain__meta">
                                    <span>{villain.tag}</span>
                                    <strong>{villain.threat}</strong>
                                </div>
                                <h3>{villain.name}</h3>
                                <p className="rr-villain__alias">{villain.alias} / {villain.role}</p>
                                <p>{villain.desc}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="rr-section rr-legacy" id="legacy">
                <div className="rr-section__header">
                    <span>08</span>
                    <h2>Legacy Timeline</h2>
                    <i />
                </div>
                <div className="rr-timeline">
                    {TIMELINE.map((item) => (
                        <article className="rr-timeline__item" key={`${item.year}-${item.tag}`}>
                            <span>{item.year}</span>
                            <div>
                                <strong>{item.tag}</strong>
                                <p>{item.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* ── REVIEW ── */}
            <ReviewSection character="redrobin" />

            <footer className="rr-footer">
                <div>
                    <strong>RED ROBIN</strong>
                    <span>TIM DRAKE / DETECTIVE / STRATEGIST / BAT-FAMILY</span>
                </div>
                {onBack && <button className="rr-btn rr-btn--dark" onClick={onBack}>CHANGE GUARDIAN</button>}
                <div className="dev-credit">
                    <span className="dev-credit__label">Developed by</span>
                    <span className="dev-credit__name" style={{ color: '#d7b15a' }}>Nihan</span>
                </div>
            </footer>
        </div>
    );
}
