import Page from '@/components/page';
import { Routes } from '@/lib/consts';
import { Game } from '@/models/game';
import authenticatePage, { RedirectResult } from '@/utils/authenticatePage';
import { getSession } from 'next-auth/react';

export default function GameDetailsPage({ game }: { game: Game }) {
    if (!game) return null;

    return (
        <Page>
            <h1 className="text-xl">{game.name}</h1>
        </Page>
    );
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    const auth = await authenticatePage(session);
    if ((auth as RedirectResult)?.redirect) {
        return auth;
    }

    const fetchGame = await fetch(
        `${process.env.NEXTAUTH_URL}/api/games/${context.query.slug}?email=${session?.user?.email}`
    );

    if (fetchGame?.status !== 200) {
        return {
            redirect: {
                destination: Routes.Games,
            },
        };
    }

    const game = await fetchGame.json();

    return {
        props: {
            user: session?.user ?? null,
            game: game?.data ?? null,
        },
    };
};
