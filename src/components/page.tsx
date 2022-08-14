import { DiscordAccount } from '@/models/user';
import { useSession } from 'next-auth/react';
import React from 'react';
import Header from './header';

export default function Page({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const { data } = useSession();
    const userData = (data?.user as DiscordAccount) ?? null;
    return (
        <>
            <Header user={userData} />
            <div className="mt-16 max-w-4xl mx-auto px-8 lg:px-0 py-8 flex flex-col">
                {title && <h1 className="text-2xl font-bold mb-7">{title}</h1>}
                {children}
            </div>
        </>
    );
}
