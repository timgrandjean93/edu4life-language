import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HomeButton } from '../HomeButton';
import { usePageRouting } from '../../hooks/usePageRouting';
import { LocalizedImage } from '../LocalizedImage';
import { useOrientation } from '../../hooks/useOrientation';

interface ArtPageProps {
  onHomeClick: () => void;
  onPeopleAquaticClick?: () => void;
  onRepositoryClick?: () => void;
}

// Natural elements that can be dragged
const heronElements = [
  { 
    id: 'branches', 
    name: 'Branches', 
    image: '/assets/components/art/heron/branches.png', 
    placedImage: '/assets/components/art/heron/branches_placed.png',
    type: 'element', 
    rotation: 15 
  },
  { 
    id: 'feather', 
    name: 'Feather', 
    image: '/assets/components/art/heron/feather.png', 
    placedImage: '/assets/components/art/heron/feather_placed.png',
    type: 'element', 
    rotation: -25,
    multipleDropZones: true  // Can be placed in 2 different zones
  },
  { 
    id: 'grass', 
    name: 'Grass', 
    image: '/assets/components/art/heron/grass.png', 
    placedImage: '/assets/components/art/heron/grass_placed.png',
    type: 'element', 
    rotation: 8 
  },
  { 
    id: 'leaf', 
    name: 'Leaf', 
    image: '/assets/components/art/heron/leaf.png', 
    placedImage: '/assets/components/art/heron/leaf_placed.png',
    type: 'element', 
    rotation: -12 
  },
  { 
    id: 'petals', 
    name: 'Petals', 
    image: '/assets/components/art/heron/petals.png', 
    placedImage: '/assets/components/art/heron/petals_placed.png',
    type: 'element', 
    rotation: 22 
  },
  { 
    id: 'small_leaves', 
    name: 'Small Leaves', 
    image: '/assets/components/art/heron/small_leaves.png', 
    placedImage: '/assets/components/art/heron/small_leaves_placed.png',
    type: 'element', 
    rotation: -18 
  },
  { 
    id: 'snail', 
    name: 'Snail', 
    image: '/assets/components/art/heron/snail.png', 
    placedImage: '/assets/components/art/heron/snail_placed.png',
    type: 'element', 
    rotation: 5 
  }
];

const libelleElements = [
  { 
    id: 'branch', 
    name: 'Branch', 
    image: '/assets/components/art/libelle/branch.png', 
    placedImage: '/assets/components/art/libelle/branch_placed.png',
    type: 'element', 
    rotation: 15 
  },
  { 
    id: 'seed', 
    name: 'Seed', 
    image: '/assets/components/art/libelle/seed.png', 
    placedImage: '/assets/components/art/libelle/seed_placed.png',
    type: 'element', 
    rotation: -25 
  },
  { 
    id: 'wings', 
    name: 'Wings', 
    image: '/assets/components/art/libelle/wings.png', 
    placedImage: '/assets/components/art/libelle/wings_placed.png',
    type: 'element', 
    rotation: 8 
  },
  { 
    id: 'wings2', 
    name: 'Wings 2', 
    image: '/assets/components/art/libelle/wings2.png', 
    placedImage: '/assets/components/art/libelle/wings2_placed.png',
    type: 'element', 
    rotation: -12 
  }
];

// Removed: boatElements (page 3 removed)
// Unused, kept for reference
/* const _boatElementsUnused = [
  { 
    id: 'leaf', 
    name: 'Leaf', 
    image: '/assets/components/art/boat/leaf.png', 
    placedImage: '/assets/components/art/boat/leaf_placed.png',
    type: 'element', 
    rotation: 15 
  },
  { 
    id: 'willow_leaves', 
    name: 'Willow Leaves', 
    image: '/assets/components/art/boat/willow_leaves.png', 
    placedImage: '/assets/components/art/boat/willow_leaves_placed.png',
    type: 'element', 
    rotation: -25 
  },
  { 
    id: 'small_branch', 
    name: 'Small Branch', 
    image: '/assets/components/art/boat/small_branch.png', 
    placedImage: '/assets/components/art/boat/small_branch_placed.png',
    type: 'element', 
    rotation: 8 
  },
  { 
    id: 'medium_branch', 
    name: 'Medium Branch', 
    image: '/assets/components/art/boat/medium_branch.png', 
    placedImage: '/assets/components/art/boat/medium_branch_placed.png',
    type: 'element', 
    rotation: -12 
  },
  { 
    id: 'small_tree_body', 
    name: 'Small Tree Body', 
    image: '/assets/components/art/boat/small_tree_body.png', 
    placedImage: '/assets/components/art/boat/small_tree_body_placed.png',
    type: 'element', 
    rotation: 22 
  },
  { 
    id: 'hat', 
    name: 'Hat', 
    image: '/assets/components/art/boat/hat.png', 
    placedImage: '/assets/components/art/boat/hat_placed.png',
    type: 'element', 
    rotation: -18 
  },
  { 
    id: 'big_rock', 
    name: 'Big Rock', 
    image: '/assets/components/art/boat/big_rock.png', 
    placedImage: '/assets/components/art/boat/big_rock_placed.png',
    type: 'element', 
    rotation: 5 
  },
  { 
    id: 'small_rock', 
    name: 'Small Rock', 
    image: '/assets/components/art/boat/small_rock.png', 
    placedImage: '/assets/components/art/boat/small_rock_placed.png',
    type: 'element', 
    rotation: -10 
  },
  { 
    id: 'biggest_rock', 
    name: 'Biggest Rock', 
    image: '/assets/components/art/boat/biggest_rock.png', 
    placedImage: '/assets/components/art/boat/biggest_rock_placed.png',
    type: 'element', 
    rotation: 12 
  },
  { 
    id: 'bush', 
    name: 'Bush', 
    image: '/assets/components/art/boat/bush.png', 
    placedImage: '/assets/components/art/boat/bush_placed.png',
    type: 'element', 
    rotation: -8 
  },
  { 
    id: 'leaves_water', 
    name: 'Leaves Water', 
    image: '/assets/components/art/boat/leaves_water.png', 
    placedImage: '/assets/components/art/boat/leaves_water_placed.png',
    type: 'element', 
    rotation: 20 
  },
  { 
    id: 'big_tree_body', 
    name: 'Big Tree Body', 
    image: '/assets/components/art/boat/big_tree_body.png', 
    placedImage: '/assets/components/art/boat/big_tree_body_placed.png',
    type: 'element', 
    rotation: -15 
  },
  { 
    id: 'leaves_water_2', 
    name: 'Leaves Water 2', 
    image: '/assets/components/art/boat/leaves_water_2.png', 
    placedImage: '/assets/components/art/boat/leaves_water_2_placed.png',
    type: 'element', 
    rotation: 10 
  },
  { 
    id: 'arm_1', 
    name: 'Arm 1', 
    image: '/assets/components/art/boat/arm_1.png', 
    placedImage: '/assets/components/art/boat/arm_1_placed.png',
    type: 'element', 
    rotation: -20 
  },
  { 
    id: 'stick', 
    name: 'Stick', 
    image: '/assets/components/art/boat/stick.png', 
    placedImage: '/assets/components/art/boat/stick_placed.png',
    type: 'element', 
    rotation: 18 
  },
  { 
    id: 'grass', 
    name: 'Grass', 
    image: '/assets/components/art/boat/grass.png', 
    placedImage: '/assets/components/art/boat/grass_placed.png',
    type: 'element', 
    rotation: -5 
  },
  { 
    id: 'arm_2', 
    name: 'Arm 2', 
    image: '/assets/components/art/boat/arm_2.png', 
    placedImage: '/assets/components/art/boat/arm_2_placed.png',
    type: 'element', 
    rotation: 25 
  }
]; */

