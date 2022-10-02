import Link from 'next/link';

export type IconType = 'folder' | 'document';
export type NavLink = {
    icon: IconType;
    label: string;
    href: string;
    active?: boolean;
};

interface NavigationProps {
    links?: NavLink[];
}
export default function Breadcrumbs({ links }: NavigationProps) {
    const navLinks = links ?? [];
    const Icon = ({ type }: { type: IconType }): JSX.Element | null => {
        switch (type) {
            case 'folder':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-2 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        ></path>
                    </svg>
                );
            case 'document':
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-2 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="text-sm  breadcrumbs h-auto overflow-hidden">
            <div className="divider m-0"></div>
            <ul className="my-2 px-8">
                <li>
                    <Link href="/">
                        <a>
                            <Icon type={'folder'} />
                            Home
                        </a>
                    </Link>
                </li>
                {navLinks.map((link: NavLink, i: number) => (
                    <li key={`${link.label.replace(' ', '')}-${i}`}>
                        <Link href={link.href}>
                            <a
                                className={`${
                                    link?.active
                                        ? 'underline text-secondary'
                                        : 'text-current'
                                }`}
                            >
                                <Icon type={link.icon} />
                                {link.label}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="divider m-0"></div>
        </div>
    );
}
