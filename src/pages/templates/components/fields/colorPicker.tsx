import { useToolsetStore } from '@/stores/toolset';
import { useState, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useOnClickOutside } from 'usehooks-ts';

interface ColorPickerProps {
    stateKey: string;
}

export default function ColorPicker({ stateKey }: ColorPickerProps) {
    const { strokeColor, backgroundColor, updateBackgroundColor, updateStrokeColor } =
        useToolsetStore();

    const [pickerOpen, setPickerOpen] = useState<boolean>(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        if (pickerOpen) {
            setPickerOpen(false);
        }
    });

    const color = stateKey === 'strokeColor' ? strokeColor : backgroundColor;
    const handleColorChange =
        stateKey === 'strokeColor' ? updateStrokeColor : updateBackgroundColor;

    return (
        <div className="flex flex-row gap-2 mb-4 color-picker relative items-end">
            <div
                onClick={() => {
                    const input = document.getElementById('picker') as HTMLInputElement;
                    input.click();
                }}
                className="w-7 h-7 relative border-2 border-base-300 -top-0.5 rounded"
                style={{ padding: 1.5, backgroundColor: color }}
            ></div>
            <div className="relative">
                <input
                    id="picker"
                    type="text"
                    readOnly
                    value={color}
                    onClick={() => setPickerOpen(true)}
                    className="input input-bordered w-full max-w-xs input-sm"
                />
                <div ref={ref} className={`absolute ${pickerOpen ? 'block' : 'hidden'}`}>
                    <HexColorPicker color={color} onChange={handleColorChange} />
                </div>
            </div>
        </div>
    );
}
