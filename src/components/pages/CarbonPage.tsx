import React from 'react';
import { motion } from 'framer-motion';
import { HomeButton } from '../HomeButton';

interface CarbonPageProps {
  onHomeClick: () => void;
  onSelfPurificationClick?: () => void;
}

const TOTAL_PAGES = 3;

// Hover areas for the carbon info image
const carbonHoverAreas = [
  {
    id: 'anthropogenic-release',
    x: 80,
    y: 10,
    width: 30,
    height: 25,
    text: 'Anthropogenic carbon release through drainage or other human degradation of wetlands. Stored carbon is thus oxidized and released as CO₂.'
  },
  {
    id: 'carbon-sequestration',
    x: 30,
    y: 20,
    width: 30,
    height: 25,
    text: 'Carbon sequestration through photosynthesis. Plants remove CO₂ from the air through photosynthesis and produce biomass.'
  },
  {
    id: 'natural-release',
    x: 10,
    y: 50,
    width: 30,
    height: 25,
    text: 'Natural carbon release through respiration and biomass decomposition'
  },
  {
    id: 'carbon-storage',
    x: 60,
    y: 70,
    width: 30,
    height: 25,
    text: 'Carbon storage by biomass buried in soil and sediments'
  }
];

// Carbon puzzle data
const puzzleBlanks = [
  { id: 'blank1', position: 'c_rbon', correctAnswer: 'ar' },
  { id: 'blank2', position: 's_il', correctAnswer: 'o' },
  { id: 'blank3', position: 'h_dreds', correctAnswer: 'un' },
  { id: 'blank4', position: 'tho_ands', correctAnswer: 'us' },
  { id: 'blank5', position: 'y_rs', correctAnswer: 'ea' },
  { id: 'blank6', position: 'un_sturbed', correctAnswer: 'di' },
  { id: 'blank7', position: 'und_ground', correctAnswer: 'er' },
  { id: 'blank8', position: 'a_mosphere', correctAnswer: 't' },
  { id: 'blank9', position: 'B_ue', correctAnswer: 'l' },
  { id: 'blank10', position: 'cl_mate', correctAnswer: 'im' },
  { id: 'blank11', position: 'ch_ge', correctAnswer: 'an' }
];

const hiddenLetters = [
  { id: 'letter1', text: 'an', x: 15, y: 20 },
  { id: 'letter2', text: 'ar', x: 20, y: 60 },
  { id: 'letter3', text: 'o', x: 35, y: 15 },
  { id: 'letter4', text: 'l', x: 45, y: 25 },
  { id: 'letter5', text: 'us', x: 55, y: 30 },
  { id: 'letter6', text: 'oi', x: 25, y: 50 },
  { id: 'letter7', text: 'er', x: 50, y: 60 },
  { id: 'letter8', text: 'un', x: 65, y: 35 },
  { id: 'letter9', text: 't', x: 75, y: 20 },
  { id: 'letter10', text: 'ea', x: 70, y: 70 },
  { id: 'letter11', text: 'di', x: 80, y: 25 },
  { id: 'letter12', text: 'im', x: 85, y: 45 }
];

