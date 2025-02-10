"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import type { KitchenPage } from "@/app/types/pages";
import KitchenBanner from "@/components/kitchen/KitchenBanner";
import KitchenShower from "@/components/kitchen/KitchenShower";

interface KitchenContentProps {
  initialData: KitchenPage | null;
}

export default function KitchenContent({ initialData }: KitchenContentProps) {
  if (!initialData) return null;

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
                <BreadcrumbLink href="/kitchen">Кухня</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section>
        <KitchenBanner {...initialData.banner} />
      </section>
      {initialData.sections?.map((section, index) => (
        <section key={index}>
          <KitchenShower {...section} />
        </section>
      ))}
    </>
  );
}
