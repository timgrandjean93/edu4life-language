import React from 'react';
import { motion } from 'framer-motion';

type LayerSlotId = 'plant' | 'filter' | 'intermediate' | 'drainage';

interface LayerItem {
  id: string;
  slot: LayerSlotId;
  name: string;
  label: string;
  description: string;
  characterImage: string;
  layerImage: string;
  layerDroppedImage: string;
  side: 'left' | 'right';
}

const LAYER_ITEMS: LayerItem[] = [
  {
    id: 'rocky',
    slot: 'drainage',
    name: 'Rocky the Drainer',
    label: 'ROCKY THE DRAINER',
    description: 'Large stones keep the drainage layer open so the water can always flow out of the wetland.',
    characterImage: '/assets/components/constructed/page2/ROCKY.png',
    layerImage: '/assets/components/constructed/page2/drainage.png',
    layerDroppedImage: '/assets/components/constructed/page2/drainage-dropped.png',
    side: 'left'
  },
  {
    id: 'reeda',
    slot: 'plant',
    name: 'Reeda the Flowkeeper',
    label: 'REEDA THE FLOWKEEPER',
    description: 'Wetland plants on the top layer breathe oxygen into the bed and help take up nutrients.',
    characterImage: '/assets/components/constructed/page2/REEDA.png',
    layerImage: '/assets/components/constructed/page2/plant.png',
    layerDroppedImage: '/assets/components/constructed/page2/plant-dropped.png',
    side: 'left'
  },
  {
    id: 'gravelia',
    slot: 'intermediate',
    name: 'Gravelia the Distributor',
    label: 'GRAVELIA THE DISTRIBUTOR',
    description: 'Gravel spreads the inflowing water evenly so every part of the wetland can do its job.',
    characterImage: '/assets/components/constructed/page2/GRAVELIA.png',
    layerImage: '/assets/components/constructed/page2/intermediate.png',
    layerDroppedImage: '/assets/components/constructed/page2/intermediate-dropped.png',
    side: 'right'
  },
  {
    id: 'sandy',
    slot: 'filter',
    name: 'Sandy the Cleaner',
    label: 'SANDY THE CLEANER',
    description: 'Fine sand filters out the last particles and gives microbes a home to break pollutants down.',
    characterImage: '/assets/components/constructed/page2/SANDY.png',
    layerImage: '/assets/components/constructed/page2/filter.png',
    layerDroppedImage: '/assets/components/constructed/page2/filter-dropped.png',
    side: 'right'
  }
];

const LAYER_SLOTS: { id: LayerSlotId; label: string; accent: string }[] = [
  { id: 'plant', label: 'Plant layer', accent: '#6FAF75' },
  { id: 'filter', label: 'Filter layer', accent: '#F0A23B' },
  { id: 'intermediate', label: 'Intermediate layer', accent: '#A07F55' },
  { id: 'drainage', label: 'Drainage layer', accent: '#5B605F' }
];

const LEFT_DISPLAY_ORDER: { id: string; offset: number }[] = [
  { id: 'rocky', offset: 26 },
  { id: 'reeda', offset: 0 }
];

const RIGHT_DISPLAY_ORDER: { id: string; offset: number }[] = [
  { id: 'gravelia', offset: 0 },
  { id: 'sandy', offset: 26 }
];

interface TreatmentWetlandsPageProps {
  onHomeClick: () => void;
  onRepositoryClick?: () => void;
}

const TOTAL_PAGES = 4;

