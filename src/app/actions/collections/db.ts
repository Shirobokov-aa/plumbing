'use server'

import { db } from "@/db"
import { collectionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { CollectionItem } from "@/app/types/collections"

// Функции для работы с превью коллекций
export async function getCollections() {
  try {
    const collections = await db
      .select({
        id: collectionsTable.id,
        data: collectionsTable.data
      })
      .from(collectionsTable)
      .limit(1)

    // Возвращаем массив из data или пустой массив
    return collections[0]?.data?.collections || []
  } catch (error) {
    console.error("Error in getCollections:", error)
    return []
  }
}

// Получение одной коллекции по ID
export async function getCollectionById(id: number) {
  try {
    const result = await db
      .select()
      .from(collectionsTable)
      .where(eq(collectionsTable.id, id))
      .limit(1)

    return result[0]
  } catch (error) {
    console.error("Error fetching collection:", error)
    return null
  }
}

// Добавление новой коллекции
export async function createCollection(data: CollectionItem) {
  try {
    const currentCollections = await getCollections()
    const updatedCollections = [...(currentCollections || []), data]

    const existing = await db.select().from(collectionsTable).limit(1)

    if (existing.length > 0) {
      await db
        .update(collectionsTable)
        .set({ data: updatedCollections })
        .where(eq(collectionsTable.id, existing[0].id))
    } else {
      await db.insert(collectionsTable).values({
        data: [data]
      })
    }

    revalidatePath('/admin/collections')
    revalidatePath('/collections')
    return data
  } catch (error) {
    console.error("Error creating collection:", error)
    throw error
  }
}

// Обновление коллекции
export async function updateCollection(id: number, data: Partial<CollectionItem>) {
  try {
    const currentCollections = await getCollections()
    const updatedCollections = currentCollections.map(collection =>
      collection.id === id ? { ...collection, ...data } : collection
    )

    await db
      .update(collectionsTable)
      .set({ data: updatedCollections })
      .where(eq(collectionsTable.id, 1))

    revalidatePath('/admin/collections')
    revalidatePath('/collections')
    return data
  } catch (error) {
    console.error("Error updating collection:", error)
    throw error
  }
}

export async function deleteCollection(id: number) {
  try {
    const currentCollections = await getCollections()
    const updatedCollections = currentCollections.filter(c => c.id !== id)

    await db
      .update(collectionsTable)
      .set({ data: updatedCollections })
      .where(eq(collectionsTable.id, 1))

    revalidatePath('/admin/collections')
    revalidatePath('/collections')
    return true
  } catch (error) {
    console.error("Error deleting collection:", error)
    throw error
  }
}

export async function updateCollections(data: CollectionItem[]) {
  try {
    const result = await db
      .update(collectionsTable)
      .set({ data })
      .where(eq(collectionsTable.id, 1))
      .returning()

    revalidatePath('/collections')
    return result[0].data
  } catch (error) {
    console.error("Error updating collections:", error)
    throw error
  }
}
