"use client";

import { createContext, useContext, useState } from "react"
import { Alert } from "@/components/ui/alert"
import { updateSections } from '@/app/actions/sections/db'
import { updateCollections as updateCollectionsAction } from '@/app/actions/collections/db'
import { updateBathroomPage } from '@/app/actions/bathroom/db'
import { updateKitchenPage } from '@/app/actions/kitchen/db'
import { updateAboutPage } from '@/app/actions/about/db'
import { updateCollectionDetails } from '@/app/actions/collection-details/db'
import type { SectionsData } from '@/app/types/sections'
import type { CollectionItem, CollectionDetail } from '@/app/types/collections'
import type { BathroomPage, KitchenPage, AboutPage } from "@/app/types/pages"

export interface ImageBlockData {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
  width?: number;
  height?: number;
}

interface AlertType {
  message: string;
  type: 'success' | 'error';
}

interface SectionsContextType {
  sections: SectionsData;
  collections: CollectionItem[];
  collectionDetails: CollectionDetail[];
  bathroomPage: BathroomPage | null;
  kitchenPage: KitchenPage | null;
  aboutPage: AboutPage | null;

  updateSection: (sectionName: string, data: SectionsData[keyof SectionsData]) => Promise<void>;
  updateCollections: (newCollections: CollectionItem[]) => Promise<void>;
  updateCollectionDetail: (id: number, data: CollectionDetail) => Promise<void>;
  updateBathroomPage: (newData: BathroomPage) => Promise<void>;
  updateKitchenPage: (newData: KitchenPage) => Promise<void>;
  updateAboutPage: (newData: AboutPage) => Promise<void>;
}

export const SectionsContext = createContext<SectionsContextType | null>(null)

export const SectionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [sections, setSections] = useState<SectionsData>({})
  const [collections, setCollections] = useState<CollectionItem[]>([])
  const [alert, setAlert] = useState<AlertType | null>(null)
  const [bathroomPage, setBathroomPage] = useState<BathroomPage | null>(null)
  const [kitchenPage, setKitchenPage] = useState<KitchenPage | null>(null)
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null)
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetail[]>([])

  const updateSection = async (sectionName: string, data: SectionsData[keyof SectionsData]) => {
    try {
      const updatedSections = { ...sections, [sectionName]: data }
      await updateSections(updatedSections)
      setSections(updatedSections)
      setAlert({ message: 'Секция успешно обновлена', type: 'success' })
    } catch (error) {
      console.error('Ошибка при обновлении секции:', error)
      setAlert({ message: 'Ошибка при обновлении секции', type: 'error' })
    }
  }

  const updateCollections = async (newCollections: CollectionItem[]) => {
    try {
      await updateCollectionsAction(newCollections)
      setCollections(newCollections)
      setAlert({ message: 'Коллекции успешно обновлены', type: 'success' })
    } catch (error) {
      console.error('Error updating collections:', error)
      setAlert({ message: 'Ошибка при обновлении коллекций', type: 'error' })
      throw error
    }
  }

  const updateBathroomPageData = async (newData: BathroomPage) => {
    try {
      await updateBathroomPage(newData)
      setBathroomPage(newData)
      setAlert({ message: 'Страница ванной успешно обновлена', type: 'success' })
    } catch (error) {
      console.error('Ошибка при обновлении:', error)
      setAlert({ message: 'Ошибка при обновлении страницы', type: 'error' })
    }
  }

  const updateKitchenPageData = async (newData: KitchenPage) => {
    try {
      await updateKitchenPage(newData)
      setKitchenPage(newData)
      setAlert({ message: 'Страница кухни успешно обновлена', type: 'success' })
    } catch (error) {
      console.error('Ошибка при обновлении:', error)
      setAlert({ message: 'Ошибка при обновлении страницы', type: 'error' })
    }
  }

  const updateAboutPageData = async (newData: AboutPage) => {
    try {
      await updateAboutPage(newData)
      setAboutPage(newData)
      setAlert({ message: 'Страница О компании успешно обновлена', type: 'success' })
    } catch (error) {
      console.error('Ошибка при обновлении:', error)
      setAlert({ message: 'Ошибка при обновлении страницы', type: 'error' })
    }
  }

  // const updateCollectionDetailsData = async (newData: CollectionDetailItem[]) => {
  //   try {
  //     await updateCollectionDetails(newData)
  //     setCollectionDetails(newData)
  //     setAlert({
  //       message: 'Детали коллекций успешно обновлены',
  //       type: 'success'
  //     })
  //   } catch (error) {
  //     console.error('Ошибка при обновлении деталей:', error)
  //     setAlert({
  //       message: 'Ошибка при обновлении деталей коллекций',
  //       type: 'error'
  //     })
  //   }
  // }

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
        updateCollections,
        updateCollectionDetail,
        updateBathroomPage: updateBathroomPageData,
        updateKitchenPage: updateKitchenPageData,
        updateAboutPage: updateAboutPageData
      }}
    >
      {alert && <Alert message={alert.message} type={alert.type} />}
      {children}
    </SectionsContext.Provider>
  )
}

export const useSections = () => {
  const context = useContext(SectionsContext)
  if (context === null) {
    throw new Error("useSections must be used within a SectionsProvider")
  }
  return context
}
