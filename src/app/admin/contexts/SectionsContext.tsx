"use client";

import { createContext, useContext, useState } from "react"
import { Alert } from "@/components/ui/alert"
import { updateSections } from '@/app/actions/sections/db'
import { updateCollections as updateCollectionsAction, getCollections } from '@/app/actions/collections/db'
import { updateBathroomPage } from '@/app/actions/bathroom/db'
import { updateKitchenPage } from '@/app/actions/kitchen/db'
import { updateAboutPage } from '@/app/actions/about/db'
import { updateCollectionDetails } from '@/app/actions/collection-details/db'
import type { SectionsData } from '@/app/types/sections'
import type { CollectionItem, CollectionDetail } from '@/app/types/collections'
import type { BathroomPage, KitchenPage, AboutPage } from "@/app/types/pages"
import type { AlertType } from "@/app/types/alert"

export interface ImageBlockData {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
  width?: number;
  height?: number;
}

interface SectionsContextType {
  sections: SectionsData;
  collections: CollectionItem[];
  collectionDetails: CollectionDetail[];
  bathroomPage: BathroomPage | null;
  kitchenPage: KitchenPage | null;
  aboutPage: AboutPage | null;

  updateSection: (sectionName: string, data: SectionsData[keyof SectionsData]) => Promise<void>;
  updateCollections: (data: CollectionItem[]) => Promise<void>;
  updateCollectionDetail: (id: number, data: CollectionDetail) => Promise<void>;
  updateBathroomPage: (newData: BathroomPage) => Promise<void>;
  updateKitchenPage: (newData: KitchenPage) => Promise<void>;
  updateAboutPage: (newData: AboutPage) => Promise<void>;
  updateSections: (data: SectionsData) => Promise<void>;
}

const SectionsContext = createContext<SectionsContextType | undefined>(undefined)

interface SectionsProviderProps {
  children: React.ReactNode;
  initialData: {
    collections: CollectionItem[];
    sections: SectionsData;
  };
}

export function SectionsProvider({ children, initialData }: SectionsProviderProps) {
  const [collections, setCollections] = useState<CollectionItem[]>(initialData.collections)
  const [sections, setSections] = useState<SectionsData>(initialData.sections)
  const [alert, setAlert] = useState<AlertType | null>(null)
  const [bathroomPage, setBathroomPage] = useState<BathroomPage | null>(null)
  const [kitchenPage, setKitchenPage] = useState<KitchenPage | null>(null)
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null)
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetail[]>([])

  const loadCollections = async () => {
    const data = await getCollections()
    setCollections(data)
  }

  if (collections.length === 0) {
    loadCollections()
  }

  const updateSection = async (sectionName: string, data: SectionsData[keyof SectionsData]) => {
    try {
      const updatedSections = { ...sections, [sectionName]: data }
      await updateSections(updatedSections)
      setSections(updatedSections)
      setAlert({ type: 'success', message: 'Секция успешно обновлена' })
    } catch (error) {
      console.error('Ошибка при обновлении секции:', error)
      setAlert({ type: 'error', message: 'Ошибка при обновлении секции' })
    }
  }

  const updateCollections = async (newCollections: CollectionItem[]) => {
    try {
      await updateCollectionsAction(newCollections)
      setCollections(newCollections)
      setAlert({ type: 'success', message: 'Коллекции успешно обновлены' })
    } catch (error) {
      console.error('Error updating collections:', error)
      setAlert({ type: 'error', message: 'Ошибка при обновлении коллекций' })
      throw error
    }
  }

  const updateBathroomPageData = async (newData: BathroomPage) => {
    try {
      await updateBathroomPage(newData)
      setBathroomPage(newData)
      setAlert({ type: 'success', message: 'Страница ванной успешно обновлена' })
    } catch (error) {
      console.error('Ошибка при обновлении:', error)
      setAlert({ type: 'error', message: 'Ошибка при обновлении страницы' })
    }
  }

  const updateKitchenPageData = async (newData: KitchenPage) => {
    try {
      await updateKitchenPage(newData)
      setKitchenPage(newData)
      setAlert({ type: 'success', message: 'Страница кухни успешно обновлена' })
    } catch (error) {
      console.error('Ошибка при обновлении:', error)
      setAlert({ type: 'error', message: 'Ошибка при обновлении страницы' })
    }
  }

  const updateAboutPageData = async (newData: AboutPage) => {
    try {
      await updateAboutPage(newData)
      setAboutPage(newData)
      setAlert({ type: 'success', message: 'Страница О компании успешно обновлена' })
    } catch (error) {
      console.error('Ошибка при обновлении:', error)
      setAlert({ type: 'error', message: 'Ошибка при обновлении страницы' })
    }
  }

  const updateCollectionDetail = async (id: number, data: CollectionDetail) => {
    try {
      const updatedDetails = collectionDetails.map(detail =>
        detail.id === id ? data : detail
      )
      await updateCollectionDetails(updatedDetails)
      setCollectionDetails(updatedDetails)
    } catch (error) {
      console.error('Error updating collection detail:', error)
      throw error
    }
  }

  return (
    <SectionsContext.Provider
      value={{
        sections,
        collections,
        collectionDetails,
        bathroomPage,
        kitchenPage,
        aboutPage,
        updateSection,
        updateCollections: async (newData) => {
          try {
            await updateCollections(newData)
            setCollections(newData)
            setAlert({ type: 'success', message: 'Коллекции обновлены' })
          } catch (err) {
            console.error('Ошибка при обновлении коллекций:', err)
            setAlert({ type: 'error', message: 'Ошибка при обновлении коллекций' })
          }
        },
        updateCollectionDetail,
        updateBathroomPage: updateBathroomPageData,
        updateKitchenPage: updateKitchenPageData,
        updateAboutPage: updateAboutPageData,
        updateSections: async (newData) => {
          try {
            await updateSections(newData)
            setSections(newData)
            setAlert({ type: 'success', message: 'Секции обновлены' })
          } catch (err) {
            console.error('Ошибка при обновлении секций:', err)
            setAlert({ type: 'error', message: 'Ошибка при обновлении секций' })
          }
        }
      }}
    >
      {alert && <Alert message={alert.message} type={alert.type} />}
      {children}
    </SectionsContext.Provider>
  )
}

export const useSections = () => {
  const context = useContext(SectionsContext)
  if (!context) throw new Error("useSections must be used within SectionsProvider")
  return context
}
