import ColorPicker from './colorPicker';
import TemplateName from './name';
import RangeSlider from './range';
import Ratios from './ratios';
import BackgroundImage from './background';

export default function CardFields() {
    return (
        <div className="flex flex-col">
            <TemplateName />
            <BackgroundImage />
            <Ratios />
            <RangeSlider type="radius" />
            <ColorPicker />
        </div>
    );
}
