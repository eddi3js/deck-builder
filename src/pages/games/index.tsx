import Layout from '@/components/layout';
import NavItemBlock from '@/components/navItemBlock';
import NewElementModal from '@/components/newElementModal';
import { GameList } from '@/server/models/games';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';

export default function Games() {
    const { push } = useRouter();
    const { data, isLoading } = trpc.useQuery(['games.get', { listOnly: true }]);
    const { mutateAsync, isLoading: isAddingGame } = trpc.useMutation(['games.post']);

    const createGame = async (name: string) => {
        const response = await mutateAsync({ name });
        push(`${Routes.Games}/${response.id}`);
    };

    return (
        <Layout
            breadcrumbLinks={[
                {
                    icon: 'folder',
                    label: 'Games',
                    href: Routes.Games,
                    active: true,
                },
            ]}
        >
            <NewElementModal
                title="New Game"
                id="new-game-modal"
                label="game"
                isLoading={isAddingGame}
                action={createGame}
            />
            <div className="my-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {isLoading || !data
                    ? 'Loading...'
                    : data?.map((game: GameList) => (
                          <NavItemBlock
                              key={game.id}
                              to={`${Routes.Games}/${game.id}`}
                              label={game.name}
                          />
                      ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
