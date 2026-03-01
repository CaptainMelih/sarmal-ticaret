import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageLayout = ({ title, children }) => {
    const navigate = useNavigate();
    return (
        <div style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    &larr; Geri Dön
                </button>
                <h1 style={{ marginBottom: '2rem', color: 'var(--color-secondary)', fontSize: '2rem' }}>{title}</h1>
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const DistanceSellingContract = () => (
    <PageLayout title="Mesafeli Satış Sözleşmesi">
        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>1. TARAFLAR</h3>
        <p>İşbu sözleşme, bir tarafta [SATICININ_UNVANI/İSMİ] (Bundan böyle SATICI olarak anılacaktır) ile diğer tarafta ürünü sipariş veren gerçek/tüzel kişi (Bundan böyle ALICI olarak anılacaktır) arasında kurulmuştur.</p>

        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>2. KONU</h3>
        <p>Sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesinden elektronik ortamda siparişini yaptığı ürünün satışı ve teslimi ile ilgili yasal hakların belirlenmesidir.</p>

        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>3. KARGO VE TESLİMAT</h3>
        <p>Ürün, ALICI'nın belirttiği teslimat adresine, anlaşmalı kargo firması aracılığı ile ürün bilgisi kısmında belirtilen sürede hasarsız olarak teslim edilecektir.</p>

        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>4. KİŞİYE ÖZEL ÜRÜNLERDE İPTAL VE İADE</h3>
        <p>Kişiye özel tasarım ve üretim aşaması içeren ürünlerde, sipariş verildikten ve tasarıma başlandıktan/ürün kargoya verildikten sonra cayma hakkı kapsamı dışında olduğu için <strong>iade/iptal söz konusu değildir</strong>, ALICI bu şartı kabul ederek alışverişini tamamlar.</p>
    </PageLayout>
);

export const RefundPolicy = () => (
    <PageLayout title="İptal ve İade Koşulları">
        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>İade Şartları</h3>
        <p>Almış olduğunuz ürünlerdeki üretim hataları veya üretimden/satıcıdan kaynaklı hasarlar haricinde "Kişiye Özel Üretilen Ürünler" yasalarda belirtilen "cayma hakkının geçerli olmadığı ürünler" kapsamındadır. Üzerine isim/tarih vb. size özel özelleştirme yapılarak satılan veya sizin istekleriniz doğrultusunda hazırlanan ürünlerde keyfi iade/değişim kabul edilmez.</p>

        <h3 style={{ marginTop: '1.5rem', color: 'var(--color-secondary)' }}>Hasarlı Teslimat</h3>
        <p>Kargonuzu kuryeden teslim alırken kolisini kontrol ediniz. Eğer üründe belirgin bir taşıma hasarı varsa kargo görevlisine "Hasar Tespit Tutanağı" hazırlatmanız veya ürünü hiç teslim almadan geri yollamanız gerekmektedir. İlgili tutanak tutulmadığı hallerde doğacak mağduriyetlerden kargo firması sorumlu olmaktadır.</p>

        <p style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
            <strong>İletişim:</strong> Olası bir hatalı üretim vb. durumlarda iade süreçleri için lütfen sipariş numaranız ve fotoğraflarınızla birlikte <a href="mailto:info@sarmalticaret.com" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>info@sarmalticaret.com</a> üzerinden bizimle iletişime geçiniz.
        </p>
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
