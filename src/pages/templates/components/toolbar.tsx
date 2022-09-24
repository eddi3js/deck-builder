import { Tooltip } from 'flowbite-react';
import { ElementTypes } from '../new';

interface TooltipProps {
    handleSwitchElementType: (type: ElementTypes) => void;
    elementsLength: number;
    activeElementType: ElementTypes;
}

export default function Toolbar({
    handleSwitchElementType,
    elementsLength,
    activeElementType,
}: TooltipProps) {
    const isActive = (type: ElementTypes) => {
        const borderColor = () => {
            switch (type) {
                case 'remove':
                    return 'red';
                case 'select':
                    return 'gray';
                default:
                    return 'blue';
            }
        };

        return activeElementType === type
            ? `border border-${borderColor()}-500 p-1 border-2 ${
                  type === 'circle' ? 'rounded-full' : 'rounded-md text-white'
              }`
            : 'p-1 border-2 border-transparent text-gray-400 hover:text-white';
    };

    return (
        <div className="flex flex-row h-fit w-fit p-2 bg-white/[0.1] rounded gap-4 rounded-t-none mb-4">
            <Tooltip content="Move/Resize Area" placement="top" style="light">
                <button
                    disabled={elementsLength === 0}
                    onClick={() => handleSwitchElementType('select')}
                    className={`${isActive('select')} cursor-pointer`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                        />
                    </svg>
                </button>
            </Tooltip>

            <Tooltip content="Create Area" placement="top" style="light">
                <button
                    onClick={() => handleSwitchElementType('rectangle')}
                    className={isActive('rectangle')}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
                        />
                    </svg>
                </button>
            </Tooltip>

            <Tooltip content="Remove Area" placement="top" style="light">
                <button
                    disabled={elementsLength === 0}
                    onClick={() => handleSwitchElementType('remove')}
                    className={`${isActive('remove')} cursor-pointer`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </button>
            </Tooltip>

            <Tooltip content="Preview" placement="top" style="light">
                <button className="p-1 cursor-pointer border-2 border-transparent text-gray-400 hover:text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-400 hover:text-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                    </svg>
                </button>
            </Tooltip>
        </div>
    );
}
