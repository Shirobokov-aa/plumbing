"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSections } from "@/app/admin/contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import SectionEditor from "@/components/admin/collection-detail/SectionEditor"
import type { CollectionDetail, Section, ImageData, Collection } from "@/app/types/collections"
import { getCollectionById, updateCollection } from "@/app/actions/collections/db"

export default function EditCollectionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { collectionDetails = [], updateCollectionDetail } = useSections()
  const [collection, setCollection] = useState<Collection | null>(null)

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const data = await getCollectionById(parseInt(params.id))
        setCollection(data)
      } catch (error) {
        console.error('Error fetching collection:', error)
      }
    }

    fetchCollection()
  }, [params.id])

  const foundCollectionDetail = collectionDetails.find(
    (detail) => detail.id === parseInt(params.id)
  )

  const [collectionDetail, setCollectionDetail] = useState<CollectionDetail | null>(foundCollectionDetail || null)

  if (!collection) {
    return <div className="p-6">Загрузка...</div>
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

  const handleDetailChange = (sectionType: string, newSections: Section[]) => {
    setCollectionDetail((prev) => ({
      ...prev!,
      [sectionType]: newSections,
    }))
  }

  const handleSave = async () => {
    try {
      if (!collectionDetail) return;

      console.log('Saving collection:', collectionDetail); // Для отладки

      const response = await updateCollectionDetail(parseInt(params.id), {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!collection) return
      await updateCollection(parseInt(params.id), collection)
      router.push('/admin/collections')
      router.refresh()
    } catch (error) {
      console.error('Error updating collection:', error)
    }
  }

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-6">Редактировать коллекцию</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="name">Название коллекции</Label>
          <Input
            id="name"
            value={collection.name}
            onChange={(e) => setCollection(prev => ({ ...prev!, name: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            value={collection.description}
            onChange={(e) => setCollection(prev => ({ ...prev!, description: e.target.value }))}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Сохранить</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/collections')}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  )
}

