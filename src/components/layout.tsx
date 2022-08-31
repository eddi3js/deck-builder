import React, { useEffect } from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { Routes } from '@/utils/constants';

export default function Layout({
    children,
    title,
    callToAction,
}: {
    children: React.ReactNode;
    title?: string;
    callToAction?: React.ReactNode;
}) {
    const navigate = useRouter();
    const { data } = trpc.useQuery(['user.me']);
    useEffect(() => {
        if (data && data?.emailVerified === null) {
            // not authorized
            navigate.push(Routes.Unauthorized);
        }
    }, [data, navigate]);

    return (
        <>
            <Head>
                <title>DeckBuilder.gg</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex h-screen w-full flex-col overflow-hidden">
                <Header />
                <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
                    <Sidebar />
                    <div className="flex-1 overflow-auto p-8">
                        <div className={`flex flex-col h-full dark:text-white`}>
                            {title && (
                                <div className="flex flex-row mb-7 pb-3  justify-between items-center border-b border-gray-700">
                                    <h1 className="text-3xl font-bold">
                                        {title}
                                    </h1>
                                    {callToAction}
                                </div>
                            )}

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
