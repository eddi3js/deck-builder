const rough = require('roughjs/bundled/rough.cjs');

export const generator = rough.generator({
    options: {
        roughness: 1,
        bowing: 1,
        fill: 'rgba(106, 171, 252, 0.25)',
        stroke: '#6aabfc',
        strokeWidth: 1,
        curveStepCount: 9,
        simplification: 0,
    },
});

export default function createElement(
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
        roughElement,
    };
}
