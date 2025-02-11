import { getCollectionById } from "@/app/actions/collections/db"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CollectionDetailPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const collection = await getCollectionById(parseInt(id))

  if (!collection) {
    return <div className="p-6">Коллекция не найдена</div>
  }

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{collection.name}</h1>
        <div className="flex gap-2">
          <Link href={`/admin/collections/edit/${id}`}>
            <Button>Редактировать</Button>
          </Link>
          <Link href="/admin/collections">
            <Button variant="outline">Назад к списку</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
          <div className="space-y-2">
            <p><strong>Название:</strong> {collection.name}</p>
            <p><strong>Описание:</strong> {collection.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
