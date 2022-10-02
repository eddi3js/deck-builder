import { useCardTemplateStore } from '@/stores/cardTemplates';
import { useState } from 'react';

export default function BackgroundImage() {
    const { cardBackgroundImage, uploadBackgroundImage } = useCardTemplateStore();
    const [editType, setEditType] = useState<'upload' | 'url'>('upload');

    const handleChangeEditType = () => {
        const newEditType = editType === 'upload' ? 'url' : 'upload';
        // clear out the cardBackgroundImage
        uploadBackgroundImage(null);
        setEditType(newEditType);
    };

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        if (!file) return;

        uploadBackgroundImage(file);
    };

    const icon = {
        url: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
        ),
        upload: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
        ),
    };

    const UploadImage = () => (
        <>
            <div className="flex flex-row items-center gap-4">
                <button
                    onClick={() => {
                        const input = document.getElementById('file') as HTMLInputElement;
                        input.click();
                    }}
                    className="btn btn-sm btn-primary w-fit"
                >
                    {cardBackgroundImage ? 'Change' : 'Upload'}
                </button>
                {(cardBackgroundImage as File)?.name ?? null}
            </div>
            <input
                type="file"
                name="file"
                id="file"
                hidden
                onChange={handleUploadImage}
            />
        </>
    );

    const ImageUrl = () => (
        <div className="form-control w-full flex flex-row gap-4">
            <input
                type="text"
                value={(cardBackgroundImage as string) ?? ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    uploadBackgroundImage(e.target.value as string)
                }
                placeholder="Absolute image URL"
                className="input input-bordered w-full max-w-xs input-sm"
            />
        </div>
    );

    return (
        <div className="mb-4">
            <div className="flex flex-row gap-4 justify-between items-center">
                <p className="text-sm">Template Background:</p>
                <div className="flex flex-row gap-4 items-center mb-1">
                    {['upload', 'url'].map(t => {
                        return (
                            <button
                                key={t}
                                onClick={handleChangeEditType}
                                className={
                                    editType === t ? 'text-inherit' : 'text-secondary'
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    {icon[t as 'upload' | 'url']}
                                </svg>
                            </button>
                        );
                    })}
                </div>
            </div>
            {editType === 'upload' ? <UploadImage /> : <ImageUrl />}
        </div>
    );
}
