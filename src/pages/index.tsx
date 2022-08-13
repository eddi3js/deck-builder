import Profile from '@/components/profile';
import { DiscordAccount } from '@/models/beta';
import hasBetaAccount from '@/utils/hasBetaAccount';
import type { NextPage } from 'next';
import { getSession, GetSessionParams } from 'next-auth/react';
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
    return await hasBetaAccount(session);
};

export default Home;
