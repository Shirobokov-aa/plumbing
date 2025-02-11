'use server'

import { db } from "@/db"
import { sectionsTable } from "@/db/schema"
import { collectionsTable } from "@/db/schema"
import type { SectionsData } from "@/app/types/sections"
import type { CollectionItem } from "@/app/types/collections"

export async function getInitialData() {
  try {
    const sections = await db.select().from(sectionsTable).limit(1)
    const collections = await db
      .select({
        id: collectionsTable.id,
        data: collectionsTable.data
      })
      .from(collectionsTable)

    return {
      sections: sections[0]?.data as SectionsData || {},
      collections: collections[0]?.data as CollectionItem[] || []
    }
  } catch (error) {
    console.error("Error fetching initial data:", error)
    throw error
  }
}
