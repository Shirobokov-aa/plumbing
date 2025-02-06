"use client"

import { useState, useEffect } from "react"
import { useSections } from "../../contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface Section1Data {
  title: string;
  description: string;
  link: {
    name: string;
    url: string;
  };
  images: Array<{
    src: string;
    alt: string;
  }>;
}

export default function MainSection1Page() {
  const { sections, updateSection } = useSections()
  const [isLoading, setIsLoading] = useState(true)
  const [sectionData, setSectionData] = useState<Section1Data>({
    title: "",
    description: "",
    link: {
      name: "",
      url: ""
    },
    images: []
  })

  useEffect(() => {
    if (sections?.section1) {
      setSectionData({
        title: sections.section1.title || "",
        description: sections.section1.description || "",
        link: {
          name: sections.section1.link?.name || "",
          url: sections.section1.link?.url || ""
        },
        images: sections.section1.images?.map((img: string | { src: string; alt: string }) => ({
          src: typeof img === 'string' ? img : img.src,
          alt: typeof img === 'string' ? '' : img.alt
        })) || []
      })
    }
    setIsLoading(false)
  }, [sections])

  const handleSave = async () => {
    try {
      await updateSection("section1", sectionData)
    } catch (error) {
      console.error("Error saving section:", error)
    }
  }

  const handleChange = (field: keyof Section1Data, value: any) => {
    setSectionData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLinkChange = (field: 'name' | 'url', value: string) => {
    setSectionData(prev => ({
      ...prev,
      link: {
        name: prev.link?.name || '',
        url: prev.link?.url || '',
        [field]: value
      }
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSectionData(prev => ({
          ...prev,
          images: [...(prev.images || []), {
            src: reader.result as string,
            alt: file.name
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
      <h1 className="text-3xl font-bold">Редактирование секции 1</h1>
      <Card>
        <CardHeader>
          <CardTitle>Основная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block mb-2">Заголовок</label>
            <Input
              value={sectionData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2">Описание</label>
            <Textarea
              value={sectionData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2">Ссылка - текст</label>
            <Input
              value={sectionData.link?.name}
              onChange={(e) => handleLinkChange("name", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2">Ссылка - URL</label>
            <Input
              value={sectionData.link?.url}
              onChange={(e) => handleLinkChange("url", e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2">Изображения</label>
            <div className="grid grid-cols-3 gap-4">
              {sectionData.images?.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
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