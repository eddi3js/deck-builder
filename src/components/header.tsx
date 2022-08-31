import { useLocalStorage } from 'usehooks-ts';

export default function Header() {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useLocalStorage(
        'mobileSidebarOpen',
        false
    );

    return (
        <div className="border-gray-200 items-center bg-white px-2 py-2.5 flex-row flex dark:border-gray-800 dark:bg-gray-800 sm:px-4">
            <button
                className="p-2 flex lg:hidden bg-gray-600 rounded mr-3"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
                {!mobileSidebarOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </button>
            <p className="text-lg">Deckbuilder.gg</p>
        </div>
    );
}
