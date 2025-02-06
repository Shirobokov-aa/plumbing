import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db/index"
import { collectionDetailsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  try {
    if (req.method === "GET") {
      const collectionDetail = await db
        .select()
        .from(collectionDetailsTable)
        .where(eq(collectionDetailsTable.id, Number(id)))
        .limit(1)
      if (collectionDetail.length > 0) {
        res.status(200).json(collectionDetail[0])
      } else {
        res.status(404).json({ message: "Collection detail not found" })
      }
    } else if (req.method === "PUT") {
      const { data } = req.body
      const updated = await db
        .update(collectionDetailsTable)
        .set({ data })
        .where(eq(collectionDetailsTable.id, Number(id)))
        .returning()

      res.status(200).json({ data: updated[0].data })
    } else if (req.method === "DELETE") {
      await db
        .delete(collectionDetailsTable)
        .where(eq(collectionDetailsTable.id, Number(id)))
      res.status(200).json({ message: "Collection detail deleted successfully" })
    } else {
      res.status(405).json({ message: "Method not allowed" })
    }
  } catch (error) {
    console.error("Error handling collection detail:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

