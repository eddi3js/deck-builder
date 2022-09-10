import Layout from '@/components/layout';
import React from 'react';
import TemplatePreview from './components/canvas';

export interface DefaultFields {
    name: string;
    label: string;
    value: string;
    placeholder: string;
}
export type ElementTypes = 'circle' | 'rectangle' | 'resize' | 'select';

export default function NewTemplate() {
    const [ratios, setRatios] = React.useState<number[]>([3.5, 2.5]);
    const [elementType, setElementType] =
        React.useState<ElementTypes>('rectangle');

    const isActive = (type: ElementTypes) => {
        return elementType === type
            ? `border border-blue-500 p-1 border-2 ${
                  type === 'circle' ? 'rounded-full' : 'rounded-md'
              }`
            : 'p-1 border-2 border-transparent';
    };

    return (
        <Layout
            title="New Card Template"
            callToAction={
                <button className="bg-purple-500 hover:bg-purple-700 text-white text-md px-5 py-2 rounded">
                    Save
                </button>
            }
        >
            <div className="flex flex-row justify-between gap-8">
                <div className="w-1/2">
                    <h2 className="text-xl font-bold">Peview</h2>

                    <div className="pt-4">
                        <TemplatePreview
                            ratios={ratios}
                            elementType={elementType}
                        />
                    </div>
                </div>

                <div className="w-1/2">
                    <h2 className="text-xl font-bold mb-4">Tools</h2>

                    <div className="flex flex-row gap-1">
                        <button
                            onClick={() => setElementType('rectangle')}
                            className={isActive('rectangle')}
                        >
                            <div className="w-5 h-5 rounded bg-white" />
                        </button>

                        <button
                            onClick={() => setElementType('select')}
                            className={isActive('select')}
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
                                    d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={() => setElementType('resize')}
                            className={isActive('resize')}
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
                </div>
            </div>
        </Layout>
    );
}
