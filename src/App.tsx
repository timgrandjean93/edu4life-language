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
import { Wetland4LifePage } from './components/pages/Wetland4LifePage';
import { WetlandEduRepoPage } from './components/pages/WetlandEduRepoPage';
import { TreatmentWetlandsPage } from './components/pages/TreatmentWetlandsPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands'>('home');

  const navigateTo = (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands') => {
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
            onRepositoryClick={() => navigateTo('wetlandEduRepo')}
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
            onRepositoryClick={() => navigateTo('wetlandEduRepo')}
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
            onRepositoryClick={() => navigateTo('wetlandEduRepo')}
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
            onRepositoryClick={() => navigateTo('wetlandEduRepo')}
          />
        );
      case 'wetlandfresk':
        return (
          <WetlandFreskPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'wetland4life':
        return (
          <Wetland4LifePage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'wetlandEduRepo':
        return (
          <WetlandEduRepoPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'treatmentwetlands':
        return (
          <TreatmentWetlandsPage
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
              } else if (component.id === 'climate') {
                navigateTo('carbon');
              } else if (component.id === 'constructed') {
                navigateTo('treatmentwetlands');
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
              } else if (component.id === 'Solution4Life') {
                navigateTo('wetland4life');
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