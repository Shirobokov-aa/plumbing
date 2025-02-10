"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import type { AboutPage } from "@/app/types/pages";
import AboutBanner from "@/components/about/AboutBanner";
import AboutShower from "@/components/about/AboutShower";

interface AboutContentProps {
  initialData: AboutPage;
}

export default function AboutContent({ initialData }: AboutContentProps) {
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
                <BreadcrumbLink href="/about">О компании</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section>
        <AboutBanner {...initialData.banner} />
      </section>
      {initialData.sections.map((section, index) => (
        <section key={index}>
          <AboutShower {...section} />
        </section>
      ))}
    </>
  );
}
