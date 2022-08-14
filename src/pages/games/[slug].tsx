import Page from '@/components/page';
import { gameDetailsSubnavigationLinks } from '@/lib/consts';
import authenticatePage from '@/utils/authenticatePage';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'flowbite-react';
import { getSession } from 'next-auth/react';

export default function GameDetailsPage({ slug }: { slug: string }) {
    const { data, isLoading } = useQuery([`game-${slug}`], async () => {
        return await fetch(`/api/games/${slug}`).then(res => res.json());
    });
    const game = data?.data ?? null;

    return (
        <Page
            gutters={false}
            title={game?.name}
            subnavigation={gameDetailsSubnavigationLinks(slug)}
        >
            {isLoading ? (
                <div className="flex flex-col gap-3">
                    Loading game data... <Spinner size="xl" />
                </div>
            ) : (
                <p>Details Go Here...</p>
            )}
        </Page>
    );
}
export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    return await authenticatePage(session, undefined, {
        slug: context.params.slug,
    });
};
