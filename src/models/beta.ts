import { Response } from './api';

export type BetaAccountResponse = Response<BetaAccount[]>;

export type BetaAccount = {
    _id: string;
    email: string;
};

export interface DiscordAccount extends Omit<BetaAccount, '_id'> {
    name: string;
    image: string;
}
