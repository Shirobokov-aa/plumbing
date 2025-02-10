"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { CollectionItem } from "@/app/types/collections"

interface CollectionsListProps {
  collections: CollectionItem[]
}

export default function CollectionsList({ collections }: CollectionsListProps) {
  return (
    <div className="grid gap-4">
      {collections.map((collection) => (
        <Card key={collection.id} className="p-4">
          <div className="flex items-center gap-4">
            <Image
              src={collection.image}
              alt={collection.title}
              width={100}
              height={100}
              className="rounded"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{collection.title}</h3>
              <p className="text-gray-600">{collection.desc}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/collections/detail/${collection.id}`}>
                <Button variant="outline">Просмотр</Button>
              </Link>
              <Link href={`/admin/collections/edit/${collection.id}`}>
                <Button>Редактировать</Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
