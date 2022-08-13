import Profile from '@/components/profile';
import { DiscordAccount } from '@/models/beta';
import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, GetSessionParams, signOut } from 'next-auth/react';
import Head from 'next/head';

interface HomeProps {
    user: DiscordAccount | null;
}

const Home: NextPage = props => {
    const user = (props as HomeProps)?.user;
    return (
        <div>
            <Head>
                <title>Nascency Deck Builder</title>
            </Head>

            <div className="max-w-2xl mx-auto p-8 flex flex-col text-center justify-center items-center">
                <Profile user={user as DiscordAccount} />
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: GetSessionParams) => {
    const session = await getSession(context);

    const redirect = {
        redirect: {
            destination: '/login',
        },
    };

    if (!session) {
        return redirect;
    }

    const hasBetaAccount = await fetch(
        `${process.env.NEXTAUTH_URL}/api/beta/${session.user?.email}`
    );

    if (hasBetaAccount.status !== 200) {
        return redirect;
    }

    return {
        props: { user: session?.user },
    };
};

export default Home;
