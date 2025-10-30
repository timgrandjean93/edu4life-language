import React from 'react';
import { motion } from 'framer-motion';

interface MapWetlandPageProps {
  onHomeClick: () => void;
  onRiparianClick?: () => void;
}

// Quiz items with their correct letters
const quizItems = [
  { id: 1, name: 'WATERCOURSE', correctLetter: 'E' },
  { id: 2, name: 'SIDE ARMS', correctLetter: 'C' },
  { id: 3, name: 'DRAINAGE CHANNELS', correctLetter: 'H' },
  { id: 4, name: 'FLOODPLAIN LAKE', correctLetter: 'B' },
  { id: 5, name: 'ISLANDS (MARSH)', correctLetter: 'D' },
  { id: 6, name: 'FLOODPLAIN FOREST', correctLetter: 'F' },
  { id: 7, name: 'PASTURE WITH ANIMALS', correctLetter: 'J' },
  { id: 8, name: 'GRASSLAND', correctLetter: 'G' },
  { id: 9, name: 'PROTECTIVE DIKE', correctLetter: 'K' },
  { id: 10, name: 'HUMAN SETTLEMENT', correctLetter: 'A' },
  { id: 11, name: 'AGRICULTURAL FIELDS', correctLetter: 'I' }
];

// All available letters
const allLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

