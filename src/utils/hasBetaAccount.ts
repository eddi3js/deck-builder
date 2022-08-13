import type { Session } from 'next-auth';

export default async function hasBetaAccount(session: Session | null) {
    const redirect = {
        redirect: {
            destination: '/login',
        },
    };

    if (!session) {
        return redirect;
    }

    const hasBetaAccount = await fetch(
        `${process.env.NEXTAUTH_URL}/api/beta/${session.user?.email}`
    );

    if (hasBetaAccount.status !== 200) {
        return redirect;
    }

    return {
        props: { user: session?.user },
    };
}
