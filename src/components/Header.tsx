import React from 'react';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands' | 'bluegreen' | 'environmentalToolbox') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '80px',
        backgroundColor: '#51727C',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 200,
      }}
    >
      <div style={{
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '100px', paddingRight: '100px'
      }}>
        {/* Left: brand/title placeholder */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <button
            className="logo-button"
            onClick={() => onNavigate && onNavigate('home')}
            style={{ 
              display: 'block', 
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0
            }}
          >
            <img
              src="/assets/icons/Restore4Life_white.png"
              alt="Restore4Life"
              style={{ height: '72px', width: 'auto', display: 'block' }}
            />
          </button>
        </div>

        {/* Right: nav items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Environmental activities dropdown */}
          <div className="group" style={{ position: 'relative' }}>
            <button className="nav-button" style={{ background: 'none', border: 'none', color: 'white', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
              Environmental activities ▾
            </button>
            <div className="hidden group-hover:block" style={{ position: 'absolute', right: 0, top: '100%', background: 'white', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', padding: '8px', minWidth: '240px', zIndex: 200 }}>
              {[
                { id: 'floodplain' as const, label: 'Living environment' },
                { id: 'mapwetland' as const, label: 'Map your wetland' },
                { id: 'riparian' as const, label: 'Exploring habitats' },
                { id: 'floodcontrol' as const, label: 'Floodplain sponge' },
                { id: 'carbon' as const, label: 'Climate & Carbon' },
                { id: 'selfpurification' as const, label: 'Purification' },
                { id: 'treatmentwetlands' as const, label: 'Treatment wetlands' },
                { id: 'aesthetics' as const, label: 'Aesthetics' },
                { id: 'art' as const, label: 'Sources of Inspiration' },
                { id: 'people' as const, label: 'People and Aquatic' },
              ].map((item) => (
                <div key={item.id}>
                  <button
                    className="nav-button"
                    onClick={() => onNavigate && onNavigate(item.id)}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46' }}
                  >
                    {item.label}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* External tools dropdown (includes Repository) */}
          <div className="group" style={{ position: 'relative' }}>
            <button className="nav-button" style={{ background: 'none', border: 'none', color: 'white', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
              External tools ▾
            </button>
            <div className="hidden group-hover:block" style={{ position: 'absolute', right: 0, top: '100%', background: 'white', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', padding: '8px', minWidth: '260px', zIndex: 200 }}>
              <div>
                <a href="http://game.restore4life-platform.eu" target="_blank" rel="noreferrer" style={{ display: 'block', padding: '10px 12px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46', textDecoration: 'none' }}>Blue-Green Space4All</a>
              </div>
              <div>
                <button className="nav-button" onClick={() => onNavigate && onNavigate('wetlandfresk')} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46' }}>Wetland Fresk</button>
              </div>
              <div>
                <button className="nav-button" onClick={() => onNavigate && onNavigate('wetland4life')} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46' }}>Wetland4Life</button>
              </div>
              <div>
                <button className="nav-button" onClick={() => onNavigate && onNavigate('wetlandEduRepo')} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46' }}>Explore Wet-Edu Repository</button>
              </div>
            </div>
          </div>

          {/* Wetland4Life (top-level) */}
          <a
            className="nav-button"
            href="https://www.restore4life.eu"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'white', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none', cursor: 'pointer' }}
          >
            Restore4Life
          </a>
        </div>
      </div>
    </div>
  );
};

