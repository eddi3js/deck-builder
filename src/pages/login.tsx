/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from 'next-auth/react';

const btn = 'bg-black px-3 py-2 text-md text-white rounded w-fit my-3';

export default function Login() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div>
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
        <div className="max-w-2xl mx-auto p-8 flex flex-col justify-center align-center">
            You are not logged in.
            <button onClick={() => signIn()} className={btn}>
                Sign In
            </button>
        </div>
    );
}
