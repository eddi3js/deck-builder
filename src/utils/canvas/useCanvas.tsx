import { useCardTemplateStore } from '@/stores/cardTemplates';
import { useEffect, useState } from 'react';

interface CanvasProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    keybindings: {
        valid: boolean;
        delete: () => void;
        copy: () => void;
    };
}

export default function useCanvasEvents({
    canvasRef,
    keybindings,
    containerRef,
}: CanvasProps) {
    const [canvasSize, setCanvasSize] = useState<number[]>([0, 0]);
    const [showGrid, setShowGrid] = useState<boolean>(false);
    const [action, setAction] = useState<string>('none');

    const canvasContainer = containerRef.current;
    const { ratios } = useCardTemplateStore();

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Delete' && keybindings.valid) {
            keybindings.delete();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'v' && keybindings.valid) {
            keybindings.copy();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        if (canvasRef.current && canvasSize[0] === 0) {
            changeCanvasSize();
        }
    }, [canvasRef]);

    useEffect(() => {
        if (canvasRef.current) {
            changeCanvasSize();

            window.addEventListener('resize', () => {
                changeCanvasSize();
            });

            return () => {
                window.removeEventListener('resize', () => {
                    setCanvasSize([0, 0]);
                });
            };
        }
    }, [canvasRef, ratios]);

    const changeCanvasSize = () => {
        const width = canvasContainer?.clientWidth as number;
        const height = canvasContainer?.clientHeight as number;
        setCanvasSize([width, height]);
    };

    return {
        canvasSize,
        showGrid,
        setShowGrid,
        action,
        setAction,
    };
}
