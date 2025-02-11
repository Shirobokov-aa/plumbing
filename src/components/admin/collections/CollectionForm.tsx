"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { uploadFile } from "@/app/actions/upload/files"
import { addCollection } from "@/app/actions/collections/db"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  id: z.number().min(1, "ID обязателен"),
  title: z.string().min(2, "Минимум 2 символа"),
  desc: z.string().min(10, "Минимум 10 символов"),
  image: z.string(),
  link: z.string(),
  flexDirection: z.enum(["xl:flex-row", "xl:flex-row-reverse"]),
})

export function CollectionForm() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flexDirection: "xl:flex-row",
    },
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadFile(formData)
    if (result.success) {
      setImageUrl(result.url)
      form.setValue('image', result.url)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addCollection({
        ...values,
        link: `/collections/${values.title.toLowerCase()}`,
      })
      router.push('/admin/collections')
      router.refresh()
    } catch (error) {
      console.error('Ошибка при сохранении:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Добавить коллекцию</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="id">ID</Label>
            <Input type="number" {...form.register("id", { valueAsNumber: true })} />
          </div>

          <div>
            <Label htmlFor="title">Название</Label>
            <Input {...form.register("title")} />
          </div>

          <div>
            <Label htmlFor="desc">Описание</Label>
            <Textarea {...form.register("desc")} />
          </div>

          <div>
            <Label htmlFor="image">Изображение</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 max-w-[200px]"
              />
            )}
          </div>

          <div>
            <Label htmlFor="flexDirection">Направление</Label>
            <Select onValueChange={(value) => form.setValue("flexDirection", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите направление" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xl:flex-row">Слева направо</SelectItem>
                <SelectItem value="xl:flex-row-reverse">Справа налево</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit">Сохранить</Button>
        </form>
      </CardContent>
    </Card>
  )
}
