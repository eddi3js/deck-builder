import Layout from '@/components/layout';
import { AuthContext, authPage } from '@/utils/authPage';
import Areas from './components/areas';
import DefaultCardFields from './components/defaults';
import Header from './components/header';
import TemplatePreview from './components/templatePreview';

export type ElementTypes = 'rectangle' | 'circle' | 'remove' | 'select';

export default function NewTemplate() {
    return (
        <Layout>
            <Header />
            <div className="flex flex-row gap-10">
                <div className="flex flex-col 2xl:flex-row 2xl:gap-10 flex-1">
                    <DefaultCardFields />
                    <Areas />
                </div>
                <div className="w-1/2">
                    <TemplatePreview />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
