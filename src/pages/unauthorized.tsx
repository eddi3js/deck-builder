import { NextPage } from 'next';
import Link from 'next/link';

const Unauthorized: NextPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="max-w-sm mx-auto text-center">
                <h1 className="text-4xl mb-3 font-bold">Not Authorized</h1>
                <p>You have not been added as a beta tester yet.</p>
                <p>
                    Please try again later or{' '}
                    <Link
                        href="/api/auth/signin"
                        className="underline text-blue-500"
                    >
                        <a>signin</a>
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default Unauthorized;
