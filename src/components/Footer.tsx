import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocalizedImage } from './LocalizedImage';
import { useOrientation } from '../hooks/useOrientation';

interface FooterProps {
  onPrivacyClick: () => void;
  onCookiePolicyClick: () => void;
  onTermsOfUseClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onCookiePolicyClick, onTermsOfUseClick }) => {
  const { t } = useTranslation();
  const { isMobile } = useOrientation();
  
  return (
    <>
      {/* EU Logo Disclaimer Bar */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: isMobile ? '8px 20px' : '8px 100px',
          marginTop: 'auto',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="eu-disclaimer-bar"
      >
        <LocalizedImage 
          src="/assets/icons/EU.png" 
          alt="Co-funded by the European Union" 
          style={{ 
            height: isMobile ? '60px' : '80px', 
            width: 'auto', 
            display: 'block',
            maxWidth: '100%'
          }}
        />
      </div>
      
      {/* Footer */}
      <footer
        style={{
          width: '100%',
          backgroundColor: '#51727C',
          color: 'white',
          padding: isMobile ? '20px 20px' : '20px 100px',
          flexShrink: 0,
          fontFamily: 'Comfortaa, sans-serif',
          fontSize: isMobile ? '12px' : '14px',
        }}
      >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: isMobile ? '16px' : '16px',
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '12px' : '24px', 
          flexWrap: 'wrap',
          width: isMobile ? '100%' : 'auto'
        }}>
          <span style={{ width: isMobile ? '100%' : 'auto' }}>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
          {!isMobile && (
            <>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>|</span>
              <a
                href="https://www.restore4life.eu"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                restore4life.eu
              </a>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>|</span>
            </>
          )}
          {/* Links section - horizontal on mobile with separators */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: isMobile ? '8px' : '24px',
            flexWrap: 'wrap',
            width: isMobile ? '100%' : 'auto'
          }}>
            <button
              onClick={onPrivacyClick}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {t('footer.privacyPolicy')}
            </button>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>|</span>
            <button
              onClick={onCookiePolicyClick}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {t('footer.cookiePolicy')}
            </button>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>|</span>
            <button
              onClick={onTermsOfUseClick}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {t('footer.termsOfUse')}
            </button>
          </div>
        </div>
        {!isMobile && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            width: 'auto'
          }}>
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '0',
              }}
              title="Creative Commons Attribution-NonCommercial 4.0 International License"
            >
              <img 
                src="https://licensebuttons.net/l/by-nc/4.0/88x31.png" 
                alt="CC BY-NC 4.0" 
                style={{ height: '31px', width: 'auto' }}
              />
            </a>
          </div>
        )}
      </div>
    </footer>
    </>
  );
};

