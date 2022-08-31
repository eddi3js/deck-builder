export const DB_NAME = 'deckbuilder';
export const USERS_COLLECTION = 'users';
export const GAMES_COLLECTION = 'games';

export enum Routes {
    Unauthorized = '/unauthorized',
    Templates = '/templates',
    Login = '/api/auth/signin',
    Logout = '/api/auth/signout',
    Home = '/',
}
