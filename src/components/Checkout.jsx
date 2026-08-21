import React, { useState } from 'react';
import { X, MapPin, CreditCard, Percent, ShoppingBag, Truck, CheckCircle, AlertCircle, ShieldCheck, MapIcon } from 'lucide-react';
import * as db from '../lib/supabase';
import { TURKEY_DATA } from '../data/turkey-data';
import { CustomSelect } from './CustomSelect';
import { DistanceSellingContractContent, RefundPolicyContent } from './LegalPages';

const PAYMENT_METHODS = [
    { id: 'credit', name: 'Kredi / Banka Kartı', icon: CreditCard },
    { id: 'cash', name: 'Kapıda Ödeme', icon: ShoppingBag },
    { id: 'transfer', name: 'Havale / EFT', icon: Truck }
];

export function Checkout({ isOpen, isPage = false, onClose, cartItems, addresses, onCompleteOrder, onAddAddress, user }) {
    const [step, setStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState('credit');
    const [activeLegalModal, setActiveLegalModal] = useState(null); // 'distance' | 'refund' | null
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [orderNote, setOrderNote] = useState('');
    const [guestAddress, setGuestAddress] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        fullAddress: '',
        city: '',
        district: '',
        acceptAccountCreation: false
    });
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isGiftWrap, setIsGiftWrap] = useState(false);
    const [giftNote, setGiftNote] = useState('');
    const [createdOrder, setCreatedOrder] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Smooth scroll to top when opening checkout or changing steps
    React.useEffect(() => {
        if (isOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isOpen, step]);

    // Credit Card & 3D Secure States
    const [cardData, setCardData] = useState({
        name: '',
        number: '',
        expiry: '',
        cvc: ''
    });
    const [cardError, setCardError] = useState('');
    const [show3DSecureModal, setShow3DSecureModal] = useState(false);
    const [smsCode, setSmsCode] = useState('');
    const [isVerifying3D, setIsVerifying3D] = useState(false);

    const handleCardNumberChange = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 16);
        const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
        setCardData(prev => ({ ...prev, number: formatted }));
        if (cardError) setCardError('');
    };

    const handleExpiryChange = (e) => {
        let raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
        if (raw.length >= 3) {
            raw = raw.slice(0, 2) + '/' + raw.slice(2);
        }
        setCardData(prev => ({ ...prev, expiry: raw }));
        if (cardError) setCardError('');
    };

    if (!isOpen) return null;

    // Group items by product id
    const groupedItems = cartItems.reduce((acc, item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const subtotal = groupedItems.reduce((sum, item) => sum + (Number(item.price || 0) * item.quantity), 0);

    // Automatic threshold discounts (disabled)
    const autoDiscount = null;

    const activeDiscount = appliedCoupon || autoDiscount;

    let discount = 0;
    if (activeDiscount) {
        if (activeDiscount.discount_type === 'percentage') {
            discount = (subtotal * activeDiscount.discount_amount / 100);
        } else {
            discount = activeDiscount.discount_amount;
        }
    }

    const shipping = subtotal >= 500 ? 0 : 100;
    const total = Math.max(0, subtotal - discount + shipping);

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setCouponError('');
        setIsApplying(true);
        try {
            const coupon = await db.getCouponByCode(couponCode);
            if (coupon) {
                if (subtotal < coupon.min_purchase) {
                    setCouponError(`Bu kupon için minimum ${coupon.min_purchase} TL harcama yapmalısınız.`);
                } else {
                    setAppliedCoupon(coupon);
                    setCouponCode('');
                }
            } else {
                setCouponError('Geçersiz veya süresi dolmuş kupon kodu.');
            }
        } catch (err) {
            setCouponError('Kupon uygulanırken bir hata oluştu.');
        } finally {
            setIsApplying(false);
        }
    };

    const isAddressValid = () => {
        if (user) {
            return selectedAddress !== null;
        } else {
            const hasName = (guestAddress.name || '').trim() !== '';
            const hasPhone = (guestAddress.phone || '').trim().length >= 10;
            const hasEmail = (guestAddress.email || '').trim().includes('@');
            const hasPassword = (guestAddress.password || '').trim().length >= 6;
            const hasAddress = (guestAddress.fullAddress || '').trim() !== '';
            const hasCity = (guestAddress.city || '').trim() !== '';
            const hasDistrict = (guestAddress.district || '').trim() !== '';
            const hasConsent = Boolean(guestAddress.acceptAccountCreation);
            return hasName && hasPhone && hasEmail && hasPassword && hasAddress && hasCity && hasDistrict && hasConsent;
        }
    };

    const handleEmailBlur = async () => {
        if (!guestAddress.email || !guestAddress.email.includes('@')) return;
        const exists = await db.checkEmailExists(guestAddress.email);
        if (exists) {
            setEmailError('Bu e-posta adresiyle zaten kayıtlı bir hesabınız var, lütfen giriş yapın.');
        } else {
            setEmailError('');
        }
    };

    const handleComplete = async () => {
        if (step === 1) {
            if (user) {
                if (!selectedAddress) {
                    alert('Lütfen bir teslimat adresi seçin.');
                    return;
                }
            } else {
                if (!(guestAddress.name || '').trim()) {
                    alert('Lütfen Ad ve Soyadınızı giriniz.');
                    return;
                }
                if (!(guestAddress.phone || '').trim() || (guestAddress.phone || '').trim().length < 10) {
                    alert('Lütfen geçerli bir telefon numarası giriniz (en az 10 hane).');
                    return;
                }
                if (!(guestAddress.email || '').trim() || !(guestAddress.email || '').includes('@')) {
                    alert('Lütfen geçerli bir e-posta adresi giriniz.');
                    return;
                }
                const emailExists = await db.checkEmailExists(guestAddress.email);
                if (emailExists) {
                    alert('Bu e-posta adresiyle zaten kayıtlı bir hesabınız var, lütfen giriş yapın.');
                    if (onAddAddress) {
                        onClose();
                        onAddAddress();
                    }
                    return;
                }
                if (!(guestAddress.password || '').trim() || (guestAddress.password || '').trim().length < 6) {
                    alert('Hesap şifreniz en az 6 karakter olmalıdır.');
                    return;
                }
                if (!(guestAddress.city || '').trim() || !(guestAddress.district || '').trim() || !(guestAddress.fullAddress || '').trim()) {
                    alert('Lütfen tüm teslimat adresi bilgilerinizi (İl, İlçe, Açık Adres) eksiksiz doldurunuz.');
                    return;
                }
                if (!guestAddress.acceptAccountCreation) {
                    alert('Ödeme adımına geçebilmek için lütfen "Sipariş takibi için hesabımın oluşturulmasını kabul ediyorum" kutucuğunu işaretleyiniz.');
                    return;
                }
            }
            setStep(2);
        } else if (step === 2) {
            if (!agreedToTerms) {
                alert('Ödemeye geçmeden önce Mesafeli Satış Sözleşmesi ve İade Koşulları metinlerini onaylamanız gerekmektedir.');
                return;
            }

            setIsSubmitting(true);
            try {
                const result = await onCompleteOrder({
                    addressId: selectedAddress ? selectedAddress.id : null,
                    guestAddress: !user ? guestAddress : null,
                    paymentMethod: selectedPayment,
                    items: groupedItems,
                    subtotal,
                    discount,
                    couponCode: appliedCoupon?.code || null,
                    total,
                    note: orderNote,
                    isGiftWrap: isGiftWrap,
                    giftNote: giftNote
                });

                if (selectedPayment === 'transfer' || selectedPayment === 'cash') {
                    setCreatedOrder(result);
                    setStep(3);
                }
            } catch (err) {
                alert('Ödeme başlatılırken bir hata oluştu: ' + err.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const processOrderAfter3DSecure = async () => {
        if (!smsCode || smsCode.length < 4) {
            alert('Lütfen cep telefonunuza gelen 3D Secure onay kodunu giriniz.');
            return;
        }
        setIsVerifying3D(true);
        try {
            const result = await onCompleteOrder({
                addressId: selectedAddress ? selectedAddress.id : null,
                guestAddress: !user ? guestAddress : null,
                paymentMethod: 'credit',
                items: groupedItems,
                subtotal,
                discount,
                couponCode: appliedCoupon?.code || null,
                total,
                note: orderNote,
                isGiftWrap: isGiftWrap,
                giftNote: giftNote,
                cardLastFour: (cardData.number || '').slice(-4)
            });
            setShow3DSecureModal(false);
            setCreatedOrder(result);
            setStep(3);
        } catch (err) {
            alert('Ödeme işlemi sırasında bir hata oluştu: ' + err.message);
        } finally {
            setIsVerifying3D(false);
        }
    };

    const mainContent = (
        <div style={isPage ? { background: 'white', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' } : { display: 'flex', flexDirection: 'column', height: '100%' }}>
            {!isPage && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontWeight: '800' }}>Güvenli Ödeme</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X />
                    </button>
                </div>
            )}

                {/* Progress Steps */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    gap: '1rem',
                    padding: '0 1rem'
                }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', color: step >= 1 ? 'var(--color-primary)' : 'var(--color-text-light)' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: step >= 1 ? 'var(--color-primary)' : 'var(--color-bg)', color: step >= 1 ? 'white' : 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                            {step > 1 ? <CheckCircle size={18} /> : '1'}
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Adres Bilgileri</span>
                    </div>
                    <div style={{ flex: 0.5, height: '2px', background: step >= 2 ? 'var(--color-primary)' : '#e2e8f0' }} />
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', color: step >= 2 ? 'var(--color-primary)' : 'var(--color-text-light)' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: step >= 2 ? 'var(--color-primary)' : 'var(--color-bg)', color: step >= 2 ? 'white' : 'var(--color-text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                            2
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Ödeme ve Onay</span>
                    </div>
                </div>

                {step === 3 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', overflowY: 'auto' }}>
                        <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: '#dcfce7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                            <CheckCircle size={40} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981', marginBottom: '0.5rem' }}>Siparişiniz Başarıyla Alındı! 🎉</h3>
                            <p style={{ color: 'var(--color-text-light)', fontSize: '0.95rem' }}>Sipariş numaranız: <strong style={{ color: 'var(--color-text)', fontSize: '1.1rem' }}>#{createdOrder?.id || ''}</strong></p>
                        </div>

                        {selectedPayment === 'credit' ? (
                            <div style={{
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                borderRadius: 'var(--radius-lg)',
                                padding: '1.5rem',
                                width: '100%',
                                maxWidth: '500px',
                                textAlign: 'left',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <h4 style={{ fontWeight: '800', marginBottom: '1rem', borderBottom: '1px solid #bbf7d0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534' }}>
                                    <ShieldCheck size={20} color="#16a34a" /> 3D Secure Kredi Kartı Ödeme Dekontu
                                </h4>
                                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: '#14532d' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#166534' }}>Ödeme Durumu:</span>
                                        <span style={{ fontWeight: '800', color: '#16a34a' }}>✅ 3D Secure Onaylandı</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#166534' }}>Kart Sahibi:</span>
                                        <span style={{ fontWeight: '700', textTransform: 'uppercase' }}>{cardData.name || 'Kart Sahibi'}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#166534' }}>Kart Numarası:</span>
                                        <span style={{ fontWeight: '700', fontFamily: 'monospace' }}>**** **** **** {(cardData.number || '').slice(-4) || '4321'}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#166534' }}>Ödenen Toplam Tutar:</span>
                                        <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--color-primary)' }}>{Number(createdOrder?.total ?? total ?? 0).toFixed(2)} TL</span>
                                    </div>
                                </div>
                                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #bbf7d0', fontSize: '0.8rem', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Truck size={16} /> Siparişiniz kargo hazırlık aşamasına alınmıştır.
                                </div>
                            </div>
                        ) : selectedPayment === 'cash' ? (
                            <div style={{
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                borderRadius: 'var(--radius-lg)',
                                padding: '1.5rem',
                                width: '100%',
                                maxWidth: '500px',
                                textAlign: 'left',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <h4 style={{ fontWeight: '800', marginBottom: '1rem', borderBottom: '1px solid #bbf7d0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534' }}>
                                    <ShoppingBag size={20} color="#16a34a" /> Kapıda Ödemeli Sipariş Bilgisi
                                </h4>
                                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: '#14532d' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#166534' }}>Ödeme Yöntemi:</span>
                                        <span style={{ fontWeight: '800', color: '#16a34a' }}>💵 Kapıda Ödeme</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#166534' }}>Sipariş Durumu:</span>
                                        <span style={{ fontWeight: '700', color: '#0284c7' }}>📦 Hazırlanıyor</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#166534' }}>Kapıda Ödenecek Tutar:</span>
                                        <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--color-primary)' }}>{Number(createdOrder?.total ?? total ?? 0).toFixed(2)} TL</span>
                                    </div>
                                </div>
                                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #bbf7d0', fontSize: '0.85rem', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Truck size={16} /> Siparişiniz kargoya verildiğinde kurye kapıda ödemeyi tahsil edecektir.
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                background: 'var(--color-bg)',
                                border: '1px solid #e2e8f0',
                                borderRadius: 'var(--radius-lg)',
                                padding: '1.5rem',
                                width: '100%',
                                maxWidth: '500px',
                                textAlign: 'left',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                <h4 style={{ fontWeight: '700', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text)' }}>
                                    <Truck size={18} color="var(--color-primary)" /> Havale/EFT Bilgileri
                                </h4>
                                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#64748b' }}>Banka:</span>
                                        <span style={{ fontWeight: '600' }}>Ziraat Bankası</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#64748b' }}>Alıcı Adı:</span>
                                        <span style={{ fontWeight: '600' }}>Melih Yıldız</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ color: '#64748b' }}>IBAN:</span>
                                        <span style={{ fontWeight: '700', fontFamily: 'monospace', background: '#f1f5f9', color: '#1e293b', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }} onClick={() => {
                                            navigator.clipboard.writeText('TR85 0001 0009 0100 1234 5678 90');
                                            alert('IBAN kopyalandı!');
                                        }} title="Kopyalamak için tıklayın">
                                            TR85 0001 0009 0100 1234 5678 90 📋
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: '#64748b' }}>Toplam Tutar:</span>
                                        <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{Number(createdOrder?.total ?? total ?? 0).toFixed(2)} TL</span>
                                    </div>
                                </div>
                                
                                <div style={{
                                    marginTop: '1.25rem',
                                    background: '#fffbeb',
                                    border: '1px solid #fef3c7',
                                    color: '#92400e',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    gap: '0.5rem',
                                    alignItems: 'flex-start'
                                }}>
                                    <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <span>
                                        <strong>Önemli:</strong> Lütfen Havale/EFT yaparken açıklama kısmına sadece sipariş numaranızı (<strong>#{createdOrder?.id || ''}</strong>) yazınız. Siparişiniz ödemeniz onaylandıktan sonra kargoya verilecektir.
                                    </span>
                                </div>
                            </div>
                        )}

                        <button className="btn btn-primary" onClick={onClose} style={{ padding: '0.75rem 2rem', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Kapat ve Ana Sayfaya Dön
                        </button>
                    </div>
                ) : (
                    <div className="checkout-content">
                        <div style={{ minWidth: 0 }}>
                            {step === 1 && (
                                <div>
                                    <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Teslimat Adresi Seçin</h3>
                                    {!user ? (
                                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                                            <h4 style={{ marginBottom: '1.25rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                👤 Misafir Teslimat & Hesap Oluşturma Bilgileri
                                            </h4>
                                            
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                                <div className="form-group">
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Ad Soyad *</label>
                                                    <input
                                                        type="text"
                                                        value={guestAddress.name}
                                                        onChange={e => setGuestAddress({ ...guestAddress, name: e.target.value })}
                                                        placeholder="Adınız ve Soyadınız"
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Telefon *</label>
                                                    <input
                                                        type="tel"
                                                        value={guestAddress.phone}
                                                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                                        onChange={e => setGuestAddress({ ...guestAddress, phone: e.target.value })}
                                                        placeholder="05xxxxxxxxx"
                                                        maxLength={11}
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                                <div className="form-group">
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>E-posta *</label>
                                                    <input
                                                        type="email"
                                                        value={guestAddress.email}
                                                        onChange={e => {
                                                            setGuestAddress({ ...guestAddress, email: e.target.value });
                                                            if (emailError) setEmailError('');
                                                        }}
                                                        onBlur={handleEmailBlur}
                                                        placeholder="ornek@email.com"
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: emailError ? '2px solid #ef4444' : '1px solid #cbd5e1' }}
                                                        required
                                                    />
                                                    {emailError && (
                                                        <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem', fontWeight: '700' }}>
                                                            ⚠️ {emailError}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="form-group">
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Şifre *</label>
                                                    <input
                                                        type="password"
                                                        value={guestAddress.password}
                                                        onChange={e => setGuestAddress({ ...guestAddress, password: e.target.value })}
                                                        placeholder="En az 6 karakter"
                                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                                <div className="form-group">
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>İl *</label>
                                                    <CustomSelect
                                                        value={guestAddress.city}
                                                        onChange={city => setGuestAddress({ ...guestAddress, city, district: '' })}
                                                        required
                                                        placeholder="İl Seçin"
                                                        options={Object.keys(TURKEY_DATA).sort((a, b) => a.localeCompare(b, 'tr')).map(city => ({ value: city, label: city }))}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>İlçe *</label>
                                                    <CustomSelect
                                                        value={guestAddress.district}
                                                        onChange={district => setGuestAddress({ ...guestAddress, district })}
                                                        required
                                                        disabled={!guestAddress.city}
                                                        placeholder="İlçe Seçin"
                                                        options={guestAddress.city ? TURKEY_DATA[guestAddress.city].sort((a, b) => a.localeCompare(b, 'tr')).map(district => ({ value: district, label: district })) : []}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.4rem', fontWeight: '600' }}>Açık Adres *</label>
                                                <textarea
                                                    value={guestAddress.fullAddress}
                                                    onChange={e => setGuestAddress({ ...guestAddress, fullAddress: e.target.value })}
                                                    placeholder="Mahalle, sokak, bina no..."
                                                    rows="2"
                                                    style={{ width: '100%', minHeight: '80px', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', display: 'block', background: 'white' }}
                                                    required
                                                />
                                            </div>

                                            {/* Mandatory Consent Checkbox */}
                                            <div style={{
                                                background: '#eff6ff',
                                                border: '1px solid #bfdbfe',
                                                padding: '1rem',
                                                borderRadius: 'var(--radius-md)',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem',
                                                marginBottom: '1rem'
                                            }}>
                                                <input
                                                    type="checkbox"
                                                    id="guest-accept-account"
                                                    checked={guestAddress.acceptAccountCreation}
                                                    onChange={e => setGuestAddress({ ...guestAddress, acceptAccountCreation: e.target.checked })}
                                                    style={{ marginTop: '3px', width: '18px', height: '18px', cursor: 'pointer' }}
                                                />
                                                <label htmlFor="guest-accept-account" style={{ fontSize: '0.85rem', color: '#1e3a8a', cursor: 'pointer', lineHeight: '1.4', fontWeight: '600' }}>
                                                    Sipariş takibi için hesabımın oluşturulmasını ve üyelik sözleşmesini kabul ediyorum. (*)
                                                </label>
                                            </div>

                                            {onAddAddress && (
                                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                                    <p style={{ color: 'var(--color-text-light)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Mevcut hesabınız var mı?</p>
                                                    <button className="btn btn-outline" onClick={() => { onClose(); onAddAddress(); }} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                                                        Giriş Yap
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                                            {addresses.length === 0 ? (
                                                <div style={{ padding: '2rem', textAlign: 'center', background: '#f8fafc', borderRadius: 'var(--radius-lg)', gridColumn: '1 / -1' }}>
                                                    <p style={{ color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                                                        Kayıtlı teslimat adresiniz bulunmamaktadır. Siparişe devam etmek için lütfen hesabınıza bir adres ekleyin.
                                                    </p>
                                                    <button className="btn btn-primary" onClick={onAddAddress} style={{ margin: '0 auto' }}>
                                                        Profilime Git ve Adres Ekle 📍
                                                    </button>
                                                </div>
                                            ) : (
                                                addresses.map(address => (
                                                    <div
                                                        key={address.id}
                                                        onClick={() => setSelectedAddress(address)}
                                                        style={{
                                                            padding: '1.25rem',
                                                            background: selectedAddress?.id === address.id ? '#f0f7ff' : 'white',
                                                            borderRadius: 'var(--radius-lg)',
                                                            cursor: 'pointer',
                                                            border: selectedAddress?.id === address.id ? '2px solid var(--color-primary)' : '2px solid #e2e8f0',
                                                            transition: 'all 0.2s',
                                                            position: 'relative'
                                                        }}
                                                    >
                                                        {selectedAddress?.id === address.id && (
                                                            <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--color-primary)' }}>
                                                                <CheckCircle size={20} />
                                                            </div>
                                                        )}
                                                        <div style={{ fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <MapPin size={16} color={selectedAddress?.id === address.id ? 'var(--color-primary)' : '#64748b'} />
                                                            {address.title}
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                                                            {address.full_address}
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', fontWeight: '600' }}>
                                                            {address.district}, {address.city}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                            {addresses.length > 0 && (
                                                <div
                                                    onClick={() => { onClose(); onAddAddress(); }}
                                                    style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: 'var(--radius-lg)', cursor: 'pointer', border: '2px dashed #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#64748b' }}
                                                >
                                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>+</div>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Yeni Adres Ekle</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Ödeme Yöntemi</h3>
                                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                                        {PAYMENT_METHODS.map(method => {
                                            const Icon = method.icon;
                                            const isActive = selectedPayment === method.id;
                                            return (
                                                <div
                                                    key={method.id}
                                                    onClick={() => setSelectedPayment(method.id)}
                                                    style={{
                                                        padding: '1.25rem',
                                                        background: isActive ? '#f0f7ff' : 'white',
                                                        borderRadius: 'var(--radius-lg)',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '1rem',
                                                        border: isActive ? '2px solid var(--color-primary)' : '2px solid #e2e8f0',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <div style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-md)', background: isActive ? 'white' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? 'var(--color-primary)' : '#64748b' }}>
                                                        <Icon size={24} />
                                                    </div>
                                                    <span style={{ fontWeight: '700', flex: 1 }}>{method.name}</span>
                                                    {isActive && <CheckCircle size={20} color="var(--color-primary)" />}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* PayTR 3D Secure Notification */}
                                    {selectedPayment === 'credit' && (
                                        <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #bae6fd', marginBottom: '2rem' }}>
                                            <h4 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: '800', color: '#0369a1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <ShieldCheck size={22} color="#0284c7" /> PayTR 3D Secure Güvenli Ödeme
                                            </h4>
                                            <p style={{ fontSize: '0.9rem', color: '#0369a1', margin: 0, lineHeight: '1.6' }}>
                                                "Siparişi Onayla ve Öde" butonuna tıkladığınızda kart bilgilerinizi ve bankanızın 3D Secure SMS doğrulama şifresini gireceğiniz <strong>PayTR Resmi Güvenli Ödeme Sayfasına</strong> otomatik yönlendirileceksiniz.
                                            </p>
                                        </div>
                                    )}

                                    {/* Kapıda Ödeme Notification */}
                                    {selectedPayment === 'cash' && (
                                        <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '16px', border: '1px solid #bbf7d0', marginBottom: '2rem' }}>
                                            <h4 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: '800', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <ShoppingBag size={22} color="#16a34a" /> Kapıda Ödeme İle Teslimat
                                            </h4>
                                            <p style={{ fontSize: '0.9rem', color: '#15803d', margin: 0, lineHeight: '1.6' }}>
                                                Siparişinizi verdiğinizde ürünleriniz hızla hazırlanır ve kargoya verilir. <strong>Kargo görevlisi kapınıza geldiğinde ödemenizi kapıda yapabilirsiniz.</strong>
                                            </p>
                                        </div>
                                    )}

                                    <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Sipariş Notu</h3>
                                    <textarea
                                        value={orderNote}
                                        onChange={(e) => setOrderNote(e.target.value)}
                                        placeholder="Kargo notu veya ürün hazırlığı ile ilgili bir notunuz var mı?"
                                        rows={4}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: 'var(--radius-lg)',
                                            resize: 'none',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Sidebar Summary */}
                        <div style={{ minWidth: 0 }}>
                            <div className="checkout-summary">
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShoppingBag size={20} /> Sepet Özeti
                                </h3>

                                <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                    {groupedItems.map((item, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            gap: '0.75rem',
                                            marginBottom: '1rem'
                                        }}>
                                            <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontWeight: '600', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.quantity} Adet x {item.price} TL</div>
                                            </div>
                                            <div style={{ fontWeight: '700', fontSize: '0.9rem', textAlign: 'right' }}>{(item.price * item.quantity).toFixed(2)} TL</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Gift Options Section */}
                                <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #fee2e2', marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '700', color: '#991b1b', fontSize: '0.9rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={isGiftWrap}
                                            onChange={e => setIsGiftWrap(e.target.checked)}
                                            style={{ width: '1.1rem', height: '1.1rem', accentColor: '#ef4444', cursor: 'pointer' }}
                                        />
                                        <span>🎁 Siparişimi Hediye Paketi Yap (Ücretsiz)</span>
                                    </label>
                                    {isGiftWrap && (
                                        <textarea
                                            value={giftNote}
                                            onChange={e => setGiftNote(e.target.value)}
                                            placeholder="Hediye paketi üzerine yazılacak notunuz..."
                                            rows={2}
                                            style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #fca5a5', fontSize: '0.85rem' }}
                                        />
                                    )}
                                </div>

                                {/* Coupon Section */}
                                <div style={{ marginBottom: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            placeholder="Kupon Kodunuz"
                                            disabled={!!appliedCoupon || isApplying}
                                            style={{
                                                flex: 1,
                                                padding: '0.6rem 0.8rem',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: 'var(--radius-md)',
                                                fontSize: '0.85rem',
                                                outline: 'none'
                                            }}
                                        />
                                        {!appliedCoupon ? (
                                            <button
                                                onClick={handleApplyCoupon}
                                                disabled={!couponCode || isApplying}
                                                className="btn btn-primary"
                                                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                                            >
                                                {isApplying ? '...' : 'Uygula'}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => { setAppliedCoupon(null); setCouponCode(''); }}
                                                className="btn btn-outline"
                                                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', color: '#ef4444', borderColor: '#fee2e2' }}
                                            >
                                                Kaldır
                                            </button>
                                        )}
                                    </div>

                                    {couponError && (
                                        <div style={{ fontSize: '0.75rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                                            <AlertCircle size={12} /> {couponError}
                                        </div>
                                    )}

                                    {activeDiscount && (
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: '#10b981',
                                            background: '#f0fdf4',
                                            padding: '0.5rem 0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            marginTop: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontWeight: '600'
                                        }}>
                                            <Percent size={14} />
                                            {activeDiscount.code}: {activeDiscount.description || (activeDiscount.discount_type === 'percentage' ? `%${activeDiscount.discount_amount} indirim!` : `${activeDiscount.discount_amount} TL indirim!`)}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'grid', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '2px solid #e2e8f0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                                        <span>Ara Toplam</span>
                                        <span>{subtotal.toFixed(2)} TL</span>
                                    </div>
                                    {discount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#10b981', fontWeight: '600' }}>
                                            <span>Toplam İndirim</span>
                                            <span>-{discount.toFixed(2)} TL</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                                        <span>Kargo Ücreti</span>
                                        {shipping === 0 ? (
                                            <span style={{ color: 'var(--color-success)', fontWeight: '700' }}>Ücretsiz</span>
                                        ) : (
                                            <span style={{ color: '#ef4444', fontWeight: '700' }}>100.00 TL</span>
                                        )}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid #e2e8f0',
                                        fontWeight: '900',
                                        fontSize: '1.4rem',
                                        color: 'var(--color-primary)'
                                    }}>
                                        <span>Toplam</span>
                                        <span>{total.toFixed(2)} TL</span>
                                    </div>
                                </div>

                                {step === 2 && (
                                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
                                        <input
                                            type="checkbox"
                                            id="terms-checkbox"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            style={{ marginTop: '0.2rem', cursor: 'pointer', width: '1.2rem', height: '1.2rem', accentColor: 'var(--color-primary)' }}
                                        />
                                        <label htmlFor="terms-checkbox" style={{ fontSize: '0.85rem', color: 'var(--color-text)', cursor: 'pointer', lineHeight: '1.5' }}>
                                            <span
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveLegalModal('distance'); }}
                                                style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: '700', cursor: 'pointer' }}
                                            >
                                                Mesafeli Satış Sözleşmesini
                                            </span>, {' '}
                                            <span
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveLegalModal('refund'); }}
                                                style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: '700', cursor: 'pointer' }}
                                            >
                                                İptal ve İade Koşullarını
                                            </span> okudum ve onaylıyorum.
                                        </label>
                                    </div>
                                )}

                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                    {step === 2 && (
                                        <button
                                            className="btn btn-outline"
                                            onClick={() => setStep(1)}
                                            disabled={isSubmitting}
                                            style={{ flex: 1, padding: '0.8rem' }}
                                        >
                                            Geri
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleComplete}
                                        disabled={isSubmitting || (step === 1 && !isAddressValid())}
                                        style={{
                                            flex: 2,
                                            justifyContent: 'center',
                                            padding: '0.8rem',
                                            fontWeight: '800',
                                            opacity: (isSubmitting || (step === 1 && !isAddressValid())) ? 0.5 : 1,
                                            cursor: (isSubmitting || (step === 1 && !isAddressValid())) ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isSubmitting ? 'İşleniyor...' : (step === 1 ? 'Ödemeye Geç' : 'Siparişi Onayla')}
                                    </button>
                                </div>

                                <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#94a3b8', marginTop: '1.5rem' }}>
                                    🔒 256-bit SSL şifreleme ile güvenli ödeme.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );

    return (
        <>
            {isPage ? mainContent : (
                <div className="modal-overlay" style={{ zIndex: 99999 }} onClick={onClose}>
                    <div
                        className="modal-content"
                        style={{ maxWidth: '950px', width: '95%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {mainContent}
                    </div>
                </div>
            )}

            {/* 3D Secure Bank Verification Modal */}
            {show3DSecureModal && (
                <div className="modal-overlay" style={{ zIndex: 999999 }} onClick={() => setShow3DSecureModal(false)}>
                    <div
                        className="modal-content"
                        style={{ maxWidth: '440px', padding: '2rem', textAlign: 'center', borderRadius: '20px', background: 'white' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ background: '#f0fdf4', color: '#16a34a', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                            <ShieldCheck size={36} />
                        </div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.4rem' }}>
                            3D Secure Banka Onayı
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            <b>Sarmal Ticaret</b> harcamanız için cep telefonunuza SMS onay kodu gönderilmiştir. Lütfen 6 haneli doğrulama kodunu giriniz.
                        </p>

                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #e2e8f0', textAlign: 'left', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                                <span style={{ color: '#64748b' }}>İşlem Tutarı:</span>
                                <span style={{ fontWeight: '800', color: 'var(--color-primary)' }}>{total.toFixed(2)} TL</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Kart Sonu:</span>
                                <span style={{ fontWeight: '700' }}>**** {(cardData.number || '').slice(-4) || '4321'}</span>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="text"
                                value={smsCode}
                                onChange={e => setSmsCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                                placeholder="123456"
                                maxLength={6}
                                style={{
                                    width: '100%',
                                    padding: '0.85rem',
                                    fontSize: '1.4rem',
                                    fontWeight: '800',
                                    letterSpacing: '6px',
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    border: '2px solid var(--color-primary)',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={() => setShow3DSecureModal(false)}
                                style={{ flex: 1, padding: '0.75rem', fontSize: '0.9rem' }}
                            >
                                İptal Et
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={processOrderAfter3DSecure}
                                disabled={isVerifying3D || smsCode.length < 4}
                                style={{ flex: 1.5, padding: '0.75rem', fontWeight: '800', fontSize: '0.95rem' }}
                            >
                                {isVerifying3D ? 'Doğrulanıyor...' : 'Ödemeyi Onayla 🔒'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Contract Modal Overlay */}
            {activeLegalModal && (
                <div className="modal-overlay" style={{ zIndex: 999999 }} onClick={() => setActiveLegalModal(null)}>
                    <div
                        className="modal-content"
                        style={{ maxWidth: '780px', width: '92%', maxHeight: '85vh', overflowY: 'auto', padding: '2rem', borderRadius: '20px', background: 'white' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>
                                {activeLegalModal === 'distance' ? '📜 Mesafeli Satış Sözleşmesi' : '🔄 İptal ve İade Koşulları'}
                            </h3>
                            <button
                                onClick={() => setActiveLegalModal(null)}
                                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ padding: '0.5rem 0 1.5rem' }}>
                            {activeLegalModal === 'distance' ? <DistanceSellingContractContent /> : <RefundPolicyContent />}
                        </div>

                        <div style={{ textAlign: 'right', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => { setAgreedToTerms(true); setActiveLegalModal(null); }}
                                style={{ padding: '0.65rem 1.5rem', fontWeight: '700', fontSize: '0.9rem' }}
                            >
                                Okudum ve Onaylıyorum ✓
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
