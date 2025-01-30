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
  link?: { name: string; url: string }
  images_block?: ImageBlockData[]
  images?: string[]
}

interface SectionsMainPage {
  [key: string]: Section
}

interface SectionsContextType {
  sections: SectionsMainPage
  updateSection: (sectionKey: string, newData: Section) => void
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

  const updateSection = (sectionKey: string, newData: Section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [sectionKey]: newData,
    }))
  }

  return <SectionsContext.Provider value={{ sections, updateSection }}>{children}</SectionsContext.Provider>
}

export const useSections = () => {
  const context = useContext(SectionsContext)
  if (context === undefined) {
    throw new Error("useSections must be used within a SectionsProvider")
  }
  return context
}

