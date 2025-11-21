import React from 'react';

interface FooterProps {
  onPrivacyClick: () => void;
  onCookiePolicyClick: () => void;
  onTermsOfUseClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onCookiePolicyClick, onTermsOfUseClick }) => {
  return (
    <>
      {/* EU Logo Disclaimer Bar */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '8px 100px',
          marginTop: 'auto',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="eu-disclaimer-bar"
      >
        <img 
          src="/assets/icons/EU.png" 
          alt="Co-funded by the European Union" 
          style={{ 
            height: '80px', 
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
          padding: '20px 100px',
          flexShrink: 0,
          fontFamily: 'Comfortaa, sans-serif',
          fontSize: '14px',
        }}
      >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span>Copyright © {new Date().getFullYear()} Restore4Life Consortium. All Rights Reserved.</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>|</span>
          <a
            href="https://www.restore4life.eu"
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
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
          <button
            onClick={onPrivacyClick}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '14px',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Privacy Policy
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
              fontSize: '14px',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Cookie Policy
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
              fontSize: '14px',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Terms of Use
          </button>
        </div>
      </div>
    </footer>
    </>
  );
};

