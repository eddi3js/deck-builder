import Page from '@/components/page';
import Profile from '@/components/profile';
import { DiscordAccount } from '@/models/beta';
import authenticateUser from '@/utils/authenticateUser';
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
                <title>DeckBuilder.gg</title>
            </Head>

            <Page>
                <h1 className="text-2xl text-gray-200 my-4">
                    Welcome to DeckBuilder.gg
                </h1>
                <p className="text-sm">
                    You are logged in as:{' '}
                    <span className="text-purple-400 font-bold">
                        {user?.email}
                    </span>
                </p>
            </Page>
        </div>
    );
};

export const getServerSideProps = async (context: GetSessionParams) => {
    const session = await getSession(context);
    return await authenticateUser(session);
};

export default Home;
