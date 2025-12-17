import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePageRouting } from '../../hooks/usePageRouting';
import { LocalizedImage } from '../LocalizedImage';

type LayerSlotId = 'plant' | 'filter' | 'intermediate' | 'drainage';

interface TooltipContent {
  first: string;
  firstColor: string;
  second?: string;
  secondColor?: string;
  highlightText?: string;
  highlightColor?: string;
}

interface LayerItem {
  id: string;
  slot: LayerSlotId;
  name: string;
  label: string;
  characterImage: string;
  layerImage: string;
  layerDroppedImage: string;
  side: 'left' | 'right';
  tooltip: TooltipContent;
}

// Layer items will be created inside component to access translations
const createLayerItems = (t: (key: string) => string): LayerItem[] => [
  {
    id: 'rocky',
    slot: 'drainage',
    name: t('treatmentWetlandsPage.characters.rocky.name'),
    label: t('treatmentWetlandsPage.characters.rocky.label'),
    characterImage: '/assets/components/constructed/page2/ROCKY.png',
    layerImage: '/assets/components/constructed/page2/drainage.png',
    layerDroppedImage: '/assets/components/constructed/page2/drainage-dropped.png',
    side: 'left',
    tooltip: {
      first: t('treatmentWetlandsPage.characters.rocky.tooltip.first'),
      firstColor: '#707070',
      second: t('treatmentWetlandsPage.characters.rocky.tooltip.second'),
      secondColor: '#2f5c36'
    }
  },
  {
    id: 'reeda',
    slot: 'plant',
    name: t('treatmentWetlandsPage.characters.reeda.name'),
    label: t('treatmentWetlandsPage.characters.reeda.label'),
    characterImage: '/assets/components/constructed/page2/REEDA.png',
    layerImage: '/assets/components/constructed/page2/plant.png',
    layerDroppedImage: '/assets/components/constructed/page2/plant-dropped.png',
    side: 'left',
    tooltip: {
      first: t('treatmentWetlandsPage.characters.reeda.tooltip.first'),
      firstColor: '#406A46',
      second: t('treatmentWetlandsPage.characters.reeda.tooltip.second'),
      secondColor: '#2f5c36'
    }
  },
  {
    id: 'gravelia',
    slot: 'intermediate',
    name: t('treatmentWetlandsPage.characters.gravelia.name'),
    label: t('treatmentWetlandsPage.characters.gravelia.label'),
    characterImage: '/assets/components/constructed/page2/GRAVELIA.png',
    layerImage: '/assets/components/constructed/page2/intermediate.png',
    layerDroppedImage: '/assets/components/constructed/page2/intermediate-dropped.png',
    side: 'right',
    tooltip: {
      first: t('treatmentWetlandsPage.characters.gravelia.tooltip.first'),
      firstColor: '#9F8B68',
      second: t('treatmentWetlandsPage.characters.gravelia.tooltip.second'),
      secondColor: '#2f5c36'
    }
  },
  {
    id: 'sandy',
    slot: 'filter',
    name: t('treatmentWetlandsPage.characters.sandy.name'),
    label: t('treatmentWetlandsPage.characters.sandy.label'),
    characterImage: '/assets/components/constructed/page2/SANDY.png',
    layerImage: '/assets/components/constructed/page2/filter.png',
    layerDroppedImage: '/assets/components/constructed/page2/filter-dropped.png',
    side: 'right',
    tooltip: {
      first: t('treatmentWetlandsPage.characters.sandy.tooltip.first'),
      firstColor: '#CE7C0A',
      second: t('treatmentWetlandsPage.characters.sandy.tooltip.second'),
      secondColor: '#2f5c36',
      highlightText: t('treatmentWetlandsPage.characters.sandy.tooltip.highlightText'),
      highlightColor: '#CE7C0A'
    }
  }
];

