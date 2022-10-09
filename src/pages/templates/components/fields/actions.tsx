import { ElementObject } from '@/server/models/canvas';
import { useCardTemplateStore } from '@/stores/cardTemplates';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface TemplateActionProps {
    templateId: string | undefined;
    userId: string | undefined;
}

export default function TemplateActions({ templateId, userId }: TemplateActionProps) {
    const { push } = useRouter();
    const {
        elements,
        templateName,
        ratios,
        cardRadius,
        cardBackgroundImage,
        cardBackgroundColor,
    } = useCardTemplateStore();

    const { mutateAsync, isLoading } = trpc.useMutation(['templates.post']);

    const body = {
        name: templateName as string,
        width: ratios[0]?.toString() as string,
        height: ratios[1]?.toString() as string,
        cornerBevel: cardRadius as number,
        backgroundColor: cardBackgroundColor as string,
        templateImage: cardBackgroundImage as string,
        elements: elements as ElementObject[],
        ...(userId && { userId, id: templateId }),
    };

    const save = async () => {
        try {
            const response = await mutateAsync(body);
            push(`${Routes.Templates}/${response}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-row gap-2">
            <button
                onClick={save}
                className={`btn text-white btn-primary btn-sm px-5 btn-action ${
                    isLoading ? 'loading' : ''
                }`}
            >
                Save
            </button>
            <label
                htmlFor="delete-modal-confirm"
                className="btn modal-button text-red-500 btn-sm bg-gray-700 border-gray-500 hover:bg-red-500 hover:border-red-500 hover:text-white"
            >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </label>
            {templateId && <DeleteModal templateName={templateName} id={templateId} />}
        </div>
    );
}

const DeleteModal = ({ templateName, id }: { templateName: string; id: string }) => {
    const { push } = useRouter();
    const [copiedTemplateName, setCopiedTemplateName] = useState('');
    const { mutateAsync, isLoading: isDeleting } = trpc.useMutation([
        'templates.deleteById',
    ]);
    const isConfirmed = copiedTemplateName === templateName;

    const handleDeleteTemplate = async () => {
        try {
            await mutateAsync(id);
            push(Routes.Templates);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <input type="checkbox" id="delete-modal-confirm" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-xl relative overflow-x-hidden whitespace-normal">
                    <label
                        htmlFor="delete-modal-confirm"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold text-lg mb-1">
                        Are you sure absolutely sure?
                    </h3>
                    <p className="py-3">
                        This action <b>cannot</b> be undone. This will permanently delete
                        the <b>{templateName}</b> template.
                    </p>
                    <p>Current copies of this template in games will still be usable.</p>
                    <p className="py-3">
                        Please type <b>{templateName}</b> to confirm.
                    </p>

                    <input
                        type="text"
                        onChange={e => setCopiedTemplateName(e.target.value)}
                        className="input input-bordered input-sm w-full mb-3"
                    />

                    <button
                        disabled={!isConfirmed || isDeleting}
                        onClick={handleDeleteTemplate}
                        className={`${
                            isDeleting ? 'loading' : ''
                        } btn btn-sm btn-error hover:bg-red-500 text-white w-full`}
                    >
                        I understand the consequences, delete this template
                    </button>
                </div>
            </div>
        </>
    );
};
