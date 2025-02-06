import { eq } from "drizzle-orm"
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db/index"
import { bathroomPageTable } from "@/db/schema"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const result = await db.select().from(bathroomPageTable).limit(1)
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
      if (!data) {
        return res.status(400).json({ message: "Данные обязательны" })
      }

      const result = await db
        .update(bathroomPageTable)
        .set({ data })
        .where(eq(bathroomPageTable.id, 1))
        .returning()

      res.status(200).json(result[0])
    } catch (error) {
      console.error("Ошибка обновления:", error)
      res.status(500).json({ message: "Ошибка при обновлении данных" })
    }
  } else {
    res.status(405).json({ message: "Метод не разрешен" })
  }
}

