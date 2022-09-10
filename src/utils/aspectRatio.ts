export default function aspectRatio(
    ratios: number[],
    type: 'width' | 'height'
) {
    const width = ratios[0] as number;
    const height = ratios[1] as number;

    const ratio = width / height;
    let value = 0;

    if (ratio === 1) return 1;

    if (type === 'width') {
        value = parseInt((width / ratio).toFixed(1));
    }

    if (type === 'height') {
        value = parseInt((height * ratio).toFixed(1));
    }

    // see if the number is x.0
    if (value % 1 === 0) {
        return value.toFixed();
    }

    return value;
}
