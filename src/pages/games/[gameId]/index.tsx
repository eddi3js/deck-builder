import Actions from '@/components/actions';
import Layout from '@/components/layout';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GameDetails from '../components/details';

export default function GamePage() {
    const { query } = useRouter();
    const isNew = query.gameId === 'new';

    const { setGameData, name } = useGameStore();
    const { isLoading, data } = trpc.useQuery([
        'games.getById',
        { id: query.gameId as string },
    ]);

    useEffect(() => {
        if (!isNew && data) {
            setGameData(data);
        }
    }, [isNew, data]);

    return (
        <Layout
            breadcrumbLinks={[
                {
                    icon: 'folder',
                    label: 'Games',
                    href: Routes.Games,
                },
                {
                    icon: isNew ? 'new-document' : 'document',
                    label: isNew ? 'New Game' : data?.name ?? '',
                    href: `${Routes.Games}/${isNew ? 'new' : query.gameId}`,
                    active: true,
                },
            ]}
            action={
                <Actions
                    isNew={isNew}
                    redirect={Routes.Games}
                    postApi="games.post"
                    deleteApi="games.delete"
                    deleteConfirmName={name}
                    modalId="delete-game-confirm"
                    payload={{
                        id: data?.id,
                        name,
                    }}
                />
            }
        >
            <div className="drawer drawer-mobile gap-10">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col justify-start">
                    {isLoading && !isNew ? 'Loading Game...' : <GameDetails />}
                </div>
                <div className="drawer-side bg-base-300">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu flex flex-col p-4 w-56 bg-base-200 gap-2">
                        <li>
                            <a className="active">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>
                                Game Overview
                            </a>
                        </li>
                        <li>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                                    />
                                </svg>
                                My Decks
                            </a>
                        </li>
                        <li>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                    />
                                </svg>
                                Game Lore
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
