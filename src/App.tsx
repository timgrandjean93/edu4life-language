import { useState } from 'react';
import { GameContainer } from './components/GameContainer';
import { HomePage } from './components/HomePage';
import { RiparianPage } from './components/pages/RiparianPage';
import { MapWetlandPage } from './components/pages/MapWetlandPage';
import { FloodplainPage } from './components/pages/FloodplainPage';
import { FloodControlPage } from './components/pages/FloodControlPage';
import { CarbonPage } from './components/pages/CarbonPage';
import { SelfPurificationPage } from './components/pages/SelfPurificationPage';
import { ArtPage } from './components/pages/ArtPage';
import { PeopleAquaticPage } from './components/pages/PeopleAquaticPage';
import { AestheticsPage } from './components/pages/AestheticsPage';
import { WetlandFreskPage } from './components/pages/WetlandFreskPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk'>('home');

  const navigateTo = (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk') => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'riparian':
        return (
          <RiparianPage
            onHomeClick={() => navigateTo('home')}
            onFloodControlClick={() => navigateTo('floodcontrol')}
          />
        );
      case 'mapwetland':
        return (
          <MapWetlandPage
            onHomeClick={() => navigateTo('home')}
            onRiparianClick={() => navigateTo('riparian')}
          />
        );
      case 'floodplain':
        return (
          <FloodplainPage
            onHomeClick={() => navigateTo('home')}
            onMapWetlandClick={() => navigateTo('mapwetland')}
          />
        );
      case 'floodcontrol':
        return (
          <FloodControlPage
            onHomeClick={() => navigateTo('home')}
            onCarbonClick={() => navigateTo('carbon')}
          />
        );
      case 'carbon':
        return (
          <CarbonPage
            onHomeClick={() => navigateTo('home')}
            onSelfPurificationClick={() => navigateTo('selfpurification')}
          />
        );
      case 'selfpurification':
        return (
          <SelfPurificationPage
            onHomeClick={() => navigateTo('home')}
            onAestheticsClick={() => navigateTo('aesthetics')}
          />
        );
      case 'art':
        return (
          <ArtPage
            onHomeClick={() => navigateTo('home')}
            onPeopleAquaticClick={() => navigateTo('people')}
          />
        );
      case 'people':
        return (
          <PeopleAquaticPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'aesthetics':
        return (
          <AestheticsPage
            onHomeClick={() => navigateTo('home')}
            onArtClick={() => navigateTo('art')}
          />
        );
      case 'wetlandfresk':
        return (
          <WetlandFreskPage
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
              } else if (component.id === 'carbon') {
                navigateTo('carbon');
              } else if (component.id === 'wastewater') {
                navigateTo('selfpurification');
              } else if (component.id === 'Art') {
                navigateTo('art');
              } else if (component.id === 'People') {
                navigateTo('people');
              } else if (component.id === 'aestethics') {
                navigateTo('aesthetics');
              } else if (component.id === 'WetlandFresk') {
                navigateTo('wetlandfresk');
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