import { Areas as AreaType, useCardStore } from '@/stores/cards';
import { useEffect, useState } from 'react';

interface AreaProps extends AreaType {
    focusArea: string | null;
}

export default function Areas() {
    const { areas, hovervingArea, focusArea } = useCardStore();

    if (!areas.length) {
        return <p className="text-sm">First choose a template</p>;
    }

    const Area = (area: AreaProps) => {
        const [type, setType] = useState<'input' | 'textarea'>('input');

        useEffect(() => {
            if (area.focusArea && area.focusArea === area.areaId) {
                // focus the input
                const input = document.getElementById(
                    `area-${area.areaId}-name`
                ) as HTMLInputElement;
                input.focus();
            }
        }, [area.focusArea]);

        const name = area.name.replace(/\-/g, ' ');

        const placeholder = () => {
            switch (area.type) {
                case 'string':
                case 'number':
                    return `Enter ${name}${type === 'textarea' ? ' in Markdown' : ''}`;
                case 'image':
                    return 'Enter image URL';
                default:
                    return '';
            }
        };

        return (
            <div
                id={`area-${area.areaId}`}
                className={`shadow flex flex-col border-l-2 mb-3 px-4 py-3 pt-2 ${
                    hovervingArea === area.areaId ? 'bg-base-300' : 'bg-base-100'
                } rounded`}
                style={{
                    borderLeftColor: area.stroke,
                }}
            >
                <div className="flex w-full flex-row justify-between">
                    <p className="text-sm capitalize flex flex-row items-center">
                        {name}:
                        {type === 'textarea' && (
                            <div className="tooltip ml-1" data-tip="Markdown Basics">
                                <a
                                    href="https://www.markdownguide.org/basic-syntax/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-secondary"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </p>
                    {area.type === 'string' && (
                        <div className="flex flex-row gap-2">
                            <div className="tooltip" data-tip="text input">
                                <button
                                    className={`hover:text-secondary ${
                                        type === 'input' && 'text-secondary'
                                    }`}
                                    onClick={() => setType('input')}
                                >
                                    a
                                </button>
                            </div>
                            <div className="tooltip" data-tip="text area">
                                <button
                                    className={`hover:text-secondary ${
                                        type === 'textarea' && 'text-secondary'
                                    }`}
                                    onClick={() => setType('textarea')}
                                >
                                    A
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {type === 'input' ? (
                    <input
                        id={`area-${area.areaId}-name`}
                        type={area.type === 'number' ? 'number' : 'text'}
                        placeholder={placeholder()}
                        className="input input-bordered"
                    />
                ) : (
                    <textarea
                        id={`area-${area.areaId}-name`}
                        placeholder={placeholder()}
                        className="textarea textarea-bordered"
                        cols={30}
                    />
                )}
                {area.type === 'string' && <TextAlign />}
            </div>
        );
    };

    return (
        <>
            {areas.map(element => {
                return <Area key={element.areaId} {...element} focusArea={focusArea} />;
            })}
        </>
    );
}

const TextAlign = () => {
    return (
        <div className="shadow flex flex-row w-fit items-center justify-center mt-1 bg-base-100 rounded">
            <div className="tooltip tooltip-bottom" data-tip="align left">
                <button className="flex p-1 hover:text-secondary hover:bg-base-200">
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
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                        />
                    </svg>
                </button>
            </div>
            <div className="tooltip tooltip-bottom" data-tip="align center">
                <button className="flex p-1 hover:text-secondary rounded">
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
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </div>
            <div className="tooltip tooltip-bottom" data-tip="align right">
                <button className="flex p-1 hover:text-secondary">
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
                            d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