// Layer slots will be created inside component to access translations
const createLayerSlots = (t: (key: string) => string): { id: LayerSlotId; label: string; accent: string }[] => [
  { id: 'plant', label: t('treatmentWetlandsPage.layerSlots.plant'), accent: '#6FAF75' },
  { id: 'filter', label: t('treatmentWetlandsPage.layerSlots.filter'), accent: '#F0A23B' },
  { id: 'intermediate', label: t('treatmentWetlandsPage.layerSlots.intermediate'), accent: '#A07F55' },
  { id: 'drainage', label: t('treatmentWetlandsPage.layerSlots.drainage'), accent: '#5B605F' }
];

const BUCKET_BASE_IMAGE = '/assets/components/constructed/page2/bucket.png';

const SLOT_LAYOUTS: Record<LayerSlotId, { top: number; height: number; left: number; width: number }> = {
  plant: { top: 0, height: 200, left: 0, width: 100 },
  filter: { top: 0, height: 200, left: 0, width: 100 },
  intermediate: { top: 0, height: 200, left: 0, width: 100 },
  drainage: { top: 0, height: 200, left: 0, width: 100 }
};

const SLOT_DROPZONES: Record<LayerSlotId, { top: number; height: number; left: number; width: number }> = {
  plant: { top: 50, height: 30, left: 0, width: 100 },
  filter: { top: 83, height: 30, left: 0, width: 100 },
  intermediate: { top: 116, height: 30, left: 0, width: 100 },
  drainage: { top: 149, height: 30, left: 0, width: 100 }
};

const DEBUG_DROPZONES = false;

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderHighlightedText = (text: string, highlightText?: string, highlightColor?: string) => {
  if (!highlightText) {
    return text;
  }
  const parts = text.split(new RegExp(`(${escapeRegExp(highlightText)})`, 'gi'));
  return parts.map((part, index) => {
    if (part.toLowerCase() === highlightText.toLowerCase()) {
      return (
        <span key={`highlight-${index}`} style={{ color: highlightColor ?? 'inherit', fontWeight: 'bold' }}>
          {part}
        </span>
      );
    }
    return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
  });
};

const LEFT_DISPLAY_ORDER: { id: string; offset: number }[] = [
  { id: 'rocky', offset: 26 },
  { id: 'reeda', offset: 0 }
];

const RIGHT_DISPLAY_ORDER: { id: string; offset: number }[] = [
  { id: 'gravelia', offset: 0 },
  { id: 'sandy', offset: 26 }
];

// Page 3 configuration - will be created inside component
const createPage3Steps = (t: (key: string) => string) => [
  { id: 'rock', bucket: '/assets/components/constructed/page3/bucket-rock.png', character: '/assets/components/constructed/page3/ROCKY.png', name: t('treatmentWetlandsPage.characters.rocky.name'), bucketWidth: 140, characterWidth: 347 },
  { id: 'gravel', bucket: '/assets/components/constructed/page3/bucket-gravel.png', character: '/assets/components/constructed/page3/GRAVELIA.png', name: t('treatmentWetlandsPage.characters.gravelia.name'), bucketWidth: 164, characterWidth: 405 },
  { id: 'sand', bucket: '/assets/components/constructed/page3/bucket-sand.png', character: '/assets/components/constructed/page3/SANDY.png', name: t('treatmentWetlandsPage.characters.sandy.name'), bucketWidth: 140, characterWidth: 350 },
  { id: 'plant', bucket: '/assets/components/constructed/page3/bucket-plant.png', character: '/assets/components/constructed/page3/REEDA.png', name: t('treatmentWetlandsPage.characters.reeda.name'), bucketWidth: 157, characterWidth: 400 }
];

const PAGE3_IMAGES = [
  '/assets/components/constructed/page3/image1.png',
  '/assets/components/constructed/page3/image2.png',
  '/assets/components/constructed/page3/image3.png',
  '/assets/components/constructed/page3/image4.png',
  '/assets/components/constructed/page3/image5.png'
];

