import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface DeleteModalProps {
    name: string;
    id: string;
    api: string;
    modalId: string;
    redirect: string;
}

export default function DeleteModal({
    name,
    id,
    api,
    modalId,
    redirect,
}: DeleteModalProps) {
    const { push } = useRouter();
    const [copiedName, setCopiedName] = useState('');
    const { mutateAsync, isLoading: isDeleting } = trpc.useMutation([api as any]);
    const isConfirmed = copiedName === name;

    const handleDelete = async () => {
        try {
            await mutateAsync(id);
            push(redirect);
        } catch (error) {
            // TODO: Add error handling
            console.log(error);
        }
    };
    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-xl relative overflow-x-hidden whitespace-normal">
                    <label
                        htmlFor={modalId}
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="font-bold text-lg mb-1">
                        Are you sure absolutely sure?
                    </h3>
                    <p className="py-3">
                        This action <b>cannot</b> be undone. This will permanently delete
                        the <b>{name}</b> template.
                    </p>
                    <p className="py-3">
                        Please type <b>{name}</b> to confirm.
                    </p>

                    <input
                        type="text"
                        onChange={e => setCopiedName(e.target.value)}
                        className="input input-bordered input-sm w-full mb-3"
                    />

                    <button
                        disabled={!isConfirmed || isDeleting}
                        onClick={handleDelete}
                        className={`${
                            isDeleting ? 'loading' : ''
                        } btn btn-sm btn-error hover:bg-red-500 text-white w-full`}
                    >
                        I understand the consequences, delete this
                    </button>
                </div>
            </div>
        </>
    );
}
