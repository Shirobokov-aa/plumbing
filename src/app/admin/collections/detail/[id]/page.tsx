import { getCollectionDetailBySlug } from "@/app/actions/collection-details/db"
import CollectionDetailView from "@/components/admin/collections/CollectionDetailView"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
  params: { id: string }
}

export default async function CollectionDetailPage({ params }: PageProps) {
  if (!params?.id) {
    notFound()
  }

  const collectionDetail = await getCollectionDetailBySlug(params.id)

  if (!collectionDetail) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Коллекция {collectionDetail.name}</h1>
        <Link href={`/admin/collections/edit/${params.id}`}>
          <Button>Редактировать</Button>
        </Link>
      </div>
      <CollectionDetailView collection={collectionDetail} />
    </div>
  )
}
