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
import { useTranslation } from 'react-i18next';
import { LanguageSelectionModal } from './components/LanguageSelectionModal';

type PageType = 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands' | 'bluegreen' | 'environmentalToolbox' | 'privacy' | 'cookies' | 'termsofuse';

// Helper function to get page from URL pathname
const getPageFromURL = (): PageType => {
  const path = window.location.pathname;
  // Remove leading slash and get the first segment
  const segments = path.split('/').filter(Boolean);
  const pageName = segments[0] || 'home';
  
  // Map URL paths to page types
  const validPages: PageType[] = ['home', 'riparian', 'mapwetland', 'floodplain', 'floodcontrol', 'carbon', 'selfpurification', 'art', 'people', 'aesthetics', 'wetlandfresk', 'wetland4life', 'wetlandEduRepo', 'treatmentwetlands', 'bluegreen', 'environmentalToolbox', 'privacy', 'cookies', 'termsofuse'];
  
  if (validPages.includes(pageName as PageType)) {
    return pageName as PageType;
  }
  
  return 'home'; // Default to home
};

// Helper function to update URL when navigating
const updateURL = (page: PageType, preserveQuery = false) => {
  const newPath = page === 'home' ? '/' : `/${page}`;
  const currentPath = window.location.pathname;
  const queryString = preserveQuery ? window.location.search : '';
  
  if (currentPath !== newPath || (!preserveQuery && window.location.search)) {
    window.history.pushState({ page }, '', newPath + queryString);
  }
};

function App() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<PageType>(getPageFromURL());
  const [repositoryTopic, setRepositoryTopic] = useState<string | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(() => {
    // Check if user has already made a choice
    const stored = localStorage.getItem('cookie_consent');
    return stored === null;
  });
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);

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

  // Pages that have subpages and use query parameters
  const pagesWithSubpages: PageType[] = [
    'people', 'treatmentwetlands', 'art', 'floodcontrol', 'aesthetics', 
    'selfpurification', 'riparian', 'floodplain', 'carbon'
  ];

  const navigateTo = (page: PageType, topic?: string | null) => {
    setCurrentPage(page);
    // Preserve query parameters for pages with subpages (they're handled by their respective components)
    const preserveQuery = pagesWithSubpages.includes(page);
    updateURL(page, preserveQuery);
    if (page === 'wetlandEduRepo') {
      // Set topic if provided, otherwise keep existing or set to null
      setRepositoryTopic(topic !== undefined ? topic : null);
    } else {
      // If navigating away from repo, clear the topic
      setRepositoryTopic(null);
    }
  };

  // Initialize URL on mount - preserve direct navigation
  useEffect(() => {
    const urlPage = getPageFromURL();
    const currentPath = window.location.pathname;
    
    // If URL indicates a direct navigation to a specific page, use that
    if (urlPage !== 'home' && urlPage !== currentPage) {
      // Direct navigation detected - update state to match URL
      setCurrentPage(urlPage);
      return;
    }
    
    // If URL already matches current page exactly, don't overwrite it
    const expectedPath = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (urlPage === currentPage && currentPath === expectedPath) {
      // URL is already correct, do nothing
      return;
    }
    
    // Otherwise, update URL to match current page state (but preserve query params if needed)
    const preserveQuery = pagesWithSubpages.includes(currentPage);
    updateURL(currentPage, preserveQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromURL();
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // navigateTo is stable, no need to include

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
      home: t('pages.titles.home'),
      riparian: t('pages.titles.riparian'),
      mapwetland: t('pages.titles.mapwetland'),
      floodplain: t('pages.titles.floodplain'),
      floodcontrol: t('pages.titles.floodcontrol'),
      carbon: t('pages.titles.carbon'),
      selfpurification: t('pages.titles.selfpurification'),
      art: t('pages.titles.art'),
      people: t('pages.titles.people'),
      aesthetics: t('pages.titles.aesthetics'),
      wetlandfresk: t('pages.titles.wetlandfresk'),
      wetland4life: t('pages.titles.wetland4life'),
      wetlandEduRepo: t('pages.titles.wetlandEduRepo'),
      treatmentwetlands: t('pages.titles.treatmentwetlands'),
      bluegreen: t('pages.titles.bluegreen'),
      environmentalToolbox: t('pages.titles.environmentalToolbox'),
      privacy: t('pages.titles.privacy'),
      cookies: t('pages.titles.cookies'),
      termsofuse: t('pages.titles.termsofuse'),
    };
    // Update document title and send page view to analytics
    document.title = titleMap[currentPage];
    trackPageView(path, titleMap[currentPage]);
  }, [currentPage, t]);

  return (
    <GameContainer>
      <Header onNavigate={navigateTo} />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        paddingBottom: showCookieBanner ? '140px' : '0'
      }}>
        <div style={{ flex: currentPage === 'home' ? '0 0 auto' : 1, display: 'flex', flexDirection: 'column' }}>
          {renderCurrentPage()}
        </div>
        <Footer 
          onPrivacyClick={() => navigateTo('privacy')} 
          onCookiePolicyClick={() => navigateTo('cookies')}
          onTermsOfUseClick={() => navigateTo('termsofuse')}
        />
      </div>
      {showCookieBanner && <CookieConsent onConsentChange={handleConsentChange} />}
      {showLanguageModal && (
        <LanguageSelectionModal
          onLanguageSelected={() => {
            setShowLanguageModal(false);
          }}
        />
      )}
    </GameContainer>
  );
}

export default App;