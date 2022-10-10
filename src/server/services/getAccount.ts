import { PrismaClient, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

const getAccount = async (prisma: PrismaClient, email?: string): Promise<User | null> => {
    if (!email) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};

export default getAccount;
