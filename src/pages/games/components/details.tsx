import { useGameStore } from '@/stores/games';
import { Routes } from '@/utils/constants';
import Link from 'next/link';

export default function GameDetails() {
    const { name, updateName, id } = useGameStore();
    return (
        <div className="flex flex-col w-full gap-3">
            <div className="my-4">
                <p className="text-sm font-bold mb-1">Name</p>
                <input
                    placeholder="Enter game name"
                    value={name}
                    id="name"
                    type="text"
                    onChange={e => updateName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            <h2 className="text-xl font-bold">Decks:</h2>

            <p className="text-sm">
                No decks found. please{' '}
                <Link href={`${Routes.Games}/${id ?? ''}/${Routes.Decks}/new`}>
                    <a className="underline text-secondary">create one</a>
                </Link>
                .
            </p>
        </div>
    );
}
