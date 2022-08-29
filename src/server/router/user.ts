import { createRouter } from './context';
import { TRPCError } from '@trpc/server';

export const userRouter = createRouter().query('me', {
    resolve: ({ ctx }) => {
        if (!ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        return {
            secret: 'sauce',
        };
    },
});
