// IP-based geolocation for language detection
// Maps country codes to language codes
// If a language is not supported, defaults to 'en' (English)

const COUNTRY_TO_LANGUAGE: Record<string, string> = {
  // Netherlands (supported)
  'NL': 'nl',
  'BE': 'nl', // Belgium (Flanders)
  
  // English-speaking countries (supported)
  'GB': 'en', // United Kingdom
  'IE': 'en', // Ireland
  
  // All other European countries (default to English until their languages are added)
  'AL': 'en', // Albania
  'AD': 'en', // Andorra
  'AT': 'en', // Austria (will be 'de' when German is added)
  'BY': 'en', // Belarus
  'BA': 'en', // Bosnia and Herzegovina
  'BG': 'en', // Bulgaria
  'HR': 'hr', // Croatia
  'CY': 'en', // Cyprus
  'CZ': 'en', // Czech Republic
  'DK': 'en', // Denmark
  'EE': 'en', // Estonia
  'FI': 'en', // Finland
  'FR': 'en', // France (will be 'fr' when French is added)
  'DE': 'en', // Germany (will be 'de' when German is added)
  'GR': 'en', // Greece
  'HU': 'en', // Hungary (will be 'hu' when Hungarian is added)
  'IS': 'en', // Iceland
  'IT': 'en', // Italy (will be 'it' when Italian is added)
  'LV': 'en', // Latvia
  'LI': 'en', // Liechtenstein
  'LT': 'en', // Lithuania
  'LU': 'en', // Luxembourg
  'MT': 'en', // Malta
  'MD': 'en', // Moldova
  'MC': 'en', // Monaco
  'ME': 'en', // Montenegro
  'MK': 'en', // North Macedonia
  'NO': 'en', // Norway
  'PL': 'en', // Poland (will be 'pl' when Polish is added)
  'PT': 'en', // Portugal
  'RO': 'ro', // Romania
  'SM': 'en', // San Marino
  'RS': 'en', // Serbia
  'SK': 'sk', // Slovakia
  'SI': 'en', // Slovenia
  'ES': 'en', // Spain (will be 'es' when Spanish is added)
  'SE': 'en', // Sweden
  'CH': 'en', // Switzerland
  'UA': 'en', // Ukraine
  'VA': 'en', // Vatican City
  
  // Non-European English-speaking countries
  'US': 'en', // United States
  'AU': 'en', // Australia
  'NZ': 'en', // New Zealand
  'CA': 'en', // Canada
};

// Maps country codes to country names (in English)
const COUNTRY_NAMES: Record<string, string> = {
  // European countries
  'AL': 'Albania',
  'AD': 'Andorra',
  'AT': 'Austria',
  'BY': 'Belarus',
  'BE': 'Belgium',
  'BA': 'Bosnia and Herzegovina',
  'BG': 'Bulgaria',
  'HR': 'Croatia',
  'CY': 'Cyprus',
  'CZ': 'the Czech Republic',
  'DK': 'Denmark',
  'EE': 'Estonia',
  'FI': 'Finland',
  'FR': 'France',
  'DE': 'Germany',
  'GR': 'Greece',
  'HU': 'Hungary',
  'IS': 'Iceland',
  'IE': 'Ireland',
  'IT': 'Italy',
  'LV': 'Latvia',
  'LI': 'Liechtenstein',
  'LT': 'Lithuania',
  'LU': 'Luxembourg',
  'MT': 'Malta',
  'MD': 'Moldova',
  'MC': 'Monaco',
  'ME': 'Montenegro',
  'NL': 'the Netherlands',
  'MK': 'North Macedonia',
  'NO': 'Norway',
  'PL': 'Poland',
  'PT': 'Portugal',
  'RO': 'Romania',
  'SM': 'San Marino',
  'RS': 'Serbia',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'ES': 'Spain',
  'SE': 'Sweden',
  'CH': 'Switzerland',
  'UA': 'Ukraine',
  'GB': 'the United Kingdom',
  'VA': 'Vatican City',
  
  // Non-European countries
  'US': 'the United States',
  'AU': 'Australia',
  'NZ': 'New Zealand',
  'CA': 'Canada',
};

export function getCountryName(countryCode: string): string {
  return COUNTRY_NAMES[countryCode] || countryCode;
}

/**
 * Detect language based on IP geolocation
 * Returns both language code and country code
 * Falls back to browser language if geolocation fails
 */
export async function detectLanguageFromIP(): Promise<{ languageCode: string | null; countryCode: string | null }> {
  try {
    // Use ipapi.co free tier (1000 requests/day)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Geolocation API failed');
    }

    const data = await response.json();
    const countryCode = data.country_code;

    if (countryCode) {
      // If country is in mapping, use that language (defaults to 'en' for unsupported languages)
      // If country is not in mapping, default to English
      const languageCode = COUNTRY_TO_LANGUAGE[countryCode] || 'en';
      return {
        languageCode: languageCode,
        countryCode: countryCode,
      };
    }

    // Fallback: default to English if no country code detected
    return {
      languageCode: 'en',
      countryCode: null,
    };
  } catch (error) {
    console.warn('Failed to detect language from IP:', error);
    // Fallback to English
    return {
      languageCode: 'en',
      countryCode: null,
    };
  }
}

