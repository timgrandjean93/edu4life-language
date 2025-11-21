import React, { useState, useEffect } from 'react';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

const CONSENT_STORAGE_KEY = 'cookie_consent';

export const CookieConsent: React.FC<{
  onConsentChange: (accepted: boolean) => void;
}> = ({ onConsentChange }) => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>('pending');

  useEffect(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setConsentStatus(stored as ConsentStatus);
      onConsentChange(stored === 'accepted');
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    setConsentStatus('accepted');
    onConsentChange(true);
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'rejected');
    setConsentStatus('rejected');
    onConsentChange(false);
  };

  // Don't show banner if user has already made a choice
  if (consentStatus !== 'pending') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#51727C',
        color: 'white',
        padding: '20px 100px',
        zIndex: 1000,
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Comfortaa, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
            This website uses cookies for analytical purposes via Google Analytics. 
            You can accept or reject these cookies. 
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                // Navigate to cookie policy - will be handled by parent
                window.dispatchEvent(new CustomEvent('showCookiePolicy'));
              }}
              style={{ 
                color: 'white', 
                textDecoration: 'underline',
                marginLeft: '4px',
                cursor: 'pointer'
              }}
            >
              Read more in our cookie policy
            </a>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <button
            onClick={handleReject}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              border: '2px solid white',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'Comfortaa, sans-serif',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              border: '2px solid white',
              color: '#51727C',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'Comfortaa, sans-serif',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