// Removed: animalsElements (page 4 removed)
// Unused, kept for reference
/* const _animalsElementsUnused = [
  { 
    id: 'rock', 
    name: 'Rock', 
    image: '/assets/components/art/animals/rock.png', 
    placedImage: '/assets/components/art/animals/rock_placed.png',
    type: 'element', 
    rotation: 15,
    multipleDropZones: true  // Can be placed in 4 different zones
  },
  { 
    id: 'leaf-3', 
    name: 'Leaf 3', 
    image: '/assets/components/art/animals/leaf-3.png', 
    placedImage: '/assets/components/art/animals/leaf-3_placed.png',
    type: 'element', 
    rotation: -25,
    multipleDropZones: true  // Can be placed in 4 different zones
  },
  { 
    id: 'grass-3', 
    name: 'Grass 3', 
    image: '/assets/components/art/animals/grass-3.png', 
    placedImage: '/assets/components/art/animals/grass-3_placed.png',
    type: 'element', 
    rotation: 8,
    multipleDropZones: true  // Can be placed in 3 different zones
  },
  { 
    id: 'moss', 
    name: 'Moss', 
    image: '/assets/components/art/animals/moss.png', 
    placedImage: '/assets/components/art/animals/moss_placed.png',
    type: 'element', 
    rotation: -12 
  },
  { 
    id: 'seed-2', 
    name: 'Seed 2', 
    image: '/assets/components/art/animals/seed-2.png', 
    placedImage: '/assets/components/art/animals/seed-2_placed.png',
    type: 'element', 
    rotation: 22 
  },
  { 
    id: 'snail-2', 
    name: 'Snail 2', 
    image: '/assets/components/art/animals/snail-2.png', 
    placedImage: '/assets/components/art/animals/snail-2_placed.png',
    type: 'element', 
    rotation: -18 
  },
  { 
    id: 'leaf_2', 
    name: 'Leaf 2', 
    image: '/assets/components/art/animals/leaf_2.png', 
    placedImage: '/assets/components/art/animals/leaf_2_placed.png',
    type: 'element', 
    rotation: 5 
  },
  { 
    id: 'rocks', 
    name: 'Rocks', 
    image: '/assets/components/art/animals/rocks.png', 
    placedImage: '/assets/components/art/animals/rocks_placed.png',
    type: 'element', 
    rotation: -10 
  },
  { 
    id: 'small_leaf', 
    name: 'Small Leaf', 
    image: '/assets/components/art/animals/small_leaf.png', 
    placedImage: '/assets/components/art/animals/small_leaf_placed.png',
    type: 'element', 
    rotation: 12 
  }
]; */

const finalElements = [
  { 
    id: 'tree', 
    name: 'Tree', 
    image: '/assets/components/art/final/tree.png', 
    placedImage: '/assets/components/art/final/tree_placed.png',
    type: 'element', 
    rotation: 0,
    multipleDropZones: false
  },
  { 
    id: 'stork', 
    name: 'Stork', 
    image: '/assets/components/art/final/stork.png', 
    placedImage: '/assets/components/art/final/stork_placed.png',
    type: 'element', 
    rotation: 0,
    multipleDropZones: false
  },
  { 
    id: 'willow', 
    name: 'Willow', 
    image: '/assets/components/art/final/willow.png', 
    placedImage: '/assets/components/art/final/willow_placed.png',
    type: 'element', 
    rotation: 0,
    multipleDropZones: false
  },
  { 
    id: 'dragon-fly', 
    name: 'Dragon Fly', 
    image: '/assets/components/art/final/dragon-fly.png', 
    placedImage: '/assets/components/art/final/dragon-fly_placed.png',
    type: 'element', 
    rotation: 0,
    multipleDropZones: false
  },
  { 
    id: 'turtle', 
    name: 'Turtle', 
    image: '/assets/components/art/final/turtle.png', 
    placedImage: '/assets/components/art/final/turtle_placed.png',
    type: 'element', 
    rotation: 0,
    multipleDropZones: false
  },
  { 
    id: 'fishermen', 
    name: 'Fishermen', 
    image: '/assets/components/art/final/fisherman.png', 
    placedImage: '/assets/components/art/final/fishermen_placed.png',
    type: 'element', 
    rotation: 0,
    multipleDropZones: false
  },
  { 
    id: 'fish', 
    name: 'Fish', 
    image: '/assets/components/art/final/fish.png', 
    placedImage: '/assets/components/art/final/fish_placed.png',
    type: 'element', 
    rotation: 0,
    multipleDropZones: false
  }
];

// Heron outline that can be filled
const heronOutline = {
  id: 'heron', 
  name: 'Heron', 
  image: '/assets/components/art/heron/heron.png',
  dropZones: [
    { id: 'heron-zone1', x: 67, y: 8, width: 12, height: 10, accepts: ['snail'] },
    { id: 'heron-zone2', x: 82, y: 18, width: 20, height: 22, accepts: ['feather'] },
    { id: 'heron-zone2b', x: 10, y: 50, width: 18, height: 15, accepts: ['feather'] }, // Second dropzone for feather
    { id: 'heron-zone3', x: 60, y: 10, width: 20, height: 25, accepts: ['petals'] },
    { id: 'heron-zone4', x: 30, y: 35, width: 60, height: 30, accepts: ['leaf'] },
    { id: 'heron-zone5', x: 50, y: 35, width: 35, height: 20, accepts: ['small_leaves'] },
    { id: 'heron-zone6', x: 40, y: 8, width: 25, height: 20, accepts: ['grass'] },
    { id: 'heron-zone7', x: 45, y: 73, width: 40, height: 45, accepts: ['branches'] }
  ]
};

// Libelle outline that can be filled
const libelleOutline = {
  id: 'libelle', 
  name: 'Libelle', 
  image: '/assets/components/art/libelle/libelle.png',
  dropZones: [
    { id: 'libelle-zone1', x: 50, y: 65, width: 15, height: 60, accepts: ['branch'] },
    { id: 'libelle-zone2', x: 50, y: 15, width: 20, height: 25, accepts: ['seed'] },
    { id: 'libelle-zone3', x: 50, y: 45, width: 80, height: 30, accepts: ['wings'] },
    { id: 'libelle-zone4', x: 50, y: 15, width: 90, height: 30, accepts: ['wings2'] }
  ]
};

