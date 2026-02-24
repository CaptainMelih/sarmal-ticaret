import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            setIsLoading(true);
            try {
                const { error } = await supabase
                    .from('newsletter_subscribers')
                    .upsert({ email, subscribed_at: new Date().toISOString() });

                if (error) throw error;

                setIsSubscribed(true);
                setTimeout(() => {
                    setEmail('');
                    setIsSubscribed(false);
                }, 3000);
            } catch (err) {
                console.error('Newsletter error:', err);
                alert('Abonelik sırasında bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '3rem 0',
            marginTop: '4rem'
        }}>
            <div className="container">
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <Mail size={30} />
                    </div>
                    <h2 style={{
                        fontSize: '2rem',
                        marginBottom: '1rem',
                        fontWeight: '700'
                    }}>
                        Kampanyalardan Haberdar Olun!
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        marginBottom: '2rem',
                        opacity: 0.9
                    }}>
                        E-bültenimize abone olun, fırsatları kaçırmayın!
                    </p>

                    {isSubscribed ? (
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.75rem',
                            fontSize: '1.1rem',
                            animation: 'fadeIn 0.3s ease'
                        }}>
                            <CheckCircle size={24} />
                            <span>Başarıyla abone oldunuz! 🎉</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                maxWidth: '500px',
                                margin: '0 auto'
                            }}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-posta adresiniz"
                                    required
                                    style={{
                                        flex: 1,
                                        padding: '1rem 1.5rem',
                                        border: 'none',
                                        borderRadius: 'var(--radius-lg)',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        background: 'white',
                                        color: 'var(--color-primary)',
                                        border: 'none',
                                        borderRadius: 'var(--radius-lg)',
                                        padding: '1rem 2rem',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <Send size={18} />
                                    Abone Ol
                                </button>
                            </div>
                        </form>
                    )}

                    <p style={{
                        fontSize: '0.85rem',
                        marginTop: '1rem',
                        opacity: 0.7
                    }}>
                        💝 İlk siparişinizde %15 indirim kazanın!
                    </p>
                </div>
            </div>
        </div>
    );
}
