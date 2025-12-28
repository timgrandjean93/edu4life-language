import { useTranslation } from 'react-i18next';
import { useDailyCacheKey } from '../hooks/useDailyCacheKey';
import { addCacheBuster, getDailyCacheKey } from './cacheBusting';

/**
 * Get the localized version of an image path
 * Tries: image.nl.png, image.en.png, image.png (fallback)
 * 
 * @param basePath - Base image path (e.g., "/assets/images/welcome.png")
 * @param currentLanguage - Current language code (e.g., "nl", "en")
 * @returns Localized image path
 */
export function getLocalizedImagePath(basePath: string, currentLanguage: string): string {
  // Don't localize if already English (default)
  if (currentLanguage === 'en') {
    return basePath;
  }

  // Extract path parts
  const lastDotIndex = basePath.lastIndexOf('.');
  if (lastDotIndex === -1) {
    // No extension, return as is
    return basePath;
  }

  const pathWithoutExt = basePath.substring(0, lastDotIndex);
  const extension = basePath.substring(lastDotIndex);

  // Try localized version: image.nl.png
  const localizedPath = `${pathWithoutExt}.${currentLanguage}${extension}`;
  
  return localizedPath;
}

/**
 * Hook to get localized image path with automatic fallback
 * Returns the localized path - the browser will automatically fallback to English
 * if the localized version doesn't exist (404)
 */
export function useLocalizedImage(basePath: string): string {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  
  const dailyCacheKey = useDailyCacheKey();
  const localized = getLocalizedImagePath(basePath, currentLanguage);
  return addCacheBuster(localized, dailyCacheKey);
}

/**
 * Check if an image exists by trying to load it
 * Returns a promise that resolves to true if image exists
 */
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Get the best available image path with fallback
 * Tries localized version first, then falls back to English
 */
export async function getBestImagePath(
  basePath: string,
  currentLanguage: string
): Promise<string> {
  // If English, return base path
  if (currentLanguage === 'en') {
    return addCacheBuster(basePath, getDailyCacheKey());
  }

  // Try localized version
  const localizedPath = addCacheBuster(
    getLocalizedImagePath(basePath, currentLanguage),
    getDailyCacheKey()
  );
  const exists = await checkImageExists(localizedPath);
  
  if (exists) {
    return localizedPath;
  }

  // Fallback to English
  return addCacheBuster(basePath, getDailyCacheKey());
}

