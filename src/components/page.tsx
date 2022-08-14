import { DiscordAccount } from '@/models/beta';
import React from 'react';
import Header from './header';

export default function Page({
    children,
    user,
}: {
    children: React.ReactNode;
    user?: DiscordAccount;
}) {
    return (
        <div className="mt-10 max-w-2xl mx-auto p-8 flex flex-col text-center justify-center items-center">
            <Header user={user} />
            {children}
        </div>
    );
}
