import { DiscordAccount } from '@/models/beta';
import authenticateUser, {
    AuthenticatedResult,
} from '@/utils/authenticateUser';
import { signIn, getSession, GetSessionParams, signOut } from 'next-auth/react';
interface ConfirmSignupProps {
    user: DiscordAccount | null;
}

export default function ConfirmSignup({ user }: ConfirmSignupProps) {
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

export const getServerSideProps = async (
    context: GetSessionParams | undefined
) => {
    const session = await getSession(context);
    const auth = await authenticateUser(session, '/', true);
    if ((auth as AuthenticatedResult)?.props?.hasBetaAccess) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }
    return auth;
};
