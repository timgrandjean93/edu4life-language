export interface ClickableComponent {
  id: string;
  title: string;
  description: string;
  x: number; // Percentage van de breedte (0-100)
  y: number; // Percentage van de hoogte (0-100)
  icon: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  gameId?: string; // Optioneel: ID van de game die gestart moet worden
  category: 'intro' | 'game' | 'info' | 'interactive' | 'river';
  image?: string; // Optioneel: Pad naar component afbeelding
  backgroundImage?: string; // Optioneel: Pad naar achtergrond afbeelding
  // Nieuwe properties voor rivier positioning
  riverPosition?: {
    x: number; // Percentage langs de rivier (0-100)
    offsetY?: number; // Verticale offset van de rivier (percentage van viewport hoogte)
  };
  anchorPoint?: 'top' | 'center' | 'bottom'; // Welk deel van de component als anchor gebruikt wordt
  // Grootte configuratie
  widthPercentage?: number; // Breedte als percentage van viewport breedte (default: 15)
  // heightPercentage wordt automatisch bepaald door aspect ratio
}

export const clickableComponents: ClickableComponent[] = [
  {
    id: 'floodplain-living',
    title: 'Floodplains living environment',
    description: 'Ontdek hoe mensen leven in overstromingsgebieden',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🏠',
    color: 'bg-green-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Floodplain.png',
    riverPosition: {
      x: 8, // 25% langs de rivier
      offsetY: 30 // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 15 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'floodplain-sponge',
    title: 'Floodplains sponge function',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Floodplain-sponge.png',
    riverPosition: {
      x: 18, // 50% langs de rivier
      offsetY: 20 // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 15 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'riparian',
    title: 'Riparian areas Natures riverside laboratory',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Riparian.png',
    riverPosition: {
      x: 31, // 50% langs de rivier
      offsetY: 22 // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 15 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'wastewater',
    title: 'Natural wastewater treatment plants',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Wastewater.png',
    riverPosition: {
      x: 38, // 50% langs de rivier
      offsetY: 22 // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 15 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'climate',
    title: 'Climate protection and carbon sinks',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Climate.png',
    riverPosition: {
      x: 53, // 50% langs de rivier
      offsetY: 2 // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 15 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'aestethics',
    title: 'Nature\'s Aesthetics',
    description: 'Discover the beauty and aesthetic value of natural floodplains',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🎨',
    color: 'bg-purple-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Constructed.png', // Using Constructed wetlands image
    riverPosition: {
      x: 57.5, // Same position as Constructed wetlands
      offsetY: 40 // Same position as Constructed wetlands
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 18 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'Mapping',
    title: 'Mapping your wetland',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Mapping.png',
    riverPosition: {
      x: 43, // 50% langs de rivier
      offsetY: 70 // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 18 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'People',
    title: 'The people and aquatic systems',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/People.png',
    riverPosition: {
      x: 64, // 50% langs de rivier
      offsetY: 61 // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 17 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'Art',
    title: 'Arts & Crafts & Storytelling',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Art.png',
    riverPosition: {
      x: 62, // 50% langs de rivier
      offsetY: 87, // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 17 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'Bluegreen',
    title: 'Blue-green space4all',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Bluegreen.png',
    riverPosition: {
      x: 77, // 50% langs de rivier
      offsetY: 18, // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 15 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'WetlandFresk',
    title: 'Wetland Fresk',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Wetland.png',
    riverPosition: {
      x: 83, // 50% langs de rivier
      offsetY: 38, // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 15 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
  {
    id: 'Solution4Life',
    title: 'Solution4Life',
    description: 'Ontdek hoe wetlands fungeren als natuurlijke spons',
    x: 0, // Wordt overschreven door riverPosition
    y: 0, // Wordt overschreven door riverPosition
    icon: '🧽',
    color: 'bg-blue-400',
    size: 'medium',
    category: 'river',
    image: '/assets/components/Solution4Life.png',
    riverPosition: {
      x: 90, // 50% langs de rivier
      offsetY: 67, // 10% van rivier hoogte boven de rivier
    },
    anchorPoint: 'top', // De witte cirkel aan de bovenkant
    widthPercentage: 15 // 15% van viewport breedte, hoogte wordt automatisch bepaald
  },
];

// Helper functies voor het beheren van componenten
export const getComponentById = (id: string): ClickableComponent | undefined => {
  return clickableComponents.find(component => component.id === id);
};

export const getComponentsByCategory = (category: string): ClickableComponent[] => {
  return clickableComponents.filter(component => component.category === category);
};

export const getGameComponents = (): ClickableComponent[] => {
  return clickableComponents.filter(component => component.gameId);
};
