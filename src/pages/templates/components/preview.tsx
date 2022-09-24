/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useCardTemplateStore } from '@/stores/cardTemplates';
import aspectRatio, { getCanvasSize } from '@/utils/canvas/aspectRatio';
import createElement from '@/utils/canvas/createElement';
import getElementAtPosition, {
    adjustElementCoordinates,
    cursorForPosition,
    ElementObject,
    resizedCoordinates,
    SelectedElement,
} from '@/utils/canvas/getElementAtPosition';
import { radiusHash, RadiusRange } from '@/utils/canvas/ranges';
import useCanvasEvents from '@/utils/canvas/useCanvas';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import Toolbar from './toolbar';
const rough = require('roughjs/bundled/rough.cjs');

export default function TemplatePreview() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const selectedElRef = useRef<ElementObject | null>(null);
    const elementsRef = useRef<ElementObject[]>([]);

    const {
        ratios,
        cardBackgroundColor,
        cardRadius,
        selectedElement,
        elementType,
        changeElementType,
        elements,
        removeElement,
        setElements,
        setSelectedElement,
        changeElementType: handleSwitchElementType,
    } = useCardTemplateStore();

    const { width: canvasWidth, height: canvasHeight } = getCanvasSize(ratios);

    const { canvasSize, showGrid, setShowGrid, action, setAction } = useCanvasEvents({
        canvasRef,
        containerRef: canvasContainerRef,
        keybindings: {
            valid: Boolean(selectedElRef.current),
            delete: () => {
                if (!selectedElRef.current) return null;
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
            },
            copy: () => {
                if (!selectedElRef.current) return null;
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
            },
        },
    });

    useEffect(() => {
        elementsRef.current = elements;
    }, [elements]);

    useLayoutEffect(() => {
        if (canvasRef.current) {
            const [width, height] = [
                canvasRef.current?.clientWidth ?? 2.5,
                canvasRef.current?.clientHeight ?? 3.5,
            ];
            const ctx = canvasRef.current.getContext('2d');

            if (ctx) {
                ctx.clearRect(0, 0, width, height);
                if (showGrid) {
                    // draw grid lines
                    ctx.beginPath();
                    ctx.strokeStyle = '#1C1C1C';
                    ctx.lineWidth = 1;
                    for (let i = 0; i < canvasWidth!; i += 50) {
                        ctx.moveTo(i, 0);
                        ctx.lineTo(i, canvasHeight!);
                    }
                    for (let i = 0; i < canvasHeight!; i += 50) {
                        ctx.moveTo(0, i);
                        ctx.lineTo(canvasWidth!, i);
                    }
                    ctx.stroke();
                }

                const rc = rough.canvas(canvasRef.current);

                elements.forEach(({ roughElement }: ElementObject) => {
                    rc?.draw(roughElement);
                });
            }
        }
    });

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
            <div className="flex flex-row gap-10 my-2">
                <div className="flex flex-row gap-2 items-center text-sm text-gray-300">
                    <input
                        type="checkbox"
                        checked={showGrid}
                        onChange={() => setShowGrid(!showGrid)}
                    />
                    <label>Show Grid</label>
                </div>
            </div>
            <div
                id="canvas-container"
                ref={canvasContainerRef}
                className={`${
                    radiusHash[cardRadius as RadiusRange]
                } object-contain shadow shadow-gray-700 w-fit ring-inset flex flex-col justify-center items-center`}
                style={{
                    backgroundColor: cardBackgroundColor,
                }}
            >
                <canvas
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    width={getCanvasSize(ratios).width}
                    height={getCanvasSize(ratios).height}
                    ref={canvasRef}
                />
            </div>
        </div>
    );
}
