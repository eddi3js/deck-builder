import Layout from '@/components/layout';
import type { NextPage } from 'next';
import { AuthContext, authPage } from '@/utils/authPage';

const Home: NextPage = () => {
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
