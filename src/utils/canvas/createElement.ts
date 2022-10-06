/* eslint-disable @typescript-eslint/no-var-requires */
import { ElementObject } from '@/server/models/canvas';
import { useCardTemplateStore } from '@/stores/cardTemplates';
import { RoughGenerator } from 'roughjs/bin/generator';
const rough = require('roughjs/bundled/rough.cjs');

export const generator: RoughGenerator = rough.generator();

export const defaultAreaMetaData = {
    name: '',
    type: 'string',
};

const useCreateElement = () => {
    const { strokeColor } = useCardTemplateStore();

    function createElement(
        index: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ): ElementObject {
        const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
            roughness: 0,
            strokeWidth: 1,
            curveStepCount: 9,
            simplification: 0,
            fill: strokeColor,
            stroke: strokeColor,
        });

        return {
            x1,
            y1,
            x2,
            y2,
            index,
            ...(roughElement && { roughElement }),
            metadata: defaultAreaMetaData,
        } as ElementObject;
    }

    function fillColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    return { createElement, fillColor };
};

export default useCreateElement;
