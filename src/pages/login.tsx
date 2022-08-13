/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

const btn = 'bg-black px-3 py-2 text-md text-white rounded w-fit my-3';
const container =
    'max-w-2xl mx-auto p-8 flex flex-col justify-center items-center text-center';

export default function Login() {
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            signOut();
        }
    }, [session]);

    if (session) {
        return (
            <div className={container}>
                <p>You are logged in: {session.user?.email}</p>
                {session.user && (
                    <img
                        src={session.user.image as string}
                        alt={session.user.name as string}
                        className="rounded-full h-16 w-16"
                    />
                )}
                <button onClick={() => signOut()} className={btn}>
                    Sign Out
                </button>
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
