# Meertaligheid (i18n) Handleiding

Dit project gebruikt `react-i18next` voor meertalige ondersteuning. Momenteel zijn Engels (en) en Nederlands (nl) geïmplementeerd.

## Structuur

- **`src/i18n/config.ts`** - i18n configuratie
- **`src/i18n/languages.ts`** - Centrale lijst van beschikbare talen
- **`src/locales/en.json`** - Engelse vertalingen
- **`src/locales/nl.json`** - Nederlandse vertalingen
- **`src/components/LanguageSwitcher.tsx`** - Dropdown component voor taalwisseling

## Hoe het werkt

### 1. Vertalingen gebruiken in componenten

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('homePage.title')}</h1>
      <p>{t('common.loading')}</p>
    </div>
  );
}
```

### 2. Vertalingen met variabelen

```tsx
const { t } = useTranslation();
<p>{t('footer.copyright', { year: 2024 })}</p>
```

In JSON:
```json
{
  "footer": {
    "copyright": "Copyright © {{year}} Restore4Life Consortium."
  }
}
```

### 3. Taal wisselen

De taalwisselaar staat in de Header als een dropdown menu. Gebruikers kunnen een taal selecteren uit de beschikbare talen. De voorkeur wordt opgeslagen in localStorage. De dropdown toont vlaggen en native namen van de talen.

## Vertalingen toevoegen

### Stap 1: Voeg keys toe aan beide JSON bestanden

**`src/locales/en.json`**:
```json
{
  "carbonPage": {
    "hint": "Hint: Focus on the features that make each ecosystem unique such as trees, water, grass, or landforms.",
    "clickToRemove": "Click to remove label",
    "checkAnswers": "Check Answers"
  }
}
```

**`src/locales/nl.json`**:
```json
{
  "carbonPage": {
    "hint": "Tip: Focus op de kenmerken die elk ecosysteem uniek maken, zoals bomen, water, gras of landvormen.",
    "clickToRemove": "Klik om label te verwijderen",
    "checkAnswers": "Controleer antwoorden"
  }
}
```

### Stap 2: Gebruik vertalingen in componenten

```tsx
import { useTranslation } from 'react-i18next';

function CarbonPage() {
  const { t } = useTranslation();
  
  return (
    <div>
      <p>{t('carbonPage.hint')}</p>
      <button title={t('carbonPage.clickToRemove')}>
        {t('carbonPage.checkAnswers')}
      </button>
    </div>
  );
}
```

## Best practices

1. **Gebruik beschrijvende keys**: `carbonPage.hint` is beter dan `hint1`
2. **Groepeer gerelateerde vertalingen**: Gebruik namespaces zoals `carbonPage.*`, `header.*`, etc.
3. **Houd consistentie**: Gebruik dezelfde structuur in beide taalbestanden
4. **Test beide talen**: Controleer dat alle vertalingen correct worden weergegeven

## Nieuwe taal toevoegen

Het toevoegen van een nieuwe taal is nu heel eenvoudig:

### Stap 1: Voeg taal toe aan de lijst
Open `src/i18n/languages.ts` en voeg de nieuwe taal toe aan `AVAILABLE_LANGUAGES`:
```ts
export const AVAILABLE_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }, // Nieuw!
];
```

### Stap 2: Maak vertalingsbestand
Maak een nieuw JSON bestand: `src/locales/de.json` en kopieer de structuur van `en.json`:
```json
{
  "common": {
    "accept": "Akzeptieren",
    "reject": "Ablehnen",
    ...
  }
}
```

### Stap 3: Importeer in config
Update `src/i18n/config.ts`:
```ts
import deTranslations from '../locales/de.json';

i18n.init({
  resources: {
    en: { translation: enTranslations },
    nl: { translation: nlTranslations },
    de: { translation: deTranslations }, // Nieuw
  },
  // ...
});
```

**Klaar!** De nieuwe taal verschijnt automatisch in de dropdown menu. Geen andere code wijzigingen nodig!

## Status

✅ **Geïmplementeerd:**
- Header (navigatie menu)
- Footer (links en copyright)
- CookieConsent (banner)
- HomePage (titel)
- App.tsx (pagina titels)

⏳ **Nog te doen:**
- Alle pagina componenten (CarbonPage, RiparianPage, etc.)
- Game componenten
- Error messages
- Form labels en placeholders

## Tips voor pagina componenten

Pagina componenten hebben veel tekst. Hier is een efficiënte aanpak:

1. **Identificeer alle hardcoded strings** in een pagina component
2. **Groepeer ze logisch** in de JSON (bijv. `carbonPage.page1.*`, `carbonPage.page2.*`)
3. **Vervang één voor één** de strings met `t('key')` calls
4. **Test beide talen** na elke wijziging

Voorbeeld voor CarbonPage:
- `carbonPage.page1.hint`
- `carbonPage.page1.checkAnswers`
- `carbonPage.page2.title`
- `carbonPage.ecosystemLabels.tropicalForests`
- etc.

