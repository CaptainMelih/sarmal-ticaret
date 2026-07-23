import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function CountdownTimer({ targetDate, title = "Fırsatın Bitmesine Kalan Süre:" }) {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        // Set end time 24 hours from now if no targetDate provided
        const endTime = targetDate ? new Date(targetDate).getTime() : new Date().getTime() + (14 * 3600 * 1000 + 22 * 60 * 1000 + 45 * 1000);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft({ hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const formatNumber = (num) => String(num).padStart(2, '0');

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', fontSize: '0.85rem' }}>
                <Clock size={18} className="spin-slow" />
                <span>{title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '900', fontSize: '1rem', fontFamily: 'monospace' }}>
                <span style={{ background: 'rgba(0,0,0,0.25)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {formatNumber(timeLeft.hours)}
                </span>
                <span>:</span>
                <span style={{ background: 'rgba(0,0,0,0.25)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {formatNumber(timeLeft.minutes)}
                </span>
                <span>:</span>
                <span style={{ background: 'rgba(0,0,0,0.25)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {formatNumber(timeLeft.seconds)}
                </span>
            </div>
        </div>
    );
}
