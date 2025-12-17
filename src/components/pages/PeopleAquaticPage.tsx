import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePageRouting } from '../../hooks/usePageRouting';
import { LocalizedImage } from '../LocalizedImage';

interface PeopleAquaticPageProps {
  onHomeClick: () => void;
}

const TOTAL_PAGES = 4;

// Function to get the correct image path for each page
const getImagePath = (page: number) => {
  if (page === 1) {
    return `/assets/components/people/page1.png`;
  } else if (page === 2) {
    return `/assets/components/people/page2.png`;
  } else if (page === 3) {
    return `/assets/components/people/page3.png`;
  }
  // Page 4 will be quiz/interactive content
  return `/assets/components/People.png`;
};

export const PeopleAquaticPage: React.FC<PeopleAquaticPageProps> = ({
  onHomeClick
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = usePageRouting(TOTAL_PAGES);
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [droppedItems, setDroppedItems] = React.useState<Record<string, {x: number, y: number}>>({});
  const [restorationDroppedItems, setRestorationDroppedItems] = React.useState<Record<string, {x: number, y: number}>>({});
  const [droppedItemZones, setDroppedItemZones] = React.useState<Record<string, string>>({});
  const [restorationDroppedItemZones, setRestorationDroppedItemZones] = React.useState<Record<string, string>>({});
  const [_initialDropPositions, setInitialDropPositions] = React.useState<Record<string, {x: number, y: number}>>({});
  const [_restorationInitialDropPositions, setRestorationInitialDropPositions] = React.useState<Record<string, {x: number, y: number}>>({});
  const [animatingItems, setAnimatingItems] = React.useState<Set<string>>(new Set());
  const [randomizedLabels, setRandomizedLabels] = React.useState<typeof pressureLabels>([]);
  const [randomizedRestoration, setRandomizedRestoration] = React.useState<typeof restorationMeasures>([]);
  const [showValidation, setShowValidation] = React.useState(false);
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, string>>({});
  const [showDownloadModal, setShowDownloadModal] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [editMode] = React.useState(false);
  const [_customDropZones, setCustomDropZones] = React.useState<typeof dropZones | null>(null);
  const [_customRestorationDropZones, setCustomRestorationDropZones] = React.useState<typeof restorationDropZones | null>(null);
  const [positionCode, setPositionCode] = React.useState('');
  const [showCodeModal, setShowCodeModal] = React.useState(false);
  const [showRawJson, setShowRawJson] = React.useState(false);

  // Track window width for responsive navbar
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate if there's enough space for download and next topic buttons
  // Home button (54px) + padding (116px) + Download (480px) + gaps (100px) + Pagination (~70px) + NEXT TOPIC (~350px) + Next button (158px) + padding (116px) = ~1448px minimum
  const hasEnoughSpace = windowWidth >= 1400;

  // Drag and Drop items for Activity 1
  const pressureLabels = [
    {
      id: 'cutting-meanders',
      label: t('peopleAquaticPage.pressureLabels.cutting-meanders.label'),
      description: t('peopleAquaticPage.pressureLabels.cutting-meanders.description')
    },
    {
      id: 'building-dikes',
      label: t('peopleAquaticPage.pressureLabels.building-dikes.label'),
      description: t('peopleAquaticPage.pressureLabels.building-dikes.description')
    },
    {
      id: 'channellizing-rivers',
      label: t('peopleAquaticPage.pressureLabels.channellizing-rivers.label'), 
      description: t('peopleAquaticPage.pressureLabels.channellizing-rivers.description')
    },
    {
      id: 'draining-floodplains',
      label: t('peopleAquaticPage.pressureLabels.draining-floodplains.label'),
      description: t('peopleAquaticPage.pressureLabels.draining-floodplains.description')
    },
    {
      id: 'urbanization',
      label: t('peopleAquaticPage.pressureLabels.urbanization.label'), 
      description: t('peopleAquaticPage.pressureLabels.urbanization.description')
    },
    {
      id: 'agriculture-pesticides',
      label: t('peopleAquaticPage.pressureLabels.agriculture-pesticides.label'),
      description: t('peopleAquaticPage.pressureLabels.agriculture-pesticides.description')
    },
    {
      id: 'cutting-forests',
      label: t('peopleAquaticPage.pressureLabels.cutting-forests.label'),
      description: t('peopleAquaticPage.pressureLabels.cutting-forests.description')
    },
    {
      id: 'industrialization',
      label: t('peopleAquaticPage.pressureLabels.industrialization.label'),
      description: t('peopleAquaticPage.pressureLabels.industrialization.description')
    },
    {
      id: 'dams-hydroelectric',
      label: t('peopleAquaticPage.pressureLabels.dams-hydroelectric.label'),
      description: t('peopleAquaticPage.pressureLabels.dams-hydroelectric.description')
    },
    {
      id: 'invasive-species',
      label: t('peopleAquaticPage.pressureLabels.invasive-species.label'),
      description: t('peopleAquaticPage.pressureLabels.invasive-species.description')
    },
    {
      id: 'navigation',
      label: t('peopleAquaticPage.pressureLabels.navigation.label'),
      description: t('peopleAquaticPage.pressureLabels.navigation.description')
    },
    {
      id: 'climate-change',
      label: t('peopleAquaticPage.pressureLabels.climate-change.label'),
      description: t('peopleAquaticPage.pressureLabels.climate-change.description')
    }
  ];

  // Restoration measures for Activity 2 (Page 3)
  const restorationMeasures = [
    {
      id: 'restoration-sidearms',
      label: t('peopleAquaticPage.restorationMeasures.restoration-sidearms.label'),
      description: t('peopleAquaticPage.restorationMeasures.restoration-sidearms.description')
    },
    {
      id: 'dike-relocation',
      label: t('peopleAquaticPage.restorationMeasures.dike-relocation.label'),
      description: t('peopleAquaticPage.restorationMeasures.dike-relocation.description')
    },
    {
      id: 'buffer-strips',
      label: t('peopleAquaticPage.restorationMeasures.buffer-strips.label'),
      description: t('peopleAquaticPage.restorationMeasures.buffer-strips.description')
    },
    {
      id: 'fish-ramps',
      label: t('peopleAquaticPage.restorationMeasures.fish-ramps.label'),
      description: t('peopleAquaticPage.restorationMeasures.fish-ramps.description')
    },
    {
      id: 'bypass-channels',
      label: t('peopleAquaticPage.restorationMeasures.bypass-channels.label'),
      description: t('peopleAquaticPage.restorationMeasures.bypass-channels.description')
    },
    {
      id: 'native-species',
      label: t('peopleAquaticPage.restorationMeasures.native-species.label'),
      description: t('peopleAquaticPage.restorationMeasures.native-species.description')
    }
  ];

  // Default label positions for page 2 (Activity 1) - optimized for new dropzone positions
  // These positions define where labels appear when placed on dropzones
  // Labels are positioned relative to their dropzones (above, below, left, right, or centered)
  const labelPositionsPage2: Record<string, { x: number, y: number }> = {
    // Zone 1: cutting-meanders - BELOW the dropzone
    'cutting-meanders': { x: 14.49 + 9.82/2, y: 15.60 + 19.23 + 2 },
    // Zone 2: building-dikes - ABOVE the dropzone
    'building-dikes': { x: 24.78 + 9.89/2, y: 6.83 - 2 },
    // Zone 3: channellizing-rivers - ABOVE the dropzone
    'channellizing-rivers': { x: 37.08 + 17.00/2, y: 14.72 - 2 },
    // Zone 4: draining-floodplains - LEFT of the dropzone
    'draining-floodplains': { x: 38.76 - 2, y: 39.30 + 17.82/2 },
    // Zone 5: urbanization - RIGHT of the dropzone
    'urbanization': { x: 50.44 + 8.29 + 2, y: 36.30 + 13.17/2 },
    // Zone 6: agriculture-pesticides - BELOW the dropzone
    'agriculture-pesticides': { x: 44 + 13.46/2, y: 62 + 17.64 + 2 },
    // Zone 7: cutting-forests - RIGHT of the dropzone
    'cutting-forests': { x: 73.48 + 8.66 + 2, y: 71.57 + 12.58/2 },
    // Zone 8: industrialization - RIGHT of the dropzone
    'industrialization': { x: 55.95 + 8 + 2, y: 49.18 + 11.23/2 },
    // Zone 9: dams-hydroelectric - BELOW the dropzone
    'dams-hydroelectric': { x: 60 + 10.26/2, y: 65.48 + 18.52 + 2 },
    // Zone 10: invasive-species - BELOW the dropzone
    'invasive-species': { x: 73.38 + 9.46/2, y: 47.48 + 11.88 + 2 },
    // Zone 11: navigation - BELOW the dropzone
    'navigation': { x: 77.93 + 8/2, y: 32.13 + 9.94 + 2 },
    // Zone 12: climate-change - ABOVE the dropzone
    'climate-change': { x: 86 + 8/2, y: 12.25 - 2 }
  };

  // Drop zones for page 2 (Activity 1) - Optimized positions
  const dropZones = [
    { id: 'zone1', x: 14.489947580515329, y: 15.59712111140132, width: 9.821615783873826, height: 19.231679547904548, correctAnswer: 'cutting-meanders' },
    { id: 'zone2', x: 24.78140610593514, y: 6.833921299774424, width: 9.894480415228779, height: 18.70271960441648, correctAnswer: 'building-dikes' },
    { id: 'zone3', x: 37.07786002127946, y: 14.723202166290708, width: 16.99500461007549, height: 21.75295853068978, correctAnswer: 'channellizing-rivers' },
    { id: 'zone4', x: 38.761301266965795, y: 39.29728039558352, width: 10.477397466068403, height: 17.818559378368754, correctAnswer: 'draining-floodplains' },
    { id: 'zone5', x: 50.43718778812972, y: 36.302401036052075, width: 8.291458525419813, height: 13.173759660928411, correctAnswer: 'urbanization' },
    { id: 'zone6', x: 44, y: 62, width: 13.457292627099061, height: 17.644799717440343, correctAnswer: 'agriculture-pesticides' },
    { id: 'zone7', x: 73.47752074533972, y: 71.57407822929281, width: 8.655781682194577, height: 12.584319510229928, correctAnswer: 'cutting-forests' },
    { id: 'zone8', x: 55.94724020761439, y: 49.181440621631246, width: 8, height: 11.234239868138827, correctAnswer: 'industrialization' },
    { id: 'zone9', x: 60, y: 65.47616069698049, width: 10.258803572003544, height: 18.52383930301951, correctAnswer: 'dams-hydroelectric' },
    { id: 'zone10', x: 73.3844279957441, y: 47.48128133744905, width: 9.457292627099061, height: 11.87903958557917, correctAnswer: 'invasive-species' },
    { id: 'zone11', x: 77.92713536864505, y: 32.12608105488938, width: 8, height: 9.939519792789584, correctAnswer: 'navigation' },
    { id: 'zone12', x: 86, y: 12.247041469310219, width: 8, height: 20.171199340694134, correctAnswer: 'climate-change' }
  ];

  // Default label positions for page 3 (Activity 2) - can be customized
  // These positions define where labels appear when placed on dropzones
  // To adjust label positions, modify the x and y values (in percentages)
  // Example: 'restoration-sidearms': { x: 16, y: 8 } means 16% from left, 8% from top
  const labelPositionsPage3: Record<string, { x: number, y: number }> = {
    'restoration-sidearms': { x: 16, y: 8 },
    'dike-relocation': { x: 23, y: 75 },
    'buffer-strips': { x: 63, y: 10 },
    'fish-ramps': { x: 70, y: 44 },
    'bypass-channels': { x: 50, y: 95 },
    'native-species': { x: 75, y: 95 }
  };

  // Drop zones for page 3 (Activity 2)
  const restorationDropZones = [
    { id: 'restore-zone1', x: 16, y: 8, width: 20, height: 22, correctAnswer: 'restoration-sidearms' },
    { id: 'restore-zone2', x: 41, y: 10, width: 25, height: 30, correctAnswer: 'buffer-strips' },
    { id: 'restore-zone3', x: 40, y: 70, width: 22, height: 20, correctAnswer: 'bypass-channels' },
    { id: 'restore-zone4', x: 13, y: 45, width: 32, height: 24, correctAnswer: 'dike-relocation' },
    { id: 'restore-zone5', x: 52, y: 40, width: 16, height: 25, correctAnswer: 'fish-ramps' },
    { id: 'restore-zone6', x: 70, y: 75, width: 12, height: 25, correctAnswer: 'native-species' }
  ];

  // Quiz data for Activity 3
  const quizData = {
    column1: {
      options: [
        { id: 'A', text: t('peopleAquaticPage.activity3.column1.options.A') },
        { id: 'B', text: t('peopleAquaticPage.activity3.column1.options.B') },
        { id: 'C', text: t('peopleAquaticPage.activity3.column1.options.C') }
      ],
      correct: 'C'
    },
    column2: {
      options: [
        { id: 'A', text: t('peopleAquaticPage.activity3.column2.options.A') },
        { id: 'B', text: t('peopleAquaticPage.activity3.column2.options.B') },
        { id: 'C', text: t('peopleAquaticPage.activity3.column2.options.C') }
      ],
      correct: 'B'
    },
    column3: {
      options: [
        { id: 'A', text: t('peopleAquaticPage.activity3.column3.options.A') },
        { id: 'B', text: t('peopleAquaticPage.activity3.column3.options.B') },
        { id: 'C', text: t('peopleAquaticPage.activity3.column3.options.C') }
      ],
      correct: 'A'
    }
  };

  // Quiz handler
  const handleQuizAnswer = (column: string, answerId: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [column]: answerId
    }));
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Create a custom drag image (just the button element itself, no children)
    const dragElement = e.currentTarget as HTMLElement;
    const clone = dragElement.cloneNode(true) as HTMLElement;
    
    // Remove tooltip from clone
    const tooltip = clone.querySelector('.absolute.z-50');
    if (tooltip) {
      tooltip.remove();
    }
    
    // Style the clone for dragging
    clone.style.position = 'absolute';
    clone.style.top = '-1000px';
    clone.style.left = '-1000px';
    clone.style.width = dragElement.offsetWidth + 'px';
    clone.style.pointerEvents = 'none';
    
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, dragElement.offsetWidth / 2, dragElement.offsetHeight / 2);
    
    // Remove clone after drag starts
    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop on a dropzone
  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedItem || showValidation || editMode) return;
    
      if (currentPage === 2) {
      const zone = currentDropZones.find(z => z.id === zoneId);
      if (zone) {
        // Remove any existing item from this zone before adding new one
        const newDroppedItems = { ...droppedItems };
        const newDroppedItemZones = { ...droppedItemZones };
        
        // Find and remove any item that was in this zone
        Object.keys(newDroppedItems).forEach(key => {
          if (newDroppedItemZones[key] === zoneId) {
            delete newDroppedItems[key];
            delete newDroppedItemZones[key];
          }
        });
        
        // Place label at dropzone position - use the position associated with the dropzone's correctAnswer
        // This ensures labels go to the position of the dropzone they're dropped on, not their own position
        const position = labelPositionsPage2[zone.correctAnswer] || { x: zone.x, y: zone.y };
        newDroppedItems[draggedItem] = position;
        newDroppedItemZones[draggedItem] = zoneId;
        setDroppedItems(newDroppedItems);
        setDroppedItemZones(newDroppedItemZones);
      }
      } else if (currentPage === 3) {
      const zone = currentRestorationDropZones.find(z => z.id === zoneId);
      if (zone) {
        // Remove any existing item from this zone before adding new one
        const newDroppedItems = { ...restorationDroppedItems };
        const newDroppedItemZones = { ...restorationDroppedItemZones };
        
        // Find and remove any item that was in this zone
        Object.keys(newDroppedItems).forEach(key => {
          if (newDroppedItemZones[key] === zoneId) {
            delete newDroppedItems[key];
            delete newDroppedItemZones[key];
          }
        });
        
        // Place label at dropzone position - use the position associated with the dropzone's correctAnswer
        // This ensures labels go to the position of the dropzone they're dropped on, not their own position
        const position = labelPositionsPage3[zone.correctAnswer] || { x: zone.x, y: zone.y };
        newDroppedItems[draggedItem] = position;
        newDroppedItemZones[draggedItem] = zoneId;
        setRestorationDroppedItems(newDroppedItems);
        setRestorationDroppedItemZones(newDroppedItemZones);
      }
    }
    setDraggedItem(null);
  };

  // Download modal handlers
  const handleDownloadClick = () => {
    setShowDownloadModal(true);
  };

  const handleCloseModal = () => {
    setShowDownloadModal(false);
  };

  const handleZenodoLink = () => {
    window.open('https://doi.org/10.5281/zenodo.17477840', '_blank');
    setShowDownloadModal(false);
  };

  const handleDashboardLink = () => {
    setShowDownloadModal(false);
    // TODO: Navigate to repository
  };

  // Use the optimized dropzones (always use fixed positions, ignore custom)
  const currentDropZones = dropZones;
  const currentRestorationDropZones = restorationDropZones;

  // Export current dropzone positions as code
  const exportDropZonePositions = () => {
    const data = {
      page2: dropZones.map(zone => ({
        id: zone.id,
        x: zone.x,
        y: zone.y,
        width: zone.width,
        height: zone.height,
        correctAnswer: zone.correctAnswer
      })),
      page3: restorationDropZones.map(zone => ({
        id: zone.id,
        x: zone.x,
        y: zone.y,
        width: zone.width,
        height: zone.height,
        correctAnswer: zone.correctAnswer
      }))
    };

    let code: string;
    if (showRawJson) {
      code = JSON.stringify(data, null, 2);
    } else {
      code = btoa(JSON.stringify(data, null, 2));
    }

    setPositionCode(code);
    setShowCodeModal(true);
    // Copy to clipboard
    navigator.clipboard.writeText(code).catch(() => {});
  };

  // Import dropzone positions from code
  const importDropZonePositions = () => {
    try {
      let data;

      // Try to parse as raw JSON first
      try {
        data = JSON.parse(positionCode);
      } catch {
        // If that fails, try to decode as base64
        data = JSON.parse(atob(positionCode));
      }

      if (data.page2) {
        setCustomDropZones(data.page2);
      }
      if (data.page3) {
        setCustomRestorationDropZones(data.page3);
      }
      setShowCodeModal(false);
      setPositionCode('');
      alert('Dropzone posities zijn geïmporteerd!');
    } catch {
      alert('Ongeldige code. Controleer de code en probeer opnieuw.');
    }
  };

  // Handle dropzone drag in edit mode (disabled - dropzones are fixed)
  const handleDropZoneDrag = (_e: React.MouseEvent, _zoneId: string, _page: number) => {
    // Note: Dropzones are now fixed to optimized positions, drag functionality disabled
  };

  // Handle dropzone resize in edit mode (disabled - dropzones are fixed)
  const handleDropZoneResize = (_e: React.MouseEvent, _zoneId: string, _page: number, _corner: 'se' | 'sw' | 'ne' | 'nw') => {
    // Note: Dropzones are now fixed to optimized positions, resize functionality disabled
  };

  // Remove a dropped item (return it to the list)
  const handleRemoveDroppedItem = (itemId: string) => {
    if (currentPage === 2) {
      setDroppedItems(prev => {
        const newItems = { ...prev };
        delete newItems[itemId];
        return newItems;
      });
      setDroppedItemZones(prev => {
        const newItems = { ...prev };
        delete newItems[itemId];
        return newItems;
      });
      setInitialDropPositions(prev => {
        const newItems = { ...prev };
        delete newItems[itemId];
        return newItems;
      });
      setAnimatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    } else if (currentPage === 3) {
      setRestorationDroppedItems(prev => {
        const newItems = { ...prev };
        delete newItems[itemId];
        return newItems;
      });
      setRestorationDroppedItemZones(prev => {
        const newItems = { ...prev };
        delete newItems[itemId];
        return newItems;
      });
      setRestorationInitialDropPositions(prev => {
        const newItems = { ...prev };
        delete newItems[itemId];
        return newItems;
      });
      setAnimatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
    setShowValidation(false); // Reset validation when removing
  };

  // Check if an item is correctly placed
  const isItemCorrect = (itemId: string): boolean => {
    if (currentPage === 2) {
      const zoneId = droppedItemZones[itemId];
      if (!zoneId) return false;
      
      // Find the dropzone where this label is placed
      const zone = currentDropZones.find(z => z.id === zoneId);
      
      // Check if the dropzone's correctAnswer matches this label
      return zone?.correctAnswer === itemId;
    } else if (currentPage === 3) {
      const zoneId = restorationDroppedItemZones[itemId];
      if (!zoneId) return false;
      
      // Find the dropzone where this label is placed
      const zone = currentRestorationDropZones.find(z => z.id === zoneId);
      
      // Check if the dropzone's correctAnswer matches this label
      return zone?.correctAnswer === itemId;
    }
    return false;
  };


  // Check if all items are placed
  const allItemsPlaced = currentPage === 2 
    ? Object.keys(droppedItems).length === pressureLabels.length
    : currentPage === 3
    ? Object.keys(restorationDroppedItems).length === restorationMeasures.length
    : false;
  
  // Count correct and incorrect
  const currentDroppedItems = currentPage === 2 ? droppedItems : restorationDroppedItems;
  const correctCount = Object.keys(currentDroppedItems).filter(itemId => isItemCorrect(itemId)).length;
  const incorrectCount = Object.keys(currentDroppedItems).length - correctCount;

  // Retry function to reset activity
  const handleRetry = () => {
    if (currentPage === 2) {
      setDroppedItems({});
      setDroppedItemZones({});
      setInitialDropPositions({});
      setShowValidation(false);
      setAnimatingItems(new Set());
      // Re-randomize labels
      const shuffled = [...pressureLabels];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setRandomizedLabels(shuffled);
    } else if (currentPage === 3) {
      setRestorationDroppedItems({});
      setRestorationDroppedItemZones({});
      setRestorationInitialDropPositions({});
      setShowValidation(false);
      setAnimatingItems(new Set());
      // Re-randomize restoration measures
      const shuffled = [...restorationMeasures];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setRandomizedRestoration(shuffled);
    }
  };

  // Randomize labels when entering page 2
  React.useEffect(() => {
    if (currentPage === 2 && randomizedLabels.length === 0) {
      // Fisher-Yates shuffle algorithm
      const shuffled = [...pressureLabels];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setRandomizedLabels(shuffled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Randomize restoration measures when entering page 3
  React.useEffect(() => {
    if (currentPage === 3 && randomizedRestoration.length === 0) {
      // Fisher-Yates shuffle algorithm
      const shuffled = [...restorationMeasures];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setRandomizedRestoration(shuffled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Show validation when all items are placed
  React.useEffect(() => {
    if ((currentPage === 2 || currentPage === 3) && allItemsPlaced && !showValidation) {
      setShowValidation(true);
    }
  }, [allItemsPlaced, showValidation, currentPage]);

  // Reset validation when leaving page 2 or 3, or when switching between them
  React.useEffect(() => {
    setShowValidation(false);
    setAnimatingItems(new Set());
    if (currentPage !== 2) {
      setInitialDropPositions({});
      setDroppedItemZones({});
    }
    if (currentPage !== 3) {
      setRestorationInitialDropPositions({});
      setRestorationDroppedItemZones({});
    }
  }, [currentPage]);


  // Set page background
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Ensure html and body take full height
    html.style.minHeight = "100vh";
    html.style.height = "auto";
    body.style.minHeight = "100vh";
    body.style.height = "auto";
    
    // Set solid background color
    body.style.backgroundColor = "#dfebf5";
    
    return () => {
      html.style.minHeight = "";
      html.style.height = "";
      body.style.minHeight = "";
      body.style.height = "";
      body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="relative w-full page-container" style={{ backgroundColor: '#dfebf5', overflowX: 'visible', paddingBottom: '0px' }}>
      {/* Header with title and home button */}
      <div className="relative z-50" style={{ flexShrink: 0 }}>
        <div className="flex items-start justify-center" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="w-full max-w-6xl px-4">
            <div className="relative">
              {/* Main Title */}
              <div className="text-center">
                <motion.h1 
                  key={currentPage}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="main-title mb-2"
                >
                  {t('peopleAquaticPage.title')}
                </motion.h1>
                
                {/* Subtitle - Only show for pages 1-3 */}
                {currentPage > 0 && currentPage < 4 && (
                  <motion.h2
                    key={`subtitle-${currentPage}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ 
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '36px', 
                      fontWeight: 'bold', 
                      color: '#406A46',
                      textAlign: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    {currentPage === 1 && t('peopleAquaticPage.subtitle.page1')}
                    {currentPage === 2 && t('peopleAquaticPage.subtitle.page2')}
                    {currentPage === 3 && t('peopleAquaticPage.subtitle.page3')}
                  </motion.h2>
                )}
                
                {/* Activity 1 description - Only for page 2 */}
                {currentPage === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      lineHeight: '1.4',
                      textAlign: 'center',
                      marginTop: '20px',
                      marginBottom: '10px',
                      width: '100%',
                      padding: '0 20px'
                    }}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <img 
                        src="/assets/icons/pointer.png" 
                        alt="Pointer" 
                        style={{ 
                          width: '57px', 
                          height: '57px',
                          marginRight: '16px'
                        }}
                      />
                      <h3 style={{ 
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '48px', 
                        fontWeight: 'bold', 
                        color: '#406A46',
                        margin: 0,
                        lineHeight: '1.1'
                      }}>
                        {t('peopleAquaticPage.activity1.title')}
                      </h3>
                    </div>
                    <div>
                      {t('peopleAquaticPage.activity1.description')}
                      <br /><br />
                      {t('peopleAquaticPage.activity1.question')}
                    </div>
                  </motion.div>
                )}
                
                {/* Activity 2 description - Only for page 3 */}
                {currentPage === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      lineHeight: '1.4',
                      textAlign: 'center',
                      marginTop: '20px',
                      marginBottom: '10px',
                      width: '100%',
                      padding: '0 20px'
                    }}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <img 
                        src="/assets/icons/pointer.png" 
                        alt="Pointer" 
                        style={{ 
                          width: '57px', 
                          height: '57px',
                          marginRight: '16px'
                        }}
                      />
                      <h3 style={{ 
                        fontFamily: 'Comfortaa, sans-serif',
                        fontSize: '48px', 
                        fontWeight: 'bold', 
                        color: '#406A46',
                        margin: 0,
                        lineHeight: '1.1'
                      }}>
                        {t('peopleAquaticPage.activity2.title')}
                      </h3>
                    </div>
                    <div>
                      {t('peopleAquaticPage.activity2.description')}
                      <br /><br />
                      {t('peopleAquaticPage.activity2.question')}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8" style={{ paddingBottom: '10px', flex: 1 }}>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-6xl mx-auto"
        >
          {currentPage === 0 ? (
            // Intro Page: Two illustrations, description, CTA, downloads
            <div className="flex flex-col items-center" style={{ paddingBottom: '10px' }}>
              {/* Two Illustrations Side by Side */}
              <div className="flex gap-8 justify-center mb-8" style={{ width: '100%', maxWidth: '1200px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, maxWidth: '600px' }}>
                  <img
                    src="/assets/components/people/landing1.png"
                    alt="People interacting with aquatic ecosystems"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </div>
                <div style={{ flex: 1, maxWidth: '600px' }}>
                  <img
                    src="/assets/components/people/landing2.png"
                    alt="Learning about aquatic ecosystems"
                    style={{ width: '100%', height: 'auto', maxHeight: '320px', borderRadius: '8px', objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Descriptive Text */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#406A46',
                textAlign: 'center',
                marginBottom: '40px',
                maxWidth: '1200px',
                lineHeight: '1.6'
              }}>
                {t('peopleAquaticPage.intro.description')}
              </div>

              {/* Call-to-Action Button */}
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

              {/* Download Section */}
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
                      {t('peopleAquaticPage.modal.accessTeachingMaterials')}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <a
                        href="https://doi.org/10.5281/zenodo.17477840"
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
                        Open platform
                      </a>
                    </div>
                    <div style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '14px',
                      color: '#406A46',
                      fontStyle: 'italic'
                    }}>
                      Opens new tab: Zenodo
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
                      {t('peopleAquaticPage.modal.exploreRepository')}
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
                        {t('peopleAquaticPage.intro.explore')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : currentPage <= 3 ? (
            // Pages 1-3: Image content
            <div className="flex flex-col items-center" style={currentPage === 3 ? { height: 'auto', minHeight: 'auto' } : {}}>
              {currentPage === 1 ? (
                // Page 1: Simple image layout
                <>
                  <div className="mb-6" style={{ height: '40px' }}>
                    {/* White space for consistent positioning */}
                  </div>
                  <div className="flex justify-center">
                    <div style={{ width: '100%', maxWidth: '1600px' }}>
                      <LocalizedImage 
                        src={getImagePath(currentPage)}
                        alt={`People and aquatic ecosystems page ${currentPage}`}
                        className="w-full h-auto"
                        style={{ 
                          backgroundColor: 'transparent'
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : currentPage === 2 ? (
                // Page 2: 2/3 image + 1/3 activity content layout
                <>
                  <div className="mb-6" style={{ height: '20px' }}>
                    {/* Reduced white space for better alignment */}
                  </div>
                  <div className="flex w-full max-w-7xl gap-8" style={{ alignItems: 'flex-start' }}>
                    {/* Left side - Image (2/3) */}
                    <div style={{ width: '66.66%', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                      {/* Image container with fixed aspect ratio */}
                      <div 
                        data-image-container
                        style={{ 
                          position: 'relative', 
                          width: '100%', 
                          flexShrink: 0,
                          cursor: draggedItem ? 'crosshair' : 'default'
                        }}
                      >
                        <LocalizedImage 
                          src={getImagePath(currentPage)}
                          alt={`People and aquatic ecosystems page ${currentPage}`}
                          style={{ 
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            backgroundColor: 'transparent',
                            pointerEvents: 'auto'
                          }}
                        />
                        
                        {/* Drop zones for page 2 - invisible */}
                        {!showValidation && currentDropZones.map((zone) => (
                          <div
                            key={zone.id}
                            onDragOver={handleDragOver}
                            onDrop={(e) => {
                              e.stopPropagation();
                              handleDrop(e, zone.id);
                            }}
                            style={{
                              position: 'absolute',
                              left: `${zone.x}%`,
                              top: `${zone.y}%`,
                              width: `${zone.width}%`,
                              height: `${zone.height}%`,
                              pointerEvents: 'auto',
                              cursor: draggedItem ? 'pointer' : 'default'
                            }}
                          />
                        ))}
                        
                        {/* Dropped items */}
                        {Object.entries(droppedItems).map(([itemId, position]) => {
                          const item = pressureLabels.find(p => p.id === itemId);
                          const isCorrect = showValidation ? isItemCorrect(itemId) : null;
                          const isAnimating = animatingItems.has(itemId);
                          
                          return item ? (
                            <div
                              key={itemId}
                              draggable={!showValidation}
                              onDragStart={(e: React.DragEvent) => {
                                if (!showValidation) {
                                  // Remove from current position and start dragging again
                                  handleRemoveDroppedItem(itemId);
                                  handleDragStart(e, itemId);
                                }
                              }}
                              onClick={(e) => {
                                // Stop propagation to prevent image click handler
                                e.stopPropagation();
                                // Remove on click if validation not shown
                                if (!showValidation) {
                                  handleRemoveDroppedItem(itemId);
                                }
                              }}
                              title={showValidation ? (isCorrect ? t('peopleAquaticPage.ui.correctTooltip') : t('peopleAquaticPage.ui.incorrectTooltip')) : t('peopleAquaticPage.ui.clickToRemove')}
                              style={{
                                position: 'absolute',
                                left: `${position.x}%`,
                                top: `${position.y}%`,
                                backgroundColor: showValidation ? (isCorrect ? '#4CAF50' : '#F44336') : '#58717B',
                                transition: isAnimating ? 'all 0.5s ease-out' : 'all 0.2s ease-in-out',
                                color: 'white',
                                padding: 'clamp(0.25em, 0.4vw, 0.5em) clamp(0.35em, 0.6vw, 0.7em)',
                                borderRadius: 'clamp(0.25em, 0.4vw, 0.4em)',
                                fontSize: 'clamp(0.5rem, 0.8vw, 0.75rem)',
                                fontWeight: 'bold',
                                transform: 'translate(-50%, -50%)',
                                cursor: showValidation ? 'default' : 'grab',
                                border: showValidation 
                                  ? `clamp(1.5px, 0.15vw, 2.5px) solid ${isCorrect ? '#2E7D32' : '#D32F2F'}` 
                                  : 'clamp(0.8px, 0.12vw, 1.5px) solid white',
                                boxShadow: '0 clamp(0.8px, 0.12vw, 1.5px) clamp(3px, 0.5vw, 6px) rgba(0, 0, 0, 0.3)',
                                pointerEvents: 'auto',
                                zIndex: 10,
                                whiteSpace: 'nowrap',
                                userSelect: 'none',
                                WebkitUserSelect: 'none',
                                MozUserSelect: 'none',
                                msUserSelect: 'none'
                              }}
                              className={showValidation ? '' : 'hover:bg-opacity-80 hover:scale-105 active:cursor-grabbing'}
                            >
                              {item.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    {/* Right side - Activity content (1/3) - Sticky positioned to align with image */}
                    <div style={{ width: '33.33%', position: 'sticky', top: '100px', alignSelf: 'flex-start', zIndex: 100 }} className="flex flex-col justify-start pt-4">
                      {/* Score Display - Only show when validation is active */}
                      {showValidation && (
                        <div style={{
                          backgroundColor: 'white',
                          padding: '20px',
                          borderRadius: '12px',
                          marginBottom: '20px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          textAlign: 'center'
                        }}>
                          <h4 style={{
                            fontFamily: 'Comfortaa, sans-serif',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#406A46',
                            marginBottom: '12px'
                          }}>
                            {t('peopleAquaticPage.ui.results')}
                          </h4>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#548235',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                ✓
                              </div>
                              <span style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#548235'
                              }}>
                                {correctCount} {t('peopleAquaticPage.ui.correct')}
                              </span>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#C41904',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                ✗
                              </div>
                              <span style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#C41904'
                              }}>
                                {incorrectCount} {t('peopleAquaticPage.ui.incorrect')}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Drag and Drop Buttons - 2 columns, aligned with image */}
                      <div className="grid grid-cols-2 gap-4">
                        {(randomizedLabels.length > 0 ? randomizedLabels : pressureLabels).map((item) => {
                          const isDropped = droppedItems[item.id];
                          
                          return (
                          <div
                            key={item.id}
                            draggable={!isDropped}
                            onDragStart={(e) => !isDropped && handleDragStart(e, item.id)}
                            style={{
                              backgroundColor: isDropped ? '#ccc' : '#58717B',
                              color: isDropped ? '#888' : 'white',
                              padding: '12px 16px',
                              margin: '8px',
                              borderRadius: '8px',
                              cursor: isDropped ? 'not-allowed' : 'grab',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              fontFamily: 'Comfortaa, sans-serif',
                              textAlign: 'center',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              minHeight: '50px',
                              display: isDropped ? 'none' : 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              lineHeight: '1.2',
                              opacity: isDropped ? 0.4 : 1
                            }}
                            className={isDropped ? '' : 'group'}
                          >
                            {item.label}
                            
                            {/* Tooltip - Only show when not dragging and not dropped */}
                            {draggedItem !== item.id && !isDropped && (
                              <div 
                                className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300"
                                style={{
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  marginBottom: '8px',
                                  width: '280px',
                                  backgroundColor: 'white',
                                  color: 'black',
                                  padding: '12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: 'normal',
                                  lineHeight: '1.4',
                                  textAlign: 'left',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                  border: '1px solid #e2e8f0',
                                  pointerEvents: 'none',
                                  zIndex: 9999
                                }}
                              >
                                {item.description}
                                <div 
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 0,
                                    height: 0,
                                    borderLeft: '6px solid transparent',
                                    borderRight: '6px solid transparent',
                                    borderTop: '6px solid white'
                                  }}
                              />
                            </div>
                            )}
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Descriptive text below image and buttons - Full width */}
                  <div style={{
                    marginTop: '30px',
                    width: '100%',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#406A46',
                    lineHeight: '1.6',
                    textAlign: 'left',
                    flexShrink: 0
                  }}>
                    {t('peopleAquaticPage.activity1.instruction')}
                  </div>
                </>
              ) : currentPage === 3 ? (
                // Page 3: Activity 2 layout
                <>
                  <div className="mb-6" style={{ height: '20px' }}>
                    {/* Reduced white space for better alignment */}
                  </div>
                  <div className="flex w-full max-w-7xl gap-8" style={{ alignItems: 'flex-start' }}>
                    {/* Left side - Image (2/3) */}
                    <div style={{ width: '66.66%', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                      {/* Image container with fixed aspect ratio */}
                      <div 
                        data-image-container
                        style={{ 
                          position: 'relative', 
                          width: '100%', 
                          flexShrink: 0,
                          cursor: draggedItem ? 'crosshair' : 'default'
                        }}
                      >
                        <LocalizedImage 
                          src={getImagePath(currentPage)}
                          alt={`People and aquatic ecosystems page ${currentPage}`}
                          style={{ 
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            backgroundColor: 'transparent',
                            pointerEvents: 'auto'
                          }}
                        />
                        
                        {/* Drop zones for page 3 - invisible */}
                        {!showValidation && currentRestorationDropZones.map((zone) => (
                          <div
                            key={zone.id}
                            onDragOver={editMode ? undefined : handleDragOver}
                            onDrop={editMode ? undefined : (e) => {
                              e.stopPropagation();
                              handleDrop(e, zone.id);
                            }}
                            onMouseDown={editMode ? (e) => {
                              // Only drag if not clicking on a resize handle
                              if ((e.target as HTMLElement).classList.contains('resize-handle')) {
                                return;
                              }
                              handleDropZoneDrag(e, zone.id, 3);
                            } : undefined}
                            style={{
                              position: 'absolute',
                              left: `${zone.x}%`,
                              top: `${zone.y}%`,
                              width: `${zone.width}%`,
                              height: `${zone.height}%`,
                              pointerEvents: 'auto',
                              cursor: editMode ? 'move' : (draggedItem ? 'pointer' : 'default'),
                              backgroundColor: editMode ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
                              border: editMode ? '2px solid rgba(255, 0, 0, 0.8)' : 'none',
                              borderRadius: '4px',
                              boxSizing: 'border-box',
                              userSelect: 'none'
                            }}
                          >
                            {/* Resize handles - only show in edit mode */}
                            {editMode && (
                              <>
                                {/* Southeast corner */}
                                <div
                                  className="resize-handle"
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    handleDropZoneResize(e, zone.id, 3, 'se');
                                  }}
                                  style={{
                                    position: 'absolute',
                                    right: '-6px',
                                    bottom: '-6px',
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#C41904',
                                    border: '2px solid white',
                                    borderRadius: '2px',
                                    cursor: 'nwse-resize',
                                    zIndex: 1000
                                  }}
                                />
                                {/* Southwest corner */}
                                <div
                                  className="resize-handle"
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    handleDropZoneResize(e, zone.id, 3, 'sw');
                                  }}
                                  style={{
                                    position: 'absolute',
                                    left: '-6px',
                                    bottom: '-6px',
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#C41904',
                                    border: '2px solid white',
                                    borderRadius: '2px',
                                    cursor: 'nesw-resize',
                                    zIndex: 1000
                                  }}
                                />
                                {/* Northeast corner */}
                                <div
                                  className="resize-handle"
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    handleDropZoneResize(e, zone.id, 3, 'ne');
                                  }}
                                  style={{
                                    position: 'absolute',
                                    right: '-6px',
                                    top: '-6px',
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#C41904',
                                    border: '2px solid white',
                                    borderRadius: '2px',
                                    cursor: 'nesw-resize',
                                    zIndex: 1000
                                  }}
                                />
                                {/* Northwest corner */}
                                <div
                                  className="resize-handle"
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    handleDropZoneResize(e, zone.id, 3, 'nw');
                                  }}
                                  style={{
                                    position: 'absolute',
                                    left: '-6px',
                                    top: '-6px',
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: '#C41904',
                                    border: '2px solid white',
                                    borderRadius: '2px',
                                    cursor: 'nwse-resize',
                                    zIndex: 1000
                                  }}
                                />
                              </>
                            )}
                          </div>
                        ))}
                        
                        {/* Dropped restoration items */}
                        {Object.entries(restorationDroppedItems).map(([itemId, position]) => {
                          const item = restorationMeasures.find(p => p.id === itemId);
                          const isCorrect = showValidation ? isItemCorrect(itemId) : null;
                          const isAnimating = animatingItems.has(itemId);
                          
                          return item ? (
                            <div
                              key={itemId}
                              draggable={!showValidation}
                              onDragStart={(e: React.DragEvent) => {
                                if (!showValidation) {
                                  // Remove from current position and start dragging again
                                  handleRemoveDroppedItem(itemId);
                                  handleDragStart(e, itemId);
                                }
                              }}
                              onClick={(e) => {
                                // Stop propagation to prevent image click handler
                                e.stopPropagation();
                                // Remove on click if validation not shown
                                if (!showValidation) {
                                  handleRemoveDroppedItem(itemId);
                                }
                              }}
                              title={showValidation ? (isCorrect ? t('peopleAquaticPage.ui.correctTooltip') : t('peopleAquaticPage.ui.incorrectTooltip')) : t('peopleAquaticPage.ui.clickToRemove')}
                              style={{
                                position: 'absolute',
                                left: `${position.x}%`,
                                top: `${position.y}%`,
                                backgroundColor: showValidation ? (isCorrect ? '#4CAF50' : '#F44336') : '#406A46',
                                transition: isAnimating ? 'all 0.5s ease-out' : 'all 0.2s ease-in-out',
                                color: 'white',
                                padding: 'clamp(0.35em, 0.6vw, 0.6em) clamp(0.5em, 0.9vw, 0.9em)',
                                borderRadius: 'clamp(0.3em, 0.5vw, 0.5em)',
                                fontSize: 'clamp(0.65rem, 1vw, 0.9rem)',
                                fontWeight: 'bold',
                                transform: 'translate(-50%, -50%)',
                                cursor: showValidation ? 'default' : 'grab',
                                border: showValidation 
                                  ? `clamp(1.5px, 0.15vw, 2.5px) solid ${isCorrect ? '#2E7D32' : '#D32F2F'}` 
                                  : 'clamp(0.8px, 0.12vw, 1.5px) solid white',
                                boxShadow: '0 clamp(0.8px, 0.12vw, 1.5px) clamp(3px, 0.5vw, 6px) rgba(0, 0, 0, 0.3)',
                                pointerEvents: 'auto',
                                zIndex: 10,
                                whiteSpace: 'nowrap',
                                userSelect: 'none',
                                WebkitUserSelect: 'none',
                                MozUserSelect: 'none',
                                msUserSelect: 'none'
                              }}
                              className={showValidation ? '' : 'hover:bg-opacity-80 hover:scale-105 active:cursor-grabbing'}
                            >
                              {item.label}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    {/* Right side - Activity 2 content (1/3) - Sticky positioned to align with image */}
                    <div style={{ width: '33.33%', position: 'sticky', top: '100px', alignSelf: 'flex-start' }} className="flex flex-col justify-start pt-4">
                      {/* Score Display */}
                      {showValidation && (
                        <div style={{
                          backgroundColor: 'white',
                          padding: '20px',
                          borderRadius: '12px',
                          marginBottom: '20px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          textAlign: 'center'
                        }}>
                          <h4 style={{
                            fontFamily: 'Comfortaa, sans-serif',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#406A46',
                            marginBottom: '12px'
                          }}>
                            {t('peopleAquaticPage.ui.results')}
                          </h4>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#548235',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                ✓
                              </div>
                              <span style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#548235'
                              }}>
                                {correctCount} {t('peopleAquaticPage.ui.correct')}
                              </span>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: '#C41904',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                ✗
                              </div>
                              <span style={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#C41904'
                              }}>
                                {incorrectCount} {t('peopleAquaticPage.ui.incorrect')}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Drag and Drop Buttons for Restoration */}
                      <div className="grid grid-cols-2 gap-4">
                        {(randomizedRestoration.length > 0 ? randomizedRestoration : restorationMeasures).map((item) => {
                          const isDropped = restorationDroppedItems[item.id];
                          
                          return (
                          <div
                            key={item.id}
                            draggable={!isDropped}
                            onDragStart={(e) => !isDropped && handleDragStart(e, item.id)}
                            style={{
                              backgroundColor: isDropped ? '#ccc' : '#406A46',
                              color: isDropped ? '#888' : 'white',
                              padding: '12px 16px',
                              margin: '8px',
                              borderRadius: '8px',
                              cursor: isDropped ? 'not-allowed' : 'grab',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              fontFamily: 'Comfortaa, sans-serif',
                              textAlign: 'center',
                              transition: 'all 0.3s ease',
                              position: 'relative',
                              minHeight: '50px',
                              display: isDropped ? 'none' : 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              lineHeight: '1.2',
                              opacity: isDropped ? 0.4 : 1
                            }}
                            className={isDropped ? '' : 'group'}
                          >
                            {item.label}
                            
                            {/* Tooltip - Only show when not dragging and not dropped */}
                            {draggedItem !== item.id && !isDropped && (
                              <div 
                                className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300"
                                style={{
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  marginBottom: '8px',
                                  width: '280px',
                                  backgroundColor: 'white',
                                  color: 'black',
                                  padding: '12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  fontWeight: 'normal',
                                  lineHeight: '1.4',
                                  textAlign: 'left',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                  border: '1px solid #e2e8f0',
                                  pointerEvents: 'none',
                                  zIndex: 9999
                                }}
                              >
                                {item.description}
                                <div 
                                  style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 0,
                                    height: 0,
                                    borderLeft: '6px solid transparent',
                                    borderRight: '6px solid transparent',
                                    borderTop: '6px solid white'
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Descriptive text below image and buttons - Full width */}
                  <div style={{
                    marginTop: '30px',
                    width: '100%',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#406A46',
                    lineHeight: '1.6',
                    textAlign: 'left',
                    flexShrink: 0
                  }}>
                    {t('peopleAquaticPage.activity2.instruction')}
                  </div>
                </>
              ) : (
                // Page 4 or other pages: Simple image layout
                <>
                  <div className="flex justify-center">
                    <div style={{ width: '100%', maxWidth: '1600px' }}>
                      <LocalizedImage 
                        src={getImagePath(currentPage)}
                        alt={`People and aquatic ecosystems page ${currentPage}`}
                        className="w-full h-auto"
                        style={{ 
                          backgroundColor: 'transparent'
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Page 4: Activity 3
            <div className="flex flex-col items-center w-full">
              {/* Activity 3 title with pencil icon - Centered */}
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/assets/icons/pencil.png" 
                  alt="Pencil" 
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    marginRight: '16px'
                  }}
                />
                <h3 style={{ 
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: '#406A46',
                  margin: 0,
                  lineHeight: '1.1'
                }}>
                  {t('peopleAquaticPage.activity3.title')}
                </h3>
              </div>
              
              {/* Description text - Centered */}
              <div style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#406A46',
                lineHeight: '1.4',
                textAlign: 'center',
                marginBottom: '40px',
                width: '100%'
              }}>
                {t('peopleAquaticPage.activity3.description')}
              </div>
              
              {/* Three columns */}
              <div className="flex w-full max-w-7xl" style={{ justifyContent: 'space-between' }}>
                {/* Column 1 (31%) */}
                <div style={{ width: '31%' }}>
                  <div style={{
                    backgroundColor: 'transparent',
                    padding: '20px',
                    height: '100%'
                  }}>
                    {/* Column 1 Image */}
                    <LocalizedImage 
                      src="/assets/components/people/column1.png" 
                      alt="Original natural Floodplain" 
                      style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '16px',
                        borderRadius: '8px'
                      }}
                    />
                    {/* Column 1 Text */}
                    <h4 style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#406BB8',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '16px'
                    }}>
                      {t('peopleAquaticPage.activity3.column1.title')}
                    </h4>
                    {/* Column 1 Question */}
                    <p style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '20px',
                      lineHeight: '1.4'
                    }}>
                      {t('peopleAquaticPage.activity3.column1.question')}
                    </p>
                    
                    {/* Column 1 Quiz Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {quizData.column1.options.map((option) => {
                        const isSelected = quizAnswers.column1 === option.id;
                        const isCorrect = option.id === quizData.column1.correct;
                        const showResult = isSelected;
                        
                        return (
                          <div
                            key={option.id}
                            onClick={() => handleQuizAnswer('column1', option.id)}
                            style={{
                              backgroundColor: showResult ? (isCorrect ? '#548235' : '#C41904') : 'white',
                              color: showResult ? 'white' : 'black',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontSize: '16px',
                              fontWeight: '500',
                              lineHeight: '1.3',
                              transition: 'all 0.3s ease'
                            }}
                            className="hover:bg-gray-50"
                          >
                            <strong>{option.id})</strong> {option.text}
                            {showResult && !isCorrect && (
                              <div style={{
                                marginTop: '8px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#ffffff'
                              }}>
                                {t('peopleAquaticPage.activity3.correctAnswer')} ({quizData.column1.correct})
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Column 2 (31%) */}
                <div style={{ width: '31%' }}>
                  <div style={{
                    backgroundColor: 'transparent',
                    padding: '20px',
                    height: '100%'
                  }}>
                    {/* Column 2 Image */}
                    <LocalizedImage 
                      src="/assets/components/people/column2.png" 
                      alt="Altered floodplain" 
                      style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '16px',
                        borderRadius: '8px'
                      }}
                    />
                    {/* Column 2 Text */}
                    <h4 style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#D2847A',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '16px'
                    }}>
                      {t('peopleAquaticPage.activity3.column2.title')}
                    </h4>
                    {/* Column 2 Question */}
                    <p style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '20px',
                      lineHeight: '1.4'
                    }}>
                      {t('peopleAquaticPage.activity3.column2.question')}
                    </p>
                    
                    {/* Column 2 Quiz Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {quizData.column2.options.map((option) => {
                        const isSelected = quizAnswers.column2 === option.id;
                        const isCorrect = option.id === quizData.column2.correct;
                        const showResult = isSelected;
                        
                        return (
                          <div
                            key={option.id}
                            onClick={() => handleQuizAnswer('column2', option.id)}
                            style={{
                              backgroundColor: showResult ? (isCorrect ? '#548235' : '#C41904') : 'white',
                              color: showResult ? 'white' : 'black',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontSize: '16px',
                              fontWeight: '500',
                              lineHeight: '1.3',
                              transition: 'all 0.3s ease'
                            }}
                            className="hover:bg-gray-50"
                          >
                            <strong>{option.id})</strong> {option.text}
                            {showResult && !isCorrect && (
                              <div style={{
                                marginTop: '8px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#ffffff'
                              }}>
                                {t('peopleAquaticPage.activity3.correctAnswer')} ({quizData.column2.correct})
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Column 3 (31%) */}
                <div style={{ width: '31%' }}>
                  <div style={{
                    backgroundColor: 'transparent',
                    padding: '20px',
                    height: '100%'
                  }}>
                    {/* Column 3 Image */}
                    <LocalizedImage 
                      src="/assets/components/people/column3.png" 
                      alt="Restored floodplain" 
                      style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: '16px',
                        borderRadius: '8px'
                      }}
                    />
                    {/* Column 3 Text */}
                    <h4 style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#619F6A',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '16px'
                    }}>
                      {t('peopleAquaticPage.activity3.column3.title')}
                    </h4>
                    {/* Column 3 Question */}
                    <p style={{
                      fontFamily: 'Comfortaa, sans-serif',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#406A46',
                      textAlign: 'center',
                      margin: 0,
                      marginBottom: '20px',
                      lineHeight: '1.4'
                    }}>
                      {t('peopleAquaticPage.activity3.column3.question')}
                    </p>
                    
                    {/* Column 3 Quiz Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {quizData.column3.options.map((option) => {
                        const isSelected = quizAnswers.column3 === option.id;
                        const isCorrect = option.id === quizData.column3.correct;
                        const showResult = isSelected;
                        
                        return (
                          <div
                            key={option.id}
                            onClick={() => handleQuizAnswer('column3', option.id)}
                            style={{
                              backgroundColor: showResult ? (isCorrect ? '#548235' : '#C41904') : 'white',
                              color: showResult ? 'white' : 'black',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                              fontFamily: 'Comfortaa, sans-serif',
                              fontSize: '16px',
                              fontWeight: '500',
                              lineHeight: '1.3',
                              transition: 'all 0.3s ease'
                            }}
                            className="hover:bg-gray-50"
                          >
                            <strong>{option.id})</strong> {option.text}
                            {showResult && !isCorrect && (
                              <div style={{
                                marginTop: '8px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#ffffff'
                              }}>
                                {t('peopleAquaticPage.activity3.correctAnswer')} ({quizData.column3.correct})
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Pagination and Navigation - Sticky Footer - Outside container for full width */}
      {currentPage > 0 && (
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
            <button
              onClick={onHomeClick}
              className="home-button relative flex items-center justify-center z-50"
              style={{ 
                width: '54px',
                height: '54px',
                backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
              }}
            >
              <img 
                src="/assets/icons/Home.png" 
                alt="Home" 
                style={{ 
                  width: '54px',
                  height: '54px',
                  opacity: 1
                }}
              />
            </button>
          </div>

            {/* Center Section - Download and Pagination */}
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
              {currentPage === TOTAL_PAGES && hasEnoughSpace && (
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
              {Array.from({ length: TOTAL_PAGES }, (_, index) => {
                const pageNum = index + 1;
                
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(pageNum)}
                    className="transition-all duration-300 p-0 border-0 bg-transparent"
                    aria-label={`Go to page ${pageNum}`}
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
                        backgroundColor: currentPage === pageNum ? '#51727C' : '#97C09D'
                      }}
                    />
                  </button>
                );
              })}
          </div>
            </motion.div>

          {/* Next Button - Right (Hide on last page) */}
          {currentPage < TOTAL_PAGES && (
              <div className="flex items-center" style={{ paddingRight: '16px', gap: '16px' }}>
              {/* Retry Button - Show when validation is active */}
              {showValidation && (currentPage === 2 || currentPage === 3) && (
                <button
                  onClick={handleRetry}
                  className="retry-button relative flex items-center justify-center z-50"
                  style={{
                    width: '217px',
                    height: '60px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <LocalizedImage 
                    src="/assets/icons/tryagain.png" 
                    alt={t('common.tryAgain')} 
                    style={{ 
                      width: '217px',
                      height: '60px',
                      opacity: 1
                    }}
                  />
                </button>
              )}
              <button
                onClick={() => {
                  const isDisabled = (currentPage === 2 || currentPage === 3) && !allItemsPlaced;
                  if (!isDisabled) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                disabled={(currentPage === 2 || currentPage === 3) && !allItemsPlaced}
                className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: 'auto',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: ((currentPage === 2 || currentPage === 3) && !allItemsPlaced) ? 'not-allowed' : 'pointer'
                }}
              >
                <LocalizedImage 
                  src="/assets/icons/next.png" 
                  alt="Next" 
                  style={{ 
                    width: 'auto',
                    height: '60px',
                    opacity: ((currentPage === 2 || currentPage === 3) && !allItemsPlaced) ? 0.3 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                />
              </button>
            </div>
          )}
          {currentPage === TOTAL_PAGES && (
              <div className="flex items-center" style={{ paddingRight: '16px' }}>
              <button
                onClick={onHomeClick}
                className="next-button relative flex items-center justify-center z-50"
                style={{
                  width: 'auto',
                  height: '60px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <LocalizedImage 
                  src="/assets/icons/next.png" 
                  alt="Finish" 
                  style={{ 
                    width: 'auto',
                    height: '60px',
                    opacity: 1,
                    transition: 'opacity 0.3s ease'
                  }}
                />
              </button>
            </div>
          )}
        </div>
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
              {t('peopleAquaticPage.modal.title')}
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
                  {t('peopleAquaticPage.modal.accessTeachingMaterials')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '6px'
                }}>
                  {t('peopleAquaticPage.modal.basedOn5E')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {t('peopleAquaticPage.modal.opensInNewTab')}
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
                  alt="Explore Wet-Edu Repository"
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
                  {t('peopleAquaticPage.modal.exploreRepository')}
                </div>
                <div style={{
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {t('peopleAquaticPage.modal.exploreRelated')}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Code Modal */}
      {showCodeModal && (
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
          onClick={() => setShowCodeModal(false)}
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
              onClick={() => {
                setShowCodeModal(false);
                setPositionCode('');
              }}
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
              marginBottom: '20px'
            }}>
              Dropzone Posities
            </div>

            {/* Format Toggle */}
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <button
                onClick={() => {
                  setShowRawJson(false);
                  exportDropZonePositions();
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: showRawJson ? '#97C09D' : '#406A46',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px'
                }}
              >
                Base64 Code
              </button>
              <button
                onClick={() => {
                  setShowRawJson(true);
                  exportDropZonePositions();
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: showRawJson ? '#406A46' : '#97C09D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '14px'
                }}
              >
                Ruwe JSON
              </button>
            </div>

            {/* Format Explanation */}
            <div style={{
              fontFamily: 'Comfortaa, sans-serif',
              fontSize: '14px',
              color: '#406A46',
              textAlign: 'center',
              marginBottom: '20px',
              fontStyle: 'italic'
            }}>
              {showRawJson
                ? 'Ruwe JSON: Leesbaar maar langer'
                : 'Base64 Code: Compact voor delen'}
            </div>

            {/* Code Input/Display */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                fontFamily: 'Comfortaa, sans-serif',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#406A46',
                display: 'block',
                marginBottom: '10px'
              }}>
                {positionCode ? `${showRawJson ? 'JSON' : 'Base64 Code'} (gekopieerd naar clipboard):` : 'Plak code hier:'}
              </label>
              <textarea
                value={positionCode}
                onChange={(e) => setPositionCode(e.target.value)}
                placeholder="Plak hier de code..."
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #406A46',
                  fontFamily: showRawJson ? 'monospace' : 'monospace',
                  fontSize: showRawJson ? '11px' : '12px',
                  resize: 'vertical',
                  whiteSpace: showRawJson ? 'pre' : 'normal'
                }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {positionCode && (
                <button
                  onClick={importDropZonePositions}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#406A46',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Comfortaa, sans-serif',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Importeer Posities
                </button>
              )}
              <button
                onClick={() => {
                  setShowCodeModal(false);
                  setPositionCode('');
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#97C09D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Comfortaa, sans-serif',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
