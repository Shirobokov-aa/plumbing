"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { useSections } from "@/app/admin/contexts/SectionsContext";
import AboutBanner from "@/components/about/AboutBanner";
import AboutShower from "@/components/about/AboutShower";

export default function AboutContent() {
  const { aboutPage } = useSections();

  if (!aboutPage) {
    return <div>Loading...</div>;
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
                <BreadcrumbLink href="/about">О компании</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <section>
        <AboutBanner {...aboutPage.banner} />
      </section>
      {aboutPage.sections.map((section, index) => (
        <section key={index}>
          <AboutShower {...section} />
        </section>
      ))}
    </>
  );
}
