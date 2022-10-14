// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { userRouter } from './user';
import { templatesRouter } from './templates';
import { gamesRouter } from './games';
import { decksRouter } from './decks';
import { cardsRouter } from './cards';

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('user.', userRouter)
    .merge('games.', gamesRouter)
    .merge('decks.', decksRouter)
    .merge('cards.', cardsRouter)
    .merge('templates.', templatesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
