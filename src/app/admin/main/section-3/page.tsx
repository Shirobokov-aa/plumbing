"use client"

import { useState, useEffect } from "react"
import { useSections } from "../../contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface Section3Data {
  title: string;
  description: string;
  link: {
    name: string;
    url: string;
  };
  images: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
}

export default function MainSection3Page() {
  const { sections, updateSection } = useSections()
  const [isLoading, setIsLoading] = useState(true)
  const [sectionData, setSectionData] = useState<Section3Data>({
    title: "",
    description: "",
    link: {
      name: "",
      url: ""
    },
    images: []
  })

  useEffect(() => {
    if (sections?.['section-3']) {
      setSectionData({
        title: sections['section-3'].title || "",
        description: sections['section-3'].description || "",
        link: {
          name: sections['section-3'].link?.name || "",
          url: sections['section-3'].link?.url || ""
        },
        images: sections['section-3'].images?.map(img => {
          if (typeof img === 'string') {
            return {
              src: img,
              alt: 'Section image',
              width: 800,
              height: 600
            }
          }
          return img
        }) || []
      })
    }
    setIsLoading(false)
  }, [sections])

  const handleSave = async () => {
    try {
      await updateSection("section-3", sectionData)
    } catch (error) {
      console.error("Error saving section:", error)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSectionData(prev => ({
          ...prev,
          images: [{
            src: reader.result as string,
            alt: file.name || 'Uploaded image',
            width: 800,
            height: 600
          }]
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Редактирование секции 3</h1>
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block mb-2">Заголовок</label>
            <Input
              value={sectionData.title}
              onChange={(e) => setSectionData(prev => ({
                ...prev,
                title: e.target.value
              }))}
            />
          </div>
          <div>
            <label className="block mb-2">Описание</label>
            <Textarea
              value={sectionData.description}
              onChange={(e) => setSectionData(prev => ({
                ...prev,
                description: e.target.value
              }))}
            />
          </div>
          <div>
            <label className="block mb-2">Ссылка - текст</label>
            <Input
              value={sectionData.link.name}
              onChange={(e) => setSectionData(prev => ({
                ...prev,
                link: { ...prev.link, name: e.target.value }
              }))}
            />
          </div>
          <div>
            <label className="block mb-2">Ссылка - URL</label>
            <Input
              value={sectionData.link.url}
              onChange={(e) => setSectionData(prev => ({
                ...prev,
                link: { ...prev.link, url: e.target.value }
              }))}
            />
          </div>
          <div>
            <label className="block mb-2">Изображение</label>
            {sectionData.images?.[0]?.src && (
              <div className="mb-4">
                <Image
                  src={sectionData.images[0].src}
                  alt={sectionData.images[0].alt || 'Section image'}
                  width={sectionData.images[0].width || 800}
                  height={sectionData.images[0].height || 600}
                  className="object-cover"
                />
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4"
            />
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleSave}>Сохранить изменения</Button>
    </div>
  )
}

