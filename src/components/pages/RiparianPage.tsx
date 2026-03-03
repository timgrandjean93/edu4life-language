import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePageRouting } from '../../hooks/usePageRouting';
import { useOrientation } from '../../hooks/useOrientation';
import { LocalizedImage } from '../LocalizedImage';

interface RiparianPageProps {
  onHomeClick: () => void;
  onFloodControlClick?: () => void;
  onRepositoryClick?: () => void;
}

// Quiz options with correct answers - labels will be translated
const quizOptions = [
  { id: 'human-settlements', labelKey: 'human-settlements', correct: true },
  { id: 'roads-bridges', labelKey: 'roads-bridges', correct: true },
  { id: 'flood-protection', labelKey: 'flood-protection', correct: true },
  { id: 'dams', labelKey: 'dams', correct: false },
  { id: 'pastures', labelKey: 'pastures', correct: true },
  { id: 'irrigation', labelKey: 'irrigation', correct: false },
  { id: 'factory', labelKey: 'factory', correct: true },
  { id: 'mining', labelKey: 'mining', correct: false },
  { id: 'cycling', labelKey: 'cycling', correct: true },
  { id: 'riparian-vegetation', labelKey: 'riparian-vegetation', correct: true },
  { id: 'floodplains', labelKey: 'floodplains', correct: true },
  { id: 'agriculture', labelKey: 'agriculture', correct: true },
  { id: 'recreation', labelKey: 'recreation', correct: true }
];

// Drop zones for page 2 - Stream habitats
const dropZones = [
  { id: 'pool-left', correctLabel: 'POOL', x: 30, y: 80, image: 'left' },
  { id: 'riffle-left', correctLabel: 'RIFFLE', x: 60, y: 60, image: 'left' },
  { id: 'run-left', correctLabel: 'RUN', x: 45, y: 52, image: 'left' },
  { id: 'pool-right', correctLabel: 'POOL', x: 30, y: 32, image: 'right' },
  { id: 'run-right', correctLabel: 'RUN', x: 52, y: 50, image: 'right' },
  { id: 'riffle-right', correctLabel: 'RIFFLE', x: 40, y: 35, image: 'right' },
  { id: 'pool-2-right', correctLabel: 'POOL', x: 68, y: 65, image: 'right' },
  { id: 'riffle-2-right', correctLabel: 'RIFFLE', x: 88, y: 40, image: 'right' }
];

// Color mapping for different labels
const labelColors = {
  'POOL': '#00AEFF', // Blue
  'RIFFLE': '#CE7C0A', // Orange
  'RUN': '#0400D4' // Dark blue
};

const labels = ['POOL', 'RIFFLE', 'RUN'];

