export const getCanvasSize = (ratios: number[]) => {
    const [width, height] = ratios;
    return {
        width: (width as number) * 96 * 1.5,
        height: (height as number) * 96 * 1.5,
    };
};

export const ratioConverter = (ratio: string) => {
    return parseFloat(ratio.replace(/, /g, '.')).toFixed(1);
};
