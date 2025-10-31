import React from 'react';
import { motion } from 'framer-motion';
import { HomeButton } from '../HomeButton';

interface SelfPurificationPageProps {
  onHomeClick: () => void;
  onAestheticsClick?: () => void;
  onRepositoryClick?: () => void;
}

const TOTAL_PAGES = 6;

// Hover areas for the nutrients image 1
const nutrientsHoverAreas1 = [
  {
    id: 'area-1',
    x: 9.5,
    y: 14.5,
    width: 15,
    height: 20,
      text: 'Pollution that comes from many scattered places, such as <span style="color: #1C00B8;">farm fields, roads, or towns</span>, and is carried into rivers by rain or runoff.'
  },
  {
    id: 'area-2',
    x: 6,
    y: 33.5,
    width: 20,
    height: 15,
      text: 'Pollution that comes from a single, identifiable place, such as a <span style="color: #1C00B8;">pipe from a factory or a wastewater treatment plant</span>.'
  },
  {
    id: 'area-3',
    x: 20.5,
    y: 64.2,
    width: 20,
    height: 15,
      text: '<span style="color: #1C00B8;">Fertilizers and manure</span> dissolve in rainwater and move through the soil or across fields into rivers. This is the main source of diffuse nitrogen pollution.'
  },
  {
    id: 'area-4',
    x: 23.7,
    y: 30,
    width: 20,
    height: 15,
      text: 'Rainwater carries nitrogen compounds from <span style="color: #1C00B8;">streets, vehicles, and urban green areas</span> into drains and rivers.'
  },
  {
    id: 'area-5',
    x: 39,
    y: 34,
    width: 20,
    height: 15,
      text: '<span style="color: #1C00B8;">Treated water still contains some nitrogen</span> compounds that flow into rivers through outlet pipes. In some countries, modern plants remove most nitrogen efficiently, but in others, treatment is less advanced — or even missing.'
  },
  {
    id: 'area-6',
    x: 44.5,
    y: 23,
    width: 20,
    height: 15,
      text: '<span style="color: #1C00B8;">Some factories</span> release nitrogen-rich wastewater from food processing, chemicals, or manufacturing activities. Usually regulated but still important locally.'
  },
];

// Hover areas for the nutrients image 2
const nutrientsHoverAreas2 = [
  {
    id: 'area-1',
    x: 25.4,
    y: 73,
    width: 18,
    height: 15,
    text: 'Particulate N settles in sediments. Organic nitrogen particles <span style="color: #1C00B8;">sink down</span>, and thus become accessible for microbes living between sand grains — quiet zones of purification.'
  },
  {
    id: 'area-2',
    x: 42.5,
    y: 63.5,
    width: 20,
    height: 18,
    text: 'Nutrients → Biomass (temporary). Algae and aquatic plants <span style="color: #1C00B8;">take up nitrate and ammonium</span>; nitrogen is stored in their tissues until they decay.'
  },
  {
    id: 'area-3',
    x: 55.5,
    y: 42,
    width: 15,
    height: 20,
    text: '<span style="color: #1C00B8;">Ammonium → Nitrate (needs oxygen)</span>. Tiny microbes in oxygen-rich sediments convert ammonium into nitrate — the first step of purification.'
  },
  {
    id: 'area-4',
    x: 54,
    y: 50,
    width: 25,
    height: 15,
    text: '<span style="color: #1C00B8;">Nitrate → Nitrogen gas (no oxygen)</span> Bacteria in low-oxygen zones turn nitrate into nitrogen gas — the key process for nitrogen loss.'
  }
];

// Hover areas for the nutrients image 3
const nutrientsHoverAreas3 = [
    {
      id: 'area-1',
      x: 66,
      y: 73,
      width: 18,
      height: 15,
      text: '<span style="color: #1C00B8;">Nitrogen bound to particles settles.</span> During floods, suspended particles with nitrogen are trapped and deposited on the floodplain surface.'
    },
    {
      id: 'area-2',
      x: 65,
      y: 77.5,
      width: 20,
      height: 18,
      text: '<span style="color: #1C00B8;">Nutrients → Biomass (temporary).</span> Floodplain plants absorb nitrogen during the growing season and store it in wood and leaves.'
    },
    {
      id: 'area-3',
      x: 67.5,
      y: 82,
      width: 15,
      height: 20,
      text: '<span style="color: #1C00B8;">Nitrate → Nitrogen gas (no oxygen).</span> In flooded soils, microbes breathe without oxygen and transform nitrate into nitrogen gas — permanent nitrogen removal.'
    }
];

