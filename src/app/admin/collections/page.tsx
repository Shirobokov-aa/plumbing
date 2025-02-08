"use client"

import { useState, useEffect } from "react"
import { useSections } from "../contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function CollectionsAdmin() {
  const { collections, isLoading, error: contextError, fetchCollections, deleteCollection } = useSections()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCollections()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteCollection(id)
      fetchCollections()
    } catch (error) {
      console.error("Ошибка при удалении коллекции:", error)
      setError("Не удалось удалить коллекцию")
    }
  }

  if (isLoading) {
    return <div className="text-center py-10">Загрузка...</div>
  }

  if (contextError || error) {
    return <div className="text-center text-red-500 py-10">{contextError || error}</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Управление коллекциями</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {collections.map((collection) => (
          <Card key={collection.id} className="w-full">
            <CardHeader>
              <CardTitle>{collection.title || 'Без названия'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Link href={`/admin/collections/edit/${collection.id}`} className="flex-[2]">
                  <Button className="w-full bg-black text-white hover:bg-gray-800 hover:text-white" variant="outline">
                    Редактировать
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex-1">
                      Удалить
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Удаление коллекции</AlertDialogTitle>
                      <AlertDialogDescription>
                        Вы уверены, что хотите удалить коллекцию "{collection.title || 'Без названия'}"?
                        Это действие нельзя отменить.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(collection.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
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

export default CollectionsAdmin

