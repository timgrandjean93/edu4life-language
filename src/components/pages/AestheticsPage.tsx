import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePageRouting } from '../../hooks/usePageRouting';
import { LocalizedImage } from '../LocalizedImage';
import { useLocalizedImage } from '../../utils/localizedImage';

interface AestheticsPageProps {
  onHomeClick: () => void;
  onArtClick?: () => void;
  onRepositoryClick?: () => void;
}

const TOTAL_PAGES = 2;

export const AestheticsPage: React.FC<AestheticsPageProps> = ({
  onHomeClick,
  onArtClick,
  onRepositoryClick
}) => {
  const { t } = useTranslation();
  const wavesImage = useLocalizedImage('/assets/components/aesthetics/WAVES.png');
  const ess2Image = useLocalizedImage('/assets/components/aesthetics/ess2.png');
  const [currentPage, setCurrentPage] = usePageRouting(TOTAL_PAGES);
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [droppedItems, setDroppedItems] = React.useState<Record<string, string>>({});
  const [showValidation, setShowValidation] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [iconPositions, setIconPositions] = React.useState<Record<string, { x: number; y: number }>>({});
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
  
  // Page 2 - Magnifying Glass states
  const [revealedIcons, setRevealedIcons] = React.useState<Set<string>>(new Set());
  const [magnifierPosition, setMagnifierPosition] = React.useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = React.useState(false);
  const [imageDimensions, setImageDimensions] = React.useState({ width: 0, height: 0 });
  const imageRef = React.useRef<HTMLDivElement>(null);
  // Track how long the magnifier has hovered over each discovery zone
  const revealDurationsRef = React.useRef<Record<string, number>>({});
  const lastMoveTimeRef = React.useRef<number | null>(null);

  // Ecosystem services data for drag and drop
  const ecosystemServices = [
    { id: 'tourism', name: t('aestheticsPage.ecosystemServices.tourism'), category: 'cultural', icon: '/assets/components/aesthetics/icons/tourism.png' },
    { id: 'recreation', name: t('aestheticsPage.ecosystemServices.recreation'), category: 'cultural', icon: '/assets/components/aesthetics/icons/recreation.png' },
    { id: 'landscape', name: t('aestheticsPage.ecosystemServices.landscape'), category: 'cultural', icon: '/assets/components/aesthetics/icons/landscape.png' },
    { id: 'climate', name: t('aestheticsPage.ecosystemServices.climate'), category: 'regulating', icon: '/assets/components/aesthetics/icons/climate.png' },
    { id: 'carbon', name: t('aestheticsPage.ecosystemServices.carbon'), category: 'regulating', icon: '/assets/components/aesthetics/icons/carbon.png' },
    { id: 'nutrient', name: t('aestheticsPage.ecosystemServices.nutrient'), category: 'regulating', icon: '/assets/components/aesthetics/icons/nutrient.png' },
    { id: 'flood', name: t('aestheticsPage.ecosystemServices.flood'), category: 'regulating', icon: '/assets/components/aesthetics/icons/flood.png' },
    { id: 'habitat', name: t('aestheticsPage.ecosystemServices.habitat'), category: 'regulating', icon: '/assets/components/aesthetics/icons/habitat.png' },
    { id: 'water', name: t('aestheticsPage.ecosystemServices.water'), category: 'provisioning', icon: '/assets/components/aesthetics/icons/groundwater.png' },
    { id: 'fish', name: t('aestheticsPage.ecosystemServices.fish'), category: 'provisioning', icon: '/assets/components/aesthetics/icons/fish.png' },
    { id: 'agriculture', name: t('aestheticsPage.ecosystemServices.agriculture'), category: 'provisioning', icon: '/assets/components/aesthetics/icons/agriculture.png' },
    { id: 'timber', name: t('aestheticsPage.ecosystemServices.timber'), category: 'provisioning', icon: '/assets/components/aesthetics/icons/timber.png' }
  ];

// Page 2: Hidden icons positions (all in percentages)
const hiddenIconsData: Record<string, { 
    x: number; // Icon center position X (%) in image
    y: number; // Icon center position Y (%) in image
    labelPosition: { left: number; top: number }; // Where to show when revealed (% of image)
  }> = {
  'tourism': { x: 55, y: 10, labelPosition: { left: 79.5, top: 92 } },
  'recreation': { x: 24, y: 60, labelPosition: { left: 79.5, top: 78 } },
  'landscape': { x: 47, y: 65, labelPosition: { left: 79.5, top: 64 } },
  'climate': { x: 60, y: 50, labelPosition: { left: 20.5, top: 81 } },
  'carbon': { x: 40, y: 85, labelPosition: { left: 20.5, top: 67 } },
  'nutrient': { x: 35, y: 60, labelPosition: { left: 20.5, top: 53 } },
  'flood': { x: 35, y: 8, labelPosition: { left: 20.5, top: 25 } },
  'habitat': { x: 55, y: 73, labelPosition: { left: 20.5, top: 39 } },
  'water': { x: 20, y: 90, labelPosition: { left: 79.5, top: 8 } },
  'fish': { x:65, y: 80, labelPosition: { left: 79.5, top: 22 } },
  'agriculture': { x: 65, y: 20, labelPosition: { left: 79.5, top: 36 } },
  'timber': { x: 75, y: 60, labelPosition: { left: 79.5, top: 50 } }
  };


  // Page 2: Magnifying glass handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // As percentage
    const y = ((e.clientY - rect.top) / rect.height) * 100; // As percentage
    
    setMagnifierPosition({ x, y });

    // Time-based reveal: require 1.5s inside discovery zone
    const now = performance.now();
    const dt = lastMoveTimeRef.current ? now - lastMoveTimeRef.current : 0;
    lastMoveTimeRef.current = now;

    const durations = revealDurationsRef.current;
    Object.entries(hiddenIconsData).forEach(([iconId, data]) => {
      if (revealedIcons.has(iconId)) return; // Already revealed
      // Consider icon "in view" when it's within the magnifier circle (~15% radius)
      const dx = data.x - x;
      const dy = data.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const inside = distance <= 15; // same radius used for showing magnified icons
      if (inside) {
        durations[iconId] = (durations[iconId] || 0) + dt;
        if (durations[iconId] >= 1000) {
          setRevealedIcons(prev => new Set([...prev, iconId]));
        }
      } else {
        durations[iconId] = 0;
      }
    });
  };

  const handleMouseEnterImage = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeaveImage = () => {
    setShowMagnifier(false);
  };

  // Download modal handlers
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink = () => {
    window.open('https://doi.org/10.5281/zenodo.17453700', '_blank');
    setShowDownloadModal(false);
  };

  const handleDashboardLink = () => {
    setShowDownloadModal(false);
    if (onRepositoryClick) {
      onRepositoryClick();
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    setHoveredItem(null);
    e.dataTransfer.effectAllowed = 'move';
    // Use default drag image so icon remains visible while dragging across containers
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetServiceId: string) => {
    e.preventDefault();
    if (draggedItem) {
      // Check if target zone is already occupied
      const existingItem = Object.entries(droppedItems).find(([, targetId]) => targetId === targetServiceId);
      
      // Remove old item from that zone if it exists
      const newItems = { ...droppedItems };
      if (existingItem) {
        delete newItems[existingItem[0]];
      }
      
      // Add new item to the zone
      newItems[draggedItem] = targetServiceId;
      
      setDroppedItems(newItems);
      setDraggedItem(null);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setDroppedItems(prev => {
      const newItems = { ...prev };
      delete newItems[itemId];
      return newItems;
    });
  };

  // Check if item is correctly placed
  const isItemCorrect = (itemId: string): boolean => {
    const droppedServiceId = droppedItems[itemId];
    // Item is correct if it's dropped in its own zone (itemId === droppedServiceId)
    return itemId === droppedServiceId;
  };

  // Check if all items are placed
  const allItemsPlaced = Object.keys(droppedItems).length === ecosystemServices.length;

  // Retry function to reset activity
  const handleRetry = () => {
    if (currentPage === 1) {
      setDroppedItems({});
      setShowValidation(false);
      setHoveredItem(null);
      setDraggedItem(null);
      setIconPositions({}); // Reset positions so they get regenerated
    }
  };

  // Show validation when all items are placed
  React.useEffect(() => {
    if (currentPage === 1 && allItemsPlaced && !showValidation) {
      setShowValidation(true);
    }
  }, [allItemsPlaced, showValidation, currentPage]);

  // Fixed positions for icons (in percentages relative to waves container)
  React.useEffect(() => {
    if (currentPage === 1 && Object.keys(iconPositions).length === 0) {
      // Define fixed positions for each icon (x, y as percentages)
      // These positions are relative to the waves container
      const fixedPositions: Record<string, { x: number; y: number }> = {
        'tourism': { x: 80, y: 60 },
        'recreation': { x: 20, y: 25 },
        'landscape': { x: 60, y: 25 },
        'climate': { x: 15, y: 80},
        'carbon': { x: 90, y: 25 },
        'nutrient': { x: 0, y: 0 },
        'flood': { x: 40, y: 0 },
        'habitat': { x: 70, y: 80 },
        'water': { x: 70, y: 0 },
        'fish': { x: 15, y: 0 },
        'agriculture': { x: 50, y: 80 },
        'timber': { x: 30, y: 60 }
      };
      
      setIconPositions(fixedPositions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Reset validation when leaving page 1
  React.useEffect(() => {
    if (currentPage !== 1) {
      setShowValidation(false);
      setDroppedItems({});
      setHoveredItem(null);
      setDraggedItem(null);
      setIconPositions({}); // Reset positions so they get regenerated
    }
  }, [currentPage]);

  // Reset revealed icons when entering page 2
  React.useEffect(() => {
    if (currentPage === 2) {
      setRevealedIcons(new Set()); // Reset revealed icons when entering page 2
      setShowMagnifier(false);
    }
  }, [currentPage]);

  // Track image dimensions for page 2
  React.useEffect(() => {
    if (currentPage === 2) {
      const updateDimensions = () => {
        if (imageRef.current) {
          const rect = imageRef.current.getBoundingClientRect();
          setImageDimensions({ width: rect.width, height: rect.height });
        }
      };
      
      // Initial update
      const timer = setTimeout(updateDimensions, 100);
      
      // Update on resize
      window.addEventListener('resize', updateDimensions);
      
      // Also update on image load
      if (imageRef.current) {
        const img = imageRef.current.querySelector('img');
        if (img) {
          img.addEventListener('load', updateDimensions);
        }
      }
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, [currentPage]);


  // Set page background and animations
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
    
    // Add basic animation styles
    const style = document.createElement('style');
    style.textContent = `
      .drag-icon {
        transition: all 0.3s ease;
        cursor: grab;
      }
      
      .drag-icon:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(84, 130, 53, 0.3);
      }
      
      .drag-icon.being-dragged {
        opacity: 0.3;
        transform: scale(0.9);
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.5);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      html.style.minHeight = "";
      html.style.height = "";
      body.style.minHeight = "";
      body.style.height = "";
      body.style.backgroundColor = "";
      
      // Remove the style element
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'visible', paddingBottom: '0px' }}>
      {/* Header with title and home button */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
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
                  {currentPage === 0 ? t('aestheticsPage.title.page0') :
                   currentPage === 1 ? t('aestheticsPage.title.page1') :
                   t('aestheticsPage.title.page2')}
                </motion.h1>
                
                {/* Activity description - Only for page 1 */}
                {currentPage === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      lineHeight: '1.4',
                      textAlign: 'center',
                      marginTop: '20px',
                      marginBottom: '10px',
                      width: '100%',
                      padding: '0 20px'
                    }}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <img 
                        src="/assets/icons/pointer.png" 
                        alt="Pointer" 
                        style={{ 
                          width: '60px', 
                          height: '60px',
                          marginRight: '16px'
                        }}
                      />
                      <h3 style={{ 
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '36px', 
                        fontWeight: 'bold', 
                        color: '#406A46',
                        margin: 0,
                        lineHeight: '1.1'
                      }}                      >
                        {t('aestheticsPage.page1.activityQuestion')}
                      </h3>
              </div>
                    <div style={{ color: '#548235' }}>
                      {t('aestheticsPage.page1.activityInstruction')}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8" style={{ flex: 1, paddingBottom: '10px' }}>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {currentPage === 0 ? (
            // Intro Page: Introduction with landing.png, description, and CTA button
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Single Illustration - Centered */}
              <div className="flex justify-center mb-8" style={{ width: '100%', maxWidth: '600px' }}>
                <div style={{ width: '100%', maxWidth: '600px' }}>
                  <LocalizedImage 
                    src="/assets/components/aesthetics/landing.png"
                    alt="Aesthetics"
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
                {t('aestheticsPage.intro.description')}
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
                      {t('aestheticsPage.intro.accessTeachingMaterials')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a
                        href="https://doi.org/10.5281/zenodo.17453700"
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
                        {t('aestheticsPage.intro.openPlatform')}
                      </a>
                    </div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '14px',
                      color: '#406A46',
                      fontStyle: 'italic'
                    }}>
                      {t('aestheticsPage.intro.opensNewTab')}
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
                      {t('aestheticsPage.intro.exploreRepository')}
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
                        {t('aestheticsPage.intro.explore')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : currentPage === 1 ? (
            // Page 1: Drag and Drop Interface
            <div className="w-full">
              {/* Original Description Text */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#548235',
                textAlign: 'center',
                marginBottom: '20px',
                width: '100%',
                lineHeight: '1.6'
              }}>
                {t('aestheticsPage.page1.description')}
                <br />
                • <span style={{ color: '#D2847A' }}>{t('aestheticsPage.page1.provisioningServices')}</span> – {t('aestheticsPage.page1.provisioningDescription')}
                <br />
                • <span style={{ color: '#548235' }}>{t('aestheticsPage.page1.regulatingServices')}</span> – {t('aestheticsPage.page1.regulatingDescription')}
                <br />
                • <span style={{ color: '#406BB8' }}>{t('aestheticsPage.page1.culturalServices')}</span> – {t('aestheticsPage.page1.culturalDescription')}
              </div>

              {/* Main Drag and Drop Area */}
              <div className="flex gap-8 drag-drop-container" style={{ minHeight: '500px', alignItems: 'center' }}>
                {/* Left Side - Draggable Icons */}
                <div style={{ width: '45%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '500px' }}>
                  {/* Icons Container with Waves Background */}
                  <div 
                    className="waves-container"
                    style={{
                      position: 'relative',
                      width: '60%',
                      aspectRatio: '1 / 1',
                      backgroundImage: `url(${wavesImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '12px',
                      overflow: 'visible'
                    }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                      {ecosystemServices.map((service) => {
                        const isDropped = droppedItems[service.id];
                        const isBeingDragged = draggedItem === service.id;
                        const position = iconPositions[service.id];
                        
              if (!position) return null; // Don't render until position is calculated
              
              // Positions are already in percentages
              const leftPercent = position.x;
              const topPercent = position.y;
                        
                        return (
                          <div
                            key={service.id}
                            draggable={!isDropped}
                            onDragStart={(e) => !isDropped && handleDragStart(e, service.id)}
                            onDragEnd={handleDragEnd}
                            onMouseEnter={() => !isDropped && !draggedItem && setHoveredItem(service.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                              position: 'absolute',
                              left: `${leftPercent}%`,
                              top: `${topPercent}%`,
                              width: '15%',
                              paddingBottom: '15%',
                              borderRadius: '50%',
                              cursor: isDropped ? 'not-allowed' : 'grab',
                              opacity: isDropped ? 0.3 : isBeingDragged ? 0.3 : 1,
                              transition: 'all 0.3s ease',
                              backgroundImage: `url(${service.icon})`,
                              backgroundSize: '100%',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              transform: hoveredItem === service.id && !draggedItem ? 'scale(1.1)' : 'scale(1)',
                              boxShadow: hoveredItem === service.id && !draggedItem ? '0 6px 20px rgba(84, 130, 53, 0.3)' : 'none',
                              filter: isDropped ? 'grayscale(50%)' : 'none',
                              zIndex: hoveredItem === service.id || isBeingDragged ? 10 : 1
                            }}
                            className={`drag-icon ${isBeingDragged ? 'being-dragged' : ''}`}
                            title={service.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Side - ESS Image with Drop Zones */}
                <div style={{ width: '55%', display: 'flex', justifyContent: 'center' }}>
                  {/* Container that scales with image */}
                  <div style={{ 
                    width: '80%', 
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    {/* ESS Background Image */}
                    <LocalizedImage 
                      src="/assets/components/aesthetics/ess.png"
                      alt="Ecosystem Services"
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '12px',
                        display: 'block'
                      }}
                    />
                    
                    {/* Drop Zones positioned over the image */}
                    {ecosystemServices.map((service, index) => {
                      // Find which item (if any) was dropped in THIS zone
                      const droppedItem = Object.entries(droppedItems).find(([, targetId]) => targetId === service.id);
                      const isOccupied = droppedItem !== undefined;
                      const droppedItemId = droppedItem ? droppedItem[0] : null;
                      const droppedItemService = droppedItemId ? ecosystemServices.find(s => s.id === droppedItemId) : null;
                      const isCorrect = showValidation && isOccupied && droppedItemId === service.id;
                      
                      // Define positions for each service (percentages relative to image)
                      const positions = [
                        { left: '41.5%', top: '12.5%' },   // Tourism
                        { left: '30.5%', top: '23%' },  // Recreation and fishing
                        { left: '23.5%', top: '41%' },  // Landscape aesthetics
                        { left: '24.5%', top: '63%' },   // Climate regulation
                        { left: '31.3%', top: '77.6%' },  // Carbon sequestration
                        { left: '43.7%', top: '87%' },  // Nutrient retention
                        { left: '70.5%', top: '79%' },   // Flood regulation
                        { left: '57%', top: '89%' },  // Habitat provision
                        { left: '60%', top: '12.5%' },  // Surface and groundwater
                        { left: '71%', top: '25%' },   // Fish
                        { left: '77.5%', top: '40%' },  // Agriculture
                        { left: '78.5%', top: '60%' }   // Timber
                      ];
                      
                      const position = positions[index];
                      
                      return (
                        <div
                          key={service.id}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, service.id)}
                          style={{
                            position: 'absolute',
                            left: position.left,
                            top: position.top,
                            width: '10%',
                            paddingBottom: '10%',
                            borderRadius: '50%',
                            border: 'none',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          {/* Dropped Icon */}
                          {isOccupied && droppedItemService && (
                            <div
                              onClick={() => !showValidation && droppedItemId && handleRemoveItem(droppedItemId)}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                backgroundImage: `url(${droppedItemService.icon})`,
                                backgroundSize: '100%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                cursor: showValidation ? 'default' : 'pointer',
                                boxShadow: showValidation ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.3)',
                                border: showValidation ? `4px solid ${isCorrect ? '#4CAF50' : '#F44336'}` : 'none',
                                transition: 'all 0.3s ease'
                              }}
                              title={showValidation ? (isCorrect ? t('aestheticsPage.page1.correctTooltip') : t('aestheticsPage.page1.incorrectTooltip')) : t('aestheticsPage.page1.clickToRemove')}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Results Display */}
              {showValidation && (
                <div style={{
                  marginTop: '40px',
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center'
                }}>
                  <h4 style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#548235',
                    marginBottom: '16px'
                  }}>
                    {t('aestheticsPage.page1.results')}
                  </h4>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#548235',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>✓</div>
                      <span style={{
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#548235'
                      }}>
                        {Object.keys(droppedItems).filter(itemId => isItemCorrect(itemId)).length} {t('aestheticsPage.page1.correct')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#C41904',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>✗</div>
                      <span style={{
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#C41904'
                      }}>
                        {Object.keys(droppedItems).filter(itemId => !isItemCorrect(itemId)).length} {t('aestheticsPage.page1.incorrect')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Page 2: Magnifying Glass Treasure Hunt
            <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
              {/* Left Section - 25% */}
              <div style={{ width: '25%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Pointer Icon */}
                <div style={{ marginBottom: '20px' }}>
                  <img src="/assets/icons/pointer.png" alt="Pointer" style={{ width: '60px', height: '60px' }} />
                </div>
                
                {/* Instruction Text */}
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  textAlign: 'center',
                  lineHeight: '1.5',
                  marginBottom: '30px'
                }}>
                  {t('aestheticsPage.page2.instruction').split('\n').map((line, index, array) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < array.length - 1 && <><br /><br /></>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* Right Section - 75% */}
              <div style={{ width: '75%', position: 'relative' }}>
                {/* Zones toggle removed */}
                {/* Main Image Container - 90% of the column */}
                <div 
                  ref={imageRef}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnterImage}
                  onMouseLeave={handleMouseLeaveImage}
                  style={{ 
                    width: '90%',
                    margin: '0 auto',
                    position: 'relative',
                    cursor: 'none' // Hide default cursor
                  }}
                >
                {/* Main Landscape Image */}
                <LocalizedImage 
                  src="/assets/components/aesthetics/ess2.png"
                  alt="Floodplain Landscape"
                  style={{ 
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    display: 'block',
                    userSelect: 'none'
                  }}
                  draggable={false}
                />
                
                {/* Zones overlay removed */}

                {/* Hidden Icons (only visible when NOT revealed) */}
                {Object.entries(hiddenIconsData).map(([iconId, data]) => {
                  const service = ecosystemServices.find(s => s.id === iconId);
                  if (!service || revealedIcons.has(iconId)) return null; // Don't show if revealed
                  
                  return (
                    <div
                      key={iconId}
                      style={{
                        position: 'absolute',
                        left: `${data.x}%`,
                        top: `${data.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '2.5%',
                        paddingBottom: '2.5%',
                        backgroundImage: `url(${service.icon})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        opacity: 0.9,
                        pointerEvents: 'none',
                        zIndex: 5
                      }}
                    />
                  );
                })}
                
                {/* Magnifying Glass Effect */}
                {showMagnifier && imageRef.current && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${magnifierPosition.x}%`,
                      top: `${magnifierPosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '200px',
                      height: '200px',
                      pointerEvents: 'none',
                      zIndex: 100
                    }}
                  >
                    {/* Magnified content circle */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid #406A46',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                        backgroundColor: 'white'
                      }}
                    >
                      {/**
                       * Use a calibrated zoom that samples around the center correctly
                       * to avoid distortion. We compute the background position based
                       * on zoom so the point under the cursor stays centered.
                       */}
                      {(() => {
                        const zoom = 2; // 2x magnification
                        const lensSize = 200; // px (matches container)
                        const rect = imageRef.current!.getBoundingClientRect();
                        const imgW = rect.width;
                        const imgH = rect.height;
                        const cursorX = (magnifierPosition.x / 100) * imgW;
                        const cursorY = (magnifierPosition.y / 100) * imgH;
                        const bgW = imgW * zoom;
                        const bgH = imgH * zoom;
                        const bgPosX = Math.max(0, Math.min(bgW - lensSize, cursorX * zoom - lensSize / 2));
                        const bgPosY = Math.max(0, Math.min(bgH - lensSize, cursorY * zoom - lensSize / 2));
                        return (
                          <div
                            style={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backgroundImage: `url(${ess2Image})`,
                              backgroundSize: `${bgW}px ${bgH}px`,
                              backgroundPosition: `-${bgPosX}px -${bgPosY}px`,
                              backgroundRepeat: 'no-repeat'
                            }}
                          />
                        );
                      })()}
                      
                      {/* Magnified icons */}
                      {Object.entries(hiddenIconsData).map(([iconId, data]) => {
                        const service = ecosystemServices.find(s => s.id === iconId);
                        if (!service || revealedIcons.has(iconId)) return null;
                        
                        // Calculate if icon is near the magnifier position
                        const dx = data.x - magnifierPosition.x;
                        const dy = data.y - magnifierPosition.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        // Only show icons within magnifier view (roughly 15% radius)
                        if (distance > 15) return null;
                        
                        // Calculate position within magnifier using image pixel metrics to avoid distortion
                        const zoom = 2;
                        const lensSize = 200; // px
                        const rect = imageRef.current!.getBoundingClientRect();
                        const imgW = rect.width;
                        const imgH = rect.height;
                        const cursorX = (magnifierPosition.x / 100) * imgW;
                        const cursorY = (magnifierPosition.y / 100) * imgH;
                        const iconX = (data.x / 100) * imgW;
                        const iconY = (data.y / 100) * imgH;
                        const dxPx = (iconX - cursorX) * zoom;
                        const dyPx = (iconY - cursorY) * zoom;
                        const leftPx = lensSize / 2 + dxPx;
                        const topPx = lensSize / 2 + dyPx;
                        // Keep icon physical size equal to base image icons (~2.5% of image width),
                        // then apply zoom so they appear magnified consistently
                        const baseIconPx = imgW * 0.025;
                        const iconSizePx = baseIconPx * zoom;
                        
                        return (
                          <div
                            key={`magnified-${iconId}`}
                            style={{
                              position: 'absolute',
                              left: `${leftPx}px`,
                              top: `${topPx}px`,
                              transform: 'translate(-50%, -50%)',
                              width: `${iconSizePx}px`,
                              height: `${iconSizePx}px`,
                              backgroundImage: `url(${service.icon})`,
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              opacity: 1,
                              pointerEvents: 'none'
                            }}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Removed the magnifying glass frame image overlay */}
                  </div>
                )}
                </div>
                
                {/* Revealed Icons Overlay - positioned over the image */}
                {imageDimensions.width > 0 && Object.entries(hiddenIconsData).map(([iconId, data]) => {
                  if (!revealedIcons.has(iconId)) return null;
                  const service = ecosystemServices.find(s => s.id === iconId);
                  if (!service) return null;
                  
                  // Calculate size as 4.5% width and 9% height relative to image
                  const iconWidth = imageDimensions.width * 0.07;
                  const iconHeight = imageDimensions.width * 0.14;
                  
                  return (
                    <div
                      key={`revealed-${iconId}`}
                      style={{
                        position: 'absolute',
                        left: `${data.labelPosition.left}%`,
                        top: `${data.labelPosition.top}%`,
                        transform: 'translate(-50%, -50%)',
                        animation: 'fadeIn 0.5s ease-in',
                        zIndex: 10,
                        pointerEvents: 'none'
                      }}
                    >
                      <LocalizedImage 
                        src={service.icon}
                        alt={service.name}
                        style={{
                          width: `${iconWidth}px`,
                          height: `${iconHeight}px`,
                          objectFit: 'contain',
                          display: 'block'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Pagination and Navigation - Sticky Footer - Outside container for full width */}
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
          {currentPage === TOTAL_PAGES && revealedIcons.size === Object.keys(hiddenIconsData).length ? (
            // Completion state: Show download button, pagination, and NEXT TOPIC text
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
                  const isDisabled = false; // All pages accessible when all icons discovered
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isDisabled) {
                          setCurrentPage(pageNum);
                        }
                      }}
                      className="transition-all duration-300 p-0 border-0 bg-transparent"
                      aria-label={`Go to page ${pageNum}`}
                      disabled={isDisabled}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        padding: 0,
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        opacity: isDisabled ? 0.4 : 1
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
                      {t('aestheticsPage.nextTopic')}
                    </span>
                  </div>
                )}
              </>
          ) : (
            // Normal state: Show only pagination dots
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

          {/* Next Button - Right */}
          {currentPage < TOTAL_PAGES && (
            <div className="flex items-center" style={{ paddingRight: '16px', gap: '16px' }}>
              {/* Retry Button - Show when validation is active */}
              {showValidation && currentPage === 1 && (
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
              <button
                onClick={() => {
                  const isDisabled = currentPage === 1 && !allItemsPlaced;
                  if (!isDisabled) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                disabled={currentPage === 1 && !allItemsPlaced}
                className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: 'auto',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: (currentPage === 1 && !allItemsPlaced) ? 'not-allowed' : 'pointer'
                }}
              >
                <LocalizedImage 
                  src="/assets/icons/next.png" 
                  alt="Next" 
                  style={{ 
                    width: 'auto',
                    height: '60px',
                    opacity: (currentPage === 1 && !allItemsPlaced) ? 0.3 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                />
              </button>
            </div>
          )}
          {/* Next Button for Art page - Only when all icons discovered on page 2 */}
          {currentPage === TOTAL_PAGES && revealedIcons.size === Object.keys(hiddenIconsData).length && onArtClick && (
            <div className="flex items-center" style={{ paddingRight: '16px' }}>
              <button
                onClick={onArtClick}
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
                  alt="Next" 
                  style={{ 
                    width: 'auto',
                    height: '60px',
                    opacity: 1
                  }}
                />
              </button>
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
              {t('aestheticsPage.modal.title')}
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
                  {t('aestheticsPage.modal.accessTeachingMaterials')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '6px'
                }}>
                  {t('aestheticsPage.modal.basedOn5E')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {t('aestheticsPage.modal.opensInNewTab')}
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
                  {t('aestheticsPage.modal.exploreRepository')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {t('aestheticsPage.modal.exploreRelated')}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};