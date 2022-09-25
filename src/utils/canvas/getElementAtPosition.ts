import { ImageElement } from './createElement';

export type Element = ElementObject | ImageElement;

export interface ElementObject {
    index: number;
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

export type Positions = 'tl' | 'tr' | 'bl' | 'br' | 'inside' | undefined;

export interface SelectedElement extends ElementObject {
    position: Positions;
    offsetX: number;
    offsetY: number;
}

export default function getElementAtPosition(x: number, y: number, elements: Element[]) {
    return elements
        .map(element => {
            return {
                ...element,
                position: positionWithinElement(x, y, element),
            };
        })
        .find(el => el.position !== undefined);
}

function nearPoint(
    x: number,
    y: number,
    x1: number,
    y1: number,
    position: string
): string | undefined {
    return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2)) <= 5
        ? position
        : undefined;
}

export function cursorForPosition(position: string | null, remove?: boolean) {
    switch (position) {
        case 'tl':
        case 'br':
            return 'nwse-resize';
        case 'tr':
        case 'bl':
            return 'nesw-resize';
        case 'inside':
            return remove ? 'not-allowed' : 'move';
        default:
            return 'default';
    }
}

function positionWithinElement(
    x: number,
    y: number,
    element: ElementObject | ImageElement
) {
    const { x1, x2, y1, y2 } = element;

    if (
        (element as ElementObject).roughElement?.shape === 'rectangle' ||
        (element as ImageElement).image
    ) {
        const topLeft = nearPoint(x, y, x1, y1, 'tl');
        const topRight = nearPoint(x, y, x2, y1, 'tr');
        const bottomLeft = nearPoint(x, y, x1, y2, 'bl');
        const bottomRight = nearPoint(x, y, x2, y2, 'br');

        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : undefined;

        return topLeft || topRight || bottomLeft || bottomRight || inside;
    } else {
        // TODO: do other shapes
    }
}

export const adjustElementCoordinates = (el: Element): Element => {
    const element = el;
    const { x1, x2, y1, y2 } = element;

    if (
        (element as ElementObject).roughElement.shape === 'rectangle' ||
        (element as ImageElement).image
    ) {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        element.x1 = minX;
        element.x2 = maxX;
        element.y1 = minY;
        element.y2 = maxY;
    } else {
        const radius = Math.abs(x2 - x1);
        const centerX = x1;
        const centerY = y1;

        element.x1 = centerX - radius;
        element.x2 = centerX + radius;
        element.y1 = centerY - radius;
        element.y2 = centerY + radius;
    }

    return element;
};

export function resizedCoordinates(
    clientX: number,
    clientY: number,
    position: Positions,
    coords: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    }
): {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
} {
    const { x1, x2, y1, y2 } = coords;
    switch (position) {
        case 'tl':
            return {
                x1: clientX,
                x2,
                y1: clientY,
                y2,
            };
        case 'tr':
            return {
                x1,
                x2: clientX,
                y1: clientY,
                y2,
            };
        case 'bl':
            return {
                x1: clientX,
                x2,
                y1,
                y2: clientY,
            };
        case 'br':
            return {
                x1,
                x2: clientX,
                y1,
                y2: clientY,
            };
        default:
            return {
                x1,
                x2,
                y1,
                y2,
            };
    }
}
