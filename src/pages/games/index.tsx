import Layout from '@/components/layout';
import NavItemBlock from '@/components/navItemBlock';
import { Game } from '@/server/models/games';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import NewGameModal from './newGameModal';

export default function Games() {
    const { data, isLoading } = trpc.useQuery(['games.get']);
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
                {isLoading
                    ? 'Loading...'
                    : data?.map((game: Game) => (
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
