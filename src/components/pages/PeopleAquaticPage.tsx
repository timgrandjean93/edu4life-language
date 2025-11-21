import React from 'react';
import { motion } from 'framer-motion';

interface PeopleAquaticPageProps {
  onHomeClick: () => void;
}

const TOTAL_PAGES = 4;

// Function to get the correct image path for each page
const getImagePath = (page: number) => {
  if (page === 1) {
    return `/assets/components/people/page1.png`;
  } else if (page === 2) {
    return `/assets/components/people/page2.png`;
  } else if (page === 3) {
    return `/assets/components/people/page3.png`;
  }
  // Page 4 will be quiz/interactive content
  return `/assets/components/People.png`;
};

export const PeopleAquaticPage: React.FC<PeopleAquaticPageProps> = ({
  onHomeClick
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [droppedItems, setDroppedItems] = React.useState<Record<string, {x: number, y: number}>>({});
  const [restorationDroppedItems, setRestorationDroppedItems] = React.useState<Record<string, {x: number, y: number}>>({});
  const [randomizedLabels, setRandomizedLabels] = React.useState<typeof pressureLabels>([]);
  const [randomizedRestoration, setRandomizedRestoration] = React.useState<typeof restorationMeasures>([]);
  const [showValidation, setShowValidation] = React.useState(false);
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, string>>({});
  const [showDownloadModal, setShowDownloadModal] = React.useState(false);

  // Drag and Drop items for Activity 1
  const pressureLabels = [
    {
      id: 'cutting-meanders',
      label: 'Cutting meanders',
      description: 'Straightening the river (making the river shorter and straighter instead of meandering)'
    },
    {
      id: 'building-dikes',
      label: 'Building dikes',
      description: 'Flood protection dikes (raised embankments along the river that keep the water inside the main channel and stop it from reaching the floodplain)'
    },
    {
      id: 'channellizing-rivers',
      label: 'Channellizing rivers', 
      description: 'Channelizing the river (protecting the banks of straightened rivers from erosion by covering them by stones, or by building groynes [small transverse stone barriers] so the river cannot change its river bed any more)'
    },
    {
      id: 'draining-floodplains',
      label: 'Draining floodplains',
      description: 'Drying out wetlands (removing water from wetlands to make land usable for pastures, crop fields and settlements)'
    },
    {
      id: 'urbanization',
      label: 'Urbanization', 
      description: 'Building settlements, roads, and cities, accompanied by wastewater discharge into the river.'
    },
    {
      id: 'agriculture-pesticides',
      label: 'Agriculture using pesticides, insecticides, etc.',
      description: 'Application of chemicals in farming against weeds and insects'
    },
    {
      id: 'cutting-forests',
      label: 'Cutting down forests',
      description: 'Deforestation (removing trees from large areas)'
    },
    {
      id: 'industrialization',
      label: 'Industrialization',
      description: 'Building factories and industries, often accompanied by air, soil or water pollution'
    },
    {
      id: 'dams-hydroelectric',
      label: 'Dams, hydroelectric power plants, etc.',
      description: 'Construction of river barriers (transverse concrete structures that stop water, sediment and fish from moving freely)'
    },
    {
      id: 'invasive-species',
      label: 'Invasive species',
      description: 'Newcomer species (plants or animals from other continents that spread massively and cause problems by their dominance)'
    },
    {
      id: 'navigation',
      label: 'Navigation',
      description: 'Ships and canals (deepening and regulating rivers so big ships can travel along them)'
    },
    {
      id: 'climate-change',
      label: 'Climate change',
      description: 'Global warming (more extreme weather conditions caused by humans)'
    }
  ];

  // Restoration measures for Activity 2 (Page 3)
  const restorationMeasures = [
    {
      id: 'restoration-sidearms',
      label: 'Restoration of river side-arms',
      description: 'Re-opening old river branches so that water can flow there again, creating multiple habitats for fish, birds, and plants.'
    },
    {
      id: 'dike-relocation',
      label: 'Dike relocation for more space',
      description: 'Moving dikes further away from the river to provide more space to the river and floodplain forests that may retain flood waters.'
    },
    {
      id: 'buffer-strips',
      label: 'Buffer strips',
      description: 'Restoring narrow forests between agricultural fields and rivers so they can filter nutrients and hence protect water from pollution.'
    },
    {
      id: 'fish-ramps',
      label: 'Fish ramps or remove barriers',
      description: 'Helping fish migrate by removing barriers or transforming them into ramps of stones enabling them to swim upstream again.'
    },
    {
      id: 'bypass-channels',
      label: 'Bypass channels',
      description: 'Creating artificial side channels around barriers with gentle slopes where fish and other animals can move, or even live.'
    },
    {
      id: 'native-species',
      label: 'Support native species',
      description: 'Restoring natural habitat conditions to support native plants and animals, making it harder for invasive species to spread.'
    }
  ];

  // Drop zones for page 2 (Activity 1)
  const dropZones = [
    { id: 'zone1', x: 15, y: 26, width: 8, height: 15, correctAnswer: 'cutting-meanders' },
    { id: 'zone2', x: 25, y: 19, width: 8, height: 15, correctAnswer: 'building-dikes' },
    { id: 'zone3', x: 44, y: 35, width: 10, height: 8, correctAnswer: 'channellizing-rivers' },
    { id: 'zone4', x: 40, y: 43, width: 8, height: 12, correctAnswer: 'draining-floodplains' },
    { id: 'zone5', x: 50, y: 46, width: 8, height: 10, correctAnswer: 'urbanization' },
    { id: 'zone6', x: 44, y: 62, width: 12, height: 15, correctAnswer: 'agriculture-pesticides' },
    { id: 'zone7', x: 42, y: 55, width: 8, height: 8, correctAnswer: 'cutting-forests' },
    { id: 'zone8', x: 55, y: 55, width: 8, height: 10, correctAnswer: 'industrialization' },
    { id: 'zone9', x: 60, y: 72, width: 8, height: 12, correctAnswer: 'dams-hydroelectric' },
    { id: 'zone10', x: 72, y: 60, width: 8, height: 8, correctAnswer: 'invasive-species' },
    { id: 'zone11', x: 78, y: 42, width: 8, height: 8, correctAnswer: 'navigation' },
    { id: 'zone12', x: 86, y: 26, width: 8, height: 14, correctAnswer: 'climate-change' }
  ];

  // Drop zones for page 3 (Activity 2)
  const restorationDropZones = [
    { id: 'restore-zone1', x: 16, y: 8, width: 20, height: 22, correctAnswer: 'restoration-sidearms' },
    { id: 'restore-zone2', x: 41, y: 10, width: 25, height: 30, correctAnswer: 'buffer-strips' },
    { id: 'restore-zone3', x: 40, y: 70, width: 22, height: 20, correctAnswer: 'bypass-channels' },
    { id: 'restore-zone4', x: 13, y: 45, width: 32, height: 24, correctAnswer: 'dike-relocation' },
    { id: 'restore-zone5', x: 52, y: 40, width: 16, height: 25, correctAnswer: 'fish-ramps' },
    { id: 'restore-zone6', x: 70, y: 75, width: 12, height: 25, correctAnswer: 'native-species' }
  ];

  // Quiz data for Activity 3
  const quizData = {
    column1: {
      options: [
        { id: 'A', text: 'Because the soil in the floodplain was too poor and nothing could grow there.' },
        { id: 'B', text: 'Because farming was forbidden by the rulers of the Danube region in those times.' },
        { id: 'C', text: 'Because the floodplain was still natural, offering many benefits for people and animals, but farming was not possible on flooded land.' }
      ],
      correct: 'C'
    },
    column2: {
      options: [
        { id: 'A', text: 'Because the Danube\'s natural forests and wetlands expanded, increasing farming and timber production at the same time.' },
        { id: 'B', text: 'Because dikes disconnected the floodplain from the river, protecting agriculture from floods but destroying many natural habitats and their benefits.' },
        { id: 'C', text: 'Because no one lived near the Danube, so only a few services were used.' }
      ],
      correct: 'B'
    },
    column3: {
      options: [
        { id: 'A', text: 'Because nature-based solutions restore side arms, wetlands, and forests, which bring back multiple benefits for both nature and people.' },
        { id: 'B', text: 'Because people allowed the river to flood naturally, and removed all the pressures' },
        { id: 'C', text: 'Because the Danube was cut off from its floodplains by dikes.' }
      ],
      correct: 'A'
    }
  };

  // Quiz handler
  const handleQuizAnswer = (column: string, answerId: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [column]: answerId
    }));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a custom drag image (just the button element itself, no children)
    const dragElement = e.currentTarget as HTMLElement;
    const clone = dragElement.cloneNode(true) as HTMLElement;
    
    // Remove tooltip from clone
    const tooltip = clone.querySelector('.absolute.z-50');
    if (tooltip) {
      tooltip.remove();
    }
    
    // Style the clone for dragging
    clone.style.position = 'absolute';
    clone.style.top = '-1000px';
    clone.style.left = '-1000px';
    clone.style.width = dragElement.offsetWidth + 'px';
    clone.style.pointerEvents = 'none';
    
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, dragElement.offsetWidth / 2, dragElement.offsetHeight / 2);
    
    // Remove clone after drag starts
    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Download modal handlers
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink = () => {
    window.open('https://doi.org/10.5281/zenodo.17477840', '_blank');
    setShowDownloadModal(false);
  };

  const handleDashboardLink = () => {
    setShowDownloadModal(false);
    // TODO: Navigate to repository
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    if (draggedItem) {
      if (currentPage === 2) {
        const zone = dropZones.find(z => z.id === zoneId);
        if (zone) {
          // Remove any existing item from this zone before adding new one
          const newDroppedItems = { ...droppedItems };
          
          // Find and remove any item that was in this zone
          Object.keys(newDroppedItems).forEach(key => {
            const item = newDroppedItems[key];
            if (item.x === zone.x && item.y === zone.y) {
              delete newDroppedItems[key];
            }
          });
          
          // Add the new item
          newDroppedItems[draggedItem] = { x: zone.x, y: zone.y };
          setDroppedItems(newDroppedItems);
        }
      } else if (currentPage === 3) {
        const zone = restorationDropZones.find(z => z.id === zoneId);
        if (zone) {
          // Remove any existing item from this zone before adding new one
          const newDroppedItems = { ...restorationDroppedItems };
          
          // Find and remove any item that was in this zone
          Object.keys(newDroppedItems).forEach(key => {
            const item = newDroppedItems[key];
            if (item.x === zone.x && item.y === zone.y) {
              delete newDroppedItems[key];
            }
          });
          
          // Add the new item
          newDroppedItems[draggedItem] = { x: zone.x, y: zone.y };
          setRestorationDroppedItems(newDroppedItems);
        }
      }
      setDraggedItem(null);
    }
  };

  // Remove a dropped item (return it to the list)
  const handleRemoveDroppedItem = (itemId: string) => {
    if (currentPage === 2) {
      setDroppedItems(prev => {
        const newItems = { ...prev };
        delete newItems[itemId];
        return newItems;
      });
    } else if (currentPage === 3) {
      setRestorationDroppedItems(prev => {
        const newItems = { ...prev };
        delete newItems[itemId];
        return newItems;
      });
    }
    setShowValidation(false); // Reset validation when removing
  };

  // Check if an item is correctly placed
  const isItemCorrect = (itemId: string): boolean => {
    if (currentPage === 2) {
      const droppedPosition = droppedItems[itemId];
      if (!droppedPosition) return false;
      
      const zone = dropZones.find(z => z.x === droppedPosition.x && z.y === droppedPosition.y);
      return zone?.correctAnswer === itemId;
    } else if (currentPage === 3) {
      const droppedPosition = restorationDroppedItems[itemId];
      if (!droppedPosition) return false;
      
      const zone = restorationDropZones.find(z => z.x === droppedPosition.x && z.y === droppedPosition.y);
      return zone?.correctAnswer === itemId;
    }
    return false;
  };

  // Check if all items are placed
  const allItemsPlaced = currentPage === 2 
    ? Object.keys(droppedItems).length === pressureLabels.length
    : currentPage === 3
    ? Object.keys(restorationDroppedItems).length === restorationMeasures.length
    : false;
  
  // Count correct and incorrect
  const currentDroppedItems = currentPage === 2 ? droppedItems : restorationDroppedItems;
  const correctCount = Object.keys(currentDroppedItems).filter(itemId => isItemCorrect(itemId)).length;
  const incorrectCount = Object.keys(currentDroppedItems).length - correctCount;

  // Randomize labels when entering page 2
  React.useEffect(() => {
    if (currentPage === 2 && randomizedLabels.length === 0) {
      // Fisher-Yates shuffle algorithm
      const shuffled = [...pressureLabels];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setRandomizedLabels(shuffled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Randomize restoration measures when entering page 3
  React.useEffect(() => {
    if (currentPage === 3 && randomizedRestoration.length === 0) {
      // Fisher-Yates shuffle algorithm
      const shuffled = [...restorationMeasures];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setRandomizedRestoration(shuffled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Show validation when all items are placed
  React.useEffect(() => {
    if ((currentPage === 2 || currentPage === 3) && allItemsPlaced && !showValidation) {
      setShowValidation(true);
    }
  }, [allItemsPlaced, showValidation, currentPage]);

  // Reset validation when leaving page 2 or 3, or when switching between them
  React.useEffect(() => {
    setShowValidation(false);
  }, [currentPage]);

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
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5' }}>
      {/* Header with title and home button */}
      <div className="relative z-50">
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              {/* Main Title */}
              <div className="text-center">
                <motion.h1 
                  key={currentPage}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  The people and aquatic ecosystems
                </motion.h1>
                
                {/* Subtitle - Only show for pages 1-3 */}
                {currentPage > 0 && currentPage < 4 && (
                  <motion.h2
                    key={`subtitle-${currentPage}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ 
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '36px', 
                      fontWeight: 'bold', 
                      color: '#406A46',
                      textAlign: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    {currentPage === 1 && 'A. Natural floodplains'}
                    {currentPage === 2 && 'B. Used and altered floodplains'}
                    {currentPage === 3 && 'C. Restoring floodplains as a Nature-based Solution'}
                  </motion.h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8" style={{ paddingBottom: '32px' }}>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {currentPage === 0 ? (
            // Intro Page: Two illustrations, description, CTA, downloads
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Two Illustrations Side by Side */}
              <div className="flex gap-8 justify-center mb-8" style={{ width: '100%', maxWidth: '1200px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, maxWidth: '600px' }}>
                  <img
                    src="/assets/components/people/landing1.png"
                    alt="People interacting with aquatic ecosystems"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </div>
                <div style={{ flex: 1, maxWidth: '600px' }}>
                  <img
                    src="/assets/components/people/landing2.png"
                    alt="Learning about aquatic ecosystems"
                    style={{ width: '100%', height: 'auto', maxHeight: '320px', borderRadius: '8px', objectFit: 'contain' }}
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
                Explore how people rely on floodplains and aquatic ecosystems, and discover pathways to restore their benefits for communities and nature.
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
                        href="https://doi.org/10.5281/zenodo.17477840"
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
                        onClick={handleDashboardLink}
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
          ) : currentPage <= 3 ? (
            // Pages 1-3: Image content
            <div className="flex flex-col items-center" style={currentPage === 3 ? { height: 'auto', minHeight: 'auto' } : {}}>
              {currentPage === 1 ? (
                // Page 1: Simple image layout
                <>
                  <div className="mb-6" style={{ height: '40px' }}>
                    {/* White space for consistent positioning */}
                  </div>
                  <div className="flex justify-center">
                    <div style={{ width: '100%', maxWidth: '1600px' }}>
                      <img 
                        src={getImagePath(currentPage)}
                        alt={`People and aquatic ecosystems page ${currentPage}`}
                        className="w-full h-auto"
                        style={{ 
                          backgroundColor: 'transparent'
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : currentPage === 2 ? (
                // Page 2: 2/3 image + 1/3 activity content layout
                <>
                  <div className="mb-6" style={{ height: '40px' }}>
                    {/* White space for consistent positioning */}
                  </div>
                  <div className="flex w-full max-w-7xl gap-8">
                    {/* Left side - Image and text (2/3) */}
                    <div style={{ width: '66.66%', display: 'flex', flexDirection: 'column' }}>
                      {/* Image container with fixed aspect ratio */}
                      <div style={{ position: 'relative', width: '100%' }}>
                        <img 
                          src={getImagePath(currentPage)}
                          alt={`People and aquatic ecosystems page ${currentPage}`}
                          style={{ 
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            backgroundColor: 'transparent'
                          }}
                        />
                        
                        {/* Invisible drop zones for page 2 */}
                        {!showValidation && dropZones.map((zone) => (
                          <div
                            key={zone.id}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, zone.id)}
                            style={{
                              position: 'absolute',
                              left: `${zone.x}%`,
                              top: `${zone.y}%`,
                              width: `${zone.width}%`,
                              height: `${zone.height}%`,
                              pointerEvents: 'auto',
                              cursor: 'pointer'
                            }}
                          />
                        ))}
                        
                        {/* Dropped items */}
                        {Object.entries(droppedItems).map(([itemId, position]) => {
                          const item = pressureLabels.find(p => p.id === itemId);
                          const isCorrect = showValidation ? isItemCorrect(itemId) : null;
                          
                          return item ? (
                            <div
                              key={itemId}
                              draggable={!showValidation}
                              onDragStart={(e) => {
                                if (!showValidation) {
                                  // Remove from current position and start dragging again
                                  handleRemoveDroppedItem(itemId);
                                  handleDragStart(e, itemId);
                                }
                              }}
                              onClick={(e) => {
                                // Only remove on double-click if validation not shown
                                if (e.detail === 2 && !showValidation) {
                                  handleRemoveDroppedItem(itemId);
                                }
                              }}
                              title={showValidation ? (isCorrect ? 'Correct!' : 'Incorrect') : 'Drag to move, double-click to remove'}
                              style={{
                                position: 'absolute',
                                left: `${position.x}%`,
                                top: `${position.y}%`,
                                backgroundColor: showValidation ? (isCorrect ? '#4CAF50' : '#F44336') : '#58717B',
                                color: 'white',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                transform: 'translate(-50%, -50%)',
                                cursor: showValidation ? 'default' : 'grab',
                                transition: 'all 0.2s ease',
                                border: showValidation ? (isCorrect ? '3px solid #2E7D32' : '3px solid #D32F2F') : '2px solid white',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                                pointerEvents: 'auto',
                                zIndex: 10
                              }}
                              className={showValidation ? '' : 'hover:bg-opacity-80 hover:scale-105 active:cursor-grabbing'}
                            >
                              {item.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                      
                      {/* Descriptive text below image - Outside the relative container */}
                      <div style={{
                        marginTop: '30px',
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '22px',
                        fontWeight: 'bold',
                        color: '#406A46',
                        lineHeight: '1.6',
                        textAlign: 'left',
                        flexShrink: 0
                      }}>
                        People cleared forests, transformed the floodplains into pastures and crop fields, and built villages and later cities near the banks of the Danube. To protect themselves from floods, they constructed dikes. The Danube was also developed as a navigational waterway and for hydropower production. As a result, the river lost many of its natural features: the balance of sediments in the riverbed was disturbed, and the connection between the river channel and its floodplains was largely cut off. Only a few remnants of the original floodplain remained, while many typical animals and plants disappeared.
                      </div>
                    </div>
                    
                    {/* Right side - Activity content (1/3) */}
                    <div style={{ width: '33.33%' }} className="flex flex-col justify-start pt-4">
                      {/* Activity 1 title with pointer icon - Centered */}
                      <div className="flex items-center justify-center mb-6">
                        <img 
                          src="/assets/icons/pointer.png" 
                          alt="Pointer" 
                          style={{ 
                            width: '57px', 
                            height: '57px',
                            marginRight: '16px'
                          }}
                        />
                        <h3 style={{ 
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '48px', 
                          fontWeight: 'bold', 
                          color: '#406A46',
                          margin: 0,
                          lineHeight: '1.1'
                        }}>
                          Activity 1
                        </h3>
                      </div>
                      
                      {/* White space separator */}
                      <div style={{ height: '20px' }}></div>
                      
                      {/* Activity description - Centered */}
                      <div style={{ 
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#406A46',
                        lineHeight: '1.4',
                        textAlign: 'center',
                        marginBottom: '24px'
                      }}>
                        Look closely—this is how human actions have transformed the Danube and its floodplains. 
                        Dikes, farming, navigation, and other pressures changed the landscape.
                        <br /><br />
                        Can you help me by matching each pressure label to the right place in the picture?
                      </div>
                      
                      {/* Score Display */}
                      {showValidation && (
                        <div style={{
                          backgroundColor: 'white',
                          padding: '20px',
                          borderRadius: '12px',
                          marginBottom: '20px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          textAlign: 'center'
                        }}>
                          <h4 style={{
                            fontFamily: 'Comfortaa, sans-serif',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#406A46',
                            marginBottom: '12px'
                          }}>
                            Results
                          </h4>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            gap: '20px'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#4CAF50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                ✓
                              </div>
                              <span style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#4CAF50'
                              }}>
                                {correctCount} Correct
                              </span>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#F44336',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                ✗
                              </div>
                              <span style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#F44336'
                              }}>
                                {incorrectCount} Incorrect
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Drag and Drop Buttons */}
                      <div className="grid grid-cols-2 gap-4">
                        {(randomizedLabels.length > 0 ? randomizedLabels : pressureLabels).map((item) => {
                          const isDropped = droppedItems[item.id];
                          
                          return (
                          <div
                            key={item.id}
                            draggable={!isDropped}
                            onDragStart={(e) => !isDropped && handleDragStart(e, item.id)}
                            style={{
                              backgroundColor: isDropped ? '#ccc' : '#58717B',
                              color: isDropped ? '#888' : 'white',
                              padding: '12px 16px',
                              margin: '8px',
                              borderRadius: '8px',
                              cursor: isDropped ? 'not-allowed' : 'grab',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              fontFamily: 'Comfortaa, sans-serif',
                              textAlign: 'center',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              minHeight: '50px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              lineHeight: '1.2',
                              opacity: isDropped ? 0.4 : 1
                            }}
                            className={isDropped ? '' : 'group'}
                          >
                            {item.label}
                            
                            {/* Tooltip - Only show when not dragging and not dropped */}
                            {draggedItem !== item.id && !isDropped && (
                              <div 
                                className="absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300"
                                style={{
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  marginBottom: '8px',
                                  width: '280px',
                                  backgroundColor: 'white',
                                  color: 'black',
                                  padding: '12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: 'normal',
                                  lineHeight: '1.4',
                                  textAlign: 'left',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                  border: '1px solid #e2e8f0',
                                  pointerEvents: 'none'
                                }}
                              >
                                {item.description}
                                <div 
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 0,
                                    height: 0,
                                    borderLeft: '6px solid transparent',
                                    borderRight: '6px solid transparent',
                                    borderTop: '6px solid white'
                                  }}
                              />
                            </div>
                            )}
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : currentPage === 3 ? (
                // Page 3: Activity 2 layout
                <>
                  <div className="mb-6" style={{ height: '40px' }}>
                    {/* White space for consistent positioning */}
                  </div>
                  <div className="flex w-full max-w-7xl gap-8" style={{ alignItems: 'flex-start' }}>
                    {/* Left side - Image and text (2/3) */}
                    <div style={{ width: '66.66%', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                      {/* Image container with fixed aspect ratio */}
                      <div style={{ position: 'relative', width: '100%' }}>
                        <img 
                          src={getImagePath(currentPage)}
                          alt={`People and aquatic ecosystems page ${currentPage}`}
                          style={{ 
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            backgroundColor: 'transparent'
                          }}
                        />
                        
                        {/* Invisible drop zones for restoration */}
                        {!showValidation && restorationDropZones.map((zone) => (
                          <div
                            key={zone.id}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, zone.id)}
                            style={{
                              position: 'absolute',
                              left: `${zone.x}%`,
                              top: `${zone.y}%`,
                              width: `${zone.width}%`,
                              height: `${zone.height}%`,
                              pointerEvents: 'auto',
                              cursor: 'pointer'
                            }}
                          />
                        ))}
                        
                        {/* Dropped restoration items */}
                        {Object.entries(restorationDroppedItems).map(([itemId, position]) => {
                          const item = restorationMeasures.find(p => p.id === itemId);
                          const isCorrect = showValidation ? isItemCorrect(itemId) : null;
                          
                          return item ? (
                            <div
                              key={itemId}
                              draggable={!showValidation}
                              onDragStart={(e) => {
                                if (!showValidation) {
                                  // Remove from current position and start dragging again
                                  handleRemoveDroppedItem(itemId);
                                  handleDragStart(e, itemId);
                                }
                              }}
                              onClick={(e) => {
                                // Only remove on double-click if validation not shown
                                if (e.detail === 2 && !showValidation) {
                                  handleRemoveDroppedItem(itemId);
                                }
                              }}
                              title={showValidation ? (isCorrect ? 'Correct!' : 'Incorrect') : 'Drag to move, double-click to remove'}
                              style={{
                                position: 'absolute',
                                left: `${position.x}%`,
                                top: `${position.y}%`,
                                backgroundColor: showValidation ? (isCorrect ? '#4CAF50' : '#F44336') : '#406A46',
                                color: 'white',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: 'bold',
                                transform: 'translate(-50%, -50%)',
                                cursor: showValidation ? 'default' : 'grab',
                                transition: 'all 0.2s ease',
                                border: showValidation ? (isCorrect ? '3px solid #2E7D32' : '3px solid #D32F2F') : '2px solid white',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                                pointerEvents: 'auto',
                                zIndex: 10
                              }}
                              className={showValidation ? '' : 'hover:bg-opacity-80 hover:scale-105 active:cursor-grabbing'}
                            >
                              {item.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                      
                      {/* Descriptive text below image */}
                      <div style={{
                        marginTop: '30px',
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '22px',
                        fontWeight: 'bold',
                        color: '#406A46',
                        lineHeight: '1.6',
                        textAlign: 'left',
                        flexShrink: 0
                      }}>
                        Step by step, parts of the Danube floodplain are being reconnected to the river. Old side arms are reopened, forests and wetlands are restored, and natural flooding is allowed again wherever possible. These measures bring back habitats for fish, birds, and plants, while also helping people — by storing floodwaters, improving water quality, providing water during droughts, and offering space for recreation. These restoration Measures are called Nature-based Solution.
                      </div>
                    </div>
                    
                    {/* Right side - Activity 2 content (1/3) */}
                    <div style={{ width: '33.33%', flexShrink: 0 }} className="flex flex-col justify-start pt-4">
                      {/* Activity 2 title with pointer icon - Centered */}
                      <div className="flex items-center justify-center mb-6">
                        <img 
                          src="/assets/icons/pointer.png" 
                          alt="Pointer" 
                          style={{ 
                            width: '57px', 
                            height: '57px',
                            marginRight: '16px'
                          }}
                        />
                        <h3 style={{ 
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '48px', 
                          fontWeight: 'bold', 
                          color: '#406A46',
                          margin: 0,
                          lineHeight: '1.1'
                        }}>
                          Activity 2
                        </h3>
                      </div>
                      
                      {/* White space separator */}
                      <div style={{ height: '20px' }}></div>
                      
                      {/* Activity description - Centered */}
                      <div style={{ 
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#406A46',
                        lineHeight: '1.4',
                        textAlign: 'center',
                        marginBottom: '24px'
                      }}>
                        To solve societal problems with this Nature-based Solution, you can now explore suitable restoration measures: each picture shows one way how people and nature may work together.
                        <br /><br />
                        At the bottom, you will find a list with six measures. Can you match the number of the measure from the list with the respective image that shows it?
                      </div>
                      
                      {/* Score Display */}
                      {showValidation && (
                        <div style={{
                          backgroundColor: 'white',
                          padding: '20px',
                          borderRadius: '12px',
                          marginBottom: '20px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          textAlign: 'center'
                        }}>
                          <h4 style={{
                            fontFamily: 'Comfortaa, sans-serif',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#406A46',
                            marginBottom: '12px'
                          }}>
                            Results
                          </h4>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            gap: '20px'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#4CAF50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                ✓
                              </div>
                              <span style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#4CAF50'
                              }}>
                                {correctCount} Correct
                              </span>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#F44336',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                ✗
                              </div>
                              <span style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#F44336'
                              }}>
                                {incorrectCount} Incorrect
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Drag and Drop Buttons for Restoration */}
                      <div className="grid grid-cols-2 gap-4">
                        {(randomizedRestoration.length > 0 ? randomizedRestoration : restorationMeasures).map((item) => {
                          const isDropped = restorationDroppedItems[item.id];
                          
                          return (
                          <div
                            key={item.id}
                            draggable={!isDropped}
                            onDragStart={(e) => !isDropped && handleDragStart(e, item.id)}
                            style={{
                              backgroundColor: isDropped ? '#ccc' : '#406A46',
                              color: isDropped ? '#888' : 'white',
                              padding: '12px 16px',
                              margin: '8px',
                              borderRadius: '8px',
                              cursor: isDropped ? 'not-allowed' : 'grab',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              fontFamily: 'Comfortaa, sans-serif',
                              textAlign: 'center',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              minHeight: '50px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              lineHeight: '1.2',
                              opacity: isDropped ? 0.4 : 1
                            }}
                            className={isDropped ? '' : 'group'}
                          >
                            {item.label}
                            
                            {/* Tooltip - Only show when not dragging and not dropped */}
                            {draggedItem !== item.id && !isDropped && (
                              <div 
                                className="absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300"
                                style={{
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  marginBottom: '8px',
                                  width: '280px',
                                  backgroundColor: 'white',
                                  color: 'black',
                                  padding: '12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: 'normal',
                                  lineHeight: '1.4',
                                  textAlign: 'left',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                  border: '1px solid #e2e8f0',
                                  pointerEvents: 'none'
                                }}
                              >
                                {item.description}
                                <div 
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 0,
                                    height: 0,
                                    borderLeft: '6px solid transparent',
                                    borderRight: '6px solid transparent',
                                    borderTop: '6px solid white'
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Page 4 or other pages: Simple image layout
                <>
                  <div className="flex justify-center">
                    <div style={{ width: '100%', maxWidth: '1600px' }}>
                      <img 
                        src={getImagePath(currentPage)}
                        alt={`People and aquatic ecosystems page ${currentPage}`}
                        className="w-full h-auto"
                        style={{ 
                          backgroundColor: 'transparent'
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Page 4: Activity 3
            <div className="flex flex-col items-center w-full">
              {/* Activity 3 title with pencil icon - Centered */}
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/assets/icons/pencil.png" 
                  alt="Pencil" 
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    marginRight: '16px'
                  }}
                />
                <h3 style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#406A46',
                  margin: 0,
                  lineHeight: '1.1'
                }}>
                  Activity 3
                </h3>
              </div>
              
              {/* Description text - Centered */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#406A46',
                lineHeight: '1.4',
                textAlign: 'center',
                marginBottom: '40px',
                width: '100%'
              }}>
                These polar charts show how the Danube's ecosystem services change in three different scenarios: natural floodplains, altered floodplains with human pressures, and restored floodplains with nature-based solutions. Can you find out why the services look so different?
              </div>
              
              {/* Three columns */}
              <div className="flex w-full max-w-7xl" style={{ justifyContent: 'space-between' }}>
                {/* Column 1 (31%) */}
                <div style={{ width: '31%' }}>
                  <div style={{
                    backgroundColor: 'transparent',
                    padding: '20px',
                    height: '100%'
                  }}>
                    {/* Column 1 Image */}
                    <img 
                      src="/assets/components/people/column1.png" 
                      alt="Original natural Floodplain" 
                      style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '16px',
                        borderRadius: '8px'
                      }}
                    />
                    {/* Column 1 Text */}
                    <h4 style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406BB8',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '16px'
                    }}>
                      Original natural Floodplain
                    </h4>
                    {/* Column 1 Question */}
                    <p style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '20px',
                      lineHeight: '1.4'
                    }}>
                      Looking at this polar chart, why are almost all ecosystem services very high, while agriculture is low?
                    </p>
                    
                    {/* Column 1 Quiz Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {quizData.column1.options.map((option) => {
                        const isSelected = quizAnswers.column1 === option.id;
                        const isCorrect = option.id === quizData.column1.correct;
                        const showResult = isSelected;
                        
                        return (
                          <div
                            key={option.id}
                            onClick={() => handleQuizAnswer('column1', option.id)}
                            style={{
                              backgroundColor: showResult ? (isCorrect ? '#619F6A' : '#C41904') : 'white',
                              color: showResult ? 'white' : 'black',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontSize: '16px',
                              fontWeight: '500',
                              lineHeight: '1.3',
                              transition: 'all 0.3s ease'
                            }}
                            className="hover:bg-gray-50"
                          >
                            <strong>{option.id})</strong> {option.text}
                            {showResult && !isCorrect && (
                              <div style={{
                                marginTop: '8px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#ffffff'
                              }}>
                                Correct answer: ({quizData.column1.correct})
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Column 2 (31%) */}
                <div style={{ width: '31%' }}>
                  <div style={{
                    backgroundColor: 'transparent',
                    padding: '20px',
                    height: '100%'
                  }}>
                    {/* Column 2 Image */}
                    <img 
                      src="/assets/components/people/column2.png" 
                      alt="Altered floodplain" 
                      style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '16px',
                        borderRadius: '8px'
                      }}
                    />
                    {/* Column 2 Text */}
                    <h4 style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#D2847A',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '16px'
                    }}>
                      Altered floodplain
                    </h4>
                    {/* Column 2 Question */}
                    <p style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '20px',
                      lineHeight: '1.4'
                    }}>
                      Why is agricultural production so much provided in this status, while most other services are low?
                    </p>
                    
                    {/* Column 2 Quiz Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {quizData.column2.options.map((option) => {
                        const isSelected = quizAnswers.column2 === option.id;
                        const isCorrect = option.id === quizData.column2.correct;
                        const showResult = isSelected;
                        
                        return (
                          <div
                            key={option.id}
                            onClick={() => handleQuizAnswer('column2', option.id)}
                            style={{
                              backgroundColor: showResult ? (isCorrect ? '#619F6A' : '#C41904') : 'white',
                              color: showResult ? 'white' : 'black',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontSize: '16px',
                              fontWeight: '500',
                              lineHeight: '1.3',
                              transition: 'all 0.3s ease'
                            }}
                            className="hover:bg-gray-50"
                          >
                            <strong>{option.id})</strong> {option.text}
                            {showResult && !isCorrect && (
                              <div style={{
                                marginTop: '8px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#ffffff'
                              }}>
                                Correct answer: ({quizData.column2.correct})
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Column 3 (31%) */}
                <div style={{ width: '31%' }}>
                  <div style={{
                    backgroundColor: 'transparent',
                    padding: '20px',
                    height: '100%'
                  }}>
                    {/* Column 3 Image */}
                    <img 
                      src="/assets/components/people/column3.png" 
                      alt="Restored floodplain" 
                      style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '16px',
                        borderRadius: '8px'
                      }}
                    />
                    {/* Column 3 Text */}
                    <h4 style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#619F6A',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '16px'
                    }}>
                      Restored floodplain
                    </h4>
                    {/* Column 3 Question */}
                    <p style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '20px',
                      lineHeight: '1.4'
                    }}>
                      Why are the ecosystem services more balanced in this polar chart compared to the other two?
                    </p>
                    
                    {/* Column 3 Quiz Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {quizData.column3.options.map((option) => {
                        const isSelected = quizAnswers.column3 === option.id;
                        const isCorrect = option.id === quizData.column3.correct;
                        const showResult = isSelected;
                        
                        return (
                          <div
                            key={option.id}
                            onClick={() => handleQuizAnswer('column3', option.id)}
                            style={{
                              backgroundColor: showResult ? (isCorrect ? '#619F6A' : '#C41904') : 'white',
                              color: showResult ? 'white' : 'black',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontSize: '16px',
                              fontWeight: '500',
                              lineHeight: '1.3',
                              transition: 'all 0.3s ease'
                            }}
                            className="hover:bg-gray-50"
                          >
                            <strong>{option.id})</strong> {option.text}
                            {showResult && !isCorrect && (
                              <div style={{
                                marginTop: '8px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#ffffff'
                              }}>
                                Correct answer: ({quizData.column3.correct})
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Pagination and Navigation - Sticky Footer */}
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

          {/* Center Section - Pagination (always centered) */}
          <div className="flex items-center justify-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {/* Pagination Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center items-center"
              style={{ gap: '14px' }}
            >
              {Array.from({ length: TOTAL_PAGES }, (_, index) => {
                const pageNum = index + 1;
                const isDisabled = (currentPage === 2 || currentPage === 3) && !allItemsPlaced && pageNum !== currentPage;
                
                return (
                  <button
                    key={index}
                    onClick={() => !isDisabled && setCurrentPage(pageNum)}
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
            </motion.div>
          </div>

          {/* Download Button - Only on last page, left of pagination */}
          {currentPage === TOTAL_PAGES && (
            <div className="flex items-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', marginLeft: '-290px' }}>
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
            </div>
          )}

          {/* Next Button - Right (Hide on last page) */}
          {currentPage < TOTAL_PAGES && (
            <div className="flex items-center">
              <button
                onClick={() => {
                  const isDisabled = (currentPage === 2 || currentPage === 3) && !allItemsPlaced;
                  if (!isDisabled) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                disabled={(currentPage === 2 || currentPage === 3) && !allItemsPlaced}
                className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: '158px',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: ((currentPage === 2 || currentPage === 3) && !allItemsPlaced) ? 'not-allowed' : 'pointer'
                }}
              >
                <img 
                  src="/assets/icons/next.png" 
                  alt="Next" 
                  style={{ 
                    width: '158px',
                    height: '60px',
                    opacity: ((currentPage === 2 || currentPage === 3) && !allItemsPlaced) ? 0.3 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                />
              </button>
            </div>
          )}
          {currentPage === TOTAL_PAGES && (
            <div className="flex items-center">
              <button
                onClick={onHomeClick}
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
                  alt="Finish" 
                  style={{ 
                    width: '158px',
                    height: '60px',
                    opacity: 1,
                    transition: 'opacity 0.3s ease'
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
