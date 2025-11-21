import { useEffect, useState } from 'react';
import { GameContainer } from './components/GameContainer';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
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
import { BlueGreenSpace4AllPage } from './components/pages/BlueGreenSpace4AllPage';
import { EnvironmentalToolboxPage } from './components/pages/EnvironmentalToolboxPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { CookiePolicyPage } from './components/pages/CookiePolicyPage';
import { TermsOfUsePage } from './components/pages/TermsOfUsePage';
import { trackPageView, initAnalytics, revokeAnalytics } from './analytics';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands' | 'bluegreen' | 'environmentalToolbox' | 'privacy' | 'cookies' | 'termsofuse'>('home');
  const [repositoryTopic, setRepositoryTopic] = useState<string | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem('cookie_consent');
    return stored === null;
  });

  // Mapping from page to topic
  const pageToTopicMap: Record<string, string> = {
    'floodplain': 'Floodplain living environment',
    'mapwetland': 'Floodplain mapping',
    'floodcontrol': 'Flood control',
    'riparian': 'Habitat assessment',
    'carbon': 'Carbon sequestration',
    'selfpurification': 'Self purification',
    'treatmentwetlands': 'Constructed wetlands',
    'aesthetics': 'Aesthetics',
    'art': 'Art & Storytelling',
  };

  const navigateTo = (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands' | 'bluegreen' | 'environmentalToolbox' | 'privacy' | 'cookies' | 'termsofuse', topic?: string | null) => {
    setCurrentPage(page);
    if (page === 'wetlandEduRepo') {
      // Set topic if provided, otherwise keep existing or set to null
      setRepositoryTopic(topic !== undefined ? topic : null);
    } else {
      // If navigating away from repo, clear the topic
      setRepositoryTopic(null);
    }
  };

  // Handle cookie consent changes
  const handleConsentChange = (accepted: boolean) => {
    setShowCookieBanner(false);
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
    if (accepted) {
      initAnalytics(measurementId, true);
    } else {
      revokeAnalytics();
    }
  };

  // Listen for privacy policy and cookie policy link clicks from cookie banner
  useEffect(() => {
    const handleShowPrivacyPolicy = () => {
      navigateTo('privacy');
    };
    const handleShowCookiePolicy = () => {
      navigateTo('cookies');
    };
    window.addEventListener('showPrivacyPolicy', handleShowPrivacyPolicy);
    window.addEventListener('showCookiePolicy', handleShowCookiePolicy);
    return () => {
      window.removeEventListener('showPrivacyPolicy', handleShowPrivacyPolicy);
      window.removeEventListener('showCookiePolicy', handleShowCookiePolicy);
    };
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'riparian':
        return (
          <RiparianPage
            onHomeClick={() => navigateTo('home')}
            onFloodControlClick={() => navigateTo('floodcontrol')}
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['riparian'])}
          />
        );
      case 'mapwetland':
        return (
          <MapWetlandPage
            onHomeClick={() => navigateTo('home')}
            onRiparianClick={() => navigateTo('riparian')}
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['mapwetland'])}
          />
        );
      case 'floodplain':
        return (
          <FloodplainPage
            onHomeClick={() => navigateTo('home')}
            onMapWetlandClick={() => navigateTo('mapwetland')}
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['floodplain'])}
          />
        );
      case 'floodcontrol':
        return (
          <FloodControlPage
            onHomeClick={() => navigateTo('home')}
            onCarbonClick={() => navigateTo('carbon')}
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['floodcontrol'])}
          />
        );
      case 'carbon':
        return (
          <CarbonPage
            onHomeClick={() => navigateTo('home')}
            onSelfPurificationClick={() => navigateTo('selfpurification')}
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['carbon'])}
          />
        );
      case 'selfpurification':
        return (
          <SelfPurificationPage
            onHomeClick={() => navigateTo('home')}
            onAestheticsClick={() => navigateTo('aesthetics')}
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['selfpurification'])}
            onTreatmentWetlandsClick={() => navigateTo('treatmentwetlands')}
          />
        );
      case 'art':
        return (
          <ArtPage
            onHomeClick={() => navigateTo('home')}
            onPeopleAquaticClick={() => navigateTo('people')}
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['art'])}
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
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['aesthetics'])}
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
            initialTopic={repositoryTopic}
          />
        );
      case 'treatmentwetlands':
        return (
          <TreatmentWetlandsPage
            onHomeClick={() => navigateTo('home')}
            onRepositoryClick={() => navigateTo('wetlandEduRepo', pageToTopicMap['treatmentwetlands'])}
            onAestheticsClick={() => navigateTo('aesthetics')}
          />
        );
      case 'bluegreen':
        return (
          <BlueGreenSpace4AllPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'environmentalToolbox':
        return (
          <EnvironmentalToolboxPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicyPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'cookies':
        return (
          <CookiePolicyPage
            onHomeClick={() => navigateTo('home')}
          />
        );
      case 'termsofuse':
        return (
          <TermsOfUsePage
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
              } else if (component.id === 'Bluegreen') {
                navigateTo('bluegreen');
              } else {
                console.log('Component clicked:', component.id, '- navigation not implemented yet');
              }
            }}
            onNavigate={(page) => navigateTo(page)}
          />
        );
    }
  };

  // Track page views on logical page changes
  useEffect(() => {
    const path = `/${currentPage}`;
    const titleMap: Record<typeof currentPage, string> = {
      home: 'Living floodplains: Learn, Explore, Restore4Life Toolbox',
      riparian: 'Riparian Page',
      mapwetland: 'Map Wetland Page',
      floodplain: 'Floodplain Page',
      floodcontrol: 'Flood Control Page',
      carbon: 'Carbon Page',
      selfpurification: 'Self Purification Page',
      art: 'Art Page',
      people: 'People & Aquatic Page',
      aesthetics: 'Aesthetics Page',
      wetlandfresk: 'Wetland Fresk Page',
      wetland4life: 'Wetland4Life Page',
      wetlandEduRepo: 'Wetland Edu Repo',
      treatmentwetlands: 'Treatment Wetlands Page',
      bluegreen: 'Blue-Green Space 4 All',
      environmentalToolbox: 'Environmental Toolbox',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      termsofuse: 'Terms of Use',
    };
    // Update document title and send page view to analytics
    document.title = titleMap[currentPage];
    trackPageView(path, titleMap[currentPage]);
  }, [currentPage]);

  return (
    <GameContainer>
      <Header onNavigate={navigateTo} />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        paddingBottom: showCookieBanner ? '140px' : '0'
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {renderCurrentPage()}
        </div>
        <Footer 
          onPrivacyClick={() => navigateTo('privacy')} 
          onCookiePolicyClick={() => navigateTo('cookies')}
          onTermsOfUseClick={() => navigateTo('termsofuse')}
        />
      </div>
      {showCookieBanner && <CookieConsent onConsentChange={handleConsentChange} />}
    </GameContainer>
  );
}

export default App;