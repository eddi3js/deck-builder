import { Card } from 'flowbite-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
    return (
        <div className="px-4 md:px-0 h-screen w-full flex flex-col justify-center items-center">
            <div className="max-w-sm">
                <Card>
                    <h1 className="font-bold text-2xl">
                        Welcome to DeckBuilder.gg
                    </h1>
                    <p className="text-gray-300 text-sm my-3">
                        If you&apos;ve received an invite, please login with
                        your Discord account
                    </p>
                    <button
                        onClick={() => signIn()}
                        className="flex flex-row gap-4 items-center px-3 shadow text-sm py-2 pr-4 text-md text-white discord-bg rounded w-full justify-center"
                    >
                        <Image
                            width={25}
                            height={25}
                            src="/discord-icon.svg"
                            alt="Login with Discord"
                        />
                        Log in with Discord
                    </button>
                </Card>
            </div>
        </div>
    );
}
