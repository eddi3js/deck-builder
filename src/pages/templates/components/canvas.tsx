import aspectRatio from '@/utils/aspectRatio';
import createElement, { generator } from '@/utils/canvas/createElement';
import React from 'react';
const rough = require('roughjs/bundled/rough.cjs');

interface TemplatePreviewProps {
    ratios: number[];
}

interface ElementObject {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    roughElement: {
        shape: string;
        sets: any[];
        options: any;
    };
}

export type ElementTypes = 'circle' | 'rectangle' | 'resize' | 'select';

export default function TemplatePreview({ ratios }: TemplatePreviewProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = React.useState<number[]>([0, 0]);
    const [drawing, setDrawing] = React.useState<boolean>(false);
    const [elementType, setElementType] =
        React.useState<ElementTypes>('rectangle');
    const [elements, setElements] = React.useState<ElementObject[]>([]);

    const elType = elementType === 'circle' ? 'circle' : 'rectangle';

    React.useEffect(() => {
        if (canvasRef.current && canvasSize[0] === 0) {
            const canvasContainer = document.getElementById('canvas-container');
            const width = canvasContainer?.clientWidth as number;
            const height = canvasContainer?.clientHeight as number;

            setCanvasSize([width, height]);
        }
    }, [canvasRef, canvasSize]);

    React.useEffect(() => {
        if (canvasRef.current) {
            window.addEventListener('resize', () => {
                setCanvasSize([
                    canvasRef.current!.clientWidth,
                    canvasRef.current!.clientHeight,
                ]);
            });

            return () => {
                window.removeEventListener('resize', () => {
                    setCanvasSize([
                        canvasRef.current!.clientWidth,
                        canvasRef.current!.clientHeight,
                    ]);
                });
            };
        }
    }, [canvasRef]);

    React.useLayoutEffect(() => {
        if (canvasRef.current) {
            const [width, height] = [
                canvasRef.current!.clientWidth,
                canvasRef.current!.clientHeight,
            ];
            const ctx = canvasRef.current.getContext('2d');

            if (ctx) {
                ctx.clearRect(0, 0, width, height);

                const rc = rough.canvas(canvasRef.current);

                elements.forEach(({ roughElement }: ElementObject) => {
                    // const el = createElement(x1, y1, x2, y2, 'rectangle');
                    // console.log('el', el);
                    rc?.draw(roughElement);
                });
            }
        }
    }, [elements]);

    const aspectWidth = aspectRatio(ratios, 'width');
    const aspectHeight = aspectRatio(ratios, 'height');

    const handleMouseDown = (event: React.MouseEvent) => {
        setDrawing(true);

        const { clientX, clientY } = event;
        const mouseX = clientX - canvasRef.current!.offsetLeft;
        const mouseY = clientY - canvasRef.current!.offsetTop;

        console.log('mouseX', mouseX);
        console.log('mouseY', mouseY);

        const element = createElement(mouseX, mouseY, mouseX, mouseY, elType);

        setElements([...elements, element]);
    };

    const handleMouseUp = () => {
        setDrawing(false);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!drawing) return;

        const { clientX, clientY } = event;
        const mouseX = clientX - canvasRef.current!.offsetLeft;
        const mouseY = clientY - canvasRef.current!.offsetTop;

        const index = elements.length - 1;
        const { x1, y1 } = elements[index] as ElementObject;
        const updatedElement = createElement(x1, y1, mouseX, mouseY, elType);

        const updatedElements = [...elements];
        updatedElements[index] = updatedElement;
        setElements(updatedElements);
    };

    return (
        <div
            id="canvas-container"
            className="border border-gray-600 rounded self-center object-contain flex flex-col justify-center items-center"
            style={{
                maxHeight: 'calc(100vh - 300px)',
                aspectRatio: `${aspectWidth}/${aspectHeight}`,
            }}
        >
            <canvas
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                width={canvasSize[0]}
                height={canvasSize[1]}
                ref={canvasRef}
            />
        </div>
    );
}
