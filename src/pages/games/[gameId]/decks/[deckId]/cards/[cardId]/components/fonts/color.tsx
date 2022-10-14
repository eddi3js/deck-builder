import { useCardStore } from '@/stores/cards';
import { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useOnClickOutside } from 'usehooks-ts';

const ColorPicker = ({ id }: { id: string }) => {
    const [pickerOpen, setPickerOpen] = useState<boolean>(false);
    const [pickerColor, setPickerColor] = useState<string>('#000');
    const ref = useRef(null);

    const { setFont } = useCardStore();

    useOnClickOutside(ref, () => {
        if (pickerOpen) {
            setPickerOpen(false);
        }
    });

    const handleInternalChange = (e: string) => {
        setPickerColor(e);
        setFont(id, {
            color: e,
        });
    };

    return (
        <div className="tooltip tooltip-bottom" data-tip="font color">
            <div className="relative flex w-full items-center px-0.5">
                <button
                    className="rounded-full w-4 h-4 border-2"
                    onClick={() => setPickerOpen(true)}
                    style={{ backgroundColor: pickerColor }}
                ></button>
                <div
                    ref={ref}
                    className={`absolute right-0 top-5 ${
                        pickerOpen ? 'block' : 'hidden'
                    }`}
                >
                    <HexColorPicker onChange={handleInternalChange} />
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
