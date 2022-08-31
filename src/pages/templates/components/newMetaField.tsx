import { Select } from 'flowbite-react';
import { useState } from 'react';

export type MetaFieldTypes = 'string' | 'number' | 'image';

export interface MetaFields {
    name: string;
    value: string | number;
    type: MetaFieldTypes;
}

interface NewMetaFieldProps {
    save: (fields: MetaFields) => void;
}

export default function NewMetaField({ save }: NewMetaFieldProps) {
    const [newMetaField, setNewMetaField] = useState<MetaFields | null>(null);

    const onSave = () => {
        if (!newMetaField) return;
        // make sure the name and value have been set
        if (newMetaField.name === '' || newMetaField.value === '') return;

        save(newMetaField);
        setNewMetaField(null);
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:justify-between items-start">
                <div className="w-full lg:w-3/4">
                    <h2>Meta Data</h2>
                    <p className="text-sm text-gray-300 mt-2">
                        Use the fields below to add meta data to the card
                        template
                    </p>
                </div>
                <button
                    onClick={() =>
                        setNewMetaField({
                            name: '',
                            value: '',
                            type: 'string',
                        })
                    }
                    className="flex w-full h-fit lg:w-fit flex-row gap-3 px-2 py-1 text-xs justify-center lg:justify-start items-center bg-purple-500 hover:bg-purple-700 rounded"
                >
                    Add Field
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 font-bold"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </div>
            {newMetaField && (
                <div className="flex flex-col my-5 py-5 border border-gray-800 rounded p-5">
                    <div className="mb-2 w-full flex flex-col">
                        <label className="text-sm text-gray-500">
                            Key Name
                        </label>
                        <input
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                setNewMetaField({
                                    ...newMetaField,
                                    name: e.target.value,
                                })
                            }
                            className="flex-1 flex border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-4">
                        <div className="flex flex-col w-full">
                            <label className="text-sm text-gray-500">
                                Type
                            </label>
                            <Select
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                    setNewMetaField({
                                        ...newMetaField,
                                        value: '',
                                        type: e.target.value.toLocaleLowerCase() as MetaFieldTypes,
                                    });
                                }}
                                defaultValue={newMetaField?.type ?? 'string'}
                            >
                                <option>String</option>
                                <option>Number</option>
                                <option>Image</option>
                            </Select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-sm text-gray-500">
                                Value
                            </label>
                            {newMetaField.type !== 'image' ? (
                                <input
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setNewMetaField({
                                            ...newMetaField,
                                            value: (newMetaField?.type ===
                                            'number'
                                                ? e.target.value !== ''
                                                    ? parseInt(e.target.value)
                                                    : ''
                                                : e.target.value.toLocaleLowerCase()) as MetaFieldTypes,
                                        });
                                    }}
                                    type={newMetaField?.type}
                                    className="flex-1 flex border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                                />
                            ) : (
                                <button className="h-full text-sm rounded bg-blue-500 py-1.5 px-3">
                                    Upload Image
                                </button>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onSave}
                        className="mt-3 self-end flex w-full h-fit lg:w-fit flex-row gap-3 p-2 px-3 text-xs justify-center lg:justify-start items-center bg-purple-500 hover:bg-purple-700 rounded"
                    >
                        Save
                    </button>
                </div>
            )}
        </>
    );
}
