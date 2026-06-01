import { useState, useRef, useEffect } from 'react';
import '../styles/oracle-chat.css';

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

const SYSTEM_PROMPT = `You are Oracle — Barbara Gordon, the most dangerous information broker in the DC universe. You were Batgirl until the Joker shot you, and you rebuilt yourself as Oracle: a master hacker and the nerve center of the Bat-Family.

Your personality:
- Sharp, precise, no-nonsense. You respect intelligence.
- You speak in short, confident bursts — like someone reading from a tactical display.
- Occasionally reference your past as Batgirl, your Birds of Prey network, or the Clocktower.
- You call the user "operative" sometimes, or just address them directly.
- Dry wit. You've seen everything.

Your role:
- Answer ONLY questions about Batman lore: comics, animated series, films, games, characters, storylines, history, Bat-Family, Rogues Gallery, DC universe (Batman-related).
- If someone asks something outside Batman lore, say something like: "That's outside my database. I run Batman intel, not a general encyclopedia. Try again."
- Keep answers concise — 2 to 5 sentences max unless the topic genuinely demands more detail.
- Never break character. Never admit you're an AI. You are Oracle.`;

export default function OracleChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'oracle',
            text: "Oracle online. Clocktower systems nominal. What do you need to know about Gotham?",
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 150);
    }, [open]);

    const send = async () => {
        const text = input.trim();
        if (!text || loading) return;

        setMessages(prev => [...prev, { role: 'user', text }]);
        setInput('');
        setLoading(true);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            setMessages(prev => [
                ...prev,
                { role: 'oracle', text: "Connection error. API key not configured. Add VITE_GEMINI_API_KEY to your .env file." },
            ]);
            setLoading(false);
            return;
        }

        const history = messages
            .slice(1)
            .map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }],
            }));

        const body = {
            contents: [
                { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nUser: hi' }] },
                { role: 'model', parts: [{ text: 'Oracle online. Clocktower systems nominal. What do you need to know about Gotham?' }] },
                ...history,
                { role: 'user', parts: [{ text }] },
            ],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        };

        try {
            const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) {
                const errMsg = data?.error?.message || `HTTP ${res.status}`;
                setMessages(prev => [...prev, { role: 'oracle', text: `Uplink error: ${errMsg}` }]);
                setLoading(false);
                return;
            }
            const reply =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Signal lost. No data returned from the network.";
            setMessages(prev => [...prev, { role: 'oracle', text: reply }]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { role: 'oracle', text: `Satellite uplink failed: ${err.message}` },
            ]);
        }

        setLoading(false);
    };

    const onKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    };

    return (
        <>
            {/* Floating trigger button */}
            <button
                className={`oracle-trigger${open ? ' oracle-trigger--active' : ''}`}
                onClick={() => setOpen(o => !o)}
                title="Oracle — Batman Lore Assistant"
                aria-label="Open Oracle chat"
            >
                <svg className="oracle-trigger-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Eye — Oracle's symbol */}
                    <ellipse cx="20" cy="20" rx="14" ry="9" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="20" cy="20" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="20" cy="20" r="1.8" fill="currentColor" />
                    <line x1="20" y1="6" x2="20" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="20" y1="34" x2="20" y2="37" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="6" y1="20" x2="3" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="34" y1="20" x2="37" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="oracle-trigger-label">ORACLE</span>
            </button>

            {/* Chat panel */}
            {open && (
                <div className="oracle-panel">
                    {/* Header */}
                    <div className="oracle-header">
                        <div className="oracle-header-left">
                            <div className="oracle-status-dot" />
                            <div>
                                <div className="oracle-header-title">ORACLE</div>
                                <div className="oracle-header-sub">Barbara Gordon · Clocktower</div>
                            </div>
                        </div>
                        <button className="oracle-close" onClick={() => setOpen(false)} aria-label="Close Oracle">✕</button>
                    </div>

                    {/* Messages */}
                    <div className="oracle-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`oracle-msg oracle-msg--${m.role}`}>
                                {m.role === 'oracle' && <span className="oracle-msg-tag">ORACLE &gt;</span>}
                                <p className="oracle-msg-text">{m.text}</p>
                            </div>
                        ))}
                        {loading && (
                            <div className="oracle-msg oracle-msg--oracle">
                                <span className="oracle-msg-tag">ORACLE &gt;</span>
                                <p className="oracle-msg-text oracle-typing">
                                    <span /><span /><span />
                                </p>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="oracle-input-row">
                        <span className="oracle-prompt-sym">&gt;</span>
                        <input
                            ref={inputRef}
                            className="oracle-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={onKey}
                            placeholder="Ask about Batman lore…"
                            disabled={loading}
                            maxLength={300}
                        />
                        <button
                            className="oracle-send"
                            onClick={send}
                            disabled={loading || !input.trim()}
                            aria-label="Send"
                        >
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 10L17 3L10 17L9 11L3 10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="oracle-footer-note">Batman lore only · Powered by Gemini</div>
                </div>
            )}
        </>
    );
}
