import { PrismaClient } from '@prisma/client';

export interface PrismaContext {
    prisma: PrismaClient;
    user?: {
        name: string;
        email: string;
        image: string;
    };
}
