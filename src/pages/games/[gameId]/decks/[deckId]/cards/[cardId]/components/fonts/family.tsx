import { useCardStore } from '@/stores/cards';
import { trpc } from '@/utils/trpc';

type FontResponse = {
    family: string;
    file: string;
};

export default function FontFamily({ id }: { id: string }) {
    const { areas, setFont } = useCardStore();
    const fontFamily = areas.find(a => a.areaId === id)?.font.family;

    const { data: fonts } = trpc.useQuery(['cards.fontList']);

    if (!areas.length) {
        return null;
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFont(id, {
            family: e.target.value,
        });
    };

    return (
        <div className="dropdown">
            <div className="tooltip tooltip-bottom" data-tip="font family">
                <label
                    tabIndex={0}
                    className={`flex p-1.5 px-2 hover:text-secondary text-center justify-center apply-font-${id}`}
                >
                    A
                </label>
            </div>
            <div className="dropdown-content shadow right-0">
                <select
                    onChange={handleOnChange}
                    value={fontFamily}
                    className="select select-bordered w-40"
                >
                    {fonts?.map((font: FontResponse) => (
                        <option
                            // selected={font.family === fontFamily}
                            key={font.family}
                            value={font.family}
                        >
                            {font.family}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
