import { getCollectionDetailBySlug } from "@/app/actions/collection-details/db"
import CollectionDetailView from "@/components/admin/collections/CollectionDetailView"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CollectionDetailPage({
  params: { id }
}: {
  params: { id: string }
}) {
  const collectionDetail = await getCollectionDetailBySlug(id)

  if (!collectionDetail) {
    return <div>Коллекция не найдена</div>
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Коллекция {collectionDetail.name}</h1>
        <Link href={`/admin/collections/edit/${id}`}>
          <Button>Редактировать</Button>
        </Link>
      </div>
      <CollectionDetailView collection={collectionDetail} />
    </div>
  )
}
