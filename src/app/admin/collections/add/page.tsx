"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCollection } from "@/app/actions/collections/db"
import SectionEditor from "@/app/admin/collection-details/SectionEditor"
import type { CollectionItem, CollectionDetail } from "@/app/types/collections"

export default function AddCollectionPage() {
  const router = useRouter()
  const [collectionId, setCollectionId] = useState("")

  const [newCollection, setNewCollection] = useState<CollectionItem>({
    title: "",
    desc: "",
    image: "",
    link: "",
    flexDirection: "xl:flex-row"
  })

  const [newCollectionDetail, setNewCollectionDetail] = useState<CollectionDetail>({
    id: 0,
    name: "",
    banner: {
      title: "",
      description: "",
      image: null,
      link: { text: "", url: "" }
    },
    sections: [],
    sections2: [],
    sections3: [],
    sections4: []
  })

  const handleChange = (field: keyof CollectionItem, value: string) => {
    setNewCollection(prev => ({ ...prev, [field]: value }))
  }

  const handleDetailChange = (field: keyof CollectionDetail | "banner", value: any) => {
    setNewCollectionDetail(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      // Здесь должна быть логика загрузки изображения
      // После загрузки обновите newCollection.image
    }
  }

  const handleSave = async () => {
    try {
      await createCollection({
        id: parseInt(collectionId),
        ...newCollection,
        detail: newCollectionDetail
      })
      router.push('/admin/collections')
      router.refresh()
    } catch (error) {
      console.error('Error adding collection:', error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Добавление новой коллекции (превью на общей странице)</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Новая коллекция</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="collectionId">ID коллекции</Label>
            <Input
              id="collectionId"
              type="number"
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              placeholder="Введите ID коллекции"
              required
            />
          </div>
          <div>
            <Label htmlFor="title">Заголовок</Label>
            <Input id="title" value={newCollection.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="desc">Описание</Label>
            <Textarea id="desc" value={newCollection.desc} onChange={(e) => handleChange("desc", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="link">Ссылка</Label>
            <Input id="link" value={newCollection.link} onChange={(e) => handleChange("link", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="flexDirection">Направление flex</Label>
            <Select
              onValueChange={(value) => handleChange("flexDirection", value as "xl:flex-row" | "xl:flex-row-reverse")}
              defaultValue={newCollection.flexDirection}
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
              {newCollection.image && (
                <Image
                  width={300}
                  height={300}
                  src={newCollection.image || "/placeholder.svg"}
                  alt="Предпросмотр"
                  className="w-full h-40 object-contain"
                />
              )}
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          <div>
            <Label htmlFor="detailName">Название (детально)</Label>
            <Input
              id="detailName"
              value={newCollectionDetail.name}
              onChange={(e) => handleDetailChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bannerTitle">Заголовок баннера</Label>
            <Input
              id="bannerTitle"
              value={newCollectionDetail.banner.title}
              onChange={(e) => handleDetailChange("banner", { ...newCollectionDetail.banner, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bannerDescription">Описание баннера</Label>
            <Textarea
              id="bannerDescription"
              value={newCollectionDetail.banner.description}
              onChange={(e) =>
                handleDetailChange("banner", { ...newCollectionDetail.banner, description: e.target.value })
              }
            />
          </div>
          <SectionEditor
            sectionType="sections"
            sections={newCollectionDetail.sections}
            onChange={(newSections) => handleDetailChange("sections", newSections)}
          />
          <SectionEditor
            sectionType="sections2"
            sections={newCollectionDetail.sections2}
            onChange={(newSections) => handleDetailChange("sections2", newSections)}
          />
          <SectionEditor
            sectionType="sections3"
            sections={newCollectionDetail.sections3}
            onChange={(newSections) => handleDetailChange("sections3", newSections)}
          />
          <SectionEditor
            sectionType="sections4"
            sections={newCollectionDetail.sections4}
            onChange={(newSections) => handleDetailChange("sections4", newSections)}
          />
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Button onClick={handleSave}>Добавить коллекцию</Button>
      </div>
    </div>
  )
}

