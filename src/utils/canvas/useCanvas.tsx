import { useEffect, useState } from 'react';
import fileExtention from 'file-extension';
import canvasContext from 'canvas-context';

interface CanvasProps {
    valid: boolean;
    remove: () => void;
    copy: () => void;
}

const getMimeType = (filename: string) => {
    const ext = fileExtention(filename);
    return ['jpg', 'jpeg'].includes(ext) ? 'image/jpeg' : `image/${ext}`;
};

export default function useCanvasEvents({ valid, remove, copy }: CanvasProps) {
    const [showGrid, setShowGrid] = useState<boolean>(true);
    const [action, setAction] = useState<string>('none');

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Delete' && valid) {
            remove();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'v' && valid) {
            copy();
        }
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.beginPath();
        ctx.strokeStyle = '#eeeeee';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 50) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
        }
        for (let i = 0; i < height; i += 50) {
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
        }
        ctx.stroke();
    };

    const createScreenshot = async (canvas: HTMLCanvasElement) => {
        const date = new Date();
        // const {context} = canvasContext('2d');
        const filename = `Screenshot-${date.toISOString().slice(0, 10)} at ${date
            .toTimeString()
            .slice(0, 8)
            .replace('/:g', '.')}.png`;

        return new Promise(resolve => {
            canvas.toBlob(
                blob => {
                    resolve(blob);
                },
                getMimeType(filename),
                1
            );
            canvas.toBlob(function (blob) {
                const link = URL.createObjectURL(blob as Blob);
                console.log(blob);
                console.log(link); // this line should be here
            }, 'image/png');
        });
    };

    return {
        drawGrid,
        showGrid,
        setShowGrid,
        action,
        setAction,
        createScreenshot,
    };
}
