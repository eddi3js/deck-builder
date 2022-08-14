import { DB_NAME, GAMES_COLLECTION, USERS_COLLECTION } from '@/lib/consts';
import clientPromise from '@/lib/mongodb';
import { Response } from '@/models/api';
import { Game } from '@/models/game';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Game>>
) {
    const db = (await clientPromise).db(DB_NAME);
    const userCollection = db.collection(USERS_COLLECTION);
    const gamesCollection = db.collection(GAMES_COLLECTION);

    const user = await userCollection.findOne({ email: req.query.email });
    if (!user) {
        return res.status(400).json({ message: 'Email is unknown' });
    }

    const game = await gamesCollection.findOne({
        _id: req.query.gameId,
    });

    if (!game) {
        return res
            .status(404)
            .json({ message: 'Game not found', type: 'error' });
    }

    return res.status(200).json({
        data: game as Game,
    });
}
