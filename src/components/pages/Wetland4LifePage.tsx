import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Wetland4LifePageProps {
  onHomeClick: () => void;
}

export const Wetland4LifePage: React.FC<Wetland4LifePageProps> = ({
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

  const handleVisitWebsite = () => {
    // App komt medio januari online - button is disabled
    // window.open('https://wetland.restore4life-platform.eu', '_blank');
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
                  className="main-title"
                  style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#51727C',
                    margin: 0,
                    marginBottom: '20px'
                  }}
                >
                  {t('wetland4LifePage.title')}
                </motion.h1>
                <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <img 
                    src="/assets/icons/pointer.png" 
                    alt="Pointer" 
                    style={{ 
                      width: '60px',
                      height: '60px'
                    }}
                  />
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#406A46'
                  }}>
                    {t('wetland4LifePage.subtitle')}
                  </div>
                </div>
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
          {/* Two Columns Layout */}
          <div style={{ width: '90%', margin: '0 auto' }}>
            <div className="flex gap-12" style={{ alignItems: 'flex-start' }}>
              {/* Left Column - What does Wetland4Life do? */}
              <div className="flex flex-col" style={{ width: '50%', flex: 1 }}>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-start' }}>
                  <img 
                    src="/assets/icons/Wetland4Life.png" 
                    alt="Wetland4Life Logo" 
                    style={{ 
                      maxWidth: '450px',
                      height: 'auto'
                    }}
                  />
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  marginBottom: '30px'
                }}>
                  {t('wetland4LifePage.whatDoesItDo.title')}
                </div>

                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  textAlign: 'left',
                  width: '90%',
                  lineHeight: '1.6',
                  marginBottom: '10px'
                }}>
                  {t('wetland4LifePage.whatDoesItDo.description')}
                </div>
              </div>

              {/* Right Column - How it works */}
              <div className="flex flex-col" style={{ width: '50%', flex: 1 }}>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  textAlign: 'left',
                  width: '100%',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
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
                      src="/assets/icons/works.png" 
                      alt="Works" 
                      style={{ 
                        width: '60px',
                        height: '60px',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                  <strong>{t('wetland4LifePage.howItWorks.title')}</strong>
                </div>

                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#51727C',
                  textAlign: 'left',
                  width: '100%',
                  lineHeight: '1.6',
                  marginBottom: '10px'
                }}>
                  {t('wetland4LifePage.howItWorks.description')} <strong style={{ color: '#406A46' }}>{t('wetland4LifePage.howItWorks.time')}</strong> {t('wetland4LifePage.howItWorks.timeEnd')}
                </div>

                {/* Academy Section */}
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  textAlign: 'left',
                  width: '100%',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
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
                      src="/assets/icons/learn.png" 
                      alt="Learn" 
                      style={{ 
                        width: '60px',
                        height: '60px',
                        filter: 'brightness(0) invert(1)'
                      }}
                    />
                  </div>
                  {t('wetland4LifePage.academy.title')}
                </div>

                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#51727C',
                  textAlign: 'left',
                  width: '100%',
                  lineHeight: '1.6',
                  marginBottom: '10px'
                }}>
                  {t('wetland4LifePage.academy.description')}
                </div>
              </div>
            </div>
          </div>

          {/* Full width text */}
          <div style={{ 
            width: '100%',
            marginTop: '20px',
            marginBottom: '40px',
            textAlign: 'center'
          }}>
            <div style={{
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#CE7C0A',
              lineHeight: '1.6'
            }}>
              {t('wetland4LifePage.callToAction')}
            </div>
          </div>

          {/* Visit Website Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={handleVisitWebsite}
              disabled={true}
              style={{
                backgroundColor: '#97C09D',
                border: 'none',
                borderRadius: '8px',
                padding: '16px 32px',
                cursor: 'not-allowed',
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                transition: 'background-color 0.3s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                opacity: 0.7
              }}
            >
              {t('wetland4LifePage.visitButton')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

