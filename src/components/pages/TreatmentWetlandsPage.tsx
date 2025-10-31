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
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
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

                {/* Subtitle for current page */}
                <h2 style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  margin: 0,
                  marginTop: '10px',
                  marginBottom: '0'
                }}>
                  {getTitleForPage(currentPage)}
                </h2>

                {/* Pointer icon for pages 2-4 - right below subtitle */}
                {currentPage > 1 && (
                  <img
                    src="/assets/icons/pointer.png"
                    alt="Pointer"
                    style={{
                      width: '60px',
                      height: '60px',
                      marginTop: '0px'
                    }}
                  />
                )}
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
          <div className="w-full" style={{ marginTop: '0px' }}>

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
                    maxWidth: '1200px',
                    height: 'auto',
                    borderRadius: '12px'
                  }}
                />
              </div>
            )}

            {/* Page 2-4 Content */}
            {currentPage === 2 && (
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                Learn about the characters that represent the layers of a treatment wetland — Reeda, Sandy, Gravelia, and Rocky. Drag each layer label to its correct place in the container, then check if you got the order right!
              </div>
            )}

            {currentPage === 3 && (
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                Pour the materials from the buckets in the correct order to build your vertical treatment wetland — first stones, then gravel, sand, and finally plant the reeds on top. Watch how your wetland gets ready to clean the water naturally!
              </div>
            )}

            {currentPage === 4 && (
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                lineHeight: '1.6'
              }}>
                Now that the wetland is built, let's meet its hidden workers — the tiny microbes who do most of the cleaning job.
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
          <div className="flex items-center justify-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', gap: '14px' }}>
            {Array.from({ length: TOTAL_PAGES }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    opacity: 1
                  }}
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: '14px',
                      height: '14px',
                      backgroundColor: currentPage === pageNum ? '#51727C' : '#97C09D'
                    }}
                  />
                </button>
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

