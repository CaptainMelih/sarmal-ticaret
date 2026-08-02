import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, ShieldCheck, Truck, ArrowLeft, CheckCircle2, Package } from 'lucide-react';

export function AuthPage({ onLogin, onRegister, onResetPassword, initialMode = 'login', user }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Mode state: 'login' | 'register' | 'reset'
    const [mode, setMode] = useState(initialMode);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sync mode with route if initialMode changes
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    // If user is already logged in, redirect home or to state page
    useEffect(() => {
        if (user) {
            const from = location.state?.from || '/';
            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            if (mode === 'register') {
                const password = formData.password;
                if (password.length < 8) {
                    setError('Şifre en az 8 karakter uzunluğunda olmalıdır.');
                    setIsSubmitting(false);
                    return;
                }
                if (!/[A-Z]/.test(password)) {
                    setError('Şifre en az bir büyük harf içermelidir.');
                    setIsSubmitting(false);
                    return;
                }
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                    setError('Şifre en az bir özel karakter (örn: !@#$%^&*) içermelidir.');
                    setIsSubmitting(false);
                    return;
                }
                if (!/[0-9]/.test(password)) {
                    setError('Şifre en az bir rakam içermelidir.');
                    setIsSubmitting(false);
                    return;
                }
                if (formData.phone.length < 10) {
                    setError('Lütfen geçerli bir telefon numarası giriniz (en az 10 hane).');
                    setIsSubmitting(false);
                    return;
                }

                const res = await onRegister(formData);
                if (res && res.error) {
                    setError(res.error.message || 'Kayıt yapılırken bir hata oluştu.');
                } else {
                    const from = location.state?.from || '/';
                    navigate(from, { replace: true });
                }
            } else if (mode === 'login') {
                const res = await onLogin({ email: formData.email, password: formData.password });
                if (res && res.error) {
                    setError(res.error.message || 'E-posta adresi veya şifre hatalı.');
                } else {
                    const from = location.state?.from || '/';
                    navigate(from, { replace: true });
                }
            } else if (mode === 'reset') {
                const success = await onResetPassword(formData.email);
                if (success) {
                    setResetSent(true);
                } else {
                    setError('Şifre sıfırlama e-postası gönderilemedi. Lütfen adresi kontrol edin.');
                }
            }
        } catch (err) {
            setError(err.message || 'İşlem sırasında bir hata oluştu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: 'calc(100vh - 120px)', padding: '2.5rem 0 4rem', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
                    <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ArrowLeft size={16} /> Ana Sayfa
                    </Link>
                    <span>/</span>
                    <span style={{ fontWeight: '700', color: '#1e293b' }}>
                        {mode === 'login' ? 'Giriş Yap' : mode === 'register' ? 'Üye Ol' : 'Şifremi Unuttum'}
                    </span>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    border: '1px solid #e2e8f0'
                }} className="auth-grid-layout">
                    <style>{`
                        @media (min-width: 850px) {
                            .auth-grid-layout {
                                grid-template-columns: 1fr 1.2fr !important;
                            }
                        }
                    `}</style>

                    {/* Left Branding Side */}
                    <div style={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        color: 'white',
                        padding: '3rem 2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.6rem', borderRadius: '12px', display: 'flex' }}>
                                    <Package size={28} color="white" />
                                </div>
                                <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '0.5px' }}>Sarmal Ticaret</span>
                            </div>

                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: '1.3', marginBottom: '1rem' }}>
                                {mode === 'login' ? 'Tekrardan Hoş Geldiniz!' : 'Sarmal Ticaret Ailesine Katılın'}
                            </h2>
                            <p style={{ opacity: 0.9, lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '2rem' }}>
                                En kaliteli hediyelik ürünler, kişiye özel tasarımlar ve avantajlı indirimlerle alışverişin tadını çıkarın.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '12px' }}>
                                    <Truck size={22} />
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>500 TL Üzeri Ücretsiz Kargo</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Türkiye'nin her yerine hızlı teslimat</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1rem', borderRadius: '12px' }}>
                                    <ShieldCheck size={22} />
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>%100 Güvenli Ödeme</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>256-Bit SSL altyapısı ile korumalı</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '0.8rem', opacity: 0.85 }}>
                            &copy; 2026 Sarmal Ticaret • Tüm hakları saklıdır.
                        </div>
                    </div>

                    {/* Right Form Side */}
                    <div style={{ padding: '3rem 2.5rem' }}>
                        {/* Tab Switchers */}
                        {mode !== 'reset' && (
                            <div style={{
                                display: 'flex',
                                background: '#f1f5f9',
                                padding: '0.35rem',
                                borderRadius: '14px',
                                marginBottom: '2rem'
                            }}>
                                <button
                                    type="button"
                                    onClick={() => { setMode('login'); setError(''); navigate('/giris-yap'); }}
                                    style={{
                                        flex: 1,
                                        padding: '0.65rem 1rem',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: mode === 'login' ? 'white' : 'transparent',
                                        color: mode === 'login' ? '#1e293b' : '#64748b',
                                        fontWeight: mode === 'login' ? '800' : '600',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        boxShadow: mode === 'login' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Giriş Yap
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setMode('register'); setError(''); navigate('/uye-ol'); }}
                                    style={{
                                        flex: 1,
                                        padding: '0.65rem 1rem',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: mode === 'register' ? 'white' : 'transparent',
                                        color: mode === 'register' ? '#1e293b' : '#64748b',
                                        fontWeight: mode === 'register' ? '800' : '600',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        boxShadow: mode === 'register' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Üye Ol
                                </button>
                            </div>
                        )}

                        {error && (
                            <div style={{
                                background: '#fef2f2',
                                color: '#ef4444',
                                padding: '0.85rem 1rem',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                fontSize: '0.9rem',
                                border: '1px solid #fca5a5',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                ⚠️ <span>{error}</span>
                            </div>
                        )}

                        {mode === 'reset' && resetSent ? (
                            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                                <div style={{
                                    width: '70px', height: '70px', background: '#dcfce7', color: '#16a34a',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem'
                                }}>
                                    <CheckCircle2 size={36} />
                                </div>
                                <h3 style={{ marginBottom: '0.75rem', fontWeight: '800', color: '#1e293b' }}>E-postanızı Kontrol Edin!</h3>
                                <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    <b>{formData.email}</b> adresine şifre sıfırlama bağlantısı gönderildi. Lütfen gelen kutunuzu kontrol edin.
                                </p>
                                <button
                                    onClick={() => { setMode('login'); setResetSent(false); navigate('/giris-yap'); }}
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', borderRadius: '12px', fontWeight: '700' }}
                                >
                                    Giriş Ekranına Dön
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {mode === 'register' && (
                                    <>
                                        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                            <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Ad Soyad *</label>
                                            <div style={{ position: 'relative' }}>
                                                <User
                                                    size={18}
                                                    style={{
                                                        position: 'absolute',
                                                        left: '0.85rem',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: '#94a3b8'
                                                    }}
                                                />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    required
                                                    placeholder="Adınız ve Soyadınız"
                                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                            <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>Telefon Numarası *</label>
                                            <div style={{ position: 'relative' }}>
                                                <Phone
                                                    size={18}
                                                    style={{
                                                        position: 'absolute',
                                                        left: '0.85rem',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        color: '#94a3b8'
                                                    }}
                                                />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                    placeholder="05551234567"
                                                    maxLength={11}
                                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.35rem', display: 'block' }}>E-posta Adresi *</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail
                                            size={18}
                                            style={{
                                                position: 'absolute',
                                                left: '0.85rem',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: '#94a3b8'
                                            }}
                                        />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            placeholder="ornek@email.com"
                                            style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                                        />
                                    </div>
                                </div>

                                {mode !== 'reset' && (
                                    <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                                            <label style={{ fontWeight: '700', fontSize: '0.85rem' }}>Şifre *</label>
                                            {mode === 'login' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setMode('reset')}
                                                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', padding: 0, cursor: 'pointer', fontWeight: '600' }}
                                                >
                                                    Şifremi Unuttum
                                                </button>
                                            )}
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <Lock
                                                size={18}
                                                style={{
                                                    position: 'absolute',
                                                    left: '0.85rem',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    color: '#94a3b8'
                                                }}
                                            />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={formData.password}
                                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                                required={mode !== 'reset'}
                                                placeholder="••••••••"
                                                minLength={8}
                                                style={{ width: '100%', padding: '0.75rem 2.6rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                    position: 'absolute',
                                                    right: '0.85rem',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: '#94a3b8',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {mode === 'register' && (
                                            <small style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>
                                                En az 8 karakter, 1 büyük harf, 1 rakam ve 1 özel karakter içermelidir.
                                            </small>
                                        )}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        padding: '0.85rem',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        fontWeight: '800',
                                        marginTop: '1rem',
                                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
                                    }}
                                >
                                    {isSubmitting ? 'Lütfen bekleyin...' : mode === 'login' ? 'Giriş Yap 🎉' : mode === 'register' ? 'Üye Ol ve Başla 🚀' : 'Şifre Sıfırlama Bağlantısı Gönder'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
