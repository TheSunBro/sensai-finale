'use client';

import { useEffect, useState, useRef } from 'react';

interface UseCanvasImagesOptions {
    frameCount: number;
    basePath?: string;
    format?: (index: number) => string;
}

export const useCanvasImages = ({
    frameCount,
    basePath = '/sequence',
    format = (i) => `frame_${i.toString().padStart(3, '0')}.jpg`
}: UseCanvasImagesOptions) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const loadedRef = useRef(new Array(frameCount).fill(false));

    useEffect(() => {
        const imgs: HTMLImageElement[] = [];
        let count = 0;

        // Pre-fill array to maintain order
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = `${basePath}/${format(i)}`;
            img.onload = () => {
                loadedRef.current[i] = true;
                count++;
                setLoadedCount(c => c + 1);
            };
            imgs.push(img);
        }

        setImages(imgs);

        return () => {
            // Cleanup if needed (rarely for Image objects but good practice if we were using blobs)
            imgs.forEach(img => {
                if (img) img.onload = null;
            });
        };
    }, [frameCount, basePath]);

    // Helper to find closest loaded frame if current isn't ready
    const getFrame = (index: number) => {
        const idx = Math.min(Math.floor(index), frameCount - 1);

        // If exact frame is loaded, return it
        if (loadedRef.current[idx]) return images[idx];

        // Search backwards for closest loaded frame
        for (let i = idx; i >= 0; i--) {
            if (loadedRef.current[i]) return images[i];
        }

        // If nothing before, search forward (unlikely to be useful but complete)
        for (let i = idx; i < frameCount; i++) {
            if (loadedRef.current[i]) return images[i];
        }

        return null;
    };

    return {
        images,
        progress: loadedCount / frameCount,
        isLoading: loadedCount < frameCount,
        getFrame
    };
};
