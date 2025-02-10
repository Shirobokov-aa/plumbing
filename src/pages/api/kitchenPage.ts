import { eq } from "drizzle-orm"
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db/index"
import { kitchenPageTable } from "@/db/schema"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const result = await db.select().from(kitchenPageTable).limit(1)
      if (result.length > 0) {
        res.status(200).json(result[0])
      } else {
        res.status(404).json({ message: "Данные не найдены" })
      }
    } catch (error) {
      console.error("Ошибка получения данных:", error)
      res.status(500).json({ message: "Внутренняя ошибка сервера" })
    }
  } else if (req.method === "PUT") {
    try {
      const { data } = req.body
      await db.update(kitchenPageTable)
        .set({ data })
        .where(eq(kitchenPageTable.id, 1))
      res.status(200).json({ message: "Kitchen page updated successfully" })
    } catch (error) {
      console.error("Ошибка обновления данных:", error)
      res.status(500).json({ message: "Внутренняя ошибка сервера" })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}

