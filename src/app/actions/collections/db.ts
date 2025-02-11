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

    // Проверяем, что результат существует
    if (!result[0]) {
      console.log('Нет данных в БД')
      return []
    }

    // Получаем data из результата
    const data = result[0].data

    // Если data - это массив, возвращаем его
    if (Array.isArray(data)) {
      return data
    }

    // Если data - это объект, оборачиваем его в массив
    if (data && typeof data === 'object') {
      return [data as CollectionItem]
    }

    console.log('Неверный формат данных:', data)
    return []
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
export async function addCollection(collection: CollectionItem) {
  try {
    const collections = await getCollections()
    const updatedCollections = [...collections, collection]

    await db
      .update(collectionsTable)
      .set({ data: updatedCollections })
      .where(eq(collectionsTable.id, 1))
      .returning()

    revalidatePath('/collections')
    return true
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

    revalidatePath('/collections')
    return result[0].data
  } catch (error) {
    console.error("Error updating collections:", error)
    throw new Error("Failed to update collections")
  }
}
