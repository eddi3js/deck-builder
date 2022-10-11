import Layout from '@/components/layout';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';

export default function Deck() {
    const { query } = useRouter();
    const { data } = trpc.useQuery(['games.getById', { id: query.gameId as string }]);
    const isNew = query.deckId === 'new';

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
                    label: data?.name ?? '...',
                    href: `${Routes.Games}/${query.gameId ?? ''}`,
                },
                {
                    icon: isNew ? 'new-document' : 'document',
                    label: isNew ? 'New Deck' : data?.name ?? '',
                    href: `${Routes.Games}/${query.gameId}/${Routes.Decks}/${
                        isNew ? 'new' : query.deckId
                    }`,
                    active: true,
                },
            ]}
        >
            <h1>Deck Details</h1>
        </Layout>
    );
}
