import DeleteModal from '@/components/deleteModal';
import { ElementObject } from '@/server/models/canvas';
import { useCardTemplateStore } from '@/stores/cardTemplates';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
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
            // TODO: Handle error
            console.log(error);
        }
    };

    return (
        <div className="flex flex-row gap-2">
            <button
                onClick={save}
                className={`btn text-white btn-secondary btn-sm px-5 btn-action ${
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
            {templateId && (
                <DeleteModal
                    redirect={Routes.Templates}
                    modalId="delete-modal-confirm"
                    api="templates.deleteById"
                    name={templateName}
                    id={templateId}
                />
            )}
        </div>
    );
}
