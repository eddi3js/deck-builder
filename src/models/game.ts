import { guid } from '@/models/api';

export interface Game {
    _id: guid;
    userId: guid;
    name: string;
}
