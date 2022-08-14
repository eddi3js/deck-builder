import Page from '@/components/page';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function CreateGame() {
    const { data: session } = useSession();
    const { mutateAsync, isLoading, isSuccess } = useMutation(
        ['new-game'],
        async () => {
            return await fetch(`/api/games/new`, {
                method: 'POST',
                body: JSON.stringify({
                    name: 'test2',
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
