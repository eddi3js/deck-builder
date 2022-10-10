import Layout from '@/components/layout';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import Areas from './components/preview/areas';
import CardFields from './components/fields';
import TemplatePreview from './components/preview';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from '@/utils/trpc';
import { useCardTemplateStore } from '@/stores/cardTemplates';
import { useToolsetStore } from '@/stores/toolset';
import Actions from '@/components/actions';
import { ElementObject } from '@/server/models/canvas';

export type ElementTypes = 'rectangle' | 'circle' | 'remove' | 'select';

export default function TemplatePage() {
    const { query } = useRouter();

    const isNew = query.templateId === 'new';
    const { refetch: fetchTemplateData, data } = trpc.useQuery(
        ['templates.getById', { id: query.templateId as string }],
        {
            enabled: false,
        }
    );
    const {
        updateStateWithTemplateData,
        resetState,
        elements,
        templateName,
        ratios,
        cardRadius,
        cardBackgroundImage,
        cardBackgroundColor,
    } = useCardTemplateStore();
    const { resetState: resetStoreState } = useToolsetStore();

    const payload = {
        ...(!isNew && {
            id: data?.id,
        }),
        name: templateName as string,
        width: ratios[0]?.toString() as string,
        height: ratios[1]?.toString() as string,
        cornerBevel: cardRadius as number,
        backgroundColor: cardBackgroundColor as string,
        templateImage: cardBackgroundImage as string,
        elements: elements as ElementObject[],
    };

    useEffect(() => {
        if (!isNew) {
            grabAllNecessaryData();
        } else {
            resetState();
            resetStoreState();
        }
    }, [isNew]);

    const grabAllNecessaryData = async () => {
        const ratioConverter = (ratio: string) => {
            return parseFloat(ratio.replace(/, /g, '.')).toFixed(1);
        };
        try {
            const fetch = await fetchTemplateData();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { width, height, userId, ...rest } = fetch.data as any;
            const templateState = {
                ...rest,
                ratios: [ratioConverter(width), ratioConverter(height)],
                cardBackgroundImage: rest.templateImage,
                templateName: rest.name,
            };
            updateStateWithTemplateData(templateState);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    return (
        <Layout
            breadcrumbLinks={[
                {
                    icon: 'folder',
                    label: 'Card Templates',
                    href: Routes.Templates,
                },
                {
                    icon: isNew ? 'new-document' : 'document',
                    label: isNew ? 'New Template' : data?.name ?? '',
                    href: `${Routes.Templates}/${isNew ? 'new' : query.templateId}`,
                    active: true,
                },
            ]}
            action={
                data && (
                    <Actions
                        isNew={isNew}
                        redirect={Routes.Templates}
                        deleteApi="templates.deleteById"
                        deleteConfirmName={templateName}
                        postApi="templates.post"
                        modalId="delete-modal-confirm"
                        payload={payload}
                    />
                )
            }
        >
            <div className="flex flex-row gap-1 w-full flex-1 justify-between">
                <div className="flex flex-col bg-base-200 h-full w-72 p-4">
                    <CardFields />
                </div>

                <div>
                    <TemplatePreview />
                </div>

                <div className="flex flex-col w-80 bg-base-200 h-full py-4">
                    <Areas />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
