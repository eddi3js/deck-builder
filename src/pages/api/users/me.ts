import { DB_NAME, USERS_COLLECTION } from '@/lib/consts';
import clientPromise, { authGate } from '@/lib/mongodb';
import { Response } from '@/models/api';
import { DiscordAccount } from '@/models/user';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<DiscordAccount>>
) {
    const session = await authGate(req, res);

    if (req.query.email === 'unknown') {
        res.status(400).json({ message: 'Email is unknown', type: 'error' });
    }

    const db = (await clientPromise).db(DB_NAME);
    const collection = db.collection(USERS_COLLECTION);

    const profile = await collection.findOne({
        email: session?.user?.email,
    });

    if (!profile) {
        return res.status(400).json({
            message: 'profile not found',
            type: 'error',
        });
    }

    res.status(200).json({
        data: profile as unknown as DiscordAccount,
    });
}
