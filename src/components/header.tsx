import { DiscordAccount } from '@/models/beta';
import { Avatar } from 'flowbite-react';

interface HeaderProps {
    user?: DiscordAccount;
}

export default function Header({ user }: HeaderProps) {
    return (
        <div className="flex items-center justify-between fixed w-full top-0 bg-gray-600 px-4 py-2">
            <div className="flex">Deckbuilder.gg</div>
            <div className="flex items-center gap-3">
                {user && <p>{user.name}</p>}
                <Avatar img={user?.image} rounded={true} />
            </div>
        </div>
    );
}
