import { Routes } from '@/lib/consts';
import { DiscordAccount } from '@/models/user';
import type { Session } from 'next-auth';

export interface AuthenticatedResult {
    props: {
        user: DiscordAccount | null;
    };
}

export interface RedirectResult {
    redirect: {
        destination: string;
    };
}

export default async function authenticatePage(
    session: Session | null,
    redirectUrl?: string,
    additionalProps?: object
): Promise<AuthenticatedResult | RedirectResult> {
    const redirect = {
        redirect: {
            destination: redirectUrl ?? Routes.Login,
        },
    };

    if (!session) {
        return redirect;
    }

    const user = session?.user ?? null;
    return {
        props: {
            user: user as DiscordAccount | null,
            ...additionalProps,
        },
    };
}
