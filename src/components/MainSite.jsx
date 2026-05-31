import { useEffect, useRef, useState } from 'react';
import ReviewSection from './ReviewSection';
import { images } from '../assets/images';
import gsap from 'gsap';
import '../styles/hero-chronicles.css';
import '../styles/sections-a.css';
import '../styles/sections-b.css';
import '../styles/batman-enhanced.css';
import '../styles/batman-sections.css';

// ── Arsenal icon components — tight geometric SVGs, each unique ──────────────
const ArsenalIcons = {
    Batarang: () => (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 8 L44 30 L28 24 L12 30 Z" stroke="#f5c518" strokeWidth="1.2" fill="none" opacity="0.9" />
            <path d="M28 24 L28 8" stroke="#f5c518" strokeWidth="1" opacity="0.5" />
            <path d="M12 30 L8 42 L28 34 L48 42 L44 30" stroke="#f5c518" strokeWidth="1.2" fill="none" opacity="0.7" />
            <circle cx="28" cy="28" r="2.5" fill="#f5c518" opacity="0.9" />
            <line x1="20" y1="20" x2="28" y2="24" stroke="#f5c518" strokeWidth="0.6" opacity="0.4" />
            <line x1="36" y1="20" x2="28" y2="24" stroke="#f5c518" strokeWidth="0.6" opacity="0.4" />
        </svg>
    ),
    GrappleGun: () => (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="24" width="26" height="9" rx="2" stroke="#f5c518" strokeWidth="1.2" fill="none" />
            <rect x="34" y="26" width="10" height="5" rx="1" stroke="#f5c518" strokeWidth="1" fill="none" opacity="0.7" />
            <rect x="16" y="33" width="8" height="12" rx="1.5" stroke="#f5c518" strokeWidth="1.1" fill="none" opacity="0.8" />
            <line x1="44" y1="28.5" x2="52" y2="20" stroke="#f5c518" strokeWidth="1" opacity="0.6" strokeDasharray="2 2" />
            <path d="M50 18 L53 21 L50 22 Z" fill="#f5c518" opacity="0.7" />
            <circle cx="44" cy="28.5" r="1.5" fill="#f5c518" opacity="0.5" />
            <line x1="10" y1="28.5" x2="6" y2="28.5" stroke="#f5c518" strokeWidth="1" opacity="0.4" />
        </svg>
    ),
    Batmobile: () => (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 34 L10 26 L20 22 L28 20 L36 22 L46 26 L50 34 Z" stroke="#f5c518" strokeWidth="1.2" fill="none" />
            <path d="M10 26 L16 24 L28 22 L40 24 L46 26" stroke="#f5c518" strokeWidth="0.7" opacity="0.5" />
            <circle cx="15" cy="35" r="5" stroke="#f5c518" strokeWidth="1.2" fill="none" />
            <circle cx="15" cy="35" r="2" fill="#f5c518" opacity="0.4" />
            <circle cx="41" cy="35" r="5" stroke="#f5c518" strokeWidth="1.2" fill="none" />
            <circle cx="41" cy="35" r="2" fill="#f5c518" opacity="0.4" />
            <path d="M22 22 L24 17 L32 17 L34 22" stroke="#f5c518" strokeWidth="1" fill="none" opacity="0.7" />
            <line x1="46" y1="30" x2="52" y2="28" stroke="#f5c518" strokeWidth="1" opacity="0.4" strokeDasharray="2 1.5" />
        </svg>
    ),
    Cowl: () => (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 10 L18 16 L14 26 L14 36 L22 40 L28 42 L34 40 L42 36 L42 26 L38 16 Z" stroke="#f5c518" strokeWidth="1.2" fill="none" />
            <path d="M18 16 L13 12 L16 20" stroke="#f5c518" strokeWidth="1" fill="none" opacity="0.7" />
            <path d="M38 16 L43 12 L40 20" stroke="#f5c518" strokeWidth="1" fill="none" opacity="0.7" />
            <ellipse cx="22" cy="27" rx="4" ry="3" stroke="#f5c518" strokeWidth="0.9" fill="none" opacity="0.6" />
            <ellipse cx="34" cy="27" rx="4" ry="3" stroke="#f5c518" strokeWidth="0.9" fill="none" opacity="0.6" />
            <path d="M26 27 L30 27" stroke="#f5c518" strokeWidth="0.7" opacity="0.4" />
            <path d="M20 35 Q28 38 36 35" stroke="#f5c518" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="28" cy="10" r="1.5" fill="#f5c518" opacity="0.6" />
        </svg>
    ),
    SmokePellets: () => (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="32" r="9" stroke="#f5c518" strokeWidth="1.2" fill="none" />
            <line x1="28" y1="23" x2="28" y2="18" stroke="#f5c518" strokeWidth="1.1" />
            <path d="M25 18 L28 14 L31 18" stroke="#f5c518" strokeWidth="1" fill="none" opacity="0.7" />
            <path d="M16 20 Q20 14 28 16" stroke="#f5c518" strokeWidth="0.8" fill="none" opacity="0.45" strokeDasharray="2 2" />
            <path d="M40 20 Q36 14 28 16" stroke="#f5c518" strokeWidth="0.8" fill="none" opacity="0.45" strokeDasharray="2 2" />
            <path d="M12 26 Q10 20 16 18" stroke="#f5c518" strokeWidth="0.7" fill="none" opacity="0.3" strokeDasharray="1.5 2" />
            <path d="M44 26 Q46 20 40 18" stroke="#f5c518" strokeWidth="0.7" fill="none" opacity="0.3" strokeDasharray="1.5 2" />
            <line x1="24" y1="32" x2="32" y2="32" stroke="#f5c518" strokeWidth="0.6" opacity="0.4" />
            <circle cx="28" cy="32" r="3" stroke="#f5c518" strokeWidth="0.8" fill="none" opacity="0.5" />
        </svg>
    ),
    BatComputer: () => (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="12" width="40" height="26" rx="2" stroke="#f5c518" strokeWidth="1.2" fill="none" />
            <rect x="12" y="16" width="32" height="18" rx="1" stroke="#f5c518" strokeWidth="0.8" fill="none" opacity="0.5" />
            <line x1="18" y1="20" x2="30" y2="20" stroke="#f5c518" strokeWidth="0.7" opacity="0.6" />
            <line x1="18" y1="23" x2="38" y2="23" stroke="#f5c518" strokeWidth="0.7" opacity="0.4" />
            <line x1="18" y1="26" x2="34" y2="26" stroke="#f5c518" strokeWidth="0.7" opacity="0.4" />
            <line x1="18" y1="29" x2="26" y2="29" stroke="#f5c518" strokeWidth="0.7" opacity="0.6" />
            <circle cx="36" cy="27" r="3.5" stroke="#f5c518" strokeWidth="0.8" fill="none" opacity="0.7" />
            <circle cx="36" cy="27" r="1.2" fill="#f5c518" opacity="0.5" />
            <path d="M20 38 L36 38" stroke="#f5c518" strokeWidth="1.2" opacity="0.5" />
            <path d="M24 38 L24 44 L32 44 L32 38" stroke="#f5c518" strokeWidth="1" fill="none" opacity="0.6" />
            <line x1="20" y1="44" x2="36" y2="44" stroke="#f5c518" strokeWidth="1.2" opacity="0.5" />
        </svg>
    ),
};
function GothamMapViewer({ src }) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const stateRef = useRef({ scale: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0, lastX: 0, lastY: 0 });

    const MIN_SCALE = 0.8;
    const MAX_SCALE = 4;

    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    const applyTransform = () => {
        const { scale, x, y } = stateRef.current;
        if (imgRef.current) {
            imgRef.current.style.transform =
                `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        }
    };

    const clampPan = (x, y, scale) => {
        const container = containerRef.current;
        const img = imgRef.current;
        if (!container || !img) return { x, y };
        const cw = container.clientWidth, ch = container.clientHeight;
        const iw = img.naturalWidth || img.clientWidth;
        const ih = img.naturalHeight || img.clientHeight;
        const scaledW = iw * scale, scaledH = ih * scale;
        const maxX = Math.max(0, (scaledW - cw) / 2);
        const maxY = Math.max(0, (scaledH - ch) / 2);
        return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e) => {
            e.preventDefault();
            const s = stateRef.current;
            const delta = e.deltaY < 0 ? 1.12 : 0.89;
            const newScale = clamp(s.scale * delta, MIN_SCALE, MAX_SCALE);
            const rect = container.getBoundingClientRect();
            const mx = e.clientX - rect.left - rect.width / 2;
            const my = e.clientY - rect.top - rect.height / 2;
            const scaleRatio = newScale / s.scale;
            const newX = mx + (s.x - mx) * scaleRatio;
            const newY = my + (s.y - my) * scaleRatio;
            const clamped = clampPan(newX, newY, newScale);
            s.scale = newScale; s.x = clamped.x; s.y = clamped.y;
            applyTransform();
        };

        const onMouseDown = (e) => {
            const s = stateRef.current;
            s.dragging = true; s.startX = e.clientX - s.x; s.startY = e.clientY - s.y;
            container.style.cursor = 'grabbing';
        };
        const onMouseMove = (e) => {
            const s = stateRef.current;
            if (!s.dragging) return;
            const nx = e.clientX - s.startX, ny = e.clientY - s.startY;
            const clamped = clampPan(nx, ny, s.scale);
            s.x = clamped.x; s.y = clamped.y;
            applyTransform();
        };
        const onMouseUp = () => { stateRef.current.dragging = false; container.style.cursor = 'grab'; };

        // Touch support
        let lastDist = 0;
        const onTouchStart = (e) => {
            const s = stateRef.current;
            if (e.touches.length === 1) { s.dragging = true; s.startX = e.touches[0].clientX - s.x; s.startY = e.touches[0].clientY - s.y; }
            if (e.touches.length === 2) { lastDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY); }
        };
        const onTouchMove = (e) => {
            e.preventDefault();
            const s = stateRef.current;
            if (e.touches.length === 1 && s.dragging) {
                const nx = e.touches[0].clientX - s.startX, ny = e.touches[0].clientY - s.startY;
                const clamped = clampPan(nx, ny, s.scale);
                s.x = clamped.x; s.y = clamped.y; applyTransform();
            }
            if (e.touches.length === 2) {
                const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
                const newScale = clamp(s.scale * (dist / lastDist), MIN_SCALE, MAX_SCALE);
                lastDist = dist; s.scale = newScale; applyTransform();
            }
        };
        const onTouchEnd = () => { stateRef.current.dragging = false; };

        container.addEventListener('wheel', onWheel, { passive: false });
        container.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        container.addEventListener('touchstart', onTouchStart, { passive: false });
        container.addEventListener('touchmove', onTouchMove, { passive: false });
        container.addEventListener('touchend', onTouchEnd);

        return () => {
            container.removeEventListener('wheel', onWheel);
            container.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);
        };
    }, []);

    const resetZoom = () => {
        stateRef.current = { ...stateRef.current, scale: 1, x: 0, y: 0 };
        applyTransform();
    };

    const zoomIn = () => {
        const s = stateRef.current;
        s.scale = clamp(s.scale * 1.3, MIN_SCALE, MAX_SCALE);
        applyTransform();
    };

    const zoomOut = () => {
        const s = stateRef.current;
        s.scale = clamp(s.scale * 0.77, MIN_SCALE, MAX_SCALE);
        const clamped = clampPan(s.x, s.y, s.scale);
        s.x = clamped.x; s.y = clamped.y;
        applyTransform();
    };

    return (
        <div className="gotham-map-viewer" ref={containerRef}>
            <img ref={imgRef} src={src} alt="Gotham City Map" className="gotham-map-img" draggable={false} />
            {/* Overlay tint */}
            <div className="gotham-map-tint"></div>
            {/* Controls */}
            <div className="gotham-map-controls">
                <button className="gmap-btn" onClick={zoomIn} title="Zoom In">+</button>
                <button className="gmap-btn" onClick={zoomOut} title="Zoom Out">−</button>
                <button className="gmap-btn gmap-btn--reset" onClick={resetZoom} title="Reset">⊙</button>
            </div>
            {/* Corner decoration */}
            <div className="gmap-corner gmap-corner--tl"></div>
            <div className="gmap-corner gmap-corner--tr"></div>
            <div className="gmap-corner gmap-corner--bl"></div>
            <div className="gmap-corner gmap-corner--br"></div>
            <div className="gotham-map-hint">Scroll to zoom · Drag to pan</div>
        </div>
    );
}

export default function MainSite({ onBack }) {
    const spotlightRef = useRef(null);
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const wayneContainerRef = useRef(null);
    const batmanLayerRef = useRef(null);
    const [activeVehicle, setActiveVehicle] = useState(0);
    const [navOpen, setNavOpen] = useState(false);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setNavOpen(false);
    };

    const vehicles = [
        {
            name: 'Tumbler',
            era: 'Nolan Era · 2005–2012',
            desc: 'Military-grade bridging vehicle repurposed as the Batmobile. 0–60 in 3.2s. Ramp-jump capable. Afterburner propulsion. Splits into the Bat-Pod.',
            specs: [['Origin', 'Wayne Enterprises R&D'], ['Engine', 'Dual turbine'], ['Top Speed', '200+ mph'], ['Armament', 'Twin cannons']],
        },
        {
            name: 'Keaton Batmobile',
            era: 'Burton Era · 1989–1992',
            desc: 'The most iconic silhouette in superhero history. A jet turbine on wheels. 30-foot wingspan fins, retractable shields, and a nose that defined an era.',
            specs: [['Origin', 'Hand-built'], ['Engine', 'Jet turbine'], ['Length', '30 feet'], ['Shields', 'Retractable']],
        },
        {
            name: 'Animated Batmobile',
            era: 'BTAS · 1992–1995',
            desc: "Bruce Timm's art deco masterpiece. The car that looked like it drove out of a 1930s nightmare. Long, black, and impossibly sleek.",
            specs: [['Style', 'Art Deco'], ['Fins', 'Blade-shaped'], ['Colour', 'Obsidian black'], ['Design', 'Bruce Timm']],
        },
        {
            name: 'Arkham Batmobile',
            era: 'Rocksteady · 2015',
            desc: 'A tank that thinks. Battle mode deploys in under a second. Unmanned operation via the Bat-Computer. Fastest vehicle in any Arkham game.',
            specs: [['Mode', 'Pursuit / Battle'], ['Cannon', '60mm M2'], ['Remote', 'Full AI control'], ['Boost', 'Afterburner']],
        },
    ];

    const timelineEvents = [
        { year: '1939', title: 'Detective Comics #27', desc: "Batman's first appearance. Bob Kane and Bill Finger introduce the world to the Caped Crusader.", side: 'left' },
        { year: '1940', title: 'Robin Introduced', desc: 'Dick Grayson joins as Robin. Batman becomes a mentor. The Bat-Family begins.', side: 'right' },
        { year: '1966', title: 'The TV Series', desc: "Adam West's campy, beloved Batman defined a generation's image of the character.", side: 'left' },
        { year: '1986', title: 'The Dark Knight Returns', desc: "Frank Miller's seminal work redefined Batman as a brutal, obsessive vigilante for mature readers.", side: 'right' },
        { year: '1988', title: 'A Death in the Family', desc: 'Readers voted to kill Jason Todd. Batman fails to save his Robin. His deepest scar.', side: 'left' },
        { year: '1989', title: 'Batman (1989)', desc: "Tim Burton's film. Michael Keaton. Jack Nicholson. The blockbuster that proved comics were cinema.", side: 'right' },
        { year: '1992', title: 'Batman: The Animated Series', desc: "Paul Dini and Bruce Timm's masterpiece. The definitive Batman for millions. Kevin Conroy's voice.", side: 'left' },
        { year: '2005', title: 'Batman Begins', desc: "Christopher Nolan resets everything. Bruce Wayne's origin reframed as psychological thriller.", side: 'right' },
        { year: '2008', title: 'The Dark Knight', desc: "Heath Ledger's Joker. The film that made superhero movies art. Still the gold standard.", side: 'left' },
        { year: '2022', title: 'The Batman', desc: "Robert Pattinson. Matt Reeves. Neo-noir Gotham. Batman as pure detective, first and foremost.", side: 'right' },
    ];

    const gothamDistricts = [
        { name: 'Crime Alley', sub: 'Park Row', desc: 'Where Thomas and Martha Wayne were murdered. The wound that never heals. Batman patrols it every year on the anniversary.', threat: 'Extreme', color: '#ff4444' },
        { name: 'The Narrows', sub: 'Arkham Island', desc: 'Home of Arkham Asylum. Where Gotham puts the monsters it cannot kill. A revolving door for the criminally insane.', threat: 'Critical', color: '#ff6600' },
        { name: 'The Bowery', sub: 'East Side', desc: "Gotham's most dangerous neighbourhood. Gang territory. Penguin's turf. Where the Bat-Signal rarely reaches.", threat: 'High', color: '#f5c518' },
        { name: 'Wayne Tower', sub: 'Midtown', desc: "The financial and symbolic heart of Gotham. Bruce Wayne's public face. The city's tallest spire, watching everything.", threat: 'Protected', color: '#44cc88' },
        { name: 'Gotham Harbour', sub: 'South Waterfront', desc: 'Smuggling routes. Black market docks. The Penguin controls most of the import flow through here.', threat: 'High', color: '#f5c518' },
        { name: 'The Batcave', sub: 'Beneath Wayne Manor', desc: 'Command centre. Laboratory. Memorial. The Cave holds the suit, the car, and the grief that drives everything.', threat: 'Classified', color: '#888' },
    ];

    useEffect(() => {
        // Spotlight cursor
        const spotlight = spotlightRef.current;
        const ring = ringRef.current;
        const dot = dotRef.current;
        let spotX = window.innerWidth / 2, spotY = window.innerHeight / 2;
        let mouseX = spotX, mouseY = spotY, lastAngle = 0;

        const setCursorVisible = (visible) => {
            const opacity = visible ? '1' : '0';
            dot.style.opacity = opacity;
            ring.style.opacity = opacity;
            spotlight.style.opacity = visible ? '' : '0';
        };

        const onMouseMove = (e) => {
            const dx = e.clientX - mouseX, dy = e.clientY - mouseY;
            mouseX = e.clientX; mouseY = e.clientY;
            if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5)
                lastAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
            dot.style.transform = `translate(-50%,-50%) rotate(${lastAngle}deg)`;
            ring.style.left = mouseX + 'px'; ring.style.top = mouseY + 'px';
        };

        const onDocLeave = (e) => { if (!e.relatedTarget) setCursorVisible(false); };
        const onDocEnter = () => setCursorVisible(true);

        // Hide custom cursor when inside the batmobile iframe (it steals mousemove)
        const iframeWrap = document.querySelector('.batmobile-iframe-wrap');
        const onIframeEnter = () => setCursorVisible(false);
        const onIframeLeave = () => setCursorVisible(true);
        iframeWrap?.addEventListener('mouseenter', onIframeEnter);
        iframeWrap?.addEventListener('mouseleave', onIframeLeave);

        let rafId;
        function animSpot() {
            spotX += (mouseX - spotX) * 0.08;
            spotY += (mouseY - spotY) * 0.08;
            spotlight.style.left = spotX + 'px';
            spotlight.style.top = spotY + 'px';
            rafId = requestAnimationFrame(animSpot);
        }
        rafId = requestAnimationFrame(animSpot);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onDocLeave);
        document.addEventListener('mouseenter', onDocEnter);

        // Wayne reveal
        const container = wayneContainerRef.current;
        const batman = batmanLayerRef.current;
        const spot = { radius: 0 };
        let cx = 0, cy = 0, hovered = false;

        function applyMask(x, y, r) {
            if (r <= 0.1) { batman.style.webkitMaskImage = 'none'; batman.style.maskImage = 'none'; return; }
            const inner = r * 0.75;
            const g = `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 0%, transparent ${inner}px, black ${r}px)`;
            batman.style.webkitMaskImage = g;
            batman.style.maskImage = g;
        }

        const onEnter = (e) => {
            hovered = true;
            const rect = container.getBoundingClientRect();
            cx = e.clientX - rect.left; cy = e.clientY - rect.top;
            gsap.to(spot, { radius: 150, duration: .5, ease: 'power2.out', onUpdate: () => { if (hovered) applyMask(cx, cy, spot.radius); } });
        };
        const onMove = (e) => {
            const rect = container.getBoundingClientRect();
            cx = e.clientX - rect.left; cy = e.clientY - rect.top;
            applyMask(cx, cy, spot.radius);
            gsap.to(container, { rotateY: (cx / rect.width - .5) * 14, rotateX: -(cy / rect.height - .5) * 14, duration: .35, ease: 'power3.out' });
        };
        const onLeave = () => {
            hovered = false;
            gsap.to(spot, { radius: 0, duration: .6, ease: 'power2.inOut', onUpdate: () => applyMask(cx, cy, spot.radius), onComplete: () => { batman.style.webkitMaskImage = 'none'; batman.style.maskImage = 'none'; } });
            gsap.to(container, { rotateX: 0, rotateY: 0, duration: .8, ease: 'power3.out' });
        };

        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);

        // Chronicles horizontal scroll
        const outer = document.querySelector('.chronicles-sticky-outer');
        const track = document.getElementById('chroniclesTrack');
        const fill = document.getElementById('chroniclesProgress');
        const current = document.getElementById('chroniclesCurrentSlide');
        const total = document.getElementById('chroniclesTotalSlides');

        let chroniclesScrollHandler;
        if (outer && track) {
            const slides = track.querySelectorAll('.chron-slide');
            if (total) total.textContent = String(slides.length).padStart(2, '0');
            const onScroll = () => {
                const rect = outer.getBoundingClientRect();
                const scrolled = -rect.top;
                const maxScroll = outer.offsetHeight - window.innerHeight;
                const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
                const maxShift = track.scrollWidth - window.innerWidth + 120;
                track.style.transform = `translateX(-${progress * maxShift}px)`;
                if (fill) fill.style.width = (progress * 100) + '%';
                if (current) {
                    const midX = progress * maxShift + window.innerWidth / 2;
                    let closest = 0, minD = Infinity, cumX = 60;
                    slides.forEach((s, i) => {
                        const c = cumX + s.offsetWidth / 2, d = Math.abs(c - midX);
                        if (d < minD) { minD = d; closest = i; }
                        cumX += s.offsetWidth + 20;
                    });
                    current.textContent = String(closest + 1).padStart(2, '0');
                }
            };
            chroniclesScrollHandler = onScroll;
            window.addEventListener('scroll', onScroll, { passive: true });
        }

        // Scroll reveal
        const selectors = ['.code-rule', '.arsenal-item', '.rogue-card', '.ally-card', '.code-header', '.arsenal-header', '.rogues-header', '.allies-header', '.timeline-event', '.district-card'];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach((el, i) => {
                el.classList.add('reveal');
                const d = i % 3;
                if (d > 0) el.classList.add(`reveal-delay-${d}`);
            });
        });
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

        // Code rule lines
        const obsCode = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const line = e.target.querySelector('.code-rule-line');
                    if (line) setTimeout(() => { line.style.width = '100%'; }, 200);
                    obsCode.unobserve(e.target);
                }
            });
        }, { threshold: .3 });
        document.querySelectorAll('.code-rule').forEach(r => obsCode.observe(r));

        // Loyalty bars
        const alliesSection = document.querySelector('.allies-section');
        if (alliesSection) {
            let triggered = false;
            new IntersectionObserver(entries => {
                entries.forEach(e => {
                    if (e.isIntersecting && !triggered) {
                        triggered = true;
                        document.querySelectorAll('.ally-loyalty-fill').forEach((bar, i) => {
                            bar.style.animationDelay = (i * .15) + 's';
                            bar.style.animationPlayState = 'running';
                        });
                    }
                });
            }, { threshold: .2 }).observe(alliesSection);
        }

        // Nav hide on scroll
        const nav = document.querySelector('nav');
        let lastY = window.scrollY;
        const onNavScroll = () => {
            const y = window.scrollY;
            if (y > lastY && y > 100) { nav.style.transform = 'translateY(-100%)'; nav.style.opacity = '0'; }
            else { nav.style.transform = 'translateY(0)'; nav.style.opacity = '1'; }
            lastY = y;
        };
        window.addEventListener('scroll', onNavScroll);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onDocLeave);
            document.removeEventListener('mouseenter', onDocEnter);
            iframeWrap?.removeEventListener('mouseenter', onIframeEnter);
            iframeWrap?.removeEventListener('mouseleave', onIframeLeave);
            container.removeEventListener('mouseenter', onEnter);
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('mouseleave', onLeave);
            if (chroniclesScrollHandler) window.removeEventListener('scroll', chroniclesScrollHandler);
            window.removeEventListener('scroll', onNavScroll);
            obs.disconnect();
            obsCode.disconnect();
        };
    }, []);

    return (
        <>
            {/* Spotlight cursor */}
            <div id="bat-spotlight" ref={spotlightRef}></div>
            <div id="bat-cursor-ring" ref={ringRef}></div>
            <svg id="bat-cursor-dot" ref={dotRef} viewBox="0 0 60 26" xmlns="http://www.w3.org/2000/svg">
                <path d="M30,13 C28,8 20,2 8,4 C14,8 17,11 16,14 C12,12 6,11 0,13 C6,14 11,13 14,16 C10,17 6,18 4,22 C10,18 18,16 22,17 C24,20 26,22 30,26 C34,22 36,20 38,17 C42,16 50,18 56,22 C54,18 50,17 46,16 C49,13 54,14 60,13 C54,11 48,12 44,14 C43,11 46,8 52,4 C40,2 32,8 30,13 Z" fill="#f5c518" />
                <path d="M30,13 C29,15 28,17 30,19 C32,17 31,15 30,13 Z" fill="#d4a017" />
            </svg>

            {/* ── NAV ── */}
            <nav>
                <div className="nav-logo">⬡ Batman</div>
                <div className={`nav-links${navOpen ? ' open' : ''}`}>
                    <button onClick={() => scrollToSection('identity')}>Identity</button>
                    <button onClick={() => scrollToSection('profile')}>Profile</button>
                    <button onClick={() => scrollToSection('the-code')}>Code</button>
                    <button onClick={() => scrollToSection('arsenal')}>Arsenal</button>
                    <button onClick={() => scrollToSection('batmobile')}>Batmobile</button>
                    <button onClick={() => scrollToSection('rogues')}>Rogues</button>
                    <button onClick={() => scrollToSection('gotham')}>Gotham</button>
                    <button onClick={() => scrollToSection('legacy')}>Legacy</button>
                    {onBack && (
                        <button className="bat-nav-back bat-nav-back--mobile" onClick={onBack}>← CHANGE GUARDIAN</button>
                    )}
                </div>
                <div className="nav-right">
                    {onBack && (
                        <button className="bat-nav-back bat-nav-back--desktop" onClick={onBack}>
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M9 2L4 7L9 12" stroke="#f5c518" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            CHANGE GUARDIAN
                        </button>
                    )}
                    <button className="bat-nav__toggle" onClick={() => setNavOpen(o => !o)} aria-label="Toggle menu">
                        <span style={{ transform: navOpen ? 'rotate(45deg) translate(4px, 4px)' : '' }} />
                        <span style={{ opacity: navOpen ? 0 : 1 }} />
                        <span style={{ transform: navOpen ? 'rotate(-45deg) translate(4px, -4px)' : '' }} />
                    </button>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-bg-glow"></div>
                <div className="hero-logo-bg">
                    <img src={images.logo} alt="" className="hero-logo-img" />
                </div>
                <div className="hero-content">
                    <p className="hero-eyebrow">Gotham City's Protector</p>
                    <h1 className="hero-title"><span className="the">The</span>BATMAN</h1>
                    <p className="hero-sub">Vengeance · Justice · Darkness</p>
                    <div className="scroll-hint">
                        <span>Scroll</span>
                        <div className="scroll-line"></div>
                    </div>
                </div>
            </section>

            {/* ── CHRONICLES ── */}
            <section id="chronicles" className="chronicles-section">
                <div className="chronicles-header">
                    <p className="section-eyebrow">The Legend</p>
                    <h2 className="section-title">Through <span>Darkness</span><br />He Endures</h2>
                </div>
                <div className="chronicles-sticky-outer">
                    <div className="chronicles-sticky">
                        <div className="chronicles-track" id="chroniclesTrack">
                            <div className="chron-slide">
                                <div className="chron-img-wrap"><img src={images.gothamCity} alt="Gotham" className="chron-img" loading="lazy" /></div>
                                <div className="chron-label"><span className="chron-context">Gotham, Year One</span></div>
                            </div>
                            <div className="chron-slide chron-slide--quote">
                                <div className="chron-quote-inner">
                                    <div className="chron-quote-mark">"</div>
                                    <p className="chron-quote-text">I am vengeance. I am the night. I am Batman.</p>
                                    <span className="chron-quote-cite">— Batman: The Animated Series</span>
                                </div>
                            </div>
                            <div className="chron-slide">
                                <div className="chron-img-wrap"><img src={images.batCave} alt="The Batcave" className="chron-img" loading="lazy" /></div>
                                <div className="chron-label"><span className="chron-context">The Batcave, Beneath Wayne Manor</span></div>
                            </div>
                            <div className="chron-slide chron-slide--wide">
                                <div className="chron-img-wrap"><img src={images.rooftop} alt="Rooftop" className="chron-img" loading="lazy" /></div>
                                <div className="chron-label"><span className="chron-context">Gotham Rooftops, Midnight</span></div>
                                <div className="chron-overlay-text">The Protector</div>
                            </div>
                            <div className="chron-slide chron-slide--quote">
                                <div className="chron-quote-inner">
                                    <div className="chron-quote-mark">"</div>
                                    <p className="chron-quote-text">Why do we fall? So we can learn to pick ourselves up.</p>
                                    <span className="chron-quote-cite">— Thomas Wayne</span>
                                </div>
                            </div>
                            <div className="chron-slide">
                                <div className="chron-img-wrap"><img src={images.wayne} alt="Bruce Wayne" className="chron-img" loading="lazy" /></div>
                                <div className="chron-label"><span className="chron-context">Bruce Wayne, Billionaire by Day</span></div>
                            </div>
                            <div className="chron-slide">
                                <div className="chron-img-wrap"><img src={images.cape} alt="The Cape" className="chron-img" loading="lazy" /></div>
                                <div className="chron-label"><span className="chron-context">The Cape, The Cowl, The Symbol</span></div>
                            </div>
                            <div className="chron-slide chron-slide--quote">
                                <div className="chron-quote-inner">
                                    <div className="chron-quote-mark">"</div>
                                    <p className="chron-quote-text">It's not who I am underneath, but what I do that defines me.</p>
                                    <span className="chron-quote-cite">— Bruce Wayne</span>
                                </div>
                            </div>
                            <div className="chron-slide chron-slide--wide">
                                <div className="chron-img-wrap"><img src={images.bvj} alt="Batman vs Joker" className="chron-img" loading="lazy" /></div>
                                <div className="chron-label"><span className="chron-context">The Eternal Battle</span></div>
                                <div className="chron-overlay-text">Dark Knight</div>
                            </div>
                            <div className="chron-slide chron-slide--end">
                                <div className="chron-end-inner">
                                    <p className="chron-end-year">1939 — Present</p>
                                    <h3 className="chron-end-title">The Legend<br />Never Dies.</h3>
                                    <div className="chron-end-line"></div>
                                    <p className="chron-end-sub">Eighty-five years of darkness,<br />justice, and unwavering will.</p>
                                </div>
                            </div>
                        </div>
                        <div className="chronicles-progress-bar">
                            <div className="chronicles-progress-fill" id="chroniclesProgress"></div>
                        </div>
                        <div className="chronicles-counter">
                            <span id="chroniclesCurrentSlide">01</span>
                            <span className="chronicles-counter-sep">—</span>
                            <span id="chroniclesTotalSlides">10</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── IDENTITY ── */}
            <section id="identity" className="identity-section">
                <div className="wayne-reveal-container" ref={wayneContainerRef}>
                    <div className="wayne-glow"></div>
                    <div className="wayne-layer bruce-layer"><img src={images.bruce} alt="Bruce Wayne" /></div>
                    <div className="wayne-layer batman-layer" ref={batmanLayerRef}><img src={images.absolute} alt="Batman" /></div>
                    <div className="wayne-noise"></div>
                    <div className="wayne-vignette"></div>
                </div>
                <div className="identity-info">
                    <p className="section-eyebrow">Dual Identity</p>
                    <h2 className="section-title">The Man<br />Behind the <span>Mask</span></h2>
                    <div className="divider"></div>
                    <p className="description">By day, <strong style={{ color: '#ccc' }}>Bruce Wayne</strong> is Gotham's wealthiest philanthropist. By night, he becomes something more than human: a symbol, a shadow, a force of justice.</p>
                    <p className="description" style={{ marginTop: '14px' }} id="wayne-hint">Hover over the card to unmask the Dark Knight.</p>
                    <div className="stats-grid">
                        <div className="stat-item"><div className="stat-label">Alias</div><div className="stat-value">Bruce Wayne</div></div>
                        <div className="stat-item"><div className="stat-label">Base</div><div className="stat-value">The Batcave</div></div>
                        <div className="stat-item"><div className="stat-label">Publisher</div><div className="stat-value">DC Comics</div></div>
                        <div className="stat-item"><div className="stat-label">Created</div><div className="stat-value">1939</div></div>
                    </div>
                </div>
            </section>

            {/* ── THE CODE ── */}
            <section id="the-code" className="code-section">
                <div className="code-inner">
                    <div className="code-header">
                        <p className="section-eyebrow">The Philosophy</p>
                        <h2 className="section-title">The <span>Code</span></h2>
                        <p className="code-subtitle">Four laws. No exceptions. No compromise.</p>
                    </div>
                    <div className="code-rules">
                        {[
                            { n: '01', title: 'I Do Not Kill', desc: 'The one rule that separates justice from vengeance. No matter the villain, no matter the crime — the line is never crossed.' },
                            { n: '02', title: 'Fear Is a Tool', desc: 'Criminals are a cowardly, superstitious lot. The cowl, the darkness, the silence — all weaponised.' },
                            { n: '03', title: 'Preparation Is Everything', desc: 'He has no powers — only preparation. Every scenario modelled. Every weakness catalogued.' },
                            { n: '04', title: 'Gotham Is Worth Saving', desc: 'Every bruise, every sleepless night, every sacrifice — for one city. Broken, corrupt, beautiful Gotham.' },
                        ].map(rule => (
                            <div className="code-rule" key={rule.n}>
                                <div className="code-rule-number">{rule.n}</div>
                                <div className="code-rule-body">
                                    <h3 className="code-rule-title">{rule.title}</h3>
                                    <p className="code-rule-desc">{rule.desc}</p>
                                </div>
                                <div className="code-rule-line"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROFILE ── */}
            <section id="profile" className="profile-section">
                <div className="profile-inner">
                    <p className="section-eyebrow" style={{ textAlign: 'center' }}>Dossier</p>
                    <h2 className="section-title" style={{ textAlign: 'center', fontSize: '2.4rem', marginBottom: '50px' }}>The Dark <span>Knight</span></h2>
                    <div className="desc-section">
                        <div>
                            <p className="description">Batman is a fictional superhero appearing in American comic books published by DC Comics, created by Bob Kane and Bill Finger, first appearing in Detective Comics #27 in May 1939.</p>
                            <p className="description" style={{ marginTop: '16px' }}>Witnessing the murder of his parents as a young boy, Bruce Wayne vowed to wage war on crime. He trained his body and mind to human perfection.</p>
                        </div>
                        <div>
                            <div className="abilities">
                                <p className="abilities-title">Core Attributes</p>
                                {[
                                    { label: 'Intellect', pct: 97 },
                                    { label: 'Combat Mastery', pct: 99 },
                                    { label: 'Willpower', pct: 100 },
                                    { label: 'Stealth', pct: 95 },
                                    { label: 'Technology', pct: 98 },
                                    { label: 'Detective Skills', pct: 99 },
                                ].map((a, i) => (
                                    <div className="ability-row" key={a.label}>
                                        <div className="ability-header"><span>{a.label}</span><span className="pct">{a.pct}%</span></div>
                                        <div className="ability-bar-bg">
                                            <div className="ability-bar-fill" style={{ width: `${a.pct}%`, animationDelay: `${i * 0.2}s` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ARSENAL ── (redesigned icons) */}
            <section id="arsenal" className="arsenal-section">
                <div className="arsenal-inner">
                    <div className="arsenal-header">
                        <p className="section-eyebrow">Equipment</p>
                        <h2 className="section-title">The <span>Arsenal</span></h2>
                        <p className="arsenal-subtitle">No superpowers. Just the finest technology money can build.</p>
                    </div>
                    <div className="arsenal-grid">
                        {[
                            { key: 'Batarang', name: 'Batarang', desc: 'Precision aerodynamic throwing weapon. Returns to thrower. Used for disarming, grappling and signalling.', tag: 'Signature Weapon' },
                            { key: 'GrappleGun', name: 'Grapple Gun', desc: 'Fires a hooked line at 60 m/s. Reaches 300 feet in under 4 seconds.', tag: 'Mobility' },
                            { key: 'Batmobile', name: 'Batmobile', desc: 'Armoured pursuit vehicle. Top speed exceeds 200 mph. Turbine-powered with onboard forensic lab.', tag: 'Vehicle' },
                            { key: 'Cowl', name: 'The Cowl', desc: 'Kevlar-lined helmet with sonar, infrared, electromagnetic scanners and voice modulator.', tag: 'Armour' },
                            { key: 'SmokePellets', name: 'Smoke Pellets', desc: "Ceramic capsules deploying an instant 10-metre smoke radius. Batman's preferred exit strategy.", tag: 'Tactical' },
                            { key: 'BatComputer', name: 'Bat-Computer', desc: "World's most advanced crimefighting AI. Cross-references criminal databases globally.", tag: 'Intelligence' },
                        ].map(item => {
                            const Icon = ArsenalIcons[item.key];
                            return (
                                <div className="arsenal-item" key={item.name}>
                                    <div className="arsenal-icon-wrap">
                                        <Icon />
                                    </div>
                                    <h4 className="arsenal-name">{item.name}</h4>
                                    <p className="arsenal-desc">{item.desc}</p>
                                    <div className="arsenal-tag">{item.tag}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════
                NEW SECTION 1 — BATMOBILE SHOWCASE
            ════════════════════════════════════════════════ */}
            <section id="batmobile" className="batmobile-section">
                <div className="batmobile-inner">
                    <div className="batmobile-header">
                        <p className="section-eyebrow">The Machine</p>
                        <h2 className="section-title">The <span>Batmobile</span></h2>
                        <p className="batmobile-subtitle">Every era gets the car it deserves.</p>
                    </div>

                    <div className="batmobile-iframe-wrap">
                        <iframe
                            src="/batmobile-3d-viewer.html"
                            title="Batmobile 3D Viewer"
                            className="batmobile-iframe"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* ── ROGUES ── */}
            <section id="rogues" className="rogues-section">
                <div className="rogues-inner">
                    <div className="rogues-header">
                        <p className="section-eyebrow">Adversaries</p>
                        <h2 className="section-title">Rogues <span>Gallery</span></h2>
                        <p className="rogues-subtitle">Every hero is defined by his villains.</p>
                    </div>
                    <div className="rogues-grid">
                        {[
                            { img: images.villains.joker, name: 'The Joker', alias: 'The Clown Prince of Crime', bio: 'Anarchist. Chaos incarnate. The one enemy who cannot be predicted, profiled, or prepared for.', threat: '∞', threatClass: 'critical', badge: 'Critical', first: 1940, villain: 'joker' },
                            { img: images.villains.twoFace, name: 'Two-Face', alias: 'Harvey Dent — Former D.A.', bio: "Once Gotham's best hope. Batman's greatest failure made flesh.", threat: '9.2', threatClass: 'high', badge: 'High', first: 1942, villain: 'twoface' },
                            { img: images.villains.bane, name: 'Bane', alias: 'The Man Who Broke the Bat', bio: 'The only villain to have truly defeated Batman — breaking his back in Knightfall.', threat: '9.5', threatClass: 'high', badge: 'High', first: 1993, villain: 'bane' },
                            { img: images.villains.riddler, name: 'The Riddler', alias: 'Edward Nygma — The Question Mark', bio: 'The only villain who wants Batman to catch him.', threat: '8.7', threatClass: 'high', badge: 'High', first: 1948, villain: 'riddler' },
                            { img: images.villains.scarecrow, name: 'Scarecrow', alias: 'Dr. Jonathan Crane', bio: 'His Fear Toxin weaponises the unconscious, forcing victims to confront their deepest terrors.', threat: '8.1', threatClass: 'moderate', badge: 'Moderate', first: 1941, villain: 'scarecrow' },
                            { img: images.villains.ras, name: "Ra's al Ghul", alias: "The Demon's Head", bio: 'Centuries old via the Lazarus Pit. Will destroy Gotham to prove his point.', threat: '9.0', threatClass: 'high', badge: 'High', first: 1971, villain: 'ras' },
                        ].map(r => (
                            <div className="rogue-card" key={r.name} data-villain={r.villain}>
                                <div className="rogue-img-slot">
                                    <img src={r.img} className="rogue-img" alt={r.name} loading="lazy" />
                                    <div className={`rogue-threat-badge ${r.badge === 'Critical' ? '' : r.badge.toLowerCase()}`}>{r.badge}</div>
                                </div>
                                <div className="rogue-info">
                                    <h3 className="rogue-name">{r.name}</h3>
                                    <p className="rogue-alias">{r.alias}</p>
                                    <p className="rogue-bio">{r.bio}</p>
                                    <div className="rogue-stats">
                                        <div className="rogue-stat"><span className="rogue-stat-label">Threat</span><span className={`rogue-stat-val ${r.threatClass}`}>{r.threat}</span></div>
                                        <div className="rogue-stat"><span className="rogue-stat-label">First</span><span className="rogue-stat-val">{r.first}</span></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ALLIES ── */}
            <section id="allies" className="allies-section">
                <div className="allies-inner">
                    <div className="allies-header">
                        <p className="section-eyebrow">The Bat-Family</p>
                        <h2 className="section-title">He Does Not <span>Stand Alone</span></h2>
                        <p className="allies-subtitle">Behind the mask, a network of trust forged in darkness.</p>
                    </div>
                    <div className="allies-row">
                        {[
                            { img: images.allies.alfred, name: 'Alfred Pennyworth', role: 'Butler · Medic · Confidant', bio: 'The only person who has ever truly known Bruce Wayne. The moral compass Batman cannot always hear.', loyalty: 100 },
                            { img: images.allies.gordon, name: 'Commissioner Gordon', role: 'GCPD · Bat-Signal · Partner', bio: 'The last honest cop in a corrupt city. His trust in Batman is the thin blue line between Gotham and chaos.', loyalty: 92 },
                            { img: images.allies.robin, name: 'Robin', role: 'Ward · Partner · The Boy Wonder', bio: "Dick Grayson. Jason Todd. Tim Drake. Damian Wayne. Batman's reminder that hope is not weakness.", loyalty: 88 },
                            { img: images.allies.nightwing, name: 'Nightwing', role: 'Dick Grayson · Former Robin', bio: "Proof that Batman's greatest legacy isn't justice — it's the people he inspires.", loyalty: 95 },
                        ].map(a => (
                            <div className="ally-card" key={a.name}>
                                <div className="ally-img-slot"><img src={a.img} className="ally-img" alt={a.name} loading="lazy" /></div>
                                <div className="ally-info">
                                    <h4 className="ally-name">{a.name}</h4>
                                    <p className="ally-role">{a.role}</p>
                                    <p className="ally-bio">{a.bio}</p>
                                    <div className="ally-loyalty">
                                        <span className="ally-loyalty-label">Loyalty</span>
                                        <div className="ally-loyalty-bar">
                                            <div className="ally-loyalty-fill" style={{ width: `${a.loyalty}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════
                NEW SECTION 2 — GOTHAM CITY DEEP DIVE
            ════════════════════════════════════════════════ */}
            <section id="gotham" className="gotham-section">
                <div className="gotham-inner">
                    <div className="gotham-header">
                        <p className="section-eyebrow">The City</p>
                        <h2 className="section-title">Gotham <span>City</span></h2>
                        <p className="gotham-subtitle">The most dangerous city in America. The only city worth saving.</p>
                    </div>

                    {/* Gotham schematic map */}
                    <div className="gotham-map-wrap">
                        <div className="gotham-map-label">GCPD TACTICAL — DISTRICT OVERVIEW</div>
                        <GothamMapViewer src={images.map} />
                        <div className="gotham-map-scan"></div>
                    </div>

                    <div className="gotham-districts">
                        {gothamDistricts.map((d) => (
                            <div className="district-card" key={d.name}>
                                <div className="district-dot" style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }}></div>
                                <div className="district-body">
                                    <div className="district-head">
                                        <div>
                                            <h4 className="district-name">{d.name}</h4>
                                            <p className="district-sub">{d.sub}</p>
                                        </div>
                                        <span className="district-threat" style={{ color: d.color, borderColor: d.color }}>{d.threat}</span>
                                    </div>
                                    <p className="district-desc">{d.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ORIGIN ── */}
            <section id="origin" className="comic-section">
                <div className="comic-inner">
                    <div className="comic-title-block">
                        <p className="section-eyebrow">Origin</p>
                        <h2 className="section-title" style={{ fontSize: '2.2rem' }}>First <span>Appearance</span></h2>
                    </div>
                    <div className="comic-layout">
                        <div className="comic-cover">
                            <img src={images.firstCover} alt="Detective Comics #27" className="comic-cover-img" loading="lazy" />
                            <div className="comic-cover-overlay">
                                <div className="comic-badge">Historical</div>
                                <div className="comic-cover-title">Detective Comics #27</div>
                            </div>
                        </div>
                        <div className="comic-details">
                            <h3>Where It <span>All Began</span></h3>
                            <div className="comic-meta">
                                {[
                                    ['Issue', 'Detective Comics #27'],
                                    ['Published', 'May 1939'],
                                    ['Writer', 'Bill Finger'],
                                    ['Artist', 'Bob Kane'],
                                    ['Publisher', 'DC Comics'],
                                    ['Cover Price', '10¢'],
                                ].map(([k, v]) => (
                                    <div className="meta-row" key={k}><span className="key">{k}</span><span className="val">{v}</span></div>
                                ))}
                            </div>
                            <p className="synopsis">In his debut, the Batman investigates a series of murders among Gotham's chemical industry elite. The final panel reveals his identity as Bruce Wayne.</p>
                            <div className="collector-note">
                                <p className="collector-label">Collector Note</p>
                                <p className="collector-text">A near-mint copy sold at Heritage Auctions in 2010 for $1,075,500 — one of the most valuable comics ever sold.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════
                NEW SECTION 3 — TIMELINE / LEGACY
            ════════════════════════════════════════════════ */}
            <section id="legacy" className="timeline-section">
                <div className="timeline-inner">
                    <div className="timeline-header">
                        <p className="section-eyebrow">The Legacy</p>
                        <h2 className="section-title">85 Years of <span>Darkness</span></h2>
                        <p className="timeline-subtitle">From pulp detective to cultural icon. The longest shadow in comics.</p>
                    </div>

                    <div className="timeline-track">
                        <div className="timeline-spine"></div>
                        {timelineEvents.map((ev, i) => (
                            <div className={`timeline-event timeline-event--${ev.side}`} key={ev.year}>
                                <div className="timeline-event-content">
                                    <span className="timeline-year">{ev.year}</span>
                                    <h4 className="timeline-title">{ev.title}</h4>
                                    <p className="timeline-desc">{ev.desc}</p>
                                </div>
                                <div className="timeline-node">
                                    <div className="timeline-node-inner"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── QUOTE ── */}
            <section id="quote" className="quote-section">
                <blockquote>
                    "It's not who I am underneath, but what I do that defines me."
                    <cite>— Bruce Wayne / Batman</cite>
                </blockquote>
            </section>

            {/* ── REVIEW ── */}
            <ReviewSection character="batman" />

            {/* ── FOOTER ── */}
            <footer>
                <div className="footer-inner">
                    <div className="footer-top">
                        <div className="footer-logo-mark">
                            <div className="footer-logo-symbol">⬡</div>
                            <div className="footer-logo-text">Batman</div>
                            <div className="footer-logo-tagline">The Dark Knight · Gotham City</div>
                        </div>
                        <div className="footer-nav">
                            <div className="footer-nav-row">
                                <button onClick={() => scrollToSection('identity')}>Identity</button>
                                <button onClick={() => scrollToSection('profile')}>Profile</button>
                                <button onClick={() => scrollToSection('the-code')}>The Code</button>
                                <button onClick={() => scrollToSection('arsenal')}>Arsenal</button>
                                <button onClick={() => scrollToSection('batmobile')}>Batmobile</button>
                            </div>
                            <div className="footer-nav-row">
                                <button onClick={() => scrollToSection('rogues')}>Rogues Gallery</button>
                                <button onClick={() => scrollToSection('gotham')}>Gotham</button>
                                <button onClick={() => scrollToSection('legacy')}>Legacy</button>
                                <button onClick={() => scrollToSection('origin')}>Origin</button>
                                <button onClick={() => scrollToSection('quote')}>Creed</button>
                            </div>
                        </div>
                    </div>
                    <div className="footer-mid">
                        <div className="footer-col">
                            <p className="footer-col-label">The Legend</p>
                            <p className="footer-col-title">Eighty-Five Years of Darkness</p>
                            <p className="footer-col-body">From Detective Comics #27 in 1939 to the present day, Batman has endured as one of fiction's most compelling figures.</p>
                        </div>
                        <div className="footer-col">
                            <p className="footer-col-label">Status</p>
                            <p className="footer-col-title">Gotham Under Watch</p>
                            <div className="footer-signal">
                                <div className="footer-signal-dot"></div>
                                <span className="footer-signal-label">Bat-Signal · Active</span>
                            </div>
                        </div>
                        <div className="footer-col">
                            <p className="footer-col-label">Publication</p>
                            <p className="footer-col-title">Created by Kane &amp; Finger</p>
                            <p className="footer-col-body">Published continuously by <strong>DC Comics</strong> since 1939.</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p className="footer-copy">© DC Comics · Batman created 1939 · All rights reserved</p>
                        <div className="footer-credits">
                            <span>Bob Kane</span><span className="footer-sep">·</span>
                            <span>Bill Finger</span><span className="footer-sep">·</span>
                            <span>DC Comics</span>
                        </div>
                        <div className="footer-dev">
                            <span className="footer-dev-label">Developed by</span>
                            <span className="footer-dev-name">Nihan</span>
                        </div>
                        {onBack && (
                            <button className="bat-nav-back" style={{ fontSize: '.55rem' }} onClick={onBack}>← CHANGE GUARDIAN</button>
                        )}
                    </div>
                </div>
            </footer>
        </>
    );
}