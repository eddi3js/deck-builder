import create from 'zustand';

export type FillType = 'hachure' | 'cross-hatch' | 'solid';
interface ToolsetState {
    strokeColor: string;
    backgroundColor: string;
    fillStyle: FillType;
}
interface ToolsetStore extends ToolsetState {
    updateStrokeColor: (color: string) => void;
    updateBackgroundColor: (color: string) => void;
    updateFillStyle: (fill: FillType) => void;
    resetState: () => void;
}

const initialToolsetState: ToolsetState = {
    strokeColor: '#6aabfc',
    backgroundColor: '#6aabfc',
    fillStyle: 'solid',
};

export const useToolsetStore = create<ToolsetStore>(set => ({
    strokeColor: '#6aabfc',
    backgroundColor: '#6aabfc',
    fillStyle: 'solid',

    updateStrokeColor: (color: string) => set({ strokeColor: color }),
    updateBackgroundColor: (color: string) => set({ backgroundColor: color }),
    updateFillStyle: (fillStyle: FillType) => set({ fillStyle }),
    resetState: () => set(initialToolsetState),
}));
