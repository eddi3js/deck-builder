import Layout from '@/components/layout';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import Areas from './components/preview/areas';
import CardFields from './components/fields';
import TemplatePreview from './components/preview';
import SaveTemplate from './components/fields/save';
import { useRouter } from 'next/router';

export type ElementTypes = 'rectangle' | 'circle' | 'remove' | 'select';

export default function NewTemplate() {
    const { query } = useRouter();
    // TODO: turn this into a fetch if the templateId is not "new"
    console.log('query', query);
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
            action={<SaveTemplate />}
        >
            <div className="flex flex-row gap-1 w-full flex-1 justify-between">
                <div className="flex flex-col bg-base-200 h-full w-72 p-4">
                    <CardFields />
                </div>

                <div>
                    <TemplatePreview />
                </div>

                <div className="flex flex-col w-80 bg-base-200 h-full py-4">
                    <Areas />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
