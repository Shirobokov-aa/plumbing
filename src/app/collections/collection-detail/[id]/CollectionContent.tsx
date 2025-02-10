"use client";

import { useState } from 'react'
import { updateCollectionDetail } from "@/app/actions/collections/collections-db"
import type { CollectionDetailItem } from "@/app/types/collections"
import CollectionDetailBanner from "@/components/collection-detail/CollectionDetailBanner"
import CollectionDetailSection from "@/components/collection-detail/CollectionDetailSection"
import CollectionDetailSection2 from "@/components/collection-detail/CollectionDetailSection2"
import CollectionDetailSection3 from "@/components/collection-detail/CollectionDetailSection3"
import CollectionDetailSection4 from "@/components/collection-detail/CollectionDetailSection4"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"

interface CollectionContentProps {
  initialData: CollectionDetailItem
}

export default function CollectionContent({ initialData }: CollectionContentProps) {
  const [collection] = useState(initialData)

  const handleTestUpdate = async () => {
    try {
      const result = await updateCollectionDetail(collection.id, collection)
      console.log('Обновление успешно:', result)
    } catch (error) {
      console.error('Ошибка обновления:', error)
    }
  }

  return (
    <>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/collections">Коллекции</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/collections/collection-detail/${collection.id}`}>
                  {collection.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <CollectionDetailBanner {...collection.banner} name={collection.name} />

      {collection.sections?.map((section, index) => (
        <CollectionDetailSection key={index} {...section} reverse={index % 2 !== 0} />
      ))}

      {collection.sections2?.map((section, index) => (
        <CollectionDetailSection2 key={index} {...section} />
      ))}

      {collection.sections3?.map((section, index) => (
        <CollectionDetailSection3 key={index} {...section} />
      ))}

      {collection.sections4?.map((section, index) => (
        <CollectionDetailSection4 key={index} {...section} />
      ))}

      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={handleTestUpdate}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
        >
          Тест обновления
        </button>
      )}
    </>
  )
}
