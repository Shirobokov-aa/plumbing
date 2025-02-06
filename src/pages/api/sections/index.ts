import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db"
import { sectionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const sections = await db.select().from(sectionsTable);
      console.log("API response data:", sections);
      
      if (!sections.length) {
        return res.status(200).json({});
      }

      return res.status(200).json(sections[0].data);
    } catch (error) {
      console.error("API Error:", error);
      return res.status(500).json({ error: String(error) });
    }
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
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}