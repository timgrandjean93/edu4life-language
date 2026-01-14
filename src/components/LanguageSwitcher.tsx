import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES, getOrderedLanguages } from '../i18n/languages';
import { useOrientation } from '../hooks/useOrientation';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { isMobile } = useOrientation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = AVAILABLE_LANGUAGES.find(lang => lang.code === i18n.language) || AVAILABLE_LANGUAGES[0];
  const orderedLanguages = getOrderedLanguages();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'transparent',
          border: isMobile ? 'none' : '2px solid white',
          color: 'white',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: 'Comfortaa, sans-serif',
          fontWeight: 'bold',
          fontSize: '14px',
          padding: isMobile ? '8px' : '6px 16px 6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '0' : '8px',
          transition: 'all 0.2s ease-in-out',
          minWidth: isMobile ? 'auto' : '120px',
          justifyContent: isMobile ? 'center' : 'space-between',
        }}
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {isMobile ? (
          <span style={{ fontSize: '28px', display: 'flex', alignItems: 'center' }}>
            {currentLanguage.flag && <span>{currentLanguage.flag}</span>}
          </span>
        ) : (
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {currentLanguage.flag && <span>{currentLanguage.flag}</span>}
              <span>{currentLanguage.name}</span>
            </span>
            <span style={{ fontSize: '10px', marginLeft: '4px' }}>▾</span>
          </>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            minWidth: '180px',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          {orderedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                background: i18n.language === lang.code ? '#f0f0f0' : 'white',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Comfortaa, sans-serif',
                fontWeight: i18n.language === lang.code ? 'bold' : 'normal',
                fontSize: '14px',
                color: '#406A46',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background-color 0.2s ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (i18n.language !== lang.code) {
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                }
              }}
              onMouseLeave={(e) => {
                if (i18n.language !== lang.code) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {lang.flag && <span style={{ fontSize: '18px' }}>{lang.flag}</span>}
              <span>{lang.name}</span>
              {i18n.language === lang.code && (
                <span style={{ marginLeft: 'auto', color: '#51727C' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

