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
    if (process.env.NODE_ENV !== 'development') {
        res.status(500).json({ message: 'Not in development', name: 'error' });
        return;
    }

    const db = (await clientPromise).db('nascency');
    const collection = db.collection('beta');

    // find if there's already a document with this email
    const existing = await collection.findOne({ email: req.query.email });

    if (!existing) {
        // add the discord account to the existing document
        await collection.insertOne({
            email: req.query.email,
        });
    }

    res.status(200).json({
        name: 'success',
    });
}
