import Layout from '@/components/layout';
import NavItemBlock from '@/components/navItemBlock';
import { GameList } from '@/server/models/games';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import NewGameModal from './newGameModal';

export default function Games() {
    const { data, isLoading } = trpc.useQuery(['games.get', { listOnly: true }]);
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
            <NewGameModal />
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
