export const DB_NAME = 'deckbuilder';
export const USERS_COLLECTION = 'users';
export const GAMES_COLLECTION = 'games';

export enum Routes {
    ConfirmSignup = '/confirm-signup',
    Games = '/games',
    CreateGame = '/games/create',
    Login = '/api/auth/signin',
    Logout = '/api/auth/signout',
    Home = '/',
}

const gamesBaseUrl = `${Routes.Games}`;
export const gameDetailsSubnavigationLinks = (slug: string) => [
    { title: 'Overview', href: `${gamesBaseUrl}/${slug}`, slug: '/' },
    { title: 'Decks', href: `${gamesBaseUrl}/${slug}/decks`, slug: 'decks' },
    {
        title: 'Lore Builder',
        slug: 'lore',
        href: `${gamesBaseUrl}/${slug}/lore`,
    },
];
