"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSections } from "@/app/admin/contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CollectionItem, CollectionDetailItem } from "@/app/admin/contexts/SectionsContext"

export default function EditCollectionPage() {
  const params = useParams()
  const id = params?.id ? Number(params.id) : null
  const router = useRouter()
  const { collections, collectionDetails, updateCollections, updateCollectionDetails } = useSections()
  const [collection, setCollection] = useState<CollectionItem | null>(null)
  const [collectionDetail, setCollectionDetail] = useState<CollectionDetailItem | null>(null)

  useEffect(() => {
    if (id !== null) {
      const foundCollection = collections.find((c) => c.id === id)
      const foundCollectionDetail = collectionDetails.find((c) => c.id === id)
      if (foundCollection) {
        setCollection(foundCollection)
      }
      if (foundCollectionDetail) {
        setCollectionDetail(foundCollectionDetail)
      }
      if (!foundCollection && !foundCollectionDetail) {
        console.error("Коллекция не найдена")
        router.push("/admin/collections")
      }
    }
  }, [id, collections, collectionDetails, router])

  const handleSave = async () => {
    if (collection && collectionDetail) {
      try {
        const updatedCollections = collections.map((c) => 
          c.id === collection.id ? collection : c
        );
        const updatedCollectionDetails = collectionDetails.map((c) =>
          c.id === collectionDetail.id ? collectionDetail : c
        );

        await Promise.all([
          updateCollections(updatedCollections, true),
          updateCollectionDetails(updatedCollectionDetails, true),
        ]);

        router.push("/admin/collections");
      } catch (error) {
        console.error("Ошибка при обновлении коллекции:", error);
      }
    }
  };

  const handleChange = (field: keyof CollectionItem, value: string) => {
    setCollection((prev) => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
  }

  const handleDetailChange = (field: keyof CollectionDetailItem, value: any) => {
    setCollectionDetail((prev) => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCollection((prev) => {
          if (!prev) return prev
          return { ...prev, image: reader.result as string }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  if (!collection || !collectionDetail) {
    return <div className="text-center py-10">Загрузка...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Редактирование коллекции: {collection.title}</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Редактирование коллекции</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Заголовок</Label>
            <Input id="title" value={collection.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="desc">Описание</Label>
            <Textarea id="desc" value={collection.desc} onChange={(e) => handleChange("desc", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="link">Ссылка</Label>
            <Input id="link" value={collection.link} onChange={(e) => handleChange("link", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="flexDirection">Направление flex</Label>
            <Select
              onValueChange={(value) => handleChange("flexDirection", value as "xl:flex-row" | "xl:flex-row-reverse")}
              defaultValue={collection.flexDirection}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите направление" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xl:flex-row">Слева направо</SelectItem>
                <SelectItem value="xl:flex-row-reverse">Справа налево</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Изображение</Label>
            <div className="space-y-2">
              <Image
                width={300}
                height={300}
                src={collection.image || "/placeholder.svg"}
                alt={collection.title}
                className="w-full h-40 object-contain"
              />
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          {collectionDetail && (
            <>
              <div>
                <Label htmlFor="detailName">Название (детально)</Label>
                <Input
                  id="detailName"
                  value={collectionDetail.name}
                  onChange={(e) => handleDetailChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bannerTitle">Заголовок баннера</Label>
                <Input
                  id="bannerTitle"
                  value={collectionDetail.banner ? collectionDetail.banner.title : ""} // Проверка на наличие banner
                  onChange={(e) => handleDetailChange("banner", { ...collectionDetail.banner, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="bannerDescription">Описание баннера</Label>
                <Textarea
                  id="bannerDescription"
                  value={collectionDetail.banner ? collectionDetail.banner.description : ""} // Проверка на наличие banner
                  onChange={(e) =>
                    handleDetailChange("banner", { ...collectionDetail.banner, description: e.target.value })
                  }
                />
              </div>
              {/* Добавьте поля для редактирования sections, sections2, sections3 и sections4 */}
            </>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Button onClick={handleSave}>Сохранить изменения</Button>
      </div>
    </div>
  )
}

