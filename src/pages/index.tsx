import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { getSession, GetSessionParams, signOut } from 'next-auth/react';
import Head from 'next/head';

const Home: NextPage = props => {
    const { session } = props as { session: Session };
    return (
        <div>
            <Head>
                <title>Nascency Deck Builder</title>
            </Head>

            <p>Hello</p>
            <button onClick={() => signOut()}>Sign out</button>

            {JSON.stringify(session)}
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
        props: { session },
    };
};

export default Home;
