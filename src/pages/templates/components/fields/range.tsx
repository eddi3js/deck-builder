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
                    max: 8,
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
        <div className="flex flex-row gap-4 justify-between items-center my-3">
            <label htmlFor="default-range" className="text-xs">
                Corner Bevel
            </label>
            <div className="flex flex-row gap-3 text-sm items-center">
                <input
                    id="default-range"
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    className="range rang-xs"
                />
                {value}
            </div>
        </div>
    );
};

export default RangeSlider;
