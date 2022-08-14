import { Routes } from '@/lib/consts';
import { DiscordAccount } from '@/models/user';
import { signIn, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
interface ConfirmSignupProps {
    user: DiscordAccount | null;
    fetchUrl: string;
}

export default function ConfirmSignup({ user }: ConfirmSignupProps) {
    const { push } = useRouter();
    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, []);

    const getProfile = async () => {
        const p = await fetch(`/api/users/me`).then(res => res.json());
        if (p) {
            push(Routes.Home);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="max-w-2xl mx-auto p-4 text-center">
                <h2 className="text-xl font-bold mb-3">
                    You do not have access to sign up for the beta yet.
                </h2>
                <p>Please try again later</p>
                <button
                    onClick={() => {
                        if (user) {
                            signOut();
                        } else {
                            signIn();
                        }
                    }}
                    className="bg-black px-3 py-2 text-md text-white rounded w-fit my-3"
                >
                    {user ? 'Sign Out' : 'Sign In'}
                </button>
            </div>
        </div>
    );
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    return {
        props: {
            user: session?.user ?? null,
        },
    };
};
