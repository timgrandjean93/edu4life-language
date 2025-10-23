import React, { useState } from 'react';
import { GameContainer } from './components/GameContainer';
import { HomePage } from './components/HomePage';
import { RiparianPage } from './components/pages/RiparianPage';
import { MapWetlandPage } from './components/pages/MapWetlandPage';
import { FloodplainPage } from './components/pages/FloodplainPage';
import { FloodControlPage } from './components/pages/FloodControlPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol'>('home');

  const navigateTo = (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol') => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'riparian':
        return (
          <RiparianPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'mapwetland':
        return (
          <MapWetlandPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'floodplain':
        return (
          <FloodplainPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'floodcontrol':
        return (
          <FloodControlPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'home':
      default:
        return (
          <HomePage
            onComponentClick={(component) => {
              if (component.id === 'riparian') {
                navigateTo('riparian');
              } else if (component.id === 'Mapping') {
                navigateTo('mapwetland');
              } else if (component.id === 'floodplain-living') {
                navigateTo('floodplain');
              } else if (component.id === 'floodplain-sponge') {
                navigateTo('floodcontrol');
              } else {
                console.log('Component clicked:', component.id, '- navigation not implemented yet');
              }
            }}
          />
        );
    }
  };

  return (
    <GameContainer>
      {renderCurrentPage()}
    </GameContainer>
  );
}

export default App;