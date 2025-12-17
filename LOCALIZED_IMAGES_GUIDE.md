# Gelokaliseerde Afbeeldingen Handleiding

Dit systeem zorgt ervoor dat afbeeldingen met tekst automatisch de juiste taalversie laden, of terugvallen op Engels als de taalversie niet beschikbaar is.

## Hoe het werkt

### Bestandsstructuur

Afbeeldingen moeten worden opgeslagen met een taalcode suffix:

```
/assets/images/
  welcome.png          (Engels, default)
  welcome.nl.png       (Nederlands)
  welcome.de.png       (Duits - wanneer toegevoegd)
  welcome.fr.png       (Frans - wanneer toegevoegd)
```

**Conventie:** `{bestandsnaam}.{taalcode}.{extensie}`

### Gebruik

#### Optie 1: LocalizedImage Component (Aanbevolen)

Vervang gewone `<img>` tags met de `<LocalizedImage>` component:

```tsx
import { LocalizedImage } from '../components/LocalizedImage';

// Voorheen:
<img src="/assets/images/welcome.png" alt="Welcome" />

// Nu:
<LocalizedImage 
  src="/assets/images/welcome.png" 
  alt="Welcome" 
/>
```

De component:
- Laadt automatisch de juiste taalversie
- Valt terug op Engels als de taalversie niet bestaat
- Werkt met alle standaard img props

#### Optie 2: useLocalizedImage Hook

Voor meer controle:

```tsx
import { useLocalizedImage } from '../utils/localizedImage';

function MyComponent() {
  const imagePath = useLocalizedImage('/assets/images/welcome.png');
  
  return <img src={imagePath} alt="Welcome" />;
}
```

#### Optie 3: Utility Functie

Voor programmatisch gebruik:

```tsx
import { getLocalizedImagePath } from '../utils/localizedImage';

const imagePath = getLocalizedImagePath(
  '/assets/images/welcome.png',
  'nl' // huidige taal
);
// Retourneert: '/assets/images/welcome.nl.png'
```

## Voorbeelden

### Eenvoudig gebruik

```tsx
import { LocalizedImage } from '../components/LocalizedImage';

<LocalizedImage 
  src="/assets/components/Click.png"
  alt="Click instruction"
  style={{ width: '100px' }}
/>
```

### Met fallback

```tsx
<LocalizedImage 
  src="/assets/images/complex-diagram.png"
  fallbackSrc="/assets/images/simple-diagram.png"
  alt="Diagram"
/>
```

### In een functie die paths genereert

```tsx
import { useLocalizedImage } from '../utils/localizedImage';

function getImagePath(page: number): string {
  const basePath = `/assets/pages/page${page}.png`;
  // Gebruik hook in component, of utility functie met huidige taal
  return basePath; // Laat LocalizedImage component het afhandelen
}

// In component:
function MyPage() {
  const imagePath = useLocalizedImage(getImagePath(1));
  return <img src={imagePath} alt="Page 1" />;
}
```

## Best Practices

1. **Engels als default**: Zorg altijd dat de Engelse versie bestaat (zonder taalcode)
2. **Consistente naamgeving**: Gebruik dezelfde naam voor alle taalversies
3. **Test beide talen**: Controleer dat beide versies correct laden
4. **Fallback**: Het systeem valt automatisch terug op Engels als de taalversie niet bestaat

## Bestandsstructuur Voorbeeld

```
public/assets/
  components/
    carbon/
      image-letters.png          (Engels)
      image-letters.nl.png       (Nederlands)
    Sponge/
      image1.png                 (Engels)
      image1.nl.png              (Nederlands)
      image2.png                 (Engels)
      image2.nl.png              (Nederlands)
  backgrounds/
    river.png                    (Geen tekst, geen localisatie nodig)
```

## Migratie

Om bestaande afbeeldingen te migreren:

1. **Identificeer afbeeldingen met tekst**: Alleen afbeeldingen met tekst hoeven gelokaliseerd te worden
2. **Vervang `<img>` met `<LocalizedImage>`**: Zoek en vervang in componenten
3. **Maak taalversies**: Maak `.nl.png` versies van afbeeldingen met tekst
4. **Test**: Controleer dat beide talen correct werken

## Technische Details

- **Image existence check**: Het systeem probeert eerst de gelokaliseerde versie te laden
- **Automatic fallback**: Als de gelokaliseerde versie niet bestaat (404), valt het terug op Engels
- **Performance**: Image checks worden asynchroon uitgevoerd om de UI niet te blokkeren
- **Browser caching**: Browsers cachen afbeeldingen automatisch, dus checks zijn alleen nodig bij taalwisseling

