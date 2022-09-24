function calculateAaspectRatio(ratios: number[], type: 'width' | 'height'): number {
    const width = ratios[0] as number;
    const height = ratios[1] as number;
    const ratio = width / height;

    let value = 0;

    if (ratio === 1) return 1;

    if (type === 'height') {
        value = parseInt((width / ratio).toFixed(1));
    }

    if (type === 'width') {
        value = parseInt((height * ratio).toFixed(1));
    }

    return value % 1 === 0 ? parseInt(value.toFixed()) : value;
}

const aspectRatio = (ratios: number[]) => {
    const height = calculateAaspectRatio(ratios, 'height');
    const width = calculateAaspectRatio(ratios, 'width');

    return { width, height };
};

export const getCanvasSize = (ratios: number[]) => {
    const { width, height } = aspectRatio(ratios);
    const multiplier = width === 1 && height === 1 ? 400 : 200;
    return {
        width: width * multiplier,
        height: height * multiplier,
    };
};

export default aspectRatio;
