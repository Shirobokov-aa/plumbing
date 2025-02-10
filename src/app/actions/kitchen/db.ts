'use server'

import { db } from "@/db"
import { kitchenPageTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { KitchenPage } from "@/app/types/pages"

export async function getKitchenPage(): Promise<KitchenPage | null> {
  try {
    const result = await db.select().from(kitchenPageTable).limit(1)
    const data = result[0]?.data as KitchenPage
    return data || null
  } catch (error) {
    console.error("Error fetching kitchen page:", error)
    return null
  }
}

export async function updateKitchenPage(data: KitchenPage) {
  try {
    const result = await db
      .update(kitchenPageTable)
      .set({ data })
      .where(eq(kitchenPageTable.id, 1))
      .returning()

    revalidatePath('/kitchen')
    return result[0].data
  } catch (error) {
    console.error("Error updating kitchen page:", error)
    throw new Error("Failed to update kitchen page")
  }
}
