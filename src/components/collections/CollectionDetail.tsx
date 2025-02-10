"use client"

import Image from "next/image"
import type { CollectionDetail, Section } from "@/app/types/collections"

interface CollectionDetailProps {
  collection: CollectionDetail;
}

export default function CollectionDetail({ collection }: CollectionDetailProps) {
  return (
    <div className="container mx-auto px-4">
      <div className="relative h-[400px] mb-8">
        {collection.banner.image && (
          <Image
            src={collection.banner.image}
            alt={collection.banner.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{collection.banner.title}</h1>
            <p className="text-xl">{collection.banner.description}</p>
            {collection.banner.link && (
              <a href={collection.banner.link.url} className="text-white underline">
                {collection.banner.link.text}
              </a>
            )}
          </div>
        </div>
      </div>

      {['sections', 'sections2', 'sections3', 'sections4'].map((sectionType) => (
        <div key={sectionType} className="mb-12">
          {(collection[sectionType as keyof CollectionDetail] as Section[])?.map((section: Section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p className="mb-4">{section.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.images?.map((img, imgIndex) => (
                  <div key={imgIndex} className="relative h-64">
                    {img.src && (
                      <Image
                        src={img.src}
                        alt={img.alt || ''}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
