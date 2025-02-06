"use client";

import { use } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { useSections } from "@/app/admin/contexts/SectionsContext";
import CollectionDetailBanner from "@/components/collection-detail/CollectionDetailBanner";
import CollectionDetailSection from "@/components/collection-detail/CollectionDetailSection";
import CollectionDetailSection2 from "@/components/collection-detail/CollectionDetailSection2";
import CollectionDetailSection3 from "@/components/collection-detail/CollectionDetailSection3";
import CollectionDetailSection4 from "@/components/collection-detail/CollectionDetailSection4";

interface ImageBlockData {
  src: string;
  alt?: string;
}

interface Section {
  title: string;
  description: string;
  image: string;
  link?: { text: string; url: string };
  images?: ImageBlockData[];
  titleDesc?: string;
  descriptionDesc?: string;
}

interface BannerProps {
  name: string;
  title: string;
  description: string;
  image: string;
  link: { text: string; url: string };
}

interface CollectionDetails {
  name: string;
  banner: BannerProps;
  link?: { text: string; url: string };
  sections: Section[];
  sections2: Section[];
  sections3: Section[];
  sections4: Section[];
}

interface CollectionContentProps {
  params: Promise<{ name: string }>;
}

export function CollectionContent({ params }: CollectionContentProps) {
  const resolvedParams = use(params);
  const { collectionDetails } = useSections();

  const collection = collectionDetails.find((c) => c.name.toLowerCase() === resolvedParams.name.toLowerCase());

  if (!collection) {
    return <div>Collection not found</div>;
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
                <BreadcrumbLink href="/collections">Коллекции</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/collections/collection-detail/${resolvedParams.name.toLowerCase()}`}>
                  {collection.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <CollectionDetailBanner 
        {...collection.banner} 
        name={collection.name} 
        link={typeof collection.link === 'string' 
          ? { text: collection.link, url: collection.link }
          : collection.link || { text: '', url: '' }
        } 
      />
      {collection.sections.map((section, index) => (
        <CollectionDetailSection 
          key={index} 
          {...section} 
          reverse={index % 2 !== 0}
          link={section.link || { text: '', url: '' }}
          images={section.images || []}
        />
      ))}
      {collection.sections2.map((section, index) => (
        <CollectionDetailSection2 
          key={index} 
          {...section} 
          reverse={index % 2 !== 0}
          titleDesc={section.titleDesc || ''}
          descriptionDesc={section.descriptionDesc || ''}
          link={section.link || { text: '', url: '' }}
          images={section.images || []}
        />
      ))}
      {collection.sections3.map((section, index) => (
        <CollectionDetailSection3 
          key={index} 
          {...section} 
          reverse={index % 2 !== 0}
          link={section.link || { text: '', url: '' }}
          images={section.images || []}
        />
      ))}
      {collection.sections4.map((section, index) => (
        <CollectionDetailSection4 
          key={index} 
          {...section} 
          reverse={index % 2 !== 0}
          images={section.images || []}
        />
      ))}
    </>
  );
}