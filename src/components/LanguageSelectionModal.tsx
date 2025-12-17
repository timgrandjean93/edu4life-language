import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '../i18n/languages';
import { detectLanguageFromIP, getCountryName } from '../utils/geolocation';

const LANGUAGE_MODAL_SHOWN_KEY = 'language_modal_shown';

interface LanguageSelectionModalProps {
  onLanguageSelected: (languageCode: string) => void;
}

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({ onLanguageSelected }) => {
  const { i18n, t } = useTranslation();
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);
  const [detectedCountryCode, setDetectedCountryCode] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    // Check if modal has already been shown
    const hasBeenShown = localStorage.getItem(LANGUAGE_MODAL_SHOWN_KEY);
    if (hasBeenShown === 'true') {
      return;
    }

    // Detect language from IP
    detectLanguageFromIP().then(({ languageCode, countryCode }) => {
      setIsDetecting(false);
      setDetectedCountryCode(countryCode);
      if (languageCode) {
        // Check if detected language is available
        const isAvailable = AVAILABLE_LANGUAGES.some(lang => lang.code === languageCode);
        if (isAvailable) {
          setSuggestedLanguage(languageCode);
          // Auto-select suggested language
          i18n.changeLanguage(languageCode);
        } else {
          // Default to English if detected language not available
          setSuggestedLanguage('en');
        }
      } else {
        setSuggestedLanguage('en');
      }
    });
  }, [i18n]);

  const handleLanguageSelect = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem(LANGUAGE_MODAL_SHOWN_KEY, 'true');
    onLanguageSelected(languageCode);
  };

  // Don't show if already shown before
  const hasBeenShown = localStorage.getItem(LANGUAGE_MODAL_SHOWN_KEY);
  if (hasBeenShown === 'true') {
    return null;
  }

  const suggestedLangObj = suggestedLanguage 
    ? AVAILABLE_LANGUAGES.find(lang => lang.code === suggestedLanguage)
    : null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Comfortaa, sans-serif',
        }}
      >
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#51727C',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          {t('languageModal.title')}
        </h2>

        {isDetecting ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: '#707070', fontSize: '16px' }}>
              {t('languageModal.detecting')}
            </p>
          </div>
        ) : (
          <>
            {suggestedLangObj && (
              <div
                style={{
                  background: '#f0f7ff',
                  border: '2px solid #51727C',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '24px',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: '#51727C', fontSize: '16px', marginBottom: '12px', fontWeight: 'bold' }}>
                  {t('languageModal.suggested')} {detectedCountryCode ? getCountryName(detectedCountryCode) : suggestedLangObj.name}
                </p>
                <p style={{ color: '#707070', fontSize: '14px', marginBottom: '16px' }}>
                  {i18n.language === 'nl' 
                    ? `${t('languageModal.suggestedQuestion')} ${suggestedLangObj.name} gebruiken?`
                    : `${t('languageModal.suggestedQuestion')} ${suggestedLangObj.name}?`}
                </p>
                <button
                  onClick={() => handleLanguageSelect(suggestedLangObj.code)}
                  style={{
                    background: '#51727C',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'Comfortaa, sans-serif',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#406A46';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#51727C';
                  }}
                >
                  {t('languageModal.continueWith')} {suggestedLangObj.name}
                </button>
              </div>
            )}

            <div style={{ marginTop: '24px' }}>
              <p
                style={{
                  color: '#707070',
                  fontSize: '14px',
                  marginBottom: '16px',
                  textAlign: 'center',
                }}
              >
                Or choose a different language:
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '12px',
                }}
              >
                {AVAILABLE_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    style={{
                      background: i18n.language === lang.code ? '#51727C' : 'white',
                      color: i18n.language === lang.code ? 'white' : '#406A46',
                      border: `2px solid ${i18n.language === lang.code ? '#51727C' : '#e0e0e0'}`,
                      borderRadius: '8px',
                      padding: '16px',
                      fontSize: '16px',
                      fontWeight: i18n.language === lang.code ? 'bold' : 'normal',
                      cursor: 'pointer',
                      fontFamily: 'Comfortaa, sans-serif',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      if (i18n.language !== lang.code) {
                        e.currentTarget.style.backgroundColor = '#f8f8f8';
                        e.currentTarget.style.borderColor = '#51727C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (i18n.language !== lang.code) {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#e0e0e0';
                      }
                    }}
                  >
                    {lang.flag && <span style={{ fontSize: '32px' }}>{lang.flag}</span>}
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