export const MapWetlandPage: React.FC<MapWetlandPageProps> = ({
  onHomeClick,
  onRiparianClick
}) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);
  const [showError, setShowError] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [usedLetters, setUsedLetters] = React.useState<string[]>([]);
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

  const isCompleted = currentStep > quizItems.length;

  // Download modal handlers
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink = () => {
    window.open('https://doi.org/10.5281/zenodo.17476801', '_blank');
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
        <div className="flex items-start justify-center" style={{paddingBottom: '10px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              {/* Title */}
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  Map your wetland
                </motion.h1>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8" style={{ paddingBottom: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {!isCompleted ? (
            <>
              {/* Eagle's-eye challenge */}
              <div className="text-center mx-auto" style={{ maxWidth: '80%'}}>
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
                  <span style={{ 
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '36px',
                    color: '#406A46'
                  }}>
                    Eagle's-eye challenge!
                  </span>
                </div>
              </div>

              {/* Intro Text */}
              <div className="text-center mx-auto" style={{ maxWidth: '90%', marginBottom: '20px' }}>
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontSize: '22px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46'
                  }}
                >
                  From high above the floodplain, our White-tailed eagle friend sees the winding river, hidden lakes, marshes, forests, dike, and villages. Can you find them too?  Match each feature with its correct label and bring it to life with color! Each time you identify the right spot, the landscape will shine in its true colors — just as the eagle sees it from the sky.
                </p>
              </div>

              {/* Main Content Area - Image and Quiz */}
              <div className="flex justify-center items-start gap-[3%]">
                {/* Left: Image */}
                <div style={{ width: '50%' }}>
                  <div className="relative">
                    <img 
                      src={`/assets/components/Mapping/map${completedSteps.length + 1}.png`}
                      alt="Wetland map"
                      className="w-full h-auto shadow-lg"
                      style={{ 
                        backgroundColor: 'white',
                        borderRadius: '24px'
                      }}
                    />
                  </div>
                </div>

                {/* Right: All Categories List */}
                <div style={{ width: '42%' }}>
                  {/* All Items - No scroll, fits in view */}
                  <div>
                    {quizItems.map((item, index) => {
                      const isCompleted = completedSteps.includes(item.id);
                      const isCurrent = currentStep === item.id;
                      const isLocked = item.id > currentStep;
                      const hasError = showError && isCurrent;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          style={{ marginBottom: '6px' }}
                        >
                          <div className="flex items-center" style={{ gap: '8px' }}>
                            {/* Number */}
                            <div 
                              style={{ 
                                minWidth: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: isCompleted ? '#28a745' : isLocked ? '#e5e7eb' : '#51727C',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '14px'
                              }}
                            >
                              {isCompleted ? '✓' : item.id}
                            </div>

                            {/* Category Name */}
                            <p style={{ 
                              fontSize: '14px',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontWeight: 'bold', 
                              color: isCompleted ? '#548235' : hasError ? '#C41904' : '#406A46',
                              margin: '0',
                              padding: '0',
                              flex: 1
                            }}>
                              {item.name}
                            </p>

                            {/* Dropdown or Status */}
                            {isCompleted ? (
                              <div style={{
                                width: '100px',
                                height: '40px',
                                backgroundColor: '#28a745',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                              }}>
                                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                                  {item.correctLetter}
                                </span>
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                            ) : isLocked ? (
                              <div style={{
                                width: '100px',
                                height: '40px',
                                backgroundColor: '#e5e7eb',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                  <path d="M5 10H15M10 3V5M10 15V17M3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <select
                                  value={isCurrent && selectedLetter ? selectedLetter : ''}
                                  onChange={(e) => {
                                    const letter = e.target.value;
                                    if (!letter) return;
                                    
                                    setSelectedLetter(letter);
                                    
                                    // Auto-submit after selection
                                    setTimeout(() => {
                                      if (letter === item.correctLetter) {
                                        // Correct answer
                                        setCompletedSteps([...completedSteps, item.id]);
                                        setUsedLetters([...usedLetters, letter]);
                                        setSelectedLetter(null);
                                        setShowError(false);
                                        
                                        // Move to next step
                                        if (item.id < quizItems.length) {
                                          setCurrentStep(item.id + 1);
                                        } else {
                                          setCurrentStep(item.id + 1); // Completion state
                                        }
                                      } else {
                                        // Wrong answer
                                        setShowError(true);
                                        setTimeout(() => {
                                          setShowError(false);
                                          setSelectedLetter(null);
                                        }, 2000);
                                      }
                                    }, 100);
                                  }}
                                  className="transition-all duration-300"
                                  style={{
                                    width: '100px',
                                    height: '40px',
                                    backgroundColor: 'white',
                                    color: '#333',
                                    border: `2px solid ${hasError ? '#dc3545' : '#ccc'}`,
                                    borderRadius: '20px',
                                    padding: '0 32px 0 16px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    appearance: 'none',
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23333\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 10px center',
                                    backgroundSize: '16px'
                                  }}
                                >
                                  <option value="" disabled>Letter?</option>
                                  {allLetters.map(letter => (
                                    <option 
                                      key={letter} 
                                      value={letter}
                                      disabled={usedLetters.includes(letter)}
                                    >
                                      {letter}
                                    </option>
                                  ))}
                                </select>

                                {/* Error indicator */}
                                {hasError && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      backgroundColor: '#dc3545',
                                      borderRadius: '50%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Completion Screen - Eagle's-eye challenge centered, then image and congratulations
            <>
              {/* Eagle's-eye challenge - Centered */}
              <div className="text-center mx-auto" style={{ maxWidth: '80%'}}>
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
                  <span style={{ 
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '36px',
                    color: '#406A46'
                  }}>
                    Eagle's-eye challenge!
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-8 mb-8" style={{marginTop: '-50px' }}>
                {/* Left - Map Image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ width: '55%', maxWidth: '800px' }}
                >
                  <img 
                    src="/assets/components/Mapping/map13.png"
                    alt="Complete wetland map"
                    className="w-full shadow-lg"
                    style={{ 
                      backgroundColor: 'transparent',
                      borderRadius: '16px'
                    }}
                  />
                </motion.div>

                {/* Right - Congratulations */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ width: '45%', maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                >
                  <h2 style={{ 
                    fontSize: '48px', 
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold', 
                    color: '#406A46', 
                    marginBottom: '20px', 
                    textAlign: 'center' 
                  }}>
                    Congratulations!
                  </h2>
                  <p style={{ 
                    fontSize: '22px', 
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46', 
                    marginBottom: '40px', 
                    textAlign: 'center', 
                    lineHeight: '1.6' 
                  }}>
                    You've successfully mapped all wetland features!
                  </p>
                </motion.div>
              </div>

            </>
          )}
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

          {/* Center Section - Download Button and NEXT TOPIC Text - Only on completion */}
          {isCompleted && (
            <div className="flex items-center justify-center" style={{ position: 'relative' }}>
              {/* Download Button - 50px left of NEXT TOPIC text */}
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

              {/* NEXT TOPIC Text - 50px right of download button */}
              <div style={{ marginLeft: '50px' }}>
                <span style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46'
                }}>
                  NEXT TOPIC: Exploring the habitat of a stream
                </span>
              </div>
            </div>
          )}

          {/* Next Button - Right - Only on completion */}
          {isCompleted && (
            <div className="flex items-center">
              <button
                onClick={() => {
                  // Navigate to Riparian page
                  if (onRiparianClick) {
                    onRiparianClick();
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
                  alt="Exploring the habitat of a stream" 
                  style={{ 
                    width: '158px',
                    height: '60px',
                    opacity: 1
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>

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
                  Access protocols
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
                  alt="Edu Repository" 
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
                  Wetland Edu Repository
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

