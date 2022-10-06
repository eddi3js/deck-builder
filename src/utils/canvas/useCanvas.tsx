import { useCardTemplateStore } from '@/stores/cardTemplates';
import { useEffect, useState } from 'react';
// import fileExtention from 'file-extension';

interface CanvasProps {
    valid: boolean;
    remove: () => void;
    copy: () => void;
    ctx?: CanvasRenderingContext2D | undefined;
}

export default function useCanvasEvents({ valid, remove, ctx }: CanvasProps) {
    const [showGrid, setShowGrid] = useState<boolean>(true);
    const [action, setAction] = useState<string>('none');
    const { selectedElement } = useCardTemplateStore();

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        if (!showGrid) {
            ctx?.clearRect(0, 0, 1000, 1000);
        } else if (ctx && showGrid) {
            drawGrid(ctx, ctx?.canvas.width, ctx?.canvas.height);
        }
    }, [showGrid, ctx]);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Delete' && valid && selectedElement) {
            remove();
        }
    };

    const drawImage = (img: File) => {
        if (!ctx) return;

        // get the blob URL of the image
        const url = URL.createObjectURL(img);
        const image = new Image();

        image.src = url;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
        };
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.beginPath();
        ctx.strokeStyle = '#eeeeee';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 20) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
        }
        for (let i = 0; i < height; i += 20) {
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
        }
        ctx.stroke();
    };

    // TODO: finish this functionality
    // const getMimeType = (filename: string) => {
    //     const ext = fileExtention(filename);
    //     return ['jpg', 'jpeg'].includes(ext) ? 'image/jpeg' : `image/${ext}`;
    // };
    // const createScreenshot = async (canvas: HTMLCanvasElement) => {
    //     const date = new Date();
    //     const filename = `Screenshot-${date.toISOString().slice(0, 10)} at ${date
    //         .toTimeString()
    //         .slice(0, 8)
    //         .replace('/:g', '.')}.png`;
    //     const link = document.createElement('a');

    //     return new Promise(resolve => {
    //         canvas.toBlob(
    //             blob => {
    //                 resolve(blob);
    //             },
    //             getMimeType(filename),
    //             1
    //         );
    //         canvas.toBlob(function (blob) {
    //             link.href = URL.createObjectURL(blob as Blob);
    //             console.log(link.href);
    //             console.log(blob);
    //         }, 'image/png');
    //         console.log(link, 'THE LINK');

    //         resolve(link.href);
    //     });
    // };

    return {
        drawGrid,
        drawImage,
        showGrid,
        setShowGrid,
        action,
        setAction,
    };
}
