import { ElementObject, RoughElementOptions } from '@/server/models/canvas';
import { AreaFields, AreaTypes, useCardTemplateStore } from '@/stores/templates';

export default function Areas() {
    const { elements, removeElement, selectedElement, updateAreaMetadata } =
        useCardTemplateStore();

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        index: number
    ) => {
        const { value: targetValue, name } = e.target;
        // get the meta data from elements based on the index
        const element = elements[index] as ElementObject | undefined;
        if (!element) return;

        const { metadata } = element;
        const key = name === 'name' ? 'name' : 'type';
        const value = targetValue
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^a-z0-9-]/g, '');

        updateAreaMetadata(index, {
            ...metadata,
            [key as AreaTypes]: value,
        } as AreaFields);
    };

    return (
        <div className="flex flex-1 flex-col">
            <h2 className="text-sm mb-2 px-4">Template Areas ({elements.length}):</h2>
            {elements.length === 0 && <p className="text-sm px-4">No areas created</p>}
            {elements.map((area, index) => {
                return (
                    <div
                        className="area flex flex-col gap-2 border-2 border-transparent"
                        style={{
                            borderColor:
                                selectedElement?.index !== index
                                    ? 'transparent'
                                    : (area.roughElement.options as RoughElementOptions)
                                          .stroke,
                        }}
                        key={`element-fields-${index}`}
                    >
                        <div className="flex flex-row justify-between items-start gap-2 px-4 py-1.5">
                            <div className="flex flex-col flex-1">
                                <div className="flex flex-row gap-1 flex-1">
                                    <div className="flex flex-col">
                                        <p className="text-sm mb-1">Key Name</p>
                                        <input
                                            type="text"
                                            name="name"
                                            id={`area-name-${index}`}
                                            className="input input-bordered w-full input-sm"
                                            value={area.metadata.name}
                                            onChange={e => handleChange(e, index)}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm mb-1">Type</p>
                                        <select
                                            id={`area-type-${index}`}
                                            name="type"
                                            className="select select-bordered w-full select-sm"
                                            onChange={e => handleChange(e, index)}
                                            value={area.metadata.type}
                                            style={{ minWidth: 100 }}
                                        >
                                            <option value="string">String</option>
                                            <option value="number">Number</option>
                                            <option value="image">Image</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => removeElement(index)}
                                className="relative -bottom-8"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-gray-500 hover:text-red-500"
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
            })}
        </div>
    );
}
