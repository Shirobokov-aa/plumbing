import type React from "react"
import { Sidebar } from "./components/sidebar"
import { SectionsProvider } from "./contexts/SectionsContext"
import { getCollections } from "@/app/actions/collections/db"
import { getSections } from "@/app/actions/sections/db"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Загружаем все необходимые данные для админки
  const [collections, sections] = await Promise.all([
    getCollections(),
    getSections()
  ])

  return (
    <SectionsProvider initialData={{ collections, sections }}>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </SectionsProvider>
  )
}

