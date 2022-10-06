import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const payloadSchema = z.object({
    name: z.string(),
    width: z.string(),
    height: z.string(),
    cornerBevel: z.number(),
    templateImage: z.string(),
    backgroundColor: z.string(),
    elements: z.any(),
});

export const templatesRouter = createRouter()
    .mutation('add', {
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

            const newTemplate = await ctx.prisma.cardTemplate.create({
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
            });
            console.log('newTemplate', newTemplate);
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
