import { TextInput } from 'flowbite-react';

interface CardPreviewProps {
    ratios: number[];
    updateAspectRadio: (type: 'width' | 'height', value: number) => void;
}

export default function CardPreview({
    updateAspectRadio,
    ratios,
}: CardPreviewProps) {
    const width = ratios[0] as number;
    const height = ratios[1] as number;

    const aspectRatio = (type: 'width' | 'height') => {
        const ratio = width / height;
        let value = 0;

        if (ratio === 1) return 1;

        if (type === 'width') {
            value = parseInt((width / ratio).toFixed(1));
        }

        if (type === 'height') {
            value = parseInt((height * ratio).toFixed(1));
        }

        // see if the number is x.0
        if (value % 1 === 0) {
            return value.toFixed();
        }

        return value;
    };

    return (
        <>
            <h2 className="font-bold text-lg">Template Preview</h2>

            <div className="w-full my-4 flex flex-col">
                <p className="mb-2 text-gray-400">Card Sizes (in inches)</p>
                <div className="flex flex-row gap-2">
                    <div className="w-full xl:w-fit">
                        <label className="text-gray-300 text-xs mb-1">
                            Width
                        </label>
                        <TextInput
                            type="number"
                            name="width"
                            placeholder="(ex. 2.5)"
                            value={width}
                            step="0.5"
                            onChange={e =>
                                updateAspectRadio(
                                    'width',
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                    </div>
                    <div className="w-full xl:w-fit">
                        <label className="text-gray-300 text-xs mb-1">
                            Height
                        </label>
                        <TextInput
                            type="number"
                            name="height"
                            placeholder="(ex. 2.5)"
                            value={height}
                            step="0.5"
                            onChange={e =>
                                updateAspectRadio(
                                    'height',
                                    parseFloat(e.target.value)
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="w-full mb-10 mx-auto gap-5 mt-3 grid grid-cols-1 xl:grid-cols-2">
                <div
                    className="bg-gray-800 w-full h-full rounded self-center object-contain p-8 flex flex-col justify-center items-center"
                    style={{
                        aspectRatio: `${aspectRatio('height')}/${aspectRatio(
                            'width'
                        )}`,
                    }}
                >
                    <label className="block mb-2 text-sm" htmlFor="file_input">
                        Front Card Image
                    </label>
                    <input id="front_image" hidden type="file" />
                    <button className="text-sm rounded bg-blue-500 py-1.5 px-3">
                        Upload
                    </button>
                </div>

                <div
                    className="bg-gray-800 rounded w-full h-full object-contain p-8 flex flex-col justify-center items-center"
                    style={{
                        aspectRatio: `${aspectRatio('height')} / ${aspectRatio(
                            'width'
                        )}`,
                    }}
                >
                    <label className="block mb-2 text-sm" htmlFor="file_input">
                        Back Card Image
                    </label>
                    <input id="front_image" hidden type="file" />
                    <button className="text-sm rounded bg-blue-500 py-1.5 px-3">
                        Upload
                    </button>
                </div>
            </div>
        </>
    );
}
