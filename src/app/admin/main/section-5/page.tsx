"use client"

import { useState, useEffect } from "react"
import { useSections } from "../../contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { toast } from "sonner"

interface ImageBlockItem {
  src: string;
  alt: string;
  desc: string;
}

interface Section5Data {
  title: string;
  description: string;
  link: {
    name: string;
    url: string;
  };
  images_block: ImageBlockItem[];
}

export default function MainSection5Page() {
  const { sections, updateSection } = useSections()
  const [isLoading, setIsLoading] = useState(true)
  const [sectionData, setSectionData] = useState<Section5Data>({
    title: "",
    description: "",
    link: {
      name: "",
      url: ""
    },
    images_block: []
  })

  useEffect(() => {
    if (sections?.['section-5']) {
      setSectionData({
        title: sections['section-5'].title || "",
        description: sections['section-5'].description || "",
        link: {
          name: sections['section-5'].link?.name || "",
          url: sections['section-5'].link?.url || ""
        },
        images_block: sections['section-5'].images_block?.map(img => ({
          ...img,
          desc: img.desc || ''
        })) || []
      })
    }
    setIsLoading(false)
  }, [sections])

  const handleSave = async () => {
    try {
      await updateSection("section-5", sectionData)
      toast.success("Секция успешно обновлена")
    } catch (error) {
      console.error("Error saving section:", error)
      toast.error("Ошибка при обновлении секции")
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSectionData(prev => {
          const newImagesBlock = [...prev.images_block]
          newImagesBlock[index] = {
            ...newImagesBlock[index],
            src: reader.result as string,
            alt: file.name
          }
          return {
            ...prev,
            images_block: newImagesBlock
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const addImage = () => {
    setSectionData(prev => ({
      ...prev,
      images_block: [...prev.images_block, { src: "", alt: "", desc: "" }]
    }))
  }

  const removeImage = (index: number) => {
    setSectionData(prev => ({
      ...prev,
      images_block: prev.images_block.filter((_, i) => i !== index)
    }))
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Редактирование секции 5</h1>
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
            <label className="block mb-2">Блок изображений</label>
            <Button type="button" onClick={addImage} className="mb-4">
              Добавить изображение
            </Button>
            {sectionData.images_block.map((image, index) => (
              <div key={index} className="mb-6 p-4 border rounded">
                <div className="flex justify-between mb-2">
                  <h4>Изображение {index + 1}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                  >
                    Удалить
                  </Button>
                </div>
                {image.src && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={200}
                    className="object-cover mb-2"
                  />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                  className="mb-2"
                />
                <Input
                  placeholder="Описание"
                  value={image.desc}
                  onChange={(e) => {
                    const newImagesBlock = [...sectionData.images_block]
                    newImagesBlock[index] = { ...image, desc: e.target.value }
                    setSectionData(prev => ({ ...prev, images_block: newImagesBlock }))
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Button onClick={handleSave}>Сохранить изменения</Button>
    </div>
  )
}