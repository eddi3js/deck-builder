import Layout from '@/components/layout';
import type { NextPage } from 'next';
import { AuthContext, authPage } from '@/utils/authPage';
import NavItemBlock from '@/components/navItemBlock';
import { Routes } from '@/utils/constants';

const Home: NextPage = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                <NavItemBlock label="Card Templates" to={Routes.Templates} />
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}

export default Home;
