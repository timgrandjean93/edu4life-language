import React from 'react';
import { motion } from 'framer-motion';
import { usePageRouting } from '../../hooks/usePageRouting';
import { HomeButton } from '../HomeButton';

interface FloodControlPageProps {
  onHomeClick: () => void;
  onCarbonClick?: () => void;
  onRepositoryClick?: () => void;
}

// Hover areas for the images
const leftImageHoverAreas = [
  {
    id: 'willows-banks',
    x: 60,
    y: 20,
    width: 30,
    height: 25,
    text: 'Willows stabilize banks and increase soil porosity through extensive root systems.'
  },
  {
    id: 'reed-vegetation',
    x: 60,
    y: 50,
    width: 35,
    height: 20,
    text: 'Dense reed vegetation slows water flow, traps sediments, and improves water quality.'
  },
  {
    id: 'native-grasses',
    x: 70,
    y: 80,
    width: 30,
    height: 20,
    text: 'Native grasses improve soil porosity and water infiltration'
  },
  {
    id: 'leaf-litter',
    x: 10,
    y: 80,
    width: 40,
    height: 15,
    text: 'Leaf litter on the forest floor retains moisture and reduces surface runoff.'
  },
  {
    id: 'deep-rooted-trees',
    x: 10,
    y: 60,
    width: 30,
    height: 20,
    text: 'Deep-rooted trees and shrubs offer stronger bank stabilization than shallow-rooted grasses.'
  }
];

const rightImageHoverAreas = [
  {
    id: 'natural-filtration',
    x: 20,
    y: 35,
    width: 60,
    height: 15,
    text: "The river is confined by dikes like a tight corset.  It can't spread out or reach the floodplain, so floodwaters rise quickly"
  },
  {
    id: 'ecosystem-benefits',
    x: 20,
    y: 60,
    width: 30,
    height: 25,
    text: 'Without riverside plants, there’s nothing to slow down runoff or absorb water. The soil becomes cracked and compacted—water can’t soak in.'
  },
  {
    id: 'groundwater-recharge',
    x: 60,
    y: 60,
    width: 35,
    height: 20,
    text: 'Without plants along the banks, runoff flows faster, more sediments and nutrients enter the river, and water quality declines'
  }
];

// Did you know content - Left image (Natural floodplain)
const didYouKnowContentLeft = {
  title: "Did you know?",
  items: [
    "Floodplain soils store 3,000-4,000 m³ of water per hectare",
    "Meanders increase retention time by 30-50%",
    "Floodplain vegetation stores 30-40% of total retention capacity",
    "Natural floodplain absorbs floodwater for 20-30 days",
    "Groundwater recharge: 500-1,000 m³ per hectare per year"
  ]
};

// Did you know content - Right image (Degraded floodplain)
const didYouKnowContentRight = {
  title: "Did you know?",
  items: [
    "Channelization reduces retention by: 60-80%",
    "Loss of vegetation decreases capacity by: 40-50%",
    "Soil compaction reduces storage by: 30-40%",
    "Degraded floodplain retains only: 1,000-2,000 m³ per hectare"
  ]
};

const TOTAL_PAGES = 3;

// Page 2 drop zones and descriptions
const leftImageDropZones = [
  { id: 'left-1', x: 45, y: 47, correctNumber: 3 },
  { id: 'left-2', x: 50, y: 30, correctNumber: 1 },
  { id: 'left-3', x: 80, y: 70, correctNumber: 2 }
];

const rightImageDropZones = [
  { id: 'right-1', x: 30, y: 20, correctNumber: 1 },
  { id: 'right-2', x: 25, y: 70, correctNumber: 2 },
  { id: 'right-3', x: 70, y: 65, correctNumber: 3 }
];

const leftDescriptions = [
  "A meandering river flows in gentle curves, spreading water across the floodplain, slowing flow, and nourishing the land.",
  "Plants along riverbanks slow runoff, trap sediments, and absorb excess nutrients, helping to keep the water clean.",
  "Floodplain lakes and oxbows store excess floodwater, support rich biodiversity, and help recharge groundwater"
];

const rightDescriptions = [
  "In heavy rain, floods can build up, break dikes, and threaten nearby villages.",
  "In a straightened, channelized river, water flows too fast downstream.",
  "Without riverside plants, there's nothing to slow down runoff or absorb water."
];

