import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import payloadSchema, { ElementObject, Payload } from '@/server/models/canvas';
import { PrismaClient, User } from '@prisma/client';
import getAccount from '@/server/services/getAccount';

const templateUpsert = async (payload: Payload, prisma: PrismaClient, userId: string) => {
    const postBody = {
        data: {
            userId: payload.userId ?? userId,
            name: payload.name,
            width: payload.width,
            height: payload.height,
            templateImage: payload.templateImage,
            cornerBevel: payload.cornerBevel,
            backgroundColor: payload.backgroundColor,
        },
    };

    if (payload.id) {
        return await prisma.cardTemplate.update({
            where: {
                id: payload.id,
            },
            ...postBody,
        });
    }

    return await prisma.cardTemplate.create(postBody);
};

const formattedElements = (elements: ElementObject[], templateId: string) => {
    return elements.map(element => ({
        cardTemplateId: templateId,
        ...element,
    }));
};

const elementsUpsert = async (
    elements: ElementObject[],
    prisma: PrismaClient,
    templateId: string,
    isNew: boolean
) => {
    const formatted = formattedElements(elements, templateId);

    if (!isNew) {
        await prisma.cardTemplateElement.deleteMany({
            where: {
                cardTemplateId: templateId,
            },
        });
    }

    return await prisma.cardTemplateElement.createMany({
        data: formatted,
    });
};

export const templatesRouter = createRouter()
    .mutation('post', {
        input: payloadSchema,
        resolve: async ({ input, ctx }: { input: Payload; ctx: any }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }

            // get the user ID from the users table
            const user: User | null = await ctx.prisma.user.findUnique({
                where: {
                    email: ctx.user.email as string,
                },
            });

            if (!user) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }

            const templateResponse = await templateUpsert(input, ctx.prisma, user.id);
            await elementsUpsert(
                input.elements,
                ctx.prisma,
                templateResponse.id,
                !input.id
            );

            return templateResponse.id;
        },
    })
    .query('templateCount', {
        resolve: async ({ ctx }: { ctx: any }) => {
            const user = await getAccount(ctx.prisma, ctx.user?.email as string);
            if (!user) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            return await ctx.prisma.cardTemplate.count({
                where: {
                    userId: user.id,
                },
            });
        },
    })
    .mutation('deleteById', {
        input: z.string(),
        resolve: async ({ input, ctx }: { input: string; ctx: any }) => {
            await getAccount(ctx.prisma, ctx?.user?.email as string);

            return await ctx.prisma.cardTemplate.delete({
                where: {
                    id: input,
                },
            });
        },
    })
    .query('get', {
        resolve: async ({ ctx }: { ctx: any }) => {
            const account: User | null = await getAccount(ctx.prisma, ctx?.user?.email);
            // get all the card templates based on the account.id
            const templates = await ctx.prisma.cardTemplate.findMany({
                where: {
                    userId: account?.id,
                },
            });
            return templates;
        },
    })
    .query('getById', {
        input: z.object({
            id: z.string(),
        }),
        resolve: async ({ input, ctx }) => {
            const template = await ctx.prisma.cardTemplate.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    elements: true,
                },
            });

            if (!template) {
                throw new TRPCError({ code: 'NOT_FOUND' });
            }

            return template;
        },
    })
    .mutation('upload-image', {
        input: z.object({
            file: z.any(),
            uploadPreset: z.string(),
        }),
        resolve: async ({ input }) => {
            const formData = new FormData();
            formData.append('file', input.file as File);
            formData.append('upload_preset', input.uploadPreset);

            return await fetch(
                'https://api.cloudinary.com/v1_1/ehsanmarco/image/upload',
                {
                    method: 'POST',
                    body: formData,
                }
            ).then(res => res.json());
        },
    });
