import { createRouter } from './context';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const templatesRouter = createRouter()
    .mutation('new-template', {
        input: z.object({
            name: z.string(),
            type: z.string().regex(/^(string|number|image)$/),
            width: z.number(),
            height: z.number(),
            metadata: z.array(
                z.object({
                    name: z.string(),
                    type: z.string().regex(/^(string|number|image)$/),
                })
            ),
        }),
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

            // find reference to Account by user key and ctx.user.email
            const account = await ctx.prisma.account.findFirst({
                where: {
                    userId: user?.id,
                },
            });

            if (!account) {
                throw new TRPCError({ code: 'NOT_FOUND' });
            }

            const meta = input.metadata.map(m => {
                return {
                    name: m.name,
                    type: m.type,
                };
            });
            const template = await ctx.prisma.cardTemplate.create({
                data: {
                    name: input.name,
                    cardType: input.type,
                    userId: user?.id,
                    width: input.width,
                    height: input.height,
                    frontCardImage: '',
                    backCardImage: '',
                    createdAt: new Date(),
                    metadata: {
                        create: meta as Array<any>,
                    },
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
            )
                .then(res => res.json())
                .catch(err => console.log(err));
        },
    });
