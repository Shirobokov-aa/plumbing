"use server"

import { getCollections } from "@/app/actions/collections/db"
import CollectionsList from "@/components/admin/collections/CollectionsList"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
// import Image from "next/image"

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div>
      <Header defaultTextColor="text-black" activeTextColor="text-black" />
      <section className="max-w-1440 mx-auto lg:px-24 px-5 pt-32">
        <div className="flex justify-between items-center mb-8">
          <h2 className="lg:text-h2 text-h2Lg">Управление коллекциями</h2>
          <Link href="/admin/collections/add">
            <Button>Добавить коллекцию</Button>
          </Link>
        </div>
        <CollectionsList collections={collections} />
      </section>
      <Footer />
    </div>
  )
}

