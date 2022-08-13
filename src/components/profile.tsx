/* eslint-disable @next/next/no-img-element */
import { DiscordAccount } from '@/models/beta';
import { signOut } from 'next-auth/react';

export default function Profile({ user }: { user: DiscordAccount }) {
    return (
        <>
            <p>You are logged in: {user.email}</p>
            {user && (
                <img
                    src={user.image as string}
                    alt={user.name as string}
                    className="rounded-full h-16 w-16"
                />
            )}
            <button
                onClick={() => signOut()}
                className="bg-black px-3 py-2 text-md text-white rounded w-fit my-3"
            >
                Sign Out
            </button>
        </>
    );
}
