import Layout from '@/components/layout';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';

export default function Games() {
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
            <h1>Games Page</h1>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
