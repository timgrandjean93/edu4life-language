import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HomeButton } from '../HomeButton';
import { usePageRouting } from '../../hooks/usePageRouting';
import { LocalizedImage } from '../LocalizedImage';

interface CarbonPageProps {
  onHomeClick: () => void;
  onSelfPurificationClick?: () => void;
  onRepositoryClick?: () => void;
}

const TOTAL_PAGES = 3;

// Hover areas will be created inside component to access translations
const createCarbonHoverAreas = (t: (key: string) => string) => [
  {
    id: 'anthropogenic-release',
    x: 80,
    y: 10,
    width: 30,
    height: 25,
    text: t('carbonPage.page2.hoverAreas.anthropogenic-release')
  },
  {
    id: 'carbon-sequestration',
    x: 30,
    y: 20,
    width: 30,
    height: 25,
    text: t('carbonPage.page2.hoverAreas.carbon-sequestration')
  },
  {
    id: 'natural-release',
    x: 10,
    y: 50,
    width: 30,
    height: 25,
    text: t('carbonPage.page2.hoverAreas.natural-release')
  },
  {
    id: 'carbon-storage',
    x: 60,
    y: 70,
    width: 30,
    height: 25,
    text: t('carbonPage.page2.hoverAreas.carbon-storage')
  }
];

// Carbon puzzle data - will be created dynamically based on language

// Ecosystem labels will be created inside component to access translations
const createEcosystemLabels = (t: (key: string) => string) => [
  { id: 'tropical-forests', label: t('carbonPage.ecosystemLabels.tropicalForests'), correctPosition: 'tropical-forests' },
  { id: 'temperate-forests', label: t('carbonPage.ecosystemLabels.temperateForests'), correctPosition: 'temperate-forests' },
  { id: 'boreal-forests', label: t('carbonPage.ecosystemLabels.borealForests'), correctPosition: 'boreal-forests' },
  { id: 'tropical-savannas', label: t('carbonPage.ecosystemLabels.tropicalSavannas'), correctPosition: 'tropical-savannas' },
  { id: 'temperate-grasslands', label: t('carbonPage.ecosystemLabels.temperateGrasslands'), correctPosition: 'temperate-grasslands' },
  { id: 'deserts-semi-deserts', label: t('carbonPage.ecosystemLabels.desertsSemiDeserts'), correctPosition: 'deserts-semi-deserts' },
  { id: 'tundra', label: t('carbonPage.ecosystemLabels.tundra'), correctPosition: 'tundra' },
  { id: 'wetlands', label: t('carbonPage.ecosystemLabels.wetlands'), correctPosition: 'wetlands' },
  { id: 'croplands', label: t('carbonPage.ecosystemLabels.croplands'), correctPosition: 'croplands' }
];

// Drop zones on the image (positions as percentages)
const dropZones = [
  { id: 'tropical-forests', x: 54.5, y: 87, width: 6, height: 6 },
  { id: 'temperate-forests', x: 67.5, y: 87, width: 6, height: 6 },
  { id: 'boreal-forests', x: 35, y: 87, width: 6, height: 6 },
  { id: 'tropical-savannas', x: 61, y: 87, width: 6, height: 6 },
  { id: 'temperate-grasslands', x: 41.5, y: 87, width: 6, height: 6 },
  { id: 'deserts-semi-deserts', x: 80.5, y: 87, width: 6, height: 6 },
  { id: 'tundra', x: 48, y: 87, width: 6, height: 6 },
  { id: 'wetlands', x: 28.5, y: 87, width: 6, height: 6 },
  { id: 'croplands', x: 74, y: 87, width: 6, height: 6 }
];

// Icon hover areas at the top of the carbon.png image (9 icons)
// Uses same x position and width as drop zones, height is approximately 2x width
const iconHoverAreas = dropZones.map((zone, index) => ({
  index: index,
  x: zone.x,
  y: 8, // Position at top of image
  width: zone.width, // Same width as drop zone
  height: zone.width * 2, // Height is 2x the width
  iconPath: index === 0 
    ? '/assets/components/carbon/icons/icon.png' 
    : `/assets/components/carbon/icons/icon-${index}.png`
}));

