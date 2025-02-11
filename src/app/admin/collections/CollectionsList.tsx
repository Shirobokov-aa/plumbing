'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { CollectionItem } from "@/app/types/collections"

interface CollectionsListProps {
  collections: CollectionItem[] | null
}

export function CollectionsList({ collections }: CollectionsListProps) {
  if (!collections || !Array.isArray(collections)) {
    return <div>Нет доступных коллекций</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Коллекции</h1>
        <Link href="/admin/collections/add">
          <Button>Добавить коллекцию</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {collections.map((collection) => (
          <div key={collection.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">{collection.title}</h3>
              <p className="text-sm text-gray-500">{collection.desc}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/collections/edit/${collection.id}`}>
                <Button variant="outline">Редактировать превью</Button>
              </Link>
              <Link href={`/admin/collection-details/${collection.id}`}>
                <Button>Детальная страница</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
