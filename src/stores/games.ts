import create from 'zustand';

export interface GameState {
    id: string | null;
    name: string;
    userId: string | null;
    setState: (state: Partial<GameState>) => void;
    updateName: (name: string) => void;
    resetGameStore: () => void;
}

const initialState = {
    id: null,
    name: '',
    userId: '',
};

export const useGameStore = create<GameState>(set => ({
    id: null,
    userId: null,
    name: '',

    setState: (state: Partial<GameState>) => set(state),
    resetGameStore: () => set(initialState),
    updateName: (name: string) => set({ name }),
}));
