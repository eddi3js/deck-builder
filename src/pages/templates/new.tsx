import Layout from '@/components/layout';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import Areas from './components/areas';
import DefaultCardFields from './components/defaults';
import Images from './components/images';
import TemplatePreview from './components/preview';

export type ElementTypes = 'rectangle' | 'circle' | 'remove' | 'select';

export default function NewTemplate() {
    return (
        <Layout
            breadcrumbLinks={[
                {
                    icon: 'folder',
                    label: 'Card Templates',
                    href: Routes.Templates,
                },
                {
                    icon: 'document',
                    label: 'New Template',
                    href: `${Routes.Templates}/new`,
                    active: true,
                },
            ]}
        >
            <div className="flex flex-row gap-1 w-full flex-1 justify-between">
                <div className="flex flex-col bg-base-200 h-full w-72 p-4">
                    <DefaultCardFields />
                </div>

                <div>
                    <TemplatePreview />
                </div>

                <div className="flex flex-col w-80 bg-base-200 h-full py-4">
                    <Images />
                    <Areas />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
