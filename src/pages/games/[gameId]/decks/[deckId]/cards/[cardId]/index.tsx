import Actions from '@/components/actions';
import Layout from '@/components/layout';
import { CardTemplatePayload } from '@/server/models/canvas';
import { useCardStore } from '@/stores/cards';
import { useDeckStore } from '@/stores/decks';
import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import { trpc } from '@/utils/trpc';
import useFetchDataGameData from '@/utils/useFetchData';
import { useRouter } from 'next/router';
import CardName from '../components/cardName';

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
                    <h1>Card Preview</h1>
                </div>
            </div>
        </Layout>
    );
}

const ChooseTemplate = () => {
    const { template, setTemplate } = useCardStore();

    const query = trpc.useQuery(['templates.get']);
    const choices = query.data?.map((t: CardTemplatePayload) => ({
        label: t.name,
        value: t.id,
    }));

    const selectValue = query?.data?.find(
        (c: CardTemplatePayload) => c.id === template?.id
    );

    const handleSelectTemplate = (templateId: string) => {
        const selectedTemplate = query?.data?.find(
            (c: CardTemplatePayload) => c.id === templateId
        );
        setTemplate(selectedTemplate);
    };

    return (
        <>
            <p className="text-sm mb-1">Card Template</p>
            <select
                value={selectValue}
                onChange={e => handleSelectTemplate(e.target.value)}
                className="select select-bordered w-full select-sm"
            >
                <option disabled selected={!template}>
                    Choose Template
                </option>
                {choices?.map(
                    ({ value, label }: { value: string; label: string }, i: number) => (
                        <option
                            selected={Boolean(value === template?.id)}
                            key={`${value}-${i}`}
                            value={value}
                        >
                            {label}
                        </option>
                    )
                )}
            </select>
        </>
    );
};
