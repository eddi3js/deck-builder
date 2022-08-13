import { signIn, getSession, GetSessionParams } from 'next-auth/react';
interface ConfirmSignupProps {
    hasBetaAccount: boolean;
}

export default function ConfirmSignup({ hasBetaAccount }: ConfirmSignupProps) {
    if (!hasBetaAccount) {
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

export const getServerSideProps = async (
    context: GetSessionParams | undefined
) => {
    const session = await getSession(context);
    const hasBetaAccount = await fetch(
        `${process.env.NEXTAUTH_URL}/api/beta/${session?.user?.email}`
    );

    if (Boolean(hasBetaAccount.status === 200)) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    return {
        props: {
            hasBetaAccount: false,
        },
    };
};
