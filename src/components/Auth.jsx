import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone } from 'lucide-react';

export function Auth({ isOpen, onClose, onLogin, onRegister, onResetPassword, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (mode === 'register') {
            const password = formData.password;
            if (password.length < 8) {
                setError('Şifre en az 8 karakter uzunluğunda olmalıdır.');
                return;
            }
            if (!/[A-Z]/.test(password)) {
                setError('Şifre en az bir büyük harf içermelidir.');
                return;
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                setError('Şifre en az bir özel karakter (örn: !@#$%^&*) içermelidir.');
                return;
            }
            if (!/[0-9]/.test(password)) {
                setError('Şifre en az bir rakam içermelidir.');
                return;
            }

            if (formData.phone.length < 10) {
                setError('Lütfen geçerli bir telefon numarası giriniz.');
                return;
            }
        }

        if (mode === 'login') {
            onLogin({ email: formData.email, password: formData.password });
        } else if (mode === 'register') {
            onRegister(formData);
        } else if (mode === 'reset') {
            onResetPassword(formData.email);
        }

        if (mode !== 'reset') {
            setFormData({ email: '', password: '', name: '', phone: '' });
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                style={{ maxWidth: '450px' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2>{mode === 'login' ? 'Giriş Yap' : mode === 'register' ? 'Kayıt Ol' : 'Şifremi Unuttum'}</h2>
                    <button onClick={onClose} style={{ background: 'none' }}>
                        <X />
                    </button>
                </div>

                {error && (
                    <div style={{
                        background: '#fef2f2',
                        color: '#ef4444',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        border: '1px solid #fca5a5'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <>
                            <div className="form-group">
                                <label>Ad Soyad *</label>
                                <div style={{ position: 'relative' }}>
                                    <User
                                        size={20}
                                        style={{
                                            position: 'absolute',
                                            left: '0.75rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--color-text-light)'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        placeholder="Adınız ve Soyadınız"
                                        style={{ paddingLeft: '2.5rem' }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Telefon *</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone
                                        size={20}
                                        style={{
                                            position: 'absolute',
                                            left: '0.75rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--color-text-light)'
                                        }}
                                    />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => {
                                            const val = e.target.value.replace(/\D/g, '');
                                            setFormData({ ...formData, phone: val });
                                        }}
                                        required
                                        placeholder="5551234567"
                                        maxLength={11}
                                        style={{ paddingLeft: '2.5rem' }}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label>E-posta *</label>
                        <div style={{ position: 'relative' }}>
                            <Mail
                                size={20}
                                style={{
                                    position: 'absolute',
                                    left: '0.75rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-light)'
                                }}
                            />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                                placeholder="ornek@email.com"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                    </div>

                    {mode !== 'reset' && (
                        <div className="form-group">
                            <label>Şifre *</label>
                            <div style={{ position: 'relative' }}>
                                <Lock
                                    size={20}
                                    style={{
                                        position: 'absolute',
                                        left: '0.75rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--color-text-light)'
                                    }}
                                />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    required={mode !== 'reset'}
                                    placeholder="••••••••"
                                    minLength={6}
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                            {mode === 'register' && (
                                <small style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                                    En az 6 karakter olmalıdır
                                </small>
                            )}
                            {mode === 'login' && (
                                <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setMode('reset')}
                                        style={{ background: 'none', color: 'var(--color-primary)', fontSize: '0.85rem', padding: 0 }}
                                    >
                                        Şifremi Unuttum
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                    >
                        {mode === 'login' ? 'Giriş Yap' : mode === 'register' ? 'Kayıt Ol' : 'Şifremi Sıfırla'}
                    </button>
                </form>

                <div style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e2e8f0'
                }}>
                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                        {mode === 'login' ? 'Hesabınız yok mu?' : mode === 'register' ? 'Zaten hesabınız var mı?' : 'Şifrenizi hatırladınız mı?'}
                        {' '}
                        <button
                            type="button"
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            style={{
                                background: 'none',
                                color: 'var(--color-primary)',
                                fontWeight: '600',
                                textDecoration: 'underline',
                                padding: 0
                            }}
                        >
                            {mode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
