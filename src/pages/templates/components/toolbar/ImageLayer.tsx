import { useCardTemplateStore } from '@/stores/cardTemplates';
import createElement from '@/utils/canvas/createElement';

export default function ImageLayer() {
    const { elements, setElements } = useCardTemplateStore();

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (!file) return;

        const element = createElement(elements.length, 0, 0, 0, 0, 'image', file);
        setElements([...elements, element]);
    };

    return (
        <div className="tooltip tooltip-bottom" data-tip="Add Image Layer">
            <button
                onClick={() => {
                    const input = document.getElementById('file') as HTMLInputElement;
                    input.click();
                }}
                className="p-1 cursor-pointer border-2 border-transparent"
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
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                </svg>
            </button>
            <input
                type="file"
                name="file"
                id="file"
                onChange={handleUploadImage}
                hidden
            />
        </div>
    );
}
