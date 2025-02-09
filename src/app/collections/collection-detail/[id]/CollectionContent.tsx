"use client";

import { use } from "react";
import { useEffect, useState, useCallback } from "react";
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
  src: string | null;
  alt?: string;
  desc?: string;
  url?: string;
  width?: number;
  height?: number;
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
  id: number;
  name: string;
  banner: BannerProps;
  link?: { text: string; url: string };
  sections: Section[];
  sections2: Section[];
  sections3: Section[];
  sections4: Section[];
}

interface CollectionContentProps {
  params: Promise<{ id: string }>;
}

export function CollectionContent({ params }: CollectionContentProps) {
  const resolvedParams = use(params);
  const { collectionDetails, fetchCollectionDetails } = useSections();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadCollection = useCallback(async () => {
    if (!resolvedParams?.id || isInitialized) return;
    
    try {
      setIsLoading(true);
      await fetchCollectionDetails();
      setIsInitialized(true);
    } catch (err) {
      console.error("Ошибка при загрузке коллекции:", err);
      setError("Не удалось загрузить коллекцию");
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams?.id, fetchCollectionDetails, isInitialized]);

  useEffect(() => {
    if (!isInitialized) {
      loadCollection();
    }
  }, [loadCollection, isInitialized]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const collection = collectionDetails.find((c) => c.id === parseInt(resolvedParams.id));

  if (!collection) {
    return <div>Коллекция не найдена</div>;
  }

  const safeCollection = {
    ...collection,
    banner: {
      ...collection.banner,
      image: collection.banner?.image || '/placeholder.svg',
    },
    sections: collection.sections?.map(section => ({
      ...section,
      image: section.image || '/placeholder.svg',
      images: section.images?.map(img => ({
        ...img,
        src: img.src || '/placeholder.svg'
      })) || []
    })) || []
  };

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
                <BreadcrumbLink href={`/collections/collection-detail/${resolvedParams.id}`}>
                  {collection.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
      <CollectionDetailBanner 
        {...safeCollection.banner} 
        name={safeCollection.name} 
        link={typeof safeCollection.link === 'string' 
          ? { text: safeCollection.link, url: safeCollection.link }
          : safeCollection.link || { text: '', url: '' }
        } 
      />
      {safeCollection.sections.map((section, index) => (
        <CollectionDetailSection 
          key={index} 
          {...section} 
          reverse={index % 2 !== 0}
          link={section.link || { text: '', url: '' }}
          images={(section.images || []).map(img => ({
            ...img,
            src: img.src || '/placeholder.svg'
          }))}
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
          images={(section.images || []).map(img => ({
            ...img,
            src: img.src || '/placeholder.svg'
          }))}
        />
      ))}
      {collection.sections3.map((section, index) => (
        <CollectionDetailSection3 
          key={index} 
          {...section} 
          reverse={index % 2 !== 0}
          link={section.link || { text: '', url: '' }}
          images={(section.images || []).map(img => ({
            ...img,
            src: img.src || '/placeholder.svg'
          }))}
        />
      ))}
      {collection.sections4.map((section, index) => (
        <CollectionDetailSection4 
          key={index} 
          {...section} 
          reverse={index % 2 !== 0}
          images={(section.images || []).map(img => ({
            ...img,
            src: img.src || '/placeholder.svg'
          }))}
        />
      ))}
    </>
  );
}