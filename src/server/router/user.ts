import { createRouter } from './context';
import { TRPCError } from '@trpc/server';

export const userRouter = createRouter().query('me', {
    resolve: ({ ctx }) => {
        if (!ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const user = ctx.prisma.user.findMany({
            where: {
                email: ctx.user.email as string,
            },
        });

        if (!user) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        if (user) return user;
    },
});
