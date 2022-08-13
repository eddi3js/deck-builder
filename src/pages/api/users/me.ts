import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User, UserResponse } from '@/models/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserResponse>
) {
    const db = (await clientPromise).db('nascency');
    const collection = db.collection('users');

    // make sure there's no duplicate email
    const me = await collection.findOne({ email: req.query.email });
    if (!me) {
        res.status(404).json({
            message: 'Account not found',
            type: 'error',
        });
        return;
    } else {
        res.status(200).json({
            data: me as unknown as User,
        });
    }
}
