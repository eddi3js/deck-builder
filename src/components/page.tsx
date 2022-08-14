import React from 'react';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

export default function Page({
    children,
    title,
    hideSidebar,
}: {
    children: React.ReactNode;
    title?: string;
    hideSidebar?: boolean;
}) {
    return (
        <div className="flex h-screen w-full flex-col overflow-hidden">
            <Header />
            <div className="flex h-full overflow-hidden bg-white dark:bg-gray-900">
                {!hideSidebar && <Sidebar />}
                <div className="flex-1 overflow-auto p-8">
                    <div className="mx-auto flex max-w-4xl flex-col gap-8 dark:text-white">
                        {title && (
                            <h1 className="text-2xl font-bold mb-7">{title}</h1>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
