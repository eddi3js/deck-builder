import { DB_NAME, USERS_COLLECTION } from '@/lib/consts';
import clientPromise, { authGate } from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
    message?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (process.env.NODE_ENV !== 'development') {
        res.status(500).json({ message: 'Not in development', name: 'error' });
        return;
    }

    const session = await authGate(req, res);

    const db = (await clientPromise).db(DB_NAME);
    const collection = db.collection(USERS_COLLECTION);

    // find if there's already a document with this email
    const existing = await collection.findOne({ email: req.query.email });
    // get the profile of the current user
    const sessionProfile = await collection.findOne({
        email: session?.user?.email,
    });

    if (!existing && sessionProfile?.role === 'admin') {
        // add the discord account to the existing document
        await collection.insertOne({
            email: req.query.email,
        });

        res.status(200).json({
            name: 'success',
        });
    }

    res.status(403).json({
        message: 'Not authorized',
        name: 'error',
    });
}
