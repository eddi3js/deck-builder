import { signIn, getSession, GetSessionParams, signOut } from 'next-auth/react';
import { DiscordAccount } from '@/models/beta';
import Profile from '@/components/profile';
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
                <button
                    onClick={() => signIn()}
                    className="bg-black px-3 py-2 text-md text-white rounded w-fit my-3"
                >
                    Sign In
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8 flex flex-col text-center justify-center items-center">
            <Profile user={user as DiscordAccount} />
            <button
                onClick={() => {
                    window.location.href = '/';
                }}
                className="bg-black px-3 py-2 text-md text-white rounded w-fit my-3"
            >
                Go Home
            </button>
        </div>
    );
}

export const getServerSideProps = async (
    context: GetSessionParams | undefined
) => {
    const session = await getSession(context);
    console.log(session, 'session');
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
