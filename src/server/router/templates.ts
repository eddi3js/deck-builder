import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const elementSchema = z.object({
    index: z.number(),
    x1: z.number(),
    y1: z.number(),
    x2: z.number(),
    y2: z.number(),
    roughElement: z.object({
        shape: z.string(),
        sets: z.array(z.any()),
        options: z.any(),
    }),
    metadata: z.object({
        name: z.string(),
        type: z.string().regex(/^(string|number|image)$/),
    }),
});

export const payloadSchema = z.object({
    elements: z.array(elementSchema),
    name: z.string(),
    width: z.number(),
    height: z.number(),
    cornerBevel: z.number(),
    templateImage: z.string(),
    backgroundColor: z.string(),
});

export const templatesRouter = createRouter()
    .mutation('update', {
        input: payloadSchema,
        resolve: async ({ input, ctx }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }

            // get the user ID from the users table
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email: ctx.user.email as string,
                },
            });

            if (!user) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }

            // find reference to Account by user key and ctx.user.email
            const account = await ctx.prisma.account.findFirst({
                where: {
                    userId: user?.id,
                },
            });

            if (!account) {
                throw new TRPCError({ code: 'NOT_FOUND' });
            }

            const template = await ctx.prisma.cardTemplate.create({
                data: {
                    name: input.name,
                    userId: user.id,
                    width: input.width,
                    height: input.height,
                    templateImage: input.templateImage,
                    cornerBevel: input.cornerBevel,
                    backgroundColor: input.backgroundColor,
                    createdAt: new Date(),
                    elements: input.elements,
                },
                include: {
                    metadata: true,
                },
            } as any);

            return template;
        },
    })
    .mutation('upload-image', {
        input: z.object({
            file: z.any(),
            uploadPreset: z.string(),
        }),
        resolve: async ({ input, ctx }) => {
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
