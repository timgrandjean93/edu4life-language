import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands' | 'bluegreen' | 'environmentalToolbox') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
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

