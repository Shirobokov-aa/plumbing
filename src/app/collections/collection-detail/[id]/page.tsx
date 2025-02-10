import { getCollectionById } from "@/app/actions/collections/collections-db"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CollectionContent from "./CollectionContent"

export default async function CollectionDetailPage({
  params
}: {
  params: Promise<{ id: string }> | { id: string }
}) {
  const resolvedParams = await params
  const collection = await getCollectionById(parseInt(resolvedParams.id))

  if (!collection) {
    return <div>Коллекция не найдена</div>
  }

  return (
    <div>
      <Header defaultTextColor="text-black" activeTextColor="text-black" />
      <CollectionContent initialData={collection} />
      <Footer />
    </div>
  )
}

