import React from 'react';
import { motion } from 'framer-motion';

interface FloodplainPageProps {
  onHomeClick: () => void;
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
  onHomeClick
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentSubPage, setCurrentSubPage] = React.useState(1); // For page 1 sub-images
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
    
    // Set background that stays fixed when scrolling
    body.style.backgroundImage = "url('/assets/backgrounds/background-pages.png')";
    body.style.backgroundSize = "100vw 100vh"; // Cover exactly one viewport
    body.style.backgroundPosition = "center top";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundColor = "#e8f4f8"; // Fallback color that fills any space
    
    return () => {
      html.style.minHeight = "";
      html.style.height = "";
      body.style.minHeight = "";
      body.style.height = "";
      body.style.backgroundImage = "";
      body.style.backgroundSize = "";
      body.style.backgroundPosition = "";
      body.style.backgroundRepeat = "";
      body.style.backgroundAttachment = "";
      body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* Header with title and home button */}
      <div className="relative z-50">
        <div className="flex items-start justify-center" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              {/* Home Button */}
              <div className="absolute top-0" style={{ left: '10%' }}>
                <button
                  onClick={onHomeClick}
                  className="relative overflow-hidden bg-white hover:bg-white text-gray-800 font-bold w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white hover:border-white flex items-center justify-center z-50 opacity-100"
                  style={{ backgroundColor: 'white' }}
                >
                  <img 
                    src="/assets/icons/Home.png" 
                    alt="Home" 
                    className="w-6 h-6"
                    style={{ 
                      backgroundColor: 'white',
                      opacity: 1
                    }}
                  />
                </button>
              </div>
              
              {/* Title */}
              <div className="text-center">
                <motion.h1 
                  key={currentPage}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-blue-900 mb-2"
                  style={{ 
                    fontFamily: 'Comfortaa, sans-serif',
                    lineHeight: '1.2',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Floodplain Living Environment
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg sm:text-xl md:text-2xl text-blue-800 font-medium"
                  style={{ fontFamily: 'Comfortaa, sans-serif' }}
                >
                  WETLANDS EDU AND CS TOPICS IN R4L TOOLBOX
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8">
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
                    fontSize: '28px', 
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
                    fontSize: '28px', 
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
              {/* Slider Title */}
              <div className="mb-6">
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#51727C',
                  textAlign: 'center'
                }}>
                  Slide the bar to see the differences
                </h3>
              </div>
              
              <div style={{ width: '100%', maxWidth: '1600px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Left Icon - Rain */}
                <div 
                  className="flex items-center justify-center"
                  style={{ width: '15%', minWidth: '80px', display: 'flex', justifyContent: 'center' }}
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
                    width: '70%',
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
                  style={{ width: '15%', minWidth: '80px', display: 'flex', justifyContent: 'center' }}
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

      {/* Spacer */}
      <div className="relative z-10" style={{ height: '60px', width: '100%' }}></div>

      {/* Pagination and Next Button */}
      <div className="relative z-10 pb-8">
        <div className="relative flex justify-center items-center">
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
                  onClick={() => setCurrentPage(pageNum)}
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

          {/* Next/Back Home Button - Positioned at 90% */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            onClick={() => {
              // Handle sub-images: pages 1&2 have 3, page 3 has 2
              const maxSubPages = currentPage === 3 ? 2 : 3;
              
              if ((currentPage === 1 || currentPage === 2 || currentPage === 3) && currentSubPage < maxSubPages) {
                setCurrentSubPage(currentSubPage + 1);
              } else if (currentPage < TOTAL_PAGES) {
                setCurrentPage(currentPage + 1);
                setCurrentSubPage(1); // Reset sub-page when moving to next page
              } else {
                onHomeClick();
              }
            }}
            className="absolute transition-all duration-300 hover:opacity-80"
            style={{
              right: '10%',
              width: currentPage === TOTAL_PAGES ? '180px' : '140px',
              height: '60px',
              backgroundColor: '#51727C',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px', lineHeight: '1' }}>
              {currentPage === TOTAL_PAGES ? 'Back Home' : 'NEXT'}
            </span>
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d={currentPage === TOTAL_PAGES ? "M3 10H17M10 3L3 10L10 17" : "M7.5 15L12.5 10L7.5 5"}
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

