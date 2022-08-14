import { Routes } from '@/lib/consts';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export default NextAuth({
    providers: [
        DiscordProvider({
            id: 'discord',
            name: 'Discord',
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.includes(Routes.Login))
                return `${baseUrl}/${Routes.ConfirmSignup}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
    secret: process.env.JWT_SECRET as string,
});
