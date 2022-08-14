import { useRouter } from 'next/router';

export interface SubnavigationLinkProps {
    title: string;
    href: string;
    slug: string;
}

export default function Subnavigation({
    links,
}: {
    links: SubnavigationLinkProps[];
}) {
    const NavItems = () => {
        const { pathname } = useRouter();

        const rows = links.map(({ title, href, slug }, index: number) => {
            const activeLink = pathname.includes(slug);
            return (
                <div
                    className={`flex text-xs ${
                        index === 0 ? 'pr-3 pl-1' : 'px-3'
                    }`}
                    key={`subnav-${slug}-${index}`}
                >
                    <a
                        className={`hover:underline hover:text-white ${
                            activeLink ? 'text-white' : 'text-gray-300'
                        }`}
                        href={href}
                    >
                        {title}
                    </a>
                </div>
            );
        });
        return <>{rows}</>;
    };

    return (
        <div className="pr-3">
            <div className="mt-3 mb-5 flex flex-row text-sm bg-gray-800 p-2 rounded divide-x-2 divide-gray-700">
                <NavItems />
            </div>
        </div>
    );
}
