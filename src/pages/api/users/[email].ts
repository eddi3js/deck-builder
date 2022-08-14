import { DB_NAME, USERS_COLLECTION } from '@/lib/consts';
import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
    message?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.query.email === 'unknown') {
        res.status(400).json({ message: 'Email is unknown', name: 'error' });
    }

    const db = (await clientPromise).db(DB_NAME);
    const collection = db.collection(USERS_COLLECTION);

    // find if there's already a document with this email
    const existing = await collection.findOne({ email: req.query.email });

    if (!existing) {
        res.status(400).json({
            message: 'email not found',
            name: 'error',
        });
        return;
    }

    res.status(200).json({
        name: 'success',
    });
}
