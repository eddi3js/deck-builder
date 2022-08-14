import { DB_NAME, GAMES_COLLECTION, USERS_COLLECTION } from '@/lib/consts';
import clientPromise, { authGate } from '@/lib/mongodb';
import { Game } from '@/models/game';
import getCollectionData from '@/utils/getCollectionData';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await authGate(req, res);

    const db = (await clientPromise).db(DB_NAME);
    const user = await getCollectionData(USERS_COLLECTION, db, {
        email: session?.user?.email,
    });
    if (!user) {
        return res.status(400).json({ message: 'User Not Found' });
    }

    const games = await getCollectionData(
        GAMES_COLLECTION,
        db,
        {
            userId: user._id,
        },
        true
    );

    if (!games) {
        return res.status(404).json({ message: 'Games not found' });
    }

    res.status(200).json({
        data: games as Game[],
    });
}
