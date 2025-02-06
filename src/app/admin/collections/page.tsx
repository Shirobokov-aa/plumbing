"use client"

import { useState, useEffect } from "react"
import { useSections } from "../contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CollectionsAdmin() {
  const { collections, fetchCollections } = useSections()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCollections = async () => {
      try {
        await fetchCollections()
        setIsLoading(false)
      } catch (err) {
        console.error("Ошибка при загрузке коллекций:", err)
        setError("Не удалось загрузить коллекции")
        setIsLoading(false)
      }
    }
    loadCollections()
  }, [fetchCollections])

  if (isLoading) {
    return <div className="text-center py-10">Загрузка...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Управление коллекциями</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="w-full">
            <CardHeader>
              <CardTitle>{collection.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/admin/collections/edit/${collection.id}`}>
                <Button>Редактировать</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Link href="/admin/collections/add">
          <Button>Добавить новую коллекцию</Button>
        </Link>
      </div>
    </div>
  )
}

