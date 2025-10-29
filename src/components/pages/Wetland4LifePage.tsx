import React from 'react';
import { motion } from 'framer-motion';

interface Wetland4LifePageProps {
  onHomeClick: () => void;
}

export const Wetland4LifePage: React.FC<Wetland4LifePageProps> = ({
  onHomeClick
}) => {
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
    window.open('https://wetland.restore4life-platform.eu', '_blank');
  };

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header with title */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
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
                  Wetland4Life
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
                    Explore the potential of wetlands via an app!
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
                  What does Wetland4Life do?
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
                  Wetland4Life helps to make wetland mapping accessible to everyone. It offers simple, practical ways to assess wetland condition and identify restoration opportunities.
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
                  <strong>How it works</strong>
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
                  Step-by-step simple questions guide you through the mapping process. Each location takes approximately <strong style={{ color: '#406A46' }}>5 minutes</strong> to assess — quick, clear, and scientifically grounded.
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
                  Want to learn more?
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
                  The app include a built-in academy with material about wetlands — like their functions, threats, and restoration. Whether you're a beginner or a professional, there's always something new to discover.
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
              Because wetlands are so essential to our safety, our environment, and our future, it's crucial to understand their current state — and where we can restore what has been lost. So we need you!
            </div>
          </div>

          {/* Visit Website Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={handleVisitWebsite}
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
              Visit Wetland4Life App
            </button>
            <div style={{
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#51727C',
              textAlign: 'center',
              marginTop: '12px'
            }}>
              This link leads to an external website optimized for mobile. The experience may be less optimal on desktop.
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
            {/* No pagination needed for single page */}
          </div>

          {/* Right Section - Empty */}
          <div className="flex items-center" style={{ width: '54px' }}>
            {/* Spacer to balance layout */}
          </div>
        </div>
      </div>
    </div>
  );
};

