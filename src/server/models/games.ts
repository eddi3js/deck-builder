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

export type Game = z.infer<typeof gamesSchema>;
export type GameList = z.infer<typeof gamesListSchema>;