export const FloodControlPage: React.FC<FloodControlPageProps> = ({
  onHomeClick,
  onCarbonClick,
  onRepositoryClick
}) => {
  const [currentPage, setCurrentPage] = usePageRouting(TOTAL_PAGES);
  const [hoveredArea, setHoveredArea] = React.useState<string | null>(null);
  const [showDidYouKnowLeft, setShowDidYouKnowLeft] = React.useState(false);
  const [showDidYouKnowRight, setShowDidYouKnowRight] = React.useState(false);
  
  // Refs for image containers to measure width
  const leftImageRef = React.useRef<HTMLDivElement>(null);
  const rightImageRef = React.useRef<HTMLDivElement>(null);
  const [leftContainerWidth, setLeftContainerWidth] = React.useState(800);
  const [rightContainerWidth, setRightContainerWidth] = React.useState(800);
  
  // Function to calculate font size based on container width, text length, and area width
  const getFontSize = (containerWidth: number, textLength: number, areaWidthPercent: number) => {
    // Calculate available width for text (area width percentage of container width)
    // Subtract padding (16px total: 8px on each side)
    const availableWidth = (containerWidth * areaWidthPercent) / 100 - 16;
    
    // Base font size - start with a larger size (closer to original clamp max of 18px)
    const baseFontSize = 18;
    const minFontSize = 12; // Original clamp min was 12px
    const maxFontSize = 18; // Original clamp max was 18px
    
    // Estimate how much width the text needs
    // For Comfortaa font, each character is roughly 0.6-0.7 times the font size
    // We use 0.6 as a conservative estimate
    const charWidthRatio = 0.6;
    const estimatedTextWidth = textLength * charWidthRatio * baseFontSize;
    
    // Calculate scale factor to fit text in available width
    // Use 0.85 margin to ensure text fits comfortably but not too small
    const scaleFactor = Math.min(1, (availableWidth / estimatedTextWidth) * 0.85);
    
    // Calculate final font size
    const fontSize = baseFontSize * scaleFactor;
    
    // Clamp between min and max - but prefer larger sizes when possible
    // If the text fits easily, use a larger font size
    if (estimatedTextWidth < availableWidth * 0.7) {
      // Text fits easily, use larger font (closer to max)
      return Math.max(minFontSize, Math.min(maxFontSize, Math.max(fontSize, baseFontSize * 0.9)));
    }
    
    return Math.max(minFontSize, Math.min(maxFontSize, fontSize));
  };
  
  // Function to calculate padding based on container width
  const getPadding = (containerWidth: number) => {
    const baseWidth = 1600;
    const basePadding = 15;
    const minPadding = 6;
    const maxPadding = 15;
    
    const padding = (containerWidth / baseWidth) * basePadding;
    const paddingValue = Math.max(minPadding, Math.min(maxPadding, padding));
    return `${paddingValue}px ${Math.max(8, Math.min(20, paddingValue * 1.3))}px`;
  };
  
  // Page 2 state
  const [draggedNumber, setDraggedNumber] = React.useState<number | null>(null);
  const [placements, setPlacements] = React.useState<Record<string, number>>({});
  const [page2Submitted, setPage2Submitted] = React.useState(false);
  const [showPage2Feedback, setShowPage2Feedback] = React.useState(false);

  // Page 3 state
  const [answer1, setAnswer1] = React.useState('');
  const [answer2, setAnswer2] = React.useState('');
  const [page3Submitted, setPage3Submitted] = React.useState(false);
  const [showPage3Feedback, setShowPage3Feedback] = React.useState(false);
  const [showDownloadModal, setShowDownloadModal] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // Track window width for responsive navbar
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate if there's enough space for download and next topic buttons
  const hasEnoughSpace = windowWidth >= 1400;

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

  // Update container widths on resize
  React.useEffect(() => {
    const updateWidths = () => {
      if (leftImageRef.current) {
        const rect = leftImageRef.current.getBoundingClientRect();
        setLeftContainerWidth(rect.width);
      }
      if (rightImageRef.current) {
        const rect = rightImageRef.current.getBoundingClientRect();
        setRightContainerWidth(rect.width);
      }
    };
    
    // Initial update
    const timer = setTimeout(updateWidths, 100);
    
    // Update on resize
    window.addEventListener('resize', updateWidths);
    
    // Also update when images load
    window.addEventListener('load', updateWidths);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidths);
      window.removeEventListener('load', updateWidths);
    };
  }, [currentPage]);

  // Auto-submit page 2 when all zones are filled
  React.useEffect(() => {
    if (currentPage === 2 && !page2Submitted) {
      const totalZones = leftImageDropZones.length + rightImageDropZones.length;
      const allZonesFilled = Object.keys(placements).length === totalZones;
      if (allZonesFilled) {
        // Small delay to allow the last drop animation to complete
        setTimeout(() => {
          handleSubmitPage2();
        }, 300);
      }
    }
  }, [placements, currentPage, page2Submitted]);

  const handleAreaHover = (areaId: string) => {
    setHoveredArea(areaId);
  };

  const handleAreaLeave = () => {
    setHoveredArea(null);
  };

  const toggleDidYouKnowLeft = () => {
    setShowDidYouKnowLeft(!showDidYouKnowLeft);
  };

  const toggleDidYouKnowRight = () => {
    setShowDidYouKnowRight(!showDidYouKnowRight);
  };

  // Page 2 drag-and-drop handlers
  const handleDragStart = (number: number) => {
    setDraggedNumber(number);
  };

  const handleDragEnd = () => {
    setDraggedNumber(null);
  };

  const handleDrop = (zoneId: string) => {
    if (page2Submitted || !draggedNumber) return;
    
    setPlacements(prev => ({
      ...prev,
      [zoneId]: draggedNumber
    }));
    setDraggedNumber(null);
  };

  // Helper function to find zone ID by correct number and image side
  const findZoneIdByCorrectNumber = (correctNumber: number, imageSide: 'left' | 'right') => {
    const zones = imageSide === 'left' ? leftImageDropZones : rightImageDropZones;
    const zone = zones.find(z => z.correctNumber === correctNumber);
    return zone?.id || null;
  };

  // Check if a number has been placed anywhere (currently unused but kept for potential future use)
  // const isNumberPlaced = (number: number) => {
  //   return Object.values(placements).includes(number);
  // };

  // Handle drop on extra corner zones - automatically assign to correct zone
  const handleCornerDrop = (correctNumber: number, imageSide: 'left' | 'right') => {
    if (page2Submitted || !draggedNumber) return;
    
    const zoneId = findZoneIdByCorrectNumber(correctNumber, imageSide);
    if (zoneId) {
      handleDrop(zoneId);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmitPage2 = () => {
    setPage2Submitted(true);
    setShowPage2Feedback(true);
  };

  const handleSubmitPage3 = () => {
    // Auto-correct shortened answers to full words
    const ans1 = answer1.toLowerCase().trim();
    const ans2 = answer2.toLowerCase().trim();
    
    if (ans1 === 'pong') {
      setAnswer1('sponge');
    }
    if (ans2 === 'loodin') {
      setAnswer2('flooding');
    }
    
    setPage3Submitted(true);
    setShowPage3Feedback(true);
  };

  // Download modal handlers
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink = () => {
    window.open('https://doi.org/10.5281/zenodo.17472525', '_blank');
    setShowDownloadModal(false);
  };

  const handleDashboardLink = () => {
    setShowDownloadModal(false);
    // TODO: Navigate to repository
  };

  const isAnswer1Correct = () => {
    const ans = answer1.toLowerCase().trim();
    return ans === 'sponge' || ans === 'pong';
  };
  const isAnswer2Correct = () => {
    const ans = answer2.toLowerCase().trim();
    return ans === 'flooding' || ans === 'loodin';
  };

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', overflowX: 'visible', paddingBottom: '0px' }}>
      
      {/* Header with title and home button */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
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
                  {currentPage === 0 ? 'Floodplains are like a sponge' : 
                   'Flood control function – Floodplains like a sponge'}
                </motion.h1>
                
                {/* Subtitle */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-4 pb-8" style={{ paddingBottom: '10px', flex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {currentPage === 0 ? (
            // Intro Page: Introduction with two illustrations (image1 and image2), description, and CTA button
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Two Illustrations Side by Side - Smaller */}
              <div className="flex gap-8 justify-center mb-8" style={{ width: '100%', maxWidth: '1000px' }}>
                {/* Left Illustration - Image 1 */}
                <div style={{ flex: 1, maxWidth: '480px' }}>
                  <img 
                    src="/assets/components/Sponge/image1.png"
                    alt="Natural floodplain"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </div>
                {/* Right Illustration - Image 2 */}
                <div style={{ flex: 1, maxWidth: '480px' }}>
                  <img 
                    src="/assets/components/Sponge/image2.png"
                    alt="Degraded floodplain"
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
                Learn about flood control functions and discover how floodplains act as natural sponges that absorb and store water.
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
                        href="https://doi.org/10.5281/zenodo.17472525"
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
            </div>
          ) : currentPage === 1 ? (
            <>
              {/* Page 1 Content */}
              {/* Pointer Icon */}
              <div className="text-center mx-auto mb-4">
                <img 
                  src="/assets/icons/pointer.png" 
                  alt="Pointer" 
                  style={{ 
                    width: '54px', 
                    height: '54px',
                    backgroundColor: 'transparent',
                    margin: '0 auto'
                  }} 
                />
              </div>
              
              {/* Instruction Text */}
              <div className="text-center mb-8">
                <p style={{ 
                  fontSize: '24px',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  color: '#406A46',
                  lineHeight: '1.5'
                }}>
                  Hover over different areas of the images to reveal useful facts.
                </p>
              </div>

              {/* Images with Hover Areas */}
          <div className="flex justify-center items-start gap-8">
            {/* Left Image */}
            <div ref={leftImageRef} className="relative" style={{ width: '45%', maxWidth: '800px', display: 'inline-block' }}>
              <img 
                src="/assets/components/Sponge/image1.png"
                alt="Floodplain sponge function"
                className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                style={{ 
                  backgroundColor: 'transparent',
                  opacity: showDidYouKnowLeft ? 0.3 : 1,
                  display: 'block'
                }}
              />
              
              {/* Did you know Modal - Over Left Image */}
              {showDidYouKnowLeft && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute flex items-center justify-center z-30"
                  style={{ 
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '40px'
                  }}
                >
                  <div 
                    className="bg-white shadow-2xl w-full relative"
                    style={{ 
                      borderRadius: '24px',
                      padding: '40px',
                      maxHeight: '100%',
                      overflowY: 'auto',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    {/* Close Button */}
                    <button
                      onClick={toggleDidYouKnowLeft}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
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
                        className="font-bold"
                        style={{ 
                          fontSize: '36px', 
                          marginBottom: '24px',
                          color: '#51727C'
                        }}
                      >
                        {didYouKnowContentLeft.title}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {didYouKnowContentLeft.items.map((item, index) => (
                          <li key={index} className="flex items-start" style={{ marginBottom: '16px' }}>
                            <span className="text-green-600 font-bold mr-3" style={{ 
                              fontSize: '22px', 
                              lineHeight: '1.5',
                              fontFamily: 'Comfortaa, sans-serif'
                            }}>•  </span>
                            <span className="text-gray-700" style={{ 
                              fontSize: '22px', 
                              lineHeight: '1.6',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontWeight: 'bold'
                            }}> {item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Hover Areas for Left Image */}
              {leftImageHoverAreas.map((area) => (
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
                  {/* Hover indicator - small circle with ! */}
                  {hoveredArea !== area.id && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#51727C',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Comfortaa, sans-serif',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        zIndex: 5
                      }}
                    >
                      !
                    </div>
                  )}
                  
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
                        zIndex: 10,
                        fontSize: `${getFontSize(leftContainerWidth, area.text.length, area.width)}px`,
                        fontFamily: 'Comfortaa, sans-serif',
                        fontWeight: 'bold',
                        color: '#406A46',
                        lineHeight: '1.2',
                        padding: getPadding(leftContainerWidth),
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {area.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Image */}
            <div ref={rightImageRef} className="relative" style={{ width: '45%', maxWidth: '800px', display: 'inline-block' }}>
              <img 
                src="/assets/components/Sponge/image2.png"
                alt="Floodplain ecosystem benefits"
                className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                style={{ 
                  backgroundColor: 'transparent',
                  opacity: showDidYouKnowRight ? 0.3 : 1,
                  display: 'block'
                }}
              />
              
              {/* Did you know Modal - Over Right Image */}
              {showDidYouKnowRight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute flex items-center justify-center z-30"
                  style={{ 
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '40px'
                  }}
                >
                  <div 
                    className="bg-white shadow-2xl w-full relative"
                    style={{ 
                      borderRadius: '24px',
                      padding: '40px',
                      maxHeight: '100%',
                      overflowY: 'auto',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)'
                    }}
                  >
                    {/* Close Button */}
                    <button
                      onClick={toggleDidYouKnowRight}
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
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
                        className="font-bold"
                        style={{ 
                          fontSize: '36px', 
                          marginBottom: '24px',
                          color: '#51727C'
                        }}
                      >
                        {didYouKnowContentRight.title}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {didYouKnowContentRight.items.map((item, index) => (
                          <li key={index} className="flex items-start" style={{ marginBottom: '16px' }}>
                            <span className="text-green-600 font-bold mr-3" style={{ 
                              fontSize: '22px', 
                              lineHeight: '1.5',
                              fontFamily: 'Comfortaa, sans-serif'
                            }}>•  </span>
                            <span className="text-gray-700" style={{ 
                              fontSize: '22px', 
                              lineHeight: '1.6',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontWeight: 'bold'
                            }}> {item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Hover Areas for Right Image */}
              {rightImageHoverAreas.map((area) => (
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
                  {/* Hover indicator - small circle with ! */}
                  {hoveredArea !== area.id && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#51727C',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        fontFamily: 'Comfortaa, sans-serif',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        zIndex: 5
                      }}
                    >
                      !
                    </div>
                  )}
                  
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
                        zIndex: 10,
                        fontSize: `${getFontSize(rightContainerWidth, area.text.length, area.width)}px`,
                        fontFamily: 'Comfortaa, sans-serif',
                        fontWeight: 'bold',
                        color: '#406A46',
                        lineHeight: '1.2',
                        padding: getPadding(rightContainerWidth),
                        overflow: 'hidden',
                        wordWrap: 'break-word',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {area.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


          {/* Did you know Buttons - Centered under both images */}
          <div className="flex justify-center items-start gap-8 mt-8">
            {/* Left Button */}
            <div style={{ width: '45%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                onClick={toggleDidYouKnowLeft}
                className="transition-all duration-300 hover:opacity-80"
                style={{
                  width: '200px',
                  height: '60px',
                  backgroundColor: '#406A46',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ 
                  color: 'white', 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold', 
                  fontSize: '24px', 
                  lineHeight: '1' 
                }}>
                  Did you know?
                </span>
              </motion.button>
            </div>
            
            {/* Right Button */}
            <div style={{ width: '45%', maxWidth: '800px', display: 'flex', justifyContent: 'center' }}>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                onClick={toggleDidYouKnowRight}
                className="transition-all duration-300 hover:opacity-80"
                style={{
                  width: '200px',
                  height: '60px',
                  backgroundColor: '#406A46',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ 
                  color: 'white', 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold', 
                  fontSize: '24px', 
                  lineHeight: '1' 
                }}>
                  Did you know?
                </span>
              </motion.button>
            </div>
          </div>
            </>
          ) : currentPage === 2 ? (
            <>
              {/* Page 2 Content - Drag and Drop */}
              {/* Activity 1 Title with Pencil Icon */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center" style={{ gap: '10px' }}>
                  <img 
                    src="/assets/icons/pencil.png" 
                    alt="Pencil" 
                    style={{ 
                      width: '84px', 
                      height: '84px',
                      backgroundColor: 'transparent'
                    }} 
                  />
                  <h2 style={{
                    fontSize: '48px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46',
                    margin: '0'
                  }}>
                    Activity 1
                  </h2>
                </div>
              </div>
              
              {/* Instruction Text */}
              <div className="text-center mb-2">
                <p style={{
                  fontSize: '24px',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  color: '#406A46',
                  lineHeight: '1.6',
                  width: '100%',
                  margin: '0 auto'
                }}>
                  Can you spot the missing floodplain superpowers? Match the description numbers to the healthy floodplain (left) and degraded floodplain (right).
                </p>
              </div>

              {/* Images with Drop Zones */}
              <div className="flex justify-center items-start gap-8 mb-2">
                {/* Left Image */}
                <div className="relative" style={{ width: '45%', maxWidth: '800px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/Sponge/image1.png"
                    alt="Natural floodplain"
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ backgroundColor: 'transparent', display: 'block' }}
                  />
                  
                  {/* Drop Zones for Left Image */}
                  {leftImageDropZones.map(zone => {
                    const placement = placements[zone.id];
                    const isCorrect = showPage2Feedback && placement === zone.correctNumber;
                    const isIncorrect = showPage2Feedback && placement && placement !== zone.correctNumber;
                    const isEmpty = showPage2Feedback && !placement;
                    
                    return (
                      <div
                        key={zone.id}
                        style={{
                          position: 'absolute',
                          left: `${zone.x}%`,
                          top: `${zone.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(zone.id)}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: placement ? '#51727C' : 'transparent',
                            border: showPage2Feedback 
                              ? (isCorrect ? '4px solid #548235' : isIncorrect ? '4px solid #C41904' : '4px solid #CE7C0A')
                              : '4px solid white',
                            boxShadow: placement ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(255, 255, 255, 0.5)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: placement ? 'white' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: draggedNumber && !page2Submitted ? 'copy' : 'default',
                            opacity: 1
                          }}
                        >
                          {placement || '?'}
                        </div>
                        
                        {/* Show correct answer when incorrect or empty */}
                        {((isIncorrect || isEmpty) && page2Submitted) && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '60px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: isIncorrect ? '#fef2f2' : '#fef3c7',
                              border: `2px solid ${isIncorrect ? '#C41904' : '#CE7C0A'}`,
                              borderRadius: '8px',
                              padding: '6px 10px',
                              fontSize: '14px',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontWeight: 'bold',
                              color: isIncorrect ? '#C41904' : '#CE7C0A',
                              whiteSpace: 'nowrap',
                              zIndex: 100,
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                            }}
                          >
                            Correct: {zone.correctNumber}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Extra Corner Drop Zones for Left Image - Always accessible, aligned right bottom horizontally */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '5%',
                      bottom: '5%',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}
                  >
                    {[1, 2, 3].map((num) => {
                      return (
                        <div
                          key={`left-corner-${num}`}
                        >
                          <div
                            draggable={!page2Submitted}
                            onDragStart={() => handleDragStart(num)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={() => handleCornerDrop(num, 'left')}
                            className="font-bold transition-all duration-300 hover:opacity-80"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#51727C',
                              color: 'white',
                              borderRadius: '50%',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              fontSize: '20px',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: page2Submitted ? 'not-allowed' : 'move',
                              opacity: draggedNumber === num ? 0.5 : 1,
                              zIndex: 10
                            }}
                          >
                            {num}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative" style={{ width: '45%', maxWidth: '800px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/Sponge/image2.png"
                    alt="Degraded floodplain"
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ backgroundColor: 'transparent', display: 'block' }}
                  />
                  
                  {/* Drop Zones for Right Image */}
                  {rightImageDropZones.map(zone => {
                    const placement = placements[zone.id];
                    const isCorrect = showPage2Feedback && placement === zone.correctNumber;
                    const isIncorrect = showPage2Feedback && placement && placement !== zone.correctNumber;
                    const isEmpty = showPage2Feedback && !placement;
                    
                    return (
                      <div
                        key={zone.id}
                        style={{
                          position: 'absolute',
                          left: `${zone.x}%`,
                          top: `${zone.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div
                          onDragOver={handleDragOver}
                          onDrop={() => handleDrop(zone.id)}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: placement ? '#51727C' : 'transparent',
                            border: showPage2Feedback 
                              ? (isCorrect ? '4px solid #548235' : isIncorrect ? '4px solid #C41904' : '4px solid #CE7C0A')
                              : '4px solid white',
                            boxShadow: placement ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(255, 255, 255, 0.5)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: placement ? 'white' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: draggedNumber && !page2Submitted ? 'copy' : 'default',
                            opacity: 1
                          }}
                        >
                          {placement || '?'}
                        </div>
                        
                        {/* Show correct answer when incorrect or empty */}
                        {((isIncorrect || isEmpty) && page2Submitted) && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '60px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: isIncorrect ? '#fef2f2' : '#fef3c7',
                              border: `2px solid ${isIncorrect ? '#C41904' : '#CE7C0A'}`,
                              borderRadius: '8px',
                              padding: '6px 10px',
                              fontSize: '14px',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontWeight: 'bold',
                              color: isIncorrect ? '#C41904' : '#CE7C0A',
                              whiteSpace: 'nowrap',
                              zIndex: 100,
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                            }}
                          >
                            Correct: {zone.correctNumber}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Extra Corner Drop Zones for Right Image - Always accessible, aligned right bottom horizontally */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '5%',
                      bottom: '5%',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}
                  >
                    {[1, 2, 3].map((num) => {
                      return (
                        <div
                          key={`right-corner-${num}`}
                        >
                          <div
                            draggable={!page2Submitted}
                            onDragStart={() => handleDragStart(num)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={() => handleCornerDrop(num, 'right')}
                            className="font-bold transition-all duration-300 hover:opacity-80"
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#51727C',
                              color: 'white',
                              borderRadius: '50%',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              fontSize: '20px',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: page2Submitted ? 'not-allowed' : 'move',
                              opacity: draggedNumber === num ? 0.5 : 1,
                              zIndex: 10
                            }}
                          >
                            {num}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Descriptions with Draggable Numbers */}
              <div className="flex justify-center gap-8 mt-4">
                {/* Left Descriptions */}
                <div style={{ width: '45%', maxWidth: '800px', paddingLeft: '10px' }}>
                  <h4 className="font-bold text-blue-900 mb-4" style={{ fontSize: '20px' }}>Natural Floodplain:</h4>
                  {leftDescriptions.map((desc, index) => (
                    <div key={index} className="flex items-center" style={{ gap: '12px', marginBottom: '20px' }}>
                      {/* Draggable Number */}
                      <div
                        draggable={!page2Submitted}
                        onDragStart={() => handleDragStart(index + 1)}
                        onDragEnd={handleDragEnd}
                        className="font-bold transition-all duration-300 hover:opacity-80 flex-shrink-0"
                        style={{
                          backgroundColor: '#51727C',
                          color: 'white',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          cursor: page2Submitted ? 'not-allowed' : 'move',
                          opacity: draggedNumber === (index + 1) ? 0.5 : 1,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        {index + 1}
                      </div>
                      {/* Description Text */}
                      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Right Descriptions */}
                <div style={{ width: '45%', maxWidth: '800px', paddingLeft: '10px' }}>
                  <h4 className="font-bold text-blue-900 mb-4" style={{ fontSize: '20px' }}>Degraded Floodplain:</h4>
                  {rightDescriptions.map((desc, index) => (
                    <div key={index} className="flex items-center" style={{ gap: '12px', marginBottom: '20px' }}>
                      {/* Draggable Number */}
                      <div
                        draggable={!page2Submitted}
                        onDragStart={() => handleDragStart(index + 1)}
                        onDragEnd={handleDragEnd}
                        className="font-bold transition-all duration-300 hover:opacity-80 flex-shrink-0"
                        style={{
                          backgroundColor: '#51727C',
                          color: 'white',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          cursor: page2Submitted ? 'not-allowed' : 'move',
                          opacity: draggedNumber === (index + 1) ? 0.5 : 1,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        {index + 1}
                      </div>
                      {/* Description Text */}
                      <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>


              {/* Feedback Summary */}
              {showPage2Feedback && (() => {
                const allZones = [...leftImageDropZones, ...rightImageDropZones];
                const correctCount = Object.keys(placements).filter(zoneId => {
                  const zone = allZones.find(z => z.id === zoneId);
                  return placements[zoneId] === zone?.correctNumber;
                }).length;
                const incorrectCount = Object.keys(placements).filter(zoneId => {
                  const zone = allZones.find(z => z.id === zoneId);
                  return placements[zoneId] && placements[zoneId] !== zone?.correctNumber;
                }).length;

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                    style={{ marginTop: '60px' }}
                  >
                    <div className="inline-flex items-center justify-center" 
                      style={{ gap: '60px' }}
                    >
                      {/* Correct */}
                      <div className="flex items-center" style={{ gap: '12px' }}>
                        <div className="flex items-center justify-center rounded-full" 
                          style={{ 
                            backgroundColor: '#548235',
                            width: '32px',
                            height: '32px'
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span style={{ fontSize: '22px', fontWeight: '600', color: '#548235' }}>
                          {correctCount} Correct
                        </span>
                      </div>

                      {/* Incorrect */}
                      <div className="flex items-center" style={{ gap: '12px' }}>
                        <div className="flex items-center justify-center rounded-full" 
                          style={{ 
                            backgroundColor: '#C41904',
                            width: '32px',
                            height: '32px'
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <span style={{ fontSize: '22px', fontWeight: '600', color: '#C41904' }}>
                          {incorrectCount} Incorrect
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </>
          ) : currentPage === 3 ? (
            <>
              {/* Page 3 Content - Fill in the Blank */}
              {/* Title above white box */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center" style={{ gap: '10px' }}>
                  <img 
                    src="/assets/icons/pencil.png" 
                    alt="Pencil" 
                    style={{ 
                      width: '84px', 
                      height: '84px',
                      backgroundColor: 'transparent'
                    }} 
                  />
                  <h2 style={{
                    fontSize: '48px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46',
                    margin: 0
                  }}>
                    Fill-in-the-blanks challenge
                  </h2>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <div style={{
                  backgroundColor: '#F5F5F5',
                  borderRadius: '24px',
                  padding: '40px 60px',
                  maxWidth: '1000px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                  <p style={{
                    fontSize: '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46',
                    lineHeight: '1.6',
                    margin: '0 0 20px',
                    textAlign: 'center'
                  }}>
                    Floodplains are nature's buffer zones!
                  </p>
                  <p style={{
                    fontSize: '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46',
                    lineHeight: '1.8',
                    margin: '0 0 30px',
                    textAlign: 'center'
                  }}>
                    How does the floodplain help in times of heavy rain?<br />
                    What happens to floodwater when a river has space to spread out?
                  </p>
                  <p style={{
                    fontSize: '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46',
                    textAlign: 'center',
                    margin: '0 0 30px'
                  }}>
                    COMPLETE THE SENTENCE:
                  </p>

                  {/* Fill in the blank inputs */}
                  <div style={{
                    fontSize: '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    lineHeight: '2',
                    textAlign: 'center',
                    color: '#406A46'
                  }}>
                    <p style={{ marginBottom: '30px' }}>
                      Floodplains act as natural{' '}
                      <input
                        type="text"
                        value={answer1}
                        onChange={(e) => !page3Submitted && setAnswer1(e.target.value)}
                        disabled={page3Submitted}
                        style={{
                          width: '200px',
                          padding: '8px 16px',
                          fontSize: '20px',
                          textAlign: 'center',
                          border: showPage3Feedback 
                            ? (isAnswer1Correct() ? '3px solid #548235' : '3px solid #C41904')
                            : '2px solid #51727C',
                          borderRadius: '8px',
                          backgroundColor: page3Submitted ? '#f3f4f6' : 'white',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        placeholder="s____e"
                      />
                      {' '}to hold floodwater
                    </p>
                    <p style={{ margin: 0 }}>
                      and reduce the risk of{' '}
                      <input
                        type="text"
                        value={answer2}
                        onChange={(e) => !page3Submitted && setAnswer2(e.target.value)}
                        disabled={page3Submitted}
                        style={{
                          width: '200px',
                          padding: '8px 16px',
                          fontSize: '20px',
                          textAlign: 'center',
                          border: showPage3Feedback 
                            ? (isAnswer2Correct() ? '3px solid #548235' : '3px solid #C41904')
                            : '2px solid #51727C',
                          borderRadius: '8px',
                          backgroundColor: page3Submitted ? '#f3f4f6' : 'white',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        placeholder="f___g"
                      />
                      .
                    </p>
                  </div>

                  {/* Feedback inside white box */}
                  {showPage3Feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                      style={{ marginTop: '40px', paddingTop: '40px', borderTop: '2px solid #e5e7eb' }}
                    >
                      <div className="inline-flex items-center justify-center" style={{ gap: '40px' }}>
                        {/* Answer 1 feedback */}
                        <div className="flex items-center" style={{ gap: '12px' }}>
                          <div className="flex items-center justify-center rounded-full" 
                            style={{ 
                              backgroundColor: isAnswer1Correct() ? '#548235' : '#C41904',
                              width: '32px',
                              height: '32px'
                            }}
                          >
                            {isAnswer1Correct() ? (
                              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                              </svg>
                            )}
                          </div>
                          <span style={{ 
                            fontSize: '20px', 
                            fontWeight: '600', 
                            color: isAnswer1Correct() ? '#548235' : '#C41904' 
                          }}>
                            {isAnswer1Correct() ? 'Correct: sponge' : `Incorrect (Answer: sponge)`}
                          </span>
                        </div>

                        {/* Answer 2 feedback */}
                        <div className="flex items-center" style={{ gap: '12px' }}>
                          <div className="flex items-center justify-center rounded-full" 
                            style={{ 
                              backgroundColor: isAnswer2Correct() ? '#548235' : '#C41904',
                              width: '32px',
                              height: '32px'
                            }}
                          >
                            {isAnswer2Correct() ? (
                              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                                <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                              </svg>
                            )}
                          </div>
                          <span style={{ 
                            fontSize: '20px', 
                            fontWeight: '600', 
                            color: isAnswer2Correct() ? '#548235' : '#C41904' 
                          }}>
                            {isAnswer2Correct() ? 'Correct: flooding' : `Incorrect (Answer: flooding)`}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </motion.div>
      </div>

      {/* Pagination and Next Button - Sticky Footer - Outside container for full width */}
      {currentPage > 0 && (
      <div className="relative z-10" style={{ 
        position: 'sticky', 
        bottom: 0,
        left: 0,
        right: 0,
        width: '100vw',
        marginLeft: 'calc((100% - 100vw) / 2)',
        backgroundColor: 'rgba(210, 228, 240, 0.95)',
        paddingTop: '10px',
        paddingBottom: '10px',
        marginBottom: '0px',
        flexShrink: 0
      }}>
        {/* Top Shadow - Full Width */}
        <div style={{
          position: 'absolute',
          top: '-4px',
          left: 0,
          width: '100%',
          height: '6px',
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.06) 50%, transparent 100%)',
          pointerEvents: 'none'
        }} />
        <div className="relative flex justify-between items-center" style={{ maxWidth: '100%', width: '100%', paddingLeft: '100px', paddingRight: '100px' }}>
          {/* Home Button - Left */}
          <div className="flex items-center" style={{ paddingLeft: '16px' }}>
            <HomeButton onClick={onHomeClick} />
          </div>

          {/* Center Section - Download, Pagination, and Next Topic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center items-center"
            style={{ 
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              transformOrigin: 'center',
              gap: '50px',
              transition: 'transform 0.3s ease'
            }}
          >
          {currentPage === TOTAL_PAGES && page3Submitted ? (
              <>
                {/* Download Button - left of pagination - Hide if not enough space */}
                {hasEnoughSpace && (
                  <button
                    onClick={handleDownloadClick}
                    className="download-button relative flex items-center justify-center z-50"
                    style={{
                      width: '480px',
                      height: '50px',
                      backgroundColor: 'transparent',
                      border: 'none',
                        cursor: 'pointer',
                        flexShrink: 0
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
              
                {/* Pagination Dots - Perfectly Centered */}
                <div className="flex justify-center items-center" style={{ gap: '14px', flexShrink: 0 }}>
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
                </div>

                {/* NEXT TOPIC Text - right of pagination - Hide if not enough space */}
                {hasEnoughSpace && (
                  <div style={{ flexShrink: 0 }}>
                    <span style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '24px',
                      color: '#406A46'
                    }}>
                      NEXT TOPIC: Climate protection and carbon sink
                    </span>
                  </div>
                )}
              </>
          ) : (
            /* Pagination Dots - Only when not on completion page */
              <div className="flex justify-center items-center" style={{ gap: '14px', flexShrink: 0 }}>
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
              </div>
          )}
          </motion.div>

          {/* Next Button - Right - Only on completion */}
          {currentPage === TOTAL_PAGES && page3Submitted && (
            <div className="flex items-center" style={{ paddingRight: '16px' }}>
              <button
                onClick={() => {
                  if (onCarbonClick) {
                    onCarbonClick();
                  }
                }}
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
                  alt="Climate protection and carbon sink"
                  style={{
                    width: '158px',
                    height: '60px',
                    opacity: 1
                  }}
                />
              </button>
            </div>
          )}

          {/* Check Answers / Next Button - Right - Only during activities */}
          {!(currentPage === TOTAL_PAGES && page3Submitted) && (
            <div className="flex items-center" style={{ paddingRight: '16px' }}>
              {currentPage === 2 ? (
              // Page 2: Show Check Answers button (becomes NEXT after submit)
              <button
                onClick={() => {
                  if (page2Submitted) {
                    // Navigate to next page after submit
                    setCurrentPage(currentPage + 1);
                  } else if (Object.keys(placements).length >= 6) {
                    // Submit answers
                    handleSubmitPage2();
                  }
                }}
                disabled={!(page2Submitted || Object.keys(placements).length >= 6)}
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
                  alt={page2Submitted ? 'Next' : 'Check Answers'} 
                  style={{ 
                    width: '158px',
                    height: '60px',
                    opacity: page2Submitted || Object.keys(placements).length >= 6 ? 1 : 0.5
                  }}
                />
              </button>
            ) : currentPage === 3 ? (
              // Page 3: Show Check Answers button
              <button
                onClick={() => {
                  if (answer1.trim() && answer2.trim()) {
                    handleSubmitPage3();
                  }
                }}
                disabled={!(answer1.trim() && answer2.trim())}
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
                  alt="Check Answers" 
                  style={{ 
                    width: '158px',
                    height: '60px',
                    opacity: (answer1.trim() && answer2.trim()) ? 1 : 0.5
                  }}
                />
              </button>
            ) : (
              // Other pages: Show NEXT button
              <button
                onClick={() => {
                  if (currentPage < TOTAL_PAGES) {
                    setCurrentPage(currentPage + 1);
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
                  alt="Next" 
                  style={{ 
                    width: '158px',
                    height: '60px',
                    opacity: 1
                  }}
                />
              </button>
            )}
            </div>
          )}
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
