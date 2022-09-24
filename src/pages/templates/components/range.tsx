import { useCardTemplateStore } from '@/stores/cardTemplates';
import { RangeSliderProps } from '@/utils/canvas/ranges';

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

export default RangeSlider;
