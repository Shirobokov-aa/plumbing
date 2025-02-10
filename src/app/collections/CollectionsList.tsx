"use client"

// import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { getCollections } from "@/app/actions/collections/db"
import type { CollectionItem } from "@/app/types/collections"

function CollectionCard({ item }: { item: CollectionItem }) {
  const imageSrc = item.image || "/placeholder.svg"

  return (
    <div className={`flex ${item.flexDirection} flex-col-reverse xl:gap-24 gap-5`}>
      <div className="xl:max-w-[526px] w-full">
        <Image
          src={imageSrc}
          alt={item.title || "Изображение коллекции"}
          width={526}
          height={526}
          className="object-contain"
        />
      </div>
      <div className="xl:max-w-[614px] w-full flex flex-col justify-around">
        <div className="flex flex-col gap-11">
          <h2 className="lg:text-colH2 text-colH2Lg">{item.title || "Без названия"}</h2>
          <p className="lg:text-desc">{item.desc || "Описание отсутствует"}</p>
        </div>
        <div className="xl:pt-0 pt-10">
          <Link
            href={`/collections/collection-detail/${item.id}`}
            className="text-desc border-b border-black"
          >
            Посмотреть
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function CollectionsList() {
  const collections = await getCollections()

  return (
    <div className="flex flex-col gap-24 pt-24">
      {collections.length === 0 ? (
        <div className="text-center py-10">Коллекции не найдены</div>
      ) : (
        collections.map((item) => <CollectionCard key={item.id} item={item} />)
      )}
    </div>
  )
}
