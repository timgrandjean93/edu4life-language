import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePageRouting } from '../../hooks/usePageRouting';
import { useOrientation } from '../../hooks/useOrientation';
import { HomeButton } from '../HomeButton';
import { LocalizedImage } from '../LocalizedImage';

interface FloodControlPageProps {
  onHomeClick: () => void;
  onCarbonClick?: () => void;
  onRepositoryClick?: () => void;
}

const TOTAL_PAGES_DESKTOP = 3; // 0=intro, 1=hover panels, 2=drag panels, 3=fill blank
const TOTAL_PAGES_MOBILE = 7;  // 0=intro, 1=left hover, 2=left did you know, 3=right hover, 4=right did you know, 5=left drag, 6=right drag, 7=fill blank

// Page 2 drop zones
const leftImageDropZones = [
  { id: 'left-1', x: 45, y: 47, correctNumber: 1 },
  { id: 'left-2', x: 50, y: 30, correctNumber: 3 },
  { id: 'left-3', x: 80, y: 70, correctNumber: 2 }
];

const rightImageDropZones = [
  { id: 'right-1', x: 30, y: 20, correctNumber: 1 },
  { id: 'right-2', x: 25, y: 70, correctNumber: 2 },
  { id: 'right-3', x: 70, y: 65, correctNumber: 3 }
];

