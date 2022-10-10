import create from 'zustand';

export interface GameState {
    name: string;
    updateName: (name: string) => void;
    resetGameStore: () => void;
}

const initialState = {
    name: '',
};

export const useGameStore = create<GameState>(set => ({
    name: '',
    resetGameStore: () => set(initialState),
    updateName: (name: string) => set({ name }),
}));
