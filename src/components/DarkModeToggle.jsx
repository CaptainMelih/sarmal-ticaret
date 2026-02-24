import React from 'react';
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle({ isDark, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className="dark-mode-toggle"
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '2rem',
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: '50%',
                background: isDark
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                transition: 'all 0.3s ease',
                zIndex: 1000
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
            title={isDark ? 'Açık Moda Geç' : 'Karanlık Moda Geç'}
        >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>
    );
}
