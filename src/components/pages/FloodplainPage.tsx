import React from 'react';
import { motion } from 'framer-motion';

interface FloodplainPageProps {
  onHomeClick: () => void;
  onMapWetlandClick?: () => void;
}

const TOTAL_PAGES = 4;

// Pages 1 and 2 have 3 sub-images each, page 3 has 2 sub-images
const getImagePath = (page: number, subPage: number) => {
  if (page === 1 || page === 2 || page === 3) {
    return `/assets/components/LivingEnvironment/page${page}-${subPage}.png`;
  }
  return `/assets/components/LivingEnvironment/page${page}.png`;
};

export const FloodplainPage: React.FC<FloodplainPageProps> = ({
  onHomeClick,
  onMapWetlandClick
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentSubPage, setCurrentSubPage] = React.useState(3); // Start with last photo on page 1
  const [sliderPosition, setSliderPosition] = React.useState(50); // For page 4 slider (0-100)

  // Slider handlers
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseInt(e.target.value));
  };

  const handleSliderMouseDown = () => {
    // Optional: Add visual feedback when dragging starts
  };

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

  return (
    <div className="relative w-full min-h-screen page-container" style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#dfebf5' }}>
      {/* Header with title and home button */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              {/* Title */}
              <div className="text-center">
                <motion.h1 
                  key={currentPage}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  Floodplain Living Environment
                </motion.h1>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8" style={{ flex: 1, overflowY: 'auto' }}>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {currentPage <= 3 ? (
            // Pages 1-3: Image with title
            <div className="flex flex-col items-center">
              {/* Page Title */}
              {currentPage === 1 && (
                <div className="mb-6" style={{ height: '40px' }}>
                  {/* White space for consistent positioning */}
                </div>
              )}
              {currentPage === 2 && (
                <div className="mb-6">
                  <h3 style={{ 
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '36px', 
                    fontWeight: 'bold', 
                    color: '#406BB8',
                    textAlign: 'center'
                  }}>
                    Floodplains in rainy season
                  </h3>
                </div>
              )}
              {currentPage === 3 && (
                <div className="mb-6">
                  <h3 style={{ 
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '36px', 
                    fontWeight: 'bold', 
                    color: '#9F8B68',
                    textAlign: 'center'
                  }}>
                    Floodplains in dry season
                  </h3>
                </div>
              )}
              
              {/* Image */}
              <div className="flex justify-center">
                <div style={{ width: '100%', maxWidth: '1600px' }}>
                  <img 
                    src={getImagePath(currentPage, currentSubPage)}
                    alt={`Floodplain page ${currentPage}${currentPage === 1 ? `-${currentSubPage}` : ''}`}
                    className="w-full h-auto"
                    style={{ 
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            // Page 4: Gamification - Image Comparison Slider
            <div className="flex flex-col items-center">
              {/* Pointer Icon */}
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src="/assets/icons/pointer.png" 
                  alt="Pointer" 
                  style={{ 
                    width: '70px', 
                    height: '70px',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
              
              {/* Slider Title */}
              <div className="mb-6">
                <h3 style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#406A46',
                  textAlign: 'center'
                }}>
                  Slide the bar to see the differences
                </h3>
              </div>
              
              <div style={{ width: '90%', maxWidth: '1600px', display: 'flex', alignItems: 'center', gap: '20px', margin: '0 auto' }}>
                {/* Left Icon - Rain */}
                <div 
                  className="flex items-center justify-center"
                  style={{ width: '20%', display: 'flex', justifyContent: 'center' }}
                >
                  <div 
                    className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center transition-opacity duration-300"
                    style={{ 
                      opacity: Math.max(0.3, sliderPosition / 100) // More transparent as slider moves left
                    }}
                  >
                    <img 
                      src="/assets/components/LivingEnvironment/icon-rain.png" 
                      alt="Rain" 
                      className="w-10 h-10"
                    />
                  </div>
                </div>

                {/* Image Slider Container */}
                <div 
                  className="relative"
                  style={{ 
                    width: '60%',
                    backgroundColor: 'transparent',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    aspectRatio: '16/9'
                  }}
                >
                  {/* Background Image (Before) */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: "url('/assets/components/LivingEnvironment/dry.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  
                  {/* Foreground Image (After) - Clipped based on slider position */}
                  <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: "url('/assets/components/LivingEnvironment/rain.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
                    }}
                  />
                  
                  {/* Slider Line */}
                  <div 
                    className="absolute shadow-lg"
                    style={{
                      left: `${sliderPosition}%`,
                      top: '2%',
                      bottom: '2%',
                      transform: 'translateX(-50%)',
                      width: '5px',
                      backgroundColor: '#FC8A8A',
                      zIndex: 20
                    }}
                  />
                  
                  {/* Top Circle */}
                  <div 
                    className="absolute shadow-lg"
                    style={{
                      left: `${sliderPosition}%`,
                      top: '2%',
                      transform: 'translateX(-50%) translateY(-50%)',
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#FC8A8A',
                      borderRadius: '50%',
                      zIndex: 20
                    }}
                  />
                  
                  {/* Bottom Circle */}
                  <div 
                    className="absolute shadow-lg"
                    style={{
                      left: `${sliderPosition}%`,
                      bottom: '2%',
                      transform: 'translateX(-50%) translateY(50%)',
                      width: '15px',
                      height: '15px',
                      backgroundColor: '#FC8A8A',
                      borderRadius: '50%',
                      zIndex: 20
                    }}
                  />
                  
                  {/* Slider Handle */}
                  <div 
                    className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center"
                    style={{
                      left: `${sliderPosition}%`,
                      backgroundColor: '#FC8A8A',
                      zIndex: 20
                    }}
                    onMouseDown={handleSliderMouseDown}
                  >
                    <div className="w-1 h-6 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Slider Input (invisible, for accessibility) */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                    style={{ margin: 0, padding: 0 }}
                  />
                  
                </div>

                {/* Right Icon - Dry */}
                <div 
                  className="flex items-center justify-center"
                  style={{ width: '20%', minWidth: '80px', display: 'flex', justifyContent: 'center' }}
                >
                  <div 
                    className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center transition-opacity duration-300"
                    style={{ 
                      opacity: Math.max(0.3, 1 - (sliderPosition / 100)) // More transparent as slider moves right
                    }}
                  >
                    <img 
                      src="/assets/components/LivingEnvironment/icon-dry.png" 
                      alt="Dry" 
                      className="w-10 h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Pagination and Next Button - Sticky Footer */}
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

          {/* Center Section - Pagination and Download Button */}
          <div className="flex items-center justify-center" style={{ position: 'relative' }}>
            {/* Download Button - Only on last page, 50px left of pagination */}
            {currentPage === TOTAL_PAGES && (
              <button
                className="download-button relative flex items-center justify-center z-50"
                style={{
                  width: '480px',
                  height: '50px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  marginRight: '50px'
                }}
              >
                <img 
                  src="/assets/icons/download.png" 
                  alt="Download" 
                  style={{ 
                    width: '480px',
                    height: '50px',
                    opacity: 1
                  }}
                />
              </button>
            )}

            {/* Pagination Dots - Centered */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center items-center"
              style={{ gap: '14px' }}
            >
              {Array.from({ length: TOTAL_PAGES }, (_, index) => {
                const pageNum = index + 1;
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      // Skip directly to last photo on pages 1-3
                      if (pageNum === 1 || pageNum === 2 || pageNum === 3) {
                        const maxSubPages = pageNum === 3 ? 2 : 3;
                        setCurrentSubPage(maxSubPages);
                      } else {
                        setCurrentSubPage(1);
                      }
                    }}
                    className="transition-all duration-300 p-0 border-0 bg-transparent"
                    aria-label={`Go to page ${pageNum}`}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      padding: 0,
                      cursor: 'pointer'
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
            </motion.div>

            {/* NEXT TOPIC Text - Only on last page, 50px right of pagination */}
            {currentPage === TOTAL_PAGES && (
              <div style={{ marginLeft: '50px' }}>
                <span style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46'
                }}>
                  NEXT TOPIC: Map your wetland
                </span>
              </div>
            )}
          </div>

          {/* Next/Back Home Button - Right */}
          <div className="flex items-center">
            <button
            onClick={() => {
              if (currentPage < TOTAL_PAGES) {
                setCurrentPage(currentPage + 1);
                // Skip directly to the last photo on pages 1-3
                if (currentPage + 1 === 1 || currentPage + 1 === 2 || currentPage + 1 === 3) {
                  const nextPageMaxSubPages = currentPage + 1 === 3 ? 2 : 3;
                  setCurrentSubPage(nextPageMaxSubPages);
                } else {
                  setCurrentSubPage(1);
                }
              } else {
                // Navigate to Map Wetland page
                if (onMapWetlandClick) {
                  onMapWetlandClick();
                }
              }
            }}
            className="next-button relative flex items-center justify-center z-50"
            style={{
              width: '158px',
              height: '60px',
              backgroundColor: 'transparent',
              border: 'none'
            }}
          >
            <img 
              src="/assets/icons/next.png" 
              alt={currentPage === TOTAL_PAGES ? 'Map your wetland' : 'Next'} 
              style={{ 
                width: '158px',
                height: '60px',
                opacity: 1
              }}
            />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

