import React, { useState } from 'react';
import { Gift, X, Sparkles, CheckCircle, Copy } from 'lucide-react';

const PRIZES = [
    { label: '%10 İndirim', code: 'HOŞGELDİN10', color: '#4f46e5' },
    { label: '50 TL İndirim', code: 'FIRSAT50', color: '#7c3aed' },
    { label: '%15 İndirim', code: 'SARMAL15', color: '#ec4899' },
    { label: 'Ücretsiz Kargo', code: 'BEDAVAKARGO', color: '#10b981' }
];

export function DiscountWheelModal({ isOpen, onClose }) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [wonPrize, setWonPrize] = useState(null);
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleSpin = () => {
        if (isSpinning || wonPrize) return;

        setIsSpinning(true);
        const prizeIdx = Math.floor(Math.random() * PRIZES.length);
        const extraTurns = 5 * 360;
        const segmentAngle = 360 / PRIZES.length;
        const targetRotation = extraTurns + (PRIZES.length - prizeIdx) * segmentAngle - segmentAngle / 2;

        setRotation(targetRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setWonPrize(PRIZES[prizeIdx]);
        }, 3500);
    };

    const handleCopy = () => {
        if (wonPrize) {
            navigator.clipboard.writeText(wonPrize.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="modal-overlay" style={{ zIndex: 1200 }} onClick={onClose}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: '500px',
                    width: '90%',
                    textAlign: 'center',
                    padding: '2rem',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    borderRadius: 'var(--radius-lg)'
                }}
            >
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                    <X size={20} />
                </button>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#e0e7ff', color: 'var(--color-primary)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1rem' }}>
                    <Sparkles size={16} color="#fde047" /> Şansını Dene & İndirim Kazan
                </div>

                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                    🎡 Şans Çarkını Çevir!
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Sarmal Ticaret'e özel anında kupon kazanmak için çarkı çevirin.
                </p>

                {/* Wheel SVG Visual */}
                <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 1.5rem auto' }}>
                    {/* Wheel Pointer */}
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '12px solid transparent',
                        borderRight: '12px solid transparent',
                        borderTop: '20px solid #ef4444',
                        zIndex: 10
                    }} />

                    {/* Wheel Circle */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '6px solid white',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                        transform: `rotate(${rotation}deg)`,
                        transition: 'transform 3.5s cubic-bezier(0.15, 0.9, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        background: 'conic-gradient(#4f46e5 0deg 90deg, #7c3aed 90deg 180deg, #ec4899 180deg 270deg, #10b981 270deg 360deg)'
                    }}>
                        {/* Wheel Segments Text */}
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '0.8rem' }}>
                            <div style={{ position: 'absolute', top: '25px', left: '60px' }}>%10</div>
                            <div style={{ position: 'absolute', bottom: '25px', left: '60px' }}>50 TL</div>
                            <div style={{ position: 'absolute', bottom: '25px', right: '60px' }}>%15</div>
                            <div style={{ position: 'absolute', top: '25px', right: '50px' }}>Kargo</div>
                        </div>
                    </div>
                </div>

                {!wonPrize ? (
                    <button
                        className="btn btn-primary"
                        onClick={handleSpin}
                        disabled={isSpinning}
                        style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontWeight: '800', fontSize: '1rem' }}
                    >
                        {isSpinning ? 'Çark Dönüyor...' : '🎡 Çarkı Çevir ve Kazan'}
                    </button>
                ) : (
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontWeight: '800', color: '#166534', fontSize: '1.1rem', marginBottom: '0.35rem' }}>
                            🎉 Tebrikler! {wonPrize.label} Kazandınız!
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#15803d', margin: '0 0 1rem 0' }}>
                            Kupon kodunuzu ödeme adımında kullanabilirsiniz.
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ fontWeight: '900', fontFamily: 'monospace', fontSize: '1.2rem', background: 'white', padding: '0.4rem 1rem', borderRadius: '6px', border: '1px dashed #22c55e', color: '#15803d' }}>
                                {wonPrize.code}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="btn"
                                style={{ background: '#22c55e', color: 'white', padding: '0.5rem 1rem', fontSize: '0.85rem', border: 'none' }}
                            >
                                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                                {copied ? 'Kopyalandı!' : 'Kopyala'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
