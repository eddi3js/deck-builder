import { AreaTypes } from '@/stores/cardTemplates';

export type RoughElement = {
    shape: string;
    sets: RoughElementSets[];
    options: RoughElementOptions;
};

export type RoughElementSets = {
    type: string;
    ops: {
        op: string;
        data: number[];
    }[];
};

export type RoughElementOptions = {
    id: string;
    bowing: number;
    curveTightness: number;
    curveFitting: number;
    curveStepCount: number;
    dashGap: number;
    dashOffset: number;
    disableMultiStroke: boolean;
    disableMultiStrokeFill: boolean;
    fill: string;
    fillStyle: string;
    fillWeight: number;
    hachureAngle: number;
    hachureGap: number;
    roughness: number;
    seed: number;
    stroke: string;
    strokeWidth: number;
    zigzagOffset: number;
};

export type Element = ElementObject;
export interface ElementObject {
    index: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    roughElement: RoughElement;
    metadata: {
        type: AreaTypes;
        name: string;
    };
}

export type Positions = 'tl' | 'tr' | 'bl' | 'br' | 'inside' | undefined;

export interface SelectedElement extends ElementObject {
    position: Positions;
    offsetX: number;
    offsetY: number;
}
