'use client'

import { useState } from 'react'
import type { Collection } from '@/app/types/collections'

interface CollectionsFormProps {
  initialCollections: Collection[]
}

export function CollectionsForm({ initialCollections }: CollectionsFormProps) {
  const [collections, setCollections] = useState(initialCollections)

  const handleUpdate = (updatedCollection: Collection) => {
    setCollections(collections.map(c =>
      c.id === updatedCollection.id ? updatedCollection : c
    ))
  }

  return (
    <div>
      {collections.map((collection) => (
        <div key={collection.id} className="mb-4 p-4 border rounded">
          <input
            type="text"
            value={collection.name}
            onChange={(e) => handleUpdate({ ...collection, name: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
      ))}
    </div>
  )
}
