import clientPromise from '@/lib/mongodb';
import { BetaAccountResponse } from '@/models/beta';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<BetaAccountResponse>
) {
    const db = (await clientPromise).db('nascency');
    const collection = db.collection('beta');

    const fetch = await collection.find({}).toArray();
    const approvedAccounts = JSON.parse(JSON.stringify(fetch));

    if (approvedAccounts.length === 0) {
        res.status(404).json({
            message: 'No approved accounts',
            type: 'error',
        });
    } else {
        res.status(200).json({
            data: approvedAccounts,
        });
    }
}
