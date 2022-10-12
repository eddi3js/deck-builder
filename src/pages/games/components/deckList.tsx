import NavItemBlock from '@/components/navItemBlock';
import { Deck } from '@/server/router/decks';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';

interface DeckListProps {
    gameId: string | undefined;
}

export default function DeckList({ gameId }: DeckListProps) {
    const { decks } = useGameStore();

    if (!decks.length || gameId === '')
        return <p className="text-sm mt-5">No decks found </p>;

    return (
        <div className="flex flex-row flex-wrap gap-4 mt-5">
            {decks.map((deck: Deck) => (
                <NavItemBlock
                    key={deck.id}
                    label={deck.name}
                    to={`${Routes.Games}/${gameId}/decks/${deck.id}`}
                />
            ))}
        </div>
    );
}
