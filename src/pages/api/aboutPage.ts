import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db/index"
import { aboutPageTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const aboutPage = await db.select().from(aboutPageTable).limit(1)
      if (aboutPage.length > 0) {
        res.status(200).json({ data: aboutPage[0].data })
      } else {
        res.status(404).json({ message: "About page not found" })
      }
    } else if (req.method === "PUT") {
      const { data } = req.body
      const updated = await db
        .update(aboutPageTable)
        .set({ data })
        .where(eq(aboutPageTable.id, 1))
        .returning()
      res.status(200).json({ data: updated[0].data })
    } else {
      res.status(405).json({ message: "Method not allowed" })
    }
  } catch (error) {
    console.error("Error handling about page:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

