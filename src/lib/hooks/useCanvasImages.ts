import { useState, useEffect } from 'react';

export function useCanvasImages(frameCount: number) {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let canceled = false;

        const loadImages = async () => {
            const promises: Promise<HTMLImageElement>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    const filename = `frame_${String(i).padStart(3, '0')}.jpg`;
                    img.src = `/images/sequence/${filename}`;

                    // Critical 10x DEV Feature: Explicit Decode
                    // This forces the browser to decode the image data off the main thread (if supported)
                    // and ensures it's ready for immediate painting.
                    img.decode()
                        .then(() => resolve(img))
                        .catch((err) => {
                            // If decode fails (e.g. browser support), fall back to onload
                            // But still logging to know.
                            console.warn(`Failed to decode frame ${i}`, err);
                            // Fallback to basic load if decode fails
                            if (img.complete) resolve(img);
                            else {
                                img.onload = () => resolve(img);
                                img.onerror = reject;
                            }
                        });
                });
                promises.push(promise);
            }

            try {
                const loadedImages = await Promise.all(promises);
                if (!canceled) {
                    setImages(loadedImages);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Failed to load sequence images", error);
            }
        };

        loadImages();

        return () => {
            canceled = true;
            // setLoaded(false); // Optional: Keeping old frames might be better than flash
        };
    }, [frameCount]);

    return { images, loaded };
}
