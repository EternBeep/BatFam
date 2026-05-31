import { useRef, useState } from 'react';
import { images } from '../assets/images';
import '../styles/screens.css';

export default function Loader({ onEnter }) {
    const clickCount = useRef(0);
    const clickTimer = useRef(null);
    const [secret, setSecret] = useState(false);
    const [wordmarkClicks, setWordmarkClicks] = useState(0);

    const onBatarangClick = () => {
        clickCount.current++;
        clearTimeout(clickTimer.current);
        clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 2500);
        if (clickCount.current >= 7) {
            clickCount.current = 0;
            setSecret(true);
            setTimeout(() => setSecret(false), 3500);
        }
    };

    const onWordmarkClick = () => {
        setWordmarkClicks(n => {
            const next = n + 1;
            if (next >= 5) {
                setTimeout(() => setWordmarkClicks(0), 200);
                return 0;
            }
            return next;
        });
    };

    return (
        <div id="bat-loader">
            <div className="noise-overlay"></div>
            <div className="batarang-wrap" onClick={onBatarangClick} style={{ cursor: 'pointer' }}>
                <svg className="ring-track" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="68" />
                </svg>
                <svg className="ring-progress" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="68" />
                </svg>
                <img src={images.batarang} alt="Batarang" className="batarang-svg" />
            </div>
            <div
                className="loader-wordmark"
                onClick={onWordmarkClick}
                style={{ cursor: 'default', userSelect: 'none' }}
            >
                {'BATFAM'.split('').map((ch, i) => (
                    <span
                        key={i}
                        style={{
                            color: i < wordmarkClicks ? '#f5c518' : undefined,
                            textShadow: i < wordmarkClicks ? '0 0 20px #f5c518' : undefined,
                            transition: 'color 0.3s, text-shadow 0.3s',
                        }}
                    >
                        {ch}
                    </span>
                ))}
            </div>
            {secret && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.92)', pointerEvents: 'none',
                    animation: 'ee-fade-in 0.3s ease both',
                }}>
                    <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🦇</div>
                    <p style={{
                        fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.2rem,3vw,2rem)',
                        color: '#f5c518', letterSpacing: '0.4em', textAlign: 'center',
                        textShadow: '0 0 30px rgba(245,197,24,0.8)',
                    }}>
                        ARE YOU SURE YOU'RE<br />READY FOR GOTHAM?
                    </p>
                    <p style={{ color: '#555', fontFamily: 'Raleway, sans-serif', fontSize: '0.75rem', marginTop: '16px', letterSpacing: '0.2em' }}>
                        (Nice clicking, Detective)
                    </p>
                </div>
            )}
            <button className="enter-btn" onClick={onEnter}>
                Enter Gotham &nbsp;→
            </button>
            <div className="loader-tagline">&nbsp; &nbsp; </div>
        </div>
    );
}