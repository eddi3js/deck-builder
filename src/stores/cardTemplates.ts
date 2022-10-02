import { Element } from '@/utils/canvas/getElementAtPosition';
import create from 'zustand';

export type ElementTypes = 'circle' | 'rectangle' | 'remove' | 'select';
export type AreaTypes = 'string' | 'number' | 'image';
export interface AreaFields {
    name: string;
    type: AreaTypes;
}

export interface CardTemplateState {
    ratios: number[];
    elements: Element[];
    selectedElement: Element | null;
    elementType: ElementTypes;
    templateName: string;
    cardRadius: number;
    cardBackgroundImage: File | null | string;
    cardBackgroundColor: string;

    setElements: (elements: Element[]) => void;
    setSelectedElement: (element: Element | null) => void;
    changeRatios: (ratio: number, index: number) => void;
    changeRadius: (radius: number) => void;
    changeElementType: (type: ElementTypes) => void;
    changeTemplateName: (name: string) => void;
    removeElement: (index: number) => void;
    changeBackgroundColor: (color: string) => void;
    uploadBackgroundImage: (file: File | string | null) => void;
}

export const useCardTemplateStore = create<CardTemplateState>(set => ({
    ratios: [2.5, 3.5],
    elements: [],
    selectedElement: null,
    elementType: 'select' as ElementTypes,
    cardRadius: 0,
    cardBackgroundImage: null,
    cardBackgroundColor: '#cdcdcd',
    templateImages: [],
    templateName: '',

    setElements: elements => set({ elements }),
    setSelectedElement: element => set({ selectedElement: element }),
    removeElement: (index: number) => {
        set((state: CardTemplateState) => {
            let elements = [...state.elements];
            // remove element
            elements.splice(index, 1);
            // Update indexes
            elements = elements.map((element, index) => {
                return {
                    ...element,
                    index,
                };
            });
            return { elements };
        });
    },

    changeRatios: (newRatios: number, index: number) => {
        set((state: CardTemplateState) => {
            const ratios = [...state.ratios];
            ratios[index] = newRatios;
            return { ratios };
        });
    },
    changeRadius: (radius: number) => set({ cardRadius: radius }),
    changeElementType: (elementType: ElementTypes) =>
        set({ elementType, selectedElement: null }),
    changeTemplateName: (templateName: string) => set({ templateName }),

    changeBackgroundColor: (color: string) => set({ cardBackgroundColor: color }),
    uploadBackgroundImage: (file: File | string | null) =>
        set({ cardBackgroundImage: file }),
}));
