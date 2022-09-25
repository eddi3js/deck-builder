export const getCanvasSize = (ratios: number[]) => {
    const [width, height] = ratios;
    return {
        width: width! * 96 * 1.5,
        height: height! * 96 * 1.5,
    };
};
