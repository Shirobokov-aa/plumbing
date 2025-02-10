import { getCollectionDetailBySlug } from "@/app/actions/collection-details/db"
import CollectionDetail from "@/components/collections/CollectionDetail"

export default async function CollectionDetailPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const collectionDetail = await getCollectionDetailBySlug(slug)

  if (!collectionDetail) {
    return <div>Коллекция не найдена</div>
  }

  return <CollectionDetail collection={collectionDetail} />
}
