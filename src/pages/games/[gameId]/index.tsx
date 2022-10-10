import Actions from '@/components/actions';
import Layout from '@/components/layout';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GameDetails from '../components/details';

export default function GamePage() {
    const { query } = useRouter();
    const isNew = query.gameId === 'new';

    const { setGameData, name } = useGameStore();
    const { isLoading, data } = trpc.useQuery([
        'games.getById',
        { id: query.gameId as string },
    ]);

    useEffect(() => {
        if (!isNew && data) {
            setGameData(data);
        }
    }, [isNew, data]);

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
            action={
                data && (
                    <Actions
                        isNew={isNew}
                        redirect={Routes.Games}
                        postApi="games.post"
                        deleteApi="games.delete"
                        deleteConfirmName={name}
                        modalId="delete-game-confirm"
                        payload={{
                            id: data.id,
                            name,
                        }}
                    />
                )
            }
        >
            <div className="flex flex-row gap-1 w-full flex-1 justify-between">
                {isLoading && !isNew ? 'Loading Game...' : <GameDetails />}
            </div>
        </Layout>
    );
}
