import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { Routes } from './constants';

export type AuthContext = {
    req:
        | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> })
        | NextApiRequest;
    res: ServerResponse | NextApiResponse<unknown>;
};

export async function authPage(context: AuthContext) {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: Routes.Login,
                permanent: false,
            },
        };
    }

    return {
        props: {
            session,
        },
    };
}
