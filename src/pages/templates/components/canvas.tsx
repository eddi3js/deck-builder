import aspectRatio from '@/utils/canvas/aspectRatio';
import createElement from '@/utils/canvas/createElement';
import getElementAtPosition, {
    adjustElementCoordinates,
    ElementObject,
} from '@/utils/canvas/getElementAtPosition';
import React from 'react';
import { ElementTypes } from '../new';
const rough = require('roughjs/bundled/rough.cjs');
interface TemplatePreviewProps {
    ratios: number[];
    elementType: ElementTypes;
}

export default function TemplatePreview({
    ratios,
    elementType,
}: TemplatePreviewProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = React.useState<number[]>([0, 0]);
    const [action, setAction] = React.useState<string>('none');
    const [elements, setElements] = React.useState<ElementObject[]>([]);
    const [selectedElement, setSelectedElement] =
        React.useState<ElementObject | null>(null);

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
                    rc?.draw(roughElement);
                });
            }
        }
    }, [elements]);

    const aspectWidth = aspectRatio(ratios, 'width');
    const aspectHeight = aspectRatio(ratios, 'height');

    const handleMouseDown = (event: React.MouseEvent) => {
        const clientX = event.clientX - canvasRef.current!.offsetLeft;
        const clientY = event.clientY - canvasRef.current!.offsetTop;

        if (elementType === 'select') {
            const element = getElementAtPosition(clientX, clientY, elements);

            if (element) {
                const mouseX = clientX - element.x1;
                const mouseY = clientY - element.y1;

                setSelectedElement({
                    ...element,
                    offsetX: mouseX,
                    offsetY: mouseY,
                });
                setAction('moving');
            }
        } else {
            const id = elements.length;
            const element = createElement(
                id,
                clientX,
                clientY,
                clientX,
                clientY,
                elType
            );
            setElements([...elements, element]);

            setAction('drawing');
        }
    };

    const handleMouseUp = () => {
        if (action === 'drawing') {
            const i = elements.length - 1;
            const {
                index,
                roughElement: { shape },
            } = elements[i] as ElementObject;
            if (index) {
                const { x1, y1, x2, y2 } = adjustElementCoordinates(
                    elements[i] as ElementObject
                );
                updateElement(
                    index,
                    x1,
                    y1,
                    x2,
                    y2,
                    shape as 'rectangle' | 'circle'
                );
            }
        }

        setAction('none');
        setSelectedElement(null);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        const { clientX, clientY } = event;
        const mouseX = clientX - canvasRef.current!.offsetLeft;
        const mouseY = clientY - canvasRef.current!.offsetTop;

        if (elementType === 'select') {
            event.target.style.cursor = getElementAtPosition(
                mouseX,
                mouseY,
                elements
            )
                ? 'move'
                : 'default';
        }

        if (action === 'drawing') {
            const index = elements.length - 1;
            const { x1, y1 } = elements[index] as ElementObject;
            updateElement(index, x1, y1, mouseX, mouseY, elType);
        } else if (action === 'moving') {
            const {
                index: id,
                roughElement: { shape },
                offsetX,
                offsetY,
                x1,
                x2,
                y1,
                y2,
            } = selectedElement as ElementObject;

            const width = x2 - x1;
            const height = y2 - y1;

            const newX = mouseX - offsetX;
            const newY = mouseY - offsetY;

            updateElement(
                id,
                newX,
                newY,
                newX + width,
                newY + height,
                shape as 'circle' | 'rectangle'
            );
        }
    };

    const updateElement = (
        index: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        type: 'circle' | 'rectangle'
    ) => {
        const updatedElement = createElement(index, x1, y1, x2, y2, type);

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
