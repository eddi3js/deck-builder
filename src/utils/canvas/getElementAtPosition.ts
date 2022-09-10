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
    offsetX?: number;
    offsetY?: number;
}

export default function getElementAtPosition(
    x: number,
    y: number,
    elements: ElementObject[]
) {
    return elements.find(element => isWithinElement(x, y, element));
}

function isWithinElement(x: number, y: number, element: ElementObject) {
    const { roughElement, x1, x2, y1, y2 } = element;

    if (roughElement.shape === 'rectangle') {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    } else {
        const radius = Math.abs(x2 - x1);
        const centerX = x1;
        const centerY = y1;

        return (
            Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) <=
            radius
        );
    }
}

export const adjustElementCoordinates = (element: ElementObject) => {
    const { roughElement, x1, x2, y1, y2 } = element;

    if (roughElement.shape === 'rectangle') {
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
