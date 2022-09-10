import Layout from '@/components/layout';
import React from 'react';
import TemplatePreview from './components/canvas';

export interface DefaultFields {
    name: string;
    label: string;
    value: string;
    placeholder: string;
}

export default function NewTemplate() {
    const [ratios, setRatios] = React.useState<number[]>([2.5, 3.5]);

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
                        <TemplatePreview ratios={ratios} />
                    </div>
                </div>

                <div className="w-1/2">Tools</div>
            </div>
        </Layout>
    );
}
