import Page from '@/components/page';
import { DiscordAccount } from '@/models/user';
import authenticatePage from '@/utils/authenticatePage';
import type { NextPage } from 'next';
import { getSession, GetSessionParams } from 'next-auth/react';

interface HomeProps {
    user: DiscordAccount | null;
}

const Home: NextPage = ({ user }: any) => {
    console.log(user, 'THE USER');
    return (
        <div>
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
    return await authenticatePage(session);
};

export default Home;
