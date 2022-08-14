import { Routes } from '@/lib/consts';
import { DiscordAccount } from '@/models/user';
import { Avatar } from 'flowbite-react';
import Image from 'next/image';
import Menu from './menu';

interface HeaderProps {
    user?: DiscordAccount;
}

export default function Header({ user }: HeaderProps) {
    return (
        <div className="flex items-center justify-between fixed w-full top-0 bg-black/[0.70] px-4 py-2 backdrop-blur-sm">
            <div className="flex items-center">
                <Image
                    src="/logo.png"
                    alt="DeckBuilder.gg"
                    width={40}
                    height={39}
                />
                <span className="ml-3">Deckbuilder.gg</span>
            </div>
            <div className="hidden md:flex flex-grow items-center justify-center gap-5 text-sm">
                <a
                    href={Routes.Home}
                    className="hover:bg-gray-800 px-3 py-2 rounded"
                >
                    Home
                </a>
                <a href={Routes.Games}>Games</a>
            </div>
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <p className="hidden md:block">{user.name}</p>
                        <Menu email={user?.email} avatar={user?.image} />
                    </>
                ) : (
                    <Avatar rounded={true} />
                )}
            </div>
        </div>
    );
}
