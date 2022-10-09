import { FillType, useToolsetStore } from '@/stores/toolset';

export default function Fill() {
    const { fillStyle, updateFillStyle, backgroundColor } = useToolsetStore();

    const Icon = ({ type }: { type: FillType }) => {
        switch (type) {
            case 'solid':
                return <FillSolid />;
            case 'cross-hatch':
                return <FillCrossHatch />;
            default:
                return <FillLines />;
        }
    };

    return (
        <div className="w-full flex flex-row gap-2">
            {['solid', 'hachure', 'cross-hatch'].map(type => {
                const fillType = type as FillType;
                return (
                    <button
                        key={`fill-type-${type}`}
                        onClick={() => updateFillStyle(fillType)}
                        className="p-1 rounded bg-base-300 hover:text-secondary"
                        style={{
                            color: fillStyle === type ? backgroundColor : 'inherit',
                        }}
                    >
                        <Icon type={fillType} />
                    </button>
                );
            })}
        </div>
    );
}

const FillLines = () => (
    <svg
        className="h-6"
        aria-hidden="true"
        focusable="false"
        role="img"
        viewBox="0 0 40 20"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.101 16H28.0934L36 8.95989V4H33.5779L20.101 16ZM30.5704 4L17.0935 16H9.10101L22.5779 4H30.5704ZM19.5704 4L6.09349 16H4V10.7475L11.5779 4H19.5704ZM8.57036 4H4V8.06952L8.57036 4ZM36 11.6378L31.101 16H36V11.6378ZM2 2V18H38V2H2Z"
            fill="currentColor"
        ></path>
    </svg>
);

const FillCrossHatch = () => (
    <svg
        className="h-6"
        aria-hidden="true"
        focusable="false"
        role="img"
        viewBox="0 0 40 20"
        fill="currentColor"
    >
        <g fill="var(--icon-fill-color)" fillRule="evenodd" clipRule="evenodd">
            <path d="M20.101 16H28.0934L36 8.95989V4H33.5779L20.101 16ZM30.5704 4L17.0935 16H9.10101L22.5779 4H30.5704ZM19.5704 4L6.09349 16H4V10.7475L11.5779 4H19.5704ZM8.57036 4H4V8.06952L8.57036 4ZM36 11.6378L31.101 16H36V11.6378ZM2 2V18H38V2H2Z"></path>
            <path d="M14.0001 18L3.00006 4.00002L4.5727 2.76438L15.5727 16.7644L14.0001 18ZM25.0001 18L14.0001 4.00002L15.5727 2.76438L26.5727 16.7644L25.0001 18ZM36.0001 18L25.0001 4.00002L26.5727 2.76438L37.5727 16.7644L36.0001 18Z"></path>
        </g>
    </svg>
);

const FillSolid = () => (
    <svg
        className="h-6"
        aria-hidden="true"
        focusable="false"
        role="img"
        viewBox="0 0 40 20"
        fill="currentColor"
    >
        <path d="M2 2H38V18H2V2Z" fill="var(--icon-fill-color)"></path>
    </svg>
);
