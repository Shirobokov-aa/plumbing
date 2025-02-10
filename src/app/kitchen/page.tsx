import { Suspense } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getKitchenPage } from "@/app/actions/kitchen/db"
import KitchenContent from "./KitchenContent"

// { params }: { params: Promise<{ name: string }> }
export default async function Kitchen() {
  const kitchenPage = await getKitchenPage()

  return (
    <div>
      <Header defaultTextColor="text-black" activeTextColor="text-black" />
      <Suspense fallback={<div>Loading...</div>}>
        <KitchenContent initialData={kitchenPage} />
      </Suspense>
      <Footer />
    </div>
  )
}

