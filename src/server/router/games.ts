import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import getAccount from '../services/getAccount';

export const gamesRouter = createRouter().query('getAll', {
    resolve: async ({ ctx }) => {
        const user = await getAccount(ctx.prisma, ctx.user?.email as string);
        const games = await ctx.prisma.games.findMany({
            where: {
                userId: user?.id,
            },
        });

        if (!games) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        return games;
    },
});
