import React, { useEffect } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { useReadLocalStorage } from 'usehooks-ts';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { Routes } from '@/utils/constants';

export default function Layout({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const navigate = useRouter();
    const { data } = trpc.useQuery(['user.me']);
    useEffect(() => {
        if (data && data[0]?.emailVerified === null) {
            // not authorized
            navigate.push(Routes.Unauthorized);
        }
    }, [data, navigate]);

    const sidebarIsOpen = useReadLocalStorage('mobileSidebarOpen');
    return (
        <>
            <Head>
                <title>DeckBuilder.gg</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex h-screen w-full flex-col overflow-hidden">
                <Header />
                <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
                    {!sidebarIsOpen && <Sidebar />}
                    <div className="flex-1 overflow-auto p-8">
                        <div className={`flex flex-col dark:text-white pl-3`}>
                            {title && (
                                <h1 className="text-xl font-bold mb-3">
                                    {title}
                                </h1>
                            )}

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
