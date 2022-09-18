import Layout from '@/components/layout';
import { AuthContext, authPage } from '@/utils/authPage';
import Areas from './components/areas';
import DefaultCardFields from './components/defaults';
import Header from './components/header';
import TemplatePreview from './components/templatePreview';

export default function NewTemplate() {
    return (
        <Layout>
            <Header />
            <div className="flex flex-row gap-10">
                <TemplatePreview />
                <div className="flex flex-col lg:flex-row gap-10">
                    <DefaultCardFields />
                    <Areas />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
