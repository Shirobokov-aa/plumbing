import type { CollectionDetailItem } from "@/app/admin/contexts/SectionsContext"
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
        const data = collectionDetail[0].data as CollectionDetailItem;

        const formattedData = typeof data === 'object' && data !== null ? {
          ...data,
          id: Number(id),
          banner: {
            ...data.banner,
            image: data.banner?.image || null,
            link: data.banner?.link || { text: '', url: '' }
          },
          sections: data.sections?.map(section => ({
            ...section,
            image: section.image || null,
            link: section.link || { text: '', url: '' }
          })) || [],
          sections2: data.sections2?.map(section => ({
            ...section,
            image: section.image || null,
            link: section.link || { text: '', url: '' }
          })) || [],
          sections3: data.sections3?.map(section => ({
            ...section,
            image: section.image || null,
            link: section.link || { text: '', url: '' }
          })) || [],
          sections4: data.sections4?.map(section => ({
            ...section,
            image: section.image || null
          })) || []
        } : {};

        res.status(200).json(formattedData)
      } else {
        res.status(404).json({ message: "Collection detail not found" })
      }
    } else if (req.method === "PUT") {
      const { data } = req.body

      // Проверяем существование записи
      let result = await db
        .update(collectionDetailsTable)
        .set({ data })
        .where(eq(collectionDetailsTable.id, Number(id)))
        .returning()

      // Если записи нет, создаем новую
      if (result.length === 0) {
        result = await db
          .insert(collectionDetailsTable)
          .values({ id: Number(id), data })
          .returning()
      }

      if (result.length > 0) {
        res.status(200).json(result[0].data)
      } else {
        res.status(500).json({ message: "Failed to update/create collection detail" })
      }
    } else {
      res.status(405).json({ message: "Method not allowed" })
    }
  } catch (error) {
    console.error("Error handling collection detail:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

