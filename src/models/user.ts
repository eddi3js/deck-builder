import { guid } from '@/models/api';

export interface User {
    _id: string;
    email: string;
    games: guid[];
}
export interface DiscordAccount extends Omit<User, '_id' | 'games'> {
    name: string;
    image: string;
}
