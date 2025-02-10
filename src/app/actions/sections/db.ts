'use server'

import { db } from "@/db"
import { sectionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { SectionsData } from "@/app/types/sections"

export async function getSections(): Promise<SectionsData> {
  try {
    const result = await db.select().from(sectionsTable).limit(1)
    return result[0]?.data as SectionsData || {}
  } catch (error) {
    console.error("Error fetching sections:", error)
    return {}
  }
}
// тут должен быть тип Sections
export async function updateSections(data: SectionsData) {
  try {
    const result = await db
      .update(sectionsTable)
      .set({ data })
      .where(eq(sectionsTable.id, 1))
      .returning()

    revalidatePath('/')
    return result[0].data
  } catch (error) {
    console.error("Error updating sections:", error)
    throw new Error("Failed to update sections")
  }
}
