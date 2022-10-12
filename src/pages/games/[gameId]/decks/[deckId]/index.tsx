import Actions from '@/components/actions';
import Layout from '@/components/layout';
import NavItemBlock from '@/components/navItemBlock';
import { Card } from '@/server/router/decks';
import { useDeckStore } from '@/stores/decks';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import useFetchDataGameData from '@/utils/useFetchData';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Deck() {
    const { query } = useRouter();
    const { name: deckName, gameId, cards, id } = useDeckStore();
    const { name } = useGameStore();

    const { isDeckLoading } = useFetchDataGameData({
        deckId: query.deckId as string,
        gameId: query.gameId as string,
    });
    const isNew = query.deckId === 'new';

    const payload = {
        ...(!isNew && {
            id: query.deckId,
        }),
        name: deckName as string,
    };

    return (
        <Layout
            breadcrumbLinks={[
                {
                    icon: 'folder',
                    label: 'Games',
                    href: Routes.Games,
                },
                {
                    icon: 'folder',
                    label: name,
                    href: `${Routes.Games}/${query.gameId ?? ''}`,
                },
                {
                    icon: 'document',
                    label: deckName ?? '...',
                    href: `${Routes.Games}/${query.gameId ?? ''}`,
                    active: true,
                },
            ]}
            action={
                <Actions
                    isNew={isNew}
                    redirect={`${Routes.Games}/${query.gameId}/`}
                    deleteApi="decks.deleteById"
                    deleteConfirmName={deckName ?? ''}
                    postApi="decks.post"
                    modalId="delete-modal-confirm"
                    payload={payload}
                />
            }
        >
            <Link href={`${Routes.Games}/${gameId}/decks/${query.deckId}/cards/new`}>
                <a className="mb-4 flex flex-row gap-3 btn-secondary btn font-normal rounded text-white w-fit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    New Card
                </a>
            </Link>

            <div className="my-4 flex flex-row flex-wrap gap-4">
                {isDeckLoading
                    ? 'Loading...'
                    : cards.map((card: Card) => (
                          <NavItemBlock
                              key={card.id}
                              to={`${Routes.Games}/${gameId}/decks/${id}/cards/${card.id}`}
                              label={card.name}
                              icon="document"
                          />
                      ))}
                {!isDeckLoading && cards.length === 0 && (
                    <p className="text-sm">No cards found</p>
                )}
            </div>
        </Layout>
    );
}
