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
                return <DocumentIcon className="w-6 h-6" />;
            default:
                return <FolderIcon className="w-6 h-6" />;
        }
    };

    return (
        <button
            onClick={() => navigate.push(to)}
            className="card p-4 border rounded flex flex-row justify-between items-center hover:cursor-pointer hover:border-primary"
        >
            <div className="flex flex-row gap-4">
                <Icon />
                <span>{label}</span>
            </div>
            {count && <span className="text-xs">({count ?? 0})</span>}
        </button>
    );
}
