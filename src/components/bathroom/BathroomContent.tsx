"use client"

import BathroomBanner from "./BathroomBanner"
import BathShower from "./BathShower"
import BathroomCollection from "./BathroomCollection"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"
import { updateBathroomPage } from "@/app/actions/bathroom/db"
import type { BathroomPageData } from "@/app/types/bathroom"

interface BathroomContentProps {
  initialData: BathroomPageData;
}

export default function BathroomContent({ initialData }: BathroomContentProps) {
  const handleTestUpdate = async () => {
    try {
      const result = await updateBathroomPage(initialData)
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
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/bathroom">Ванная</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section>
        <BathroomBanner {...initialData.banner} />
      </section>
      {initialData.sections.map((section: any, index: number) => (
        <section key={index}>
          <BathShower {...section} />
        </section>
      ))}
      {initialData.collections.map((collection: any, index: number) => (
        <section key={index}>
          <BathroomCollection {...collection} />
        </section>
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
