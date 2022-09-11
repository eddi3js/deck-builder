import { RoughGenerator } from 'roughjs/bin/generator';
const rough = require('roughjs/bundled/rough.cjs');

export const generator: RoughGenerator = rough.generator({
    options: {
        roughness: 1,
        bowing: 1,
        stroke: '#6aabfc',
        fillType: 'zigzag',
        fill: '#6aabfc',
        strokeWidth: 1,
        curveStepCount: 9,
        simplification: 0,
    },
});

export default function createElement(
    index: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    type: 'circle' | 'rectangle'
) {
    const roughElement =
        type === 'circle'
            ? generator.circle(x1, y1, x2)
            : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
    return {
        x1,
        y1,
        x2,
        y2,
        index,
        roughElement,
    };
}
