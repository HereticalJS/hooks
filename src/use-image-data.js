import { useState, useEffect } from 'react';

export function useImageData(url) {
    const [imageData, setImageData] = useState();

    useEffect(() => {
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;

        const f = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            setImageData(ctx.getImageData(0, 0, img.width, img.height));
            img.removeEventListener('load', f);
        };

        img.addEventListener('load', f, false);

        return () => {
            img.removeEventListener('load', f);
            img = undefined;
        };
    }, [url]);

    return imageData;
}

export default useImageData;
