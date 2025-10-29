import React from 'react';
import { motion } from 'framer-motion';

interface TreatmentWetlandsPageProps {
  onHomeClick: () => void;
}

const TOTAL_PAGES = 4;

export const TreatmentWetlandsPage: React.FC<TreatmentWetlandsPageProps> = ({
  onHomeClick
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

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

  const getTitleForPage = (page: number) => {
    const titles = [
      "Nature's final filter – The Treatment Wetland",
      "Layer by layer – Nature's cleaning crew",
      "Let's build nature's filter - Vertical Flow Wetland",
      "Tiny cleaners, big impact!"
    ];
    return titles[page - 1];
  };

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header with title */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#406A46',
                    margin: 0,
                    marginBottom: '20px'
                  }}
                >
                  Treatment wetlands
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
          {/* Page Content */}
          <div className="w-full">
            <div className="text-center" style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#548235',
                margin: 0,
                marginBottom: currentPage > 1 ? '20px' : '0'
              }}>
                {getTitleForPage(currentPage)}
              </h2>
              
              {/* Pointer icon for pages 2-4 */}
              {currentPage > 1 && (
                <img
                  src="/assets/icons/pointer.png"
                  alt="Pointer"
                  style={{
                    width: '60px',
                    height: '60px',
                    marginTop: '20px'
                  }}
                />
              )}
            </div>

            {/* Page Content */}
            {currentPage === 1 && (
              <div style={{
                textAlign: 'center'
              }}>
                <img
                  src="/assets/components/constructed/page1.png"
                  alt="Nature's final filter – The Treatment Wetland"
                  style={{
                    width: '100%',
                    maxWidth: '900px',
                    height: 'auto',
                    borderRadius: '12px'
                  }}
                />
              </div>
            )}

            {/* Placeholder for other pages */}
            {currentPage > 1 && (
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '12px'
              }}>
                Content for page {currentPage} will go here
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Footer with Pagination and Navigation */}
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
                border: 'none',
                cursor: 'pointer'
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

          {/* Pagination Dots */}
          <div className="flex items-center justify-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {Array.from({ length: TOTAL_PAGES }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    width: currentPage === pageNum ? '40px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    backgroundColor: currentPage === pageNum ? '#406A46' : '#97C09D',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '0 6px',
                    transition: 'all 0.3s ease'
                  }}
                />
              );
            })}
          </div>

          {/* Next Button - Right */}
          {currentPage < TOTAL_PAGES && (
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: '158px',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <img
                  src="/assets/icons/next.png"
                  alt="Next"
                  style={{
                    width: '158px',
                    height: '60px',
                    opacity: 1
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

