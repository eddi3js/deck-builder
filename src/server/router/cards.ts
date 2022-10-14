import { createRouter } from './context';
import authAccount from '../services/authAccount';

export const cardsRouter = createRouter().query('fontList', {
    resolve: async ({ ctx }) => {
        await authAccount(ctx.prisma, ctx.user?.email as string);

        const fetchFonts = await (
            await fetch(
                `https://webfonts.googleapis.com/v1/webfonts?key=${process.env.NEXT_PUBLIC_FONT_KEY}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        ).json();

        console.log('fetchFonts', fetchFonts.items[0].files);

        const response = await fetchFonts.items.map((font: any) => {
            return {
                family: font.family,
                file: font.files.regular,
            };
        });

        return response;
    },
});