export const RiparianPage: React.FC<RiparianPageProps> = ({
  onHomeClick,
  onFloodControlClick,
  onRepositoryClick
}) => {
  const { t } = useTranslation();
  const { isMobile } = useOrientation();
  const totalPages = isMobile ? 16 : 4; // Mobile: 0 intro, 1-13 quiz, 14 definitions, 15 image1, 16 image2. Desktop: 0 intro, 1 quiz, 2 definitions, 3 image1, 4 image2
  const [currentPage, setCurrentPage] = usePageRouting(totalPages);
  
  // Page 1 state
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [quizSubmitted, setQuizSubmitted] = React.useState(false);
  // Mobile quiz: one activity per page, Yes/No choice, immediate feedback
  const [mobileQuizAnswers, setMobileQuizAnswers] = React.useState<Record<number, boolean | null>>({});

  // Page 2 state
  const [placements, setPlacements] = React.useState<Record<string, string>>({});
  const [page2Image1Submitted, setPage2Image1Submitted] = React.useState(false);
  const [page2Submitted, setPage2Submitted] = React.useState(false);
  const [showPage2Feedback, setShowPage2Feedback] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [currentLabelToPlace, setCurrentLabelToPlace] = React.useState<string | null>(null); // Mobile: tap label then zone
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

  const handleOptionToggle = (optionId: string) => {
    if (quizSubmitted) return; // Don't allow changes after submission
    
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    setShowFeedback(true);
  };

  const getOptionFeedback = (option: typeof quizOptions[0]) => {
    if (!quizSubmitted) return null;
    
    const isSelected = selectedOptions.includes(option.id);
    
    if (isSelected && option.correct) return 'correct';
    if (isSelected && !option.correct) return 'incorrect';
    if (!isSelected && option.correct) return 'missed';
    return null;
  };

  // Page 2 handlers - Drag and Drop
  const [draggedLabel, setDraggedLabel] = React.useState<string | null>(null);
  
  const handleDragStart = (label: string) => {
    setDraggedLabel(label);
  };

  const handleDragEnd = () => {
    setDraggedLabel(null);
  };

  const handleDrop = (zoneId: string) => {
    if (page2Submitted) return;
    const zone = dropZones.find(z => z.id === zoneId);
    if (zone?.image === 'left' && page2Image1Submitted) return;
    const label = isMobile ? currentLabelToPlace : draggedLabel;
    if (!label) return;
    
    setPlacements(prev => ({
      ...prev,
      [zoneId]: label
    }));
    if (isMobile) setCurrentLabelToPlace(null);
    else setDraggedLabel(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmitPage2Image1 = () => {
    setPage2Image1Submitted(true);
  };

  const handleSubmitPage2 = () => {
    setPage2Submitted(true);
    setShowPage2Feedback(true);
  };

  // Retry function to reset activity
  const handleRetry = () => {
    if (currentPage === 1) {
      setSelectedOptions([]);
      setQuizSubmitted(false);
      setShowFeedback(false);
    } else if ((isMobile && currentPage === 16) || (!isMobile && currentPage === 4)) {
      setPlacements({});
      setPage2Image1Submitted(false);
      setPage2Submitted(false);
      setShowPage2Feedback(false);
      setDraggedLabel(null);
      setCurrentLabelToPlace(null);
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
    // Note: No specific Zenodo link provided for RiparianPage
    window.open('https://doi.org/10.5281/zenodo.17484379', '_blank');
    setShowDownloadModal(false);
  };

  const handleDashboardLink = () => {
    setShowDownloadModal(false);
    // TODO: Navigate to repository
  };

  const getPage2Image1Feedback = (zoneId: string) => {
    if (!page2Image1Submitted) return null;
    const zone = dropZones.find(z => z.id === zoneId);
    if (!zone || zone.image !== 'left') return null;
    const placement = placements[zoneId];
    if (!placement && zone) return 'empty';
    if (placement === zone?.correctLabel) return 'correct';
    return 'incorrect';
  };

  const getPage2Feedback = (zoneId: string) => {
    if (!page2Submitted) return null;
    const zone = dropZones.find(z => z.id === zoneId);
    if (!zone || zone.image !== 'right') return null;
    const placement = placements[zoneId];
    if (!placement && zone) return 'empty';
    if (placement === zone?.correctLabel) return 'correct';
    return 'incorrect';
  };

  // Set page background
  React.useEffect(() => {
    // Force override body and html background styles
    const html = document.documentElement;
    const body = document.body;
    
    // Ensure html and body take full height
    html.style.minHeight = "100vh";
    html.style.height = "auto";
    body.style.minHeight = "100vh";
    body.style.height = "auto";
    
    // Set solid background color
    body.style.backgroundColor = "#dfebf5";
    
    // Cleanup function to remove background when component unmounts
    return () => {
      html.style.minHeight = "";
      html.style.height = "";
      body.style.minHeight = "";
      body.style.height = "";
      body.style.backgroundColor = "";
    };
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Reset mobile tap-to-place when changing pages
  React.useEffect(() => {
    setCurrentLabelToPlace(null);
  }, [currentPage]);

  // Clamp currentPage when switching from mobile to desktop
  React.useEffect(() => {
    if (!isMobile && currentPage > 4) {
      setCurrentPage(4);
    }
  }, [isMobile, currentPage, setCurrentPage]);

  // No auto-submit for image 2 - user clicks Check Answers explicitly

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
                  key={currentPage}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  {currentPage === 0 ? t('riparianPage.title.page0') : 
                   (isMobile && currentPage >= 1 && currentPage <= 13) || (!isMobile && currentPage === 1) ? t('riparianPage.title.page1') : 
                   t('riparianPage.title.page2')}
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
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {currentPage === 0 ? (
            // Intro Page: Mobile = single image, text CTA, hide download; Desktop = two images, image button, download
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Illustrations - Single on mobile, two on desktop */}
              <div 
                className="flex justify-center mb-8" 
                style={{ 
                  width: '100%', 
                  maxWidth: isMobile ? '600px' : '1200px',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? 0 : '32px',
                  alignItems: 'center'
                }}
              >
                {isMobile ? (
                  <div style={{ width: '100%', maxWidth: '600px' }}>
                    <img 
                      src="/assets/components/Topic2/image1.png"
                      alt="Riparian area"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </div>
                ) : (
                  <>
                    <div style={{ flex: 1, maxWidth: '600px' }}>
                      <img 
                        src="/assets/components/Topic2/image1.png"
                        alt="Riparian area 1"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                      />
                    </div>
                    <div style={{ flex: 1, maxWidth: '600px' }}>
                      <img 
                        src="/assets/components/Topic2/image2.png"
                        alt="Riparian area 2"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Descriptive Text */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                marginBottom: isMobile ? '16px' : '40px',
                maxWidth: '1200px',
                lineHeight: '1.6',
                padding: isMobile ? '0 16px' : 0
              }}>
                {t('riparianPage.intro.description')}
              </div>

              {/* Call-to-Action - Text button on mobile, image on desktop */}
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
                    marginBottom: '24px',
                    textTransform: 'uppercase'
                  }}
                >
                  {t('riparianPage.intro.explore')}
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

              {/* Download Section - Desktop only */}
              {!isMobile && (
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
                      {t('riparianPage.intro.accessTeachingMaterials')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a
                        href="https://doi.org/10.5281/zenodo.17484379"
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
                        {t('riparianPage.intro.openPlatform')}
                      </a>
                    </div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '14px',
                      color: '#406A46',
                      fontStyle: 'italic'
                    }}>
                      {t('riparianPage.intro.opensNewTab')}
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
                      {t('riparianPage.intro.exploreRepository')}
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
                        {t('riparianPage.intro.explore')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          ) : isMobile && currentPage >= 1 && currentPage <= 13 ? (
            /* Mobile quiz: one activity per page with Yes/No, immediate feedback */
            (() => {
              const activityIndex = currentPage - 1;
              const option = quizOptions[activityIndex];
              const userAnswer = mobileQuizAnswers[activityIndex];
              const hasAnswered = userAnswer !== null && userAnswer !== undefined;
              const isCorrect = hasAnswered && (userAnswer === option.correct);

              return (
                <div className="flex flex-col items-center" style={{ paddingBottom: '24px' }}>
                  {/* Look carefully instruction */}
                  <p className="text-center mb-4" style={{
                    fontSize: '18px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#619F6A'
                  }}>
                    {t('riparianPage.page1.lookCarefully')}
                  </p>

                  {/* Both images */}
                  <div className="flex justify-center gap-4 mb-6" style={{ flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
                    <img src="/assets/components/Topic2/image1.png" alt="Riparian area 1" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }} />
                    <img src="/assets/components/Topic2/image2.png" alt="Riparian area 2" style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }} />
                  </div>

                  {/* Activity question with Yes/No */}
                  <div className="text-center" style={{ marginBottom: '16px' }}>
                    <p style={{ fontSize: '16px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46', marginBottom: '12px' }}>
                      {t(`riparianPage.quizOptions.${option.labelKey}`)}
                    </p>
                    <div className="flex justify-center" style={{ flexWrap: 'wrap', gap: '24px' }}>
                      <button
                        onClick={() => !hasAnswered && setMobileQuizAnswers(prev => ({ ...prev, [activityIndex]: true }))}
                        disabled={hasAnswered}
                        style={{
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: hasAnswered ? (userAnswer ? (option.correct ? '#548235' : '#C41904') : '#999') : '#51727C',
                          padding: '12px 32px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: hasAnswered ? 'default' : 'pointer',
                          opacity: hasAnswered ? 1 : 1
                        }}
                      >
                        {t('common.yes')}
                      </button>
                      <button
                        onClick={() => !hasAnswered && setMobileQuizAnswers(prev => ({ ...prev, [activityIndex]: false }))}
                        disabled={hasAnswered}
                        style={{
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: hasAnswered ? (!userAnswer ? (!option.correct ? '#548235' : '#C41904') : '#999') : '#51727C',
                          padding: '12px 32px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: hasAnswered ? 'default' : 'pointer',
                          opacity: hasAnswered ? 1 : 1
                        }}
                      >
                        {t('common.no')}
                      </button>
                    </div>
                    {hasAnswered && (
                      <p style={{
                        marginTop: '12px',
                        fontSize: '16px',
                        fontFamily: 'Comfortaa, sans-serif',
                        fontWeight: 'bold',
                        color: isCorrect ? '#548235' : '#C41904'
                      }}>
                        {isCorrect ? t('riparianPage.page1.correct') : t('riparianPage.page1.incorrect')}
                      </p>
                    )}
                  </div>

                  {/* Next button - show after answering */}
                  {hasAnswered && (
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
                  )}
                </div>
              );
            })()
          ) : !isMobile && currentPage === 1 ? (
            <>
              {/* Page 1 Content - Desktop */}
              {/* Intro Text */}
              <div className="text-center mx-auto" style={{ maxWidth: '100%', padding: isMobile ? '0 16px' : 0 }}>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontSize: isMobile ? '18px' : '24px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#619F6A'
                  }}
                >
                  {t('riparianPage.page1.introText')}
                </p>
                
                {/* Second paragraph with pencil icon */}
                <div>
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
                <p 
                  className="leading-relaxed"
                  style={{ 
                        fontSize: isMobile ? '16px' : '24px',
                        fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                        color: '#406A46',
                        margin: '0',
                        textAlign: isMobile ? 'center' : 'left'
                  }}
                >
                      {t('riparianPage.page1.instruction')}{' '}
                      <span style={{ color: '#D2847A' }}>{t('riparianPage.page1.landUseActivities')}</span>{' '}
                      {t('riparianPage.page1.instructionEnd')}
                </p>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-8"
              >
                <div className="flex justify-center items-end" style={{ gap: isMobile ? '12px' : '10%', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
                  {/* Image 1 */}
                  <div style={{ width: isMobile ? '100%' : '40%', maxWidth: isMobile ? '400px' : undefined }}>
                    <img 
                      src="/assets/components/Topic2/image1.png" 
                      alt="Riparian area 1"
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Image 2 */}
                  <div style={{ width: isMobile ? '100%' : '40%', maxWidth: isMobile ? '400px' : undefined }}>
                    <img 
                      src="/assets/components/Topic2/image2.png" 
                      alt="Riparian area 2"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Quiz Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-12 mx-auto"
                style={{ maxWidth: isMobile ? '100%' : '80%', padding: isMobile ? '0 16px' : 0 }}
              >
                {/* Quiz Question */}
                <h3 className="text-center mb-6" style={{ 
                  fontSize: isMobile ? '18px' : '24px', 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold', 
                  color: '#406A46' 
                }}>
                  {t('riparianPage.page1.quizQuestion')}
                </h3>

                {/* Quiz Options - Flowing Layout */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6 justify-center" style={{ width: '100%', gap: isMobile ? '10px' : undefined }}>
                  {quizOptions.map((option) => {
                    const feedback = getOptionFeedback(option);
                    const isSelected = selectedOptions.includes(option.id);
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionToggle(option.id)}
                        disabled={quizSubmitted}
                        className="flex items-center transition-all duration-300 text-left hover:opacity-80"
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: quizSubmitted ? 'default' : 'pointer',
                          gap: '8px',
                          padding: '10px'
                        }}
                      >
                        {/* Custom Checkbox */}
                        <div 
                          className="flex-shrink-0 transition-all duration-300"
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: `2px solid ${
                              feedback === 'correct' ? '#548235' : 
                              feedback === 'incorrect' ? '#C41904' : 
                              feedback === 'missed' ? '#CE7C0A' : 
                              isSelected ? '#548235' : '#999'
                            }`,
                            backgroundColor: feedback === 'correct' ? '#548235' :
                                            feedback === 'incorrect' ? '#C41904' : 
                                            feedback === 'missed' ? '#CE7C0A' :
                                            isSelected ? '#548235' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: feedback ? 'none' : (isSelected ? '0 2px 4px rgba(84, 130, 53, 0.3)' : 'none')
                          }}
                        >
                          {isSelected && !quizSubmitted && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {feedback === 'correct' && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {feedback === 'incorrect' && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            </svg>
                          )}
                          {feedback === 'missed' && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>

                        {/* Label */}
                        <span 
                          className="transition-colors duration-300"
                          style={{ 
                            fontSize: isMobile ? '16px' : '20px', 
                            fontFamily: 'Comfortaa, sans-serif',
                            fontWeight: 'bold',
                            color: feedback === 'missed' ? '#CE7C0A' : 
                                   feedback === 'incorrect' ? '#C41904' :
                                   feedback === 'correct' ? '#548235' :
                                   '#406A46'
                          }}
                        >
                          {t(`riparianPage.quizOptions.${option.labelKey}`)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Message */}
                {showFeedback && (() => {
                  // Calculate scores
                  const correctCount = selectedOptions.filter(id => 
                    quizOptions.find(opt => opt.id === id)?.correct
                  ).length;
                  const incorrectCount = selectedOptions.filter(id => 
                    !quizOptions.find(opt => opt.id === id)?.correct
                  ).length;
                  const missedCount = quizOptions.filter(opt => 
                    opt.correct && !selectedOptions.includes(opt.id)
                  ).length;

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                      style={{ marginTop: '20px' }}
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
                            {correctCount} {t('riparianPage.page1.correct')}
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
                            {incorrectCount} {t('riparianPage.page1.incorrect')}
                          </span>
                        </div>

                        {/* Missed */}
                        <div className="flex items-center" style={{ gap: '12px' }}>
                          <div className="flex items-center justify-center rounded-full" 
                            style={{ 
                              backgroundColor: '#CE7C0A',
                              width: '32px',
                              height: '32px'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span style={{ fontSize: '22px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#CE7C0A' }}>
                            {missedCount} {t('riparianPage.page1.missed')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Mobile: In-content Next - after quiz submitted */}
                {isMobile && quizSubmitted && (
                  <div className="flex justify-center" style={{ marginTop: '24px', paddingBottom: '24px' }}>
                    <button
                      onClick={() => setCurrentPage(2)}
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
              </motion.div>
            </>
          ) : (
            <>
              {/* Stream section: 3 pages - definitions, image 1, image 2 */}
              {(() => {
                const isStreamDefinitionsPage = (isMobile && currentPage === 14) || (!isMobile && currentPage === 2);
                const isStreamImage1Page = (isMobile && currentPage === 15) || (!isMobile && currentPage === 3);
                const leftZoneIds = dropZones.filter(z => z.image === 'left').map(z => z.id);
                const allLeftFilled = leftZoneIds.every(id => placements[id]);

                if (isStreamDefinitionsPage) {
                  return (
                    <div className="flex flex-col items-center" style={{ paddingBottom: '24px' }}>
                      <p style={{ fontSize: isMobile ? '18px' : '24px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46', marginBottom: '24px', textAlign: 'center' }}>
                        {t('riparianPage.page2.definitionsIntro', { defaultValue: 'Lees de uitleg van de woorden:' })}
                      </p>
                      <div className="space-y-4" style={{ maxWidth: '800px', marginBottom: '24px' }}>
                        <p style={{ fontSize: isMobile ? '16px' : '20px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46', lineHeight: '1.6' }}>
                          <strong style={{ color: labelColors.POOL }}>{t('riparianPage.page2.labels.POOL')}:</strong> {t('riparianPage.page2.definitions.POOL')}
                        </p>
                        <p style={{ fontSize: isMobile ? '16px' : '20px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46', lineHeight: '1.6' }}>
                          <strong style={{ color: labelColors.RIFFLE }}>{t('riparianPage.page2.labels.RIFFLE')}:</strong> {t('riparianPage.page2.definitions.RIFFLE')}
                        </p>
                        <p style={{ fontSize: isMobile ? '16px' : '20px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46', lineHeight: '1.6' }}>
                          <strong style={{ color: labelColors.RUN }}>{t('riparianPage.page2.labels.RUN')}:</strong> {t('riparianPage.page2.definitions.RUN')}
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentPage(isMobile ? 15 : 3)}
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
                  );
                }

                if (isStreamImage1Page) {
                  const leftZones = dropZones.filter(z => z.image === 'left');
                  const leftCorrectCount = leftZones.filter(z => placements[z.id] === z.correctLabel).length;
                  const leftIncorrectCount = leftZones.filter(z => placements[z.id] && placements[z.id] !== z.correctLabel).length;
                  const leftMissedCount = leftZones.filter(z => !placements[z.id]).length;
                  return (
                    <>
                      <div className="text-center mx-auto mb-4" style={{ maxWidth: isMobile ? '100%' : '80%', padding: isMobile ? '0 16px' : 0 }}>
                        <p style={{ fontSize: isMobile ? '16px' : '24px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46' }}>
                          {t('riparianPage.page2.placeInImage1', { defaultValue: 'Sleep elk woord naar de juiste plek in afbeelding 1.' })}
                        </p>
                      </div>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-2">
                        <div className="flex justify-center items-center" style={{ gap: isMobile ? '16px' : '4%', flexDirection: isMobile ? 'column' : 'row' }}>
                          <div style={{ width: isMobile ? '100%' : '40%', maxWidth: isMobile ? '400px' : undefined, position: 'relative' }}>
                            <img src="/assets/components/Riparian/stream.png" alt="Stream habitat" className="w-full h-auto" />
                            {leftZones.map(zone => {
                              const currentLabel = placements[zone.id];
                              const feedback = getPage2Image1Feedback(zone.id);
                              const isCorrect = feedback === 'correct';
                              const isIncorrect = feedback === 'incorrect';
                              return (
                                <div key={zone.id} style={{ position: 'absolute', left: `${zone.x}%`, top: `${zone.y}%`, transform: 'translate(-50%, -50%)', cursor: !page2Image1Submitted && isMobile && currentLabelToPlace ? 'pointer' : undefined }} onClick={!page2Image1Submitted && isMobile ? () => handleDrop(zone.id) : undefined}>
                                  <div onDragOver={!page2Image1Submitted && !isMobile ? handleDragOver : undefined} onDrop={!page2Image1Submitted && !isMobile ? () => handleDrop(zone.id) : undefined} className="rounded-full border-4 transition-all duration-300" style={{ width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', backgroundColor: currentLabel ? labelColors[currentLabel as keyof typeof labelColors] : 'transparent', borderColor: isCorrect ? '#548235' : isIncorrect ? '#C41904' : currentLabel ? '#333' : 'white', boxShadow: currentLabel ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: !page2Image1Submitted && ((isMobile && currentLabelToPlace) || draggedLabel) ? 'pointer' : 'default' }}>
                                    {currentLabel ? '' : '?'}
                                  </div>
                                  {((isIncorrect || feedback === 'empty') && page2Image1Submitted) && (
                                    <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', backgroundColor: isIncorrect ? '#fef2f2' : '#fef3c7', border: `2px solid ${isIncorrect ? '#C41904' : '#CE7C0A'}`, borderRadius: '8px', padding: '6px 10px', fontSize: '14px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: isIncorrect ? '#C41904' : '#CE7C0A', whiteSpace: 'nowrap', zIndex: 100, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}>
                                      {t('riparianPage.page2.correct')} {t(`riparianPage.page2.labels.${zone.correctLabel}`)}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          {!page2Image1Submitted && (
                            <div className="flex flex-col justify-center items-center" style={{ gap: '20px', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap' }}>
                              {labels.map(label => {
                                const labelColor = labelColors[label as keyof typeof labelColors];
                                const isSelected = isMobile ? currentLabelToPlace === label : draggedLabel === label;
                                return (
                                  <div key={label} draggable={!isMobile} onDragStart={!isMobile ? () => handleDragStart(label) : undefined} onDragEnd={!isMobile ? handleDragEnd : undefined} onClick={isMobile ? () => setCurrentLabelToPlace(prev => prev === label ? null : label) : undefined} className="font-bold transition-all duration-300 hover:opacity-80" style={{ backgroundColor: labelColor, color: '#fff', borderRadius: '30px', padding: '10px 16px', fontSize: '24px', fontFamily: 'Comfortaa, sans-serif', textAlign: 'center', cursor: isMobile ? 'pointer' : 'move', opacity: isSelected ? 0.5 : 1, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
                                    {t(`riparianPage.page2.labels.${label}`)}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                      {allLeftFilled && !page2Image1Submitted && (
                        <div className="flex justify-center" style={{ marginTop: '24px', paddingBottom: '24px' }}>
                          <button onClick={() => handleSubmitPage2Image1()} style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '16px', fontWeight: 'bold', color: 'white', backgroundColor: '#51727C', padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%', maxWidth: '280px' }}>
                            {t('riparianPage.page2.checkAnswers')}
                          </button>
                        </div>
                      )}
                      {page2Image1Submitted && (
                        <>
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center" style={{ marginTop: '20px' }}>
                            <div className="inline-flex justify-center items-center" style={{ gap: '24px', flexWrap: 'wrap' }}>
                              <div className="flex items-center" style={{ gap: '12px' }}>
                                <div style={{ backgroundColor: '#548235', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                                <span style={{ fontSize: '20px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#548235' }}>{leftCorrectCount} {t('riparianPage.page1.correct')}</span>
                              </div>
                              <div className="flex items-center" style={{ gap: '12px' }}>
                                <div style={{ backgroundColor: '#C41904', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg></div>
                                <span style={{ fontSize: '20px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#C41904' }}>{leftIncorrectCount} {t('riparianPage.page1.incorrect')}</span>
                              </div>
                              <div className="flex items-center" style={{ gap: '12px' }}>
                                <div style={{ backgroundColor: '#CE7C0A', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                                <span style={{ fontSize: '20px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#CE7C0A' }}>{leftMissedCount} {t('riparianPage.page1.missed')}</span>
                              </div>
                            </div>
                          </motion.div>
                          <div className="flex justify-center" style={{ marginTop: '24px', paddingBottom: '24px' }}>
                            <button onClick={() => setCurrentPage(isMobile ? 16 : 4)} style={{ fontFamily: 'Comfortaa, sans-serif', fontSize: '16px', fontWeight: 'bold', color: 'white', backgroundColor: '#51727C', padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%', maxWidth: '280px' }}>
                              {t('common.next')}
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  );
                }

                return null;
              })()}
              {(() => {
                const isStreamImage2Page = (isMobile && currentPage === 16) || (!isMobile && currentPage === 4);
                if (!isStreamImage2Page) return null;
                return (
                  <>
              {/* Image 2 page - instruction */}
              <div className="text-center mx-auto mb-4" style={{ maxWidth: isMobile ? '100%' : '80%', padding: isMobile ? '0 16px' : 0 }}>
                <p style={{ fontSize: isMobile ? '16px' : '24px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46' }}>
                  {t('riparianPage.page2.placeInImage2', { defaultValue: 'Sleep elk woord naar de juiste plek in afbeelding 2.' })}
                </p>
              </div>

              {/* Image 2: Right Image with Drop Zones only */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-2"
              >
                <div className="flex justify-center items-center" style={{ gap: isMobile ? '16px' : '4%', flexDirection: isMobile ? 'column' : 'row' }}>
                    {/* Right Image with Drop Zones */}
                    <div style={{ width: isMobile ? '100%' : '40%', maxWidth: isMobile ? '400px' : undefined, position: 'relative' }}>
                      <img 
                        src="/assets/components/Riparian/river.png" 
                        alt="Stream habitat"
                        className="w-full h-auto"
                      />
                    {/* Clickable circles for right image */}
                    {dropZones.filter(z => z.image === 'right').map(zone => {
                      const currentLabel = placements[zone.id];
                      const feedback = getPage2Feedback(zone.id);
                      const isCorrect = feedback === 'correct';
                      const isIncorrect = feedback === 'incorrect';
                      
                      return (
                        <div
                          key={zone.id}
                          style={{
                            position: 'absolute',
                            left: `${zone.x}%`,
                            top: `${zone.y}%`,
                            transform: 'translate(-50%, -50%)',
                            cursor: isMobile && currentLabelToPlace && !page2Submitted ? 'pointer' : undefined
                          }}
                          onClick={isMobile ? () => handleDrop(zone.id) : undefined}
                        >
                          <div
                            onDragOver={!isMobile ? handleDragOver : undefined}
                            onDrop={!isMobile ? () => handleDrop(zone.id) : undefined}
                            className="rounded-full border-4 transition-all duration-300"
                            style={{
                              width: '40px',
                              height: '40px',
                              minWidth: '40px',
                              minHeight: '40px',
                              maxWidth: '40px',
                              maxHeight: '40px',
                              backgroundColor: currentLabel ? labelColors[currentLabel as keyof typeof labelColors] : 'transparent',
                              borderColor: isCorrect ? '#548235' : isIncorrect ? '#C41904' : currentLabel ? '#333' : 'white',
                              boxShadow: currentLabel ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(255, 255, 255, 0.5)',
                              fontSize: '32px',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontWeight: 'bold',
                              color: currentLabel ? 'white' : 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                              margin: 0,
                              cursor: (isMobile && currentLabelToPlace) || draggedLabel ? 'pointer' : 'default'
                            }}
                          >
                            {currentLabel ? '' : '?'}
                          </div>
                          
                          {/* Show correct answer when incorrect or empty */}
                          {((isIncorrect || feedback === 'empty') && page2Submitted) && (
                            <div
                              style={{
                                position: 'absolute',
                                top: '50px',
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
                              {t('riparianPage.page2.correct')} {t(`riparianPage.page2.labels.${zone.correctLabel}`)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                    {/* Draggable Labels */}
                    <div className="flex flex-col justify-center items-center" style={{ gap: '20px', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap' }}>
                      {labels.map(label => {
                        const labelColor = labelColors[label as keyof typeof labelColors];
                        const textColor = '#fff';
                        const labelText = t(`riparianPage.page2.labels.${label}`);
                        const isSelected = isMobile ? currentLabelToPlace === label : draggedLabel === label;
                        return (
                          <div
                            key={label}
                            draggable={!isMobile && !page2Submitted}
                            onDragStart={!isMobile ? () => handleDragStart(label) : undefined}
                            onDragEnd={!isMobile ? handleDragEnd : undefined}
                            onClick={isMobile ? () => setCurrentLabelToPlace(prev => prev === label ? null : label) : undefined}
                            className="font-bold transition-all duration-300 hover:opacity-80"
                            style={{
                              backgroundColor: labelColor,
                              color: textColor,
                              borderRadius: '30px',
                              padding: '10px 16px',
                              fontSize: '24px',
                              fontFamily: 'Comfortaa, sans-serif',
                              textAlign: 'center',
                              cursor: page2Submitted ? 'not-allowed' : (isMobile ? 'pointer' : 'move'),
                              opacity: isSelected ? 0.5 : 1,
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              border: 'none',
                              width: 'auto',
                              minWidth: 'fit-content',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {labelText}
                          </div>
                        );
                      })}
                    </div>
                </div>
              </motion.div>

              {/* Image 2 Feedback - only for right zones */}
              {showPage2Feedback && (() => {
               const rightZones = dropZones.filter(z => z.image === 'right');
               const correctCount = rightZones.filter(z => placements[z.id] === z.correctLabel).length;
               const incorrectCount = rightZones.filter(z => placements[z.id] && placements[z.id] !== z.correctLabel).length;
               const missedCount = rightZones.filter(z => !placements[z.id]).length;

               return (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="text-center"
                   style={{ marginTop: '10px' }}
                 >
                   <div className="inline-flex items-center justify-center" 
                     style={{ gap: '10px' }}
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
                         {correctCount} {t('riparianPage.page1.correct')}
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
                         {incorrectCount} {t('riparianPage.page1.incorrect')}
                       </span>
                     </div>

                     {/* Missed */}
                     <div className="flex items-center" style={{ gap: '12px' }}>
                       <div className="flex items-center justify-center rounded-full" 
                         style={{ 
                           backgroundColor: '#CE7C0A',
                           width: '32px',
                           height: '32px'
                         }}
                       >
                         <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                           <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                       </div>
                       <span style={{ fontSize: '22px', fontWeight: '600', color: '#CE7C0A' }}>
                         {missedCount} {t('riparianPage.page1.missed')}
                       </span>
                     </div>
                   </div>
                 </motion.div>
               );
               })()}

              {/* Mobile: In-content Check Answers / Back to home - only on image 2 page */}
              {isMobile && ((isMobile && currentPage === 16) || (!isMobile && currentPage === 4)) && (() => {
                const rightZoneIds = dropZones.filter(z => z.image === 'right').map(z => z.id);
                const allRightFilled = rightZoneIds.every(id => placements[id]);
                return allRightFilled || page2Submitted;
              })() && (
                <div className="flex justify-center" style={{ marginTop: '24px', paddingBottom: '24px' }}>
                  <button
                    onClick={() => {
                      const rightZoneIds = dropZones.filter(z => z.image === 'right').map(z => z.id);
                      const allRightFilled = rightZoneIds.every(id => placements[id]);
                      if (!page2Submitted && allRightFilled) {
                        handleSubmitPage2();
                      } else if (page2Submitted) {
                        onHomeClick();
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
                    {!page2Submitted ? t('riparianPage.page2.checkAnswers') : t('common.backToHome')}
                  </button>
                </div>
              )}
                  </>
                );
              })()}
            </>
          )}
        </motion.div>
      </div>

      {/* Pagination and Next Button - Sticky Footer - Desktop only (mobile uses in-content buttons) */}
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
            {/* Download Button - Only on completion, left of pagination - Hide if not enough space */}
            {currentPage === 4 && page2Submitted && hasEnoughSpace && (
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
              {Array.from({ length: totalPages }, (_, index) => {
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

            {/* NEXT TOPIC Text - Only on completion, right of pagination - Hide if not enough space */}
            {currentPage === 4 && page2Submitted && hasEnoughSpace && (
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46'
                }}>
                  NEXT TOPIC: Floodplains like a sponge
                </span>
              </div>
            )}
          </motion.div>

          {/* Next Button - Right - Only on completion */}
          {currentPage === 4 && page2Submitted && (
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
                  // Navigate to Flood Control page
                  if (onFloodControlClick) {
                    onFloodControlClick();
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
                  alt="Floodplains like a sponge"
                  style={{
                    width: 'auto',
                    height: '60px',
                    opacity: 1
                  }}
                />
              </button>
            </div>
          )}

          {/* Check Answers / Next Button - Right - Only during drag & drop */}
          {!(currentPage === 4 && page2Submitted) && (
            <div className="flex items-center" style={{ paddingRight: '16px', gap: '16px' }}>
              {/* Retry Button - Show when quiz is submitted */}
              {quizSubmitted && currentPage === 1 && (
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
                  if (currentPage === 1) {
                    if (!quizSubmitted) {
                      if (selectedOptions.length > 0) {
                        handleSubmitQuiz();
                      }
                    } else {
                      setCurrentPage(2);
                    }
                  } else if (currentPage === 2) {
                    setCurrentPage(3);
                  } else if (currentPage === 3) {
                    if (!page2Image1Submitted) {
                      const leftZoneIds = dropZones.filter(z => z.image === 'left').map(z => z.id);
                      if (leftZoneIds.every(id => placements[id])) {
                        handleSubmitPage2Image1();
                      }
                    } else {
                      setCurrentPage(4);
                    }
                  } else if (currentPage === 4) {
                    const rightZoneIds = dropZones.filter(z => z.image === 'right').map(z => z.id);
                    const allRightFilled = rightZoneIds.every(id => placements[id]);
                    if (!page2Submitted) {
                      if (allRightFilled) {
                        handleSubmitPage2();
                      }
                    } else {
                      if (onFloodControlClick) {
                        onFloodControlClick();
                      }
                    }
                  }
                }}
                disabled={
                  (currentPage === 1 && !quizSubmitted && selectedOptions.length === 0) ||
                  (currentPage === 3 && !page2Image1Submitted && !dropZones.filter(z => z.image === 'left').every(z => placements[z.id])) ||
                  (currentPage === 4 && !page2Submitted && !dropZones.filter(z => z.image === 'right').every(z => placements[z.id]))
                }
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
                  alt={((currentPage === 1 && !quizSubmitted) || (currentPage === 3 && !page2Image1Submitted) || (currentPage === 4 && !page2Submitted)) ? 'Check Answers' : 'Next'} 
                  style={{ 
                    width: 'auto',
                    height: '60px',
                    opacity: ((currentPage === 1 && !quizSubmitted && selectedOptions.length === 0) ||
                             (currentPage === 3 && !page2Image1Submitted && !dropZones.filter(z => z.image === 'left').every(z => placements[z.id])) ||
                             (currentPage === 4 && !page2Submitted && !dropZones.filter(z => z.image === 'right').every(z => placements[z.id])))
                      ? 0.5 : 1
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
                  alt={t('riparianPage.modal.exploreRepository')} 
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
                  {t('riparianPage.modal.exploreRepository')}
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
