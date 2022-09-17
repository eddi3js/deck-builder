import { Routes } from '@/utils/constants';
import { Avatar, Badge, Sidebar } from 'flowbite-react';
import { useReadLocalStorage } from 'usehooks-ts';
import { signOut, useSession } from 'next-auth/react';

export default function GlobalSidebar() {
    const { data } = useSession();
    const sidebarIsOpen = useReadLocalStorage('mobileSidebarOpen');

    return (
        <>
            <div
                className={`${
                    sidebarIsOpen ? 'fixed' : 'hidden'
                } z-30 left-0 bottom-0 right-0 overflow-auto bg-black/50 top-14`}
            />
            <div
                className={`z-40 h-full ${
                    sidebarIsOpen ? 'ml-0' : '-ml-80'
                } lg:ml-0 fixed lg:relative rounded flex flex-col w-fit duration-300`}
            >
                <div className="h-full overflow-y-auto overflow-x-hidden bg-inherit p-3">
                    <Sidebar>
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item>
                                    <div className="flex flex-row gap-3 items-center">
                                        <Avatar
                                            rounded={true}
                                            img={data?.user?.image ?? undefined}
                                        />
                                        <div className="flex flex-col text-sm text-gray-900 dark:text-gray-200">
                                            {data?.user?.name}
                                        </div>
                                    </div>
                                    <p className="text-sm mt-3 text-gray-300">
                                        Signed in as <br /> {data?.user?.email}
                                    </p>
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item href={Routes.Home}>Dashboard</Sidebar.Item>
                                <Sidebar.Item href={Routes.Templates}>
                                    Card Templates
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                            <Sidebar.ItemGroup>
                                <Sidebar.Item
                                    as="button"
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                    }}
                                    onClick={() => signOut()}
                                >
                                    Sign Out
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>

                        <Sidebar.CTA>
                            <div className="mb-3 pr-3 flex flex-col">
                                <div className="w-fit mb-2">
                                    <Badge color="warning">Beta</Badge>
                                </div>

                                <p className="mb-3 text-xs text-blue-900 dark:text-blue-400">
                                    Deckbuilder.gg is currently in a beta state. Please
                                    report any bugs or suggestions in the Discord
                                </p>
                            </div>
                        </Sidebar.CTA>
                    </Sidebar>
                </div>
            </div>
        </>
    );
}
