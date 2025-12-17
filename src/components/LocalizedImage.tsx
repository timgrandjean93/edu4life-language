import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedImagePath, checkImageExists } from '../utils/localizedImage';

interface LocalizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string; // Optional explicit fallback
}

/**
 * LocalizedImage component that automatically loads the correct language version
 * Falls back to English if the localized version doesn't exist
 */
export const LocalizedImage: React.FC<LocalizedImageProps> = ({
  src,
  fallbackSrc,
  ...imgProps
}) => {
  const { i18n } = useTranslation();
  const [imageSrc, setImageSrc] = useState<string>(src);

  useEffect(() => {
    const loadImage = async () => {
      const currentLanguage = i18n.language || 'en';

      // If English, use base path
      if (currentLanguage === 'en') {
        setImageSrc(src);
        return;
      }

      // Try localized version
      const localizedPath = getLocalizedImagePath(src, currentLanguage);
      const exists = await checkImageExists(localizedPath);

      if (exists) {
        setImageSrc(localizedPath);
      } else {
        // Fallback to English (base path)
        setImageSrc(fallbackSrc || src);
      }
    };

    loadImage();
  }, [src, i18n.language, fallbackSrc]);

  return (
    <img
      {...imgProps}
      src={imageSrc}
      onError={(e) => {
        // If localized image fails to load, try fallback or base
        if (imageSrc !== src && imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc || src);
        }
        // Call original onError if provided
        if (imgProps.onError) {
          imgProps.onError(e);
        }
      }}
    />
  );
};

