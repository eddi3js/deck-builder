/* eslint-disable @next/next/no-img-element */
import { signIn, getSession, GetSessionParams, signOut } from 'next-auth/react';
import { DiscordAccount } from '@/models/beta';

const btn = 'bg-black px-3 py-2 text-md text-white rounded w-fit my-3';

interface ConfirmSignupProps {
    user: DiscordAccount | null;
    isConnected: boolean;
}

export default function ConfirmSignup({
    user,
    isConnected,
}: ConfirmSignupProps) {
    if (isConnected && !user) {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <div className="max-w-2xl mx-auto p-4 text-center">
                    <h2 className="text-xl font-bold mb-3">
                        You do not have access to sign up for the beta yet.
                    </h2>
                    <p>Please try again later.</p>
                    <button
                        onClick={() => signIn()}
                        className="bg-purple-900 px-3 py-2 rounded mt-4 text-white text-lg"
                    >
                        Sign In Again
                    </button>
                </div>
            </div>
        );
    }

    if (isConnected && !user) {
        return (
            <div className="max-w-2xl mx-auto p-8 flex flex-col justify-center items-center">
                <h1>You are not signed in.</h1>
                <button onClick={() => signIn()} className={btn}>
                    Sign In
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8 flex flex-col justify-center text-center items-center">
            <p>You are logged in: {user?.email}</p>
            <img
                src={user?.image as string}
                alt={user?.name as string}
                className="rounded-full h-16 w-16 mt-4"
            />

            <button onClick={() => signOut()} className={btn}>
                Sign Out
            </button>
        </div>
    );
}

export const getServerSideProps = async (
    context: GetSessionParams | undefined
) => {
    const session = await getSession(context);
    let data = { props: { isConnected: false, user: session?.user ?? null } };

    if (!session)
        return {
            redirect: {
                destination: '/login',
            },
        };
    data.props.isConnected = true;

    const hasBetaAccount = await fetch(
        `${process.env.NEXTAUTH_URL}/api/beta/${session.user?.email}`
    );

    if (hasBetaAccount.status !== 200) {
        data.props.user = null;
    }

    return data;
};
