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

interface BathroomContentProps {
  initialData: any; // Замените any на правильный тип данных
}

export default function BathroomContent({ initialData }: BathroomContentProps) {
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
    </>
  )
}