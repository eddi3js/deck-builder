import Layout from '@/components/layout';
import { Routes } from '@/utils/constants';
import { Card } from 'flowbite-react';

export default function CardTemplates() {
    return (
        <Layout title="Card Templates">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <Card>
                    <div className="flex h-32 md:h-40 lg:h-60 w-full flex-col justify-center items-center">
                        <a
                            href={`${Routes.Templates}/new`}
                            className="flex flex-col w-full items-center text-gray-400 hover:text-blue-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-12"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            New Template
                        </a>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}
