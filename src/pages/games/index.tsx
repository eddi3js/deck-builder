import Layout from '@/components/layout';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import NewGameModal from './newGameModal';

export default function Games() {
    const { data, isLoading } = trpc.useQuery(['games.getAll']);
    console.log(isLoading, 'data');
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
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
