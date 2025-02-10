'use server'

import { db } from "@/db"
import { aboutPageTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { AboutPage } from "@/app/types/pages"

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const result = await db.select().from(aboutPageTable).limit(1)
    const data = result[0]?.data as AboutPage
    return data || null
  } catch (error) {
    console.error("Error fetching about page:", error)
    return null
  }

}

export async function updateAboutPage(data: AboutPage) {
  try {
    const result = await db
      .update(aboutPageTable)
      .set({ data })
      .where(eq(aboutPageTable.id, 1))
      .returning()

    revalidatePath('/about')
    return result[0].data
  } catch (error) {
    console.error("Error updating about page:", error)
    throw new Error("Failed to update about page")
  }
}
