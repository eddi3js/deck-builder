import { useRouter } from 'next/router';

interface NavItemBlockProps {
    to: string;
    iconPath?: React.ReactNode;
    label: string;
}

export default function NavItemBlock({ to, iconPath, label }: NavItemBlockProps) {
    const navigate = useRouter();

    return (
        <button
            onClick={() => navigate.push(to)}
            className="card p-4 border rounded flex flex-row justify-between items-center hover:cursor-pointer hover:border-primary"
        >
            <div className="flex flex-row gap-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    {iconPath ?? (
                        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                    )}
                </svg>
                <span>{label}</span>
            </div>
            <span className="text-xs">(0)</span>
        </button>
    );
}
