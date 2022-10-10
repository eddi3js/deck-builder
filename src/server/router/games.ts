import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import authAccount from '../services/authAccount';
import { z } from 'zod';

export const gamesRouter = createRouter()
    .query('getAll', {
        resolve: async ({ ctx }) => {
            const user = await authAccount(ctx.prisma, ctx.user?.email as string);
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
    })
    .mutation('post', {
        input: z.object({
            name: z.string(),
        }),
        resolve: async ({ ctx, input }) => {
            const user = await authAccount(ctx.prisma, ctx.user?.email as string);
            return await ctx.prisma.games.create({
                data: {
                    name: input.name,
                    userId: user?.id as string,
                },
            });
        },
    })
    .query('getGameById', {
        input: z.object({
            id: z.string(),
        }),
        resolve: async ({ ctx, input }) => {
            await authAccount(ctx.prisma, ctx.user?.email as string);
            const game = await ctx.prisma.games.findUnique({
                where: {
                    id: input.id,
                },
            });

            if (!game) {
                throw new TRPCError({ code: 'NOT_FOUND' });
            }

            return game;
        },
    });
