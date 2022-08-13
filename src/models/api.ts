export interface Response<T> {
    data?: T;
    type?: 'success' | 'error';
    message?: string;
}