// Hover areas for the nutrients image 4
const nutrientsHoverAreas4 = [
    {
      id: 'area-1',
      x: 9.5,
      y: 17.6,
      width: 18,
      height: 15,
      text: 'Pollution that comes from many scattered places, such as <span style="color: #CE7C0A;">farmland, unpaved roads, or towns</span>.'
    },
  {
    id: 'area-2',
    x: 7.4,
    y: 32.5,
    width: 20,
    height: 18,
    text: 'Rainwater carries <span style="color: #CE7C0A;">dust, detergents, and waste particles rich in</span> phosphorus into drains and rivers. '
  },
  {
    id: 'area-3',
    x: 35,
    y: 52,
    width: 15,
    height: 15,
    text: 'Phosphorus <span style="color: #CE7C0A;">bound to soil particles</span> is washed into rivers during rain or floods.'
  },
  {
    id: 'area-4',
    x: 21,
    y: 62,
    width: 25,
    height: 15,
    text: '<span style="color: #CE7C0A;">Fertilizer</span> phosphorus dissolves in water and slowly reaches rivers through the soil or overland flow. A smaller but steady diffuse source.'
  },
  {
    id: 'area-5',
    x: 29.5,
    y: 32,
    width: 20,
    height: 15,
    text: 'Rainwater carries <span style="color: #CE7C0A;">dust, detergents, and waste particles rich in</span> phosphorus into drains and rivers.'
  },
  {
    id: 'area-6',
    x: 40.5,
    y: 32.5,
    width: 20,
    height: 20,
    text: '<span style="color: #CE7C0A;">Even after treatment, part of the</span> phosphorus remains in discharged water. Many countries have upgraded their plants, but others still lack efficient systems or any wastewater treatment at all.'
  },
  {
    id: 'area-7',
    x: 46,
    y: 21,
    width: 20,
    height: 18,
    text: 'Certain factories release phosphorus-containing wastewater from <span style="color: #CE7C0A;">cleaning, processing, or production activities</span>. Usually regulated but still significant in some areas.'
  }
];

// Hover areas for the nutrients image 5
const nutrientsHoverAreas5 = [
    {
      id: 'area-1',
      x: 24.5,
      y: 68,
      width: 20,
      height: 20,
      text: '<span style="color: #CE7C0A;">Dissolved phosphate sticks to minerals</span> such as iron, aluminium, or lime. When oxygen is present, phosphorus stays bound; but if oxygen is missing, it can be released again back into the water.'
    },
    {
      id: 'area-2',
      x: 43,
      y: 64,
      width: 20,
      height: 18,
      text: '<span style="color: #CE7C0A;">Algae, aquatic plants, and biofilms take up phosphorus</span> and use it for growth. This retention is temporary — when the organisms die or decay, the phosphorus is released to the water.'
    },
  {
    id: 'area-3',
    x: 54,
    y: 73,
    width: 15,
    height: 20,
    text: 'Phosphorus attached to soil and organic particles sinks down to the riverbed. This happens mainly in calm areas or where the flow is slow — forming a temporary "phosphorus storage" in the sediment.'
  }
];

// Hover areas for the nutrients image 6
const nutrientsHoverAreas6 = [
  {
    id: 'area-1',
    x: 66.5,
    y: 66,
    width: 18,
    height: 15,
    text: 'When floodwaters spread across the land, they slow down and drop suspended particles rich in phosphorus. This is one of the most effective ways floodplains trap and store phosphorus.'
  },
  {
    id: 'area-2',
    x: 63,
    y: 71,
    width: 20,
    height: 18,
    text: 'Floodplain plants absorb phosphorus as they grow, storing it in leaves and roots. This retention is temporary, but some phosphorus stays longer in litter and humus after plants die.'
  },
  {
    id: 'area-3',
    x: 63.5,
    y: 76,
    width: 15,
    height: 20,
    text: 'Dissolved phosphorus binds to iron, aluminium, or calcium compounds in the soil. This keeps phosphorus locked away — unless oxygen runs out, when it can be released again.'
  }
];

