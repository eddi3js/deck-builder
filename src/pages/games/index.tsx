import Page from '@/components/page';
import { getSession, GetSessionParams } from 'next-auth/react';
import authenticateUser, { RedirectResult } from '@/utils/authenticateUser';
import { Routes } from '@/lib/consts';
import { Game } from '@/models/game';
import { Response } from '@/models/api';
import { Card } from 'flowbite-react';

export default function Games({ games }: { games: Game[] }) {
    return (
        <Page>
            <h1 className="text-xl">My Games</h1>
            {games.length === 0 && <NoGames />}

            <div className="flex flex-col md:flex-row flex-wrap gap-5">
                {games.map(game => {
                    return (
                        <Card key={game._id.toString()}>
                            <div className="flex flex-col h-full w-full relative">
                                <div className="flex flex-col flex-1">
                                    <p
                                        className="text-md"
                                        style={{ maxWidth: '80%' }}
                                    >
                                        {game.name}
                                    </p>
                                    <p className="text-xs mt-1">Decks: 0 / ~</p>
                                    <div className="text-xs mt-1 text-gray-400">
                                        Last Edit: 08/01/2022 at 12:00am
                                    </div>
                                </div>

                                <div className="-mb-4 mt-2 w-full flex flex-row justify-end text-gray-300">
                                    <button className="p-2 hover:bg-gray-700 duration-75 rounded">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 hover:text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>

                                    <a
                                        href={`${Routes.Games}/${game.slug}`}
                                        className="p-2 hover:bg-gray-700 duration-75 rounded -mr-3"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 hover:text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </Page>
    );
}

const NoGames = () => (
    <>
        <p>You have no games</p>
        <a
            href={Routes.CreateGame}
            className="px-3 py-2 flex flex-row items-center justify-between rounded bg-blue-500 hover:bg-blue-700 transition ease-in-out duration-75 text-white text-sm w-fit"
        >
            Create Your First Game
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white ml-3"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                />
            </svg>
        </a>
    </>
);

export const getServerSideProps = async (context: GetSessionParams) => {
    const session = await getSession(context);
    const auth = await authenticateUser(session);
    if ((auth as RedirectResult)?.redirect) {
        return auth;
    }

    let games: Game[] = [];

    // get a list of all the games the user has created
    const fetchGames = await fetch(
        `${process.env.NEXTAUTH_URL}/api/games?email=${session?.user?.email}`
    );

    if (fetchGames?.status === 200) {
        games = ((await fetchGames.json()) as Response<Game[]>)?.data ?? [];
    }

    return {
        props: {
            user: session?.user ?? null,
            games,
        },
    };
};
