import { ElementObject } from '@/server/models/canvas';
import { useCardTemplateStore } from '@/stores/cardTemplates';
import { trpc } from '@/utils/trpc';

interface SaveTemplateProps {
    templateId: string | undefined;
    userId: string | undefined;
}

export default function SaveTemplate({ templateId, userId }: SaveTemplateProps) {
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
            await mutateAsync(body);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            onClick={save}
            className={`btn text-white btn-sm px-7 btn-info ${
                isLoading ? 'loading bg-gray-500 text-gray-800 border-gray-500' : ''
            }`}
        >
            Save
        </button>
    );
}
