export type RadiusRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type RangeTypes = 'radius' | 'gutter';
export interface RangeSliderProps {
    type: RangeTypes;
}

export const radiusHash = {
    1: 'rounded-none',
    2: 'rounded-sm',
    3: 'rounded-md',
    4: 'rounded-lg',
    5: 'rounded-xl',
    6: 'rounded-2xl',
    7: 'rounded-3xl',
    8: 'rounded-full',
};
