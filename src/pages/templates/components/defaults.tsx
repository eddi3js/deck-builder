import { useCardTemplateStore } from '@/stores/cardTemplates';
import React from 'react';
import ColorPicker from './colorPicker';
import RangeSlider from './range';

export default function DefaultCardFields() {
    const { ratios, changeRatios } = useCardTemplateStore();
    const [width, height] = ratios;

    return (
        <div className="flex flex-col">
            <div className="mt-4 flex w-full flex-row gap-3 mb-4">
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
            <ColorPicker />
        </div>
    );
}
