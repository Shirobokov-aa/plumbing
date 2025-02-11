'use server'

import { db } from "@/db"
import { collectionDetailsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { CollectionDetail } from "@/app/types/collections"
import type { CollectionDetailItem } from "@/app/types/collections"

export async function getCollectionDetails(): Promise<CollectionDetail[]> {
  try {
    const result = await db.select().from(collectionDetailsTable).limit(1)
    return result[0]?.data || []
  } catch (error) {
    console.error("Error fetching collection details:", error)
    return []
  }
}

export async function updateCollectionDetails(data: CollectionDetail[]) {
  try {
    const result = await db
      .update(collectionDetailsTable)
      .set({ data })
      .where(eq(collectionDetailsTable.id, 1))
      .returning()

    revalidatePath('/collections/[slug]')
    return result[0].data
  } catch (error) {
    console.error("Error updating collection details:", error)
    throw new Error("Failed to update collection details")
  }
}

export async function getCollectionDetailBySlug(slug: string): Promise<CollectionDetailItem | null> {
  try {
    const result = await db.select().from(collectionDetailsTable)
      .where(eq(collectionDetailsTable.slug, slug))
      .limit(1)
    return result[0] || null
  } catch (error) {
    console.error("Error fetching collection detail:", error)
    return null
  }
}

export async function updateCollectionDetail(id: string, data: CollectionDetailItem) {
  try {
    const result = await db
      .update(collectionDetailsTable)
      .set(data)
      .where(eq(collectionDetailsTable.id, id))
      .returning()

    revalidatePath(`/collections/${data.slug}`)
    return result[0]
  } catch (error) {
    console.error("Error updating collection detail:", error)
    throw error
  }
}
