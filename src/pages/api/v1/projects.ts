// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from '../../../services/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { client, db } = await connectToDatabase();

  if (client.isConnected()){
    const data = await db.collection(process.env.MONGODB_DB_COLLECTION).find().toArray();
    res.status(200);
    
    return res.json(JSON.stringify(data));
  }

  return res.status(500).json({ error: 'client DB is not connected' })
};
