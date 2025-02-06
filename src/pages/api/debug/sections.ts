import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { sectionsTable } from '@/db/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sections = await db.select().from(sectionsTable);
    return res.status(200).json({
      message: 'Текущее состояние БД',
      data: sections
    });
  } catch (error) {
    console.error('Debug API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 