'use server'

import { db } from "@/db"
import { collectionDetailsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { CollectionDetail } from "@/app/types/collections"
import type { CollectionDetailItem } from "@/app/types/collections"

export async function getCollectionDetails(): Promise<CollectionDetail[]> {
  try {
    const result = await db
      .select()
      .from(collectionDetailsTable)
      .limit(1)

    return result[0]?.data || []
  } catch (error) {
    console.error("Error fetching collection details:", error)
    return []
  }
}

export async function getCollectionDetailById(id: number) {
  try {
    const details = await getCollectionDetails()
    return details.find(detail => detail.id === id) || null
  } catch (error) {
    console.error("Error fetching collection detail:", error)
    return null
  }
}

export async function createCollectionDetail(data: CollectionDetail) {
  try {
    const currentDetails = await getCollectionDetails()
    const updatedDetails = [...currentDetails, data]

    const existing = await db.select().from(collectionDetailsTable).limit(1)

    if (existing.length > 0) {
      await db
        .update(collectionDetailsTable)
        .set({ data: updatedDetails })
        .where(eq(collectionDetailsTable.id, existing[0].id))
    } else {
      await db.insert(collectionDetailsTable).values({
        data: [data]
      })
    }

    revalidatePath('/admin/collections')
    revalidatePath('/collections')
    return data
  } catch (error) {
    console.error("Error creating collection detail:", error)
    throw error
  }
}

export async function updateCollectionDetail(id: number, data: CollectionDetail) {
  try {
    const details = await getCollectionDetails()
    const updatedDetails = details.map(detail =>
      detail.id === id ? { ...detail, ...data } : detail
    )

    await db
      .update(collectionDetailsTable)
      .set({ data: updatedDetails })
      .where(eq(collectionDetailsTable.id, 1))

    revalidatePath(`/collections/${id}`)
    revalidatePath('/admin/collections')
    return data
  } catch (error) {
    console.error("Error updating collection detail:", error)
    throw error
  }
}

export async function deleteCollectionDetail(id: number) {
  try {
    const details = await getCollectionDetails()
    const updatedDetails = details.filter(detail => detail.id !== id)

    await db
      .update(collectionDetailsTable)
      .set({ data: updatedDetails })
      .where(eq(collectionDetailsTable.id, 1))

    revalidatePath('/admin/collections')
    revalidatePath('/collections')
    return true
  } catch (error) {
    console.error("Error deleting collection detail:", error)
    throw error
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
