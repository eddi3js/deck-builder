import Page from '@/components/page';
import authenticatePage from '@/utils/authenticatePage';
import { useMutation } from '@tanstack/react-query';
import { getSession, GetSessionParams, useSession } from 'next-auth/react';

export default function CreateGame() {
    const { data: session } = useSession();
    const { mutateAsync, isLoading, isSuccess } = useMutation(
        ['new-game'],
        async () => {
            return await fetch(`/api/games/new`, {
                method: 'POST',
                body: JSON.stringify({
                    name: 'Nascency and the end of the world',
                    email: session?.user?.email,
                }),
            });
        }
    );

    return (
        <Page title="My Games">
            <p>{isLoading ? 'Loading...' : isSuccess ? 'Added!' : ''}</p>
            <button onClick={() => mutateAsync()}>Add Game</button>
        </Page>
    );
}

export const getServerSideProps = async (context: GetSessionParams) => {
    const session = await getSession(context);
    return await authenticatePage(session);
};
