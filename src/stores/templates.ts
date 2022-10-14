import { ElementObject } from '@/server/models/canvas';
import { CardTemplate } from '@prisma/client';
import create from 'zustand';

export type ElementTypes = 'circle' | 'rectangle' | 'remove' | 'select';
export type AreaTypes = 'string' | 'number' | 'image';
export interface AreaFields {
    name: string;
    type: AreaTypes;
}

export interface CardTemplateStore extends CardTemplateState {
    updateStrokeColor: (color: string) => void;
    setContext: (ctx: CanvasRenderingContext2D | null) => void;
    setElements: (elements: ElementObject[]) => void;
    setSelectedElement: (element: ElementObject | null) => void;
    changeRatios: (ratio: number, index: number) => void;
    changeRadius: (radius: number) => void;
    changeElementType: (type: ElementTypes) => void;
    changeTemplateName: (name: string) => void;
    removeElement: (index: number) => void;
    changeBackgroundColor: (color: string) => void;
    uploadBackgroundImage: (file: File | string | null) => void;
    updateAreaMetadata: (index: number, metadata: AreaFields) => void;
    updateStateWithTemplateData: (template: CardTemplate) => void;
    resetState: () => void;
}

export interface CardTemplateState {
    ratios: number[];
    elements: ElementObject[];
    selectedElement: ElementObject | null;
    elementType: ElementTypes;
    templateName: string;
    cardRadius: number;
    cardBackgroundImage: File | null | string;
    cardBackgroundColor: string;
    ctx: CanvasRenderingContext2D | null;
    strokeColor: string;
}

const initialStateData = {
    ratios: [2.5, 3.5],
    elements: [],
    selectedElement: null,
    elementType: 'rectangle' as ElementTypes,
    cardRadius: 0,
    cardBackgroundImage: null,
    cardBackgroundColor: '#cdcdcd',
    templateName: '',
    ctx: null,
    strokeColor: '#6aabfc',
};

export const useCardTemplateStore = create<CardTemplateStore>(set => ({
    ratios: [2.5, 3.5],
    elements: [],
    selectedElement: null,
    elementType: 'rectangle' as ElementTypes,
    cardRadius: 0,
    cardBackgroundImage: null,
    cardBackgroundColor: '#cdcdcd',
    templateName: '',
    ctx: null,
    strokeColor: '#6aabfc',

    resetState: () => set(initialStateData),
    updateStateWithTemplateData: (template: CardTemplate) => {
        set(state => {
            return { ...state, ...template };
        });
    },
    updateAreaMetadata: (index, metadata) => {
        set(state => {
            const elements = state.elements.map((element, i) => {
                if (i === index) {
                    return {
                        ...element,
                        metadata,
                    };
                }
                return element;
            });

            return { elements };
        });
    },
    updateStrokeColor: (color: string) => set({ strokeColor: color }),
    setContext: (ctx: CanvasRenderingContext2D | null) => set({ ctx }),
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
