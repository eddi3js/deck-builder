import create from 'zustand';

export interface DeckState {
    id: string | null;
    gameId: string;
    name: string;
    cards: any[];
}

interface DeckStore extends DeckState {
    setName: (name: string) => void;
    setInitialState: (deck: DeckState) => void;
}

export const useDeckStore = create<DeckStore>(set => ({
    id: null,
    gameId: '',
    name: '',
    cards: [],

    setName: (name: string) => set({ name }),
    setInitialState: (deck: DeckState) => set(deck),
}));
