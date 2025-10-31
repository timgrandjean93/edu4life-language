import React, { useRef, useEffect, useState } from 'react';
// import { ClickableButton } from './ClickableButton';
import { RotationMessage } from './RotationMessage';
// import { clickableComponents } from '../data/clickableComponents';
import type { ClickableComponent } from '../data/clickableComponents';

interface HomePageProps {
  onComponentClick?: (component: ClickableComponent) => void;
  onNavigate?: (page: 'home' | 'riparian' | 'mapwetland' | 'floodplain' | 'floodcontrol' | 'carbon' | 'selfpurification' | 'art' | 'people' | 'aesthetics' | 'wetlandfresk' | 'wetland4life' | 'wetlandEduRepo' | 'treatmentwetlands' | 'bluegreen' | 'environmentalToolbox') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onComponentClick: _onComponentClick, onNavigate }) => {
  const riverRef = useRef<HTMLDivElement>(null);
  const [showRotationMessage, setShowRotationMessage] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  
  // Positions for menu items relative to the river image (percentages of its width/height)
  // Base design size (matches original): 1920x1080
  const BASE = { w: 1920, h: 1080 } as const;
  // Base positions in pixels from the original design (you can fine-tune these)
  // Icons can have offsetX and offsetY to adjust where the line starts (default: 0, 0 = center)
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
    // New items (initial positions; adjust as needed)
    purification:    { x: Math.round(0.55 * BASE.w), y: Math.round(0.10 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
    purificationPoint:{ x: Math.round(0.49 * BASE.w), y: Math.round(0.20 * BASE.h) },
    treatment:       { x: Math.round(0.60 * BASE.w), y: Math.round(0.22 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
    treatmentPoint:  { x: Math.round(0.49 * BASE.w), y: Math.round(0.28 * BASE.h) },
    aesthetics:      { x: Math.round(0.62 * BASE.w), y: Math.round(0.33 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
    aestheticsPoint: { x: Math.round(0.49 * BASE.w), y: Math.round(0.36 * BASE.h) },
    // Art & People (initial guesses)
    art:             { x: Math.round(0.40 * BASE.w), y: Math.round(0.53 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
    artPoint:        { x: Math.round(0.49 * BASE.w), y: Math.round(0.44 * BASE.h) },
    people:          { x: Math.round(0.65 * BASE.w), y: Math.round(0.45 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
    peoplePoint:     { x: Math.round(0.65 * BASE.w), y: Math.round(0.56 * BASE.h) },
    // Game, Fresk, Wetland4Life (initial guesses)
    game:            { x: Math.round(0.81 * BASE.w), y: Math.round(0.40 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
    gamePoint:       { x: Math.round(0.81 * BASE.w), y: Math.round(0.63 * BASE.h) },
    fresk:           { x: Math.round(0.90 * BASE.w), y: Math.round(0.25 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 0, offsetY: 0 },
    freskPoint:      { x: Math.round(0.90 * BASE.w), y: Math.round(0.35 * BASE.h) },
    wetland4life:    { x: Math.round(0.90 * BASE.w), y: Math.round(0.70 * BASE.h), width: Math.round(0.14 * BASE.w), offsetX: 80, offsetY: 0 },
    wetland4lifePoint:{ x: Math.round(0.92 * BASE.w), y: Math.round(0.49 * BASE.h) },
  } as const;

  // overlayBox (left/top/size/scale) wordt elders berekend op basis van de echte img-maten

  // Pointer lines config: lines from icon center to a target point, rendered under icons
  // Explicitly defined to ensure correct mapping
  const POINTERS: Array<{
    from: keyof typeof MENU_BASE; // icon key to start from (center)
    to: keyof typeof MENU_BASE;   // end point key
  }> = [
    // Floodplain: from floodplain icon to floodplainPoint
    { from: 'floodplain', to: 'floodplainPoint' },
    // Map: from map icon to mapPoint
    { from: 'map', to: 'mapPoint' },
    // Explore: from explore icon to explorePoint
    { from: 'explore', to: 'explorePoint' },
    // Sponge: from sponge icon to spongePoint
    { from: 'sponge', to: 'spongePoint' },
    // Carbon: from carbon icon to carbonPoint
    { from: 'carbon', to: 'carbonPoint' },
    // Purification: from purification icon to purificationPoint
    { from: 'purification', to: 'purificationPoint' },
    // Treatment: from treatment icon to treatmentPoint
    { from: 'treatment', to: 'treatmentPoint' },
    // Aesthetics: from aesthetics icon to aestheticsPoint
    { from: 'aesthetics', to: 'aestheticsPoint' },
    // Art: from art icon to artPoint
    { from: 'art', to: 'artPoint' },
    // People: from people icon to peoplePoint
    { from: 'people', to: 'peoplePoint' },
    // Game: from game icon to gamePoint
    { from: 'game', to: 'gamePoint' },
    // Fresk: from fresk icon to freskPoint
    { from: 'fresk', to: 'freskPoint' },
    // Wetland4Life: from wetland4life icon to wetland4lifePoint
    { from: 'wetland4life', to: 'wetland4lifePoint' },
  ];
  
  // Responsive configuratie wordt nu direct toegepast in de component data
  const riverImgRef = useRef<HTMLImageElement>(null);
  const [overlayBox, setOverlayBox] = useState<{ left: number; top: number; w: number; h: number; s: number }>({ left: 0, top: 0, w: 0, h: 0, s: 1 });
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

  useEffect(() => {
    // Apply background image for homepage
    document.body.style.backgroundImage = "url('/assets/backgrounds/background.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundColor = "";
    
    // Cleanup function to remove background when component unmounts
    return () => {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  useEffect(() => {
    // Check screen orientation and show rotation message if needed
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobile = window.innerWidth <= 768; // Mobile breakpoint
      
      if (isMobile && isPortrait) {
        setShowRotationMessage(true);
      } else {
        setShowRotationMessage(false);
      }
    };

    // Check on mount
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // const handleComponentClick = (component: ClickableComponent) => {
  //   console.log('Clicked component:', component.title);
  //   if (onComponentClick) {
  //     onComponentClick(component);
  //   }
  // };

  // Responsive configuratie wordt nu direct toegepast in de component data

  return (
    <div className="relative w-full min-h-screen homepage-container" style={{ 
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      overflowY: 'auto',
      minHeight: '100vh'
    }}>
      {/* Rotation Message Overlay */}
      {showRotationMessage && <RotationMessage />}
      
      {/* Credits image - top right */}
      <div style={{
        position: 'absolute',
        top: '170px',
        right: '70px',
        zIndex: 50,
        cursor: 'pointer'
      }}>
        <img
          src="/assets/icons/menu/credits.png"
          alt="Credits"
          onClick={() => setShowCreditsModal(true)}
          style={{
            maxWidth: '75px',
            height: 'auto',
            display: 'block'
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
            <img
              src="/assets/icons/menu/creditsmodal.png"
              alt="Credits Modal"
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
      
      {/* Page Title under header */}
      <div className="flex items-start justify-center" style={{ paddingTop: '16px', paddingBottom: '48px', marginTop: '80px' }}>
        <div className="w-full" style={{ padding: '0 100px' }}>
          <h1 className="main-title" style={{ fontSize: '36px', color: '#51727C' }}>
            LIVING FLOODPLAINS:{' '}
            <span style={{ color: '#548235' }}>LEARN, EXPLORE, RESTORE</span>
            <span style={{ color: '#51727C' }}>4LIFE TOOLBOX</span>
          </h1>
        </div>
      </div>

      {/* River - Below the title, full width with aspect ratio */}
      <div ref={riverRef} className="w-full z-10" style={{ 
        width: '100%', 
        position: 'relative',
        maxWidth: '100vw'
      }}>
        {/* SVG pointer overlay - under icons, aligned to fitted river image */}
        {/* Use same scaling as icons (overlayBox.s) instead of viewBox scaling */}
        <svg
          width={BASE.w * overlayBox.s}
          height={BASE.h * overlayBox.s}
          style={{ 
            position: 'absolute', 
            left: overlayBox.left, 
            top: overlayBox.top, 
            zIndex: 14, 
            pointerEvents: 'none',
            transform: 'none'
          }}
        >
          {/* Render each pointer line explicitly */}
          {POINTERS.map((pointer) => {
            // Get icon position (start of line)
            const iconKey = pointer.from;
            const pointKey = pointer.to;
            
            const iconPos = MENU_BASE[iconKey];
            const pointPos = MENU_BASE[pointKey];
            
            // Skip if positions don't exist
            if (!iconPos || !pointPos || !iconPos.x || !iconPos.y || !pointPos.x || !pointPos.y) {
              return null;
            }
            
            // Scale all coordinates using overlayBox.s to match icon positioning
            const scale = overlayBox.s;
            // Apply offset to icon position (offsetX and offsetY are in base pixels)
            // offsetX: positive = right, negative = left
            // offsetY: positive = down, negative = up
            const offsetX = ('offsetX' in iconPos && iconPos.offsetX !== undefined) ? iconPos.offsetX : 0;
            const offsetY = ('offsetY' in iconPos && iconPos.offsetY !== undefined) ? iconPos.offsetY : 0;
            const iconX = (iconPos.x + offsetX) * scale;
            const iconY = (iconPos.y + offsetY) * scale;
            const pointX = pointPos.x * scale;
            const pointY = pointPos.y * scale;
            
            // Line styling constants (also scale to maintain visual consistency)
            const CIRCLE_RADIUS = 12 * scale;
            const STROKE_WIDTH = 3 * scale;
            const STROKE_DASH = `${8 * scale} ${6 * scale}`;
            const COLOR = "#619F6A";
            const CIRCLE_FILL = "#FFFFFF";
            const CIRCLE_BORDER = 3 * scale;
            
            return (
              <g key={`line-${iconKey}-to-${pointKey}`}>
                {/* Dotted line from icon center to point */}
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
                {/* White circle with green border at end point */}
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
        
        {/* Pointer marker - freely positionable */}
        {/* Pointer dot is drawn in SVG; no separate point image needed */}
        {/* Foreground clickable card */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('floodplain')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.floodplain.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.floodplain.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Floodplain.png"
            alt="Floodplain"
            style={{
              width: `${MENU_BASE.floodplain.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>
        
        {/* MAP: pointer */}
        {/* Pointer for Map drawn in SVG */}
        {/* MAP: clickable card */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('mapwetland')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.map.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.map.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Map.png"
            alt="Map your wetland"
            style={{
              width: `${MENU_BASE.map.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* GAME (Blue-Green Space4All) */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('bluegreen')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.game.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.game.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Game.png"
            alt="Game"
            style={{
              width: `${MENU_BASE.game.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* FRESK */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('wetlandfresk')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.fresk.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.fresk.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Fresk.png"
            alt="Fresk"
            style={{
              width: `${MENU_BASE.fresk.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* WETLAND4LIFE */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('wetland4life')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.wetland4life.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.wetland4life.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Wetland4Life.png"
            alt="Wetland4Life"
            style={{
              width: `${MENU_BASE.wetland4life.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* ART */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('art')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.art.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.art.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Art.png"
            alt="Art"
            style={{
              width: `${MENU_BASE.art.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* PEOPLE */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('people')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.people.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.people.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/People.png"
            alt="People"
            style={{
              width: `${MENU_BASE.people.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* EXPLORE (Riparian): pointer */}
        {/* Pointer for Explore drawn in SVG */}
        {/* EXPLORE (Riparian): clickable card */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('riparian')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.explore.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.explore.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Explore.png"
            alt="Explore"
            style={{
              width: `${MENU_BASE.explore.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* SPONGE (Flood control): pointer */}
        {/* Pointer for Sponge drawn in SVG */}
        {/* SPONGE (Flood control): clickable card */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('floodcontrol')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.sponge.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.sponge.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Sponge.png"
            alt="Sponge"
            style={{
              width: `${MENU_BASE.sponge.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* CARBON (Climate & Carbon): pointer */}
        {/* Pointer for Carbon drawn in SVG */}
        {/* CARBON (Climate & Carbon): clickable card */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('carbon')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.carbon.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.carbon.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Carbon.png"
            alt="Climate & Carbon"
            style={{
              width: `${MENU_BASE.carbon.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* PURIFICATION (Self Purification) */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('selfpurification')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.purification.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.purification.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Purification.png"
            alt="Self Purification"
            style={{
              width: `${MENU_BASE.purification.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* TREATMENT (Treatment wetlands) */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('treatmentwetlands')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.treatment.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.treatment.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Treatment.png"
            alt="Treatment wetlands"
            style={{
              width: `${MENU_BASE.treatment.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* AESTHETICS */}
        <button
          className="nav-button"
          onClick={() => onNavigate && onNavigate('aesthetics')}
          style={{
            position: 'absolute',
            left: `${overlayBox.left + MENU_BASE.aesthetics.x * overlayBox.s}px`,
            top: `${overlayBox.top + MENU_BASE.aesthetics.y * overlayBox.s}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: 15,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img
            src="/assets/icons/menu/Aestethics.png"
            alt="Aesthetics"
            style={{
              width: `${MENU_BASE.aesthetics.width * overlayBox.s}px`,
              height: 'auto',
              display: 'block',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
        </button>

        {/* Click instruction images - aligned with EU disclaimer baseline */}
        <div 
          style={{
            position: 'fixed',
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
          <img 
            src="/assets/components/Click.png" 
            alt="Click instruction" 
            style={{ 
              width: 'clamp(100px, 10vw, 240px)',
              height: 'auto',
              opacity: 0.9,
              maxWidth: 'none'
            }}
          />
          <img 
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

      {/* EU logo - transparent overlay at bottom center */}
      <div className="relative z-20" style={{ 
        position: 'fixed', 
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        pointerEvents: 'none'
      }}>
        <img 
          src="/assets/icons/EU.png" 
          alt="Co-funded by the European Union" 
          style={{ height: '96px', width: 'auto', display: 'block' }}
        />
      </div>
    </div>
  );
};