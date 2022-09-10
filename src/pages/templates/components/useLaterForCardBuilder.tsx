import { Select } from 'flowbite-react';
import { SetStateAction, useEffect, useRef, useState } from 'react';

export type MetaFieldTypes = 'string' | 'number' | 'image';

export interface MetaFields {
    name: string;
    value: string | number | File;
    type: MetaFieldTypes;
    edit: boolean;
}

interface NewMetaFieldProps {
    save: (fields: MetaFields, oldName?: string) => void;
    update?: (fields: MetaFields, index: number) => void;
    remove?: (name: string) => void;
    data?: MetaFields;
    edit?: boolean;
    index?: number;
}

export default function MetaField({
    save,
    data,
    edit,
    remove,
    update,
    index,
}: NewMetaFieldProps) {
    return null;
    // const [newMetaField, setNewMetaField] = useState<MetaFields | null>(null);

    // useEffect(() => {
    //     if (edit && data) {
    //         setNewMetaField(data);
    //     }
    // }, [edit]);

    // const onSave = () => {
    //     if (!newMetaField) return;
    //     if (newMetaField.name === '' || newMetaField.value === '') return;

    //     if (newMetaField.edit) {
    //         if (update && index !== undefined) {
    //             update(newMetaField, index);
    //         }
    //     } else {
    //         save(newMetaField);
    //     }
    //     setNewMetaField(null);
    // };

    // const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!e.target.files) return;
    //     const file = e.target.files[0];
    //     console.log('file', file);
    //     if (file) {
    //         setNewMetaField({
    //             name: newMetaField?.name ?? '',
    //             type: newMetaField?.type ?? 'string',
    //             edit: newMetaField?.edit ?? false,
    //             value: file as File,
    //         });
    //     }
    // };

    // if (data && !data.edit) return null;

    // return (
    //     <>
    //         <div className="flex flex-col lg:flex-row lg:justify-between items-start">
    //             {!edit && (
    //                 <>
    //                     <div className="w-full lg:w-3/4">
    //                         <h2>Meta Data</h2>
    //                         <p className="text-sm text-gray-300 mt-2">
    //                             Use the fields below to add meta data to the
    //                             card template
    //                         </p>
    //                     </div>

    //                     <button
    //                         onClick={() =>
    //                             setNewMetaField({
    //                                 name: '',
    //                                 value: '',
    //                                 type: 'string',
    //                                 edit: false,
    //                             })
    //                         }
    //                         className="flex w-full h-fit lg:w-fit flex-row gap-3 px-2 py-1 text-xs justify-center lg:justify-start items-center bg-purple-500 hover:bg-purple-700 rounded"
    //                     >
    //                         Add Field
    //                         <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             fill="none"
    //                             viewBox="0 0 24 24"
    //                             strokeWidth={1.5}
    //                             stroke="currentColor"
    //                             className="w-5 h-5 font-bold"
    //                         >
    //                             <path
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    //                             />
    //                         </svg>
    //                     </button>
    //                 </>
    //             )}
    //         </div>
    //         {newMetaField && (
    //             <div className="flex flex-col my-5 py-5 border border-gray-800 rounded p-5">
    //                 <div className="mb-2 w-full flex flex-col">

    //                 </div>
    //                 <div className="flex flex-row justify-between gap-4">
    //                     <div className="flex flex-col w-full">
    //                         <label className="text-sm text-gray-500">
    //                             Type
    //                         </label>
    //                         <select
    //                             className="p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
    //                             onChange={(
    //                                 e: React.ChangeEvent<HTMLSelectElement>
    //                             ) => {
    //                                 setNewMetaField({
    //                                     ...newMetaField,
    //                                     value: '',
    //                                     type: e.target.value.toLowerCase() as MetaFieldTypes,
    //                                 });
    //                             }}
    //                         >
    //                             <option
    //                                 selected={newMetaField?.type === 'string'}
    //                             >
    //                                 String
    //                             </option>
    //                             <option
    //                                 selected={newMetaField?.type === 'number'}
    //                             >
    //                                 Number
    //                             </option>
    //                             <option
    //                                 selected={newMetaField?.type === 'image'}
    //                             >
    //                                 Image
    //                             </option>
    //                         </select>
    //                     </div>
    //                     <div className="flex flex-col w-full">
    //                         <label className="text-sm text-gray-500">
    //                             Value
    //                         </label>
    //                         {newMetaField.type !== 'image' ? (
    //                             <input
    //                                 onChange={(
    //                                     e: React.ChangeEvent<HTMLInputElement>
    //                                 ) => {
    //                                     setNewMetaField({
    //                                         ...newMetaField,
    //                                         value: (newMetaField?.type ===
    //                                         'number'
    //                                             ? e.target.value !== ''
    //                                                 ? parseInt(e.target.value)
    //                                                 : ''
    //                                             : e.target.value.toLocaleLowerCase()) as MetaFieldTypes,
    //                                     });
    //                                 }}
    //                                 type={newMetaField?.type}
    //                                 value={
    //                                     (newMetaField?.value ?? '') as
    //                                         | string
    //                                         | number
    //                                 }
    //                                 className="flex-1 flex border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
    //                             />
    //                         ) : (
    //                             <>
    //                                 <input
    //                                     type="file"
    //                                     name="file"
    //                                     id="file"
    //                                     onChange={handleUploadImage}
    //                                     hidden
    //                                 />
    //                                 <button
    //                                     onClick={() => {
    //                                         const input =
    //                                             document.getElementById(
    //                                                 'file'
    //                                             ) as HTMLInputElement;
    //                                         input.click();
    //                                     }}
    //                                     className="h-full text-sm rounded bg-blue-500 py-1.5 px-3"
    //                                 >
    //                                     {newMetaField.type === 'image' &&
    //                                     (newMetaField?.value as File)?.name
    //                                         ? 'Update Image'
    //                                         : 'Upload Image'}
    //                                 </button>
    //                                 {newMetaField.value !== '' &&
    //                                     newMetaField.type === 'image' && (
    //                                         <span className="text-xs text-gray-500 w-full flex flex-row justify-end gap-2 mt-1">
    //                                             {
    //                                                 (
    //                                                     newMetaField?.value as File
    //                                                 )?.name
    //                                             }
    //                                             <svg
    //                                                 xmlns="http://www.w3.org/2000/svg"
    //                                                 fill="none"
    //                                                 viewBox="0 0 24 24"
    //                                                 strokeWidth={1.5}
    //                                                 stroke="currentColor"
    //                                                 className="w-4 h-4 text-green-500"
    //                                             >
    //                                                 <path
    //                                                     strokeLinecap="round"
    //                                                     strokeLinejoin="round"
    //                                                     d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    //                                                 />
    //                                             </svg>
    //                                         </span>
    //                                     )}
    //                             </>
    //                         )}
    //                     </div>
    //                 </div>

    //                 <div className="flex flex-row justify-end gap-4">
    //                     <button
    //                         onClick={() => {
    //                             if (remove) {
    //                                 remove(newMetaField.name);
    //                             } else {
    //                                 setNewMetaField(null);
    //                             }
    //                         }}
    //                         className={`mt-3 self-end flex w-full h-fit lg:w-fit flex-row gap-3 p-2 px-3 text-xs justify-center lg:justify-start items-center ${
    //                             edit
    //                                 ? 'bg-red-500 hover:bg-red-700'
    //                                 : 'bg-gray-500 hover:bg-gray-700'
    //                         } rounded`}
    //                     >
    //                         {edit ? 'Remove' : 'Cancel'}
    //                     </button>

    //                     <button
    //                         onClick={onSave}
    //                         className="mt-3 self-end flex w-full h-fit lg:w-fit flex-row gap-3 p-2 px-3 text-xs justify-center lg:justify-start items-center bg-purple-500 hover:bg-purple-700 rounded"
    //                     >
    //                         {edit ? 'Update' : 'Save'}
    //                     </button>
    //                 </div>
    //             </div>
    //         )}
    //     </>
    // );
}
