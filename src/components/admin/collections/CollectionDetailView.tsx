"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { CollectionDetail, Section } from "@/app/types/collections"

interface CollectionDetailViewProps {
  collection: CollectionDetail;
}

export default function CollectionDetailView({ collection }: CollectionDetailViewProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Основная информация</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="font-semibold">Название</h3>
            <p>{collection.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Баннер</h3>
            {collection.banner.image && (
              <Image
                src={collection.banner.image}
                alt={collection.banner.title}
                width={300}
                height={150}
                className="mt-2"
              />
            )}
            <p className="mt-2">{collection.banner.title}</p>
            <p>{collection.banner.description}</p>
          </div>
        </div>
      </Card>

      {/* Секции */}
      {['sections', 'sections2', 'sections3', 'sections4'].map((sectionType) => (
        <Card key={sectionType} className="p-6">
          <h2 className="text-2xl font-bold mb-4">{sectionType}</h2>
          <div className="grid gap-4">
            {(collection[sectionType as keyof CollectionDetail] as Section[])?.map((section, index) => (
              <div key={index} className="border-t pt-4">
                <h3 className="font-semibold">{section.title}</h3>
                <p>{section.description}</p>
                {section.images?.map((img, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={img.src || ''}
                    alt={img.alt || ''}
                    width={200}
                    height={100}
                    className="mt-2"
                  />
                ))}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
