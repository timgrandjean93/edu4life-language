import React from 'react';
import { motion } from 'framer-motion';
import { wetlandEduRepoData } from '../../data/wetlandEduRepoData';

interface WetlandEduRepoPageProps {
  onHomeClick: () => void;
}

export const WetlandEduRepoPage: React.FC<WetlandEduRepoPageProps> = ({
  onHomeClick
}) => {
  // Get unique topics
  const uniqueTopics = React.useMemo(() => {
    const topics = new Set(wetlandEduRepoData.map(item => item.Topic));
    return Array.from(topics).sort();
  }, []);

  // State for filter
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(null);
  // State for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 20;

  // Filter data based on selected topic
  const filteredData = React.useMemo(() => {
    if (!selectedTopic) {
      return wetlandEduRepoData;
    }
    return wetlandEduRepoData.filter(item => item.Topic === selectedTopic);
  }, [selectedTopic]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedTopic]);

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

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header with title */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '30px', paddingBottom: '40px', paddingRight: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px'
              }}>
                <img
                  src="/assets/icons/edurepo.png"
                  alt="Explore Wet-Edu Repository"
                  style={{
                    width: '100px',
                    height: '100px',
                    flexShrink: 0
                  }}
                />
                <div>
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
                      marginBottom: '10px'
                    }}
                  >
                    Explore Wet-Edu Repository
                  </motion.h1>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#51727C',
                    marginBottom: '30px'
                  }}>
                    Explore related projects and resources
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="relative z-40" style={{ flexShrink: 0, paddingBottom: '20px' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* All Topics Button */}
            <button
              onClick={() => setSelectedTopic(null)}
              style={{
                padding: '12px 24px',
                borderRadius: '25px',
                border: 'none',
                backgroundColor: selectedTopic === null ? '#97C09D' : 'white',
                color: selectedTopic === null ? 'white' : '#406A46',
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedTopic !== null) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTopic !== null) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              All Topics
            </button>
            
            {/* Topic Buttons */}
            {uniqueTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: 'none',
                  backgroundColor: selectedTopic === topic ? '#97C09D' : 'white',
                  color: selectedTopic === topic ? 'white' : '#406A46',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedTopic !== topic) {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTopic !== topic) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable List */}
      <div className="relative z-10 px-4 pb-8" style={{ flex: 1, paddingBottom: '120px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {/* Instruction Text */}
          <div style={{
            fontFamily: 'Comfortaa, sans-serif',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#51727C',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            Click on any project to open it in a new tab
          </div>

          {/* Repository Items - Two Columns */}
          <div style={{ 
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px'
          }}>
            {currentData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.02 }}
                onClick={() => {
                  if (item.Link) {
                    window.open(item.Link, '_blank', 'noopener,noreferrer');
                  }
                }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: item.Link ? 'pointer' : 'default',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (item.Link) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.Link) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                {/* Pointer icon indicator */}
                {item.Link && (
                  <img
                    src="/assets/icons/pointer.png"
                    alt="Opens in new tab"
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      opacity: 0.7
                    }}
                  />
                )}
                
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#406A46',
                  marginBottom: '12px',
                  paddingRight: item.Link ? '36px' : '0'
                }}>
                  {item.Name}
                </div>
                
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#51727C',
                  marginBottom: '0'
                }}>
                  {item.Topic}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              marginTop: '40px'
            }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: currentPage === 1 ? '#e0e0e0' : '#97C09D',
                  color: currentPage === 1 ? '#999' : 'white',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.backgroundColor = '#7FAF85';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.backgroundColor = '#97C09D';
                  }
                }}
              >
                Previous
              </button>

              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#406A46'
              }}>
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: currentPage === totalPages ? '#e0e0e0' : '#97C09D',
                  color: currentPage === totalPages ? '#999' : 'white',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.backgroundColor = '#7FAF85';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.backgroundColor = '#97C09D';
                  }
                }}
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer with Home Button */}
      <div className="relative z-10" style={{
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'rgba(223, 235, 245, 0.95)',
        paddingTop: '20px',
        paddingBottom: '20px',
        flexShrink: 0
      }}>
        <div className="relative flex justify-between items-center px-4">
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

          <div className="flex items-center justify-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {/* No pagination needed */}
          </div>

          <div className="flex items-center" style={{ width: '54px' }}>
            {/* Spacer */}
          </div>
        </div>
      </div>
    </div>
  );
};

