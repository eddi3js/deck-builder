/* eslint-disable @next/next/no-img-element */
import Profile from '@/components/profile';
import { DiscordAccount } from '@/models/beta';
import { useSession, signIn, signOut } from 'next-auth/react';

const btn = 'bg-black px-3 py-2 text-md text-white rounded w-fit my-3';
const container =
    'max-w-2xl mx-auto p-8 flex flex-col justify-center items-center text-center';

export default function Login() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className={container}>
                <Profile user={session.user as DiscordAccount} />
            </div>
        );
    }

    return (
        <div className={container}>
            You are not logged in.
            <button onClick={() => signIn()} className={btn}>
                Sign In
            </button>
        </div>
    );
}
