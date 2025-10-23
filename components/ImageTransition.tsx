import React, { useRef, useEffect } from 'react';
import { Photo } from '../types';

declare var hoverEffect: any;

// A custom hook to get the previous value of a prop or state
function usePrevious<T>(value: T): T | undefined {
  // FIX: Pass an initial value of `undefined` to `useRef` and explicitly type the ref to hold `T | undefined`.
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface ImageTransitionProps {
    photo: Photo;
    direction: number;
}

const ImageTransition: React.FC<ImageTransitionProps> = ({ photo, direction }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<any>(null);
    const prevPhoto = usePrevious(photo);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || typeof hoverEffect === 'undefined') return;

        // Initialize on first render
        if (!instanceRef.current) {
            instanceRef.current = new hoverEffect({
                parent: container,
                intensity: 0.2,
                image1: photo.src,
                image2: photo.src, // Start with the same image
                displacementImage: 'https://res.cloudinary.com/aivan/image/upload/v1556643242/fluid.jpg',
                angle: Math.PI / 4,
                speedIn: 1.2,
                speedOut: 1.2,
            });
        }
        
        // Handle subsequent transitions
        if (prevPhoto && prevPhoto.id !== photo.id) {
            const instance = instanceRef.current;
            
            // Set the new images
            // TextureLoader is part of Three.js, which is loaded globally
            const loader = new (window as any).THREE.TextureLoader();
            const texture1 = loader.load(prevPhoto.src, instance.render);
            const texture2 = loader.load(photo.src, instance.render);

            instance.material.uniforms.texture1.value = texture1;
            instance.material.uniforms.texture2.value = texture2;

            // Trigger the animation
            if (direction > 0) {
                 instance.next();
            } else {
                 instance.previous();
            }
        }
        
        return () => {
            // Cleanup logic if component unmounts
            // instanceRef.current?.destroy(); // If library had a destroy method
        }

    }, [photo, direction, prevPhoto]);

    return (
        <div 
            ref={containerRef} 
            className="absolute inset-0 w-full h-full max-w-[90vw] max-h-[90vh] m-auto" 
        />
    );
};

export default ImageTransition;