import React, { useEffect } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

export function Toast({ message, type = 'success', isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        info: <Info size={20} />
    };

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };

    return (
        <div style={{
            position: 'fixed',
            top: '5rem',
            right: '1rem',
            background: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 100,
            minWidth: '300px',
            borderLeft: `4px solid ${colors[type]}`,
            animation: 'slideIn 0.3s ease-out'
        }}>
            <div style={{ color: colors[type] }}>
                {icons[type]}
            </div>
            <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    padding: '0.25rem',
                    color: 'var(--color-text-light)',
                    display: 'flex'
                }}
            >
                <X size={18} />
            </button>
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
