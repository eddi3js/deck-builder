import { useCardStore } from '@/stores/cards';
import { getCanvasSize, ratioConverter } from '@/utils/canvas/aspectRatio';
import { radiusHash, RadiusRange } from '@/utils/canvas/ranges';

export default function Preview() {
    const card = useCardStore();

    const { width, height } = getCanvasSize([
        ratioConverter(card.template?.width ?? '0') as unknown as number,
        ratioConverter(card.template?.height ?? '0') as unknown as number,
    ]);

    return (
        <div className="flex flex-col gap-4">
            <h2>Card Preview</h2>

            <div
                id="preview-container"
                className={`${
                    radiusHash[(card.template?.cornerBevel ?? 0) as RadiusRange]
                } object-contain w-fit flex flex-col justify-center items-center relative`}
                style={{
                    backgroundColor: card.template?.backgroundColor,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${card.template?.templateImage})`,
                    width: width,
                    height,
                }}
            >
                {(card.template?.elements ?? []).map(element => (
                    <div
                        key={element.id}
                        onMouseEnter={() => card.setHoveringArea(element.id)}
                        onMouseLeave={() => card.setHoveringArea(null)}
                        onClick={() => card.setFocusArea(element.id)}
                        id={`preview-${element.metadata.name}`}
                        className="absolute hover:cursor-pointer flex flex-col items-center justify-center"
                        style={{
                            top: `${element.top}px`,
                            left: `${element.left}px`,
                            width: `${element.width}px`,
                            height: `${element.height}px`,
                            border: `${
                                card.hovervingArea == element.id ? 3 : 2
                            }px dashed ${element.options.stroke}`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
