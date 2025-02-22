import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Link from "next/link"
import Image from "next/image"
import { getCollections } from "@/app/actions/collections/db"
import type { CollectionItem } from "@/app/types/collections"

function CollectionCard({ item }: { item: CollectionItem }) {
  return (
    <div className={`flex ${item.flexDirection} flex-col-reverse xl:gap-24 gap-5`}>
      <div className="xl:max-w-[526px] w-full">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title || 'Изображение коллекции'}
            width={526}
            height={526}
            className="object-contain"
          />
        ) : (
          <div className="w-full h-[526px] bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400">Нет изображения</span>
          </div>
        )}
      </div>
      <div className="xl:max-w-[614px] w-full flex flex-col justify-around">
        <div className="flex flex-col gap-11">
          <h2 className="lg:text-colH2 text-colH2Lg">{item.title || 'Без названия'}</h2>
          <p className="lg:text-desc">{item.desc || 'Описание отсутствует'}</p>
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
  );
}

export default async function Collections() {
  const collections = await getCollections()

  return (
    <div>
      <Header defaultTextColor="text-black" activeTextColor="text-black" />
      <section className="max-w-1440 mx-auto lg:px-24 px-5 pt-32">
        <div className="text-center">
          <h2 className="lg:text-h2 text-h2Lg">Коллекции</h2>
        </div>
        <div className="flex flex-col gap-24 pt-24">
          {collections.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}
