# Wetland Education Toolkit

Een interactieve gamification applicatie voor wetlands educatie, ontworpen om embedded te worden in andere websites.

## Features

- 🎮 **Mini-games**: Verschillende educatieve spellen over wetlands
- 📱 **Mobile-friendly**: Landscape-only op mobile devices
- 🔄 **Orientation detection**: Automatische waarschuwing voor portrait modus
- 🎯 **Fixed paths**: Spellen met vaste routes voor consistente ervaring
- 📦 **Embeddable**: Eenvoudig te integreren in andere websites
- 🎨 **Responsive design**: Werkt op alle schermformaten
- 🏠 **Interactive Homepage**: Clickable components met animaties
- 🌊 **River Background**: Dynamische rivier met water effecten
- ⚙️ **Component Manager**: Eenvoudig beheren van clickable components
- 🎭 **Framer Motion**: Smooth animaties en transitions

## Technologie Stack

- **React 18** + **TypeScript**
- **Vite** voor snelle development
- **Tailwind CSS** voor styling
- **Framer Motion** voor animaties
- **Custom hooks** voor state management

## Development

### Installatie

```bash
npm install
```

### Development server

```bash
npm run dev
```

### Build voor productie

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

## Embedding in andere websites

### Als iframe

```html
<iframe 
  src="https://jouw-domein.com" 
  width="100%" 
  height="600px" 
  frameborder="0"
  allowfullscreen>
</iframe>
```

### Met postMessage API

```javascript
// In de parent website
const iframe = document.getElementById('edu4life-iframe');

// Luister naar berichten van de game
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://jouw-domein.com') return;
  
  switch(event.data.type) {
    case 'GAME_STARTED':
      console.log('Game gestart');
      break;
    case 'GAME_COMPLETED':
      console.log('Game voltooid, score:', event.data.score);
      break;
    case 'LEVEL_COMPLETED':
      console.log('Level voltooid:', event.data.level);
      break;
  }
});

// Stuur berichten naar de game
iframe.contentWindow.postMessage({
  type: 'PAUSE_GAME'
}, 'https://jouw-domein.com');
```

## Game Framework

### Nieuwe game toevoegen

1. Maak een nieuwe component in `src/games/`
2. Implementeer de `GameProps` interface
3. Voeg de game toe aan de App component

### Voorbeeld game structuur

```typescript
interface GameProps {
  onLevelComplete: (level: number, score: number) => void;
  currentLevel: number;
  isPaused: boolean;
}

export const MyGame: React.FC<GameProps> = ({
  onLevelComplete,
  currentLevel,
  isPaused,
}) => {
  // Game logic hier
  return <div>Game content</div>;
};
```

## Responsive Design

- **Desktop**: Volledige breedte, optimale ervaring
- **Tablet**: Aangepaste layout voor touch interface
- **Mobile**: Landscape-only met orientation warning

## Deployment

### Vercel (Aanbevolen)

1. Push naar GitHub
2. Verbind met Vercel
3. Deploy automatisch

### Netlify

1. Build de applicatie: `npm run build`
2. Upload de `dist` folder naar Netlify
3. Configureer redirects voor SPA routing

### Andere platforms

De applicatie kan op elke statische hosting service worden gehost die HTML/CSS/JS ondersteunt.

## Customization

### Kleuren aanpassen

Bewerk `tailwind.config.js` om de kleurenschema aan te passen:

```javascript
theme: {
  extend: {
    colors: {
      wetland: {
        // Jouw kleuren hier
      }
    }
  }
}
```

### Nieuwe games toevoegen

1. Maak component in `src/games/`
2. Voeg toe aan `src/App.tsx`
3. Configureer game properties

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Licentie

MIT License - zie LICENSE file voor details.