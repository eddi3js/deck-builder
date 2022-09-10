import { TextInput } from 'flowbite-react';

interface CardPreviewProps {
    ratios: number[];
}

export default function TemplatePreview({ ratios }: CardPreviewProps) {
    return (
        <>
            <h2 className="font-bold text-lg">Template Preview</h2>
            <div className="w-full h-full flex flex-row justify-between gap-4">
                <CardPreview ratios={ratios} />
                <div className="min-h-full bg-black w-10"></div>
            </div>
        </>
    );
}

const CardPreview = ({ ratios }: { ratios: number[] }) => {
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
        <div
            className="bg-gray-800 relative w-full h-full rounded self-center object-contain p-8 flex flex-col justify-center items-center"
            style={{
                aspectRatio: `${aspectRatio('height')}/${aspectRatio('width')}`,
            }}
        ></div>
    );
};
