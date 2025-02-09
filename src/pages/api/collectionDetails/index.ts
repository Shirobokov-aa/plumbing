import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db"
import { collectionDetailsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const collectionDetails = await db.select().from(collectionDetailsTable)
      if (collectionDetails.length > 0) {
        const formattedData = Array.isArray(collectionDetails[0].data) 
          ? collectionDetails[0].data 
          : [collectionDetails[0].data];
        res.status(200).json(formattedData)
      } else {
        res.status(200).json([])
      }
    } catch (error) {
      console.error("Error fetching collection details:", error)
      res.status(500).json({ error: "Failed to fetch collection details" })
    }
  } else if (req.method === "POST") {
    try {
      const { data, isEdit } = req.body
      let result = await db
        .update(collectionDetailsTable)
        .set({ data })
        .where(eq(collectionDetailsTable.id, 1))
        .returning()

      if (result.length === 0) {
        result = await db
          .insert(collectionDetailsTable)
          .values({ id: 1, data })
          .returning()
      }

      res.status(200).json(result[0].data)
    } catch (error) {
      console.error("Error updating collection details:", error)
      res.status(500).json({ error: "Failed to update collection details" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}