// Removed: boatOutline (page 3 removed)
// Unused, kept for reference
/* const _boatOutlineUnused = {
  id: 'boat', 
  name: 'Boat', 
  image: '/assets/components/art/boat/boat.png',
  dropZones: [
    { id: 'boat-zone1', x: 37, y: 70, width: 15, height: 20, accepts: ['leaf'] },
    { id: 'boat-zone2', x: 68, y: 60, width: 25, height: 25, accepts: ['willow_leaves'] },
    { id: 'boat-zone10', x: 60, y: 80, width: 15, height: 15, accepts: ['bush'] },
    { id: 'boat-zone3', x: 60, y: 60, width: 7, height: 7, accepts: ['small_branch'] },
    { id: 'boat-zone4', x: 64, y: 65, width: 15, height: 20, accepts: ['medium_branch'] },
    { id: 'boat-zone5', x: 37, y: 77, width: 5, height: 10, accepts: ['small_tree_body'] },
    { id: 'boat-zone6', x: 60, y: 10, width: 15, height: 15, accepts: ['hat'] },
    { id: 'boat-zone7', x: 70, y: 10, width: 15, height: 15, accepts: ['big_rock'] },
    { id: 'boat-zone8', x: 80, y: 10, width: 15, height: 15, accepts: ['small_rock'] },
    { id: 'boat-zone9', x: 90, y: 10, width: 15, height: 15, accepts: ['biggest_rock'] },
    { id: 'boat-zone11', x: 75, y: 42, width: 8, height: 8, accepts: ['leaves_water'] },
    { id: 'boat-zone12', x: 50, y: 33, width: 40, height: 12, accepts: ['big_tree_body'] },
    { id: 'boat-zone13', x: 50, y: 40, width: 40, height: 5, accepts: ['leaves_water_2'] },
    { id: 'boat-zone14', x: 60, y: 10, width: 15, height: 15, accepts: ['arm_1'] },
    { id: 'boat-zone15', x: 64, y: 22.5, width: 15, height: 3, accepts: ['stick'] },
    { id: 'boat-zone16', x: 80, y: 10, width: 15, height: 15, accepts: ['grass'] },
    { id: 'boat-zone17', x: 90, y: 10, width: 15, height: 15, accepts: ['arm_2'] }
  ]
}; */

// Removed: animalsOutline (page 4 removed)
// Unused, kept for reference
/* const _animalsOutlineUnused = {
  id: 'animals', 
  name: 'Animals', 
  image: '/assets/components/art/animals/animals.png',
  dropZones: [
    // Rock - 4 drop zones
    { id: 'animals-zone-rock-1', x: 15, y: 20, width: 10, height: 10, accepts: ['rock'] },
    { id: 'animals-zone-rock-2', x: 35, y: 30, width: 10, height: 10, accepts: ['rock'] },
    { id: 'animals-zone-rock-3', x: 55, y: 25, width: 10, height: 10, accepts: ['rock'] },
    { id: 'animals-zone-rock-4', x: 75, y: 35, width: 10, height: 10, accepts: ['rock'] },
    // Leaf-3 - 4 drop zones
    { id: 'animals-zone-leaf3-1', x: 20, y: 10, width: 10, height: 10, accepts: ['leaf-3'] },
    { id: 'animals-zone-leaf3-2', x: 45, y: 15, width: 10, height: 10, accepts: ['leaf-3'] },
    { id: 'animals-zone-leaf3-3', x: 65, y: 12, width: 10, height: 10, accepts: ['leaf-3'] },
    { id: 'animals-zone-leaf3-4', x: 80, y: 20, width: 10, height: 10, accepts: ['leaf-3'] },
    // Grass-3 - 3 drop zones
    { id: 'animals-zone-grass3-1', x: 10, y: 40, width: 10, height: 10, accepts: ['grass-3'] },
    { id: 'animals-zone-grass3-2', x: 40, y: 45, width: 10, height: 10, accepts: ['grass-3'] },
    { id: 'animals-zone-grass3-3', x: 70, y: 42, width: 10, height: 10, accepts: ['grass-3'] },
    // Moss - 1 drop zone
    { id: 'animals-zone1', x: 30, y: 50, width: 15, height: 15, accepts: ['moss'] },
    // Seed-2 - 1 drop zone
    { id: 'animals-zone2', x: 15, y: 60, width: 10, height: 10, accepts: ['seed-2'] },
    // Snail-2 - 1 drop zone
    { id: 'animals-zone3', x: 85, y: 50, width: 10, height: 10, accepts: ['snail-2'] },
    // Leaf_2 - 1 drop zone
    { id: 'animals-zone4', x: 50, y: 5, width: 10, height: 10, accepts: ['leaf_2'] },
    // Rocks - 1 drop zone
    { id: 'animals-zone5', x: 90, y: 60, width: 15, height: 15, accepts: ['rocks'] },
    // Small_leaf - 1 drop zone
    { id: 'animals-zone6', x: 5, y: 15, width: 8, height: 8, accepts: ['small_leaf'] }
  ]
}; */

// Final outline that can be filled
const finalOutline = {
  id: 'final', 
  name: 'Final', 
  image: '/assets/components/art/final/final.png',
  dropZones: [
    { id: 'final-zone1', x: 85, y: 30, width: 15, height: 35, accepts: ['tree'] },
    { id: 'final-zone2', x: 30, y: 60, width: 20, height: 45, accepts: ['stork'] },
    { id: 'final-zone3', x: 20, y: 30, width: 30, height: 50, accepts: ['willow'] },
    { id: 'final-zone4', x: 70, y: 35, width: 20, height: 20, accepts: ['dragon-fly'] },
    { id: 'final-zone5', x: 52, y: 90, width: 30, height: 15, accepts: ['fish'] },
    { id: 'final-zone6', x: 47, y: 60, width: 30, height: 20, accepts: ['fishermen'] },
    { id: 'final-zone7', x: 85, y: 75, width: 16, height: 16, accepts: ['turtle'] }
  ]
};