// Ecosystem labels for drag and drop
const ecosystemLabels = [
  { id: 'tropical-forests', label: 'Tropical forests', correctPosition: 'tropical-forests' },
  { id: 'temperate-forests', label: 'Temperate forests', correctPosition: 'temperate-forests' },
  { id: 'boreal-forests', label: 'Boreal forests', correctPosition: 'boreal-forests' },
  { id: 'tropical-savannas', label: 'Tropical savannas', correctPosition: 'tropical-savannas' },
  { id: 'temperate-grasslands', label: 'Temperate grasslands', correctPosition: 'temperate-grasslands' },
  { id: 'deserts-semi-deserts', label: 'Deserts and semi-deserts', correctPosition: 'deserts-semi-deserts' },
  { id: 'tundra', label: 'Tundra', correctPosition: 'tundra' },
  { id: 'wetlands', label: 'Wetlands', correctPosition: 'wetlands' },
  { id: 'croplands', label: 'Croplands', correctPosition: 'croplands' }
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

export const CarbonPage: React.FC<CarbonPageProps> = ({
  onHomeClick,
  onSelfPurificationClick
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
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
  
  // Page 3 state - Carbon puzzle
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);
  const [puzzleAnswers, setPuzzleAnswers] = React.useState<Record<string, string>>({});
  const [puzzleSubmitted, setPuzzleSubmitted] = React.useState(false);
  // removed feedback state

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
      const allBlanksFilled = Object.keys(puzzleAnswers).length >= 11 && 
                              Object.values(puzzleAnswers).every(answer => answer && answer.trim() !== '');
      if (allBlanksFilled) {
        // Small delay to allow the last fill animation to complete
        setTimeout(() => {
          handlePuzzleSubmit();
        }, 300);
      }
    }
  }, [puzzleAnswers, currentPage, puzzleSubmitted]);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
    if (puzzleSubmitted || !selectedLetter) return;
    
    setPuzzleAnswers(prev => ({
      ...prev,
      [blankId]: selectedLetter
    }));
    
    setSelectedLetter(null);
  };

  const handlePuzzleSubmit = () => {
    setPuzzleSubmitted(true);
  };

  const isPuzzleAnswerCorrect = (blankId: string) => {
    const blank = puzzleBlanks.find(b => b.id === blankId);
    return blank && puzzleAnswers[blankId] === blank.correctAnswer;
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
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5' }}>
      
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
                Did you know...?
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
                  The Earth's soils represent a massive carbon pool, storing three times more carbon than the atmosphere and four times as much as all plants and animals.
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
                  Which of the ecosystems shown in the graph stores the most carbon?
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
                    <option value="">🌿 Select an ecosystem...</option>
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
                  border: `3px solid ${isQuizAnswerCorrect() ? '#22c55e' : '#ef4444'}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    color: isQuizAnswerCorrect() ? '#15803d' : '#dc2626'
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
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      {isQuizAnswerCorrect() ? 'Correct! Wetlands store the most carbon.' : 'Incorrect. The correct answer is Wetlands.'}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '18px',
                    color: '#374151',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Wetlands are among the most effective carbon sinks on Earth, storing massive amounts of carbon in their soils and vegetation.
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
                  {quizSubmitted ? 'Next Page' : 'Submit Answer'}
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
        <div className="flex items-start justify-center" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
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
                  {currentPage === 1 ? 'Carbon pools on Earth' : 
                   currentPage === 2 ? 'Carbon cycle in Earth\'s continental ecosystems' :
                   'Climate protection and Carbon sink'}
                </motion.h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8" style={{ paddingBottom: '32px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {currentPage === 1 ? (
            <>
              {/* Page 1 Content - Full Layout */}
              
              {/* Two Column Layout: 1/3 Left with Text and Buttons, 2/3 Right with Image */}
              <div className="flex" style={{ gap: '40px', maxWidth: '1400px', margin: '0 auto', alignItems: 'flex-start' }}>
                
                {/* Left Column (1/3) - Text and Draggable Labels */}
                <div style={{ width: '33.333%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Pointer Icon - Centered */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
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
                    fontSize: '36px',
                    color: '#406A46',
                    textAlign: 'center',
                    marginBottom: '20px',
                    lineHeight: '1.2'
                  }}>
                  Match the ecosystem icons
                </h2>

                  {/* Instructions Text */}
                  <div style={{ 
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    color: '#406A46',
                    lineHeight: '1.4',
                    marginBottom: '20px'
                  }}>
                    <p style={{ margin: 0 }}>
                      Look at the icons on top of the graph – each shows a different ecosystem.
                    </p>
                    <p style={{ margin: '10px 0 0 0' }}>
                      Your challenge: <span style={{ color: '#9F8B68' }}>Drag the correct label from below to the matching question mark.</span>
                </p>
              </div>

                  {/* Draggable Labels - 2 Columns */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px'
                  }}>
                    {ecosystemLabels.map((label, index) => {
                      const isUsed = Object.values(placements).includes(label.id);
                      const isDragging = draggedLabel === label.id;
                      
                      return (
                        <motion.div
                          key={label.id}
                          draggable={!submitted && !isUsed}
                          onDragStart={() => handleDragStart(label.id)}
                          onDragEnd={handleDragEnd}
                          className="transition-all duration-300 hover:opacity-80"
                          style={{
                            backgroundColor: isUsed ? '#e5e7eb' : '#51727C',
                            color: 'white',
                            borderRadius: '12px',
                            padding: '12px 8px',
                            cursor: submitted || isUsed ? 'not-allowed' : 'move',
                            opacity: isDragging ? 0.5 : (isUsed ? 0.5 : 1),
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '50px'
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
                <div style={{ width: '66.667%' }}>
                  <div className="relative" style={{ width: '100%' }}>
                <img 
                  src="/assets/components/carbon/carbon.png"
                  alt="Carbon pools ecosystem map"
                  className="w-full h-auto rounded-lg shadow-lg"
                  style={{ backgroundColor: 'transparent', display: 'block' }}
                />
                
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
                          ? (isCorrect ? '#4ade80' : isIncorrect ? '#ef4444' : '#51727C')
                          : '#51727C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: draggedLabel && !submitted ? 'copy' : 'default',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: placement ? '#1e3a8a' : '#666'
                      }}
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
                      fontSize: '24px',
                      color: '#707070',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                    Hint: Focus on the features that make each ecosystem unique such as trees, water, grass, or landforms.
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
                Check Answers
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
                          backgroundColor: '#4ade80',
                          width: '32px',
                          height: '32px'
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: '22px', fontWeight: '600', color: '#4ade80' }}>
                        {correctCount} Correct
                      </span>
                    </div>

                    {/* Incorrect */}
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      <div className="flex items-center justify-center rounded-full" 
                        style={{ 
                          backgroundColor: '#ef4444',
                          width: '32px',
                          height: '32px'
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                          <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: '22px', fontWeight: '600', color: '#ef4444' }}>
                        {incorrectCount} Incorrect
                      </span>
                    </div>

                    {/* Missed */}
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      <div className="flex items-center justify-center rounded-full" 
                        style={{ 
                          backgroundColor: '#fbbf24',
                          width: '32px',
                          height: '32px'
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="1.5" fill="white"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: '22px', fontWeight: '600', color: '#fbbf24' }}>
                        {missedCount} Missed
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
                  Hover over the image to find the carbon contribution of wetlands
                </p>
              </div>

              {/* Images with Hover Areas */}
              <div className="flex justify-center items-start">
                <div className="relative" style={{ width: '80%', maxWidth: '1200px', display: 'inline-block' }}>
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
                            fontSize: 'clamp(12px, 1.5vw, 18px)',
                            lineHeight: '1.3',
                            padding: '4px 8px',
                            overflow: 'hidden',
                            wordBreak: 'break-word',
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
                  Wetlands cover only 5-6% of Earth's land but store 20-30% of all organic soil carbon
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
                    Fill-in-the-blanks
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
                  Our planet has an amazing way of storing carbon in the ground for centuries! But some letters and syllables from the sentences below have been hidden in the drawing.
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
                  Can you figure them out and complete the text?
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
                      Some C{''}
                      <span 
                        onClick={() => handleBlankClick('blank1')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank1'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank1'] && !isPuzzleAnswerCorrect('blank1') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank1'] 
                            ? (isPuzzleAnswerCorrect('blank1') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank1'] 
                            ? (isPuzzleAnswerCorrect('blank1') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank1'] || '_'}
                      </span>
                      bon stays locked in the s{''}
                      <span 
                        onClick={() => handleBlankClick('blank2')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank2'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank2'] && !isPuzzleAnswerCorrect('blank2') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank2'] 
                            ? (isPuzzleAnswerCorrect('blank2') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank2'] 
                            ? (isPuzzleAnswerCorrect('blank2') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank2'] || '_'}
                      </span>
                      il for a very long time — sometimes h{''}
                      <span 
                        onClick={() => handleBlankClick('blank3')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank3'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank3'] && !isPuzzleAnswerCorrect('blank3') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank3'] 
                            ? (isPuzzleAnswerCorrect('blank3') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank3'] 
                            ? (isPuzzleAnswerCorrect('blank3') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank3'] || '_'}
                      </span>
                      dreds or even tho{''}
                      <span 
                        onClick={() => handleBlankClick('blank4')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank4'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank4'] && !isPuzzleAnswerCorrect('blank4') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank4'] 
                            ? (isPuzzleAnswerCorrect('blank4') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank4'] 
                            ? (isPuzzleAnswerCorrect('blank4') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank4'] || '_'}
                      </span>
                      ands of y{''}
                      <span 
                        onClick={() => handleBlankClick('blank5')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank5'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank5'] && !isPuzzleAnswerCorrect('blank5') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank5'] 
                            ? (isPuzzleAnswerCorrect('blank5') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank5'] 
                            ? (isPuzzleAnswerCorrect('blank5') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank5'] || '_'}
                      </span>
                      rs!
                    </p>
                    <p className="mb-4">
                      If we leave it un{''}
                      <span 
                        onClick={() => handleBlankClick('blank6')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank6'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank6'] && !isPuzzleAnswerCorrect('blank6') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank6'] 
                            ? (isPuzzleAnswerCorrect('blank6') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank6'] 
                            ? (isPuzzleAnswerCorrect('blank6') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank6'] || '_'}
                      </span>
                      sturbed, this soil carbon remains safely und{''}
                      <span 
                        onClick={() => handleBlankClick('blank7')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank7'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank7'] && !isPuzzleAnswerCorrect('blank7') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank7'] 
                            ? (isPuzzleAnswerCorrect('blank7') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank7'] 
                            ? (isPuzzleAnswerCorrect('blank7') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank7'] || '_'}
                      </span>
                      ground, instead of going into the a{''}
                      <span 
                        onClick={() => handleBlankClick('blank8')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank8'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank8'] && !isPuzzleAnswerCorrect('blank8') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank8'] 
                            ? (isPuzzleAnswerCorrect('blank8') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank8'] 
                            ? (isPuzzleAnswerCorrect('blank8') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank8'] || '_'}
                      </span>
                      mosphere.
                    </p>
                    <p>
                      B{''}
                      <span 
                        onClick={() => handleBlankClick('blank9')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank9'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank9'] && !isPuzzleAnswerCorrect('blank9') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank9'] 
                            ? (isPuzzleAnswerCorrect('blank9') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank9'] 
                            ? (isPuzzleAnswerCorrect('blank9') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank9'] || '_'}
                      </span>
                      ue carbon, stored in coastal and wetland areas, also helps slow down cl{''}
                      <span 
                        onClick={() => handleBlankClick('blank10')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank10'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank10'] && !isPuzzleAnswerCorrect('blank10') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank10'] 
                            ? (isPuzzleAnswerCorrect('blank10') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank10'] 
                            ? (isPuzzleAnswerCorrect('blank10') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank10'] || '_'}
                      </span>
                      ate ch{''}
                      <span 
                        onClick={() => handleBlankClick('blank11')}
                        className={`inline-block px-6 py-1 rounded cursor-pointer transition-all duration-300 ${
                          !puzzleAnswers['blank11'] 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : ''
                        }`}
                        style={{
                          textDecoration: puzzleSubmitted && puzzleAnswers['blank11'] && !isPuzzleAnswerCorrect('blank11') ? 'line-through' : 'none',
                          backgroundColor: puzzleSubmitted && puzzleAnswers['blank11'] 
                            ? (isPuzzleAnswerCorrect('blank11') ? '#4ade80' : '#C41904')
                            : undefined,
                          color: puzzleSubmitted && puzzleAnswers['blank11'] 
                            ? (isPuzzleAnswerCorrect('blank11') ? '#166534' : 'white')
                            : undefined
                        }}
                      >
                        {puzzleAnswers['blank11'] || '_'}
                      </span>
                      ge.
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
                  {hiddenLetters.map((letter) => (
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
                  ))}
                </div>


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
                      Check Answers
                    </button>
                  </div>
                )}

                {/* Feedback removed as requested */}
              </div>
            </>
          ) : null}
        </motion.div>
      </div>

      {/* Pagination and Next Button - Sticky Footer */}
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

          {/* Pagination Dots - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center items-center"
            style={{ gap: '14px', position: 'relative' }}
          >
            {currentPage === TOTAL_PAGES && puzzleSubmitted ? (
              <div className="flex items-center justify-center" style={{ position: 'relative' }}>
                {/* Download Button - 50px left of pagination */}
                <button
                  className="download-button relative flex items-center justify-center z-50"
                  style={{
                    width: '480px',
                    height: '50px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    marginRight: '50px'
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
                    NEXT TOPIC: Self Purification
                  </span>
                </div>
              </div>
            ) : (
              // Pagination only when not on completion page
              Array.from({ length: TOTAL_PAGES }, (_, index) => {
                const pageNum = index + 1;
                const canNavigate = pageNum === 1 || (pageNum === 2 && submitted) || (pageNum === 3 && puzzleSubmitted);
                return (
                  <button
                    key={index}
                    onClick={() => { if (canNavigate) setCurrentPage(pageNum); }}
                    disabled={!canNavigate}
                    className="transition-all duration-300 p-0 border-0 bg-transparent"
                    aria-label={`Go to page ${pageNum}`}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      padding: 0,
                      cursor: canNavigate ? 'pointer' : 'default',
                      opacity: canNavigate ? 1 : 0.5
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

          {/* Navigation Buttons */}
          <div className="flex items-center">
            {currentPage === 1 && submitted && (
              <button
                onClick={() => setShowModal(true)}
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

          {currentPage === 2 && (
            <button
              onClick={() => setCurrentPage(3)}
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

          {currentPage === 3 && puzzleSubmitted && (
            <button
              onClick={onSelfPurificationClick}
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
                alt="NEXT TOPIC: Self Purification" 
                style={{ 
                  width: '158px',
                  height: '60px',
                  opacity: 1
                }}
              />
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};
