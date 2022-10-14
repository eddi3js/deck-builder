import Actions from '@/components/actions';
import Layout from '@/components/layout';
import { useDeckStore } from '@/stores/decks';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import useFetchDataGameData from '@/utils/useFetchData';
import { useRouter } from 'next/router';
import Areas from './components/areas';
import CardName from './components/cardName';
import ChooseTemplate from './components/chooseTemplate';
import Preview from './components/preview';

export default function Card() {
    const { query } = useRouter();
    const { name: deckName } = useDeckStore();
    const { name } = useGameStore();
    const isNew = query.cardId === 'new';

    useFetchDataGameData({
        deckId: query.deckId as string,
        gameId: query.gameId as string,
    });

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
                    label: name ?? '...',
                    href: `${Routes.Games}/${query.gameId ?? ''}`,
                },
                {
                    icon: 'folder',
                    label: deckName ?? '...',
                    href: `${Routes.Games}/${query.gameId ?? ''}/decks/${
                        query.deckId ?? ''
                    }`,
                },
                {
                    icon: isNew ? 'new-document' : 'document',
                    label: isNew ? 'New Card' : deckName ?? '',
                    href: `${Routes.Games}/${query.gameId}/decks/${query.deckId}/${
                        Routes.Cards
                    }/${isNew ? 'new' : query.cardId}`,
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
            <div className="flex flex-row gap-4 w-full flex-1 justify-between">
                <div className="flex flex-col bg-base-200 h-full w-72 p-4">
                    <CardName />
                    <ChooseTemplate />
                </div>

                <div className="flex flex-1 justify-center">
                    <Preview />
                </div>

                <div className="flex flex-col w-80 bg-base-200 h-full p-4">
                    <p className="text-sm font-bold mb-3">Area Layers</p>
                    <Areas />
                </div>
            </div>
        </Layout>
    );
}
