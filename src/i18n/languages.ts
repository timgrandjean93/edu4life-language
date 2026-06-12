// Central list of available languages
// Add new languages here and they will automatically appear in the dropdown

export interface Language {
  code: string;
  name: string; // Native name of the language
  flag?: string; // Optional emoji flag
}

export const AVAILABLE_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sr', name: 'Srpski', flag: '🇷🇸' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'bs', name: 'Bosanski', flag: '🇧🇦' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  // Add more languages here as they become available:
  // { code: 'fr', name: 'Français', flag: '🇫🇷' },
  // { code: 'es', name: 'Español', flag: '🇪🇸' },
  // { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  // { code: 'pl', name: 'Polski', flag: '🇵🇱' },
];

/**
 * Languages as shown in dropdowns.
 * We keep English pinned to the top, then sort the rest by their native names.
 */
export const getOrderedLanguages = (): Language[] => {
  return [...AVAILABLE_LANGUAGES].sort((a, b) => {
    if (a.code === 'en') return -1;
    if (b.code === 'en') return 1;
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
  });
};

export const getLanguageName = (code: string): string => {
  const lang = AVAILABLE_LANGUAGES.find(l => l.code === code);
  return lang?.name || code.toUpperCase();
};

