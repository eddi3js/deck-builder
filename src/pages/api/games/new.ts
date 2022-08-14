import { DB_NAME, GAMES_COLLECTION, USERS_COLLECTION } from '@/lib/consts';
import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const db = (await clientPromise).db(DB_NAME);
    const collection = db.collection(GAMES_COLLECTION);
    const userCollection = db.collection(USERS_COLLECTION);

    const { name, email } = JSON.parse(req.body);

    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const user = await userCollection.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const newDoc = await collection.insertOne({ name, userId: user._id });

    return res.status(200).json({
        data: newDoc,
    });
}
