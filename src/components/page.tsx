import { DiscordAccount } from '@/models/beta';
import { useSession } from 'next-auth/react';
import React from 'react';
import Header from './header';

export default function Page({ children }: { children: React.ReactNode }) {
    const { data } = useSession();
    const userData = (data?.user as DiscordAccount) ?? null;
    return (
        <div className="mt-10 max-w-2xl mx-auto p-8 flex flex-col text-center justify-center items-center">
            <Header user={userData} />
            {children}
        </div>
    );
}
