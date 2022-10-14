import { DeckState, useDeckStore } from '@/stores/decks';
import { useGameStore } from '@/stores/games';
import { useEffect } from 'react';
import { trpc } from './trpc';

interface UseFetchDataProps {
    deckId?: string;
    gameId?: string;
    options?: {
        deck: {
            returnType: 'normal' | 'slim';
        };
        game: {
            returnType: 'normal' | 'slim';
        };
    };
}

export default function useFetchDataGameData({ deckId, gameId }: UseFetchDataProps) {
    const { setInitialState } = useDeckStore();
    const { setGameData } = useGameStore();

    const { isLoading: isDeckLoading, refetch: fetchDeck } = trpc.useQuery(
        ['decks.getById', deckId as string],
        {
            enabled: false,
        }
    );
    const { isLoading: isGameLoading, refetch: fetchGame } = trpc.useQuery(
        ['games.getById', { id: gameId as string }],
        {
            enabled: false,
        }
    );

    useEffect(() => {
        if (deckId) {
            getDeckDetails();
        }
    }, [deckId]);

    useEffect(() => {
        if (gameId) {
            getGameDetails();
        }
    }, [gameId]);

    const getDeckDetails = async () => {
        const response = await fetchDeck();
        if (response?.data) {
            setInitialState(response.data as DeckState);
        }
    };

    const getGameDetails = async () => {
        const response = await fetchGame();
        if (response?.data) {
            setGameData(response.data);
        }
    };

    return {
        isDeckLoading,
        isGameLoading,
    };
}
