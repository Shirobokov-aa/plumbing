"use client"

import { useState, useEffect } from "react"
import { useSections } from "../../contexts/SectionsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function AboutBannerAdminPage() {
  const { aboutPage, updateAboutPage } = useSections()
  const [banner, setBanner] = useState<any>(null)

  useEffect(() => {
    if (aboutPage?.banner) {
      setBanner(aboutPage.banner)
    }
  }, [aboutPage])

  if (!banner) {
    return <div>Loading...</div>
  }

  const handleSave = async () => {
    if (!aboutPage) return
    try {
      await updateAboutPage({
        ...aboutPage,
        banner: banner
      })
    } catch (error) {
      console.error('Error updating banner:', error)
    }
  }

  const handleChange = (field: string, value: string) => {
    setBanner((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleLinkChange = (field: string, value: string) => {
    setBanner((prev: any) => ({
      ...prev,
      link: { ...prev.link, [field]: value }
    }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Редактирование баннера О компании</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Название</Label>
          <Input 
            id="name" 
            value={banner.name} 
            onChange={(e) => handleChange("name", e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="title">Заголовок</Label>
          <Input 
            id="title" 
            value={banner.title} 
            onChange={(e) => handleChange("title", e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            value={banner.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="linkText">Текст ссылки</Label>
          <Input 
            id="linkText" 
            value={banner.link.text} 
            onChange={(e) => handleLinkChange("text", e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="linkUrl">URL ссылки</Label>
          <Input 
            id="linkUrl" 
            value={banner.link.url} 
            onChange={(e) => handleLinkChange("url", e.target.value)} 
          />
        </div>
        <div>
          <Label>Изображение баннера</Label>
          <Image 
            src={banner.image || "/placeholder.svg"} 
            alt="Banner" 
            width={300} 
            height={150} 
            className="mt-2" 
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  handleChange("image", reader.result as string)
                }
                reader.readAsDataURL(file)
              }
            }}
            className="mt-2"
          />
        </div>
      </div>
      <Button onClick={handleSave}>Сохранить изменения</Button>
    </div>
  )
}

