import { Suspense } from "react"
import { CollectionContent } from "./CollectionContent"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function CollectionDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <Header defaultTextColor="text-black" activeTextColor="text-black" />
      <Suspense fallback={<div>Загрузка...</div>}>
        <CollectionContent params={Promise.resolve(params)} />
      </Suspense>
      <Footer />
    </div>
  )
}

