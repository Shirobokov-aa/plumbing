"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

interface ImageBlockData {
  src: string
  alt: string
  desc?: string
}

interface Section {
  title?: string
  description?: string
  link?: { name: string; url: string } // url теперь всегда строка
  images_block?: ImageBlockData[]
  images?: string[]
}

interface SectionsMainPage {
  [key: string]: Section
}

export interface CollectionItem {
  id: number // Убедимся, что id имеет тип number
  image: string
  title: string
  desc: string
  link: string
  flexDirection: "xl:flex-row" | "xl:flex-row-reverse"
}

interface SectionsContextType {
  sections: SectionsMainPage
  collections: CollectionItem[]
  updateSection: (sectionKey: string, newData: Section) => void
  updateCollections: (newCollections: CollectionItem[]) => void
}

const SectionsContext = createContext<SectionsContextType | undefined>(undefined)

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<SectionsMainPage>({
    "section-1": {
      title: "Привет мир 123",
      description: "Какое то описание из объекта",
      link: { name: "Посмотреть", url: "/123123" },
      images_block: [
        { src: "/img/item01.png", alt: "Image 1", desc: "ERA" },
        { src: "/img/item02.png", alt: "Image 2", desc: "AMO" },
      ],
      images: ["/img/banner-little.png"],
    },
    "section-2": {
      images: ["/img/banner01.png"],
      link: { name: "Какая-то навигация", url: "/" },
    },
    "section-3": {
      title: "ERA",
      description: "Коллекция ERA воплощает гармонию современного дизайна и классических традиций...",
      link: { name: "Посмотреть", url: "/" },
      images: ["/img/item-era.png"],
    },
    "section-4": {
      title: "Коллекции",
      description: "Описание для коллекций",
      link: { name: "Смотреть", url: "/" },
      images_block: [
        { src: "/img/item01.png", alt: "Banner 1", desc: "ERA" },
        { src: "/img/item02.png", alt: "Banner 2", desc: "AMO" },
        { src: "/img/item03.png", alt: "Image 3", desc: "TWIST" },
        { src: "/img/item01.png", alt: "Image 1", desc: "ERA" },
      ],
    },
    "section-5": {
      title: "Какой-то заголовок",
      description: "Описание для этого блока",
      link: { name: "Посмотреть", url: "/" },
      images_block: [
        { src: "/img/item10.png", alt: "Item 10", desc: "Description 1" },
        { src: "/img/item11.png", alt: "Item 11", desc: "Description 2" },
        { src: "/img/item12.png", alt: "Item 12", desc: "Description 3" },
      ],
    },
  })

  const [collections, setCollections] = useState<CollectionItem[]>([
    {
      id: 1,
      image: "/img/item-era.png",
      title: "ERA",
      desc: "Коллекция ERA воплощает гармонию современного дизайна и классических традиций...",
      link: "/",
      flexDirection: "xl:flex-row",
    },
    {
      id: 2,
      image: "/img/item01.png",
      title: "AMO",
      desc: "Описание для коллекции AMO",
      link: "/",
      flexDirection: "xl:flex-row-reverse",
    },
    {
      id: 3,
      image: "/img/item02.png",
      title: "TWIST",
      desc: "Описание для коллекции TWIST",
      link: "/",
      flexDirection: "xl:flex-row",
    },
  ])

  const updateSection = (sectionKey: string, newData: Section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [sectionKey]: newData,
    }))
  }

  const updateCollections = (newCollections: CollectionItem[]) => {
    setCollections(newCollections)
  }

  return (
    <SectionsContext.Provider value={{ sections, collections, updateSection, updateCollections }}>
      {children}
    </SectionsContext.Provider>
  )
}

export const useSections = () => {
  const context = useContext(SectionsContext)
  if (context === undefined) {
    throw new Error("useSections must be used within a SectionsProvider")
  }
  return context
}

