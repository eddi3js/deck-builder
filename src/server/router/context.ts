// src/server/router/context.ts
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '../db/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';

/** Use this helper for:
 * - testing, where we dont have to Mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/
export const createContextInner = async (
    opts: trpcNext.CreateNextContextOptions
) => {
    const session = await unstable_getServerSession(
        opts.req,
        opts.res,
        authOptions
    );

    return {
        user: session?.user,
        prisma,
    };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
    opts: trpcNext.CreateNextContextOptions
) => {
    return await createContextInner(opts);
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
