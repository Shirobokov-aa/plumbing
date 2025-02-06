// "use client"

// import { useState } from "react"
// import { useSections } from "../contexts/SectionsContext"
// import { Button } from "@/components/ui/button"

// export default function BathroomAdminPage() {
//   const { bathroomPage, updateBathroomPage } = useSections()
//   const [localBathroomPage] = useState(bathroomPage)

//   const handleSave = () => {
//     updateBathroomPage(localBathroomPage)
//      await fetchCollections()
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Настройки страницы Ванная</h1>
//       <p>Используйте эту страницу для управления общими настройками страницы Ванная.</p>
//       <Button onClick={handleSave}>Сохранить изменения</Button>
//     </div>
//   )
// }

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useSections } from "../contexts/SectionsContext"

// const BathroomPage = ({ initialBathroomPage }: { initialBathroomPage: any }) => {
//   const { updateBathroomPage } = useSections()
//   const [localBathroomPage, setLocalBathroomPage] = useState(initialBathroomPage)
//   const router = useRouter()

//   const handleSave = async () => {
//     try {
//       await updateBathroomPage(localBathroomPage)
//       console.log("Bathroom page updated successfully")
//       // Здесь можно добавить уведомление пользователю об успешном обновлении
//     } catch (error) {
//       console.error("Error updating bathroom page:", error)
//       // Здесь можно добавить уведомление пользователю об ошибке
//     }
//   }

//   // ... other functions and state variables ...

//   return (
//     <div>
//       {/* Form to edit bathroom page */}
//       {/* ... input fields to update localBathroomPage ... */}
//       <button onClick={handleSave}>Save</button>
//     </div>
//   )
// }

// export default BathroomPage


"use client"

import { useState } from "react"
import { useSections } from "../contexts/SectionsContext"
import { Button } from "@/components/ui/button"

export default function BathroomAdminPage() {
  const { bathroomPage, updateBathroomPage } = useSections()
  const [editedData, setEditedData] = useState(bathroomPage)

  const handleSave = async () => {
    try {
      await updateBathroomPage(editedData)
      // Показать уведомление об успешном сохранении
    } catch (error) {
      console.error("Error saving bathroom page:", error)
      // Показать уведомление об ошибке
    }
  }

  // Добавьте здесь компоненты для редактирования данных
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Настройки страницы Ванная</h1>
      {/* Добавьте формы редактирования */}
      <Button onClick={handleSave}>Сохранить изменения</Button>
    </div>
  )
}

