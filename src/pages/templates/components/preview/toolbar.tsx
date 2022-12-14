import { ElementTypes } from '@/pages/templates/[templateId]';

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
        return activeElementType === type
            ? `border border-2 p-1 border-2 ${
                  type === 'circle' ? 'rounded-full' : 'rounded-md'
              }`
            : 'p-1 border-2 border-transparent hover:border-inherit rounded-md';
    };

    return (
        <div className="flex flex-row h-fit w-fit p-2 rounded gap-4 rounded-t-none mb-4 relative mx-auto">
            <div className="tooltip tooltip-bottom" data-tip="Create Area Layer">
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
            </div>
            <div className="tooltip tooltip-bottom" data-tip="Move/Resize">
                <button
                    disabled={elementsLength === 0}
                    onClick={() => handleSwitchElementType('select')}
                    className={`${isActive(
                        'select'
                    )} cursor-pointer hover:border-2 hover:border-primary`}
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
            </div>

            <div className="tooltip tooltip-bottom" data-tip="Remove Selected">
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
            </div>
        </div>
    );
}
