import Layout from '@/components/layout';
import type { NextPage } from 'next';
import { AuthContext, authPage } from '@/utils/authPage';
import NavItemBlock from '@/components/navItemBlock';
import { Routes } from '@/utils/constants';

const Home: NextPage = () => {
    return (
        <Layout>
            <div className="flex flex-row flex-wrap gap-4 mt-5">
                <NavItemBlock label="Card Templates" to={Routes.Templates} />
                <NavItemBlock label="Games" to={Routes.Games} />
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}

export default Home;
