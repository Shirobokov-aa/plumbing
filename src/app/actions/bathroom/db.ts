'use server'

import { db } from "@/db"
import { bathroomPageTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { BathroomPage } from "@/app/types/pages"

export async function getBathroomPage(): Promise<BathroomPage | null> {
  try {
    const result = await db.select().from(bathroomPageTable).limit(1)
    const data = result[0]?.data as BathroomPage
    return data || null
  } catch (error) {
    console.error("Error fetching bathroom page:", error)
    return null
  }
}

export async function updateBathroomPage(data: BathroomPage) {
  try {
    const result = await db
      .update(bathroomPageTable)
      .set({ data })
      .where(eq(bathroomPageTable.id, 1))
      .returning()

    revalidatePath('/bathroom')
    return result[0].data
  } catch (error) {
    console.error("Error updating bathroom page:", error)
    throw new Error("Failed to update bathroom page")
  }
}
