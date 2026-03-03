import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useOrientation } from '../../hooks/useOrientation';

interface BlueGreenSpace4AllPageProps {
  onHomeClick: () => void;
}

export const BlueGreenSpace4AllPage: React.FC<BlueGreenSpace4AllPageProps> = ({
  onHomeClick: _onHomeClick
}) => {
  const { t } = useTranslation();
  const { isMobile } = useOrientation();
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.style.minHeight = "100vh";
    html.style.height = "auto";
    body.style.minHeight = "100vh";
    body.style.height = "auto";
    body.style.backgroundColor = "#dfebf5";

    return () => {
      html.style.minHeight = "";
      html.style.height = "";
      body.style.minHeight = "";
      body.style.height = "";
      body.style.backgroundColor = "";
    };
  }, []);

  const handlePlayGame = () => {
    window.open('http://game.restore4life-platform.eu', '_blank');
  };

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'visible', paddingBottom: '0px' }}>
      {/* Header with title */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: isMobile ? '20px' : '40px', paddingBottom: isMobile ? '20px' : '40px' }}>
          <div className="w-full max-w-6xl px-4" style={{ paddingLeft: isMobile ? '16px' : '1rem', paddingRight: isMobile ? '16px' : '1rem' }}>
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
                    fontSize: isMobile ? '28px' : '48px',
                    fontWeight: 'bold',
                    color: '#51727C',
                    margin: 0,
                    marginBottom: isMobile ? '15px' : '20px'
                  }}
                >
                  {t('blueGreenSpace4AllPage.title')}
                </motion.h1>
                <div style={{ textAlign: 'center', marginTop: isMobile ? '8px' : '10px', marginBottom: isMobile ? '8px' : '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '10px' : '16px', flexWrap: 'wrap' }}>
                  <img 
                    src="/assets/icons/pointer.png" 
                    alt="Pointer" 
                    style={{ width: isMobile ? '36px' : '50px', height: isMobile ? '36px' : '50px' }}
                  />
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: isMobile ? '20px' : '28px',
                    fontWeight: 'bold',
                    color: '#406A46'
                  }}>
                    {t('blueGreenSpace4AllPage.subtitle')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8" style={{ flex: 1, paddingBottom: isMobile ? '80px' : '10px', paddingLeft: isMobile ? '16px' : '1rem', paddingRight: isMobile ? '16px' : '1rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          <div style={{ width: isMobile ? '100%' : '90%', margin: '0 auto' }}>
            <div className={isMobile ? 'flex flex-col' : 'flex'} style={{ alignItems: isMobile ? 'center' : 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: isMobile ? '16px' : '48px' }}>
              {/* Left: Otis illustration */}
              <div className="flex items-center justify-center" style={{ width: isMobile ? '100%' : '20%', minWidth: isMobile ? 'auto' : '280px', overflow: 'visible' }}>
                <img 
                  src="/assets/components/otis.png" 
                  alt="Otis the Otter" 
                  style={{ maxWidth: isMobile ? '220px' : '200%', width: isMobile ? '100%' : undefined, height: 'auto', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
                />
              </div>

              {/* Right: Description and CTA */}
              <div className="flex flex-col" style={{ width: isMobile ? '100%' : '80%', minWidth: isMobile ? 'auto' : '300px', flex: 1 }}>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: isMobile ? '18px' : '26px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  lineHeight: '1.6',
                  marginBottom: isMobile ? '16px' : '20px',
                  textAlign: isMobile ? 'center' : 'left',
                  padding: isMobile ? '0 8px' : 0
                }}>
                  {t('blueGreenSpace4AllPage.description')}
                </div>
                {/* Quiz highlight replaces the goal sentence */}
                <div style={{ width: '100%', marginTop: isMobile ? '4px' : '8px', display: 'flex', justifyContent: 'center' }}>
                  <div className="flex items-center" style={{ gap: isMobile ? '10px' : '12px', padding: isMobile ? '10px 12px' : '12px 14px', backgroundColor: '#EAF4ED', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.06)', width: isMobile ? '100%' : '90%', maxWidth: '650px' }}>
                    <img 
                      src="/assets/icons/quiz.png" 
                      alt="Quiz" 
                      style={{ width: isMobile ? '24px' : '28px', height: isMobile ? '30px' : '36px', flexShrink: 0 }}
                    />
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: isMobile ? '15px' : '18px',
                      fontWeight: 'bold',
                      color: '#406A46'
                    }}>
                      {t('blueGreenSpace4AllPage.quizHighlight')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Screenshots gallery - hidden on mobile */}
            {!isMobile && (
            <div style={{ width: '100%', marginTop: '28px' }}>
              <div className="flex" style={{ flexDirection: 'row', gap: '16px', alignItems: 'stretch', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: '100%', maxWidth: '100%', flex: '1 1 320px' }}>
                  <img 
                    src="/assets/components/game1.jpg" 
                    alt="Game screenshot 1" 
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
                  />
                </div>
                <div style={{ width: '100%', maxWidth: '100%', flex: '1 1 320px' }}>
                  <img 
                    src="/assets/components/game2.jpg" 
                    alt="Game screenshot 2" 
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
                  />
                </div>
                <div style={{ width: '100%', maxWidth: '100%', flex: '1 1 320px' }}>
                  <img 
                    src="/assets/components/game3.jpg" 
                    alt="Game screenshot 3" 
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
                  />
                </div>
              </div>
            </div>
            )}

            {/* Centered CTA below columns */}
            <div style={{ textAlign: 'center', marginTop: isMobile ? '12px' : '36px' }}>
              <button
                onClick={handlePlayGame}
                style={{
                  backgroundColor: '#97C09D',
                  border: 'none',
                  borderRadius: '8px',
                  padding: isMobile ? '14px 28px' : '16px 32px',
                  cursor: 'pointer',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  transition: 'background-color 0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7FAF85';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#97C09D';
                }}
              >
                {t('blueGreenSpace4AllPage.playButton')}
              </button>
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 'bold',
                color: '#51727C',
                marginTop: isMobile ? '10px' : '12px',
                padding: isMobile ? '0 12px' : 0
              }}>
                {t('blueGreenSpace4AllPage.externalLinkNote')}
              </div>
              <a
                href={t('blueGreenSpace4AllPage.websiteUrl')}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: 'bold',
                  color: '#51727C',
                  marginTop: '8px',
                  display: 'block',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: isMobile ? '0 12px' : 0,
                  wordBreak: 'break-all' as const
                }}
              >
                {t('blueGreenSpace4AllPage.websiteUrl')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