export const ArtPage: React.FC<ArtPageProps> = ({ onHomeClick, onPeopleAquaticClick, onRepositoryClick }) => {
  const { t } = useTranslation();
  const { isMobile } = useOrientation();
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [placedElements, setPlacedElements] = useState<{[key: string]: string}>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [usedElements, setUsedElements] = useState<Set<string>>(new Set());
  // Dropzones are hidden by default
  const showDropZones = false;
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Touch drag state for mobile
  const [touchDragState, setTouchDragState] = useState<{
    elementId: string | null;
    touchX: number;
    touchY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  // Track window width for responsive navbar
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate if there's enough space for download and next topic buttons
  const hasEnoughSpace = windowWidth >= 1400;

  // Dropzones are hidden by default

  const TOTAL_PAGES = 3;
  const [currentPage, setCurrentPage] = usePageRouting(TOTAL_PAGES);

  // Get current outline based on page
  const getCurrentOutline = () => {
    if (currentPage === 1) return heronOutline;
    if (currentPage === 2) return libelleOutline;
    return finalOutline;
  };

  // Get current elements based on page
  const getCurrentElements = () => {
    if (currentPage === 1) return heronElements;
    if (currentPage === 2) return libelleElements;
    return finalElements;
  };

  const handleDragStart = (e: React.DragEvent, elementId: string) => {
    console.log('🎯 Drag started:', elementId);
    console.log('Used elements:', Array.from(usedElements));
    console.log('Is element used?', usedElements.has(elementId));
    setDraggedElement(elementId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a custom drag image that maintains exact displayed size and orientation
    const dragElement = e.currentTarget as HTMLElement;
    const imgElement = dragElement.querySelector('img') as HTMLImageElement;
    
    if (imgElement) {
      // Find the element object to get rotation
      const element = getCurrentElements().find(el => el.id === elementId);
      const rotation = element?.rotation || 0;
      
      // Get the exact displayed dimensions (before rotation transform)
      // Use offsetWidth/offsetHeight to get the actual rendered size
      const displayedWidth = imgElement.offsetWidth;
      const displayedHeight = imgElement.offsetHeight;
      
      // Get computed styles to preserve exact appearance
      const computedStyle = window.getComputedStyle(imgElement);
      
      // Create a container div that exactly matches what the user sees
      const dragContainer = document.createElement('div');
      dragContainer.style.position = 'absolute';
      dragContainer.style.top = '-10000px';
      dragContainer.style.left = '-10000px';
      dragContainer.style.width = displayedWidth + 'px';
      dragContainer.style.height = displayedHeight + 'px';
      dragContainer.style.pointerEvents = 'none';
      dragContainer.style.boxSizing = 'border-box';
      dragContainer.style.overflow = 'visible';
      dragContainer.style.transformOrigin = 'center center';
      
      // Clone the image element
      const clone = imgElement.cloneNode(true) as HTMLImageElement;
      
      // Apply exact same styling as displayed - preserve size and rotation
      clone.style.width = displayedWidth + 'px';
      clone.style.height = displayedHeight + 'px';
      clone.style.maxWidth = displayedWidth + 'px';
      clone.style.maxHeight = displayedHeight + 'px';
      clone.style.minWidth = displayedWidth + 'px';
      clone.style.minHeight = displayedHeight + 'px';
      clone.style.transform = `rotate(${rotation}deg)`; // Preserve exact rotation
      clone.style.transformOrigin = 'center center'; // Rotate around center
      clone.style.objectFit = computedStyle.objectFit || 'contain';
      clone.style.display = 'block';
      clone.style.margin = '0';
      clone.style.padding = '0';
      clone.style.border = 'none';
      clone.style.opacity = '0.9';
      clone.style.boxSizing = 'border-box';
      clone.style.verticalAlign = 'top';
      
      dragContainer.appendChild(clone);
      document.body.appendChild(dragContainer);
      
      // Force a reflow to ensure dimensions and transform are applied
      void dragContainer.offsetHeight;
      
      // Set the drag image with offset at center
      e.dataTransfer.setDragImage(dragContainer, displayedWidth / 2, displayedHeight / 2);
      
      // Remove clone after drag starts
      setTimeout(() => {
        if (document.body.contains(dragContainer)) {
          document.body.removeChild(dragContainer);
        }
      }, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropZoneId: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent multiple drop handlers from firing
    
    if (!draggedElement) return;

    const element = getCurrentElements().find(el => el.id === draggedElement);
    if (!element) {
      setDraggedElement(null);
      return;
    }

    // Get the image container to calculate relative position
    const imageContainer = (e.currentTarget as HTMLElement).closest('.relative') as HTMLElement;
    if (!imageContainer) {
      setDraggedElement(null);
      return;
    }

    const containerRect = imageContainer.getBoundingClientRect();
    const dropX = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const dropY = ((e.clientY - containerRect.top) / containerRect.height) * 100;

    // Find all dropzones that accept this element
    const validZones = getCurrentOutline().dropZones.filter(zone => 
      zone.accepts.includes(element.id) && !placedElements[zone.id]
    );

    if (validZones.length === 0) {
      console.log('✗ No valid zones available for this element');
      setDraggedElement(null);
      return;
    }

    // Find which zone the drop point is in (check all valid zones)
    let targetZone = validZones.find(zone => {
      const zoneLeft = zone.x - zone.width / 2;
      const zoneRight = zone.x + zone.width / 2;
      const zoneTop = zone.y - zone.height / 2;
      const zoneBottom = zone.y + zone.height / 2;
      
      return dropX >= zoneLeft && dropX <= zoneRight && 
             dropY >= zoneTop && dropY <= zoneBottom;
    });

    // If not found in any zone, use the zone that was triggered (for backwards compatibility)
    if (!targetZone) {
      const triggeredZone = getCurrentOutline().dropZones.find(zone => zone.id === dropZoneId);
      if (triggeredZone && triggeredZone.accepts.includes(element.id) && !placedElements[triggeredZone.id]) {
        targetZone = triggeredZone;
      }
    }

    // If still no zone found, try to find the closest valid zone
    if (!targetZone && validZones.length > 0) {
      let minDistance = Infinity;
      for (const zone of validZones) {
        const distance = Math.sqrt(
          Math.pow(dropX - zone.x, 2) + Math.pow(dropY - zone.y, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          targetZone = zone;
        }
      }
    }

    if (targetZone) {
      console.log(`✓ Drop accepted in zone ${targetZone.id} for element ${draggedElement}`);
      const newPlacedElements = { ...placedElements, [targetZone.id]: draggedElement };
      
      // If element has multipleDropZones, place it in all zones that accept it
      if ('multipleDropZones' in element && (element as { multipleDropZones?: boolean }).multipleDropZones) {
        const elementZones = getCurrentOutline().dropZones.filter(zone => zone.accepts.includes(element.id));
        elementZones.forEach(zone => {
          if (!newPlacedElements[zone.id]) {
            newPlacedElements[zone.id] = draggedElement;
          }
        });
      }
      
      setPlacedElements(newPlacedElements);

      // Mark element as used immediately if it has multipleDropZones (since we place it in all zones at once)
      if ('multipleDropZones' in element && (element as { multipleDropZones?: boolean }).multipleDropZones) {
        setUsedElements(prev => new Set([...prev, draggedElement]));
      } else {
        setUsedElements(prev => new Set([...prev, draggedElement]));
      }

      // Check if all drop zones are filled
      const allDropZones = getCurrentOutline().dropZones;
      const filledZones = Object.keys(newPlacedElements).length;
      
      console.log(`Filled zones: ${filledZones} / ${allDropZones.length}`);
      
      if (filledZones >= allDropZones.length) {
        setIsCompleted(true);
      }
    } else {
      console.log('✗ Drop rejected - no valid zone found');
    }

    setDraggedElement(null);
  };

  // Removed: resetPuzzle unused

  // Download modal handlers
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink = () => {
    window.open('https://doi.org/10.5281/zenodo.17478185', '_blank');
    setShowDownloadModal(false);
  };

  // Touch handlers for mobile drag and drop
  const handleTouchStart = (e: React.TouchEvent, elementId: string) => {
    if (!isMobile) return;
    
    const elementZones = getCurrentOutline().dropZones.filter(zone => zone.accepts.includes(elementId));
    const filledElementZones = elementZones.filter(zone => placedElements[zone.id] === elementId);
    const isElementFullyUsed = filledElementZones.length >= elementZones.length;
    
    if (isElementFullyUsed) return;
    
    const touch = e.touches[0];
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    setTouchDragState({
      elementId,
      touchX: touch.clientX,
      touchY: touch.clientY,
      offsetX: touch.clientX - rect.left - rect.width / 2,
      offsetY: touch.clientY - rect.top - rect.height / 2
    });
    
    e.preventDefault(); // Prevent scrolling
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchDragState) return;
    
    const touch = e.touches[0];
    setTouchDragState({
      ...touchDragState,
      touchX: touch.clientX,
      touchY: touch.clientY
    });
    
    e.preventDefault(); // Prevent scrolling
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !touchDragState) return;
    
    const touch = e.changedTouches[0];
    const elementId = touchDragState.elementId;
    const element = getCurrentElements().find(el => el.id === elementId);
    
    if (!element) {
      setTouchDragState(null);
      return;
    }

    // Find the drop zone at touch position
    const imageContainer = document.querySelector('[data-art-image-container]') as HTMLElement;
    if (!imageContainer) {
      setTouchDragState(null);
      return;
    }

    const containerRect = imageContainer.getBoundingClientRect();
    const touchX = touch.clientX;
    const touchY = touch.clientY;
    
    // Check if touch is within image container
    if (
      touchX < containerRect.left ||
      touchX > containerRect.right ||
      touchY < containerRect.top ||
      touchY > containerRect.bottom
    ) {
      setTouchDragState(null);
      return;
    }

    // Calculate percentage position
    const dropX = ((touchX - containerRect.left) / containerRect.width) * 100;
    const dropY = ((touchY - containerRect.top) / containerRect.height) * 100;

    // Find all dropzones that accept this element
    const validZones = getCurrentOutline().dropZones.filter(zone => 
      zone.accepts.includes(element.id) && !placedElements[zone.id]
    );

    if (validZones.length === 0) {
      setTouchDragState(null);
      return;
    }

    // Find the closest valid dropzone
    let closestZone = validZones[0];
    let minDistance = Infinity;

    validZones.forEach(zone => {
      const distance = Math.sqrt(
        Math.pow(zone.x - dropX, 2) + Math.pow(zone.y - dropY, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestZone = zone;
      }
    });

    // Check if within zone bounds (with some tolerance)
    const zoneWidth = closestZone.width;
    const zoneHeight = closestZone.height;
    const distanceX = Math.abs(dropX - closestZone.x);
    const distanceY = Math.abs(dropY - closestZone.y);
    
    // Use larger tolerance for mobile (20% of zone size)
    const toleranceX = zoneWidth * 0.2;
    const toleranceY = zoneHeight * 0.2;

    if (distanceX <= zoneWidth / 2 + toleranceX && distanceY <= zoneHeight / 2 + toleranceY) {
      // Place element
      setPlacedElements(prev => ({
        ...prev,
        [closestZone.id]: element.id
      }));
      
      setUsedElements(prev => new Set([...prev, element.id]));
      
      // Check if all zones are filled
      const allZonesFilled = getCurrentOutline().dropZones.every(zone => placedElements[zone.id] || zone.id === closestZone.id);
      if (allZonesFilled) {
        setIsCompleted(true);
      }
    }

    setTouchDragState(null);
  };

  // Retry function to reset current page
  const handleRetry = () => {
    setPlacedElements({});
    setIsCompleted(false);
    setUsedElements(new Set());
    setTouchDragState(null);
  };

  const handleDashboardLink = () => {
    setShowDownloadModal(false);
    if (onRepositoryClick) {
      onRepositoryClick();
    }
  };

  return (
    <div className="min-h-screen relative" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#dfebf5',
      overflowX: 'visible',
      paddingBottom: '0px'
    }}>
      {/* Header with title and home button */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '70px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4" style={{ marginLeft: isMobile ? '0' : '100px', marginRight: isMobile ? '0' : '100px', paddingLeft: isMobile ? '12px' : '16px', paddingRight: isMobile ? '12px' : '16px' }}>
            {/* Header with Title */}
            <div className="relative" style={{ marginTop: '40px' }}>
              {/* Title and Subtitle - Centered */}
              <div className="text-center">
                {/* Title */}
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  {t('artPage.title')}
                </motion.h1>
                
                {/* Subtitle */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 pb-8" style={{ paddingBottom: '10px', flex: 1, paddingLeft: isMobile ? '12px' : '16px', paddingRight: isMobile ? '12px' : '16px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
          style={{ marginLeft: isMobile ? '0' : '100px', marginRight: isMobile ? '0' : '100px' }}
        >
          {currentPage === 0 ? (
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Single Illustration */}
              <div className="flex justify-center mb-8" style={{ width: '100%', maxWidth: isMobile ? '100%' : '500px' }}>
                <div style={{ width: '100%', maxWidth: isMobile ? '100%' : '600px' }}>
                  <img
                    src="/assets/components/art/landing.png"
                    alt="Sources of inspiration"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </div>
              </div>

              {/* Descriptive Text */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                marginBottom: isMobile ? '24px' : '40px',
                maxWidth: '1200px',
                lineHeight: '1.6',
                padding: '0'
              }}>
                {isMobile ? t('artPage.instruction.intro1') : t('artPage.intro.description')}
              </div>

              {/* Call-to-Action Button */}
              {isMobile ? (
                <button
                  onClick={() => setCurrentPage(1)}
                  style={{
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#51727C',
                    padding: '14px 32px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#406A46';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#51727C';
                  }}
                >
                  {t('artPage.intro.explore')}
                </button>
              ) : (
                <button
                  className="learn-test-button"
                  onClick={() => setCurrentPage(1)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '40px',
                    padding: 0
                  }}
                >
                  <LocalizedImage
                    src="/assets/icons/learnandtest.png"
                    alt={t('common.learnAndTestButton')}
                    style={{
                      height: 'auto',
                      maxWidth: '500px',
                      width: 'auto'
                    }}
                  />
                </button>
              )}

              {/* Download Section - Hidden on mobile */}
              {!isMobile && (
              <div className="flex justify-center" style={{ width: '100%', maxWidth: '1400px', paddingTop: '20px', position: 'relative', marginBottom: '20px', minHeight: '180px' }}>
                {/* Left Download Section */}
                <div className="flex items-center" style={{ gap: '32px', position: 'absolute', right: 'calc(50% + 50px)', alignItems: 'center' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img 
                      src="/assets/icons/edumaterial.png"
                      alt="Access Teaching Materials"
                      style={{ width: '150px', height: '110px' }}
                    />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      marginBottom: '6px'
                    }}>
                      {t('artPage.intro.accessTeachingMaterials')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a
                        href="https://doi.org/10.5281/zenodo.17478185"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: '#51727C',
                          padding: '12px 32px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                      >
                        {t('artPage.intro.openPlatform')}
                      </a>
                    </div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '14px',
                      color: '#406A46',
                      fontStyle: 'italic'
                    }}>
                      {t('artPage.intro.opensNewTab')}
                    </div>
                  </div>
                </div>

                {/* Right Download Section */}
                <div className="flex items-center" style={{ gap: '32px', position: 'absolute', left: 'calc(50% + 50px)', alignItems: 'center' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <img 
                      src="/assets/icons/edurepo.png"
                      alt="Explore Wet-Edu Repository"
                      style={{ width: '120px', height: '120px' }}
                    />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      marginBottom: '6px'
                    }}>
                      {t('artPage.intro.exploreRepository')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <button
                        onClick={handleDashboardLink}
                        style={{
                          fontFamily: 'Comfortaa, sans-serif',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: '#51727C',
                          padding: '12px 32px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                      >
                        {t('artPage.intro.explore')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          ) : (
            <>
              {/* Introduction Text - Only on pages 1 and 2 */}
              {currentPage !== 3 && !isMobile && (
                <div className="text-center mb-8">
                  <p style={{
                    fontSize: '22px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#406A46',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    {t('artPage.instruction.intro1')}
                  </p>
                  
                  <p style={{
                    fontSize: '22px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#9F8B68',
                    lineHeight: '1.6',
                    marginBottom: '30px'
                  }}>
                    {t('artPage.instruction.intro2')}
                  </p>

                  {/* Pointer Icon */}
                  <div className="flex justify-center mb-8">
                    <img 
                      src="/assets/icons/pointer.png" 
                      alt="Pointer" 
                      style={{ width: '70px', height: '70px' }}
                    />
                  </div>

                  {/* Instruction */}
                  <div className="text-center mb-8">
                    <p style={{
                      fontSize: '22px',
                      fontFamily: 'Comfortaa, sans-serif',
                      fontWeight: 'bold',
                      color: '#406A46',
                      lineHeight: '1.6'
                    }}>
                      {t('artPage.instruction.instruction')}
                    </p>
                  </div>
                </div>
              )}

              {/* Mobile: Only show intro2 text */}
              {currentPage !== 3 && isMobile && (
                <div className="text-center mb-8">
                  <p style={{
                    fontSize: '18px',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontWeight: 'bold',
                    color: '#9F8B68',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    padding: '0 12px'
                  }}>
                    {t('artPage.instruction.intro2')}
                  </p>
                </div>
              )}

              {/* Page 3 - Pointer and Instruction */}
              {currentPage === 3 && !isMobile && (
                <div className="text-center mb-8">
                  {/* Pointer Icon */}
                  <div className="flex justify-center mb-8">
                    <img 
                      src="/assets/icons/pointer.png" 
                      alt="Pointer" 
                      style={{ width: '70px', height: '70px' }}
                    />
                  </div>

                  {/* Instruction */}
                  <div className="text-center mb-8">
                    <p style={{
                      fontSize: '22px',
                      fontFamily: 'Comfortaa, sans-serif',
                      fontWeight: 'bold',
                      color: '#406A46',
                      lineHeight: '1.6'
                    }}>
                      {t('artPage.instruction.page3.text1')} <br />
                      {t('artPage.instruction.page3.text2')}
                    </p>
                  </div>
                </div>
              )}

              {/* Interactive Section */}
              <div
                className="bg-white bg-opacity-90 rounded-lg shadow-lg"
                style={{
                  maxWidth: '1200px',
                  margin: isMobile ? '20px auto 0' : '50px auto 0',
                  padding: isMobile ? '16px' : '32px'
                }}
              >

              {/* Puzzle Area */}
              <div className="flex justify-center items-center" style={{
                flexDirection: isMobile ? 'column' : ((currentPage === 1 || currentPage === 2 || currentPage === 3) ? 'row' : 'column'),
                gap: isMobile ? '20px' : (currentPage === 3 ? '20px' : currentPage === 2 ? '120px' : '8px')
              }}>
                {/* Left Elements - Only on page 3, 25% width */}
                {currentPage === 3 && !isMobile && (
              <div className="grid gap-1" style={{ 
                gridTemplateColumns: 'repeat(2, 1fr)',
                width: '25%',
                flexShrink: 0
              }}>
                {getCurrentElements().slice(0, 4).map((element) => {
                  const elementZones = getCurrentOutline().dropZones.filter(zone => zone.accepts.includes(element.id));
                  const filledElementZones = elementZones.filter(zone => placedElements[zone.id] === element.id);
                  const isElementFullyUsed = filledElementZones.length >= elementZones.length;
                  
                  return (
                    <div
                      key={element.id}
                      className={`p-1 rounded-lg transition-all duration-300 ${
                        isElementFullyUsed 
                          ? 'opacity-30 cursor-not-allowed' 
                          : 'cursor-move hover:bg-green-100'
                      }`}
                      draggable={!isElementFullyUsed && !isMobile}
                      onDragStart={(e) => {
                        if (!isElementFullyUsed && !isMobile) {
                          handleDragStart(e, element.id);
                        } else {
                          e.preventDefault();
                        }
                      }}
                      onTouchStart={(e) => handleTouchStart(e, element.id)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      style={{
                        touchAction: 'none', // Prevent default touch behaviors
                        userSelect: 'none'
                      }}
                    >
                      <img 
                        src={element.image} 
                        alt={element.name}
                        className="object-contain"
                        style={{
                          transform: `rotate(${element.rotation}deg)`,
                          transition: 'transform 0.5s ease',
                          width: '100%',
                          height: 'auto',
                          maxWidth: '130px'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Image - 50% width on page 3, fixed width on pages 1 and 2 */}
              <div className="relative" style={{ 
              width: currentPage === 1 ? '354px' : currentPage === 2 ? '506px' : '50%',
              height: 'auto',
              flexShrink: currentPage === 3 ? 0 : undefined
              }}>
              <img 
                src={getCurrentOutline().image} 
                alt={getCurrentOutline().name}
                style={{ 
                  width: currentPage === 1 ? '354px' : currentPage === 2 ? '506px' : '100%', 
                  height: 'auto',
                  display: 'block'
                }}
              />
              
              {/* Drop Zones (invisible but on top) */}
              {getCurrentOutline().dropZones.map((zone) => {
                // Get z-index for drop zone based on what it accepts
                const getDropZoneZIndex = (accepts: string[]) => {
                  const elementId = accepts[0];
                  if (currentPage === 1) {
                    // Heron drop zones
                    switch (elementId) {
                      case 'grass': return 110;
                      case 'branches': return 111;
                      case 'feather': return 112;
                      case 'leaf': return 113;
                      case 'petals': return 114;
                      case 'small_leaves': return 115;
                      case 'snail': return 116;  // Highest z-index for snail drop zone
                      default: return 100;
                    }
                  } else if (currentPage === 2) {
                    // Libelle drop zones
                    switch (elementId) {
                      case 'wings2': return 110;
                      case 'wings': return 111;
                      case 'seed': return 112;
                      case 'branch': return 113;  // Highest z-index for branch drop zone
                      default: return 100;
                    }
                  } else {
                    // Boat drop zones
                    switch (elementId) {
                      case 'leaf': return 110;
                      case 'willow_leaves': return 111;
                      case 'small_branch': return 112;
                      case 'medium_branch': return 113;
                      case 'small_tree_body': return 114;
                      case 'hat': return 115;
                      case 'big_rock': return 116;
                      case 'small_rock': return 117;
                      case 'biggest_rock': return 118;
                      case 'bush': return 119;
                      case 'leaves_water': return 120;
                      case 'big_tree_body': return 121;
                      case 'leaves_water_2': return 122;
                      case 'arm_1': return 123;
                      case 'stick': return 124;
                      case 'grass': return 125;
                      case 'arm_2': return 126;  // Highest z-index for arm_2 drop zone
                      default: return 100;
                    }
                  }
                };
                
                return (
                  <div
                    key={zone.id}
                    className="absolute"
                    style={{
                      left: `${zone.x - zone.width/2}%`,
                      top: `${zone.y - zone.height/2}%`,
                      width: `${zone.width}%`,
                      height: `${zone.height}%`,
                      backgroundColor: showDropZones ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
                      border: showDropZones ? '2px dashed red' : 'none',
                      zIndex: getDropZoneZIndex(zone.accepts),
                      pointerEvents: 'auto'
                    }}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, zone.id)}
                  >
                    {showDropZones && (
                      <div className="text-xs text-red-600 font-bold text-center mt-1">
                        {zone.id}<br />
                        Accepts: {zone.accepts.join(', ')}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Placed Elements (overlay on top of animal) */}
              {getCurrentOutline().dropZones.map((zone) => {
                const element = getCurrentElements().find(el => el.id === placedElements[zone.id]);
                if (!element || !placedElements[zone.id]) return null;
                
                // Define z-index based on element type (from bottom to top)
                const getZIndex = (elementId: string) => {
                  if (currentPage === 1) {
                    // Heron elements
                    switch (elementId) {
                      case 'grass': return 10;        // Bottom layer
                      case 'branches': return 11;
                      case 'leaf': return 12;
                      case 'petals': return 13;
                      case 'feather': return 14;
                      case 'small_leaves': return 15;
                      case 'snail': return 16;        // Top layer
                      default: return 10;
                    }
                  } else if (currentPage === 2) {
                    // Libelle elements
                    switch (elementId) {
                      case 'wings2': return 10;       // Bottom layer
                      case 'wings': return 11;
                      case 'seed': return 12;
                      case 'branch': return 13;       // Top layer
                      default: return 10;
                    }
                  } else {
                    // Boat elements
                    switch (elementId) {
                      case 'leaf': return 10;     // Bottom layer
                      case 'willow_leaves': return 11;
                      case 'small_branch': return 12;
                      case 'medium_branch': return 13;
                      case 'small_tree_body': return 14;
                      case 'hat': return 15;
                      case 'big_rock': return 16;
                      case 'small_rock': return 17;
                      case 'biggest_rock': return 18;
                      case 'bush': return 19;
                      case 'leaves_water': return 20;
                      case 'big_tree_body': return 21;
                      case 'leaves_water_2': return 22;
                      case 'arm_1': return 23;
                      case 'stick': return 24;
                      case 'grass': return 25;
                      case 'arm_2': return 26;     // Top layer
                      default: return 10;
                    }
                  }
                };
                
                return (
                  <img
                    key={`placed-${zone.id}`}
                    src={element.placedImage}
                    alt="Placed element"
                    className="absolute"
                    style={{
                      left: '0%',
                      top: '0%',
                      width: '100%',
                      height: 'auto',
                      zIndex: getZIndex(element.id),
                      pointerEvents: 'none'
                    }}
                  />
                );
              })}
            </div>

            {/* Right Elements - Only on page 3, 25% width */}
            {currentPage === 3 && (
              <div className="grid gap-1" style={{ 
                gridTemplateColumns: 'repeat(1, 1fr)',
                width: '25%',
                flexShrink: 0
              }}>
                {getCurrentElements().slice(4).map((element) => {
                    const elementZones = getCurrentOutline().dropZones.filter(zone => zone.accepts.includes(element.id));
                    const filledElementZones = elementZones.filter(zone => placedElements[zone.id] === element.id);
                    const isElementFullyUsed = filledElementZones.length >= elementZones.length;
                    
                    return (
                      <div
                        key={element.id}
                        className={`p-1 rounded-lg transition-all duration-300 ${
                          isElementFullyUsed 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'cursor-move hover:bg-green-100'
                        }`}
                        draggable={!isElementFullyUsed}
                        onDragStart={(e) => {
                          if (!isElementFullyUsed) {
                            handleDragStart(e, element.id);
                          } else {
                            e.preventDefault();
                          }
                        }}
                      >
                        <img 
                          src={element.image} 
                          alt={element.name}
                          className="object-contain"
                          style={{
                            transform: `rotate(${element.rotation}deg)`,
                            transition: 'transform 0.3s ease',
                            width: '100%',
                            height: 'auto',
                            maxWidth: '150px'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
            )}

            {/* Elements for pages 1 and 2 - Below image */}
            {currentPage !== 3 && (
              <div style={{ 
                width: currentPage === 1 ? '354px' : '506px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end'
              }}>
                {/* Instruction text for page 1 - show before snail is placed */}
                {currentPage === 1 && (() => {
                  const snailZone = getCurrentOutline().dropZones.find(zone => zone.accepts.includes('snail'));
                  const isSnailPlaced = snailZone && placedElements[snailZone.id] === 'snail';
                  
                  if (!isSnailPlaced) {
                    return (
                      <div style={{
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#406A46',
                        textAlign: 'center',
                        marginBottom: '20px',
                        padding: '12px',
                        backgroundColor: 'rgba(97, 192, 157, 0.2)',
                        borderRadius: '8px',
                        width: '100%'
                      }}>
                        {t('artPage.instruction.page3.trySnailFirst')}
                      </div>
                    );
                  }
                  return null;
                })()}
                
                <div className="grid gap-2" style={{ 
                  gridTemplateColumns: currentPage === 1 ? 'repeat(3, 1fr)' : currentPage === 2 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
                  width: 'fit-content'
                }}>
                  {getCurrentElements().map((element) => {
                    const elementZones = getCurrentOutline().dropZones.filter(zone => zone.accepts.includes(element.id));
                    const filledElementZones = elementZones.filter(zone => placedElements[zone.id] === element.id);
                    const isElementFullyUsed = filledElementZones.length >= elementZones.length;
                    
                    // On page 1, hide other elements until snail is placed
                    if (currentPage === 1) {
                      const snailZone = getCurrentOutline().dropZones.find(zone => zone.accepts.includes('snail'));
                      const isSnailPlaced = snailZone && placedElements[snailZone.id] === 'snail';
                      
                      // Show only snail if it's not placed yet, show all if snail is placed
                      if (!isSnailPlaced && element.id !== 'snail') {
                        return null;
                      }
                    }
                    
                    return (
                      <div
                        key={element.id}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          isElementFullyUsed 
                            ? 'opacity-30 cursor-not-allowed' 
                            : 'cursor-move hover:bg-green-100'
                        }`}
                        draggable={!isElementFullyUsed}
                        onDragStart={(e) => {
                          if (!isElementFullyUsed) {
                            handleDragStart(e, element.id);
                          } else {
                            e.preventDefault();
                          }
                        }}
                      >
                        <img 
                          src={element.image} 
                          alt={element.name}
                          className="object-contain"
                          style={{
                            transform: `rotate(${element.rotation}deg)`,
                            transition: 'transform 0.3s ease'
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Pagination and Next Button - Sticky Footer - Outside container for full width */}
      {currentPage > 0 && !isMobile && (
        <div className="relative z-10" style={{ 
          position: 'sticky', 
          bottom: 0,
          left: 0,
          right: 0,
          width: '100vw',
          marginLeft: 'calc((100% - 100vw) / 2)',
          backgroundColor: 'rgba(210, 228, 240, 0.95)',
          paddingTop: '10px',
          paddingBottom: '10px',
          marginBottom: '0px',
          flexShrink: 0
        }}>
          {/* Top Shadow - Full Width */}
          <div style={{
            position: 'absolute',
            top: '-4px',
            left: 0,
            width: '100%',
            height: '6px',
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.06) 50%, transparent 100%)',
            pointerEvents: 'none'
          }} />
          <div className="relative flex justify-between items-center" style={{ maxWidth: '100%', width: '100%', paddingLeft: '100px', paddingRight: '100px' }}>
        {/* Home Button - Left */}
            <div className="flex items-center" style={{ paddingLeft: '16px' }}>
          <HomeButton onClick={onHomeClick} />
        </div>

            {/* Center Section - Download, Pagination, and Next Topic */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center items-center"
              style={{ 
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                transformOrigin: 'center',
                gap: '50px',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Download Button - Only on last page, left of pagination - Hide if not enough space */}
            {currentPage === TOTAL_PAGES && isCompleted && hasEnoughSpace && (
              <button
                onClick={handleDownloadClick}
                className="download-button relative flex items-center justify-center z-50"
                style={{
                  width: 'auto',
                  height: '50px',
                  backgroundColor: 'transparent',
                  border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0
                }}
              >
                <LocalizedImage 
                  src="/assets/icons/download.png" 
                  alt="Download" 
                  style={{ 
                    width: 'auto',
                    height: '50px',
                    opacity: 1
                  }}
                />
              </button>
            )}

              {/* Pagination Dots - Perfectly Centered */}
              <div className="flex justify-center items-center" style={{ gap: '14px', flexShrink: 0 }}>
              {[1, 2, 3].map((page) => (
                <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setPlacedElements({});
                  setIsCompleted(false);
                  setUsedElements(new Set());
                  }}
                  className="transition-all duration-300 p-0 border-0 bg-transparent"
                  aria-label={`Go to page ${page}`}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: '14px',
                      height: '14px',
                      backgroundColor: currentPage === page ? '#51727C' : '#97C09D'
                    }}
                  />
                </button>
            ))}
              </div>

              {/* NEXT TOPIC Text - Only on last page, right of pagination - Hide if not enough space */}
            {currentPage === TOTAL_PAGES && isCompleted && hasEnoughSpace && (
                <div style={{ flexShrink: 0 }}>
                <span style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46'
                }}>
                  {t('artPage.nextTopic')}
                </span>
              </div>
            )}
            </motion.div>

          {/* Retry and Next/Back Home Button - Right */}
            <div className="flex items-center" style={{ paddingRight: '16px', gap: '16px' }}>
              {/* Retry Button - Show when elements are placed */}
              {Object.keys(placedElements).length > 0 && (
                <button
                  onClick={handleRetry}
                  className="retry-button relative flex items-center justify-center z-50"
                  style={{
                    height: '60px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <LocalizedImage 
                    src="/assets/icons/tryagain.png" 
                    alt={t('common.tryAgain')} 
                    style={{ 
                      height: '60px',
                      width: 'auto',
                      opacity: 1,
                      objectFit: 'contain'
                    }}
                  />
                </button>
              )}
              <button
                  onClick={isCompleted ? (currentPage === TOTAL_PAGES ? onPeopleAquaticClick : () => {
                  setCurrentPage(currentPage + 1);
                  setPlacedElements({});
                  setIsCompleted(false);
                  setUsedElements(new Set());
                }) : undefined}
                  className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: 'auto',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                    cursor: isCompleted ? 'pointer' : 'not-allowed'
                }}
              >
                <LocalizedImage 
                  src="/assets/icons/next.png" 
                    alt={currentPage === TOTAL_PAGES ? t('artPage.nextTopic') : 'Next'} 
                  style={{ 
                    width: 'auto',
                      height: '60px',
                      opacity: isCompleted ? 1 : 0.3,
                      transition: 'opacity 0.3s ease'
                  }}
                />
              </button>
            </div>
      </div>
      </div>
      )}

      {/* Mobile Next Button - Centered at bottom */}
      {currentPage > 0 && isMobile && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          paddingBottom: '40px'
        }}>
          <button
            onClick={isCompleted ? (currentPage === TOTAL_PAGES ? onPeopleAquaticClick : () => {
              setCurrentPage(currentPage + 1);
              setPlacedElements({});
              setIsCompleted(false);
              setUsedElements(new Set());
            }) : undefined}
            className="next-button relative flex items-center justify-center z-50"
            style={{
              width: 'auto',
              height: '60px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: isCompleted ? 'pointer' : 'not-allowed'
            }}
          >
            <LocalizedImage 
              src="/assets/icons/next.png" 
              alt={currentPage === TOTAL_PAGES ? t('artPage.nextTopic') : 'Next'} 
              style={{ 
                width: 'auto',
                height: '60px',
                opacity: isCompleted ? 1 : 0.3,
                transition: 'opacity 0.3s ease'
              }}
            />
          </button>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={handleCloseModal}
        >
          <div 
            style={{
              backgroundColor: '#dfebf5',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '600px',
              width: '90%',
              position: 'relative',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '32px',
                cursor: 'pointer',
                color: '#406A46',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>

            {/* Modal Title */}
            <div style={{
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#406A46',
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              {t('artPage.modal.title')}
            </div>

            {/* Option 1: Zenodo */}
            <button
              onClick={handleZenodoLink}
              style={{
                width: '100%',
                backgroundColor: '#97C09D',
                border: 'none',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7FAF85';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#97C09D';
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/assets/icons/protocols.png" 
                  alt="Protocols" 
                  style={{ 
                    width: '70px',
                    height: '90px'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  Access Teaching Materials
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '6px'
                }}>
                  {t('artPage.modal.basedOn5E')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {t('artPage.modal.opensInNewTab')}
                </div>
              </div>
            </button>

            {/* Option 2: Dashboard */}
            <button
              onClick={handleDashboardLink}
              style={{
                width: '100%',
                backgroundColor: '#CE7C0A',
                border: 'none',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B86A08';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#CE7C0A';
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/assets/icons/edurepo.png" 
                  alt={t('artPage.modal.exploreRepository')} 
                  style={{ 
                    width: '50px',
                    height: '50px'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  {t('artPage.modal.exploreRepository')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {t('artPage.modal.exploreRelated')}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
