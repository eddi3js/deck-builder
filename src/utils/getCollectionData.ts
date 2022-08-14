import { Db } from 'mongodb';

export default async function getCollectionData(
    collectionName: string,
    db: Db,
    query: object,
    toArray?: boolean
): Promise<any> {
    const collection = db.collection(collectionName);
    if (toArray) {
        return await collection.find(query).toArray();
    }
    return await collection.findOne(query);
}
