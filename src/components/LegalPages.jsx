import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageLayout = ({ title, children }) => {
    const navigate = useNavigate();
    return (
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '850px', margin: '0 auto', lineHeight: '1.7' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--color-primary)', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    &larr; Geri Dön
                </button>
                <h1 style={{ marginBottom: '1.5rem', color: 'var(--color-secondary)', fontSize: '2rem', fontWeight: '800' }}>{title}</h1>
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const DistanceSellingContractContent = () => (
    <div style={{ fontSize: '0.95rem', color: '#334155' }}>
        <h3 style={{ marginTop: '1.25rem', color: '#1e293b', fontSize: '1.1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem' }}>MADDE 1 - TARAFLAR</h3>
        <p style={{ marginTop: '0.5rem' }}>
            <strong>SATICI:</strong><br />
            Unvanı: <strong>Sarmal Ticaret</strong><br />
            Web Adresi: www.sarmalticaret.com<br />
            E-Posta: info@sarmalticaret.com<br />
            Adres: İstanbul, Türkiye
        </p>
        <p style={{ marginTop: '0.75rem' }}>
            <strong>ALICI:</strong><br />
            www.sarmalticaret.com e-ticaret sitesinden ürün sipariş eden ve teslimat adresi ile iletişim bilgilerini sipariş formunda belirten gerçek veya tüzel kişi.
        </p>

        <h3 style={{ marginTop: '1.5rem', color: '#1e293b', fontSize: '1.1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem' }}>MADDE 2 - KONU</h3>
        <p style={{ marginTop: '0.5rem' }}>
            İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait www.sarmalticaret.com internet sitesinden elektronik ortamda siparişini yaptığı ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
        </p>

        <h3 style={{ marginTop: '1.5rem', color: '#1e293b', fontSize: '1.1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem' }}>MADDE 3 - SİPARİŞ VE TESLİMAT</h3>
        <p style={{ marginTop: '0.5rem' }}>
            Sipariş edilen ürünler, anlaşmalı kargo firmaları aracılığıyla ALICI'nın sipariş esnasında belirttiği teslimat adresine güvenli ve korunaklı ambalaj ile teslim edilir. Kargo teslimatı esnasında pakette herhangi bir darbe, yırtılma veya ezilme olması durumunda ALICI'nın kargo görevlisine "Hasar Tespit Tutanağı" tutturması gerekmektedir.
        </p>

        <h3 style={{ marginTop: '1.5rem', color: '#1e293b', fontSize: '1.1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem' }}>MADDE 4 - KİŞİYE ÖZEL ÜRÜNLERDE CAYMA HAKKI VE İADE</h3>
        <p style={{ marginTop: '0.5rem' }}>
            Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin (ğ) bendi uyarınca; <strong>"Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünlerde cayma hakkı kullanılamaz."</strong> Müşteriye özel isim, tarih, fotoğraf veya özelleştirme yapılan peluş oyuncaklar ve hediyelik ürünlerde keyfi iade kabul edilmemektedir. Üretim veya baskı hatası olan ürünler koşulsuz yenisi ile değiştirilir.
        </p>

        <h3 style={{ marginTop: '1.5rem', color: '#1e293b', fontSize: '1.1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem' }}>MADDE 5 - ÖDEME VE GÜVENLİK</h3>
        <p style={{ marginTop: '0.5rem' }}>
            Ödemeler 256-Bit SSL şifreleme ve PayTR 3D Secure banka doğrulama altyapısı ile güvence altında alınmaktadır. ALICI siparişi onayladığında işbu sözleşmenin tüm maddelerini kabul etmiş sayılır.
        </p>
    </div>
);

export const DistanceSellingContract = () => (
    <PageLayout title="Mesafeli Satış Sözleşmesi">
        <DistanceSellingContractContent />
    </PageLayout>
);

export const RefundPolicyContent = () => (
    <div style={{ fontSize: '0.95rem', color: '#334155' }}>
        <h3 style={{ marginTop: '1.25rem', color: '#1e293b', fontSize: '1.1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.4rem' }}>İADE VE DEĞİŞİM ŞARTLARI</h3>
        <p style={{ marginTop: '0.5rem' }}>
            Sarmal Ticaret olarak müşteri memnuniyetini en üst düzeyde tutmayı hedefliyoruz.
        </p>

        <h4 style={{ marginTop: '1.25rem', color: 'var(--color-primary)', fontSize: '1rem', fontWeight: '700' }}>1. Kişiye Özel Ürünlerde İade Politikası</h4>
        <p style={{ marginTop: '0.35rem' }}>
            Üzerine isim, ses kaydı, özel mesaj veya tarih eklenen ürünler kişiye özel üretildiği için 6502 sayılı Kanun gereği keyfi iade kapsamı dışındadır.
        </p>

        <h4 style={{ marginTop: '1.25rem', color: 'var(--color-primary)', fontSize: '1rem', fontWeight: '700' }}>2. Hatalı veya Hasarlı Ürün Değişimi</h4>
        <p style={{ marginTop: '0.35rem' }}>
            Teslimat esnasında üretim kaynaklı bir kusur veya kargo hasarı tespit edilirse ürün ücretsiz olarak yenisi ile değiştirilir. Hasarlı kargolarda lütfen tutanak tutturunuz.
        </p>

        <h4 style={{ marginTop: '1.25rem', color: 'var(--color-primary)', fontSize: '1rem', fontWeight: '700' }}>3. İletişim ve Destek</h4>
        <p style={{ marginTop: '0.35rem', background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            İade ve değişim talepleriniz için sipariş numaranız ile birlikte <strong>info@sarmalticaret.com</strong> e-posta adresinden veya WhatsApp destek hattımızdan bize ulaşabilirsiniz.
        </p>
    </div>
);

export const RefundPolicy = () => (
    <PageLayout title="İptal ve İade Koşulları">
        <RefundPolicyContent />
    </PageLayout>
);

export const PrivacyPolicy = () => (
    <PageLayout title="Gizlilik ve Güvenlik Politikası">
        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>1. Bilgilerinizin Korunması</h3>
        <p>Sarmal Ticaret olarak kullanıcılarımızın özel hayatlarının gizliliğine ve kişisel verilerinin korunmasına büyük önem vermekteyiz. Sitemize kayıt olurken veya alışveriş yaparken verdiğiniz kargo adresi, isim-soyisim ve diğer iletişim adresleri hizmetin ifası dışında harici kişi, kurum ve 3. şahıslarla asla reklam vb. amaçlarla paylaşılmamaktadır.</p>

        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>2. Kredi Kartı Güvenliği</h3>
        <p>Kredi kartı bilgileriniz sistemimizde ve kurumumuzda <strong>kesinlikle tutulmamaktadır</strong> ve kayıtlı değildir. Kredi kartı ile ödeme adımınız tamamen PayTR gibi resmi regüle edilmiş bir ödeme kuruluşu üzerinden 256-bit SSL güvenlikli altyapılar ile şifreli, direkt gerçekleşir. Sitemiz kredi kartınızın sadece doğrulama sürecinden dönen olumlu/olumsuz dönüş sinyalini bilir.</p>

        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>3. Çerezler (Cookies)</h3>
        <p>Size daha iyi bir deneyim sunabilmek ve aradıklarınızı kolay bulmanıza yardımcı olabilmek (Örn: sepeti hatırlama, giriş yapılı durumunu hatırlama) amacıyla sitedeki son hareketlerinizi çerez teknolojisi yardımıyla cihazınızda yerel olarak kullanmaktayız.</p>
    </PageLayout>
);
