"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { CollectionItem } from "@/app/types/collections"

interface CollectionFormProps {
  onSubmit: (collection: CollectionItem) => Promise<void>
}

export default function CollectionForm({ onSubmit }: CollectionFormProps) {
  const [collection, setCollection] = useState<Partial<CollectionItem>>({
    title: "",
    desc: "",
    image: "",
    link: "",
    flexDirection: "xl:flex-row"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(collection as CollectionItem)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Название</Label>
        <Input
          value={collection.title}
          onChange={(e) => setCollection(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label>Описание</Label>
        <Textarea
          value={collection.desc}
          onChange={(e) => setCollection(prev => ({ ...prev, desc: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label>Изображение (URL)</Label>
        <Input
          value={collection.image}
          onChange={(e) => setCollection(prev => ({ ...prev, image: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label>Ссылка</Label>
        <Input
          value={collection.link}
          onChange={(e) => setCollection(prev => ({ ...prev, link: e.target.value }))}
          required
        />
      </div>
      <Button type="submit">Сохранить</Button>
    </form>
  )
}
