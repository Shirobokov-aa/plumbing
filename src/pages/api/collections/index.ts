// File: src/pages/api/collections/index.ts

import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db/index"
import { collectionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Добавляем заголовки для предотвращения кэширования
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === "GET") {
    try {
      const collections = await db.select().from(collectionsTable)
      const data = collections.length > 0 ? collections[0].data : []
      res.status(200).json(data)
    } catch (error) {
      console.error("Error fetching collections:", error)
      res.status(500).json({ error: "Failed to fetch collections" })
    }
  } else if (req.method === "POST") {
    try {
      const { data, isEdit } = req.body
      let result

      if (isEdit) {
        result = await db
          .update(collectionsTable)
          .set({ data })
          .where(eq(collectionsTable.id, 1))
          .returning()
      } else {
        const existing = await db.select().from(collectionsTable)
        if (existing.length === 0) {
          result = await db
            .insert(collectionsTable)
            .values({ id: 1, data })
            .returning()
        } else {
          result = await db
            .update(collectionsTable)
            .set({ data })
            .where(eq(collectionsTable.id, 1))
            .returning()
        }
      }

      res.status(200).json({ data: result[0].data })
    } catch (error) {
      res.status(500).json({ error: "Failed to update collections" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  } 
}
