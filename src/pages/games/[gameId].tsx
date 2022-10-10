import Layout from '@/components/layout';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GameDetails from './components/detailsBlock';
import GameActions from './components/gameActions';

export default function GamePage() {
    const { query } = useRouter();
    const isNew = query.gameId === 'new';

    const { resetGameStore, setState } = useGameStore();
    const { refetch, isLoading, data } = trpc.useQuery(
        ['games.getById', { id: query.gameId as string }],
        {
            enabled: false,
        }
    );

    useEffect(() => {
        if (!isNew && query.gameId) {
            refetch();
        } else {
            resetGameStore();
        }
    }, [query]);

    useEffect(() => {
        if (data) {
            setState(data);
        }
    }, [data]);

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
            action={data && <GameActions name={data.name} gameId={data.id} />}
        >
            <div className="flex flex-row gap-1 w-full flex-1 justify-between">
                {isLoading || !data ? 'Loading Game...' : <GameDetails {...data} />}
            </div>
        </Layout>
    );
}
