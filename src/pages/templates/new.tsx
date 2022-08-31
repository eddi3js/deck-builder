import Layout from '@/components/layout';
import React, { useState } from 'react';
import CardPreview from './components/cardPreview';
import CardTemplateDefaultFields from './components/defaultFields';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import NewMetaField, { MetaFields } from './components/newMetaField';

export interface DefaultFields {
    name: string;
    label: string;
    value: string;
    placeholder: string;
}

export default function NewTemplate() {
    const [ratios, setRatios] = useState<number[]>([2.5, 3.5]);
    const [metaFields, setMetaFields] = useState<MetaFields[]>([]);
    const [defaultFields, setDefaultFields] = useState<DefaultFields[]>([
        {
            name: 'name',
            label: 'Card Name',
            value: '',
            placeholder: 'e.g. Heal Thyself',
        },
        {
            name: 'type',
            label: 'Card Type',
            value: '',
            placeholder: 'e.g. health',
        },
    ]);

    const updateAspectRadio = (type: 'width' | 'height', value: number) => {
        const index = type === 'width' ? 0 : 1;
        const newState = [...ratios];

        newState[index] = value;
        setRatios(newState);
    };

    const updateDefaultFelds = (name: string, newValue: string) => {
        const newState = [...defaultFields];
        const index: number = newState.findIndex(field => field.name === name);

        newState[index]!.value = newValue;
        setDefaultFields(newState);
    };

    const inputValue = (name: string): DefaultFields => {
        const index: number = defaultFields.findIndex(
            field => field.name === name
        );
        return defaultFields[index]!;
    };

    const nameValue = inputValue('name');
    const typeValue = inputValue('type');
    const nonMetaFields: DefaultFields[] = [nameValue, typeValue];

    const saveMetaField = (fields: MetaFields) => {
        const updatedState = [...metaFields];

        // see if there's already a field with the same name
        const index = updatedState.findIndex(
            field => field.name === fields.name
        );

        if (index === -1) {
            updatedState.push(fields);
            setMetaFields(updatedState);
        }
    };

    return (
        <Layout
            title="New Template"
            callToAction={
                <button className="bg-purple-500 hover:bg-purple-700 text-white text-md px-5 py-2 rounded">
                    Save
                </button>
            }
        >
            <div className="flex flex-col md:flex-row gap-8 justify-between h-full">
                <div className="flex flex-col w-full md:w-1/2 md:border-r border-gray-800 md:pr-8">
                    <h2 className="font-bold text-lg mb-4">
                        Template Data Fields
                    </h2>

                    <CardTemplateDefaultFields
                        fields={nonMetaFields}
                        updateDefaultFelds={updateDefaultFelds}
                    />

                    <div className="flex flex-col flex-1 mt-10">
                        <NewMetaField save={saveMetaField} />

                        <div className="text-xs mt-5">
                            <SyntaxHighlighter
                                wrapLines={true}
                                language="javascript"
                                style={atomDark}
                            >
                                {JSON.stringify(metaFields, null, 2)}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start flex-1">
                    <CardPreview
                        updateAspectRadio={updateAspectRadio}
                        ratios={ratios}
                    />
                </div>
            </div>
        </Layout>
    );
}
