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
            <div className="grid grid-cols-3 gap-10">
                <TemplatePreview />
                <DefaultCardFields />
                <Areas />
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
