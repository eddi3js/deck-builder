import ColorPicker from './color';
import FontFamily from './family';

export default function FontBar({ areaId }: { areaId: string }) {
    const textAlignButtons = [
        {
            tip: 'align left',
            tooltipPosition: 'bottom',
            action: () => console.log('ran'),
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
            ),
        },
        {
            tip: 'align center',
            tooltipPosition: 'bottom',
            action: () => console.log('ran'),
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            ),
        },
        {
            tip: 'align right',
            tooltipPosition: 'bottom',
            action: () => console.log('ran'),
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                />
            ),
        },
        {
            tip: 'valign top',
            tooltipPosition: 'bottom',
            action: () => console.log('ran'),
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                />
            ),
        },
        {
            tip: 'valign middle',
            tooltipPosition: 'bottom',
            action: () => console.log('ran'),
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
            ),
        },
        {
            tip: 'valign bottom',
            tooltipPosition: 'bottom',
            action: () => console.log('ran'),
            icon: (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                />
            ),
        },
    ];

    return (
        <div className="shadow flex flex-row w-full p-0 items-center justify-between mt-1 bg-base-100 rounded">
            {textAlignButtons.map((button, index) => (
                <div key={index} className="tooltip tooltip-bottom" data-tip={button.tip}>
                    <button className="flex p-1.5 hover:text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            {button.icon}
                        </svg>
                    </button>
                </div>
            ))}
            <ColorPicker id={areaId} />
            <FontFamily id={areaId} />
        </div>
    );
}