export const SelfPurificationPage: React.FC<SelfPurificationPageProps> = ({
  onHomeClick,
  onAestheticsClick,
  onRepositoryClick
}) => {
  const [currentPage, setCurrentPage] = React.useState(0); // Start with intro page
  const [hoveredArea, setHoveredArea] = React.useState<string | null>(null);
  const [showQuizModal, setShowQuizModal] = React.useState(false);
  const [showDownloadModal, setShowDownloadModal] = React.useState(false);
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

  const handleAreaHover = (areaId: string) => {
    setHoveredArea(areaId);
  };

  const handleAreaLeave = () => {
    setHoveredArea(null);
  };

  const toggleQuizModal = () => {
    setShowQuizModal(!showQuizModal);
  };

  // Download modal handlers
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink = () => {
    window.open('https://doi.org/10.5281/zenodo.17474270', '_blank');
    setShowDownloadModal(false);
  };

  const handleDashboardLink = () => {
    setShowDownloadModal(false);
    // TODO: Navigate to repository
  };

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5' }}>
      
      {/* Header with title and home button */}
      <div className="relative z-50">
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            {/* Header with Title */}
            <div className="relative">
              {/* Title and Subtitle - Centered */}
              <div className="text-center">
                {/* Title */}
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  Self purification function
                </motion.h1>
                
                {/* Subtitle - Only show when not on intro page */}
                {currentPage > 0 && (
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    fontSize: '36px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46',
                    margin: '0'
                  }}
                >
                  {currentPage === 1 ? 'Nitrogen input into rivers' :
                   currentPage === 2 ? 'Retention of nitrogen by rivers' :
                   currentPage === 3 ? 'Additional retention of nitrogen by floodplains' :
                   currentPage === 4 ? 'Phosphorous input into rivers' :
                   currentPage === 5 ? 'Retention of phosphorous by rivers' :
                     'Additional retention of phosphorous by floodplains'}
                </motion.h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-4 pb-8" style={{ paddingBottom: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {/* Page Content */}
          {currentPage === 0 ? (
            // Intro Page: Introduction with landing.png, description, and CTA button
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Single Illustration - Centered */}
              <div className="flex justify-center mb-8" style={{ width: '100%', maxWidth: '600px' }}>
                <div style={{ width: '100%', maxWidth: '600px' }}>
                  <img 
                    src="/assets/components/nutrients/landing.png"
                    alt="Self purification function"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </div>
              </div>

              {/* Descriptive Text */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                marginBottom: '40px',
                maxWidth: '1200px',
                lineHeight: '1.6'
              }}>
                Learn about self purification functions and discover how rivers and floodplains naturally filter and clean water.
              </div>

              {/* Call-to-Action Button */}
              <button
                className="learn-test-button"
                onClick={() => setCurrentPage(1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '40px',
                  padding: 0
                }}
              >
                <img 
                  src="/assets/icons/learnandtest.png"
                  alt="Learn and test your knowledge"
                  style={{ 
                    height: 'auto',
                    maxWidth: '500px',
                    width: 'auto'
                  }}
                />
              </button>

              {/* Download Section */}
              <div className="flex justify-center" style={{ width: '100%', maxWidth: '1400px', paddingTop: '20px', position: 'relative', marginBottom: '20px', minHeight: '180px' }}>
                {/* Left Download Section */}
                <div className="flex items-center" style={{ gap: '32px', position: 'absolute', right: 'calc(50% + 50px)', alignItems: 'center' }}>
                  {/* Icon - Transparent background */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img 
                      src="/assets/icons/edumaterial.png"
                      alt="Access Teaching Materials"
                      style={{ width: '150px', height: '110px' }}
                    />
                  </div>
                  {/* Text and Button - Left aligned */}
                  <div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      marginBottom: '6px'
                    }}>
                      Access Teaching Materials
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a
                        href="https://doi.org/10.5281/zenodo.17474270"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: '#51727C',
                          padding: '12px 32px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                      >
                        Open platform
                      </a>
                    </div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '14px',
                      color: '#406A46',
                      fontStyle: 'italic'
                    }}>
                      Opens new tab: Zenodo
                    </div>
                  </div>
                </div>

                {/* Right Download Section */}
                <div className="flex items-center" style={{ gap: '32px', position: 'absolute', left: 'calc(50% + 50px)', alignItems: 'center' }}>
                  {/* Icon - Transparent background */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img 
                      src="/assets/icons/edurepo.png"
                      alt="Explore Wet-Edu Repository"
                      style={{ width: '120px', height: '120px' }}
                    />
                  </div>
                  {/* Text and Button - Left aligned */}
                  <div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      marginBottom: '6px'
                    }}>
                      Explore Wet-Edu Repository
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <button
                        onClick={() => onRepositoryClick && onRepositoryClick()}
                        style={{
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: '#51727C',
                          padding: '12px 32px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* EU Disclaimer - Centered at bottom of intro page */}
              <div style={{
                width: '100%',
                textAlign: 'center',
              }}>
                <img 
                  src="/assets/icons/EU.png"
                  alt="EU Disclaimer"
                  style={{
                    height: '96px',
                    width: 'auto',
                    opacity: 0.7
                  }}
                />
              </div>
            </div>
          ) : currentPage === 1 ? (
            <>
              {/* Page 1 Content - Nutrients Image with Hover Areas */}
              <div className="flex justify-center items-start">
                <div className="relative" style={{ width: '100%', maxWidth: '1600px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/nutrients/image1.png"
                    alt="Nutrients in wetlands"
                    className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      opacity: 1,
                      display: 'block'
                    }}
                  />
                  
                  {/* Hover Areas for Nutrients Image 1 */}
                  {nutrientsHoverAreas1.map((area) => (
                    <div
                      key={area.id}
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        left: `${area.x}%`,
                        top: `${area.y}%`,
                        width: `${area.width}%`,
                        height: `${area.height}%`,
                        backgroundColor: hoveredArea === area.id ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                        borderRadius: '8px',
                        border: 'none'
                      }}
                      onMouseEnter={() => handleAreaHover(area.id)}
                      onMouseLeave={handleAreaLeave}
                    >
                      {/* Info Icon - Hidden when hovering */}
                      <img 
                        src="/assets/icons/info.png" 
                        alt="Info" 
                        style={{ 
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: hoveredArea === area.id ? 0 : 1
                        }} 
                      />
                      
                      {/* Text overlay when hovered */}
                      {hoveredArea === area.id && (
                        <div 
                          className="absolute bg-white rounded-lg shadow-lg font-medium text-gray-800 leading-tight flex items-center justify-center text-center"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            zIndex: 20,
                            fontSize: '14px',
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#406A46',
                            lineHeight: '1.2',
                            padding: '15px 20px',
                            overflow: 'hidden',
                            wordWrap: 'break-word'
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: area.text }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : currentPage === 2 ? (
            <>
              {/* Page 2 Content - Nutrients Image 2 with Hover Areas */}
              <div className="flex justify-center items-start">
                <div className="relative" style={{ width: '100%', maxWidth: '1600px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/nutrients/image2.png"
                    alt="Nutrients in wetlands"
                    className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      opacity: 1,
                      display: 'block'
                    }}
                  />
                  
                  {/* Quiz Icon */}
                  <div
                    className="absolute cursor-pointer transition-all duration-300 hover:opacity-80"
                    style={{
                      left: '42%',
                      top: '80%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 15
                    }}
                    onClick={toggleQuizModal}
                  >
                    <img 
                      src="/assets/icons/quiz.png" 
                      alt="Quiz" 
                      style={{ 
                        width: '25px',
                        height: '34px',
                        opacity: 1
                      }} 
                    />
                  </div>

                  {/* Hover Areas for Nutrients Image 2 */}
                  {nutrientsHoverAreas2.map((area) => (
                    <div
                      key={area.id}
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        left: `${area.x}%`,
                        top: `${area.y}%`,
                        width: `${area.width}%`,
                        height: `${area.height}%`,
                        backgroundColor: hoveredArea === area.id ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                        borderRadius: '8px',
                        border: 'none'
                      }}
                      onMouseEnter={() => handleAreaHover(area.id)}
                      onMouseLeave={handleAreaLeave}
                    >
                      {/* Info Icon - Hidden when hovering */}
                      <img 
                        src="/assets/icons/info.png" 
                        alt="Info" 
                        style={{ 
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: hoveredArea === area.id ? 0 : 1
                        }} 
                      />
                      
                      {/* Text overlay when hovered */}
                      {hoveredArea === area.id && (
                        <div 
                          className="absolute bg-white rounded-lg shadow-lg font-medium text-gray-800 leading-tight flex items-center justify-center text-center"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            zIndex: 20,
                            fontSize: '14px',
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#406A46',
                            lineHeight: '1.2',
                            padding: '15px 20px',
                            overflow: 'hidden',
                            wordWrap: 'break-word'
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: area.text }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quiz Modal - Only on Page 2 */}
                {showQuizModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={toggleQuizModal}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white mx-4 max-h-[80vh] overflow-y-auto relative"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        width: '60%',
                        borderRadius: '20px',
                        padding: '20px'
                      }}
                    >
                      {/* Close Button */}
                      <button
                        onClick={toggleQuizModal}
                        style={{
                          position: 'absolute',
                          top: '20px',
                          right: '20px',
                          fontSize: '36px',
                          fontFamily: 'Comfortaa, sans-serif',
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 10,
                          color: '#6B7280'
                        }}
                      >
                        ×
                      </button>
                      
                      {/* Content */}
                      <div>
                        <h3 
                          className="font-bold mb-6"
                          style={{ 
                            fontSize: '36px', 
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#51727C',
                            textAlign: 'center'
                          }}
                        >
                          Do you know how much nitrogen remove rivers?
                        </h3>
                        <div 
                          style={{ 
                            fontSize: '20px', 
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#51727C',
                            lineHeight: '1.6',
                            textAlign: 'left'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: `
                              <p style="margin-bottom: 16px;">
                                <span style="color: #619F6A;">Every year, rivers in floodplain areas naturally retain around 25,000 tonnes of nitrogen (about 5% of total emissions)</span> — the same amount of nitrogen that roughly 5.5 million people would excrete in a year! That's roughly the population of Slovakia.
                              </p>
                              <p style="margin-bottom: 16px;">
                                <span style="color: #619F6A;">Across the entire Danube Basin, rivers remove even more: about 30%</span> of the nitrogen entering the river system is retained during in-stream transport, mainly through <span style="color: #619F6A;">denitrification</span>.
                              </p>
                              <p style="margin: 0;">
                                <span style="color: #619F6A;">This shows how much cleaning power rivers have, even before the water reaches floodplains.</span>
                              </p>
                            `
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </>
          ) : currentPage === 3 ? (
            <>
              {/* Page 3 Content - Nutrients Image 3 with Hover Areas */}
              <div className="flex justify-center items-start">
                <div className="relative" style={{ width: '100%', maxWidth: '1600px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/nutrients/image3.png"
                    alt="Additional nitrogen retention by floodplains"
                    className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      opacity: 1,
                      display: 'block'
                    }}
                  />
                  
                  {/* Quiz Icon */}
                  <div
                    className="absolute cursor-pointer transition-all duration-300 hover:opacity-80"
                    style={{
                      left: '41%',
                      top: '83%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 15
                    }}
                    onClick={toggleQuizModal}
                  >
                    <img 
                      src="/assets/icons/quiz.png" 
                      alt="Quiz" 
                      style={{ 
                        width: '25px',
                        height: '34px',
                        opacity: 1
                      }} 
                    />
                  </div>

                  {/* Hover Areas for Nutrients Image 3 */}
                  {nutrientsHoverAreas3.map((area) => (
                    <div
                      key={area.id}
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        left: `${area.x}%`,
                        top: `${area.y}%`,
                        width: `${area.width}%`,
                        height: `${area.height}%`,
                        backgroundColor: hoveredArea === area.id ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                        borderRadius: '8px',
                        border: 'none'
                      }}
                      onMouseEnter={() => handleAreaHover(area.id)}
                      onMouseLeave={handleAreaLeave}
                    >
                      {/* Info Icon - Hidden when hovering */}
                      <img 
                        src="/assets/icons/info.png" 
                        alt="Info" 
                        style={{ 
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: hoveredArea === area.id ? 0 : 1
                        }} 
                      />
                      
                      {/* Text overlay when hovered */}
                      {hoveredArea === area.id && (
                        <div 
                          className="absolute bg-white rounded-lg shadow-lg font-medium text-gray-800 leading-tight flex items-center justify-center text-center"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            zIndex: 20,
                            fontSize: '14px',
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#406A46',
                            lineHeight: '1.2',
                            padding: '15px 20px',
                            overflow: 'hidden',
                            wordWrap: 'break-word'
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: area.text }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quiz Modal - Only on Page 3 */}
                {showQuizModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={toggleQuizModal}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white mx-4 max-h-[80vh] overflow-y-auto relative"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        width: '60%',
                        borderRadius: '20px',
                        padding: '20px'
                      }}
                    >
                      {/* Close Button */}
                      <button
                        onClick={toggleQuizModal}
                        style={{
                          position: 'absolute',
                          top: '20px',
                          right: '20px',
                          fontSize: '36px',
                          fontFamily: 'Comfortaa, sans-serif',
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 10,
                          color: '#6B7280'
                        }}
                      >
                        ×
                      </button>
                      
                      {/* Content */}
                      <div>
                        <h3 
                          className="font-bold mb-6"
                          style={{ 
                            fontSize: '36px', 
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#51727C',
                            textAlign: 'center'
                          }}
                        >
                          Do you know how much nitrogen remove the Danube floodplains?
                        </h3>
                        <div 
                          style={{ 
                            fontSize: '20px', 
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#51727C',
                            lineHeight: '1.6',
                            textAlign: 'left'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: `
                              <p style="margin: 0;">
                                The <span style="color: #619F6A;">remaining active floodplains</span> of the Danube Basin provide an extra cleaning step, retaining around <span style="color: #619F6A;">7,700 tonnes of nitrogen per year</span> — about as much as <span style="color: #619F6A;">1.6 million people</span> (the population of Belgrade) would excrete in a year.
                              </p>
                            `
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </>
          ) : currentPage === 4 ? (
            <>
              {/* Page 4 Content - Nutrients Image 4 with Hover Areas */}
              <div className="flex justify-center items-start">
                <div className="relative" style={{ width: '100%', maxWidth: '1600px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/nutrients/image4.png"
                    alt="Nitrogen sources and processing in floodplains"
                    className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      opacity: 1,
                      display: 'block'
                    }}
                  />

                  {/* Hover Areas for Nutrients Image 4 */}
                  {nutrientsHoverAreas4.map((area) => (
                    <div
                      key={area.id}
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        left: `${area.x}%`,
                        top: `${area.y}%`,
                        width: `${area.width}%`,
                        height: `${area.height}%`,
                        backgroundColor: hoveredArea === area.id ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                        borderRadius: '8px',
                        border: 'none'
                      }}
                      onMouseEnter={() => handleAreaHover(area.id)}
                      onMouseLeave={handleAreaLeave}
                    >
                      {/* Info Icon - Hidden when hovering */}
                      <img 
                        src="/assets/icons/info.png" 
                        alt="Info" 
                        style={{ 
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: hoveredArea === area.id ? 0 : 1
                        }} 
                      />
                      
                      {/* Text overlay when hovered */}
                      {hoveredArea === area.id && (
                        <div 
                          className="absolute bg-white rounded-lg shadow-lg font-medium text-gray-800 leading-tight flex items-center justify-center text-center"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            zIndex: 20,
                            fontSize: '14px',
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#406A46',
                            lineHeight: '1.2',
                            padding: '15px 20px',
                            overflow: 'hidden',
                            wordWrap: 'break-word'
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: area.text }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : currentPage === 5 ? (
            <>
              {/* Page 5 Content - Nutrients Image 5 with Hover Areas */}
              <div className="flex justify-center items-start">
                <div className="relative" style={{ width: '100%', maxWidth: '1600px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/nutrients/image5.png"
                    alt="Retention of phosphorous by rivers"
                    className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      opacity: 1,
                      display: 'block'
                    }}
                  />

                  {/* Hover Areas for Nutrients Image 5 */}
                  {nutrientsHoverAreas5.map((area) => (
                    <div
                      key={area.id}
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        left: `${area.x}%`,
                        top: `${area.y}%`,
                        width: `${area.width}%`,
                        height: `${area.height}%`,
                        backgroundColor: hoveredArea === area.id ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                        borderRadius: '8px',
                        border: 'none'
                      }}
                      onMouseEnter={() => handleAreaHover(area.id)}
                      onMouseLeave={handleAreaLeave}
                    >
                      {/* Info Icon - Hidden when hovering */}
                      <img 
                        src="/assets/icons/info.png" 
                        alt="Info" 
                        style={{ 
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: hoveredArea === area.id ? 0 : 1
                        }} 
                      />
                      
                      {/* Text overlay when hovered */}
                      {hoveredArea === area.id && (
                        <div 
                          className="absolute bg-white rounded-lg shadow-lg font-medium text-gray-800 leading-tight flex items-center justify-center text-center"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            zIndex: 20,
                            fontSize: '14px',
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#406A46',
                            lineHeight: '1.2',
                            padding: '15px 20px',
                            overflow: 'hidden',
                            wordWrap: 'break-word'
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: area.text }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : currentPage === 6 ? (
            <>
              {/* Page 6 Content - Nutrients Image 6 with Hover Areas and Quiz */}
              <div className="flex justify-center items-start">
                <div className="relative" style={{ width: '100%', maxWidth: '1600px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/nutrients/image6.png"
                    alt="Additional retention of phosphorous by floodplains"
                    className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      opacity: 1,
                      display: 'block'
                    }}
                  />
                  
                  {/* Quiz Icon */}
                  <div
                    className="absolute cursor-pointer transition-all duration-300 hover:opacity-80"
                    style={{
                      left: '42%',
                      top: '74%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 15
                    }}
                    onClick={toggleQuizModal}
                  >
                    <img 
                      src="/assets/icons/quiz.png" 
                      alt="Quiz" 
                      style={{ 
                        width: '25px',
                        height: '34px',
                        opacity: 1
                      }} 
                    />
                  </div>

                  {/* Hover Areas for Nutrients Image 6 */}
                  {nutrientsHoverAreas6.map((area) => (
                    <div
                      key={area.id}
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        left: `${area.x}%`,
                        top: `${area.y}%`,
                        width: `${area.width}%`,
                        height: `${area.height}%`,
                        backgroundColor: hoveredArea === area.id ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                        borderRadius: '8px',
                        border: 'none'
                      }}
                      onMouseEnter={() => handleAreaHover(area.id)}
                      onMouseLeave={handleAreaLeave}
                    >
                      {/* Info Icon - Hidden when hovering */}
                      <img 
                        src="/assets/icons/info.png" 
                        alt="Info" 
                        style={{ 
                          width: '20px',
                          height: '20px',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: hoveredArea === area.id ? 0 : 1
                        }} 
                      />
                      
                      {/* Text overlay when hovered */}
                      {hoveredArea === area.id && (
                        <div 
                          className="absolute bg-white rounded-lg shadow-lg font-medium text-gray-800 leading-tight flex items-center justify-center text-center"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            zIndex: 20,
                            fontSize: '14px',
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#406A46',
                            lineHeight: '1.2',
                            padding: '15px 20px',
                            overflow: 'hidden',
                            wordWrap: 'break-word'
                          }}
                        >
                          <span dangerouslySetInnerHTML={{ __html: area.text }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quiz Modal - Only on Page 6 */}
                {showQuizModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={toggleQuizModal}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white mx-4 max-h-[80vh] overflow-y-auto relative"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        width: '40%',
                        borderRadius: '20px',
                        padding: '40px'
                      }}
                    >
                      {/* Close Button */}
                      <button
                        onClick={toggleQuizModal}
                        style={{
                          position: 'absolute',
                          top: '20px',
                          right: '20px',
                          fontSize: '36px',
                          fontFamily: 'Comfortaa, sans-serif',
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 10,
                          color: '#6B7280'
                        }}
                      >
                        ×
                      </button>
                      
                      {/* Content */}
                      <div>
                        <div 
                          style={{ 
                            fontSize: '20px', 
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: '#51727C',
                            lineHeight: '1.6',
                            textAlign: 'left'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: `
                              <p style="margin: 0;">
                                About <span style="color: #619F6A;">40% of phosphorus</span> released into the Danube Basin never reaches the river mouth — it settles and is trapped in <span style="color: #619F6A;">reservoirs and floodplains</span> along the way.
                              </p>
                            `
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </>
          ) : null}
        </motion.div>
      </div>

      {/* Pagination and Next Button - Sticky Footer - Only show when not on intro page */}
      {currentPage > 0 && (
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
            <HomeButton onClick={onHomeClick} />
          </div>

          {/* Pagination / Completion Footer - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center items-center"
            style={{ gap: '14px', position: 'relative' }}
          >
            {currentPage === TOTAL_PAGES ? (
              <div className="flex items-center justify-center" style={{ position: 'relative' }}>
                {/* Download Button - 50px left of pagination */}
                <button
                  onClick={handleDownloadClick}
                  className="download-button relative flex items-center justify-center z-50"
                  style={{
                    width: '480px',
                    height: '50px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    marginRight: '50px',
                    cursor: 'pointer'
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

                {/* Pagination Dots */}
                <div className="flex justify-center items-center" style={{ gap: '14px', position: 'relative' }}>
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

                {/* NEXT TOPIC Text - 50px right of pagination */}
                <div style={{ marginLeft: '50px' }}>
                  <span style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: '#406A46'
                  }}>
                    NEXT TOPIC: Floodplains aesthetics
                  </span>
                </div>
              </div>
            ) : (
              Array.from({ length: TOTAL_PAGES }, (_, index) => {
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
              })
            )}
          </motion.div>

          {/* Next Button - Right */}
          <div className="flex items-center">
            {currentPage < TOTAL_PAGES ? (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="next-button relative flex items-center justify-center z-50"
                style={{ width: '158px', height: '60px', backgroundColor: 'transparent', border: 'none' }}
              >
                <img src="/assets/icons/next.png" alt="Next" style={{ width: '158px', height: '60px', opacity: 1 }} />
              </button>
            ) : (
              <button
                onClick={onAestheticsClick}
                className="next-button relative flex items-center justify-center z-50"
                style={{ width: '158px', height: '60px', backgroundColor: 'transparent', border: 'none' }}
              >
                <img src="/assets/icons/next.png" alt="NEXT TOPIC: Floodplains aesthetics" style={{ width: '158px', height: '60px', opacity: 1 }} />
              </button>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={handleCloseModal}
        >
          <div 
            style={{
              backgroundColor: '#dfebf5',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '600px',
              width: '90%',
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '32px',
                cursor: 'pointer',
                color: '#406A46',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>

            {/* Modal Title */}
            <div style={{
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#406A46',
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              Download Options
            </div>

            {/* Option 1: Zenodo */}
            <button
              onClick={handleZenodoLink}
              style={{
                width: '100%',
                backgroundColor: '#97C09D',
                border: 'none',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7FAF85';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#97C09D';
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/assets/icons/protocols.png" 
                  alt="Protocols" 
                  style={{ 
                    width: '70px',
                    height: '90px'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  Access Teaching Materials
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '6px'
                }}>
                  Based on 5E learning method and scientific research
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  (Opens in new tab: Zenodo)
                </div>
              </div>
            </button>

            {/* Option 2: Dashboard */}
            <button
              onClick={handleDashboardLink}
              style={{
                width: '100%',
                backgroundColor: '#CE7C0A',
                border: 'none',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B86A08';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#CE7C0A';
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/assets/icons/edurepo.png" 
                  alt="Explore Wet-Edu Repository" 
                  style={{ 
                    width: '50px',
                    height: '50px'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  Explore Wet-Edu Repository
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  Explore related projects and resources
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
