import Layout from '@/components/layout';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function GamePage() {
    const { query } = useRouter();
    const isNew = query.gameId === 'new';

    const { refetch, isLoading, data } = trpc.useQuery(
        ['games.getGameById', { id: query.gameId as string }],
        {
            enabled: false,
        }
    );

    useEffect(() => {
        if (!isNew && query.gameId) {
            console.log('fired');
            refetch();
        } else {
            // resetState();
            // resetStoreState();
        }
    }, [query]);

    console.log(data, 'THE DATA');

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
                    label: isNew ? 'New Game' : data?.name ?? '',
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
