import { useCardTemplateStore } from '@/stores/cardTemplates';
import { useState, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useOnClickOutside } from 'usehooks-ts';

export default function ColorPicker() {
    const { changeBackgroundColor, cardBackgroundColor } = useCardTemplateStore();

    const [pickerOpen, setPickerOpen] = useState<boolean>(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        if (pickerOpen) {
            setPickerOpen(false);
        }
    });

    return (
        <div className="flex flex-row gap-4 mb-4 color-picker relative items-end">
            <p className="text-xs">Background Color</p>
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={cardBackgroundColor}
                    onClick={() => setPickerOpen(true)}
                    className="input input-bordered w-full max-w-xs input-sm"
                />
                <div ref={ref} className={`absolute ${pickerOpen ? 'block' : 'hidden'}`}>
                    <HexColorPicker
                        color={cardBackgroundColor}
                        onChange={changeBackgroundColor}
                    />
                </div>
            </div>
        </div>
    );
}
