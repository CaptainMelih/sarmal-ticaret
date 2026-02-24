import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, User } from 'lucide-react';
import * as db from '../lib/supabase';

export function ProductReviews({ productId, user }) {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await db.getProductReviews(productId);
                setReviews(data);
            } catch (err) {
                console.error('Fetch reviews error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (productId) fetchReviews();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Yorum yapmak için giriş yapmalısınız.');
            return;
        }

        setIsSubmitting(true);
        try {
            const newReview = {
                product_id: productId,
                user_id: user.id,
                rating,
                comment
            };
            const added = await db.addReview(newReview);

            // Local state'i güncelle (profiles verisiyle birlikte)
            setReviews([{ ...added, profiles: { name: user.name || 'Misafir' } }, ...reviews]);
            setComment('');
            setRating(5);
        } catch (err) {
            console.error('Add review error:', err);
            alert('Yorum eklenirken bir hata oluştu. Her ürüne sadece bir yorum yapabilirsiniz.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Yorumlar yükleniyor...</div>;

    return (
        <div style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={24} color="var(--color-primary)" />
                Müşteri Değerlendirmeleri ({reviews.length})
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--color-secondary)' }}>
                        {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.2rem', marginBottom: '0.5rem' }}>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={20}
                                fill={i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)) ? 'var(--color-accent)' : 'none'}
                                color={i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)) ? 'var(--color-accent)' : '#cbd5e1'}
                            />
                        ))}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                        {reviews.length} değerlendirme
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem' }}>
                    {[5, 4, 3, 2, 1].map(num => (
                        <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.85rem', width: '20px' }}>{num}★</span>
                            <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%',
                                    background: 'var(--color-accent)',
                                    width: `${(reviews.filter(r => r.rating === num).length / (reviews.length || 1)) * 100}%`
                                }}></div>
                            </div>
                            <span style={{ fontSize: '0.85rem', width: '30px', color: 'var(--color-text-light)' }}>
                                {reviews.filter(r => r.rating === num).length}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Form */}
            {user ? (
                <div style={{
                    background: 'var(--color-bg)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '2rem'
                }}>
                    <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Bu ürünü puanla:</h4>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                    <Star
                                        size={24}
                                        fill={star <= rating ? 'var(--color-accent)' : 'none'}
                                        color={star <= rating ? 'var(--color-accent)' : 'var(--color-text-light)'}
                                    />
                                </button>
                            ))}
                        </div>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Ürün hakkında ne düşünüyorsunuz?"
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid #cbd5e1',
                                    minHeight: '100px',
                                    outline: 'none',
                                    fontSize: '0.95rem'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    right: '1rem',
                                    background: 'var(--color-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '0.5rem 1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: 'var(--shadow-md)',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                            >
                                <Send size={16} />
                                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <p style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    color: '#856404',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    Yorum yazmak için lütfen giriş yapın.
                </p>
            )}

            {/* Review List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {reviews.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-light)', fontStyle: 'italic' }}>
                        Henüz yorum yapılmamış. İlk yorumu siz yapın!
                    </p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} style={{
                            display: 'flex',
                            gap: '1rem',
                            paddingBottom: '1.5rem',
                            borderBottom: '1px solid #f1f5f9'
                        }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                background: 'var(--color-primary)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <User style={{ margin: 'auto' }} size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h5 style={{ fontWeight: '700' }}>{review.profiles?.name || 'Anonim Müşteri'}</h5>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                                        {new Date(review.created_at).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.5rem' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? 'var(--color-accent)' : 'none'}
                                            color={i < review.rating ? 'var(--color-accent)' : 'var(--color-text-light)'}
                                        />
                                    ))}
                                </div>
                                <p style={{ color: 'var(--color-text)', lineHeight: '1.5', fontSize: '0.95rem' }}>
                                    {review.comment}
                                </p>

                                {review.admin_reply && (
                                    <div style={{
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        background: '#f8fafc',
                                        borderRadius: 'var(--radius-md)',
                                        borderLeft: '4px solid var(--color-primary)',
                                        fontSize: '0.9rem'
                                    }}>
                                        <div style={{ fontWeight: '700', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Zap size={14} color="var(--color-primary)" />
                                            Sarmal Ticaret Yanıtı
                                        </div>
                                        <div style={{ fontStyle: 'italic', color: 'var(--color-text-light)' }}>
                                            {review.admin_reply}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