export const TreatmentWetlandsPage: React.FC<TreatmentWetlandsPageProps> = ({
  onHomeClick,
  onRepositoryClick
}) => {
  const [currentPage, setCurrentPage] = React.useState(0); // Start with intro page
  const [hoveredLayer, setHoveredLayer] = React.useState<string | null>(null);
  const [draggedLayer, setDraggedLayer] = React.useState<string | null>(null);
  const [activeSlot, setActiveSlot] = React.useState<LayerSlotId | null>(null);
  const [placements, setPlacements] = React.useState<Record<LayerSlotId, string | null>>({
    plant: null,
    filter: null,
    intermediate: null,
    drainage: null
  });
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [statusType, setStatusType] = React.useState<'success' | 'error' | null>(null);

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

  const allLayersPlaced = React.useMemo(() =>
    Object.values(placements).every((value) => Boolean(value)),
    [placements]
  );

  React.useEffect(() => {
    if (allLayersPlaced) {
      setStatusMessage('Great job! You built the treatment wetland in the right order.');
      setStatusType('success');
    }
  }, [allLayersPlaced]);

  const handleDragStart = (event: React.DragEvent, layerId: string) => {
    setDraggedLayer(layerId);
    setStatusMessage(null);
    setStatusType(null);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', layerId);
  };

  const handleDragEnd = () => {
    setDraggedLayer(null);
    setActiveSlot(null);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event: React.DragEvent, slotId: LayerSlotId) => {
    event.preventDefault();
    event.stopPropagation();

    const layerId = draggedLayer ?? event.dataTransfer.getData('text/plain');
    if (!layerId) {
      return;
    }

    const layer = LAYER_ITEMS.find((item) => item.id === layerId);
    if (!layer) {
      return;
    }

    if (layer.slot !== slotId) {
      setStatusMessage(`${layer.name} belongs in a different layer. Try another spot!`);
      setStatusType('error');
      setDraggedLayer(null);
      setActiveSlot(null);
      return;
    }

    setPlacements((prev) => {
      const updated = { ...prev };
      (Object.keys(updated) as LayerSlotId[]).forEach((key) => {
        if (updated[key] === layerId) {
          updated[key] = null;
        }
      });
      updated[slotId] = layerId;
      return updated;
    });

    setDraggedLayer(null);
    setActiveSlot(null);
  };

  const handleRemoveFromSlot = (slotId: LayerSlotId) => {
    setPlacements((prev) => ({ ...prev, [slotId]: null }));
    setStatusMessage(null);
    setStatusType(null);
  };

  const isLayerPlaced = (layerId: string) =>
    Object.values(placements).includes(layerId);

  const getItemById = (id: string) => LAYER_ITEMS.find((item) => item.id === id);

  const renderCharacterCard = (item: LayerItem, offsetY: number, align: 'left' | 'right') => {
    const isPlaced = isLayerPlaced(item.id);

    return (
      <div
        key={item.id}
        className="flex flex-col items-center"
        style={{
          position: 'relative',
          gap: '10px',
          transform: `translateY(${offsetY}px)`
        }}
        onMouseEnter={() => setHoveredLayer(item.id)}
        onMouseLeave={() => setHoveredLayer((current) => (current === item.id ? null : current))}
      >
        <div
          style={{
            fontFamily: 'Comfortaa, sans-serif',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#406A46',
            opacity: isPlaced ? 0.45 : 1,
            textAlign: 'center',
            textTransform: 'uppercase'
          }}
        >
          {item.label}
        </div>

        <div
          draggable
          onDragStart={(event) => handleDragStart(event, item.id)}
          onDragEnd={handleDragEnd}
          style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            cursor: 'grab',
            opacity: isPlaced ? 0.5 : 1,
            transition: 'opacity 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={isPlaced ? item.layerDroppedImage : item.layerImage}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
          <img
            src={item.characterImage}
            alt={item.name}
            style={{
              position: 'absolute',
              width: '150px',
              transform: 'translateY(-60px)',
              pointerEvents: 'none',
              filter: isPlaced ? 'grayscale(25%) opacity(85%)' : 'none'
            }}
          />
        </div>

        {hoveredLayer === item.id && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: '-105px',
              left: align === 'left' ? '6%' : '94%',
              transform: align === 'left' ? 'translateX(-6%)' : 'translateX(-94%)',
              width: '220px',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 12px 30px rgba(64, 106, 70, 0.18)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '14px',
              color: '#406A46',
              lineHeight: 1.4,
              zIndex: 5
            }}
          >
            {item.description}
          </motion.div>
        )}
      </div>
    );
  };

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

                {/* Subtitle for current page - Only show when not on intro page */}
                {currentPage > 0 && (
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
                )}

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
            {currentPage === 0 ? (
              // Intro Page: Introduction with landing.png, description, and CTA button
              <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
                {/* Single Illustration - Centered */}
                <div className="flex justify-center mb-8" style={{ width: '100%', maxWidth: '600px' }}>
                  <div style={{ width: '100%', maxWidth: '600px' }}>
                    <img 
                      src="/assets/components/constructed/landing.png"
                      alt="Treatment wetlands"
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
                  Learn about treatment wetlands and discover how constructed wetlands naturally filter and clean wastewater.
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
            ) : currentPage === 2 ? (
              <div style={{ width: '100%' }}>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  textAlign: 'center',
                  lineHeight: '1.6',
                  marginBottom: '36px'
                }}>
                  Drag each layer helper to the correct place in the treatment wetland container. Hover a helper to learn what they do, then build the wetland from bottom to top.
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '32px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div
                    style={{
                      flex: '1 1 220px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      gap: '28px'
                    }}
                  >
                    {LEFT_DISPLAY_ORDER.map(({ id, offset }) => {
                      const item = getItemById(id);
                      if (!item) return null;
                      return renderCharacterCard(item, offset, 'left');
                    })}
                  </div>

                  <div
                    style={{
                      flex: '1 1 480px',
                      maxWidth: '520px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(236,245,239,0.9) 100%)',
                      borderRadius: '24px',
                      padding: '32px 28px',
                      boxShadow: '0 24px 50px rgba(64, 106, 70, 0.18)',
                      position: 'relative',
                      overflow: 'visible'
                    }}
                  >
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '20px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                      marginBottom: '24px'
                    }}>
                      Vertical flow treatment wetland cross section
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {LAYER_SLOTS.map((slot) => {
                        const placedLayerId = placements[slot.id];
                        const placedLayer = placedLayerId ? LAYER_ITEMS.find((item) => item.id === placedLayerId) : undefined;
                        const isActive = activeSlot === slot.id;

                        return (
                          <div
                            key={slot.id}
                            onDragEnter={() => setActiveSlot(slot.id)}
                            onDragLeave={() => setActiveSlot((current) => (current === slot.id ? null : current))}
                            onDragOver={handleDragOver}
                            onDrop={(event) => handleDrop(event, slot.id)}
                            style={{
                              minHeight: '88px',
                              borderRadius: '18px',
                              border: `2px dashed ${placedLayer ? '#51727C' : '#97C09D'}`,
                              backgroundColor: placedLayer
                                ? 'rgba(81, 114, 124, 0.15)'
                                : isActive
                                  ? 'rgba(129, 168, 140, 0.18)'
                                  : 'rgba(255,255,255,0.9)',
                              padding: '14px 18px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              gap: '10px',
                              boxShadow: isActive ? '0 0 0 4px rgba(81, 114, 124, 0.25)' : 'none',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div style={{
                              fontFamily: 'Comfortaa, sans-serif',
                              fontSize: '18px',
                              fontWeight: 'bold',
                              color: slot.accent,
                              textTransform: 'uppercase'
                            }}>
                              {slot.label}
                            </div>

                            {placedLayer ? (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '14px'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                  <img
                                    src={placedLayer.layerDroppedImage}
                                    alt={`${placedLayer.name} layer`}
                                    style={{ width: '86px', height: 'auto' }}
                                  />
                                  <div>
                                    <div style={{
                                      fontFamily: 'Comfortaa, sans-serif',
                                      fontSize: '16px',
                                      fontWeight: 'bold',
                                      color: '#406A46',
                                      marginBottom: '4px'
                                    }}>
                                      {placedLayer.name}
                                    </div>
                                    <div style={{
                                      fontFamily: 'Comfortaa, sans-serif',
                                      fontSize: '13px',
                                      color: '#51727C'
                                    }}>
                                      {placedLayer.description.split('.')[0]}.
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFromSlot(slot.id)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    fontFamily: 'Comfortaa, sans-serif',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                    color: '#51727C',
                                    cursor: 'pointer'
                                  }}
                                >
                                  reset
                                </button>
                              </div>
                            ) : (
                              <div style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '16px',
                                color: '#51727C'
                              }}>
                                Drop the correct helper here
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {statusMessage && (
                      <div
                        style={{
                          marginTop: '24px',
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: statusType === 'error' ? '#C41904' : '#406A46',
                          textAlign: 'center'
                        }}
                      >
                        {statusMessage}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      flex: '1 1 220px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      gap: '28px'
                    }}
                  >
                    {RIGHT_DISPLAY_ORDER.map(({ id, offset }) => {
                      const item = getItemById(id);
                      if (!item) return null;
                      return renderCharacterCard(item, offset, 'right');
                    })}
                  </div>
                </div>
              </div>
            ) : currentPage === 3 ? (
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
            ) : currentPage === 4 ? (
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
            ) : null}
          </div>
        </motion.div>
      </div>

      {/* Footer with Pagination and Navigation - Only show when not on intro page */}
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
                onClick={() => {
                  if (currentPage === 2 && !allLayersPlaced) {
                    return;
                  }
                  setCurrentPage(currentPage + 1);
                }}
                className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: '158px',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: currentPage === 2 && !allLayersPlaced ? 'not-allowed' : 'pointer'
                }}
                disabled={currentPage === 2 && !allLayersPlaced}
              >
                <img
                  src="/assets/icons/next.png"
                  alt="Next"
                  style={{
                    width: '158px',
                    height: '60px',
                    opacity: currentPage === 2 && !allLayersPlaced ? 0.35 : 1,
                    transition: 'opacity 0.2s ease'
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

