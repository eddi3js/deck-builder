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
            <p className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                Background Color
            </p>
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={cardBackgroundColor}
                    onClick={() => setPickerOpen(true)}
                    className="h-10 w-fit rounded bg-white/[0.1] pl-3"
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
