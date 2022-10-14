import { z } from 'zod';

const gamesSchema = z.object({
    id: z.string(),
    name: z.string(),
    userId: z.string(),
});

const gamesListSchema = z.object({
    id: z.string(),
    name: z.string(),
});

const cardSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    template: z.string(),
    areas: z.array(z.any()),
    deckId: z.string(),
});

export type Game = z.infer<typeof gamesSchema>;
export type GameList = z.infer<typeof gamesListSchema>;
export type Card = z.infer<typeof cardSchema>;
