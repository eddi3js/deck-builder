import { createRouter } from './context';
import authAccount from '../services/authAccount';
import { z } from 'zod';

export const decksRouter = createRouter()
    .mutation('post', {
        input: z.object({
            name: z.string(),
            gameId: z.string(),
        }),
        resolve: async ({ ctx, input }) => {
            await authAccount(ctx.prisma, ctx.user?.email as string);

            return await ctx.prisma.decks.create({
                data: {
                    name: input.name,
                    gameId: input.gameId,
                },
            });
        },
    })
    .query('getById', {
        input: z.string(),
        resolve: async ({ ctx, input }) => {
            await authAccount(ctx.prisma, ctx.user?.email as string);

            return await ctx.prisma.decks.findFirst({
                where: {
                    id: input,
                },
                include: {
                    cards: true,
                },
            });
        },
    })
    .mutation('deleteById', {
        input: z.string(),
        resolve: async ({ ctx, input }) => {
            await authAccount(ctx.prisma, ctx.user?.email as string);
            return await ctx.prisma.decks.delete({
                where: {
                    id: input,
                },
            });
        },
    });

// Schemas & Types
const deckSchema = z.object({
    id: z.string(),
    name: z.string(),
    gameId: z.string(),
    cards: z.array(z.any()),
});

const cardSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export type Deck = z.infer<typeof deckSchema>;
export type Card = z.infer<typeof cardSchema>;
