import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db"
import { collectionDetailsTable } from "@/db/schema"
import { eq, sql } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("Начало получения детальной информации о коллекциях...")
      const collectionDetails = await db.select().from(collectionDetailsTable)
      console.log("Получена детальная информация о коллекциях из БД:", JSON.stringify(collectionDetails, null, 2))

      if (collectionDetails.length === 0) {
        console.log("Детальная информация о коллекциях не найдена, возвращаем пустой массив")
        return res.status(200).json([])
      }

      if (!collectionDetails[0]?.data) {
        console.log("Данные детальной информации о коллекциях отсутствуют")
        return res.status(200).json([])
      }

      console.log("Отправка данных детальной информации о коллекциях клиенту:", collectionDetails[0].data)
      res.status(200).json(collectionDetails[0].data)
    } catch (error) {
      console.error("Ошибка получения детальной информации о коллекциях:", error)
      res.status(500).json({
        error: "Ошибка получения детальной информации о коллекциях",
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
        result = await db
          .update(collectionDetailsTable)
          .set({ data })
          .where(eq(collectionDetailsTable.id, 1))
          .returning()
      } else {
        console.log("Добавление новых записей")
        const existing = await db.select().from(collectionDetailsTable)
        if (existing.length === 0) {
          result = await db
            .insert(collectionDetailsTable)
            .values({
              id: 1,
              data,
            })
            .returning()
        } else {
          result = await db
            .update(collectionDetailsTable)
            .set({ data: sql`${collectionDetailsTable.data} || ${JSON.stringify(data)}::jsonb` })
            .where(eq(collectionDetailsTable.id, 1))
            .returning()
        }
      }

      console.log("Результат операции:", JSON.stringify(result, null, 2))
      res.status(200).json({ success: true, data: result[0].data })
    } catch (error) {
      console.error("Ошибка обновления детальной информации о коллекциях:", error)
      res.status(500).json({
        error: "Ошибка обновления детальной информации о коллекциях",
        details: error instanceof Error ? error.message : "Неизвестная ошибка",
      })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}