export const FloodControlPage: React.FC<FloodControlPageProps> = ({
  onHomeClick,
  onCarbonClick,
  onRepositoryClick
}) => {
  const { t, i18n } = useTranslation();
  const { isMobile } = useOrientation();
  const TOTAL_PAGES = isMobile ? TOTAL_PAGES_MOBILE : TOTAL_PAGES_DESKTOP;
  const [currentPage, setCurrentPage] = usePageRouting(TOTAL_PAGES);
  const currentLanguage = i18n.language;
  
  // Content mapping: which panels to show based on page and device
  const showLeftHover = isMobile ? currentPage === 1 : currentPage === 1;
  const showLeftDidYouKnow = isMobile && currentPage === 2;
  const showRightHover = isMobile ? currentPage === 3 : currentPage === 1;
  const showRightDidYouKnow = isMobile && currentPage === 4;
  
  // Mobile Activity 1: step-by-step flow - one description at a time, immediate feedback, retry on wrong
  const [mobileActivityStep, setMobileActivityStep] = React.useState(1); // 1, 2, or 3 - which number to place
  const [mobilePlacementWrong, setMobilePlacementWrong] = React.useState(false); // Show "try again" when wrong
  
  // Reset mobile-specific state when changing pages
  React.useEffect(() => {
    setTappedArea(null);
    setMobileHoverStep(1);
    setCurrentNumberToPlace(null);
    setMobileActivityStep(1);
    setMobilePlacementWrong(false);
  }, [currentPage]);
  
  const showLeftDrop = isMobile ? currentPage === 5 : currentPage === 2;
  const showRightDrop = isMobile ? currentPage === 6 : currentPage === 2;
  const showFillBlank = isMobile ? currentPage === 7 : currentPage === 3;
  
  // Calculate input width based on language (Dutch words are longer)
  const getInputWidth = () => {
    if (isMobile) return currentLanguage === 'nl' ? '180px' : '140px';
    return currentLanguage === 'nl' ? '250px' : '200px';
  };
  
  // Hover areas with translations
  const leftImageHoverAreasTranslated = [
    {
      id: 'willows-banks',
      x: 60,
      y: 20,
      width: 30,
      height: 25,
      text: t('floodControlPage.page1.hoverAreas.left.willows-banks')
    },
    {
      id: 'reed-vegetation',
      x: 60,
      y: 50,
      width: 35,
      height: 20,
      text: t('floodControlPage.page1.hoverAreas.left.reed-vegetation')
    },
    {
      id: 'native-grasses',
      x: 70,
      y: 80,
      width: 30,
      height: 20,
      text: t('floodControlPage.page1.hoverAreas.left.native-grasses')
    },
    {
      id: 'leaf-litter',
      x: 10,
      y: 80,
      width: 40,
      height: 15,
      text: t('floodControlPage.page1.hoverAreas.left.leaf-litter')
    },
    {
      id: 'deep-rooted-trees',
      x: 10,
      y: 60,
      width: 30,
      height: 20,
      text: t('floodControlPage.page1.hoverAreas.left.deep-rooted-trees')
    }
  ];

  const rightImageHoverAreasTranslated = [
    {
      id: 'natural-filtration',
      x: 20,
      y: 35,
      width: 60,
      height: 15,
      text: t('floodControlPage.page1.hoverAreas.right.natural-filtration')
    },
    {
      id: 'ecosystem-benefits',
      x: 20,
      y: 60,
      width: 30,
      height: 25,
      text: t('floodControlPage.page1.hoverAreas.right.ecosystem-benefits')
    },
    {
      id: 'groundwater-recharge',
      x: 60,
      y: 60,
      width: 35,
      height: 20,
      text: t('floodControlPage.page1.hoverAreas.right.groundwater-recharge')
    }
  ];

  // Did you know content with translations
  const didYouKnowContentLeftTranslated = {
    title: t('floodControlPage.page1.didYouKnowContent.left.title'),
    items: [
      t('floodControlPage.page1.didYouKnowContent.left.items.0'),
      t('floodControlPage.page1.didYouKnowContent.left.items.1'),
      t('floodControlPage.page1.didYouKnowContent.left.items.2'),
      t('floodControlPage.page1.didYouKnowContent.left.items.3'),
      t('floodControlPage.page1.didYouKnowContent.left.items.4')
    ]
  };

  const didYouKnowContentRightTranslated = {
    title: t('floodControlPage.page1.didYouKnowContent.right.title'),
    items: [
      t('floodControlPage.page1.didYouKnowContent.right.items.0'),
      t('floodControlPage.page1.didYouKnowContent.right.items.1'),
      t('floodControlPage.page1.didYouKnowContent.right.items.2'),
      t('floodControlPage.page1.didYouKnowContent.right.items.3')
    ]
  };

  // Page 2 descriptions with translations
  const leftDescriptionsTranslated = [
    t('floodControlPage.page2.descriptions.left.0'),
    t('floodControlPage.page2.descriptions.left.1'),
    t('floodControlPage.page2.descriptions.left.2')
  ];

  const rightDescriptionsTranslated = [
    t('floodControlPage.page2.descriptions.right.0'),
    t('floodControlPage.page2.descriptions.right.1'),
    t('floodControlPage.page2.descriptions.right.2')
  ];
  const [hoveredArea, setHoveredArea] = React.useState<string | null>(null);
  const [tappedArea, setTappedArea] = React.useState<string | null>(null); // Mobile: tap to show info
  const [mobileHoverStep, setMobileHoverStep] = React.useState(1); // Mobile: sequential 1,2,3... - which number is visible
  const [currentNumberToPlace, setCurrentNumberToPlace] = React.useState<number | null>(null); // Mobile: click-to-place
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

  // Auto-submit page 2 when all zones are filled (desktop only; mobile uses step-by-step)
  React.useEffect(() => {
    if (!isMobile && (showLeftDrop || showRightDrop) && !page2Submitted) {
      const totalZones = leftImageDropZones.length + rightImageDropZones.length;
      const allZonesFilled = Object.keys(placements).length === totalZones;
      if (allZonesFilled) {
        setTimeout(() => handleSubmitPage2(), 300);
      }
    }
  }, [placements, showLeftDrop, showRightDrop, page2Submitted, isMobile]);

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

  // Mobile: click-to-place - step-by-step flow: one description at a time, immediate feedback, retry on wrong
  const handleMobileDrop = (zoneId: string) => {
    if (page2Submitted) return;
    // Mobile step-by-step: use mobileActivityStep as the number to place
    if (isMobile && (showLeftDrop || showRightDrop)) {
      const side: 'left' | 'right' = showLeftDrop ? 'left' : 'right';
      const correctZoneId = findZoneIdByCorrectNumber(mobileActivityStep, side);
      if (zoneId === correctZoneId) {
        setPlacements(prev => ({ ...prev, [zoneId]: mobileActivityStep }));
        setMobilePlacementWrong(false);
        if (mobileActivityStep < 3) {
          setMobileActivityStep(mobileActivityStep + 1);
        } else {
          setMobileActivityStep(4); // Done with this panel
        }
      } else {
        setMobilePlacementWrong(true);
      }
      return;
    }
    // Fallback (shouldn't reach): original click-to-select behavior
    if (!currentNumberToPlace) return;
    setPlacements(prev => ({ ...prev, [zoneId]: currentNumberToPlace }));
    setCurrentNumberToPlace(null);
  };

  const handleSubmitPage2 = () => {
    setPage2Submitted(true);
    setShowPage2Feedback(true);
  };

  const handleSubmitPage3 = () => {
    // Get correct answers from translations
    const correctAnswer1 = t('floodControlPage.page3.correctAnswers.answer1').toLowerCase().trim();
    const correctAnswer2 = t('floodControlPage.page3.correctAnswers.answer2').toLowerCase().trim();
    
    // Auto-correct shortened answers to full words (for English)
    const ans1 = answer1.toLowerCase().trim();
    const ans2 = answer2.toLowerCase().trim();
    
    // Handle common typos/shortened answers
    if (ans1 === 'pong' || ans1 === 'spon') {
      setAnswer1(correctAnswer1);
    }
    if (ans2 === 'loodin' || ans2 === 'floodin') {
      setAnswer2(correctAnswer2);
    }
    
    setPage3Submitted(true);
    setShowPage3Feedback(true);
  };

  // Retry function to reset activity
  const handleRetry = () => {
    if (showLeftDrop || showRightDrop) {
      setPlacements({});
      setPage2Submitted(false);
      setShowPage2Feedback(false);
      setDraggedNumber(null);
      setCurrentNumberToPlace(null);
      setMobileActivityStep(1);
      setMobilePlacementWrong(false);
    } else if (showFillBlank) {
      setAnswer1('');
      setAnswer2('');
      setPage3Submitted(false);
      setShowPage3Feedback(false);
    }
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
    const correctAnswer = t('floodControlPage.page3.correctAnswers.answer1').toLowerCase().trim();
    // Handle common typos/shortened answers
    return ans === correctAnswer || 
           (correctAnswer === 'sponge' && (ans === 'pong' || ans === 'spon')) ||
           (correctAnswer === 'spons' && ans === 'spon');
  };
  const isAnswer2Correct = () => {
    const ans = answer2.toLowerCase().trim();
    const correctAnswer = t('floodControlPage.page3.correctAnswers.answer2').toLowerCase().trim();
    // Handle common typos/shortened answers
    return ans === correctAnswer || 
           (correctAnswer === 'flooding' && (ans === 'loodin' || ans === 'floodin')) ||
           (correctAnswer === 'overstroming' && (ans === 'overstromin' || ans === 'overstrom'));
  };

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', overflowX: 'visible', paddingBottom: '0px' }}>
      
      {/* Header with title and home button */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: isMobile && currentPage === 0 ? '10px' : '40px' }}>
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
                  {currentPage === 0 ? t('floodControlPage.title.page0') : 
                   t('floodControlPage.title.page1')}
                </motion.h1>
                
                {/* Subtitle */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-4 pb-8" style={{ paddingBottom: isMobile && currentPage === 0 ? '32px' : '10px', flex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {currentPage === 0 ? (
            // Intro Page: Like Map - single image on mobile, two on desktop; text CTA on mobile; download hidden on mobile
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Illustration(s) - Single centered on mobile (like Map), two side by side on desktop */}
              <div 
                className="flex justify-center mb-8"
                style={{ 
                  width: '100%', 
                  maxWidth: isMobile ? '600px' : '1000px',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? 0 : '32px',
                  alignItems: 'center'
                }}
              >
                {isMobile ? (
                  /* Mobile: Single image like Map */
                  <div style={{ width: '100%', maxWidth: '600px' }}>
                    <img 
                      src="/assets/components/Sponge/image1.png"
                      alt="Natural floodplain"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </div>
                ) : (
                  /* Desktop: Two illustrations side by side */
                  <>
                    <div style={{ flex: 1, maxWidth: '480px' }}>
                      <img 
                        src="/assets/components/Sponge/image1.png"
                        alt="Natural floodplain"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                      />
                    </div>
                    <div style={{ flex: 1, maxWidth: '480px' }}>
                      <img 
                        src="/assets/components/Sponge/image2.png"
                        alt="Degraded floodplain"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Descriptive Text - responsive like Map */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                marginBottom: isMobile ? '24px' : '40px',
                maxWidth: '1200px',
                lineHeight: '1.6',
                padding: isMobile ? '0 16px' : '0'
              }}>
                {t('floodControlPage.intro.description')}
              </div>

              {/* Call-to-Action - Text button on mobile (like Map), image on desktop */}
              {isMobile ? (
                <button
                  onClick={() => setCurrentPage(1)}
                  style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#51727C',
                    padding: '14px 32px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#406A46';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#51727C';
                  }}
                >
                  {t('floodControlPage.intro.explore')}
                </button>
              ) : (
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
                  <LocalizedImage 
                    src="/assets/icons/learnandtest.png"
                    alt={t('common.learnAndTestButton')}
                    style={{ 
                      height: 'auto',
                      maxWidth: '500px',
                      width: 'auto'
                    }}
                  />
                </button>
              )}

              {/* Download Section - Hidden on mobile (like Map) */}
              {!isMobile && (
              <div 
                className="flex justify-center" 
                style={{ 
                  width: '100%', 
                  maxWidth: '1400px', 
                  paddingTop: '20px', 
                  marginBottom: '20px', 
                  minHeight: '180px',
                  position: 'relative'
                }}
              >
                {/* Left Download Section */}
                <div 
                  className="flex items-center" 
                  style={{ 
                    gap: '32px', 
                    position: 'absolute',
                    right: 'calc(50% + 50px)',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src="/assets/icons/edumaterial.png" alt="Access Teaching Materials" style={{ width: '150px', height: '110px' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#406A46', marginBottom: '6px' }}>
                      {t('floodControlPage.intro.accessTeachingMaterials')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a
                        href="https://doi.org/10.5281/zenodo.17472525"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontFamily: 'Comfortaa, sans-serif', fontSize: '16px', fontWeight: 'bold', color: 'white',
                          backgroundColor: '#51727C', padding: '12px 32px', borderRadius: '8px', border: 'none',
                          cursor: 'pointer', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block'
                        }}
                      >
                        {t('floodControlPage.intro.openPlatform')}
                      </a>
                    </div>
                    <div style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '14px', color: '#406A46', fontStyle: 'italic' }}>
                      {t('floodControlPage.intro.opensNewTab')}
                    </div>
                  </div>
                </div>
                {/* Right Download Section */}
                <div 
                  className="flex items-center" 
                  style={{ gap: '32px', position: 'absolute', left: 'calc(50% + 50px)', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src="/assets/icons/edurepo.png" alt="Explore Wet-Edu Repository" style={{ width: '120px', height: '120px' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '24px', fontWeight: 'bold', color: '#406A46', marginBottom: '6px' }}>
                      {t('floodControlPage.intro.exploreRepository')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <button
                        onClick={() => onRepositoryClick && onRepositoryClick()}
                        style={{
                          fontFamily: 'Comfortaa, sans-serif', fontSize: '16px', fontWeight: 'bold', color: 'white',
                          backgroundColor: '#51727C', padding: '12px 32px', borderRadius: '8px', border: 'none',
                          cursor: 'pointer', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block'
                        }}
                      >
                        {t('floodControlPage.intro.explore')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          ) : (showLeftDidYouKnow || showRightDidYouKnow) ? (
            /* Mobile only: Did you know full page */
            <div className="flex flex-col items-center" style={{ padding: '0 16px 40px' }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                padding: '24px',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  marginBottom: '20px',
                  color: '#51727C',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {showLeftDidYouKnow ? didYouKnowContentLeftTranslated.title : didYouKnowContentRightTranslated.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(showLeftDidYouKnow ? didYouKnowContentLeftTranslated.items : didYouKnowContentRightTranslated.items).map((item, index) => (
                    <li key={index} className="flex items-start" style={{ marginBottom: '14px' }}>
                      <span style={{ fontSize: '18px', lineHeight: '1.5', fontFamily: 'Comfortaa, sans-serif', color: '#548235', fontWeight: 'bold', marginRight: '8px' }}>•</span>
                      <span style={{ fontSize: '16px', lineHeight: '1.6', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#51727C',
                    padding: '14px 40px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginTop: '24px',
                    width: '100%'
                  }}
                >
                  {t('common.next')}
                </button>
              </div>
            </div>
          ) : (showLeftHover || showRightHover) ? (
            <>
              {/* Hover/Tap panels - Desktop: both with hover. Mobile: numbered 1-N, text below on tap */}
              {!isMobile && (
              <>
              {/* Pointer Icon - Desktop only */}
              <div className="text-center mx-auto mb-4">
                <img src="/assets/icons/pointer.png" alt="Pointer" style={{ width: '54px', height: '54px', backgroundColor: 'transparent', margin: '0 auto' }} />
              </div>
              {/* Instruction Text - Desktop only */}
              <div className="text-center mb-8">
                <p style={{ fontSize: '24px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46', lineHeight: '1.5' }}>
                  {t('floodControlPage.page1.instruction')}
                </p>
              </div>
              </>
              )}

              {isMobile && (() => {
                const areas = showLeftHover ? leftImageHoverAreasTranslated : rightImageHoverAreasTranslated;
                const totalAreas = areas.length;
                const lastClickedArea = mobileHoverStep > 1 ? areas[mobileHoverStep - 2] : null;
                const showNextInCenter = mobileHoverStep > totalAreas;
                return (
              <div className="flex flex-col items-center" style={{ padding: '0 16px', gap: '20px' }}>
                <p style={{ fontSize: '18px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46', textAlign: 'center', margin: 0 }}>
                  {t('floodControlPage.page1.instruction')}
                </p>
                <div className="relative" style={{ width: '100%', maxWidth: '400px' }}>
                  <img 
                    src={showLeftHover ? "/assets/components/Sponge/image1.png" : "/assets/components/Sponge/image2.png"}
                    alt="Floodplain"
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ display: 'block' }}
                  />
                  {areas.map((area, index) => {
                    const num = index + 1;
                    const isVisible = num <= mobileHoverStep || (mobileHoverStep > totalAreas && num <= totalAreas);
                    const isClickable = num === mobileHoverStep && mobileHoverStep <= totalAreas;
                    const isHighlighted = area === lastClickedArea; // Different color when this area's text is shown
                    if (!isVisible) return null;
                    return (
                      <button
                        key={area.id}
                        onClick={isClickable ? () => {
                          setTappedArea(area.id);
                          if (mobileHoverStep < totalAreas) {
                            setMobileHoverStep(mobileHoverStep + 1);
                          } else {
                            setMobileHoverStep(totalAreas + 1);
                          }
                        } : undefined}
                        style={{
                          position: 'absolute',
                          left: `${area.x + area.width / 2}%`,
                          top: `${area.y + area.height / 2}%`,
                          width: '40px',
                          height: '40px',
                          marginLeft: '-20px',
                          marginTop: '-20px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: isHighlighted ? '#97C09D' : isClickable ? '#51727C' : 'rgba(81, 114, 124, 0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: isClickable ? 'pointer' : 'default',
                          fontFamily: 'Comfortaa, sans-serif',
                          fontWeight: 'bold',
                          fontSize: '18px',
                          color: 'white',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                        }}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
                {lastClickedArea && (
                  <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    <p style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#406A46',
                      lineHeight: '1.5',
                      margin: 0
                    }} dangerouslySetInnerHTML={{ __html: lastClickedArea.text }} />
                  </div>
                )}
                {showNextInCenter && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: 'white',
                      backgroundColor: '#51727C',
                      padding: '14px 40px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      width: '100%',
                      maxWidth: '280px',
                      alignSelf: 'stretch'
                    }}
                  >
                    {t('common.next')}
                  </button>
                )}
              </div>
                );
              })()}

              {/* Desktop: Images with Hover Areas */}
          {!isMobile && (
          <div className="flex justify-center items-start" style={{ gap: 32, flexDirection: 'row', alignItems: 'center' }}>
            {/* Left Image - Desktop */}
            {showLeftHover && (
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
              
              {/* Did you know Modal - Desktop only, Over Left Image */}
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
                        {didYouKnowContentLeftTranslated.title}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {didYouKnowContentLeftTranslated.items.map((item, index) => (
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
              
              {/* Hover Areas for Left Image - hover on desktop, tap on mobile */}
              {leftImageHoverAreasTranslated.map((area) => {
                const isActive = hoveredArea === area.id || (isMobile && tappedArea === area.id);
                return (
                <div
                  key={area.id}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    width: `${area.width}%`,
                    height: `${area.height}%`,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                    borderRadius: '8px',
                    border: 'none'
                  }}
                  onMouseEnter={!isMobile ? () => handleAreaHover(area.id) : undefined}
                  onMouseLeave={!isMobile ? handleAreaLeave : undefined}
                  onClick={isMobile ? () => setTappedArea(prev => prev === area.id ? null : area.id) : undefined}
                >
                  {/* Hover indicator - small circle with ! */}
                  {!isActive && (
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
                  
                  {/* Text overlay when hovered/tapped */}
                  {isActive && (
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
              );
              })}
            </div>
            )}

            {/* Right Image - show when showRightHover */}
            {showRightHover && (
            <div ref={rightImageRef} className="relative" style={{ width: isMobile ? '100%' : '45%', maxWidth: isMobile ? '400px' : '800px', display: 'inline-block', margin: isMobile ? '0 auto' : 0 }}>
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
                        {didYouKnowContentRightTranslated.title}
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {didYouKnowContentRightTranslated.items.map((item, index) => (
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
              
              {/* Hover Areas for Right Image - hover on desktop, tap on mobile */}
              {rightImageHoverAreasTranslated.map((area) => {
                const isActive = hoveredArea === area.id || (isMobile && tappedArea === area.id);
                return (
                <div
                  key={area.id}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: `${area.x}%`,
                    top: `${area.y}%`,
                    width: `${area.width}%`,
                    height: `${area.height}%`,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                    borderRadius: '8px',
                    border: 'none'
                  }}
                  onMouseEnter={!isMobile ? () => handleAreaHover(area.id) : undefined}
                  onMouseLeave={!isMobile ? handleAreaLeave : undefined}
                  onClick={isMobile ? () => setTappedArea(prev => prev === area.id ? null : area.id) : undefined}
                >
                  {/* Hover indicator - small circle with ! */}
                  {!isActive && (
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
                  
                  {/* Text overlay when hovered/tapped */}
                  {isActive && (
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
              );
              })}
            </div>
            )}
          </div>
          )}

          {/* Did you know Buttons - Desktop only (on mobile, Did you know is a separate page) */}
          {!isMobile && (
          <div 
            className="flex justify-center items-start mt-8"
            style={{ gap: 32, flexDirection: 'row', alignItems: 'center' }}
          >
            {/* Left Button - show when left panel is visible */}
            {showLeftHover && (
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
                  {t('floodControlPage.page1.didYouKnow')}
                </span>
              </motion.button>
            </div>
            )}
            
            {/* Right Button - show when right panel is visible */}
            {showRightHover && (
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
                  {t('floodControlPage.page1.didYouKnow')}
                </span>
              </motion.button>
            </div>
            )}
          </div>
          )}
            </>
          ) : (showLeftDrop || showRightDrop) ? (
            <>
              {/* Page 2 Content - Drag and Drop */}
              {/* Activity 1 Title with Pencil Icon */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center" style={{ gap: isMobile ? '8px' : '10px' }}>
                  <img 
                    src="/assets/icons/pencil.png" 
                    alt="Pencil" 
                    style={{ 
                      width: isMobile ? '60px' : '84px',
                      height: isMobile ? '60px' : '84px',
                      backgroundColor: 'transparent'
                    }} 
                  />
                  <h2 style={{
                    fontSize: isMobile ? '28px' : '48px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46',
                    margin: '0'
                  }}>
                    {t('floodControlPage.page2.activityTitle')}
                  </h2>
                </div>
              </div>
              
              {/* Instruction / Description - mobile: current step description; desktop: full instruction */}
              <div className="text-center mb-2">
                <p style={{
                  fontSize: isMobile ? '18px' : '24px',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  color: '#406A46',
                  lineHeight: '1.6',
                  width: '100%',
                  margin: '0 auto',
                  padding: isMobile ? '0 16px' : 0
                }}>
                  {isMobile && (showLeftDrop || showRightDrop) ? (
                    (showLeftDrop ? leftDescriptionsTranslated : rightDescriptionsTranslated)[mobileActivityStep - 1]
                  ) : t('floodControlPage.page2.instruction')}
                </p>
              </div>

              {/* Mobile: "Try again" when placement was wrong */}
              {isMobile && (showLeftDrop || showRightDrop) && mobilePlacementWrong && (
                <p style={{
                  fontSize: '16px',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  color: '#C41904',
                  textAlign: 'center',
                  margin: '0 0 8px 0',
                  padding: '0 16px'
                }}>
                  {t('common.tryAgain')}
                </p>
              )}

              {/* Images with Drop Zones - one or both panels */}
              <div 
                className="flex justify-center items-start mb-2"
                style={{ gap: isMobile ? 0 : 32, flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}
              >
                {/* Left Image - show when showLeftDrop */}
                {showLeftDrop && (
                <div className="relative" style={{ width: isMobile ? '100%' : '45%', maxWidth: isMobile ? '400px' : '800px', display: 'inline-block', margin: isMobile ? '0 auto' : 0 }}>
                  <img 
                    src="/assets/components/Sponge/image1.png"
                    alt="Natural floodplain"
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ backgroundColor: 'transparent', display: 'block' }}
                  />
                  
                  {/* Drop Zones for Left Image */}
                  {leftImageDropZones.map(zone => {
                    const placement = placements[zone.id];
                    const showFeedback = showPage2Feedback || (isMobile && (showLeftDrop || showRightDrop));
                    const isCorrect = showFeedback && placement === zone.correctNumber;
                    const isIncorrect = showFeedback && placement && placement !== zone.correctNumber;
                    const isEmpty = showFeedback && !placement;
                    const mobileStepActive = isMobile && mobileActivityStep <= 3 && !page2Submitted;
                    
                    return (
                      <div
                        key={zone.id}
                        style={{
                          position: 'absolute',
                          left: `${zone.x}%`,
                          top: `${zone.y}%`,
                          transform: 'translate(-50%, -50%)',
                          cursor: (isMobile && mobileStepActive) || (!isMobile && (draggedNumber || currentNumberToPlace) && !page2Submitted) ? 'pointer' : undefined
                        }}
                        onClick={isMobile ? () => handleMobileDrop(zone.id) : undefined}
                      >
                        <div
                          onDragOver={!isMobile ? handleDragOver : undefined}
                          onDrop={!isMobile ? () => handleDrop(zone.id) : undefined}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: placement ? '#51727C' : 'transparent',
                            border: showFeedback 
                              ? (isCorrect ? '4px solid #548235' : isIncorrect ? '4px solid #C41904' : '4px solid #CE7C0A')
                              : '4px solid white',
                            boxShadow: placement ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(255, 255, 255, 0.5)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: placement ? 'white' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: (mobileStepActive || draggedNumber || currentNumberToPlace) && !page2Submitted ? 'pointer' : 'default',
                            opacity: 1
                          }}
                        >
                          {placement || '?'}
                        </div>
                        
                        {/* Show correct answer when incorrect or empty (desktop only; mobile has retry message) */}
                        {!isMobile && ((isIncorrect || isEmpty) && page2Submitted) && (
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
                            {t('floodControlPage.page2.correctLabel')} {zone.correctNumber}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Number selectors - desktop only; mobile uses step-by-step (fixed number per step) */}
                  {!isMobile && (
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
                      const isSelected = isMobile ? currentNumberToPlace === num : draggedNumber === num;
                      return (
                        <div key={`left-corner-${num}`}>
                          <div
                            draggable={!isMobile && !page2Submitted}
                            onDragStart={!isMobile ? () => handleDragStart(num) : undefined}
                            onDragEnd={!isMobile ? handleDragEnd : undefined}
                            onDragOver={!isMobile ? handleDragOver : undefined}
                            onDrop={!isMobile ? () => handleCornerDrop(num, 'left') : undefined}
                            onClick={isMobile ? () => setCurrentNumberToPlace(prev => prev === num ? null : num) : undefined}
                            className="font-bold transition-all duration-300 hover:opacity-80"
                            style={{
                              width: isMobile ? '44px' : '40px',
                              height: isMobile ? '44px' : '40px',
                              backgroundColor: '#51727C',
                              color: 'white',
                              borderRadius: '50%',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              fontSize: isMobile ? '22px' : '20px',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: page2Submitted ? 'not-allowed' : (isMobile ? 'pointer' : 'move'),
                              opacity: isSelected ? 0.5 : 1,
                              zIndex: 10
                            }}
                          >
                            {num}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  )}
                </div>
                )}

                {/* Right Image - show when showRightDrop */}
                {showRightDrop && (
                <div className="relative" style={{ width: isMobile ? '100%' : '45%', maxWidth: isMobile ? '400px' : '800px', display: 'inline-block', margin: isMobile ? '0 auto' : 0 }}>
                  <img 
                    src="/assets/components/Sponge/image2.png"
                    alt="Degraded floodplain"
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ backgroundColor: 'transparent', display: 'block' }}
                  />
                  
                  {/* Drop Zones for Right Image */}
                  {rightImageDropZones.map(zone => {
                    const placement = placements[zone.id];
                    const showFeedback = showPage2Feedback || (isMobile && (showLeftDrop || showRightDrop));
                    const isCorrect = showFeedback && placement === zone.correctNumber;
                    const isIncorrect = showFeedback && placement && placement !== zone.correctNumber;
                    const isEmpty = showFeedback && !placement;
                    const mobileStepActive = isMobile && mobileActivityStep <= 3 && !page2Submitted;
                    
                    return (
                      <div
                        key={zone.id}
                        style={{
                          position: 'absolute',
                          left: `${zone.x}%`,
                          top: `${zone.y}%`,
                          transform: 'translate(-50%, -50%)',
                          cursor: (isMobile && mobileStepActive) || (!isMobile && (draggedNumber || currentNumberToPlace) && !page2Submitted) ? 'pointer' : undefined
                        }}
                        onClick={isMobile ? () => handleMobileDrop(zone.id) : undefined}
                      >
                        <div
                          onDragOver={!isMobile ? handleDragOver : undefined}
                          onDrop={!isMobile ? () => handleDrop(zone.id) : undefined}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: placement ? '#51727C' : 'transparent',
                            border: showFeedback 
                              ? (isCorrect ? '4px solid #548235' : isIncorrect ? '4px solid #C41904' : '4px solid #CE7C0A')
                              : '4px solid white',
                            boxShadow: placement ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(255, 255, 255, 0.5)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: placement ? 'white' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: (mobileStepActive || draggedNumber || currentNumberToPlace) && !page2Submitted ? 'pointer' : 'default',
                            opacity: 1
                          }}
                        >
                          {placement || '?'}
                        </div>
                        
                        {/* Show correct answer when incorrect or empty (desktop only) */}
                        {!isMobile && ((isIncorrect || isEmpty) && page2Submitted) && (
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
                            {t('floodControlPage.page2.correctLabel')} {zone.correctNumber}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Number selectors - desktop only; mobile uses step-by-step */}
                  {!isMobile && (
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
                      const isSelected = draggedNumber === num;
                      return (
                        <div key={`right-corner-${num}`}>
                          <div
                            draggable={!isMobile && !page2Submitted}
                            onDragStart={!isMobile ? () => handleDragStart(num) : undefined}
                            onDragEnd={!isMobile ? handleDragEnd : undefined}
                            onDragOver={!isMobile ? handleDragOver : undefined}
                            onDrop={!isMobile ? () => handleCornerDrop(num, 'right') : undefined}
                            onClick={isMobile ? () => setCurrentNumberToPlace(prev => prev === num ? null : num) : undefined}
                            className="font-bold transition-all duration-300 hover:opacity-80"
                            style={{
                              width: isMobile ? '44px' : '40px',
                              height: isMobile ? '44px' : '40px',
                              backgroundColor: '#51727C',
                              color: 'white',
                              borderRadius: '50%',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              fontSize: isMobile ? '22px' : '20px',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: page2Submitted ? 'not-allowed' : (isMobile ? 'pointer' : 'move'),
                              opacity: isSelected ? 0.5 : 1,
                              zIndex: 10
                            }}
                          >
                            {num}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  )}
                </div>
                )}
              </div>

              {/* Descriptions with Draggable Numbers - only on desktop (mobile uses in-image numbers) */}
              {!isMobile && (
              <div className="flex justify-center gap-8 mt-4">
                {/* Left Descriptions */}
                <div style={{ width: '45%', maxWidth: '800px', paddingLeft: '10px' }}>
                  <h4 className="font-bold text-blue-900 mb-4" style={{ fontSize: '20px' }}>{t('floodControlPage.page2.naturalFloodplain')}</h4>
                  {leftDescriptionsTranslated.map((desc, index) => (
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
                  <h4 className="font-bold text-blue-900 mb-4" style={{ fontSize: '20px' }}>{t('floodControlPage.page2.degradedFloodplain')}</h4>
                  {rightDescriptionsTranslated.map((desc, index) => (
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
              )}

              {/* Feedback Summary - desktop only; mobile has per-zone immediate feedback */}
              {!isMobile && showPage2Feedback && (() => {
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
                        <span style={{ fontSize: '22px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#548235' }}>
                          {correctCount} {t('floodControlPage.page2.correct')}
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
                        <span style={{ fontSize: '22px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#C41904' }}>
                          {incorrectCount} {t('floodControlPage.page2.incorrect')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Mobile: In-content Next - step-by-step flow: show when all 3 numbers placed correctly */}
              {isMobile && (showLeftDrop || showRightDrop) && mobileActivityStep > 3 && (
                <div className="flex justify-center" style={{ marginTop: '24px', paddingBottom: '24px' }}>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
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
                      width: '100%',
                      maxWidth: '280px'
                    }}
                  >
                    {t('common.next')}
                  </button>
                </div>
              )}
            </>
          ) : showFillBlank ? (
            <>
              {/* Page 3/5 Content - Fill in the Blank */}
              {/* Title above white box */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center" style={{ gap: isMobile ? '8px' : '10px' }}>
                  <img 
                    src="/assets/icons/pencil.png" 
                    alt="Pencil" 
                    style={{ 
                      width: isMobile ? '50px' : '84px',
                      height: isMobile ? '50px' : '84px',
                      backgroundColor: 'transparent'
                    }} 
                  />
                  <h2 style={{
                    fontSize: isMobile ? '22px' : '48px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: isMobile ? '600' : 'bold',
                    color: isMobile ? '#5a7a5a' : '#406A46',
                    margin: 0
                  }}>
                    {t('floodControlPage.page3.title')}
                  </h2>
                </div>
              </div>

              <div className="flex justify-center mb-8">
                <div style={{
                  backgroundColor: '#F5F5F5',
                  borderRadius: isMobile ? '16px' : '24px',
                  padding: isMobile ? '24px 16px' : '40px 60px',
                  maxWidth: '1000px',
                  width: isMobile ? '100%' : undefined,
                  margin: isMobile ? '0 16px' : 0,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                  <p style={{
                    fontSize: isMobile ? '14px' : '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: isMobile ? '600' : 'bold',
                    color: isMobile ? '#5a7a5a' : '#406A46',
                    lineHeight: '1.6',
                    margin: '0 0 20px',
                    textAlign: 'center'
                  }}>
                    {t('floodControlPage.page3.intro1')}
                  </p>
                  <p style={{
                    fontSize: isMobile ? '14px' : '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: isMobile ? '600' : 'bold',
                    color: isMobile ? '#5a7a5a' : '#406A46',
                    lineHeight: '1.8',
                    margin: '0 0 30px',
                    textAlign: 'center'
                  }}>
                    {t('floodControlPage.page3.intro2')}<br />
                    {t('floodControlPage.page3.intro3')}
                  </p>
                  <p style={{
                    fontSize: isMobile ? '14px' : '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: isMobile ? '600' : 'bold',
                    color: isMobile ? '#5a7a5a' : '#406A46',
                    textAlign: 'center',
                    margin: '0 0 30px'
                  }}>
                    {t('floodControlPage.page3.completeSentence')}
                  </p>

                  {/* Fill in the blank inputs */}
                  <div style={{
                    fontSize: isMobile ? '15px' : '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: isMobile ? '600' : 'bold',
                    lineHeight: '2',
                    textAlign: 'center',
                    color: isMobile ? '#5a7a5a' : '#406A46'
                  }}>
                    <p style={{ margin: 0 }}>
                      {t('floodControlPage.page3.sentence1')}{' '}
                      <input
                        type="text"
                        value={answer1}
                        onChange={(e) => !page3Submitted && setAnswer1(e.target.value)}
                        disabled={page3Submitted}
                        style={{
                          width: getInputWidth(),
                          padding: isMobile ? '6px 12px' : '8px 16px',
                          fontSize: isMobile ? '16px' : '20px',
                          textAlign: 'center',
                          border: showPage3Feedback 
                            ? (isAnswer1Correct() ? '3px solid #548235' : '3px solid #C41904')
                            : '2px solid #51727C',
                          borderRadius: '8px',
                          backgroundColor: page3Submitted ? '#f3f4f6' : 'white',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          display: 'inline-block',
                          verticalAlign: 'middle'
                        }}
                        placeholder={t('floodControlPage.page3.placeholder1')}
                      />
                      {' '}{t('floodControlPage.page3.sentence1End')}{' '}
                      {t('floodControlPage.page3.sentence2')}{' '}
                      <input
                        type="text"
                        value={answer2}
                        onChange={(e) => !page3Submitted && setAnswer2(e.target.value)}
                        disabled={page3Submitted}
                        style={{
                          width: getInputWidth(),
                          padding: isMobile ? '6px 12px' : '8px 16px',
                          fontSize: isMobile ? '16px' : '20px',
                          textAlign: 'center',
                          border: showPage3Feedback 
                            ? (isAnswer2Correct() ? '3px solid #548235' : '3px solid #C41904')
                            : '2px solid #51727C',
                          borderRadius: '8px',
                          backgroundColor: page3Submitted ? '#f3f4f6' : 'white',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          display: 'inline-block',
                          verticalAlign: 'middle'
                        }}
                        placeholder={t('floodControlPage.page3.placeholder2')}
                      />
                      {' '}{t('floodControlPage.page3.sentence2End')}
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
                              width: isMobile ? '26px' : '32px',
                              height: isMobile ? '26px' : '32px'
                            }}
                          >
                            {isAnswer1Correct() ? (
                              <svg width={isMobile ? '14' : '20'} height={isMobile ? '14' : '20'} viewBox="0 0 16 16" fill="none">
                                <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <svg width={isMobile ? '14' : '20'} height={isMobile ? '14' : '20'} viewBox="0 0 16 16" fill="none">
                                <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                              </svg>
                            )}
                          </div>
                          <span style={{ 
                            fontSize: isMobile ? '14px' : '20px', 
                            fontWeight: '600', 
                            color: isAnswer1Correct() ? '#548235' : '#C41904' 
                          }}>
                            {isAnswer1Correct() ? t('floodControlPage.page3.feedback.correctSponge') : t('floodControlPage.page3.feedback.incorrectSponge')}
                          </span>
                        </div>

                        {/* Answer 2 feedback */}
                        <div className="flex items-center" style={{ gap: '12px' }}>
                          <div className="flex items-center justify-center rounded-full" 
                            style={{ 
                              backgroundColor: isAnswer2Correct() ? '#548235' : '#C41904',
                              width: isMobile ? '26px' : '32px',
                              height: isMobile ? '26px' : '32px'
                            }}
                          >
                            {isAnswer2Correct() ? (
                              <svg width={isMobile ? '14' : '20'} height={isMobile ? '14' : '20'} viewBox="0 0 16 16" fill="none">
                                <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <svg width={isMobile ? '14' : '20'} height={isMobile ? '14' : '20'} viewBox="0 0 16 16" fill="none">
                                <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                              </svg>
                            )}
                          </div>
                          <span style={{ 
                            fontSize: isMobile ? '14px' : '20px', 
                            fontWeight: '600', 
                            color: isAnswer2Correct() ? '#548235' : '#C41904' 
                          }}>
                            {isAnswer2Correct() ? t('floodControlPage.page3.feedback.correctFlooding') : t('floodControlPage.page3.feedback.incorrectFlooding')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Mobile: In-content Next / Check Answers for fill - no footer on mobile. Last page: back to home */}
              {isMobile && (page3Submitted || (answer1.trim() && answer2.trim())) && (
                <div className="flex justify-center" style={{ marginTop: '16px', marginBottom: '24px' }}>
                  <button
                    onClick={() => {
                      if (!page3Submitted && answer1.trim() && answer2.trim()) {
                        handleSubmitPage3();
                      } else if (currentPage === TOTAL_PAGES) {
                        onHomeClick();
                      } else {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
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
                      width: '100%',
                      maxWidth: '280px'
                    }}
                  >
                    {!page3Submitted ? t('floodControlPage.page3.checkAnswers') : currentPage === TOTAL_PAGES ? t('common.backToHome') : t('common.next')}
                  </button>
                </div>
              )}
            </>
          ) : null}
        </motion.div>
      </div>

      {/* Pagination and Next Button - Sticky Footer - Desktop only (hidden on mobile; mobile uses in-content buttons only) */}
      {currentPage > 0 && !isMobile && (
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
        <div className="relative flex justify-between items-center" style={{ maxWidth: '100%', width: '100%', paddingLeft: isMobile ? '16px' : '100px', paddingRight: isMobile ? '16px' : '100px' }}>
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
                      width: 'auto',
                      height: '50px',
                      backgroundColor: 'transparent',
                      border: 'none',
                        cursor: 'pointer',
                        flexShrink: 0
                    }}
                  >
                    <LocalizedImage 
                      src="/assets/icons/download.png" 
                      alt="Download" 
                      style={{ 
                        width: 'auto',
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
                      {t('floodControlPage.nextTopic')}
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
            <div className="flex items-center" style={{ paddingRight: '16px', gap: '16px' }}>
              {/* Retry Button */}
              <button
                onClick={handleRetry}
                className="retry-button relative flex items-center justify-center z-50"
                style={{
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <LocalizedImage
                  src="/assets/icons/tryagain.png"
                  alt={t('common.tryAgain')}
                  style={{
                    height: '60px',
                    width: 'auto',
                    opacity: 1,
                    objectFit: 'contain'
                  }}
                />
              </button>
              <button
                onClick={() => {
                  if (onCarbonClick) {
                    onCarbonClick();
                  }
                }}
                className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: 'auto',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <LocalizedImage
                  src="/assets/icons/next.png"
                  alt="Climate protection and carbon sink"
                  style={{
                    width: 'auto',
                    height: '60px',
                    opacity: 1
                  }}
                />
              </button>
            </div>
          )}

          {/* Check Answers / Next Button - Right - Only during activities */}
          {!(currentPage === TOTAL_PAGES && page3Submitted) && (
            <div className="flex items-center" style={{ paddingRight: '16px', gap: '16px' }}>
              {/* Retry Button - Show when page 2 is submitted */}
              {(showLeftDrop || showRightDrop) && page2Submitted && (
                <button
                  onClick={handleRetry}
                  className="retry-button relative flex items-center justify-center z-50"
                  style={{
                    height: '60px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <LocalizedImage 
                    src="/assets/icons/tryagain.png" 
                    alt={t('common.tryAgain')} 
                    style={{ 
                      height: '60px',
                      width: 'auto',
                      opacity: 1,
                      objectFit: 'contain'
                    }}
                  />
                </button>
              )}
              {(showLeftDrop || showRightDrop) ? (
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
                  width: 'auto',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
              >
                <LocalizedImage 
                  src="/assets/icons/next.png" 
                  alt={page2Submitted ? 'Next' : 'Check Answers'} 
                  style={{ 
                    width: 'auto',
                    height: '60px',
                    opacity: page2Submitted || Object.keys(placements).length >= 6 ? 1 : 0.5
                  }}
                />
              </button>
            ) : showFillBlank ? (
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
                  width: 'auto',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
              >
                <LocalizedImage 
                  src="/assets/icons/next.png" 
                  alt="Check Answers" 
                  style={{ 
                    width: 'auto',
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
                  width: 'auto',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
              >
                <LocalizedImage 
                  src="/assets/icons/next.png" 
                  alt="Next" 
                  style={{ 
                    width: 'auto',
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
              {t('floodControlPage.modal.title')}
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
                  {t('floodControlPage.modal.basedOn5E')}
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
                  alt={t('floodControlPage.modal.exploreRepository')} 
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
                  {t('floodControlPage.modal.exploreRepository')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {t('floodControlPage.modal.exploreRelated')}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
