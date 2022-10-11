import { useRouter } from 'next/router';
import { DocumentIcon, FolderIcon } from './breadcrumbs';

interface NavItemBlockProps {
    to: string;
    icon?: 'folder' | 'document';
    label: string;
    count?: number;
}

export default function NavItemBlock({ to, icon, label, count }: NavItemBlockProps) {
    const navigate = useRouter();

    const Icon = () => {
        switch (icon) {
            case 'document':
                return <DocumentIcon className="w-7 h-7" />;
            default:
                return <FolderIcon className="w-7 h-7" />;
        }
    };

    return (
        <button
            onClick={() => navigate.push(to)}
            className="card p-4 px-6 border rounded flex flex-row justify-between items-center hover:cursor-pointer hover:border-secondary"
        >
            <div className="flex flex-row gap-4 items-center">
                <Icon />
                <span className="flex flex-1 text-left">{label}</span>
            </div>
            {count && <span className="text-xs">({count})</span>}
        </button>
    );
}
