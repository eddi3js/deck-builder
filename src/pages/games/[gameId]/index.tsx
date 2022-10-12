import Actions from '@/components/actions';
import Layout from '@/components/layout';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import useFetchDataGameData from '@/utils/useFetchData';
import { useRouter } from 'next/router';
import GameDetails from '../components/details';

export default function GamePage() {
    const { query } = useRouter();
    const isNew = query.gameId === 'new';

    const { name, id } = useGameStore();
    const { isGameLoading } = useFetchDataGameData({
        gameId: query.gameId as string,
    });

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
                    label: isNew ? 'New Game' : name,
                    href: `${Routes.Games}/${isNew ? 'new' : query.gameId}`,
                    active: true,
                },
            ]}
            action={
                <Actions
                    isNew={isNew}
                    redirect={Routes.Games}
                    postApi="games.post"
                    deleteApi="games.delete"
                    deleteConfirmName={name}
                    modalId="delete-game-confirm"
                    payload={{
                        id,
                        name,
                    }}
                />
            }
        >
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col justify-start">
                    {isGameLoading && !isNew ? 'Loading Game...' : <GameDetails />}
                </div>
            </div>
        </Layout>
    );
}
