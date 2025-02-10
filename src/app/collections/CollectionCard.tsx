"use client"

import Link from "next/link"
import Image from "next/image"
import type { CollectionItem } from "@/app/types/collections"

export default function CollectionCard({ item }: { item: CollectionItem }) {
  return (
    <div className={`flex ${item.flexDirection} flex-col-reverse xl:gap-24 gap-5`}>
      <div className="xl:max-w-[526px] w-full">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={526}
          height={526}
          className="object-contain"
        />
      </div>
      <div className="xl:max-w-[614px] w-full flex flex-col justify-around">
        <div className="flex flex-col gap-11">
          <h2 className="lg:text-colH2 text-colH2Lg">{item.title}</h2>
          <p className="lg:text-desc">{item.desc}</p>
        </div>
        <div className="xl:pt-0 pt-10">
          <Link
            href={`/collections/${item.slug}`}
            className="text-desc border-b border-black"
          >
            Посмотреть
          </Link>
        </div>
      </div>
    </div>
  )
}
