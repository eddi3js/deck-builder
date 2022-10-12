import { CardTemplatePayload } from '@/server/models/canvas';
import create from 'zustand';

export interface CardState {
    id: string | null;
    name: string;
    template: null | CardTemplatePayload;
}

interface CardStore extends CardState {
    setName: (name: string) => void;
    setTemplate: (template: CardTemplatePayload) => void;
}

export const useCardStore = create<CardStore>(set => ({
    id: null,
    name: '',
    template: null,

    setName: (name: string) => set({ name }),
    setTemplate: (template: CardTemplatePayload) => set({ template }),
}));
