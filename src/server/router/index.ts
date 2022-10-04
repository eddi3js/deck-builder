// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { userRouter } from './user';
import { templatesRouter } from './templates';

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('user.', userRouter)
    .merge('templates.', templatesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
