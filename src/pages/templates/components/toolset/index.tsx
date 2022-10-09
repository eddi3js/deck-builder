import ColorPicker from '../fields/colorPicker';
import Fill from './fill';

export default function Toolset() {
    return (
        <div className="flex flex-col border-t border-base-300 pt-3">
            <div className="flex flex-col w-full">
                <p className="text-xs font-bold">Stroke</p>
                <ColorPicker stateKey="strokeColor" />
            </div>

            <div className="flex flex-col w-full">
                <p className="text-xs font-bold">Background</p>
                <ColorPicker stateKey="backgroundColor" />
            </div>

            <div className="flex flex-col w-full">
                <p className="text-xs font-bold">Fill</p>
                <Fill />
            </div>
        </div>
    );
}
