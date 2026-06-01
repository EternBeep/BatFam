import { useState } from 'react';
import '../styles/review-section.css';
import { supabase } from '../lib/supabase';

const LABELS = {
    batman:   ['', 'Gotham Disagrees', 'Needs Work', 'Decent', 'Great', 'Outstanding'],
    nightwing:['', 'Signal Lost',      'Needs Work', 'Decent', 'Great', 'Outstanding'],
    redhood:  ['', 'Garbage',          'Needs Work', 'Decent', 'Good',  'Lethal'],
    redrobin: ['', 'Poor',             'Needs Work', 'Decent', 'Smart', 'Brilliant'],
    damian:   ['', 'Pathetic',         'Needs Work', 'Acceptable', 'Good', 'Worthy'],
};

const THANKS = {
    batman:   { hi: 'The Dark Knight approves of your judgement.',        mid: 'Noted. Gotham always has room to improve.',       lo: 'Harsh — but Batman respects honesty.' },
    nightwing:{ hi: "Bludhaven thanks you. Dick Grayson would be proud.", mid: 'Signal received. We\'ll work on it.',              lo: 'Noted. Even acrobats stumble sometimes.' },
    redhood:  { hi: "Jason Todd doesn't give compliments — but he'd nod.",mid: 'Message received. No mercy for mediocrity.',       lo: 'Fair enough. Red Hood has been through worse.' },
    redrobin: { hi: 'Tim Drake cross-referenced your feedback. Approved.',  mid: 'Logged and analysed. Improvements incoming.',     lo: 'Criticism accepted. Tim would find a way to fix it.' },
    damian:   { hi: 'Tt. Your taste is... acceptable. Barely.',            mid: "The Son of Batman expects perfection. We'll improve.", lo: "Disappointing. Like most things that aren't Damian." },
};

export default function ReviewSection({ character = 'batman' }) {
    const [hovered,   setHovered]   = useState(0);
    const [selected,  setSelected]  = useState(0);
    const [feedback,  setFeedback]  = useState('');
    const [submitted, setSubmitted] = useState(false);

    const char   = LABELS[character] ? character : 'batman';
    const labels = LABELS[char];
    const thanks = THANKS[char];
    const active = hovered || selected;
    const msg    = selected >= 4 ? thanks.hi : selected >= 3 ? thanks.mid : thanks.lo;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!selected) return;
        await supabase.from('ratings').insert({
            character: char,
            rating: selected,
            feedback: feedback.trim() || null,
        });
        setSubmitted(true);
    }

    function handleReset() {
        setSelected(0); setHovered(0); setFeedback(''); setSubmitted(false);
    }

    return (
        <section className="rv-section" data-character={char}>
            <div className="rv-inner">
                <p className="rv-eyebrow">Your Verdict</p>
                <h2 className="rv-title">Rate the <span className="rv-accent">Experience</span></h2>
                <p className="rv-subtitle">How's the site? What can be improved? Let us know.</p>

                {submitted ? (
                    <div className="rv-thanks">
                        <div className="rv-thanks-stars">
                            {[1,2,3,4,5].map(s => (
                                <span key={s} className={`rv-star rv-star--static${s <= selected ? ' filled' : ''}`}>★</span>
                            ))}
                        </div>
                        <h3 className="rv-thanks-title">Received.</h3>
                        <p className="rv-thanks-msg">{msg}</p>
                        <button className="rv-reset-btn" onClick={handleReset}>Submit another</button>
                    </div>
                ) : (
                    <form className="rv-form" onSubmit={handleSubmit}>
                        {/* ── Stars ── */}
                        <div className="rv-stars-wrap">
                            {[1,2,3,4,5].map(s => (
                                <button
                                    key={s}
                                    type="button"
                                    className={`rv-star${s <= active ? ' filled' : ''}`}
                                    onMouseEnter={() => setHovered(s)}
                                    onMouseLeave={() => setHovered(0)}
                                    onClick={() => setSelected(s)}
                                    aria-label={`Rate ${s} out of 5`}
                                >★</button>
                            ))}
                            {selected > 0 && (
                                <span className="rv-star-label">{labels[selected]}</span>
                            )}
                        </div>

                        {/* ── Feedback box ── */}
                        <div className="rv-textarea-wrap">
                            <textarea
                                className="rv-textarea"
                                placeholder="Tell us your thoughts — what worked, what didn't, what you'd love to see next..."
                                value={feedback}
                                onChange={e => setFeedback(e.target.value)}
                                rows={5}
                                maxLength={1000}
                            />
                            <span className="rv-char-count">{feedback.length} / 1000</span>
                        </div>

                        <button type="submit" className="rv-submit-btn" disabled={!selected}>
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
