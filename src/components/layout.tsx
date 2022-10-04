import React, { useEffect } from 'react';
import Header from '@/components/header';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { Routes } from '@/utils/constants';
import Breadcrumbs, { NavLink } from './breadcrumbs';

export default function Layout({
    children,
    gutters,
    breadcrumbLinks,
    action,
}: {
    children: React.ReactNode;
    gutters?: boolean;
    breadcrumbLinks?: NavLink[];
    action?: React.ReactNode;
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
                <Breadcrumbs links={breadcrumbLinks ?? []} action={action} />
                <div className="flex h-full overflow-hidden">
                    <div
                        className={`flex-1 ${
                            gutters !== undefined && gutters === false ? '' : 'p-8 pt-3'
                        }`}
                    >
                        <div className={`flex flex-col h-full`}>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
