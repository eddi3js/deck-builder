import Layout from '@/components/layout';
import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { AuthContext, authPage } from '@/utils/authPage';

const Home: NextPage = ({ user }: any) => {
    const data = trpc.useQuery(['user.me']);
    // console.log('data', data);

    return (
        <Layout>
            <h1>Homepage</h1>
        </Layout>
    );
};

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}

export default Home;
