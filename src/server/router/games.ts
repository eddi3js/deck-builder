import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import authAccount from '../services/authAccount';
import { z } from 'zod';

export const gamesRouter = createRouter()
    .query('get', {
        input: z
            .object({
                listOnly: z.boolean(),
            })
            .optional(),
        resolve: async ({ ctx, input }) => {
            const user = await authAccount(ctx.prisma, ctx.user?.email as string);
            const games = await ctx.prisma.games.findMany({
                where: {
                    userId: user?.id,
                },
                include: {
                    decks: true,
                },
            });

            if (!games) {
                throw new TRPCError({ code: 'NOT_FOUND' });
            }

            if (input?.listOnly) {
                return games.map(game => ({ id: game.id, name: game.name }));
            }

            return games;
        },
    })
    .mutation('post', {
        input: z.object({
            id: z.string().optional(),
            name: z.string(),
        }),
        resolve: async ({ ctx, input }) => {
            const user = await authAccount(ctx.prisma, ctx.user?.email as string);

            if (input.id) {
                return await ctx.prisma.games.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        name: input.name,
                    },
                });
            }

            return await ctx.prisma.games.create({
                data: {
                    name: input.name,
                    userId: user?.id as string,
                },
            });
        },
    })
    .query('getById', {
        input: z.object({
            id: z.string(),
        }),
        resolve: async ({ ctx, input }) => {
            await authAccount(ctx.prisma, ctx.user?.email as string);
            const game = await ctx.prisma.games.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    decks: true,
                },
            });

            if (!game) {
                throw new TRPCError({ code: 'NOT_FOUND' });
            }

            return game;
        },
    })
    .mutation('delete', {
        input: z.string(),
        resolve: async ({ ctx, input }) => {
            const account = await authAccount(ctx.prisma, ctx.user?.email as string);
            // find the game by the ID and make sure the userId matches
            const game = await ctx.prisma.games.findUnique({
                where: {
                    id: input,
                },
            });

            if (!game || game.userId !== account?.id) {
                throw new TRPCError({ code: 'NOT_FOUND' });
            }

            // delete the game based on the input.id and the account.id
            return await ctx.prisma.games.delete({
                where: {
                    id: input,
                },
            });
        },
    });
