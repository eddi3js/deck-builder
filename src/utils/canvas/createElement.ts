/* eslint-disable @typescript-eslint/no-var-requires */
import { ElementObject, RoughElementOptions } from '@/server/models/canvas';
import { useToolsetStore } from '@/stores/toolset';
import { Options } from 'roughjs/bin/core';
import { RoughGenerator } from 'roughjs/bin/generator';
const rough = require('roughjs/bundled/rough.cjs');

export type AreaMetaData = {
    name: string;
    type: string;
};

export const generator: RoughGenerator = rough.generator();

export const defaultAreaMetaData: AreaMetaData = {
    name: '',
    type: 'string',
};

const useCreateElement = () => {
    const { strokeColor, fillStyle, backgroundColor } = useToolsetStore();

    const color = (key: keyof Options, options?: Options): string => {
        if (options && options[key]) {
            return options[key] as string;
        }
        switch (key) {
            case 'stroke':
                return strokeColor;
            case 'fill':
                return backgroundColor;
            case 'fillStyle':
                return fillStyle;
            default:
                return '#000';
        }
    };

    function createElement(
        index: number,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        metadata?: AreaMetaData,
        options?: Options
    ): ElementObject {
        const roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
            roughness: 0,
            strokeWidth: 1,
            curveStepCount: 9,
            simplification: 0,
            ...(options
                ? options
                : {
                      fill: color('fill', options),
                      stroke: color('stroke', options),
                      fillStyle: color('fillStyle', options),
                  }),
        });

        return {
            x1,
            y1,
            x2,
            y2,
            index,
            ...(roughElement && { roughElement }),
            metadata: metadata ?? defaultAreaMetaData,
        } as ElementObject;
    }

    return { createElement };
};

export default useCreateElement;
