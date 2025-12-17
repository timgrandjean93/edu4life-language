import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RotationMessage } from './RotationMessage';
import { LocalizedImage } from './LocalizedImage';
import type { ClickableComponent } from '../data/clickableComponents';

interface HomePageProps {
  onComponentClick?: (component: ClickableComponent) => void;
  onNavigate?: (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands' | 'bluegreen' | 'environmentalToolbox') => void;
}

// Base design size (matches original): 1920x1080
const BASE = { w: 1920, h: 1080 } as const;

// Menu button configuration
const MENU_BASE = {
  floodplain:      { x: Math.round(0.10 * BASE.w), y: Math.round(0.35 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  floodplainPoint: { x: Math.round(0.10 * BASE.w), y: Math.round(0.19 * BASE.h) },
  map:             { x: Math.round(0.19 * BASE.w), y: Math.round(0.24 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  mapPoint:        { x: Math.round(0.19 * BASE.w), y: Math.round(0.11 * BASE.h) },
  explore:         { x: Math.round(0.32 * BASE.w), y: Math.round(0.40 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: -77, offsetY: 0 },
  explorePoint:    { x: Math.round(0.28 * BASE.w), y: Math.round(0.18 * BASE.h) },
  sponge:          { x: Math.round(0.37 * BASE.w), y: Math.round(0.29 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: -77, offsetY: 0 },
  spongePoint:     { x: Math.round(0.33 * BASE.w), y: Math.round(0.18 * BASE.h) },
  carbon:          { x: Math.round(0.40 * BASE.w), y: Math.round(0.04 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  carbonPoint:     { x: Math.round(0.40 * BASE.w), y: Math.round(0.19 * BASE.h) },
  purification:    { x: Math.round(0.55 * BASE.w), y: Math.round(0.10 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  purificationPoint:{ x: Math.round(0.49 * BASE.w), y: Math.round(0.20 * BASE.h) },
  treatment:       { x: Math.round(0.60 * BASE.w), y: Math.round(0.22 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  treatmentPoint:  { x: Math.round(0.49 * BASE.w), y: Math.round(0.28 * BASE.h) },
  aesthetics:      { x: Math.round(0.62 * BASE.w), y: Math.round(0.33 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  aestheticsPoint: { x: Math.round(0.49 * BASE.w), y: Math.round(0.36 * BASE.h) },
  art:             { x: Math.round(0.40 * BASE.w), y: Math.round(0.53 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  artPoint:        { x: Math.round(0.49 * BASE.w), y: Math.round(0.44 * BASE.h) },
  people:          { x: Math.round(0.65 * BASE.w), y: Math.round(0.45 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  peoplePoint:     { x: Math.round(0.65 * BASE.w), y: Math.round(0.56 * BASE.h) },
  game:            { x: Math.round(0.81 * BASE.w), y: Math.round(0.40 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  gamePoint:       { x: Math.round(0.81 * BASE.w), y: Math.round(0.63 * BASE.h) },
  fresk:           { x: Math.round(0.90 * BASE.w), y: Math.round(0.25 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
  freskPoint:      { x: Math.round(0.90 * BASE.w), y: Math.round(0.35 * BASE.h) },
  wetland4life:    { x: Math.round(0.90 * BASE.w), y: Math.round(0.70 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 80, offsetY: 0 },
  wetland4lifePoint:{ x: Math.round(0.92 * BASE.w), y: Math.round(0.49 * BASE.h) },
} as const;

// Pointer lines configuration
const POINTERS: Array<{
  from: keyof typeof MENU_BASE;
  to: keyof typeof MENU_BASE;
}> = [
  { from: 'floodplain', to: 'floodplainPoint' },
  { from: 'map', to: 'mapPoint' },
  { from: 'explore', to: 'explorePoint' },
  { from: 'sponge', to: 'spongePoint' },
  { from: 'carbon', to: 'carbonPoint' },
  { from: 'purification', to: 'purificationPoint' },
  { from: 'treatment', to: 'treatmentPoint' },
  { from: 'aesthetics', to: 'aestheticsPoint' },
  { from: 'art', to: 'artPoint' },
  { from: 'people', to: 'peoplePoint' },
  { from: 'game', to: 'gamePoint' },
  { from: 'fresk', to: 'freskPoint' },
  { from: 'wetland4life', to: 'wetland4lifePoint' },
];

// Menu items configuration
const MENU_ITEMS: Array<{
  key: keyof typeof MENU_BASE;
  page: NonNullable<Parameters<NonNullable<HomePageProps['onNavigate']>>[0]>;
  imageSrc: string;
  alt: string;
}> = [
  { key: 'floodplain', page: 'floodplain', imageSrc: '/assets/icons/menu/Floodplain.png', alt: 'Floodplain' },
  { key: 'map', page: 'mapwetland', imageSrc: '/assets/icons/menu/Map.png', alt: 'Map your wetland' },
  { key: 'game', page: 'bluegreen', imageSrc: '/assets/icons/menu/Game.png', alt: 'Game' },
  { key: 'fresk', page: 'wetlandfresk', imageSrc: '/assets/icons/menu/Fresk.png', alt: 'Fresk' },
  { key: 'wetland4life', page: 'wetland4life', imageSrc: '/assets/icons/menu/Wetland4Life.png', alt: 'Wetland4Life' },
  { key: 'art', page: 'art', imageSrc: '/assets/icons/menu/Art.png', alt: 'Art' },
  { key: 'people', page: 'people', imageSrc: '/assets/icons/menu/People.png', alt: 'People' },
  { key: 'explore', page: 'riparian', imageSrc: '/assets/icons/menu/Explore.png', alt: 'Explore' },
  { key: 'sponge', page: 'floodcontrol', imageSrc: '/assets/icons/menu/Sponge.png', alt: 'Sponge' },
  { key: 'carbon', page: 'carbon', imageSrc: '/assets/icons/menu/Carbon.png', alt: 'Climate & Carbon' },
  { key: 'purification', page: 'selfpurification', imageSrc: '/assets/icons/menu/Purification.png', alt: 'Self Purification' },
  { key: 'treatment', page: 'treatmentwetlands', imageSrc: '/assets/icons/menu/Treatment.png', alt: 'Treatment wetlands' },
  { key: 'aesthetics', page: 'aesthetics', imageSrc: '/assets/icons/menu/Aestethics.png', alt: 'Aesthetics' },
];

// Shared button styles
const BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 15,
  background: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
};

const IMAGE_STYLE: React.CSSProperties = {
  height: 'auto',
  display: 'block',
  transition: 'transform 0.2s ease-in-out',
};

export const HomePage: React.FC<HomePageProps> = ({ onComponentClick: _onComponentClick, onNavigate }) => {
  const { t } = useTranslation();
  const riverRef = useRef<HTMLDivElement>(null);
  const riverImgRef = useRef<HTMLImageElement>(null);
  const [showRotationMessage, setShowRotationMessage] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [overlayBox, setOverlayBox] = useState<{ left: number; top: number; w: number; h: number; s: number }>({ 
    left: 0, top: 0, w: 0, h: 0, s: 1 
  });

  // Compute overlay box dimensions
  useEffect(() => {
    const compute = () => {
      if (!riverRef.current || !riverImgRef.current) return;
      const cont = riverRef.current.getBoundingClientRect();
      const img = riverImgRef.current.getBoundingClientRect();
      const left = img.left - cont.left;
      const top = img.top - cont.top;
      const w = img.width;
      const h = img.height;
      const s = w / BASE.w;
      setOverlayBox({ left, top, w, h, s });
    };
    
    compute();
    const ro = new ResizeObserver(compute);
    if (riverRef.current) ro.observe(riverRef.current);
    if (riverImgRef.current) ro.observe(riverImgRef.current);
    window.addEventListener('resize', compute);
    const imgEl = riverImgRef.current;
    if (imgEl) imgEl.addEventListener('load', compute);
    
    return () => {
      window.removeEventListener('resize', compute);
      ro.disconnect();
      if (imgEl) imgEl.removeEventListener('load', compute);
    };
  }, []);

  // Set background image
  useEffect(() => {
    document.body.style.backgroundImage = "url('/assets/backgrounds/background.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundColor = "";
    
    return () => {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Check orientation
  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobile = window.innerWidth <= 768;
      setShowRotationMessage(isMobile && isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Image hover handlers
  const handleImageMouseEnter = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
  }, []);

  const handleImageMouseLeave = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
  }, []);

  // Render menu button helper
  const renderMenuButton = useCallback((item: typeof MENU_ITEMS[0]) => {
    const menuItem = MENU_BASE[item.key];
    if (!menuItem || !('x' in menuItem) || !('width' in menuItem)) return null;

    return (
      <button
        key={item.key}
        className="nav-button"
        onClick={() => onNavigate && onNavigate(item.page)}
        style={{
          ...BUTTON_STYLE,
          left: `${overlayBox.left + menuItem.x * overlayBox.s}px`,
          top: `${overlayBox.top + menuItem.y * overlayBox.s}px`,
        }}
      >
        <LocalizedImage
          src={item.imageSrc}
          alt={item.alt}
          style={{
            ...IMAGE_STYLE,
            width: `${menuItem.width * overlayBox.s}px`,
          }}
          onMouseEnter={handleImageMouseEnter}
          onMouseLeave={handleImageMouseLeave}
        />
      </button>
    );
  }, [overlayBox, onNavigate, handleImageMouseEnter, handleImageMouseLeave]);

  // Render SVG pointer lines
  const renderPointerLines = useMemo(() => {
    if (!overlayBox.s) return null;

    const scale = overlayBox.s;
    const CIRCLE_RADIUS = 12 * scale;
    const STROKE_WIDTH = 3 * scale;
    const STROKE_DASH = `${8 * scale} ${6 * scale}`;
    const COLOR = "#619F6A";
    const CIRCLE_FILL = "#FFFFFF";
    const CIRCLE_BORDER = 3 * scale;

    return (
      <svg
        width={BASE.w * scale}
        height={BASE.h * scale}
        style={{ 
          position: 'absolute', 
          left: overlayBox.left, 
          top: overlayBox.top, 
          zIndex: 14, 
          pointerEvents: 'none',
          transform: 'none'
        }}
      >
        {POINTERS.map((pointer) => {
          const iconPos = MENU_BASE[pointer.from];
          const pointPos = MENU_BASE[pointer.to];
          
          if (!iconPos || !pointPos || !('x' in iconPos) || !('x' in pointPos)) return null;
          
          const offsetX = ('offsetX' in iconPos && iconPos.offsetX !== undefined) ? iconPos.offsetX : 0;
          const offsetY = ('offsetY' in iconPos && iconPos.offsetY !== undefined) ? iconPos.offsetY : 0;
          const iconX = (iconPos.x + offsetX) * scale;
          const iconY = (iconPos.y + offsetY) * scale;
          const pointX = pointPos.x * scale;
          const pointY = pointPos.y * scale;

          return (
            <g key={`line-${pointer.from}-to-${pointer.to}`}>
              <line
                x1={iconX}
                y1={iconY}
                x2={pointX}
                y2={pointY}
                stroke={COLOR}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={STROKE_DASH}
                strokeLinecap="round"
              />
              <circle
                cx={pointX}
                cy={pointY}
                r={CIRCLE_RADIUS}
                fill={CIRCLE_FILL}
                stroke={COLOR}
                strokeWidth={CIRCLE_BORDER}
              />
            </g>
          );
        })}
      </svg>
    );
  }, [overlayBox]);

  return (
    <div className="relative w-full homepage-container" style={{ 
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      overflowY: 'visible',
      flex: '0 0 auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {showRotationMessage && <RotationMessage />}
      
      {/* Credits image */}
      <div style={{
        position: 'absolute',
        top: '170px',
        right: '70px',
        zIndex: 50,
        cursor: 'pointer'
      }}>
        <LocalizedImage
          src="/assets/icons/menu/credits.png"
          alt={t('homePage.credits')}
          onClick={() => setShowCreditsModal(true)}
          style={{
            maxWidth: '75px',
            height: 'auto',
            display: 'block',
            cursor: 'pointer'
          }}
        />
      </div>

      {/* Credits Modal */}
      {showCreditsModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowCreditsModal(false)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <LocalizedImage
              src="/assets/icons/menu/creditsmodal.png"
              alt={t('homePage.credits')}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                height: 'auto',
                display: 'block'
              }}
            />
            {/* Close button - X in top right corner */}
            <button
              onClick={() => setShowCreditsModal(false)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                color: '#51727C',
                fontWeight: 'bold',
                lineHeight: 1,
                padding: 0,
                zIndex: 1001
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Page Title */}
      <div className="flex items-start justify-center" style={{ paddingTop: '16px', paddingBottom: '24px', marginTop: '80px' }}>
        <div className="w-full" style={{ padding: '0 100px' }}>
          <h1 className="main-title" style={{ fontSize: '36px', color: '#51727C' }}>
            {t('homePage.title')}{' '}
            <span style={{ color: '#548235' }}>{t('homePage.subtitle')}</span>
            <span style={{ color: '#51727C' }}>{t('homePage.subtitle2')}</span>
          </h1>
        </div>
      </div>

      {/* River Container */}
      <div ref={riverRef} className="w-full z-10" style={{ 
        width: '100%', 
        position: 'relative',
        maxWidth: '100vw'
      }}>
        {renderPointerLines}
        
        <img 
          src="/assets/backgrounds/river.png" 
          alt="River path" 
          style={{ 
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block'
          }}
          ref={riverImgRef}
        />
        
        {/* Render all menu buttons */}
        {MENU_ITEMS.map(renderMenuButton)}

        {/* Click instruction images */}
        <div 
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '3%',
            zIndex: 20,
            pointerEvents: 'none',
            display: 'flex',
            gap: 'clamp(0.5vw, 8px, 2vw)',
            alignItems: 'flex-end',
            width: 'auto'
          }}
        >
          <LocalizedImage 
            src="/assets/components/Click.png" 
            alt="Click instruction" 
            style={{ 
              width: 'clamp(100px, 10vw, 240px)',
              height: 'auto',
              opacity: 0.9,
              maxWidth: 'none'
            }}
          />
          <LocalizedImage 
            src="/assets/components/Lau.png" 
            alt="Lau instruction" 
            style={{ 
              width: 'clamp(100px, 10vw, 240px)',
              height: 'auto',
              opacity: 0.9,
              maxWidth: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
};