export const CarbonPage: React.FC<CarbonPageProps> = ({
  onHomeClick,
  onSelfPurificationClick,
  onRepositoryClick
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = usePageRouting(TOTAL_PAGES);
  
  // Create translated data structures
  const carbonHoverAreas = React.useMemo(() => createCarbonHoverAreas(t), [t]);
  const ecosystemLabels = React.useMemo(() => createEcosystemLabels(t), [t]);
  
  // Create puzzle data dynamically based on language
  const puzzleBlanks = React.useMemo(() => {
    const correctAnswers = t('carbonPage.page3.correctAnswers', { returnObjects: true }) as Record<string, string>;
    const blankPositions = t('carbonPage.page3.blankPositions', { returnObjects: true }) as Record<string, string>;
    const blankIds = Object.keys(correctAnswers).sort();
    return blankIds.map(id => ({
      id,
      position: blankPositions[id] || id,
      correctAnswer: correctAnswers[id]
    }));
  }, [t]);
  
  // Helper function to get blank after a specific part
  const getBlankAfterPart = (partNumber: number): string | null => {
    const partKey = `afterPart${partNumber}`;
    const blank = puzzleBlanks.find(b => b.position === partKey);
    return blank ? blank.id : null;
  };
  
  const hiddenLetters = React.useMemo(() => {
    const letters = t('carbonPage.page3.hiddenLetters', { returnObjects: true }) as Record<string, { text: string; x: number; y: number }>;
    return Object.keys(letters).sort().map((key, index) => ({
      id: `letter${index + 1}`,
      text: letters[key].text,
      x: letters[key].x,
      y: letters[key].y
    }));
  }, [t]);
  const [draggedLabel, setDraggedLabel] = React.useState<string | null>(null);
  const [placements, setPlacements] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  
  // Page 2 state - Modal and quiz
  const [showModal, setShowModal] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState('');
  const [quizSubmitted, setQuizSubmitted] = React.useState(false);
  const [showQuizFeedback, setShowQuizFeedback] = React.useState(false);
  
  // Page 2 hover state
  const [hoveredArea, setHoveredArea] = React.useState<string | null>(null);
  
  // Page 1 icon hover state
  const [hoveredIconIndex, setHoveredIconIndex] = React.useState<number | null>(null);
  const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number } | null>(null);
  
  // Page 3 state - Carbon puzzle
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);
  const [puzzleAnswers, setPuzzleAnswers] = React.useState<Record<string, string>>({});
  const [puzzleSubmitted, setPuzzleSubmitted] = React.useState(false);
  // removed feedback state
  
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

  // Auto-submit page 1 when all labels are placed
  React.useEffect(() => {
    if (currentPage === 1 && !submitted) {
      const allLabelsPlaced = Object.keys(placements).length === 9;
      if (allLabelsPlaced) {
        // Small delay to allow the last drop animation to complete
        setTimeout(() => {
          handleSubmit();
        }, 300);
      }
    }
  }, [placements, currentPage, submitted]);

  // Auto-submit page 3 when all blanks are filled
  React.useEffect(() => {
    if (currentPage === 3 && !puzzleSubmitted) {
      const allBlanksFilled = Object.keys(puzzleAnswers).length >= puzzleBlanks.length && 
                              Object.values(puzzleAnswers).every(answer => answer && answer.trim() !== '') &&
                              puzzleBlanks.every(blank => puzzleAnswers[blank.id] && puzzleAnswers[blank.id].trim() !== '');
      if (allBlanksFilled) {
        // Small delay to allow the last fill animation to complete
        setTimeout(() => {
          handlePuzzleSubmit();
        }, 300);
      }
    }
  }, [puzzleAnswers, currentPage, puzzleSubmitted, puzzleBlanks]);

  const handleDragStart = (labelId: string) => {
    if (submitted) return;
    setDraggedLabel(labelId);
  };

  const handleDragEnd = () => {
    setDraggedLabel(null);
  };

  const handleDrop = (zoneId: string) => {
    if (submitted || !draggedLabel) return;
    
    setPlacements(prev => ({
      ...prev,
      [zoneId]: draggedLabel
    }));
    
    setDraggedLabel(null);
  };

  const handleRemoveLabel = (zoneId: string) => {
    if (submitted) return;
    
    setPlacements(prev => {
      const newPlacements = { ...prev };
      delete newPlacements[zoneId];
      return newPlacements;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Retry function to reset activity
  const handleRetry = () => {
    if (currentPage === 1) {
      setPlacements({});
      setSubmitted(false);
      setShowFeedback(false);
      setDraggedLabel(null);
    } else if (currentPage === 3) {
      setPuzzleAnswers({});
      setPuzzleSubmitted(false);
      setSelectedLetter(null);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowFeedback(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentPage(2);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    setShowQuizFeedback(true);
  };

  const isQuizAnswerCorrect = () => {
    return selectedAnswer === 'wetlands';
  };

  const handleAreaHover = (areaId: string) => {
    setHoveredArea(areaId);
  };

  const handleAreaLeave = () => {
    setHoveredArea(null);
  };

  // Page 3 puzzle handlers
  const handleLetterClick = (letterText: string) => {
    if (puzzleSubmitted) return;
    setSelectedLetter(letterText);
  };

  const handleBlankClick = (blankId: string) => {
    if (puzzleSubmitted) return;
    
    // If clicking on a blank that already has a letter, remove it
    if (puzzleAnswers[blankId]) {
      setPuzzleAnswers(prev => {
        const newAnswers = { ...prev };
        delete newAnswers[blankId];
        return newAnswers;
      });
      return;
    }
    
    // If no letter is selected, don't do anything
    if (!selectedLetter) return;
    
    // Place the selected letter
    setPuzzleAnswers(prev => ({
      ...prev,
      [blankId]: selectedLetter
    }));
    
    setSelectedLetter(null);
  };

  // Download modal handlers
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink1 = () => {
    window.open('https://zenodo.org/records/17453840', '_blank');
    setShowDownloadModal(false);
  };

  const handleZenodoLink2 = () => {
    window.open('https://doi.org/10.5281/zenodo.17463284', '_blank');
    setShowDownloadModal(false);
  };

  const handleDashboardLink = () => {
    setShowDownloadModal(false);
    if (onRepositoryClick) {
      onRepositoryClick();
    }
  };

  const handlePuzzleSubmit = () => {
    setPuzzleSubmitted(true);
  };

  const isPuzzleAnswerCorrect = (blankId: string) => {
    const blank = puzzleBlanks.find(b => b.id === blankId);
    return blank && puzzleAnswers[blankId] === blank.correctAnswer;
  };
  
  // Helper function to render a blank
  const renderBlank = (blankId: string) => {
    const blank = puzzleBlanks.find(b => b.id === blankId);
    if (!blank) return null;
    
    return (
      <span 
        onClick={() => handleBlankClick(blankId)}
        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
          !puzzleAnswers[blankId] 
            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            : ''
        }`}
        style={{
          textDecoration: puzzleSubmitted && puzzleAnswers[blankId] && !isPuzzleAnswerCorrect(blankId) ? 'line-through' : 'none',
          backgroundColor: puzzleSubmitted && puzzleAnswers[blankId] 
            ? (isPuzzleAnswerCorrect(blankId) ? '#548235' : '#C41904')
            : undefined,
          color: puzzleSubmitted && puzzleAnswers[blankId] 
            ? (isPuzzleAnswerCorrect(blankId) ? 'white' : 'white')
            : undefined
        }}
      >
        {puzzleAnswers[blankId] || '_'}
      </span>
    );
  };

  // getPuzzleScore no longer used after removing feedback block

  const isPlacementCorrect = (zoneId: string): boolean => {
    const zone = dropZones.find(z => z.id === zoneId);
    if (!zone) return false;
    return placements[zoneId] === zone.id;
  };

  const correctCount = Object.keys(placements).filter(zoneId => isPlacementCorrect(zoneId)).length;
  const incorrectCount = Object.keys(placements).filter(zoneId => placements[zoneId] && !isPlacementCorrect(zoneId)).length;
  const missedCount = dropZones.length - Object.keys(placements).length;

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', overflowX: 'visible', paddingBottom: '0px' }}>
      
      {/* Modal for Page 2 Quiz */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              border: 'none',
              width: '50%',
              maxWidth: '600px',
              minWidth: '400px'
            }}
          >
            {/* Close button */}
            <button
              onClick={handleModalClose}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                color: '#6b7280',
                fontSize: '24px',
                fontWeight: 'bold',
                backgroundColor: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            >
              ×
            </button>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: '#1e3a8a', 
                marginBottom: '12px',
                fontFamily: 'Comfortaa, sans-serif'
              }}>
                {t('carbonPage.page2.modal.title')}
              </h2>
            </div>
            
            {/* Content */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                borderLeft: '4px solid #10b981'
              }}>
                <p style={{
                  fontSize: '20px',
                  color: '#065f46',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  margin: 0
                }}>
                  {t('carbonPage.page2.modal.fact')}
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#eff6ff',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <p style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1e3a8a',
                  marginBottom: '16px',
                  textAlign: 'center',
                  margin: '0 0 16px 0'
                }}>
                  {t('carbonPage.page2.modal.question')}
                </p>
                
                <div style={{ marginBottom: '16px' }}>
                  <select
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={quizSubmitted}
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '3px solid #93c5fd',
                      borderRadius: '16px',
                      fontSize: '18px',
                      backgroundColor: 'white',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#93c5fd';
                    }}
                  >
                    <option value="">{t('carbonPage.page2.modal.selectEcosystem')}</option>
                    {ecosystemLabels.map((label) => (
                      <option key={label.id} value={label.id}>
                        {label.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {showQuizFeedback && (
                <div style={{ 
                  marginBottom: '24px',
                  padding: '24px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backgroundColor: isQuizAnswerCorrect() ? '#f0fdf4' : '#fef2f2',
                  border: `3px solid ${isQuizAnswerCorrect() ? '#548235' : '#C41904'}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    color: isQuizAnswerCorrect() ? '#548235' : '#C41904'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px',
                      backgroundColor: isQuizAnswerCorrect() ? '#bbf7d0' : '#fecaca'
                    }}>
                      {isQuizAnswerCorrect() ? (
                        <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6 11L13 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                          <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: '20px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: isQuizAnswerCorrect() ? '#548235' : '#C41904' }}>
                      {isQuizAnswerCorrect() ? t('carbonPage.page2.modal.feedback.correct') : t('carbonPage.page2.modal.feedback.incorrect')}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '18px',
                    color: '#374151',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {t('carbonPage.page2.modal.feedback.explanation')}
                  </p>
                </div>
              )}
            </div>

            {/* Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={quizSubmitted ? handleModalClose : handleQuizSubmit}
                disabled={!selectedAnswer && !quizSubmitted}
                style={{
                  width: quizSubmitted ? '200px' : '180px',
                  height: '60px',
                  backgroundColor: (!selectedAnswer && !quizSubmitted) ? '#ccc' : '#51727C',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: (!selectedAnswer && !quizSubmitted) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  opacity: (!selectedAnswer && !quizSubmitted) ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!(!selectedAnswer && !quizSubmitted)) {
                    e.currentTarget.style.opacity = '0.8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!(!selectedAnswer && !quizSubmitted)) {
                    e.currentTarget.style.opacity = '1';
                  }
                }}
              >
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', lineHeight: '1' }}>
                  {quizSubmitted ? t('carbonPage.page2.modal.nextPage') : t('carbonPage.page2.modal.submitAnswer')}
                </span>
                {quizSubmitted && (
                  <svg 
                    width="28" 
                    height="28" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Header with title and home button */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            {/* Header with Title - Different per page */}
            <div className="relative">
              {/* Title - Centered */}
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  {currentPage === 0 ? t('carbonPage.title.page0') :
                   currentPage === 1 ? t('carbonPage.title.page1') :
                   t('carbonPage.title.page2')}
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8" style={{ paddingBottom: '10px', flex: 1 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {currentPage === 0 ? (
            // Intro Page: Introduction with carbon-info.png, description, and CTA button
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Single Illustration - Centered */}
              <div className="flex justify-center mb-8" style={{ width: '100%', maxWidth: '600px' }}>
                <div style={{ width: '100%', maxWidth: '600px' }}>
                  <img 
                    src="/assets/components/carbon/carbon-info.png"
                    alt={t('carbonPage.title.page0')}
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
                {t('carbonPage.intro.description')}
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
                    {t('carbonPage.intro.accessTeachingMaterials')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a
                        href="https://zenodo.org/records/17453840"
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
                        {t('carbonPage.intro.openPlatform')}
                      </a>
                    </div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '14px',
                      color: '#406A46',
                      fontStyle: 'italic'
                    }}>
                      {t('carbonPage.intro.opensNewTab')}
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
                    alt={t('carbonPage.modal.exploreRepository')}
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
                    {t('carbonPage.intro.exploreRepository')}
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
                        {t('carbonPage.intro.explore')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : currentPage === 1 ? (
            <>
              {/* Page 1 Content - Full Layout */}
              
              {/* Pointer Icon and Instructions - Above columns */}
              <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                {/* Pointer Icon */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                  <img 
                    src="/assets/icons/pointer.png" 
                    alt="Pointer" 
                    style={{ width: '70px', height: '70px' }}
                  />
                </div>

                {/* Title */}
                <h2 style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '28px',
                  color: '#406A46',
                  textAlign: 'center',
                  marginBottom: '15px',
                  lineHeight: '1.2'
                }}>
                  {t('carbonPage.page1.title')}
                </h2>

                {/* Instructions Text */}
                <div style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: '#406A46',
                  lineHeight: '1.4',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  <p style={{ margin: 0 }}>
                    {t('carbonPage.page1.instruction1')}
                  </p>
                  <p style={{ margin: '8px 0 0 0' }}>
                    {t('carbonPage.page1.instruction2')} <span style={{ color: '#9F8B68' }}>{t('carbonPage.page1.instruction3')}</span>
                  </p>
                </div>
              </div>
              
              {/* Two Column Layout: 1/3 Left with Draggable Labels, 2/3 Right with Image */}
              <div className="flex" style={{ gap: '40px', maxWidth: '1400px', margin: '0 auto', alignItems: 'center', position: 'relative' }}>
                
                {/* Left Column (1/3) - Draggable Labels */}
                <div style={{ width: '33.333%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  
                  {/* Draggable Labels - 2 Columns, vertically centered */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    width: '100%'
                  }}>
                    {ecosystemLabels.map((label, index) => {
                      const isUsed = Object.values(placements).includes(label.id);
                      const isDragging = draggedLabel === label.id;
                      
                      // Don't render if label is already used
                      if (isUsed) return null;
                      
                      return (
                        <motion.div
                          key={label.id}
                          draggable={!submitted}
                          onDragStart={() => handleDragStart(label.id)}
                          onDragEnd={handleDragEnd}
                          className="transition-all duration-300 hover:opacity-80"
                          style={{
                            backgroundColor: '#51727C',
                            color: 'white',
                            borderRadius: '12px',
                            padding: '12px 8px',
                            cursor: submitted ? 'not-allowed' : 'move',
                            opacity: isDragging ? 0.5 : 1,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '40px'
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          {label.label}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column (2/3) - Image with Drop Zones */}
                <div style={{ width: '66.667%', position: 'sticky', top: '100px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxHeight: 'calc(100vh - 120px)' }}>
                  <div className="relative" style={{ width: '100%' }}>
                <img 
                  src="/assets/components/carbon/carbon.png"
                  alt="Carbon pools ecosystem map"
                  className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300"
                  style={{ backgroundColor: 'transparent', display: 'block' }}
                  id="carbon-image"
                />
                
                {/* Icon Hover Areas - Top of image */}
                {iconHoverAreas.map((iconArea) => (
                  <div
                    key={`icon-${iconArea.index}`}
                    className="absolute cursor-pointer transition-all duration-300"
                    style={{
                      left: `${iconArea.x}%`,
                      top: `${iconArea.y}%`,
                      width: `${iconArea.width}%`,
                      height: `${iconArea.height}%`,
                      zIndex: 15,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={() => setHoveredIconIndex(iconArea.index)}
                    onMouseLeave={() => {
                      setHoveredIconIndex(null);
                      setMousePosition(null);
                    }}
                    onMouseMove={(e) => {
                      setMousePosition({
                        x: e.clientX,
                        y: e.clientY
                      });
                    }}
                  />
                ))}
                
                {/* Enlarged Icon Display - Follows cursor */}
                {hoveredIconIndex !== null && mousePosition && (
                  <div
                    className="fixed pointer-events-none z-20"
                    style={{
                      left: `${mousePosition.x}px`,
                      top: `${mousePosition.y}px`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 9999
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img 
                        src={iconHoverAreas[hoveredIconIndex].iconPath}
                        alt={`Ecosystem icon ${hoveredIconIndex + 1}`}
                        style={{
                          width: '120px',
                          height: '120px',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                      />
                    </motion.div>
                  </div>
                )}
                
                {/* Drop Zones */}
                {dropZones.map(zone => {
                  const placement = placements[zone.id];
                  const isCorrect = showFeedback && placement === zone.id;
                  const isIncorrect = showFeedback && placement && placement !== zone.id;
                  
                  return (
                    <div
                      key={zone.id}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(zone.id)}
                      onClick={() => placement && !submitted && handleRemoveLabel(zone.id)}
                      className="absolute rounded-lg border-2 border-dashed transition-all duration-300"
                      style={{
                        left: `${zone.x}%`,
                        top: `${zone.y}%`,
                        width: `${zone.width}%`,
                        height: `${zone.height}%`,
                        backgroundColor: placement 
                          ? (isCorrect ? 'rgba(74, 222, 128, 0.3)' : isIncorrect ? 'rgba(239, 68, 68, 0.3)' : 'rgba(81, 114, 124, 0.3)')
                          : 'rgba(255, 255, 255, 0.8)',
                        borderColor: showFeedback 
                          ? (isCorrect ? '#548235' : isIncorrect ? '#C41904' : '#51727C')
                          : '#51727C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: placement && !submitted ? 'pointer' : (draggedLabel && !submitted ? 'copy' : 'default'),
                        fontSize: '7px',
                        fontWeight: 'bold',
                        color: placement ? '#1e3a8a' : '#666',
                        zIndex: 10,
                        padding: '2px',
                        lineHeight: '1.1',
                        textAlign: 'center',
                        wordBreak: 'break-word',
                        overflow: 'hidden',
                        fontFamily: 'Comfortaa, sans-serif'
                      }}
                      title={placement && !submitted ? t('carbonPage.page1.clickToRemove') : ''}
                    >
                      {placement ? ecosystemLabels.find(l => l.id === placement)?.label : '?'}
                    </div>
                  );
                })}
              </div>

                  {/* Hint Text - Below Image */}
                <div style={{
                    marginTop: '20px',
                    textAlign: 'center'
                  }}>
                    <p style={{ 
                      fontFamily: 'Comfortaa, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#707070',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                    {t('carbonPage.page1.hint')}
                  </p>
                  </div>
                </div>
              </div>

          {/* Check Answers Button - Only show on page 1 */}
          {currentPage === 1 && !submitted && Object.keys(placements).length >= 9 && (
            <div className="text-center mb-8" style={{ marginTop: '30px' }}>
              <button
                onClick={handleSubmit}
                className="transition-all duration-300 hover:opacity-80"
                style={{
                  width: '200px',
                  height: '60px',
                  backgroundColor: '#51727C',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}
              >
                {t('carbonPage.page1.checkAnswers')}
              </button>
            </div>
          )}

              {/* Feedback Summary */}
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                  style={{ marginTop: '60px' }}
                >
                  <div className="inline-flex items-center justify-center" style={{ gap: '60px' }}>
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
                        {correctCount} {t('carbonPage.page1.correct')}
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
                        {incorrectCount} {t('carbonPage.page1.incorrect')}
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
                          <circle cx="8" cy="8" r="1.5" fill="white"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: '22px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#CE7C0A' }}>
                        {missedCount} {t('carbonPage.page1.missed')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          ) : currentPage === 2 ? (
            <>
              {/* Page 2 Content - Carbon Storage Information */}
              <div className="text-center mb-8">
                <p style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46',
                  lineHeight: '1.6',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  {t('carbonPage.page2.instruction')}
                </p>
              </div>

              {/* Images with Hover Areas */}
              <div className="flex justify-center items-start">
                <div className="relative" style={{ width: '70%', maxWidth: '900px', display: 'inline-block' }}>
                  <img 
                    src="/assets/components/carbon/carbon-info.png"
                    alt="Carbon storage processes"
                    className="w-full h-auto rounded-lg shadow-lg transition-opacity duration-300"
                    style={{ 
                      backgroundColor: 'transparent',
                      display: 'block'
                    }}
                  />
                  
                  {/* Hover Areas */}
                  {carbonHoverAreas.map((area) => (
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
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
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
                            fontSize: 'clamp(10px, 1.2vw, 16px)',
                            lineHeight: '1.2',
                            padding: '2px 6px',
                            overflow: 'hidden',
                            wordBreak: 'break-word',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Comfortaa, sans-serif'
                          }}
                        >
                          {area.text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Text Below Image */}
              <div className="text-center mt-8">
                <p style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#619F6A',
                  lineHeight: '1.6',
                  width: '100%',
                  margin: '0 auto'
                }}>
                  {t('carbonPage.page2.infoText')}
                </p>
              </div>
            </>
          ) : currentPage === 3 ? (
            <>
              {/* Page 3 Content - Carbon Puzzle */}
              <div className="text-center mb-8">
                {/* Pencil Icon and Title */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  gap: '20px',
                  marginBottom: '30px' 
                }}>
                  <img 
                    src="/assets/icons/pencil.png" 
                    alt="Pencil" 
                    style={{ width: '86px', height: '86px' }}
                  />
                  <h2 style={{ 
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '48px',
                    color: '#406A46',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>
                    {t('carbonPage.page3.title')}
                </h2>
                </div>

                {/* Instructions */}
                <p style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46',
                  lineHeight: '1.6',
                  width: '100%',
                  margin: '0 auto 20px'
                }}>
                  {t('carbonPage.page3.instruction1')}
                </p>
                <p style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46',
                  lineHeight: '1.6',
                  width: '100%',
                  margin: '0 auto 30px'
                }}>
                  {t('carbonPage.page3.instruction2')}
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                {/* Puzzle Text */}
                <div className="bg-white rounded-2xl p-8 shadow-lg mb-8" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                  <div style={{ 
                    backgroundColor: 'white',
                    padding: '24px',
                    borderRadius: '16px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: '#406A46',
                    lineHeight: '1.6'
                  }}>
                    <p className="mb-4">
                      {t('carbonPage.page3.puzzleText.part1')}{''}
                      {getBlankAfterPart(1) && renderBlank(getBlankAfterPart(1)!)}
                      {t('carbonPage.page3.puzzleText.part2')}{''}
                      {getBlankAfterPart(2) && renderBlank(getBlankAfterPart(2)!)}
                      {t('carbonPage.page3.puzzleText.part3')}{''}
                      {getBlankAfterPart(3) && renderBlank(getBlankAfterPart(3)!)}
                      {t('carbonPage.page3.puzzleText.part4')}{''}
                      {getBlankAfterPart(4) && renderBlank(getBlankAfterPart(4)!)}
                      {t('carbonPage.page3.puzzleText.part5')}{''}
                      {getBlankAfterPart(5) && renderBlank(getBlankAfterPart(5)!)}
                      {t('carbonPage.page3.puzzleText.part6')}
                    </p>
                    <p className="mb-4">
                      {t('carbonPage.page3.puzzleText.part7')}{''}
                      {getBlankAfterPart(7) && renderBlank(getBlankAfterPart(7)!)}
                      {t('carbonPage.page3.puzzleText.part8')}{''}
                      {getBlankAfterPart(8) && renderBlank(getBlankAfterPart(8)!)}
                      {t('carbonPage.page3.puzzleText.part9')}{''}
                      {getBlankAfterPart(9) && renderBlank(getBlankAfterPart(9)!)}
                      {t('carbonPage.page3.puzzleText.part10')}
                    </p>
                    <p>
                      {t('carbonPage.page3.puzzleText.part11')}{''}
                      {getBlankAfterPart(11) && renderBlank(getBlankAfterPart(11)!)}
                      {t('carbonPage.page3.puzzleText.part12')}{''}
                      {getBlankAfterPart(12) && renderBlank(getBlankAfterPart(12)!)}
                      {t('carbonPage.page3.puzzleText.part13')}{''}
                      {getBlankAfterPart(13) && renderBlank(getBlankAfterPart(13)!)}
                      {t('carbonPage.page3.puzzleText.part14')}
                    </p>
                  </div>
                </div>

                {/* Image with Hidden Letters */}
                <div className="relative mb-8" style={{ width: '100%', maxWidth: '850px', margin: '0 auto' }}>
                  <img 
                    src="/assets/components/carbon/image-letters.png"
                    alt="Image with hidden letters"
                    className="w-full h-auto rounded-lg shadow-lg"
                    style={{ backgroundColor: 'transparent', display: 'block' }}
                  />
                  
                  {/* Hidden Letters - White text overlay */}
                  {hiddenLetters.map((letter) => {
                    // Check if this letter is already placed
                    const isPlaced = Object.values(puzzleAnswers).includes(letter.text);
                    
                    // Don't render if letter is already placed
                    if (isPlaced) return null;
                    
                    return (
                      <div
                        key={letter.id}
                        onClick={() => handleLetterClick(letter.text)}
                        className={`absolute cursor-pointer transition-all duration-300 ${
                          selectedLetter === letter.text ? 'scale-110' : 'hover:scale-105'
                        }`}
                        style={{
                          left: `${letter.x}%`,
                          top: `${letter.y}%`,
                          transform: 'translate(-50%, -50%)',
                          color: selectedLetter === letter.text ? '#3b82f6' : 'white',
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '28px',
                          fontWeight: 'bold',
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                          opacity: puzzleSubmitted ? 0.7 : 1,
                          userSelect: 'none'
                        }}
                      >
                        {letter.text}
                      </div>
                    );
                  })}
                </div>

                {/* Instructions on how to use */}
                <p style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#406A46',
                  lineHeight: '1.5',
                  textAlign: 'center',
                  margin: '20px auto 30px',
                  maxWidth: '800px'
                }}>
                  {t('carbonPage.page3.instruction3')}
                </p>

                {/* Check Answers Button */}
                {!puzzleSubmitted && Object.keys(puzzleAnswers).length >= 11 && Object.values(puzzleAnswers).every(answer => answer && answer.trim() !== '') && (
                  <div className="text-center mb-8">
                    <button
                      onClick={handlePuzzleSubmit}
                      className="transition-all duration-300 hover:opacity-80"
                      style={{
                        width: '200px',
                        height: '60px',
                        backgroundColor: '#51727C',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '20px'
                      }}
                    >
                      {t('carbonPage.page1.checkAnswers')}
                    </button>
                  </div>
                )}

                {/* Feedback removed as requested */}
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
            {currentPage === TOTAL_PAGES && puzzleSubmitted ? (
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
                      {t('carbonPage.nextTopic')}
                    </span>
                  </div>
                )}
              </>
            ) : (
              // Pagination only when not on completion page - All pages always accessible
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

          {/* Navigation Buttons */}
          <div className="flex items-center" style={{ paddingRight: '16px', gap: '16px' }}>
            {currentPage === 1 && submitted && (
              <>
                {/* Retry Button */}
                <button
                  onClick={handleRetry}
                  className="retry-button relative flex items-center justify-center z-50"
                  style={{
                    width: '250px',
                    height: '60px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <LocalizedImage 
                    src="/assets/icons/tryagain.png" 
                    alt={t('common.tryAgain')} 
                    style={{ 
                      width: '250px',
                      height: '60px',
                      opacity: 1,
                      objectFit: 'contain'
                    }}
                  />
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="next-button relative flex items-center justify-center z-50"
                  style={{
                    width: '250px',
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
                      width: '250px',
                      height: '60px',
                      opacity: 1,
                      objectFit: 'contain'
                    }}
                  />
                </button>
              </>
          )}

          {currentPage === 2 && (
            <button
              onClick={() => setCurrentPage(3)}
              className="next-button relative flex items-center justify-center z-50"
              style={{
                width: '250px',
                height: '60px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'grab'
              }}
              onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
              onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
              onMouseLeave={(e) => e.currentTarget.style.cursor = 'grab'}
            >
              <LocalizedImage 
                src="/assets/icons/next.png" 
                alt="Next" 
                style={{ 
                  width: '250px',
                  height: '60px',
                  opacity: 1,
                  objectFit: 'contain'
                }}
              />
            </button>
          )}

          {currentPage === 3 && puzzleSubmitted && (
            <>
              {/* Retry Button */}
              <button
                onClick={handleRetry}
                className="retry-button relative flex items-center justify-center z-50"
              style={{
                width: '250px',
                height: '60px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
              >
                <LocalizedImage 
                  src="/assets/icons/tryagain.png" 
                  alt={t('common.tryAgain')} 
                  style={{ 
                    width: '250px',
                    height: '60px',
                    opacity: 1,
                    objectFit: 'contain'
                  }}
                />
              </button>
              <button
                onClick={onSelfPurificationClick}
                className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: '250px',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'grab'
                }}
                onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
                onMouseLeave={(e) => e.currentTarget.style.cursor = 'grab'}
              >
                <LocalizedImage 
                  src="/assets/icons/next.png" 
                  alt={t('carbonPage.nextTopic')} 
                  style={{ 
                    width: '250px',
                    height: '60px',
                    opacity: 1,
                    objectFit: 'contain'
                  }}
                />
              </button>
            </>
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
              {t('carbonPage.modal.title')}
            </div>

            {/* Option 1: Zenodo Link 1 */}
            <button
              onClick={handleZenodoLink1}
              style={{
                width: '100%',
                backgroundColor: '#97C09D',
                border: 'none',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                marginBottom: '12px',
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
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '6px'
                }}>
                  {t('carbonPage.modal.carbonSequestrationSoils')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {t('carbonPage.modal.opensInNewTab')}
                </div>
              </div>
            </button>

            {/* Option 2: Zenodo Link 2 */}
            <button
              onClick={handleZenodoLink2}
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
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '6px'
                }}>
                  {t('carbonPage.modal.carbonSequestrationFloodplains')}
        </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {t('carbonPage.modal.opensInNewTab')}
      </div>
              </div>
            </button>

            {/* Option 3: Dashboard */}
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
                  alt={t('carbonPage.modal.exploreRepository')} 
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
                  {t('carbonPage.modal.exploreRepository')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {t('carbonPage.modal.exploreRelated')}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
