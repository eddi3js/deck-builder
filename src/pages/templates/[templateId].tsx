import Layout from '@/components/layout';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import Areas from './components/preview/areas';
import CardFields from './components/fields';
import TemplatePreview from './components/preview';
import SaveTemplate from './components/fields/save';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from '@/utils/trpc';
import { useCardTemplateStore } from '@/stores/cardTemplates';

export type ElementTypes = 'rectangle' | 'circle' | 'remove' | 'select';

export default function NewTemplate() {
    const { query } = useRouter();

    const isNew = query.templateId === 'new';
    const { refetch: fetchTemplateData, data } = trpc.useQuery(
        ['templates.getById', { id: query.templateId as string }],
        {
            enabled: false,
        }
    );
    const { updateStateWithTemplateData } = useCardTemplateStore();

    useEffect(() => {
        if (!isNew) {
            grabAllNecessaryData();
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
                    icon: 'document',
                    label: 'New Template',
                    href: `${Routes.Templates}/new`,
                    active: true,
                },
            ]}
            action={<SaveTemplate templateId={data?.id} userId={data?.userId} />}
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
