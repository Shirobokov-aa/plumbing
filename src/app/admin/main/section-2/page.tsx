"use client"

import { useState, useEffect } from "react"
import { useSections } from "../../contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface Section2Data {
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

export default function MainSection2Page() {
  const { sections, updateSection } = useSections()
  const [isLoading, setIsLoading] = useState(true)
  const [sectionData, setSectionData] = useState<Section2Data>({
    link: {
      name: "",
      url: ""
    },
    images: []
  })

  useEffect(() => {
    if (sections?.['section-2']) {
      setSectionData({
        link: {
          name: sections['section-2'].link?.name || "",
          url: sections['section-2'].link?.url || ""
        },
        images: sections['section-2'].images || []
      })
    }
    setIsLoading(false)
  }, [sections])

  const handleSave = async () => {
    try {
      await updateSection("section-2", sectionData)
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
      <h1 className="text-3xl font-bold">Редактирование секции 2</h1>
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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


