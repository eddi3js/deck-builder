import { z } from 'zod';

const gamesSchema = z.object({
    id: z.string(),
    name: z.string(),
    userId: z.string(),
});

export type Game = z.infer<typeof gamesSchema>;
