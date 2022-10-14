import { CardTemplatePayload, Metadata } from '@/server/models/canvas';
import { Options } from 'roughjs/bin/core';
import create from 'zustand';
import { AreaTypes } from '../templates';

type AlignTypes = 'start' | 'center' | 'end';
export interface Font {
    family: string;
    color: string;
    size: number;
    align: AlignTypes;
    vAlign: AlignTypes;
}

export interface Areas {
    areaId: string;
    type: AreaTypes;
    name: string;
    value: string | number | null;
    stroke: string;
    font: Font;
}

export interface AreaElementObject {
    id: string;
    top: number;
    left: number;
    width: number;
    height: number;
    options: Options;
    metadata: Metadata;
}

export interface CardTemplateState extends Omit<CardTemplatePayload, 'elements'> {
    elements: AreaElementObject[];
}
export interface CardState {
    id: string | null;
    name: string;
    template: null | CardTemplateState;
    areas: Areas[];
    hovervingArea: null | string;
    focusArea: null | string;
}

interface CardStore extends CardState {
    setName: (name: string) => void;
    setAreas: (areas: Areas[]) => void;
    updateAreaById: (areaId: string, value: string | number | null) => void;
    setTemplate: (template: CardTemplateState) => void;
    updateAreaByIndex: (index: number, updatedValue: string | number) => void;
    setHoveringArea: (areaId: string | null) => void;
    setFocusArea: (areaId: string | null) => void;
    setFont: (areaId: string, data: object) => void;
}

export const defaultFontState = {
    family: 'Open Sans',
    color: '#000000',
    size: 16,
    align: 'center',
    vAlign: 'center',
};

export const useCardStore = create<CardStore>(set => ({
    id: null,
    name: '',
    template: null,
    areas: [],
    hovervingArea: null,
    focusArea: null,

    setFont: (areaId, data) => {
        set(state => {
            const areas = state.areas.map(area => {
                if (area.areaId === areaId) {
                    return {
                        ...area,
                        font: {
                            ...area.font,
                            ...data,
                        },
                    };
                }
                return area;
            });
            return {
                areas,
            };
        });
    },
    setAreas: areas => set({ areas }),
    updateAreaById: (areaId, value) =>
        set(state => ({
            areas: state.areas.map(area => {
                if (area.areaId === areaId) {
                    return {
                        ...area,
                        value,
                    };
                }
                return area;
            }),
        })),
    setName: name => set({ name }),
    setTemplate: template => set({ template }),
    updateAreaByIndex: (index, updatedValue) => {
        set(state => {
            const areas = [...state.areas];
            const area = areas[index];
            if (area) {
                area.value = updatedValue;
            }
            return { areas };
        });
    },
    setHoveringArea: areaId => set({ hovervingArea: areaId }),
    setFocusArea: areaId => set({ focusArea: areaId }),
}));
