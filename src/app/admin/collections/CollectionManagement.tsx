// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { useSections } from "../contexts/SectionsContext"
// import Image from "next/image"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import type { CollectionItem } from "../contexts/SectionsContext"

// export default function CollectionManagement() {
//   const params = useParams()
//   const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null
//   const { collections, updateCollections } = useSections()
//   const [collection, setCollection] = useState<CollectionItem>({
//     id: 0,
//     title: "",
//     desc: "",
//     link: "",
//     image: "",
//     flexDirection: "xl:flex-row",
//   })
//   const [isNewCollection, setIsNewCollection] = useState(true)

//   useEffect(() => {
//     if (id) {
//       const existingCollection = collections.find((c) => c.id === Number(id))
//       if (existingCollection) {
//         setCollection(existingCollection)
//         setIsNewCollection(false)
//       }
//     }
//   }, [id, collections])

//   const handleSave = async () => {
//     try {
//       let updatedCollections: CollectionItem[]
//       if (isNewCollection) {
//         updatedCollections = [...collections, { ...collection, id: collections.length + 1 }]
//       } else {
//         updatedCollections = collections.map((c) => (c.id === collection.id ? collection : c))
//       }
//       await updateCollections(updatedCollections)
//       console.log(isNewCollection ? "Новая коллекция добавлена:" : "Коллекция обновлена:", collection)
//       // Здесь можно добавить логику для перенаправления пользователя или очистки формы
//     } catch (error) {
//       console.error("Ошибка при сохранении коллекции:", error)
//       // Здесь можно добавить обработку ошибок, например, показать уведомление пользователю
//     }
//   }

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setCollection((prev) => ({
//           ...prev,
//           image: reader.result as string,
//         }))
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleChange = (field: keyof CollectionItem, value: string) => {
//     setCollection((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">
//         {isNewCollection ? "Добавление новой коллекции" : "Редактирование коллекции"}
//       </h1>
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle>{isNewCollection ? "Новая коллекция" : `Редактирование: ${collection.title}`}</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label htmlFor="title">Заголовок</Label>
//             <Input id="title" value={collection.title} onChange={(e) => handleChange("title", e.target.value)} />
//           </div>
//           <div>
//             <Label htmlFor="desc">Описание</Label>
//             <Textarea id="desc" value={collection.desc} onChange={(e) => handleChange("desc", e.target.value)} />
//           </div>
//           <div>
//             <Label htmlFor="link">Ссылка</Label>
//             <Input id="link" value={collection.link} onChange={(e) => handleChange("link", e.target.value)} />
//           </div>
//           <div>
//             <Label htmlFor="flexDirection">Направление flex</Label>
//             <Select
//               onValueChange={(value) => handleChange("flexDirection", value as "xl:flex-row" | "xl:flex-row-reverse")}
//               defaultValue={collection.flexDirection}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Выберите направление" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="xl:flex-row">Слева направо</SelectItem>
//                 <SelectItem value="xl:flex-row-reverse">Справа налево</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <Label>Изображение</Label>
//             <div className="space-y-2">
//               {collection.image && (
//                 <Image
//                   width={300}
//                   height={300}
//                   src={collection.image || "/placeholder.svg"}
//                   alt="Предпросмотр"
//                   className="w-full h-40 object-contain"
//                 />
//               )}
//               <Input type="file" accept="image/*" onChange={handleImageUpload} />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex justify-center">
//         <Button onClick={handleSave}>{isNewCollection ? "Добавить коллекцию" : "Сохранить изменения"}</Button>
//       </div>
//     </div>
//   )
// }

