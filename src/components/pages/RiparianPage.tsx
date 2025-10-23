import React from 'react';
import { motion } from 'framer-motion';

interface RiparianPageProps {
  onHomeClick: () => void;
}

const TOTAL_PAGES = 2;

// Quiz options with correct answers
const quizOptions = [
  { id: 'farming', label: 'Farming', correct: true },
  { id: 'human-settlements', label: 'Human settlements', correct: true },
  { id: 'roads-bridges', label: 'Roads and bridges', correct: true },
  { id: 'flood-protection', label: 'Flood protection structures (dikes, embankments and bridges)', correct: true },
  { id: 'dams', label: 'Dams & Hydropower', correct: false },
  { id: 'pastures', label: 'Pastures and grazing areas for livestock', correct: true },
  { id: 'irrigation', label: 'Irrigation canals and systems', correct: false },
  { id: 'factory', label: 'Factory or industry', correct: true },
  { id: 'mining', label: 'Sand and gravel mining', correct: false },
  { id: 'cycling', label: 'Cycling', correct: true },
  { id: 'riparian-vegetation', label: 'Riparian vegetation (trees and shrubs along the riverbanks)', correct: true },
  { id: 'floodplains', label: 'Floodplains, wetlands', correct: true },
  { id: 'agriculture', label: 'Agriculture/Crop fields', correct: true },
  { id: 'recreation', label: 'Recreation (camping, swimming, canoeing, etc.)', correct: true }
];

// Drop zones for page 2 - Stream habitats
const dropZones = [
  { id: 'pool-left', correctLabel: 'Pool', x: 30, y: 80, image: 'left' },
  { id: 'riffle-left', correctLabel: 'Riffle', x: 60, y: 60, image: 'left' },
  { id: 'run-left', correctLabel: 'Run', x: 45, y: 52, image: 'left' },
  { id: 'pool-right', correctLabel: 'Pool', x: 30, y: 32, image: 'right' },
  { id: 'run-right', correctLabel: 'Run', x: 52, y: 50, image: 'right' },
  { id: 'riffle-right', correctLabel: 'Riffle', x: 40, y: 35, image: 'right' },
  { id: 'pool-2-right', correctLabel: 'Pool', x: 68, y: 65, image: 'right' },
  { id: 'riffle-2-right', correctLabel: 'Riffle', x: 88, y: 40, image: 'right' }
];

// Color mapping for different labels
const labelColors = {
  'Pool': '#87CEEB', // Light blue
  'Riffle': '#8B4513', // Brown
  'Run': '#1E3A8A' // Dark blue
};

const labels = ['Pool', 'Riffle', 'Run'];

