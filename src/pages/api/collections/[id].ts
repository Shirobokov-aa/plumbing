import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db/index"
import { collectionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { CollectionItem } from "@/app/admin/contexts/SectionsContext"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  try {
    if (req.method === "GET") {
      const collection = await db
        .select()
        .from(collectionsTable)
        .where(eq(collectionsTable.id, Number(id)))
        .limit(1)
      if (collection.length > 0) {
        // Проверяем и форматируем данные
        const data = collection[0].data as CollectionItem;

        const formattedData = typeof data === 'object' && data !== null ? {
          ...data,
          image: data.image || null,
          id: Number(id),
          title: data.title || '',
          desc: data.desc || '',
          flexDirection: data.flexDirection || 'xl:flex-row'
        } : {};

        res.status(200).json(formattedData);
      } else {
        res.status(404).json({ message: "Collection not found" })
      }
    } else if (req.method === "PUT") {
      const { data } = req.body

      // Проверяем существование записи
      const existing = await db
        .select()
        .from(collectionsTable)
        .where(eq(collectionsTable.id, Number(id)))
        .limit(1)

      let result
      if (existing.length > 0) {
        // Обновляем существующую запись
        result = await db
          .update(collectionsTable)
          .set({ data })
          .where(eq(collectionsTable.id, Number(id)))
          .returning()
      } else {
        // Создаем новую запись
        result = await db
          .insert(collectionsTable)
          .values({ id: Number(id), data })
          .returning()
      }

      res.status(200).json({ data: result[0].data })
    } else if (req.method === "DELETE") {
      await db.delete(collectionsTable).where(eq(collectionsTable.id, Number(id)))
      res.status(200).json({ message: "Collection deleted successfully" })
    } else {
      res.status(405).json({ message: "Method not allowed" })
    }
  } catch (error) {
    console.error("Error handling collection:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

