import { ElementObject } from '@/utils/canvas/getElementAtPosition';
import create from 'zustand';

export type ElementTypes = 'circle' | 'rectangle' | 'remove' | 'select';
export interface AreaFields {
    name: string;
    type: 'string' | 'number' | 'image';
}

export interface CardTemplateState {
    ratios: number[];
    areas: AreaFields[];
    elements: ElementObject[];
    selectedElement: ElementObject | null;
    elementType: ElementTypes;
    templateName: string;

    setElements: (elements: ElementObject[]) => void;
    setSelectedElement: (element: ElementObject | null) => void;
    changeRatios: (ratio: number, index: number) => void;
    changeElementType: (type: ElementTypes) => void;
    changeTemplateName: (name: string) => void;
    removeElement: (index: number) => void;
}

export const useCardTemplateStore = create<CardTemplateState>(set => ({
    ratios: [2.5, 3.5],
    elements: [],
    selectedElement: null,
    elementType: 'select' as ElementTypes,

    templateName: 'New Card Template',
    areas: [] as AreaFields[],

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
    changeElementType: (elementType: ElementTypes) => set({ elementType }),
    changeTemplateName: (templateName: string) => set({ templateName }),
}));