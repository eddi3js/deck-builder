import { ObjectId } from 'mongodb';

export type guid = ObjectId;
export interface Response<T> {
    data?: T;
    type?: 'success' | 'error';
    message?: string;
}
