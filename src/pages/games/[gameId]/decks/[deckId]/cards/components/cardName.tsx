import { useCardStore } from '@/stores/cards';

export default function CardName() {
    const { name, setName } = useCardStore();

    return (
        <div className="mb-4">
            <p className="text-sm mb-1">Name:</p>
            <div className="form-control w-full max-w-xs">
                <input
                    type="text"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                    placeholder="Enter Card Name"
                    className="input input-bordered w-full max-w-xs input-sm"
                />
            </div>
        </div>
    );
}
