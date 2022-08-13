import { Response } from './api';
import { DiscordAccount } from './beta';

export interface User {
    _id: string;
    name: string;
    image: string;
    email: string;
}

export type UserResponse = Response<User>;
