import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db"
import { collectionsTable } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("Начало получения коллекций...")
      const collections = await db.select().from(collectionsTable)
      console.log("Получены коллекции из БД:", JSON.stringify(collections, null, 2))

      if (collections.length === 0) {
        console.log("Коллекции не найдены, возвращаем пустой массив")
        return res.status(200).json([])
      }

      if (!collections[0]?.data) {
        console.log("Данные коллекций отсутствуют")
        return res.status(200).json([])
      }

      console.log("Отправка данных коллекций клиенту:", collections[0].data)
      res.status(200).json(collections[0].data)
    } catch (error) {
      console.error("Ошибка получения коллекций:", error)
      res.status(500).json({
        error: "Ошибка получения коллекций",
        details: error instanceof Error ? error.message : "Неизвестная ошибка",
      })
    }
  } else if (req.method === "POST") {
    try {
      const { data, isEdit } = req.body
      console.log("Полученные данные для обновления:", JSON.stringify(data, null, 2))
      console.log("Режим редактирования:", isEdit)

      if (!data || !Array.isArray(data)) {
        throw new Error("Неверный формат данных")
      }

      let result
      if (isEdit) {
        console.log("Обновление существующих записей")
        result = await db.update(collectionsTable).set({ data }).where(eq(collectionsTable.id, 1)).returning()
      } else {
        console.log("Добавление новых записей")
        const existing = await db.select().from(collectionsTable)
        if (existing.length === 0) {
          result = await db
            .insert(collectionsTable)
            .values({
              id: 1,
              data,
            })
            .returning()
        } else {
          result = await db
            .update(collectionsTable)
            .set({ data: sql`${collectionsTable.data} || ${JSON.stringify(data)}::jsonb` })
            .where(eq(collectionsTable.id, 1))
            .returning()
        }
      }

      console.log("Результат операции:", JSON.stringify(result, null, 2))
      res.status(200).json({ success: true, data: result[0].data })
    } catch (error) {
      console.error("Ошибка обновления коллекций:", error)
      res.status(500).json({
        error: "Ошибка обновления коллекций",
        details: error instanceof Error ? error.message : "Неизвестная ошибка",
      })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}

