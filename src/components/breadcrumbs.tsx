import Link from 'next/link';

export type IconType = 'folder' | 'document' | 'new-document';
export type NavLink = {
    icon: IconType;
    label: string;
    href: string;
    active?: boolean;
};
interface IconProps {
    className?: string;
}

export const FolderIcon = ({ className }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={`w-4 h-4 stroke-current ${className}`}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        ></path>
    </svg>
);

export const NewDocumentIcon = ({ className }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={`w-4 h-4 stroke-current ${className}`}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        ></path>
    </svg>
);

export const DocumentIcon = ({ className }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className={`w-4 h-4 stroke-current ${className}`}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
    </svg>
);

interface NavigationProps {
    links?: NavLink[];
    action?: React.ReactNode;
}
export default function Breadcrumbs({ links, action }: NavigationProps) {
    const navLinks = links ?? [];
    const Icon = ({ type }: { type: IconType }): JSX.Element | null => {
        switch (type) {
            case 'folder':
                return <FolderIcon className="mr-2" />;
            case 'document':
                return <DocumentIcon className="mr-2" />;
            case 'new-document':
                return <NewDocumentIcon className="mr-2" />;
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
                {navLinks.map((link: NavLink, i: number) => {
                    return (
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
                    );
                })}
                {action && (
                    <li className="flex flex-1 justify-end content-none action">
                        {action}
                    </li>
                )}
            </ul>
            <div className="divider m-0"></div>
        </div>
    );
}
