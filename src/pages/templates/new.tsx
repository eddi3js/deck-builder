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
                    <div className="flex flex-row gap-5">
                        <h2 className="text-xl font-bold">Card Preview</h2>
                        <div>
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
                        </div>
                    </div>

                    <div className="pt-4">
                        <TemplatePreview
                            ratios={ratios}
                            elementType={elementType}
                        />
                    </div>
                </div>

                <div className="w-1/2">
                    <div className="flex flex-row gap-4">
                        <h2 className="text-xl font-bold mb-4">Tools</h2>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
