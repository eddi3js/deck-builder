import { Routes } from '@/lib/consts';
import { DiscordAccount } from '@/models/beta';
import type { Session } from 'next-auth';

export interface AuthenticatedResult {
    props: {
        user: DiscordAccount | null;
        hasBetaAccess: boolean;
    };
}

export interface RedirectResult {
    redirect: {
        destination: string;
    };
}

export default async function authenticateUser(
    session: Session | null,
    redirectUrl?: string,
    haltRedirect?: boolean
): Promise<AuthenticatedResult | RedirectResult> {
    const redirect = {
        redirect: {
            destination: redirectUrl ?? Routes.Login,
        },
    };

    if (!session) {
        return redirect;
    }

    const hasBetaAccount = await fetch(
        `${process.env.NEXTAUTH_URL}/api/users/${session.user?.email}`
    );

    if (hasBetaAccount.status !== 200 && !haltRedirect) {
        return redirect;
    }

    const user = session?.user ?? null;
    return {
        props: {
            user: user as DiscordAccount | null,
            hasBetaAccess: Boolean(hasBetaAccount.status === 200),
        },
    };
}
