import React from 'react';
import { motion } from 'framer-motion';

interface BlueGreenSpace4AllPageProps {
  onHomeClick: () => void;
}

export const BlueGreenSpace4AllPage: React.FC<BlueGreenSpace4AllPageProps> = ({
  onHomeClick
}) => {
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
                  Blue-Green Space4All
                </motion.h1>
                <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <img 
                    src="/assets/icons/pointer.png" 
                    alt="Pointer" 
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#406A46'
                  }}>
                    Travel with Otis the Otter along the Danube and tackle challenges!
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
          <div style={{ width: '90%', margin: '0 auto' }}>
            <div className="flex gap-12" style={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {/* Left: Otis illustration */}
              <div className="flex items-center justify-start" style={{ width: '20%', minWidth: '280px', overflow: 'visible' }}>
                <img 
                  src="/assets/components/otis.png" 
                  alt="Otis the Otter" 
                  style={{ maxWidth: '200%', height: 'auto', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
                />
              </div>

              {/* Right: Description and CTA */}
              <div className="flex flex-col" style={{ width: '80%', minWidth: '300px', flex: 1 }}>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '26px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  A playful computer game where you travel with Otis the Otter along the Danube. Along the way, you will encounter biological, physical, chemical, and social challenges. Answer questions, choose solutions, and improve the Danube step by step — while collecting as many coins as possible.
                </div>
                {/* Quiz highlight replaces the goal sentence */}
                <div style={{ width: '100%', marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
                  <div className="flex items-center" style={{ gap: '12px', padding: '12px 14px', backgroundColor: '#EAF4ED', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.06)', width: '90%', maxWidth: '650px' }}>
                    <img 
                      src="/assets/icons/quiz.png" 
                      alt="Quiz" 
                      style={{ width: '28px', height: '36px' }}
                    />
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#406A46'
                    }}>
                      The perfect test of how much you've learned about wetlands!
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Screenshots gallery */}
            <div style={{ width: '100%', marginTop: '28px' }}>
              <div className="flex" style={{ gap: '16px', alignItems: 'stretch', justifyContent: 'center', flexWrap: 'wrap' }}>
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

            {/* Centered CTA below columns */}
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <button
                onClick={handlePlayGame}
                style={{
                  backgroundColor: '#97C09D',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px 32px',
                  cursor: 'pointer',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '20px',
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
                Play Blue-Green Space4All
              </button>
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#51727C',
                marginTop: '12px'
              }}>
                You will open an external website with the game.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer with Home Button */}
      <div className="relative z-10" style={{ 
        position: 'sticky', 
        bottom: 0, 
        backgroundColor: 'rgba(223, 235, 245, 0.95)',
        paddingTop: '20px',
        paddingBottom: '20px',
        flexShrink: 0
      }}>
        <div className="relative flex justify-between items-center px-4">
          {/* Home Button - Left */}
          <div className="flex items-center">
            <button
              onClick={onHomeClick}
              className="home-button relative flex items-center justify-center z-50"
              style={{ 
                width: '54px',
                height: '54px',
                backgroundColor: 'transparent',
                border: 'none'
              }}
            >
              <img 
                src="/assets/icons/Home.png" 
                alt="Home" 
                style={{ 
                  width: '54px',
                  height: '54px',
                  opacity: 1
                }}
              />
            </button>
          </div>

          {/* Center Section - Empty for centering */}
          <div className="flex items-center justify-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          </div>

          {/* Right Section - Empty */}
          <div className="flex items-center" style={{ width: '54px' }}>
          </div>
        </div>
      </div>
    </div>
  );
};


