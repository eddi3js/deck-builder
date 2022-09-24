import { useCardTemplateStore } from '@/stores/cardTemplates';
import { RangeSliderProps } from '@/utils/canvas/ranges';
import React from 'react';

export default function DefaultCardFields() {
    const { ratios, changeRatios } = useCardTemplateStore();
    const [width, height] = ratios;

    return (
        <div className="flex flex-col">
            <div className="mt-4 flex w-full flex-row gap-3">
                <div className="flex flex-col flex-1">
                    <label className="text-xs text-gray-400">Width</label>
                    <input
                        value={width}
                        step={0.5}
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            changeRatios(parseFloat(e.target.value), 0)
                        }
                        className="bg-transparent border text-sm border-gray-500 rounded-md p-2 py-1.5"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <label className="text-xs text-gray-400">Height</label>
                    <input
                        step={0.5}
                        value={height}
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            changeRatios(parseFloat(e.target.value), 1)
                        }
                        className="bg-transparent border text-sm border-gray-500 rounded-md p-2 py-1.5"
                    />
                </div>
            </div>
            <RangeSlider type="radius" />
        </div>
    );
}

const RangeSlider = ({ type }: RangeSliderProps) => {
    const { changeRadius, cardRadius } = useCardTemplateStore();

    const valueByType = (): number => {
        switch (type) {
            case 'radius':
                return cardRadius;
            default:
                return 0;
        }
    };
    const value = valueByType();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (type) {
            case 'radius':
                changeRadius(parseInt(event.target.value));
                break;
            default:
                break;
        }
    };

    const minMaxValues = () => {
        switch (type) {
            case 'radius':
                return {
                    min: 1,
                    max: 7,
                };
            default:
                return {
                    min: 0,
                    max: 100,
                };
        }
    };
    const min = minMaxValues().min;
    const max = minMaxValues().max;

    return (
        <div className="flex flex-row gap-4 justify-between items-center mt-8">
            <div className="flex flex-1 items-center gap-4">
                <label
                    htmlFor="default-range"
                    className="text-sm font-medium text-gray-900 dark:text-gray-300 w-1/2"
                >
                    Corner Bevel
                </label>

                <input
                    id="default-range"
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
            </div>
            {value}
        </div>
    );
};
