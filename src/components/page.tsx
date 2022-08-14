import React from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import Head from 'next/head';
import Subnavigation, { SubnavigationLinkProps } from './subnavigation';

export default function Page({
    children,
    title,
    hideSidebar,
    subnavigation,
    gutters = true,
}: {
    children: React.ReactNode;
    title?: string;
    hideSidebar?: boolean;
    gutters?: boolean;
    subnavigation?: SubnavigationLinkProps[];
}) {
    return (
        <>
            <Head>
                <title className="uppercase">DeckBuilder.gg</title>
            </Head>
            <div className="flex h-screen w-full flex-col overflow-hidden">
                <Header />
                <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
                    {!hideSidebar && <Sidebar />}
                    <div
                        className={`flex-1 overflow-auto ${
                            gutters === false ? 'p-0' : 'p-8'
                        }`}
                    >
                        {subnavigation && (
                            <Subnavigation links={subnavigation} />
                        )}
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
