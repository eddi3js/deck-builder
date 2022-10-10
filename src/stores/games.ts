import { Game } from '@/server/models/games';
import create from 'zustand';

export interface GameState {
    id: string | null;
    name: string;
    userId: string | null;
}

interface GameStore extends GameState {
    setGameData: (state: Game) => void;
    updateName: (name: string) => void;
    resetGameStore: () => void;
}

const initialState = {
    id: null,
    name: '',
    userId: '',
};

export const useGameStore = create<GameStore>(set => ({
    id: null,
    userId: null,
    name: '',

    setGameData: (state: Game) => set(state),
    resetGameStore: () => set(initialState),
    updateName: (name: string) => set({ name }),
}));
