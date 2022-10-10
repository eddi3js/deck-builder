import Layout from '@/components/layout';
import NavItemBlock from '@/components/navItemBlock';
import { CardTemplatePayload } from '@/server/models/canvas';
import { AuthContext, authPage } from '@/utils/authPage';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';

export default function CardTemplates() {
    const { data, isLoading } = trpc.useQuery(['templates.get']);

    return (
        <Layout
            breadcrumbLinks={[
                {
                    icon: 'folder',
                    label: 'Card Templates',
                    href: Routes.Templates,
                    active: true,
                },
            ]}
        >
            <Link href={`${Routes.Templates}/new`}>
                <a className="mb-4 flex flex-row gap-3 btn-info btn font-normal rounded text-white w-fit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    New Template
                </a>
            </Link>
            <div className="my-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {isLoading
                    ? 'Loading...'
                    : data?.map((template: CardTemplatePayload) => (
                          <NavItemBlock
                              key={template.id}
                              to={`${Routes.Templates}/${template.id}`}
                              label={template.name}
                              icon="document"
                          />
                      ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context: AuthContext) {
    return await authPage(context);
}
