import { getCollectionDetailBySlug } from "@/app/actions/collection-details/db"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CollectionContent from "./CollectionContent"
import { notFound } from "next/navigation"

export default async function CollectionDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const collection = await getCollectionDetailBySlug(params.slug)

  if (!collection) {
    notFound()
  }

  return (
    <div>
      <Header defaultTextColor="text-black" activeTextColor="text-black" />
      <CollectionContent initialData={collection} />
      <Footer />
    </div>
  )
}
