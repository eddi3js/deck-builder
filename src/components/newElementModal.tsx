import { useState } from 'react';

interface NewModalProps {
    label: string;
    isLoading: boolean;
    id: string;
    title: string;
    icon?: React.ReactElement;
    className?: string;
    hideIcon?: boolean;
    action: (name: string) => Promise<void>;
}

export default function NewElementModal({
    label,
    id,
    title,
    isLoading,
    icon,
    className,
    hideIcon,
    action,
}: NewModalProps) {
    const [name, setName] = useState('');

    return (
        <>
            <label
                htmlFor={id}
                className={
                    className ??
                    'mb-4 flex flex-row gap-3 btn-info btn font-normal rounded text-white w-fit'
                }
            >
                <>
                    {hideIcon !== undefined ? null : icon ? (
                        icon
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    )}
                    {title}
                </>
            </label>

            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-xl relative overflow-x-hidden whitespace-normal">
                    <label
                        htmlFor={id}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold text-lg mb-1 capitalize">Add New {label}</h3>
                    <p className="py-3">
                        Please enter a unique name for your new {label}.
                    </p>
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        type="text"
                        value={name}
                        className="input input-bordered input-sm w-full mb-3"
                    />

                    <button
                        onClick={() => action(name)}
                        disabled={isLoading || name.length === 0}
                        className={`${
                            isLoading ? 'loading' : ''
                        } btn btn-sm btn-info text-white w-full capitalize`}
                    >
                        Add New {label}
                    </button>
                </div>
            </div>
        </>
    );
}
