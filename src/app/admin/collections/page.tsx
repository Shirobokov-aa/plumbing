"use server"

import { getCollections } from "@/app/actions/collections/db"
import { CollectionsList } from "./CollectionsList"

export default async function AdminCollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="container p-6">
      <CollectionsList collections={collections} />
    </div>
  )
}

