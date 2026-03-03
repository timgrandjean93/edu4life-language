import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useOrientation } from '../hooks/useOrientation';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands' | 'bluegreen' | 'environmentalToolbox') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const { isMobile } = useOrientation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Mobile version: hamburger menu met alleen de mobiele homepage-items (zelfde volgorde)
  if (isMobile) {
    const mobileMenuItems = [
      { id: 'mapwetland' as const, labelKey: 'header.menuItems.mapYourWetland' },
      { id: 'riparian' as const, labelKey: 'header.menuItems.exploringHabitats' },
      { id: 'floodcontrol' as const, labelKey: 'header.menuItems.floodplainSpongeEffect' },
      { id: 'carbon' as const, labelKey: 'header.menuItems.climateCarbon' },
      { id: 'art' as const, labelKey: 'header.menuItems.sourcesOfInspiration' },
      { id: 'wetlandfresk' as const, labelKey: 'header.externalToolsItems.wetlandFresk' },
      { id: 'wetland4life' as const, labelKey: 'header.externalToolsItems.wetland4Life' },
      { id: 'bluegreen' as const, labelKey: 'header.externalToolsItems.blueGreenSpace4All', href: 'http://game.restore4life-platform.eu' as const },
    ];

    const navItemStyle: React.CSSProperties = {
      width: '100%',
      textAlign: 'left' as const,
      padding: '12px 16px',
      background: 'white',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'Comfortaa, sans-serif',
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#406A46',
      transition: 'background-color 0.2s ease-in-out',
    };

    return (
      <>
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
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingLeft: '20px',
            paddingRight: '20px',
            position: 'relative'
          }}>
            {/* Hamburger Menu */}
            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                aria-label="Menu"
                aria-expanded={isMenuOpen}
              >
                <div style={{
                  width: '24px',
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }} />
                <div style={{
                  width: '24px',
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }} />
                <div style={{
                  width: '24px',
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }} />
              </button>

              {/* Menu Dropdown - alleen mobiele pagina's (zelfde als homepage) */}
              {isMenuOpen && (
                <div
                  style={{
                    position: 'fixed',
                    top: '80px',
                    left: '16px',
                    right: '16px',
                    maxHeight: 'calc(100vh - 100px)',
                    overflowY: 'auto',
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    minWidth: '220px',
                    zIndex: 1000,
                  }}
                >
                  {mobileMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if ('href' in item && item.href) {
                          window.open(item.href, '_blank');
                        } else {
                          onNavigate?.(item.id);
                        }
                        setIsMenuOpen(false);
                      }}
                      style={navItemStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0f7f0'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                    >
                      {t(item.labelKey)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Centered Logo */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              <button
                onClick={() => onNavigate && onNavigate('home')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <img
                  src="/assets/icons/Restore4Life_white.png"
                  alt="Restore4Life"
                  style={{ height: '60px', width: 'auto', display: 'block' }}
                />
              </button>
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
        {/* Overlay when menu is open */}
        {isMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 199,
            }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </>
    );
  }
  
  // Desktop version: full header with navigation
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
          {/* Learning activities dropdown */}
          <div className="group" style={{ position: 'relative' }}>
            <button className="nav-button" style={{ background: 'none', border: 'none', color: 'white', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
              {t('header.learningActivities')} ▾
            </button>
            <div className="hidden group-hover:block" style={{ position: 'absolute', right: 0, top: '100%', background: 'white', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', padding: '8px', minWidth: '300px', zIndex: 200 }}>
              {[
                { id: 'floodplain' as const, labelKey: 'header.menuItems.livingEnvironment' },
                { id: 'mapwetland' as const, labelKey: 'header.menuItems.mapYourWetland' },
                { id: 'riparian' as const, labelKey: 'header.menuItems.exploringHabitats' },
                { id: 'floodcontrol' as const, labelKey: 'header.menuItems.floodplainSpongeEffect' },
                { id: 'carbon' as const, labelKey: 'header.menuItems.climateCarbon' },
                { id: 'selfpurification' as const, labelKey: 'header.menuItems.purification' },
                { id: 'treatmentwetlands' as const, labelKey: 'header.menuItems.treatmentWetlands' },
                { id: 'aesthetics' as const, labelKey: 'header.menuItems.aesthetics' },
                { id: 'art' as const, labelKey: 'header.menuItems.sourcesOfInspiration' },
                { id: 'people' as const, labelKey: 'header.menuItems.peopleAndAquatic' },
              ].map((item) => (
                <div key={item.id}>
                  <button
                    className="nav-button"
                    onClick={() => onNavigate && onNavigate(item.id)}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46' }}
                  >
                    {t(item.labelKey)}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* External tools dropdown (includes Repository) */}
          <div className="group" style={{ position: 'relative' }}>
            <button className="nav-button" style={{ background: 'none', border: 'none', color: 'white', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
              {t('header.externalTools')} ▾
            </button>
            <div className="hidden group-hover:block" style={{ position: 'absolute', right: 0, top: '100%', background: 'white', borderRadius: '8px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', padding: '8px', minWidth: '260px', zIndex: 200 }}>
              <div>
                <a href="http://game.restore4life-platform.eu" target="_blank" rel="noreferrer" style={{ display: 'block', padding: '10px 12px', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46', textDecoration: 'none' }}>{t('header.externalToolsItems.blueGreenSpace4All')}</a>
              </div>
              <div>
                <button className="nav-button" onClick={() => onNavigate && onNavigate('wetlandfresk')} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46' }}>{t('header.externalToolsItems.wetlandFresk')}</button>
              </div>
              <div>
                <button className="nav-button" onClick={() => onNavigate && onNavigate('wetland4life')} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46' }}>{t('header.externalToolsItems.wetland4Life')}</button>
              </div>
              <div>
                <button className="nav-button" onClick={() => onNavigate && onNavigate('wetlandEduRepo')} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Comfortaa, sans-serif', fontWeight: 'bold', fontSize: '16px', color: '#406A46' }}>{t('header.externalToolsItems.exploreWetEduRepository')}</button>
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
            {t('header.restore4Life')}
          </a>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

