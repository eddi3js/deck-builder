/* eslint-disable @typescript-eslint/no-var-requires */
import { useCardTemplateStore } from '@/stores/cardTemplates';
import createElement from '@/utils/canvas/createElement';
import getElementAtPosition, {
    adjustElementCoordinates,
    cursorForPosition,
    ElementObject,
    resizedCoordinates,
    SelectedElement,
} from '@/utils/canvas/getElementAtPosition';
import { radiusHash, RadiusRange } from '@/utils/canvas/ranges';
import React from 'react';
import Toolbar from './toolbar';
const rough = require('roughjs/bundled/rough.cjs');

export default function TemplatePreview() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = React.useState<number[]>([0, 0]);
    const [action, setAction] = React.useState<string>('none');

    const selectedElRef = React.useRef<ElementObject | null>(null);
    const elementsRef = React.useRef<ElementObject[]>([]);

    const {
        ratios,
        cardRadius: cardBevel,
        selectedElement,
        elementType,
        changeElementType,
        elements,
        removeElement,
        setElements,
        setSelectedElement,
        changeElementType: handleSwitchElementType,
    } = useCardTemplateStore();

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Delete' && selectedElRef.current) {
            removeElement(selectedElRef.current.index);
            const elementsWithoutDeleted = elementsRef.current.splice(
                selectedElRef.current.index,
                1
            );
            const updatedElements = elementsWithoutDeleted.map((el, index) => ({
                ...el,
                index,
            }));
            elementsRef.current = updatedElements;

            setSelectedElement(null);
            selectedElRef.current = null;
            setAction('none');
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'v' && selectedElRef.current) {
            const { roughElement, x1, x2, y1, y2 } = selectedElRef.current;
            const copiedElement = {
                roughElement,
                x1: x1 + 5,
                x2: x2 + 5,
                y1: y1 + 5,
                y2: y2 + 5,
                index: elementsRef.current?.length ?? 0,
            };
            setElements([...elementsRef.current, copiedElement]);
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    React.useEffect(() => {
        // set initial canvas size
        if (canvasRef.current && canvasSize[0] === 0) {
            const canvasContainer = document.getElementById('canvas-container');
            console.log(canvasContainer, 'canvasContainer');
            const width = canvasContainer?.clientWidth as number;
            const height = canvasContainer?.clientHeight as number;

            setCanvasSize([width, height]);
        }
    }, [canvasRef, canvasSize]);

    React.useEffect(() => {
        if (canvasRef.current) {
            window.addEventListener('resize', () => {
                const canvasWidth = canvasRef?.current?.clientWidth;
                const canvasHeight = canvasRef?.current?.clientHeight;

                if (canvasWidth && canvasHeight) {
                    setCanvasSize([canvasWidth, canvasHeight]);
                }
            });

            return () => {
                window.removeEventListener('resize', () => {
                    setCanvasSize([0, 0]);
                });
            };
        }
    }, [canvasRef, ratios]);

    React.useEffect(() => {
        elementsRef.current = elements;
    }, [elements]);

    React.useLayoutEffect(() => {
        if (canvasRef.current) {
            const [width, height] = [
                canvasRef.current?.clientWidth ?? 2.5,
                canvasRef.current?.clientHeight ?? 3.5,
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

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const clientX = event.clientX - canvasRef.current.offsetLeft ?? 0;
        const clientY = event.clientY - canvasRef.current.offsetTop;
        const element = getElementAtPosition(clientX, clientY, elements);

        if (!element && elementType === 'select') {
            setSelectedElement(null);
            selectedElRef.current = null;
        }

        if (element && elementType === 'rectangle') {
            setSelectedElement(element);
            selectedElRef.current = element;
            changeElementType('select');
            return;
        }

        if (element && elementType === 'remove') {
            const newElements = elements.filter(el => el.index !== element.index);
            setElements(newElements);
        }

        if (element && elementType === 'select') {
            const mouseX = clientX - element.x1;
            const mouseY = clientY - element.y1;
            const selectedEl = {
                ...element,
                offsetX: mouseX,
                offsetY: mouseY,
            } as SelectedElement;

            setSelectedElement(selectedEl);
            selectedElRef.current = selectedEl;

            if (element.position === 'inside') {
                setAction('moving');
            } else {
                setAction('resizing');
            }
        }

        if (elementType !== 'remove' && elementType !== 'select') {
            const id = elements.length;
            const element = createElement(
                id,
                clientX,
                clientY,
                clientX,
                clientY,
                'rectangle'
            );

            setElements([...elements, element]);
            setSelectedElement(element);
            selectedElRef.current = element;
            setAction('drawing');
        }
    };

    const handleMouseUp = () => {
        const i = selectedElement?.index;
        if (action === 'drawing' || action === 'resizing') {
            const {
                index,
                roughElement: { shape },
            } = elements[i as number] as ElementObject;
            if (index) {
                const { x1, y1, x2, y2 } = adjustElementCoordinates(
                    elements[i as number] as ElementObject
                );
                updateElement(index, x1, y1, x2, y2, shape as 'rectangle' | 'circle');
                selectedElRef.current = createElement(index, x1, y1, x2, y2, 'rectangle');
            }
        }
        setAction('none');
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!canvasRef.current) return;

        const { clientX, clientY } = event;
        const mouseX = clientX - canvasRef.current.offsetLeft;
        const mouseY = clientY - canvasRef.current.offsetTop;
        const e = getElementAtPosition(mouseX, mouseY, elements);

        if (
            elementType === 'select' ||
            action === 'resizing' ||
            elementType === 'remove'
        ) {
            event.target.style.cursor = e
                ? cursorForPosition(
                      e.position as string,
                      Boolean(elementType === 'remove')
                  )
                : 'default';
        }

        if (action === 'drawing') {
            const index = elements.length - 1;
            const { x1, y1 } = elements[index] as ElementObject;
            updateElement(index, x1, y1, mouseX, mouseY, 'rectangle');
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
            } = selectedElement as SelectedElement;

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
        } else if (action === 'resizing') {
            const {
                index: id,
                roughElement: { shape },
                position,
                ...coords
            } = selectedElement as SelectedElement;

            const { x1, x2, y1, y2 } = resizedCoordinates(
                mouseX,
                mouseY,
                position,
                coords
            );
            updateElement(id, x1, y1, x2, y2, shape as 'circle' | 'rectangle');
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
        elementsRef.current = updatedElements;
        setElements(updatedElements);
    };

    return (
        <div style={{ minWidth: 500 }}>
            <Toolbar
                elementsLength={elements.length}
                activeElementType={elementType}
                handleSwitchElementType={handleSwitchElementType}
            />
            <div
                id="canvas-container"
                className={`border border-white/[0.1] ${
                    radiusHash[cardBevel as RadiusRange]
                } object-contain flex flex-col justify-center items-center`}
                style={{
                    maxHeight: 'calc(100vh - 300px)',
                    aspectRatio: `${ratios[0]}/${ratios[1]}`,
                    backgroundImage:
                        'url(https://c1.scryfall.com/file/scryfall-cards/large/front/9/9/994bb02d-6fef-454b-b1b1-d3d1af8dcd1a.jpg?1562055453)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
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
        </div>
    );
}
