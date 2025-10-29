import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HomeButton } from '../HomeButton';

interface ArtPageProps {
  onHomeClick: () => void;
  onPeopleAquaticClick?: () => void;
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
    rotation: -25 
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
// @ts-ignore - Unused, kept for reference
const _boatElementsUnused = [
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
];

// Removed: animalsElements (page 4 removed)
// @ts-ignore - Unused, kept for reference
const _animalsElementsUnused = [
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
];

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
    { id: 'heron-zone3', x: 60, y: 10, width: 20, height: 25, accepts: ['petals'] },
    { id: 'heron-zone4', x: 30, y: 35, width: 60, height: 30, accepts: ['leaf'] },
    { id: 'heron-zone5', x: 50, y: 35, width: 35, height: 20, accepts: ['small_leaves'] },
    { id: 'heron-zone6', x: 40, y: 8, width: 25, height: 20, accepts: ['grass'] },
    { id: 'heron-zone7', x: 45, y: 70, width: 40, height: 40, accepts: ['branches'] }
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
// @ts-ignore - Unused, kept for reference
const _boatOutlineUnused = {
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
};

// Removed: animalsOutline (page 4 removed)
// @ts-ignore - Unused, kept for reference
const _animalsOutlineUnused = {
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
};

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

export const ArtPage: React.FC<ArtPageProps> = ({ onHomeClick, onPeopleAquaticClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [placedElements, setPlacedElements] = useState<{[key: string]: string}>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [usedElements, setUsedElements] = useState<Set<string>>(new Set());
  const [showDropZones] = useState(false);
  
  // Dropzones are hidden by default

  const TOTAL_PAGES = 3;

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
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropZoneId: string) => {
    e.preventDefault();
    
    if (!draggedElement) return;

    console.log(`Dropped ${draggedElement} in zone ${dropZoneId}`);

    const element = getCurrentElements().find(el => el.id === draggedElement);
    const dropZone = getCurrentOutline().dropZones.find(zone => zone.id === dropZoneId);

    console.log('Element:', element);
    console.log('Drop Zone:', dropZone);
    console.log('Accepts:', dropZone?.accepts);
    console.log('Element ID:', element?.id);
    console.log('Accepts includes element?', dropZone?.accepts.includes(element?.id || ''));

    if (element && dropZone && dropZone.accepts.includes(element.id)) {
      console.log('✓ Drop accepted!');
      const newPlacedElements = { ...placedElements, [dropZoneId]: draggedElement };
      
      setPlacedElements(newPlacedElements);

      // Only mark element as used if it doesn't have multiple drop zones
      // OR if all zones for this element are now filled
      if (!('multipleDropZones' in element && (element as { multipleDropZones?: boolean }).multipleDropZones)) {
        setUsedElements(prev => new Set([...prev, draggedElement]));
      } else {
        // Check if all zones for this element are filled
        const elementZones = getCurrentOutline().dropZones.filter(zone => zone.accepts.includes(element.id));
        const filledElementZones = elementZones.filter(zone => newPlacedElements[zone.id] === element.id);
        
        // Mark as used only if all zones for this element are filled
        if (filledElementZones.length >= elementZones.length) {
          setUsedElements(prev => new Set([...prev, draggedElement]));
        }
      }

      // Check if all drop zones are filled
      const allDropZones = getCurrentOutline().dropZones;
      const filledZones = Object.keys(newPlacedElements).length;
      
      console.log(`Filled zones: ${filledZones} / ${allDropZones.length}`);
      
      if (filledZones >= allDropZones.length) {
        setIsCompleted(true);
      }
    } else {
      console.log('✗ Drop rejected!');
    }

    setDraggedElement(null);
  };

  // Removed: resetPuzzle unused

  return (
    <div className="min-h-screen relative" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#dfebf5'
    }}>
      {/* Header with title and home button */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '50px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4" style={{ marginLeft: '100px', marginRight: '100px' }}>
            {/* Header with Title */}
            <div className="relative">
              {/* Title and Subtitle - Centered */}
              <div className="text-center">
                {/* Title */}
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  Floodplains as sources of inspiration
                </motion.h1>
                
                {/* Subtitle */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-4 pb-8" style={{ paddingBottom: '32px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
          style={{ marginLeft: '100px', marginRight: '100px' }}
        >

          {/* Introduction Text - Only on pages 1 and 2 */}
          {currentPage !== 3 && (
            <div className="text-center mb-8">
              <p style={{
                fontSize: '22px',
                fontFamily: 'Comfortaa, sans-serif',
                fontWeight: 'bold',
                color: '#406A46',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Rivers and their floodplains are home to numerous animals and plants, and they are also living landscapes full of stories that have inspired people for centuries. From weaving baskets with willow branches to creating songs, legends, and drawings, floodplains connect nature with culture.
              </p>
              
              <p style={{
                fontSize: '22px',
                fontFamily: 'Comfortaa, sans-serif',
                fontWeight: 'bold',
                color: '#9F8B68',
                lineHeight: '1.6',
                marginBottom: '30px'
              }}>
                Now it's your turn - have fun using natural elements to create your own pictures and stories.<br />By the river, let its colors, shapes, and sounds inspire you discover the joy of shaping your own story from the floodplain.
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
                  Imagine you are out in nature, collecting leaves, branches, or feathers to create your own characters.<br />Could you help these outlines come to life? Drag and drop the natural elements into the shapes until they are filled with form and color.
                </p>
              </div>
            </div>
          )}

          {/* Page 3 - Pointer and Instruction */}
          {currentPage === 3 && (
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
                  Some parts of the landscape are missing. <br />
                  Drag and drop the figures you created into the right places to complete the floodplain scene.
                </p>
              </div>
            </div>
          )}

          {/* Interactive Section */}
          <div
            className="bg-white bg-opacity-90 rounded-lg p-8 shadow-lg"
            style={{
              maxWidth: '1200px',
              margin: '50px auto 0'
            }}
          >

          {/* Puzzle Area */}
          <div className="flex justify-center items-center gap-8" style={{
            flexDirection: (currentPage === 1 || currentPage === 2 || currentPage === 3) ? 'row' : 'column',
            gap: currentPage === 3 ? '20px' : currentPage === 2 ? '120px' : '8px'
          }}>
            {/* Left Elements - Only on page 3, 25% width */}
            {currentPage === 3 && (
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
                      width: currentPage === 1 ? '354px' : currentPage === 2 ? '506px' : '100%',
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
                justifyContent: 'flex-end'
              }}>
                <div className="grid gap-2" style={{ 
                  gridTemplateColumns: currentPage === 1 ? 'repeat(3, 1fr)' : currentPage === 2 ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
                  width: 'fit-content'
                }}>
                  {getCurrentElements().map((element) => {
                    const elementZones = getCurrentOutline().dropZones.filter(zone => zone.accepts.includes(element.id));
                    const filledElementZones = elementZones.filter(zone => placedElements[zone.id] === element.id);
                    const isElementFullyUsed = filledElementZones.length >= elementZones.length;
                    
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
        </motion.div>
      </div>

      {/* Footer - Sticky Footer */}
      <div className="relative z-10" style={{ 
        position: 'sticky', 
        bottom: 0, 
        backgroundColor: 'rgba(223, 235, 245, 0.95)',
        paddingTop: '20px',
        paddingBottom: '20px',
        flexShrink: 0,
        paddingLeft: '100px',
        paddingRight: '100px'
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="relative flex justify-between items-center px-4">
          {/* Home Button - Left */}
          <div className="flex items-center">
            <HomeButton onClick={onHomeClick} />
          </div>

          {/* Center Section - Pagination and Download Button */}
          <div className="flex items-center justify-center" style={{ position: 'relative' }}>
            {/* Download Button - Only on last page, 50px left of pagination */}
            {currentPage === TOTAL_PAGES && isCompleted && (
              <button
                className="download-button relative flex items-center justify-center z-50"
                style={{
                  width: '480px',
                  height: '50px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  marginRight: '50px'
                }}
              >
                <img 
                  src="/assets/icons/download.png" 
                  alt="Download" 
                  style={{ 
                    width: '480px',
                    height: '50px',
                    opacity: 1
                  }}
                />
              </button>
            )}

            {/* Pagination Dots - Centered */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex justify-center items-center"
              style={{ gap: '14px' }}
            >
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
            </motion.div>

            {/* NEXT TOPIC Text - Only on last page, 50px right of pagination */}
            {currentPage === TOTAL_PAGES && isCompleted && (
              <div style={{ marginLeft: '50px' }}>
                <span style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: '#406A46'
                }}>
                  NEXT TOPIC: People and aquatic ecosystems
                </span>
              </div>
            )}
          </div>

          {/* Next/Back Home Button - Right */}
          <div className="flex items-center">
            <button
              onClick={isCompleted ? (currentPage === TOTAL_PAGES ? onPeopleAquaticClick : () => {
                setCurrentPage(currentPage + 1);
                setPlacedElements({});
                setIsCompleted(false);
                setUsedElements(new Set());
              }) : undefined}
              className="next-button relative flex items-center justify-center z-50"
              style={{
                width: '158px',
                height: '60px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: isCompleted ? 'pointer' : 'not-allowed'
              }}
            >
              <img 
                src="/assets/icons/next.png" 
                alt={currentPage === TOTAL_PAGES ? 'People and aquatic ecosystems' : 'Next'} 
                style={{ 
                  width: '158px',
                  height: '60px',
                  opacity: isCompleted ? 1 : 0.3,
                  transition: 'opacity 0.3s ease'
                }}
              />
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
