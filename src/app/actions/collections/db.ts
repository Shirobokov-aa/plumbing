'use server'

import { db } from "@/db"
import { collectionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import type { CollectionItem } from "@/app/types/collections"

// Получение всех коллекций
export async function getCollections(): Promise<CollectionItem[]> {
  try {
    const result = await db.select().from(collectionsTable).limit(1)
    const collections = result[0]?.data
    return Array.isArray(collections) ? collections : []
  } catch (error) {
    console.error("Error fetching collections:", error)
    return []
  }
}

// Получение одной коллекции по ID
export async function getCollectionById(id: number) {
  try {
    const collections = await getCollections()
    return collections.find((collection: CollectionItem) => collection.id === id)
  } catch (error) {
    console.error("Error fetching collection:", error)
    return null
  }
}

// Добавление новой коллекции
export async function addCollection(newCollection: Omit<CollectionItem, "id">) {
  try {
    const collections = await getCollections()
    const id = Date.now()
    const collectionToAdd = { ...newCollection, id }

    const updatedCollections = [...collections, collectionToAdd]
    await db
      .update(collectionsTable)
      .set({ data: updatedCollections })
      .where(eq(collectionsTable.id, 1))

    return collectionToAdd
  } catch (error) {
    console.error("Error adding collection:", error)
    throw new Error("Failed to add collection")
  }
}

// Обновление коллекции
export async function updateCollection(id: number, data: Partial<CollectionItem>) {
  try {
    const collections = await getCollections()
    const updatedCollections = collections.map((collection: CollectionItem) =>
      collection.id === id ? { ...collection, ...data } : collection
    )

    await db
      .update(collectionsTable)
      .set({ data: updatedCollections })
      .where(eq(collectionsTable.id, 1))

    return updatedCollections.find((c: CollectionItem) => c.id === id)
  } catch (error) {
    console.error("Error updating collection:", error)
    throw new Error("Failed to update collection")
  }
}

export async function deleteCollection(id: number) {
  try {
    await db.delete(collectionsTable).where(eq(collectionsTable.id, id))
    return true
  } catch (error) {
    console.error("Error deleting collection:", error)
    throw new Error("Failed to delete collection")
  }
}

export async function updateCollections(data: CollectionItem[]) {
  try {
    const result = await db
      .update(collectionsTable)
      .set({ data })
      .where(eq(collectionsTable.id, 1))
      .returning()

    revalidatePath('/')
    return result[0].data
  } catch (error) {
    console.error("Error updating collections:", error)
    throw new Error("Failed to update collections")
  }
}
