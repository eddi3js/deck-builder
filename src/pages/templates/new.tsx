import Layout from '@/components/layout';
import React, { useState } from 'react';
import CardPreview from './components/cardPreview';
import CardTemplateDefaultFields from './components/defaultFields';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import MetaFieldComponent, { MetaFields } from './components/metaField';

export interface DefaultFields {
    name: string;
    label: string;
    value: string;
    placeholder: string;
}

export default function NewTemplate() {
    const [ratios, setRatios] = useState<number[]>([2.5, 3.5]);
    const [metaFields, setMetaFields] = useState<MetaFields[]>([]);
    const [editMetaField, setEditMetaField] = useState<boolean>(false);
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

    const saveMetaField = (newFields: MetaFields) => {
        const index = metaFields.findIndex(
            field => field.name === newFields.name
        );

        if (index === -1) {
            const updatedFields = [...metaFields, newFields];
            setMetaFields(updatedFields);
        }
    };

    const removeMetaField = (name: string) => {
        const updatedState = [...metaFields];
        const index = metaFields.findIndex(
            field => field.name.toLowerCase() === name.toLowerCase()
        );

        updatedState.splice(index, 1);
        setMetaFields(updatedState);
    };

    const sanitiezedMetaFields = metaFields.map(field => {
        const { edit, ...rest } = field;
        return rest;
    });

    const updateMetaField = (field: MetaFields, index: number) => {
        const existingIndex = metaFields.findIndex(
            field => field.name.toLowerCase() === field.name.toLowerCase()
        );

        console.log(existingIndex, metaFields[index], field.name);

        if (existingIndex === -1) {
            const updatedFields = [...metaFields];
            updatedFields[index] = { ...field, edit: false };
            setMetaFields(updatedFields);
        }
    };

    const editing = metaFields.some(field => field.edit);

    return (
        <Layout
            title="New Card Template"
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
                        <MetaFieldComponent save={saveMetaField} />

                        {metaFields.map((field, index: number) => (
                            <MetaFieldComponent
                                key={field.name}
                                edit={field.edit}
                                update={updateMetaField}
                                save={saveMetaField}
                                data={field}
                                remove={removeMetaField}
                                index={index}
                            />
                        ))}

                        <div className="text-xs mt-5 relative">
                            {metaFields.length > 0 && (
                                <button
                                    onClick={() => {
                                        const updatedEdit = !editMetaField;
                                        setMetaFields(
                                            metaFields.map(field => {
                                                return {
                                                    ...field,
                                                    edit: updatedEdit,
                                                };
                                            })
                                        );
                                        setEditMetaField(updatedEdit);
                                    }}
                                >
                                    <span className="text-gray-300 hover:text-white absolute top-8 right-3">
                                        {!editing ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        )}
                                    </span>
                                </button>
                            )}

                            <SyntaxHighlighter
                                wrapLines={true}
                                language="javascript"
                                style={atomDark}
                            >
                                {JSON.stringify(sanitiezedMetaFields, null, 2)}
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
