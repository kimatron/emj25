import React, { useRef, useEffect } from 'react';

// This component relies on the hover-effect library being loaded globally from a script tag in index.html
declare var hoverEffect: any;

interface DistortionImageProps {
  src1: string;
  src2: string;
  displacementImage: string;
  intensity?: number;
  speedIn?: number;
  speedOut?: number;
}

const DistortionImage: React.FC<DistortionImageProps> = ({
  src1,
  src2,
  displacementImage,
  intensity = 0.3,
  speedIn = 1.6,
  speedOut = 1.6,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof hoverEffect === 'undefined') {
      console.warn("hover-effect library not loaded or container not found.");
      return;
    }

    // Clear any previous instance
    containerRef.current.innerHTML = '';

    const instance = new hoverEffect({
      parent: containerRef.current,
      intensity: intensity,
      image1: src1,
      image2: src2,
      displacementImage: displacementImage,
      imagesRatio: 800 / 600, // Corrected aspect ratio for 800x600 images
      speedIn: speedIn,
      speedOut: speedOut,
    });

    return () => {
        // A bit of a hack to clean up, as the library doesn't provide a destroy method.
        // This prevents memory leaks on component unmount / remount.
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }
    }

  }, [src1, src2, displacementImage, intensity, speedIn, speedOut]);

  return <div ref={containerRef} className="distortion-image absolute inset-0 w-full h-full" />;
};

export default DistortionImage;