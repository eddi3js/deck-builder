import NewElementModal from '@/components/newElementModal';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import DeckList from './deckList';

export default function GameDetails() {
    const { query, push } = useRouter();
    const { name, updateName } = useGameStore();
    const { mutateAsync, isLoading } = trpc.useMutation(['decks.post']);

    const createDeck = async (name: string) => {
        const response = await mutateAsync({ name, gameId: query.gameId as string });
        push(`${Routes.Games}/${response.gameId}/decks/${response.id}`);
    };

    return (
        <div className="flex flex-col w-full gap-3">
            <div className="my-4">
                <p className="text-sm font-bold mb-1">Name</p>
                <input
                    placeholder="Enter game name"
                    value={name}
                    id="name"
                    type="text"
                    onChange={e => updateName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            <div className="flex flex-row gap-4 items-center">
                <h2 className="text-xl font-bold">Decks:</h2>
                <NewElementModal
                    isLoading={isLoading}
                    action={createDeck}
                    className="btn btn-primary w-fit text-white btn-sm gap-2"
                    label="deck"
                    id="new-deck-modal"
                    title="New"
                    icon={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    }
                />
            </div>

            <DeckList gameId={query?.gameId as string | undefined} />
        </div>
    );
}
