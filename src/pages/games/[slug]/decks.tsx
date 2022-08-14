import Page from '@/components/page';
import { gameDetailsSubnavigationLinks } from '@/lib/consts';
import authenticatePage from '@/utils/authenticatePage';
import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';

export default function GameDecks({ slug }: { slug: string }) {
    const { data } = useQuery([`game-${slug}`], async () => {
        return await fetch(`/api/games/${slug}`).then(res => res.json());
    });
    const game = data?.data ?? null;

    return (
        <Page
            gutters={false}
            title="Deck Builder"
            subnavigation={gameDetailsSubnavigationLinks(slug)}
        >
            Coming Soon
        </Page>
    );
}

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    return await authenticatePage(session, undefined, {
        slug: context.params.slug,
    });
};
