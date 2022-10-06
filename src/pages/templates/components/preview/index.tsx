/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import { ElementObject } from '@/server/models/canvas';
import { useCardTemplateStore } from '@/stores/cardTemplates';
import { getCanvasSize } from '@/utils/canvas/aspectRatio';
import useCreateElement from '@/utils/canvas/createElement';
import getElementAtPosition, {
    adjustElementCoordinates,
    cursorForPosition,
    resizedCoordinates,
} from '@/utils/canvas/getElementAtPosition';
import { radiusHash, RadiusRange } from '@/utils/canvas/ranges';
import useCanvasEvents from '@/utils/canvas/useCanvas';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { RoughCanvas } from 'roughjs/bin/canvas';
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
        cardBackgroundImage,
        cardRadius,
        selectedElement,
        elementType,
        changeElementType,
        elements,
        removeElement,
        setElements,
        setContext,
        setSelectedElement,
        updateStrokeColor,
    } = useCardTemplateStore();

    const { width: canvasWidth, height: canvasHeight } = getCanvasSize(ratios);
    const { createElement, fillColor } = useCreateElement();

    useEffect(() => updateStrokeColor(fillColor()), [elements.length]);

    const handleCopy = () => {
        if (!(selectedElRef.current as ElementObject)?.roughElement) return null;
        const { roughElement, x1, x2, y1, y2 } = selectedElRef.current as ElementObject;
        const copiedElement: ElementObject = {
            roughElement,
            x1: x1 + 5,
            x2: x2 + 5,
            y1: y1 + 5,
            y2: y2 + 5,
            index: elementsRef.current?.length ?? 0,
            metadata: {
                type: 'string',
                name: '',
            },
        };
        setElements([...elementsRef.current, copiedElement]);
    };

    const handleDelete = () => {
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
    };

    const { showGrid, action, setAction, drawGrid, setShowGrid } = useCanvasEvents({
        valid: Boolean(selectedElRef.current),
        remove: handleDelete,
        copy: handleCopy,
        ctx: canvasRef.current?.getContext('2d') as CanvasRenderingContext2D,
    });

    useEffect(() => {
        elementsRef.current = elements;
    }, [elements]);

    useEffect(() => {
        if (canvasContainerRef.current) {
            const container = document.getElementById('canvas-container');
            if (container) {
                if (cardBackgroundImage === null) {
                    container.style.backgroundImage = '';
                    return;
                }

                // get url of image
                const url =
                    typeof cardBackgroundImage === 'string'
                        ? cardBackgroundImage
                        : URL.createObjectURL(cardBackgroundImage);
                container.style.backgroundImage = `url(${url})`;
            }
        }
    }, [cardBackgroundImage, canvasContainerRef]);

    useLayoutEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef?.current?.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                if (showGrid) {
                    drawGrid(ctx, canvasWidth, canvasHeight);
                }

                const rc: RoughCanvas = rough.canvas(canvasRef.current);

                elements.forEach((e: ElementObject) => rc?.draw(e.roughElement as any));
            }
        }
    }, [elements, canvasRef.current]);

    // set context in the store
    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef?.current?.getContext('2d');
            if (ctx) {
                setContext(ctx);
            }
        }
    }, [canvasRef.current]);

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
            const element = createElement(id, clientX, clientY, clientX, clientY);

            setElements([...elements, element]);
            setSelectedElement(element as ElementObject);
            selectedElRef.current = element as ElementObject;
            setAction('drawing');
        }
    };

    const handleMouseUp = () => {
        const i = selectedElement?.index;
        if (action === 'drawing' || action === 'resizing') {
            const { index } = elements[i as number] as ElementObject;
            if (index) {
                const { x1, y1, x2, y2 } = adjustElementCoordinates(
                    elements[i as number] as ElementObject
                );
                updateElement(index, x1, y1, x2, y2);
                selectedElRef.current = createElement(
                    index,
                    x1,
                    y1,
                    x2,
                    y2
                ) as ElementObject;
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
            (event.target as any).style.cursor = e
                ? cursorForPosition(
                      e.position as string,
                      Boolean(elementType === 'remove')
                  )
                : 'default';
        }

        if (action === 'drawing') {
            const index = elements.length - 1;
            const { x1, y1 } = elements[index] as ElementObject;
            updateElement(index, x1, y1, mouseX, mouseY);
        } else if (action === 'moving') {
            const {
                index: id,
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

            updateElement(id, newX, newY, newX + width, newY + height);
        } else if (action === 'resizing') {
            const { index: id, position, ...coords } = selectedElement as SelectedElement;

            const { x1, x2, y1, y2 } = resizedCoordinates(
                mouseX,
                mouseY,
                position,
                coords
            );
            updateElement(id, x1, y1, x2, y2);
        }
    };

    const updateElement = (
        index: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) => {
        const updatedElement = createElement(index, x1, y1, x2, y2);

        const updatedElements = [...elements];
        updatedElements[index] = updatedElement as ElementObject;
        elementsRef.current = updatedElements;
        setElements(updatedElements);
    };

    return (
        <>
            <Toolbar
                elementsLength={elements.length}
                activeElementType={elementType}
                handleSwitchElementType={changeElementType}
            />
            <div className="flex flex-row gap-10 my-2">
                <div className="flex flex-row gap-2 items-center text-sm">
                    <input
                        type="checkbox"
                        checked={showGrid}
                        onChange={() => setShowGrid(!showGrid)}
                        className="checkbox checkbox-xs checkbox-primary"
                    />
                    <label>Show Grid</label>
                </div>
            </div>
            <div
                id="canvas-container"
                ref={canvasContainerRef}
                className={`${
                    radiusHash[cardRadius as RadiusRange]
                } object-contain w-fit flex flex-col justify-center items-center`}
                style={{
                    backgroundColor: cardBackgroundColor,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <canvas
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    width={canvasWidth}
                    height={canvasHeight}
                    ref={canvasRef}
                    className={radiusHash[cardRadius as RadiusRange]}
                />
            </div>
        </>
    );
}
