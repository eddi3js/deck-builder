import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitcher from './theme/switcher';

export default function Header() {
    const { data } = useSession();
    return (
        <div className="navbar shadow">
            <div className="flex-1">
                <div className="btn btn-ghost normal-case text-xl">
                    <Link href="/">DeckBuilder.gg</Link>
                </div>
            </div>
            <div className="flex-none">
                <ThemeSwitcher />
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <Image
                            layout="fill"
                            src={data?.user?.image ?? ''}
                            className="w-8 h-8 rounded-full"
                            alt="avatar"
                        />
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-fit"
                    >
                        <li className="text-xs p-4 pt-2">
                            Signedin as: {data?.user?.email}
                        </li>
                        <li>
                            <button
                                className="w-full flex flex-row"
                                onClick={() => signOut()}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                    />
                                </svg>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
