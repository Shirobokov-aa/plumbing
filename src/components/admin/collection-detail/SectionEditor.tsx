"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ImageBlockData } from "@/app/admin/contexts/SectionsContext"

interface SectionEditorProps {
  sectionType: 'sections' | 'sections2' | 'sections3' | 'sections4'
  sections: any[]
  onChange: (sections: any[]) => void
}

export default function SectionEditor({ sectionType, sections, onChange }: SectionEditorProps) {
  const handleSectionChange = (index: number, field: string, value: any) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], [field]: value }
    onChange(newSections)
  }

  const handleImageChange = (sectionIndex: number, imageIndex: number, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const newSections = [...sections]
      if (!newSections[sectionIndex].images) {
        newSections[sectionIndex].images = []
      }
      newSections[sectionIndex].images[imageIndex] = {
        src: reader.result as string,
        alt: file.name
      }
      onChange(newSections)
    }
    reader.readAsDataURL(file)
  }

  const addSection = () => {
    const newSection = {
      title: "",
      description: "",
      link: { text: "", url: "" },
      images: [],
      ...(sectionType === 'sections2' ? { titleDesc: "", descriptionDesc: "" } : {})
    }
    onChange([...sections, newSection])
  }

  const removeSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
    onChange(newSections)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {sectionType === 'sections' && 'Основные секции'}
          {sectionType === 'sections2' && 'Секции с дополнительным описанием'}
          {sectionType === 'sections3' && 'Секции с большим отступом'}
          {sectionType === 'sections4' && 'Секции с тремя изображениями'}
        </h2>
        <Button onClick={addSection}>Добавить секцию</Button>
      </div>

      {sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Секция {index + 1}</CardTitle>
              <Button variant="destructive" onClick={() => removeSection(index)}>Удалить</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Заголовок</Label>
              <Input
                value={section.title}
                onChange={(e) => handleSectionChange(index, "title", e.target.value)}
              />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea
                value={section.description}
                onChange={(e) => handleSectionChange(index, "description", e.target.value)}
              />
            </div>

            {sectionType !== 'sections4' && (
              <>
                <div>
                  <Label>Текст ссылки</Label>
                  <Input
                    value={section.link?.text || ""}
                    onChange={(e) => handleSectionChange(index, "link", { ...section.link, text: e.target.value })}
                  />
                </div>
                <div>
                  <Label>URL ссылки</Label>
                  <Input
                    value={section.link?.url || ""}
                    onChange={(e) => handleSectionChange(index, "link", { ...section.link, url: e.target.value })}
                  />
                </div>
              </>
            )}

            {sectionType === 'sections2' && (
              <>
                <div>
                  <Label>Заголовок описания</Label>
                  <Input
                    value={section.titleDesc || ""}
                    onChange={(e) => handleSectionChange(index, "titleDesc", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Дополнительное описание</Label>
                  <Textarea
                    value={section.descriptionDesc || ""}
                    onChange={(e) => handleSectionChange(index, "descriptionDesc", e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <Label>Изображения</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {Array.from({ length: sectionType === 'sections4' ? 3 : sectionType === 'sections' ? 3 : 1 }).map((_, imageIndex) => (
                  <div key={imageIndex}>
                    {section.images?.[imageIndex]?.src && (
                      <Image
                        src={section.images[imageIndex].src}
                        alt={section.images[imageIndex].alt || ""}
                        width={100}
                        height={100}
                        className="mb-2"
                      />
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleImageChange(index, imageIndex, file)
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 