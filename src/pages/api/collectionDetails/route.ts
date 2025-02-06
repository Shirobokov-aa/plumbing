import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db"
import { collectionDetailsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const collectionDetails = await db.select().from(collectionDetailsTable);
      const data = collectionDetails.length > 0 ? collectionDetails[0].data : [];
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch collection details" });
    }
  } else if (req.method === "POST") {
    try {
      const { data, isEdit } = req.body;
      let result;

      if (isEdit) {
        result = await db
          .update(collectionDetailsTable)
          .set({ data })
          .where(eq(collectionDetailsTable.id, 1))
          .returning();
      } else {
        const existing = await db.select().from(collectionDetailsTable);
        if (existing.length === 0) {
          result = await db
            .insert(collectionDetailsTable)
            .values({ id: 1, data })
            .returning();
        } else {
          result = await db
            .update(collectionDetailsTable)
            .set({ data })
            .where(eq(collectionDetailsTable.id, 1))
            .returning();
        }
      }

      res.status(200).json({ data: result[0].data });
    } catch (error) {
      res.status(500).json({ error: "Failed to update collection details" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}