export const RiparianPage: React.FC<RiparianPageProps> = ({
  onHomeClick
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Page 1 state
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [quizSubmitted, setQuizSubmitted] = React.useState(false);

  // Page 2 state
  const [placements, setPlacements] = React.useState<Record<string, string>>({});
  const [page2Submitted, setPage2Submitted] = React.useState(false);
  const [showPage2Feedback, setShowPage2Feedback] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

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
    if (page2Submitted || !draggedLabel) return;
    
    setPlacements(prev => ({
      ...prev,
      [zoneId]: draggedLabel
    }));
    setDraggedLabel(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmitPage2 = () => {
    setPage2Submitted(true);
    setShowPage2Feedback(true);
  };

  const getPage2Feedback = (zoneId: string) => {
    if (!page2Submitted) return null;
    
    const zone = dropZones.find(z => z.id === zoneId);
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
    
    // Set background that stays fixed when scrolling
    body.style.backgroundImage = "url('/assets/backgrounds/background-pages.png')";
    body.style.backgroundSize = "100vw 100vh"; // Cover exactly one viewport
    body.style.backgroundPosition = "center top";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundColor = "#e8f4f8"; // Fallback color that fills any space
    
    // Cleanup function to remove background when component unmounts
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

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (_event: MouseEvent) => {
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

  return (
    <div className="relative w-full min-h-screen">
      {/* Header with title and home button */}
      <div className="relative z-50">
        <div className="flex items-start justify-center" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            {/* Header with Home Button and Title */}
            <div className="relative">
              {/* Home Button - Absolute positioned */}
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
              
              {/* Title and Subtitle - Centered */}
              <div className="text-center">
                {/* Title */}
                <motion.h1 
                  key={currentPage}
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
                  {currentPage === 1 ? 'Land use along the rivers' : 'Stream habitats: riffle, pool, and run'}
                </motion.h1>
                
                {/* Subtitle */}
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

      {/* Main Content Area */}
      <div className="relative z-10 px-4 pb-8">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {currentPage === 1 ? (
            <>
              {/* Page 1 Content */}
              {/* Intro Text */}
              <div className="text-center mx-auto" style={{ maxWidth: '80%' }}>
                <p 
                  className="leading-relaxed"
                  style={{ fontSize: '22px' }}
                >
                  Rivers and their surroundings have been used by people since ancient times for many different activities, such as farming, building homes, fishing, traveling, and getting water. This land use shows how humans interact with and shape the areas around rivers.
                </p>
                
                {/* Second paragraph with spacing */}
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontSize: '22px',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    marginTop: '30px'
                  }}
                >
                  Look carefully at the both illustration and choose which land use activities you can find.
                </p>
              </div>

              {/* Images Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-8"
              >
                <div className="flex justify-center items-end gap-[10%]">
                  {/* Image 1 */}
                  <div style={{ width: '35%' }}>
                    <img 
                      src="/assets/components/Topic2/image1.png" 
                      alt="Riparian area 1"
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Image 2 */}
                  <div style={{ width: '35%' }}>
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
                style={{ maxWidth: '80%' }}
              >
                {/* Quiz Question */}
                <h3 className="text-center mb-6" style={{ fontSize: '22px', fontWeight: 'bold', color: '#548235' }}>
                  From the list below, click on the activities you can see in the pictures:
                </h3>

                {/* Quiz Options - Flowing Layout */}
                <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6" style={{ paddingLeft: '20px' }}>
                  {quizOptions.map((option) => {
                    const feedback = getOptionFeedback(option);
                    const isSelected = selectedOptions.includes(option.id);
                    
                    // Determine text color based on feedback
                    let textColor = '#333';
                    if (feedback === 'correct') textColor = '#28a745';
                    if (feedback === 'incorrect') textColor = '#dc3545';
                    if (feedback === 'missed') textColor = '#ffc107';
                    
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
                              feedback === 'correct' ? '#28a745' : 
                              feedback === 'incorrect' ? '#dc3545' : 
                              feedback === 'missed' ? '#ffc107' : 
                              isSelected ? '#548235' : '#999'
                            }`,
                            backgroundColor: isSelected ? '#548235' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: isSelected ? '0 2px 4px rgba(84, 130, 53, 0.3)' : 'none'
                          }}
                        >
                          {isSelected && !quizSubmitted && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {feedback === 'correct' && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="#28a745" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {feedback === 'incorrect' && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M4 4L12 12M12 4L4 12" stroke="#dc3545" strokeWidth="2.5" strokeLinecap="round"/>
                            </svg>
                          )}
                          {feedback === 'missed' && (
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="#ffc107" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>

                        {/* Label */}
                        <span 
                          className="transition-colors duration-300"
                          style={{ 
                            fontSize: '16px', 
                            color: textColor,
                            fontWeight: feedback ? '600' : '400'
                          }}
                        >
                          {option.label}
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
                              backgroundColor: '#28a745',
                              width: '32px',
                              height: '32px'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span style={{ fontSize: '22px', fontWeight: '600', color: '#28a745' }}>
                            {correctCount} Correct
                          </span>
                        </div>

                        {/* Incorrect */}
                        <div className="flex items-center" style={{ gap: '12px' }}>
                          <div className="flex items-center justify-center rounded-full" 
                            style={{ 
                              backgroundColor: '#dc3545',
                              width: '32px',
                              height: '32px'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                              <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            </svg>
                          </div>
                          <span style={{ fontSize: '22px', fontWeight: '600', color: '#dc3545' }}>
                            {incorrectCount} Incorrect
                          </span>
                        </div>

                        {/* Missed */}
                        <div className="flex items-center" style={{ gap: '12px' }}>
                          <div className="flex items-center justify-center rounded-full" 
                            style={{ 
                              backgroundColor: '#ffc107',
                              width: '32px',
                              height: '32px'
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                              <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span style={{ fontSize: '22px', fontWeight: '600', color: '#ffc107' }}>
                            {missedCount} Missed
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </>
          ) : (
            <>
              {/* Page 2 Content - Stream Habitats */}
              {/* Intro Text */}
              <div className="text-center mx-auto" style={{ maxWidth: '80%' }}>
                <p 
                  className="leading-relaxed"
                  style={{ fontSize: '22px' }}
                >
                  Read the definitions of the terms riffle, run, and pool below, then drag and drop each label to its correct place in the two images.
                </p>
              </div>

              {/* Images Section with Drop Zones */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mt-8"
              >
                <div className="flex justify-center items-center" style={{ gap: '5%' }}>
                    {/* Left Image with Drop Zones */}
                    <div style={{ width: '35%', position: 'relative' }}>
                      <img 
                        src="/assets/components/Riparian/stream.png" 
                        alt="Stream habitat"
                        className="w-full h-auto"
                      />
                    {/* Clickable circles for left image */}
                    {dropZones.filter(z => z.image === 'left').map(zone => {
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
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <div
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(zone.id)}
                            className="rounded-full border-4 transition-all duration-300"
                            style={{
                              width: '40px',
                              height: '40px',
                              minWidth: '40px',
                              minHeight: '40px',
                              maxWidth: '40px',
                              maxHeight: '40px',
                              backgroundColor: currentLabel ? labelColors[currentLabel as keyof typeof labelColors] : 'rgba(255, 255, 255, 0.6)',
                              borderColor: isCorrect ? '#28a745' : isIncorrect ? '#dc3545' : currentLabel ? '#333' : '#ccc',
                              boxShadow: currentLabel ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.1)',
                              fontSize: '20px',
                              fontWeight: 'bold',
                              color: '#333',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                              margin: 0,
                              cursor: draggedLabel ? 'copy' : 'default'
                            }}
                          >
                            {currentLabel ? '' : '?'}
                          </div>

                        </div>
                      );
                    })}
                  </div>

                    {/* Draggable Labels - Between Images */}
                    <div className="flex flex-col justify-center" style={{ width: '7%', gap: '20px' }}>
                      {labels.map(label => {
                        const labelColor = labelColors[label as keyof typeof labelColors];
                        const isLightColor = label === 'Pool';
                        const textColor = isLightColor ? '#000' : '#fff';
                        
                        return (
                          <div
                            key={label}
                            draggable={!page2Submitted}
                            onDragStart={() => handleDragStart(label)}
                            onDragEnd={handleDragEnd}
                            className="font-bold transition-all duration-300 hover:opacity-80"
                            style={{
                              backgroundColor: labelColor,
                              color: textColor,
                              borderRadius: '30px',
                              padding: '12px 16px',
                              fontSize: '16px',
                              textAlign: 'center',
                              cursor: page2Submitted ? 'not-allowed' : 'move',
                              opacity: draggedLabel === label ? 0.5 : 1,
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              border: 'none',
                              width: '100%'
                            }}
                          >
                            {label}
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Image with Drop Zones */}
                    <div style={{ width: '35%', position: 'relative' }}>
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
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <div
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(zone.id)}
                            className="rounded-full border-4 transition-all duration-300"
                            style={{
                              width: '40px',
                              height: '40px',
                              minWidth: '40px',
                              minHeight: '40px',
                              maxWidth: '40px',
                              maxHeight: '40px',
                              backgroundColor: currentLabel ? labelColors[currentLabel as keyof typeof labelColors] : 'rgba(255, 255, 255, 0.6)',
                              borderColor: isCorrect ? '#28a745' : isIncorrect ? '#dc3545' : currentLabel ? '#333' : '#ccc',
                              boxShadow: currentLabel ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 2px 6px rgba(0, 0, 0, 0.1)',
                              fontSize: '20px',
                              fontWeight: 'bold',
                              color: '#333',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 0,
                              margin: 0,
                              cursor: draggedLabel ? 'copy' : 'default'
                            }}
                          >
                            {currentLabel ? '' : '?'}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Spacer */}
              <div className="relative z-10" style={{ height: '60px', width: '100%' }}></div>

              {/* Definitions Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mt-12 mx-auto"
                style={{ maxWidth: '80%' }}
              >
                <div className="text-left space-y-4">
                  <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    <strong style={{ color: labelColors.Pool }}>Pool:</strong> A deeper, slower-moving section of a stream where water collects. Pools are quiet, calm, and provide shelter for fish.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    <strong style={{ color: labelColors.Riffle }}>Riffle:</strong> A shallow, fast-flowing part of a stream with small waves and visible rocks. Riffles appear rough and bubbly, and are rich in oxygen, making them ideal habitats for insects and fish.
                  </p>
                  <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                    <strong style={{ color: labelColors.Run }}>Run:</strong> A smooth, moderately deep section of a stream where water flows steadily between a riffle and a pool. Runs get plenty of sunlight, which helps algae grow. Insects feed on the algae, making runs good feeding spots for fish from pools and riffles. 
                  </p>
                </div>
              </motion.div>

              {/* Page 2 Feedback */}
              {showPage2Feedback && (() => {
               const correctCount = Object.keys(placements).filter(zoneId => {
                 const zone = dropZones.find(z => z.id === zoneId);
                 return placements[zoneId] === zone?.correctLabel;
               }).length;
               const incorrectCount = Object.keys(placements).filter(zoneId => {
                 const zone = dropZones.find(z => z.id === zoneId);
                 return placements[zoneId] && placements[zoneId] !== zone?.correctLabel;
               }).length;
               const missedCount = dropZones.length - Object.keys(placements).length;

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
                           backgroundColor: '#28a745',
                           width: '32px',
                           height: '32px'
                         }}
                       >
                         <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                           <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                       </div>
                       <span style={{ fontSize: '22px', fontWeight: '600', color: '#28a745' }}>
                         {correctCount} Correct
                       </span>
                     </div>

                     {/* Incorrect */}
                     <div className="flex items-center" style={{ gap: '12px' }}>
                       <div className="flex items-center justify-center rounded-full" 
                         style={{ 
                           backgroundColor: '#dc3545',
                           width: '32px',
                           height: '32px'
                         }}
                       >
                         <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                           <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                         </svg>
                       </div>
                       <span style={{ fontSize: '22px', fontWeight: '600', color: '#dc3545' }}>
                         {incorrectCount} Incorrect
                       </span>
                     </div>

                     {/* Missed */}
                     <div className="flex items-center" style={{ gap: '12px' }}>
                       <div className="flex items-center justify-center rounded-full" 
                         style={{ 
                           backgroundColor: '#ffc107',
                           width: '32px',
                           height: '32px'
                         }}
                       >
                         <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                           <path d="M3 8L6 11L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                       </div>
                       <span style={{ fontSize: '22px', fontWeight: '600', color: '#ffc107' }}>
                         {missedCount} Missed
                       </span>
                     </div>
                   </div>
                 </motion.div>
               );
               })()}
              </>
            )}
          </motion.div>
        </div>

      {/* Spacer */}
      <div className="relative z-10" style={{ height: '60px', width: '100%' }}></div>

      {/* Pagination and Next Button */}
      <div className="relative z-10 pb-8">
        <div className="relative flex justify-center items-center">
          {/* Pagination Dots - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex justify-center items-center"
            style={{ gap: '14px' }}
          >
            {Array.from({ length: TOTAL_PAGES }, (_, index) => {
              const pageNum = index + 1;
              const canNavigate = pageNum === 1 || (pageNum === 2 && quizSubmitted);
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (canNavigate) {
                      setCurrentPage(pageNum);
                    }
                  }}
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
            })}
          </motion.div>

          {/* Download Button - Left of pagination (only on page 2 after submit) */}
          {currentPage === 2 && page2Submitted && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => {
                // TODO: Implement download functionality
                console.log('Download report and activity papers');
              }}
              className="absolute transition-all duration-300 hover:opacity-80"
              style={{
                left: '10%',
                width: '280px',
                height: '60px',
                backgroundColor: '#28a745',
                borderRadius: '30px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', lineHeight: '1' }}>
                Download Report & Papers
              </span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M10 3V13M10 13L6 9M10 13L14 9M3 17H17" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          )}

          {/* Check Answers / Next / Back Home Button - Positioned at 90% */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
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
                if (!page2Submitted) {
                  if (Object.keys(placements).length > 0) {
                    handleSubmitPage2();
                  }
                } else {
                  // Go back home
                  onHomeClick();
                }
              }
            }}
            disabled={
              (currentPage === 1 && !quizSubmitted && selectedOptions.length === 0) ||
              (currentPage === 2 && !page2Submitted && Object.keys(placements).length === 0)
            }
            className="absolute transition-all duration-300 hover:opacity-80"
            style={{
              right: '10%',
              width: (currentPage === 1 && quizSubmitted) || (currentPage === 2 && page2Submitted) ? '180px' : '200px',
              height: '60px',
              backgroundColor: 
                ((currentPage === 1 && !quizSubmitted && selectedOptions.length === 0) ||
                 (currentPage === 2 && !page2Submitted && Object.keys(placements).length === 0))
                  ? '#ccc' : '#51727C',
              borderRadius: '30px',
              border: 'none',
              cursor: 
                ((currentPage === 1 && !quizSubmitted && selectedOptions.length === 0) ||
                 (currentPage === 2 && !page2Submitted && Object.keys(placements).length === 0))
                  ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {((currentPage === 1 && !quizSubmitted) || (currentPage === 2 && !page2Submitted)) ? (
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', lineHeight: '1' }}>
                Check Answers
              </span>
            ) : (
              <>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '24px', lineHeight: '1' }}>
                  {currentPage === TOTAL_PAGES && page2Submitted ? 'Back Home' : 'NEXT'}
                </span>
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d={currentPage === TOTAL_PAGES && page2Submitted ? "M3 10H17M10 3L3 10L10 17" : "M7.5 15L12.5 10L7.5 5"}
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
