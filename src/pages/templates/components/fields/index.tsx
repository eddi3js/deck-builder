import TemplateName from './name';
import RangeSlider from './range';
import Ratios from './ratios';
import BackgroundImage from './background';
import Toolset from '../toolset';

export default function CardFields() {
    return (
        <div className="flex flex-col">
            <TemplateName />
            <BackgroundImage />
            <Ratios />
            <RangeSlider type="radius" />
            <Toolset />
            {/* <ColorPicker /> */}
        </div>
    );
}
