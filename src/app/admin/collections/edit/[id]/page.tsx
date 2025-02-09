"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import { useSections } from "@/app/admin/contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import SectionEditor from "@/components/admin/collection-detail/SectionEditor"

interface CollectionDetail {
  id: number;
  name: string;
  banner: {
    title: string;
    description: string;
    image: string | null;
    link?: { text: string; url: string };
  };
  sections: any[];
  sections2: any[];
  sections3: any[];
  sections4: any[];
}

interface ImageData {
  src?: string;
  alt?: string;
  desc?: string;
  url?: string;
}

export default function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { collections = [], collectionDetails = [], updateCollectionDetail } = useSections()
  const [collectionDetail, setCollectionDetail] = useState<CollectionDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const resolvedParams = use(params)

  useEffect(() => {
    if (!collectionDetails || collectionDetails.length === 0) {
      return; // Ждем загрузки данных
    }

    const foundCollectionDetail = collectionDetails.find(
      (detail) => detail.id === parseInt(resolvedParams.id)
    )

    if (foundCollectionDetail) {
      setCollectionDetail(foundCollectionDetail as CollectionDetail)
    } else {
      console.error("Коллекция не найдена")
    }
    setIsLoading(false)
  }, [resolvedParams.id, collections, collectionDetails])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!collectionDetail) {
    return <div>Коллекция не найдена</div>
  }

  const handleBannerChange = (field: string, value: string) => {
    setCollectionDetail((prev) => ({
      ...prev!,
      banner: {
        ...prev!.banner,
        [field]: value,
      },
    }))
  }

  const handleLinkChange = (field: string, value: string) => {
    setCollectionDetail((prev) => ({
      ...prev!,
      banner: {
        ...prev!.banner,
        link: {
          text: prev?.banner?.link?.text || "",
          url: prev?.banner?.link?.url || "",
          [field]: value,
        },
      },
    }))
  }

  const handleDetailChange = (sectionType: string, newSections: any[]) => {
    setCollectionDetail((prev) => ({
      ...prev!,
      [sectionType]: newSections,
    }))
  }

  const handleSave = async () => {
    try {
      if (!collectionDetail) return;
      
      console.log('Saving collection:', collectionDetail); // Для отладки

      const response = await updateCollectionDetail(parseInt(resolvedParams.id), {
        ...collectionDetail,
        banner: {
          ...collectionDetail.banner,
          image: collectionDetail.banner.image || null,
        },
        sections: collectionDetail.sections.map(section => ({
          ...section,
          image: section.image || null,
          images: (section.images || []).map((img: ImageData) => ({
            ...img,
            src: img.src || null
          }))
        })),
        sections2: collectionDetail.sections2.map(section => ({
          ...section,
          image: section.image || null,
          images: (section.images || []).map((img: ImageData) => ({
            ...img,
            src: img.src || null
          }))
        })),
        sections3: collectionDetail.sections3.map(section => ({
          ...section,
          image: section.image || null,
          images: (section.images || []).map((img: ImageData) => ({
            ...img,
            src: img.src || null
          }))
        })),
        sections4: collectionDetail.sections4.map(section => ({
          ...section,
          image: section.image || null,
          images: (section.images || []).map((img: ImageData) => ({
            ...img,
            src: img.src || null
          }))
        }))
      });

      console.log('Save response:', response); // Для отладки
      router.push('/admin/collections');
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('Ошибка при сохранении коллекции. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Редактирование коллекции {collectionDetail.name}</h1>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Основная информация</h2>
        <div className="space-y-4">
          <div>
            <Label>Детальное название</Label>
            <Input
              value={collectionDetail.name}
              onChange={(e) => setCollectionDetail(prev => ({
                ...prev!,
                name: e.target.value
              }))}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Баннер</h2>
        <div className="space-y-4">
          <div>
            <Label>Заголовок</Label>
            <Input
              value={collectionDetail.banner.title}
              onChange={(e) => handleBannerChange("title", e.target.value)}
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea
              value={collectionDetail.banner.description}
              onChange={(e) => handleBannerChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label>Изображение баннера</Label>
            {collectionDetail.banner.image && (
              <Image
                src={collectionDetail.banner.image}
                alt="Banner"
                width={300}
                height={150}
                className="mt-2"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    handleBannerChange("image", reader.result as string)
                  }
                  reader.readAsDataURL(file)
                }
              }}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Текст ссылки</Label>
            <Input
              value={collectionDetail.banner.link?.text}
              onChange={(e) => handleLinkChange("text", e.target.value)}
            />
          </div>
          <div>
            <Label>URL ссылки</Label>
            <Input
              value={collectionDetail.banner.link?.url}
              onChange={(e) => handleLinkChange("url", e.target.value)}
            />
          </div>
        </div>
      </div>

      <SectionEditor
        sectionType="sections"
        sections={collectionDetail.sections}
        onChange={(newSections) => handleDetailChange("sections", newSections)}
      />

      <SectionEditor
        sectionType="sections2"
        sections={collectionDetail.sections2}
        onChange={(newSections) => handleDetailChange("sections2", newSections)}
      />

      <SectionEditor
        sectionType="sections3"
        sections={collectionDetail.sections3}
        onChange={(newSections) => handleDetailChange("sections3", newSections)}
      />

      <SectionEditor
        sectionType="sections4"
        sections={collectionDetail.sections4}
        onChange={(newSections) => handleDetailChange("sections4", newSections)}
      />

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.push("/admin/collections")}>
          Отмена
        </Button>
        <Button onClick={handleSave}>Сохранить изменения</Button>
      </div>
    </div>
  )
}

