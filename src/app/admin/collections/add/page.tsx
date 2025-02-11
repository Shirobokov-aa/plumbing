"use client"

import { useRouter } from "next/navigation"
import { useSections } from "@/app/admin/contexts/SectionsContext"
import { CollectionForm } from "@/components/admin/collections/CollectionForm"
import type { CollectionItem } from "@/app/types/collections"

export default function AddCollectionPage() {
  const router = useRouter()
  const { updateCollections, collections } = useSections()

  const handleSubmit = async (newCollection: CollectionItem) => {
    try {
      await updateCollections([...collections, { ...newCollection, id: collections.length + 1 }])
      router.push('/admin/collections')
    } catch (error) {
      console.error('Error adding collection:', error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Добавить коллекцию</h1>
      <CollectionForm onSubmit={handleSubmit} />
    </div>
  )
}

