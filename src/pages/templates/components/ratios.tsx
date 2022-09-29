import { useCardTemplateStore } from '@/stores/cardTemplates';

export default function Ratios() {
    const { ratios, changeRatios } = useCardTemplateStore();
    const [width, height] = ratios;

    return (
        <>
            <p className="text-sm mt-4 mb-1">Dimensions:</p>
            <div className="flex flex-row w-full gap-3">
                <div className="form-control w-full max-w-xs">
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            changeRatios(parseFloat(e.target.value), 0)
                        }
                        name="width"
                        value={width}
                        step={0.5}
                        type="number"
                        placeholder="width in inches"
                        className="input input-bordered w-full max-w-xs input-sm"
                    />
                    <label className="label">
                        <span className="label-text-alt">in inches</span>
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            changeRatios(parseFloat(e.target.value), 1)
                        }
                        name="height"
                        value={height}
                        step={0.5}
                        type="number"
                        placeholder="height in inches"
                        className="input input-bordered w-full max-w-xs input-sm"
                    />
                    <label className="label">
                        <span className="label-text-alt">in inches</span>
                    </label>
                </div>
            </div>
        </>
    );
}
