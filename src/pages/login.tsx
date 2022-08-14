import Page from '@/components/page';
import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <Page>
            You are not logged in.
            <button
                onClick={() => signIn()}
                className="bg-black px-3 py-2 text-md text-white rounded w-fit my-3"
            >
                Sign In
            </button>
        </Page>
    );
}
