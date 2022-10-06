import { ElementObject } from '@/server/models/canvas';
import { useCardTemplateStore } from '@/stores/cardTemplates';
import { trpc } from '@/utils/trpc';

export default function SaveTemplate() {
    const {
        elements,
        templateName,
        ratios,
        cardRadius,
        cardBackgroundImage,
        cardBackgroundColor,
    } = useCardTemplateStore();

    const { mutateAsync, isLoading } = trpc.useMutation(['templates.add']);

    const body = {
        name: templateName as string,
        width: ratios[0]?.toString() as string,
        height: ratios[1]?.toString() as string,
        cornerBevel: cardRadius as number,
        backgroundColor: cardBackgroundColor as string,
        templateImage: cardBackgroundImage as string,
        elements: elements as ElementObject[],
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
                isLoading ? 'loading' : ''
            }`}
        >
            Save
        </button>
    );
}
