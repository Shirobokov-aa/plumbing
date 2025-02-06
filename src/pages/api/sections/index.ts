import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db"
import { sectionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const sections = await db.select().from(sectionsTable);
      
      if (!sections || sections.length === 0) {
        return res.status(200).json({});
      }
      
      return res.status(200).json(sections[0].data);
    } else if (req.method === "POST") {
      try {
        const { sectionName, data } = req.body;
        console.log("POST /api/sections - Получены данные:", { sectionName, data });
        
        const existing = await db.select().from(sectionsTable);
        let result;

        if (existing.length === 0) {
          result = await db
            .insert(sectionsTable)
            .values({
              id: 1,
              data: { [sectionName]: data }
            })
            .returning();
        } else {
          const currentData = existing[0].data || {};
          result = await db
            .update(sectionsTable)
            .set({
              data: {
                ...currentData,
                [sectionName]: data
              }
            })
            .where(eq(sectionsTable.id, 1))
            .returning();
        }

        console.log("POST /api/sections - Результат:", result);
        res.status(200).json({ data: result[0].data });
      } catch (error) {
        console.error("POST /api/sections - Ошибка:", error);
        res.status(500).json({ error: "Failed to update section" });
      }
    } else if (req.method === "PUT") {
      const { sectionName, data } = req.body;
      
      // Получаем текущие секции
      const sections = await db.select().from(sectionsTable);
      
      if (!sections || sections.length === 0) {
        // Если секций нет, создаем новую запись
        const newData = { [sectionName]: data };
        await db.insert(sectionsTable).values({ data: newData });
        return res.status(200).json({ data: newData });
      }
      
      // Обновляем существующие данные
      const currentData = sections[0].data || {};
      const updatedData = {
        ...currentData,
        [sectionName]: data
      };
      
      await db
        .update(sectionsTable)
        .set({ data: updatedData })
        .where(eq(sectionsTable.id, sections[0].id));
      
      return res.status(200).json({ data: updatedData });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}