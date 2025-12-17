import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { wetlandEduRepoData } from '../../data/wetlandEduRepoData';

interface WetlandEduRepoPageProps {
  onHomeClick: () => void;
  initialTopic?: string | null;
}

export const WetlandEduRepoPage: React.FC<WetlandEduRepoPageProps> = ({
  onHomeClick: _onHomeClick,
  initialTopic = null
}) => {
  const { t } = useTranslation();
  // Get unique topics
  const uniqueTopics = React.useMemo(() => {
    const topics = new Set(wetlandEduRepoData.map(item => item.Topic));
    return Array.from(topics).sort();
  }, []);

  // State for filter - initialize with initialTopic if provided
  const [selectedTopic, setSelectedTopic] = React.useState<string | null>(initialTopic || null);
  
  // Update selectedTopic when initialTopic changes (e.g., when navigating from different pages)
  React.useEffect(() => {
    setSelectedTopic(initialTopic || null);
  }, [initialTopic]);
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
                  alt={t('wetlandEduRepoPage.title')}
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
                    {t('wetlandEduRepoPage.title')}
                  </motion.h1>
                  <div style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#51727C',
                    marginBottom: '30px'
                  }}>
                    {t('wetlandEduRepoPage.subtitle')}
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
              {t('wetlandEduRepoPage.allTopics')}
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
                {t(`wetlandEduRepoPage.topics.${topic}`) || topic}
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
            {t('wetlandEduRepoPage.clickToOpen')}
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
                    alt={t('wetlandEduRepoPage.opensInNewTab')}
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
                  {t(`wetlandEduRepoPage.topics.${item.Topic}`) || item.Topic}
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
                {t('wetlandEduRepoPage.previous')}
              </button>

              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#406A46'
              }}>
                {t('wetlandEduRepoPage.page')} {currentPage} {t('wetlandEduRepoPage.of')} {totalPages}
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
                {t('wetlandEduRepoPage.next')}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

