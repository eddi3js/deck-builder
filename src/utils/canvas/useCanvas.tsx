import { useEffect, useState } from 'react';

interface CanvasProps {
    valid: boolean;
    remove: () => void;
    copy: () => void;
}

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

    return {
        drawGrid,
        showGrid,
        setShowGrid,
        action,
        setAction,
    };
}
