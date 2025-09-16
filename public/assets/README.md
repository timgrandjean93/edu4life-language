# Assets Folder

Deze folder bevat alle statische bestanden voor de Edu4Life applicatie.

## Folder Structuur

```
public/assets/
├── backgrounds/          # Achtergrond afbeeldingen
│   ├── main-bg.jpg      # Hoofdachtergrond
│   ├── river-bg.png     # Rivier achtergrond
│   └── sky-bg.jpg       # Lucht achtergrond
├── components/           # Component afbeeldingen
│   ├── wetland-intro.png
│   ├── animal-spotting.png
│   └── plant-identification.png
└── icons/               # Iconen en kleine afbeeldingen
    ├── wetland-icon.svg
    └── water-drop.svg
```

## Aanbevolen Bestandsformaten

- **Achtergronden**: JPG (voor foto's) of PNG (voor transparantie)
- **Componenten**: PNG (met transparantie)
- **Iconen**: SVG (schaalbaar) of PNG
- **Optimalisatie**: Gebruik tools zoals TinyPNG voor compressie

## Gebruik in Code

```typescript
// Achtergrond afbeelding
const backgroundImage = '/assets/backgrounds/main-bg.jpg';

// Component afbeelding
const componentImage = '/assets/components/wetland-intro.png';

// In CSS
backgroundImage: `url('/assets/backgrounds/river-bg.png')`
```

## Bestandsnamen Conventie

- Gebruik kebab-case: `wetland-intro.png`
- Wees beschrijvend: `river-background-main.jpg`
- Voeg versie toe indien nodig: `icon-v2.svg`
