import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface WetlandFreskPageProps {
  onHomeClick: () => void;
}

export const WetlandFreskPage: React.FC<WetlandFreskPageProps> = ({
  onHomeClick: _onHomeClick
}) => {
  const { t } = useTranslation();
  // Set page background
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Ensure html and body take full height
    html.style.minHeight = "100vh";
    html.style.height = "auto";
    body.style.minHeight = "100vh";
    body.style.height = "auto";
    
    // Set solid background color
    body.style.backgroundColor = "#dfebf5";
    
    return () => {
      html.style.minHeight = "";
      html.style.height = "";
      body.style.minHeight = "";
      body.style.height = "";
      body.style.backgroundColor = "";
    };
  }, []);

  const handleDownload = () => {
    // TODO: Add actual download link
    window.open('https://doi.org/10.5281/zenodo.17477431', '_blank');
  };

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header with title */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              {/* Title */}
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#51727C',
                    margin: 0,
                    marginBottom: '20px'
                  }}
                >
                  {t('wetlandFreskPage.title')}
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8" style={{ flex: 1, paddingBottom: '120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {/* Description Text - Full Width */}
          <div style={{
            fontFamily: 'Comfortaa, sans-serif',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#406A46',
            textAlign: 'center',
            width: '100%',
            lineHeight: '1.6',
            marginBottom: '50px'
          }}>
            {t('wetlandFreskPage.description')}
          </div>

          {/* Two Columns Layout */}
          <div style={{ width: '60%', margin: '0 auto' }}>
            <div className="flex gap-12" style={{ alignItems: 'flex-start' }}>
              {/* Left Column - Information */}
            <div className="flex flex-col" style={{ width: '50%', flex: 1 }}>
              {/* Duration */}
              <div className="flex items-start" style={{ marginBottom: '40px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#97C09D',
                  borderRadius: '50%'
                }}>
                  <img 
                    src="/assets/icons/clock.png" 
                    alt="Duration" 
                    style={{ 
                      width: '50px',
                      height: '50px',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
                <div style={{ marginLeft: '40px' }}>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#406A46',
                    marginBottom: '4px'
                  }}>
                    {t('wetlandFreskPage.duration.label')}
                  </div>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#51727C'
                  }}>
                    {t('wetlandFreskPage.duration.value')}
                  </div>
                </div>
              </div>

              {/* Number of Cards */}
              <div className="flex items-start" style={{ marginBottom: '40px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#97C09D',
                  borderRadius: '50%'
                }}>
                  <img 
                    src="/assets/icons/cards.png" 
                    alt="Cards" 
                    style={{ 
                      width: '55px',
                      height: '55px',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
                <div style={{ marginLeft: '40px' }}>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#406A46',
                    marginBottom: '4px'
                  }}>
                    {t('wetlandFreskPage.numberOfCards.label')}
                  </div>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#51727C'
                  }}>
                    {t('wetlandFreskPage.numberOfCards.value')}
                  </div>
                </div>
              </div>

              {/* Team players */}
              <div className="flex items-start" style={{ marginBottom: '40px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#97C09D',
                  borderRadius: '50%'
                }}>
                  <img 
                    src="/assets/icons/players.png" 
                    alt="Team players" 
                    style={{ 
                      width: '40px',
                      height: '40px',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
                <div style={{ marginLeft: '40px' }}>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#406A46',
                    marginBottom: '4px'
                  }}>
                    {t('wetlandFreskPage.teamPlayers.label')}
                  </div>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#51727C'
                  }}>
                    {t('wetlandFreskPage.teamPlayers.value')}
                  </div>
                </div>
              </div>

              {/* Age */}
              <div className="flex items-start">
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#97C09D',
                  borderRadius: '50%'
                }}>
                  <img 
                    src="/assets/icons/age.png" 
                    alt="Age" 
                    style={{ 
                      width: '55px',
                      height: '55px',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </div>
                <div style={{ marginLeft: '40px' }}>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#406A46',
                    marginBottom: '4px'
                  }}>
                    {t('wetlandFreskPage.age.label')}
                  </div>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#51727C'
                  }}>
                    {t('wetlandFreskPage.age.value')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Logo and Download */}
            <div className="flex flex-col items-center gap-6" style={{ width: '50%', flex: 1 }}>
              {/* Logo */}
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src="/assets/icons/Space4all.png" 
                  alt="Space4all Logo" 
                  style={{ 
                    maxWidth: '300px',
                    height: 'auto'
                  }}
                />
              </div>

              {/* Download Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleDownload}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderWidth: 0,
                    cursor: 'pointer',
                    padding: 0,
                    margin: 0,
                    transform: 'none',
                    transition: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.border = 'none';
                    e.currentTarget.style.outline = 'none';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.border = 'none';
                    e.currentTarget.style.outline = 'none';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.border = 'none';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.border = 'none';
                  }}
                >
                  <img 
                    src="/assets/icons/downloadfresk.png" 
                    alt="Download Wetland Fresk" 
                    style={{ 
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '100%',
                      opacity: 1,
                      display: 'block',
                      pointerEvents: 'none'
                    }}
                  />
                </button>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  {t('wetlandFreskPage.downloadNote')}
                </div>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

