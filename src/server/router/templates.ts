import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import payloadSchema from '@/server/models/canvas';
import { User } from '@prisma/client';

export const templatesRouter = createRouter()
    .mutation('add', {
        input: payloadSchema,
        resolve: async ({ input, ctx }) => {
            console.log('ctx.user', ctx.user);
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

            const template = {
                name: input.name,
                width: input.width,
                height: input.height,
                templateImage: input.templateImage,
                cornerBevel: input.cornerBevel,
                backgroundColor: input.backgroundColor,
                elements: input.elements,
            };

            try {
                const result = await ctx.prisma.cardTemplate.create({
                    data: {
                        ...template,
                        userId: user.id,
                    },
                });
                return result;
            } catch (err) {
                console.log(err, 'THE ERROR');
            }
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
