import React from 'react';

interface EnvironmentalToolboxPageProps {
  onHomeClick: () => void;
}

export const EnvironmentalToolboxPage: React.FC<EnvironmentalToolboxPageProps> = ({ onHomeClick }) => {
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
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5' }}>
      {/* Header */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="text-center">
              <h1 className="main-title mb-2">Environmental Toolbox</h1>
              <div style={{ fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#406A46' }}>
                Zenodo-referenties en tools worden hier binnenkort verzameld.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4" style={{ paddingBottom: '32px', flex: 1 }}>
        <div className="max-w-4xl mx-auto" style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px' }}>
          <div style={{ fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', color: '#51727C' }}>
            Coming soon: overzicht van environmental toolbox verwijzingen met links naar Zenodo.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10" style={{ 
        position: 'sticky', 
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'rgba(223, 235, 245, 0.95)',
        paddingTop: '20px',
        paddingBottom: '20px',
        flexShrink: 0,
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <div className="relative flex justify-between items-center px-4" style={{ maxWidth: '100%', width: '100%' }}>
          <div className="flex items-center">
            <button onClick={onHomeClick} className="home-button" style={{ width: '54px', height: '54px', background: 'none', border: 'none' }}>
              <img src="/assets/icons/Home.png" alt="Home" style={{ width: '54px', height: '54px' }} />
            </button>
          </div>
          <div style={{ width: '54px' }} />
        </div>
      </div>
    </div>
  );
};


