import Layout from '@/components/layout';
import { Routes } from '@/utils/constants';
import { useRouter } from 'next/router';

export default function GamePage() {
    const { query } = useRouter();
    const isNew = query.gameId === 'new';

    return (
        <Layout
            breadcrumbLinks={[
                {
                    icon: 'folder',
                    label: 'Games',
                    href: Routes.Games,
                },
                {
                    icon: isNew ? 'new-document' : 'document',
                    label: isNew ? 'New Game' : '',
                    href: `${Routes.Games}/${isNew ? 'new' : query.gameId}`,
                    active: true,
                },
            ]}
            // action={<TemplateActions templateId={data?.id} userId={data?.userId} />}
        >
            <div className="flex flex-row gap-1 w-full flex-1 justify-between">
                <h1>Game Details</h1>
            </div>
        </Layout>
    );
}
