'use client';

import { useEffect, useState } from 'react';

interface CommonImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
  fallbackSrc?: string;
  rounded?: string;
}

const CommonImage = ({
  src,
  alt = 'image',
  width = '100%',
  height = '160px',
  className = '',
  fallbackSrc = '/fallback.png',
  rounded = '',
}: CommonImageProps) => {
  const [imageSrc, setImageSrc] = useState(fallbackSrc);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      if (isMounted) {
        setImageSrc(src);
        setLoaded(true);
      }
    };

    img.onerror = () => {
      if (isMounted) {
        setImageSrc(fallbackSrc);
        setLoaded(true);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [src, fallbackSrc]);

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${rounded}`}
      style={{ width, height }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
};

export default CommonImage;
