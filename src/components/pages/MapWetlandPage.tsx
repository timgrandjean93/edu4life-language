import React from 'react';
import { motion } from 'framer-motion';

interface MapWetlandPageProps {
  onHomeClick: () => void;
}

// Quiz items with their correct letters
const quizItems = [
  { id: 1, name: 'Watercourse', correctLetter: 'E' },
  { id: 2, name: 'Side arms', correctLetter: 'C' },
  { id: 3, name: 'Drainage channels', correctLetter: 'H' },
  { id: 4, name: 'Floodplain lake', correctLetter: 'B' },
  { id: 5, name: 'Islands (marsh)', correctLetter: 'D' },
  { id: 6, name: 'Floodplain forest', correctLetter: 'F' },
  { id: 7, name: 'Pasture with animals', correctLetter: 'J' },
  { id: 8, name: 'Grassland', correctLetter: 'G' },
  { id: 9, name: 'Protective dyke', correctLetter: 'K' },
  { id: 10, name: 'Human settlement', correctLetter: 'A' },
  { id: 11, name: 'Agricultural fields', correctLetter: 'I' }
];

// All available letters
const allLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

export const MapWetlandPage: React.FC<MapWetlandPageProps> = ({
  onHomeClick
}) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(null);
  const [showError, setShowError] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);
  const [usedLetters, setUsedLetters] = React.useState<string[]>([]);

  // Set page background
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Ensure html and body take full height
    html.style.minHeight = "100vh";
    html.style.height = "auto";
    body.style.minHeight = "100vh";
    body.style.height = "auto";
    
    // Set background that stays fixed when scrolling
    body.style.backgroundImage = "url('/assets/backgrounds/background-pages.png')";
    body.style.backgroundSize = "100vw 100vh"; // Cover exactly one viewport
    body.style.backgroundPosition = "center top";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundColor = "#e8f4f8"; // Fallback color that fills any space
    
    return () => {
      html.style.minHeight = "";
      html.style.height = "";
      body.style.minHeight = "";
      body.style.height = "";
      body.style.backgroundImage = "";
      body.style.backgroundSize = "";
      body.style.backgroundPosition = "";
      body.style.backgroundRepeat = "";
      body.style.backgroundAttachment = "";
      body.style.backgroundColor = "";
    };
  }, []);

  const isCompleted = currentStep > quizItems.length;


  return (
    <div className="relative w-full min-h-screen">
      {/* Header with title and home button */}
      <div className="relative z-50">
        <div className="flex items-start justify-center" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              {/* Home Button */}
              <div className="absolute top-0" style={{ left: '10%' }}>
                <button
                  onClick={onHomeClick}
                  className="relative overflow-hidden bg-white hover:bg-white text-gray-800 font-bold w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white hover:border-white flex items-center justify-center z-50 opacity-100"
                  style={{ backgroundColor: 'white' }}
                >
                  <img 
                    src="/assets/icons/Home.png" 
                    alt="Home" 
                    className="w-6 h-6"
                    style={{ 
                      backgroundColor: 'white',
                      opacity: 1
                    }}
                  />
                </button>
              </div>
              
              {/* Title */}
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-blue-900 mb-2"
                  style={{ 
                    fontFamily: 'Comfortaa, sans-serif',
                    lineHeight: '1.2',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Map your wetland
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg sm:text-xl md:text-2xl text-blue-800 font-medium"
                  style={{ fontFamily: 'Comfortaa, sans-serif' }}
                >
                  WETLANDS EDU AND CS TOPICS IN R4L TOOLBOX
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {!isCompleted ? (
            <>
              {/* Intro Text */}
              <div className="text-center mx-auto" style={{ maxWidth: '80%', marginBottom: '60px' }}>
                <p 
                  className="leading-relaxed"
                  style={{ fontSize: '22px' }}
                >
                  From high above the floodplain, our White-tailed eagle friend sees the winding river, hidden lakes, marshes, forests, dike, and villages. Can you find them too?  Match each feature with its correct label and bring it to life with color! Each time you identify the right spot, the landscape will shine in its true colors — just as the eagle sees it from the sky.
                </p>
              </div>

              {/* Main Content Area - Image and Quiz */}
              <div className="flex justify-center items-start gap-[5%]">
                {/* Left: Image */}
                <div style={{ width: '45%' }}>
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
                <div style={{ width: '25%', paddingTop: '40px' }}>
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
                          style={{ marginBottom: '12px' }}
                        >
                          <div className="flex items-center" style={{ gap: '12px' }}>
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
                              fontSize: '16px', 
                              fontWeight: '600', 
                              color: isLocked ? '#9ca3af' : '#1e3a8a',
                              marginBottom: '0', 
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
            // Completion Screen - Image left, Congratulations right
            <>
              <div className="flex justify-center items-start gap-8 mb-8">
                {/* Left - Map Image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ width: '45%', maxWidth: '600px' }}
                >
                  <img 
                    src="/assets/components/Mapping/map12.png"
                    alt="Complete wetland map"
                    className="w-full shadow-lg"
                    style={{ 
                      backgroundColor: 'white',
                      borderRadius: '16px'
                    }}
                  />
                </motion.div>

                {/* Right - Congratulations */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ width: '45%', maxWidth: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                  <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '20px', textAlign: 'center' }}>
                    Congratulations!
                  </h2>
                  <p style={{ fontSize: '22px', color: '#1e3a8a', marginBottom: '40px', textAlign: 'center', lineHeight: '1.6' }}>
                    You've successfully mapped all wetland features!
                  </p>
                </motion.div>
              </div>

              {/* Buttons at bottom - Same style as RiparianPage */}
              <div className="flex justify-center items-center gap-8 mt-12">
                {/* Download Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={() => {
                    window.open('/assets/report.pdf', '_blank');
                  }}
                  className="transition-all duration-300 hover:opacity-80"
                  style={{
                    width: '280px',
                    height: '60px',
                    backgroundColor: '#97C09D',
                    borderRadius: '30px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', lineHeight: '1' }}>
                    Download Report & Activity Papers
                  </span>
                </motion.button>

                {/* Back Home Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  onClick={onHomeClick}
                  className="transition-all duration-300 hover:opacity-80"
                  style={{
                    width: '180px',
                    height: '60px',
                    backgroundColor: '#51727C',
                    borderRadius: '30px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px', lineHeight: '1' }}>
                    Back Home
                  </span>
                  <svg 
                    width="28" 
                    height="28" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M3 10H17M10 3L3 10L10 17"
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

