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
    const existing = await collection.findOne({ email: req.body.email });
    if (existing) {
        res.status(400).json({
            message: 'Email is already in the database',
            type: 'error',
        });
        return;
    }

    const data = {
        email: req.body.email,
        name: req.body.name,
        image: req.body.image,
    };

    // insert the new document
    const doc = await collection.insertOne(data);
    res.status(200).json({
        data: {
            _id: doc.insertedId.toString(),
            ...data,
        } as User,
        type: 'success',
    });
}