// Page 4 hover zones configuration (positions in percentage) - will be created inside component
const createPage4HoverZones = (t: (key: string) => string) => [
  { id: 1, text: t('treatmentWetlandsPage.page4.hoverZones.zone1'), top: 60, left: 40, width: 5, height: 20 },
  { id: 2, text: t('treatmentWetlandsPage.page4.hoverZones.zone2'), top: 63, left: 45, width: 5, height: 20 },
  { id: 3, text: t('treatmentWetlandsPage.page4.hoverZones.zone3'), top: 66, left: 51, width: 5, height: 20 },
  { id: 4, text: t('treatmentWetlandsPage.page4.hoverZones.zone4'), top: 64, left: 58, width: 5, height: 20 }
];

interface TreatmentWetlandsPageProps {
  onHomeClick: () => void;
  onRepositoryClick?: () => void;
  onAestheticsClick?: () => void;
}

const TOTAL_PAGES = 4;

export const TreatmentWetlandsPage: React.FC<TreatmentWetlandsPageProps> = ({
  onHomeClick,
  onRepositoryClick,
  onAestheticsClick
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = usePageRouting(TOTAL_PAGES);
  
  // Create translated data structures
  const LAYER_ITEMS = React.useMemo(() => createLayerItems(t), [t]);
  const LAYER_SLOTS = React.useMemo(() => createLayerSlots(t), [t]);
  const PAGE3_STEPS = React.useMemo(() => createPage3Steps(t), [t]);
  const PAGE4_HOVER_ZONES = React.useMemo(() => createPage4HoverZones(t), [t]);
  const [hoveredLayer, setHoveredLayer] = React.useState<string | null>(null);
  const [draggedLayer, setDraggedLayer] = React.useState<string | null>(null);
  const [placements, setPlacements] = React.useState<Record<LayerSlotId, string | null>>({
    plant: null,
    filter: null,
    intermediate: null,
    drainage: null
  });
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [statusType, setStatusType] = React.useState<'success' | 'error' | null>(null);
  
  // Page 3 state
  const [page3CurrentStep, setPage3CurrentStep] = React.useState(0); // 0=rock, 1=gravel, 2=sand, 3=plant, 4=complete
  const [page3DraggedBucket, setPage3DraggedBucket] = React.useState<string | null>(null);
  const [page3HoveredCharacter, setPage3HoveredCharacter] = React.useState<string | null>(null);

  // Page 4 state
  const [page4HoveredZone, setPage4HoveredZone] = React.useState<number | null>(null);

  // Download modal state
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

  // Reset page 3 state when leaving page 3
  React.useEffect(() => {
    if (currentPage !== 3) {
      setPage3CurrentStep(0);
      setPage3DraggedBucket(null);
      setPage3HoveredCharacter(null);
    }
  }, [currentPage]);

  const handleDebugClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!DEBUG_DROPZONES) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const leftPx = event.clientX - rect.left;
    const topPx = event.clientY - rect.top;
    const leftPercent = ((leftPx / rect.width) * 100).toFixed(2);
    const topValue = topPx.toFixed(2);
    console.log(`Bucket click → left: ${leftPercent}%, top: ${topValue}px`);
  }, []);

  React.useEffect(() => {
    if (allLayersPlaced) {
      setStatusMessage(t('treatmentWetlandsPage.page2.successMessage'));
      setStatusType('success');
    }
  }, [allLayersPlaced, t]);

  const handleDragStart = (event: React.DragEvent, layerId: string) => {
    setDraggedLayer(layerId);
    setStatusMessage(null);
    setStatusType(null);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', layerId);
  };

  const handleDragEnd = () => {
    setDraggedLayer(null);
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
      setStatusMessage(t('treatmentWetlandsPage.page2.errorMessage', { name: layer.name }));
      setStatusType('error');
      setDraggedLayer(null);
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
  };

  const isLayerPlaced = (layerId: string) =>
    Object.values(placements).includes(layerId);

  const getItemById = (id: string) => LAYER_ITEMS.find((item) => item.id === id);

  // Page 3 handlers
  const handlePage3BucketDragStart = (event: React.DragEvent, bucketId: string) => {
    setPage3DraggedBucket(bucketId);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', bucketId);
  };

  const handlePage3BucketDragEnd = () => {
    setPage3DraggedBucket(null);
  };

  const handlePage3ImageDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const bucketId = page3DraggedBucket ?? event.dataTransfer.getData('text/plain');
    if (!bucketId) {
      return;
    }

    const currentStepData = PAGE3_STEPS[page3CurrentStep];
    if (bucketId === currentStepData.id) {
      // Correct bucket
      if (page3CurrentStep < PAGE3_STEPS.length - 1) {
        setPage3CurrentStep(page3CurrentStep + 1);
      } else {
        // All steps complete
        setPage3CurrentStep(PAGE3_STEPS.length);
      }
    }
    setPage3DraggedBucket(null);
  };

  const handlePage3ImageDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  // Download modal handlers
  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink = () => {
    window.open('https://doi.org/10.5281/zenodo.17478433', '_blank', 'noopener,noreferrer');
    setShowDownloadModal(false);
  };

  const handleDashboardLink = () => {
    if (onRepositoryClick) {
      onRepositoryClick();
    }
    setShowDownloadModal(false);
  };

  const renderCharacterCard = (item: LayerItem, offsetY: number, align: 'left' | 'right') => {
    const isPlaced = isLayerPlaced(item.id);
    const { tooltip } = item;
    const isDragged = draggedLayer === item.id;

    const handleStart = (event: React.DragEvent) => {
      handleDragStart(event, item.id);
      setHoveredLayer(null);
    };

    return (
      <div
        key={item.id}
        className="flex flex-col items-center"
        style={{
          position: 'relative',
          gap: '4px',
          transform: `translateY(${offsetY - 60}px)`,
          zIndex: isDragged ? 10002 : (hoveredLayer === item.id ? 10000 : 10)
        }}
        onMouseEnter={() => setHoveredLayer(item.id)}
        onMouseLeave={() => setHoveredLayer((current) => (current === item.id ? null : current))}
      >
        <div
          style={{
            position: 'relative',
            width: 'clamp(120px, 12vw, 190px)',
            height: 'clamp(120px, 12vw, 190px)',
            cursor: isDragged ? 'grabbing' : 'grab',
            opacity: isDragged ? 1 : (isPlaced ? 0.45 : 1),
            transition: isDragged ? 'none' : 'opacity 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: isDragged ? 10002 : 'auto'
          }}
        >
          <LocalizedImage
            draggable
            onDragStart={handleStart}
            onDragEnd={handleDragEnd}
            src={item.characterImage}
            alt={item.name}
            style={{
              position: 'absolute',
              width: 'clamp(110px, 11vw, 180px)',
              transform: 'translateY(-85px)',
              pointerEvents: 'auto',
              filter: isDragged ? 'none' : (isPlaced ? 'grayscale(25%) opacity(75%)' : 'none'),
              zIndex: isDragged ? 10002 : 'auto',
              opacity: isDragged ? 1 : 1
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
              top: '-20px',
              ...(align === 'left' 
                ? { left: '0%', transform: 'translateX(0)', maxWidth: 'min(320px, calc(100vw - 40px))' }
                : align === 'right'
                ? { right: '0%', transform: 'translateX(0)', maxWidth: 'min(320px, calc(100vw - 40px))' }
                : { left: '50%', transform: 'translateX(-50%)', maxWidth: 'min(320px, calc(100vw - 40px))' }
              ),
              width: 'clamp(250px, 28vw, 320px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 12px 30px rgba(64, 106, 70, 0.18)',
              borderRadius: '12px',
              padding: 'clamp(10px, 1.2vw, 12px) clamp(14px, 1.6vw, 16px)',
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: 'clamp(12px, 1.4vw, 14px)',
              color: tooltip.firstColor,
              lineHeight: 1.4,
              zIndex: 10001,
              pointerEvents: 'none'
            }}
          >
            <p style={{ margin: 0, marginBottom: tooltip.second ? '10px' : 0, color: tooltip.firstColor }}>
              {tooltip.first}
            </p>
            {tooltip.second && (
              <p style={{ margin: 0, color: tooltip.secondColor ?? '#2f5c36' }}>
                {renderHighlightedText(tooltip.second, tooltip.highlightText, tooltip.highlightColor)}
              </p>
            )}
          </motion.div>
        )}
      </div>
    );
  };

  const getTitleForPage = (page: number) => {
    const titles = [
      t('treatmentWetlandsPage.title.page1'),
      t('treatmentWetlandsPage.title.page2'),
      t('treatmentWetlandsPage.title.page3'),
      t('treatmentWetlandsPage.title.page4')
    ];
    return titles[page - 1];
  };

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'visible', paddingBottom: '0px' }}>
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
                  {t('treatmentWetlandsPage.title.main')}
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
                  marginBottom: currentPage > 1 ? '-10px' : '0'
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
      <div className="relative z-10 px-4 pb-8" style={{ flex: 1, paddingBottom: '10px' }}>
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
                    <LocalizedImage 
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
                  {t('treatmentWetlandsPage.intro.description')}
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
                    {t('treatmentWetlandsPage.intro.accessTeachingMaterials')}
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <a
                          href="https://doi.org/10.5281/zenodo.17478433"
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
                          {t('treatmentWetlandsPage.intro.openPlatform')}
                        </a>
                      </div>
                      <div style={{
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '14px',
                        color: '#406A46',
                        fontStyle: 'italic'
                      }}>
                        {t('treatmentWetlandsPage.intro.opensNewTab')}
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
                    {t('treatmentWetlandsPage.intro.exploreRepository')}
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
                          {t('treatmentWetlandsPage.intro.explore')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentPage === 1 ? (
              <div style={{
                textAlign: 'center'
              }}>
                <LocalizedImage
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
                  marginTop: '-20px',
                  marginBottom: '36px'
                }}>
                  {t('treatmentWetlandsPage.page2.instruction').split('\n').map((line, index, array) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < array.length - 1 && <><br /></>}
                    </React.Fragment>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 'clamp(20px, 4vw, 60px)',
                    flexWrap: 'nowrap',
                    position: 'relative',
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end',
                      gap: 'clamp(14px, 2vw, 28px)',
                      paddingTop: 'clamp(120px, 15vw, 180px)',
                      position: 'relative',
                      zIndex: hoveredLayer ? 10000 : 1,
                      flex: '1 1 0',
                      minWidth: 0
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
                      flex: '0 0 auto',
                      width: 'clamp(300px, 42vw, 420px)',
                      maxWidth: '420px',
                      minWidth: '300px',
                      position: 'relative',
                      cursor: DEBUG_DROPZONES ? 'crosshair' : 'default',
                      zIndex: 1
                    }}
                    onClick={handleDebugClick}
                  >
                    <LocalizedImage
                      src={BUCKET_BASE_IMAGE}
                      alt="Vertical flow wetland container"
                      style={{ width: '100%', display: 'block' }}
                    />

                    {LAYER_SLOTS.map((slot) => {
                      const placedLayerId = placements[slot.id];
                      const placedLayer = placedLayerId ? LAYER_ITEMS.find((item) => item.id === placedLayerId) : undefined;
                      const baseLayer = LAYER_ITEMS.find((item) => item.slot === slot.id);
                      const layerImage = placedLayer ? placedLayer.layerDroppedImage : baseLayer?.layerImage;
                      const layout = SLOT_LAYOUTS[slot.id];

                      if (!layerImage) {
                        return null;
                      }

                      return (
                        <LocalizedImage
                          key={`layer-visual-${slot.id}`}
                          src={layerImage}
                          alt={`${slot.label} layer`}
                          style={{
                            position: 'absolute',
                            left: `${layout.left}%`,
                            width: `${layout.width}%`,
                            top: `${layout.top}px`,
                            height: `${layout.height}px`,
                            objectFit: 'cover',
                            pointerEvents: 'none',
                            zIndex: 2
                          }}
                        />
                      );
                    })}

                    {LAYER_SLOTS.map((slot) => {
                      const placedLayerId = placements[slot.id];
                      const placedLayer = placedLayerId ? LAYER_ITEMS.find((item) => item.id === placedLayerId) : undefined;
                      const layout = SLOT_DROPZONES[slot.id];

                      return (
                        <div
                          key={slot.id}
                          onDragOver={handleDragOver}
                          onDrop={(event) => handleDrop(event, slot.id)}
                          style={{
                            position: 'absolute',
                            left: `${layout.left}%`,
                            width: `${layout.width}%`,
                            top: `${layout.top}px`,
                            height: `${layout.height}px`,
                            borderRadius: '14px',
                            border: DEBUG_DROPZONES ? `2px dashed rgba(255, 0, 0, 0.6)` : '2px solid transparent',
                            boxShadow: DEBUG_DROPZONES ? '0 0 0 3px rgba(255, 0, 0, 0.15)' : 'none',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            transition: 'all 0.2s ease',
                            zIndex: 3
                          }}
                        >
                          {!placedLayer && (
                            <div
                              style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#ffffff',
                                textShadow: '0 0 8px rgba(0,0,0,0.45)'
                              }}
                            >
              </div>
            )}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      gap: 'clamp(14px, 2vw, 28px)',
                      paddingTop: 'clamp(120px, 15vw, 180px)',
                      position: 'relative',
                      zIndex: hoveredLayer ? 10000 : 1,
                      flex: '1 1 0',
                      minWidth: 0
                    }}
                  >
                    {RIGHT_DISPLAY_ORDER.map(({ id, offset }) => {
                      const item = getItemById(id);
                      if (!item) return null;
                      return renderCharacterCard(item, offset, 'right');
                    })}
                  </div>
                </div>

                {statusMessage && (
                  <div
                    style={{
                      marginTop: '32px',
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
            ) : currentPage === 3 ? (
              <div style={{ width: '100%', padding: '0 40px' }}>
                {/* Intro Text */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '22px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                  lineHeight: '1.6',
                  marginTop: '-20px',
                  marginBottom: '36px'
              }}>
                  {t('treatmentWetlandsPage.page3.instruction').split('\n').map((line, index, array) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < array.length - 1 && <><br /></>}
                    </React.Fragment>
                  ))}
              </div>

                {/* Main Layout: Characters (left) - Image (center) - Buckets (right) */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'clamp(20px, 4vw, 60px)',
                  flexWrap: 'nowrap',
                  width: '100%'
                }}>
                  {/* Left: Characters */}
                  <div style={{
                    flex: '1 1 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(15px, 2vw, 20px)',
                    alignItems: 'center',
                    minWidth: 0,
                    position: 'relative',
                    zIndex: page3HoveredCharacter ? 10000 : 1
                  }}>
                    {PAGE3_STEPS.map((step, index) => {
                      // Map PAGE3_STEPS IDs to LAYER_ITEMS IDs
                      const idMapping: Record<string, string> = {
                        'rock': 'rocky',
                        'gravel': 'gravelia',
                        'sand': 'sandy',
                        'plant': 'reeda'
                      };
                      const layerItemId = idMapping[step.id] || step.id;
                      const layerItem = LAYER_ITEMS.find(item => item.id === layerItemId);
                      const isHovered = page3HoveredCharacter === step.id;

                      return (
                        <div
                          key={step.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: isHovered ? 10000 : 10
                          }}
                          onMouseEnter={() => setPage3HoveredCharacter(step.id)}
                          onMouseLeave={() => setPage3HoveredCharacter(null)}
                        >
                          <LocalizedImage
                            src={step.character}
                            alt={step.name}
                            style={{
                              width: `clamp(${step.characterWidth * 0.6}px, ${step.characterWidth * 0.01}vw, ${step.characterWidth}px)`,
                              height: 'auto',
                              opacity: index < page3CurrentStep ? 0.3 : index === page3CurrentStep ? 1 : 0.6,
                              transition: 'opacity 0.3s ease',
                              filter: index < page3CurrentStep ? 'grayscale(60%)' : 'none'
                            }}
                          />
                          {isHovered && layerItem && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '0%',
                                transform: 'translateX(0)',
                                maxWidth: 'min(320px, calc(100vw - 40px))',
                                width: 'clamp(250px, 28vw, 320px)',
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                boxShadow: '0 12px 30px rgba(64, 106, 70, 0.18)',
                                borderRadius: '12px',
                                padding: 'clamp(10px, 1.2vw, 12px) clamp(14px, 1.6vw, 16px)',
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: 'clamp(12px, 1.4vw, 14px)',
                                color: layerItem.tooltip.firstColor,
                                lineHeight: 1.4,
                                zIndex: 10001,
                                pointerEvents: 'none'
                              }}
                            >
                              <p style={{ margin: 0, color: layerItem.tooltip.firstColor }}>
                                {layerItem.tooltip.first}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Center: Current Image (Drop Zone) */}
              <div style={{
                    flex: '0 0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    position: 'relative',
                    width: 'clamp(300px, 50vw, 500px)',
                    maxWidth: '500px',
                    zIndex: 1
                  }}>
                    <div
                      onDragOver={handlePage3ImageDragOver}
                      onDrop={handlePage3ImageDrop}
                      style={{
                        position: 'relative',
                        width: '100%',
                        cursor: page3CurrentStep < PAGE3_STEPS.length ? 'copy' : 'default',
                        border: page3DraggedBucket ? '3px dashed #406A46' : '3px solid transparent',
                        borderRadius: '12px',
                        transition: 'border 0.2s ease'
                      }}
                    >
                      <LocalizedImage
                        src={PAGE3_IMAGES[page3CurrentStep < PAGE3_STEPS.length ? page3CurrentStep : PAGE3_STEPS.length]}
                        alt={`Step ${page3CurrentStep + 1}`}
                        style={{
                          width: '100%',
                          display: 'block',
                          borderRadius: '8px'
                        }}
                      />
                      {page3DraggedBucket && page3CurrentStep < PAGE3_STEPS.length && (
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          backgroundColor: 'rgba(64, 106, 70, 0.8)',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                          pointerEvents: 'none'
                        }}>
                          {t('treatmentWetlandsPage.page3.dropBucket')}
              </div>
            )}
                    </div>
                  </div>

                  {/* Right: Buckets (Draggable) - Reversed order: plant at top, rock at bottom */}
                  <div style={{
                    flex: '1 1 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(15px, 2vw, 20px)',
                    alignItems: 'center',
                    minWidth: 0,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {[...PAGE3_STEPS].reverse().map((step, reversedIndex) => {
                      const index = PAGE3_STEPS.length - 1 - reversedIndex;
                      const isUsed = index < page3CurrentStep;
                      const isCurrent = index === page3CurrentStep;

                      return (
                        <div
                          key={step.id}
                          draggable={isCurrent && page3CurrentStep < PAGE3_STEPS.length}
                          onDragStart={(e) => handlePage3BucketDragStart(e, step.id)}
                          onDragEnd={handlePage3BucketDragEnd}
                          style={{
                            cursor: isCurrent && page3CurrentStep < PAGE3_STEPS.length ? 'grab' : 'default',
                            opacity: isUsed ? 0.3 : isCurrent ? 1 : 0.5,
                            transition: 'opacity 0.3s ease, transform 0.2s ease',
                            transform: page3DraggedBucket === step.id ? 'scale(1.05)' : 'scale(1)',
                            filter: isUsed ? 'grayscale(60%)' : 'none'
                          }}
                        >
                          <LocalizedImage
                            src={step.bucket}
                            alt={`${step.name} bucket`}
                            style={{
                              width: `clamp(${step.bucketWidth * 0.6}px, ${step.bucketWidth * 0.01}vw, ${step.bucketWidth}px)`,
                              height: 'auto',
                              pointerEvents: 'none'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : currentPage === 4 ? (
              <div style={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: '30px',
                padding: '0 40px'
              }}>
                {/* Intro Text */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '22px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                  lineHeight: '1.6',
                  width: '100%',
                  marginTop: '-20px'
              }}>
                {t('treatmentWetlandsPage.page4.intro')}
              </div>

                {/* Page 4 Image with Hover Zones */}
                <div style={{
                  width: '100%',
                  maxWidth: '1600px',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <LocalizedImage
                    src="/assets/components/constructed/page4/page4.png"
                    alt="Treatment wetland microbes"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      display: 'block'
                    }}
                  />
                  
                  {/* Hover Zones */}
                  {PAGE4_HOVER_ZONES.map((zone) => (
                    <div
                      key={zone.id}
                      onMouseEnter={() => setPage4HoveredZone(zone.id)}
                      onMouseLeave={() => setPage4HoveredZone(null)}
                      style={{
                        position: 'absolute',
                        top: `${zone.top}%`,
                        left: `${zone.left}%`,
                        width: `${zone.width}%`,
                        height: `${zone.height}%`,
                        border: 'none',
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        zIndex: 10
                      }}
                    >
                      {/* Tooltip */}
                      {page4HoveredZone === zone.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            position: 'absolute',
                            top: '110%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            minWidth: '220px',
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            boxShadow: '0 12px 30px rgba(64, 106, 70, 0.18)',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            fontFamily: 'Comfortaa, sans-serif',
                            fontSize: '14px',
                            color: '#406A46',
                            fontWeight: 'bold',
                            lineHeight: 1.4,
                            zIndex: 100,
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {zone.text}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Text below image */}
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  textAlign: 'center',
                  lineHeight: '1.6',
                  width: '100%'
                }}>
                  {t('treatmentWetlandsPage.page4.conclusion')}
                </div>
              </div>
            ) : null}
          </div>
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
            {/* Download Button - Only on last page, left of pagination - Hide if not enough space */}
            {currentPage === TOTAL_PAGES && hasEnoughSpace && (
              <button
                onClick={() => setShowDownloadModal(true)}
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
                  key={pageNum}
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

            {/* NEXT TOPIC Text - Only on last page, right of pagination - Hide if not enough space */}
            {currentPage === TOTAL_PAGES && hasEnoughSpace && (
              <div style={{ flexShrink: 0 }}>
                <span style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46'
                }}>
                  {t('treatmentWetlandsPage.nextTopic')}
                </span>
              </div>
            )}
          </motion.div>

          {/* Next/Back Home Button - Right */}
          <div className="flex items-center" style={{ paddingRight: '16px' }}>
              <button
              onClick={() => {
                if (currentPage < TOTAL_PAGES) {
                  setCurrentPage(currentPage + 1);
                } else {
                  // Navigate to Aesthetics page
                  if (onAestheticsClick) {
                    onAestheticsClick();
                  }
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
                alt={currentPage === TOTAL_PAGES ? 'Floodplain Aesthetics' : 'Next'} 
                  style={{
                    width: 'auto',
                    height: '60px',
                    opacity: 1
                  }}
                />
              </button>
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
              {t('treatmentWetlandsPage.modal.title')}
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
                  alt="Download" 
                  style={{ 
                    width: '70px',
                    height: '90px',
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
                  {t('treatmentWetlandsPage.modal.accessTeachingMaterials')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '6px'
                }}>
                  {t('treatmentWetlandsPage.modal.basedOn5E')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {t('treatmentWetlandsPage.modal.opensInNewTab')}
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
                  {t('treatmentWetlandsPage.modal.exploreRepository')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {t('treatmentWetlandsPage.modal.exploreRelated')}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

