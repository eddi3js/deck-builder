import { DiscordAccount } from '@/models/beta';
import { Avatar } from 'flowbite-react';
import Menu from './menu';

interface HeaderProps {
    user?: DiscordAccount;
}

export default function Header({ user }: HeaderProps) {
    return (
        <div className="flex items-center justify-between fixed w-full top-0 bg-black px-4 py-2">
            <div className="flex">Deckbuilder.gg</div>
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <p>{user.name}</p>
                        <Menu email={user?.email} avatar={user?.image} />
                    </>
                ) : (
                    <Avatar rounded={true} />
                )}
            </div>
        </div>
    );
}
