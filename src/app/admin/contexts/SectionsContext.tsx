"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Alert } from "@/components/ui/alert"
import { db } from '@/db';
import { sectionsTable } from '@/db/schema';
// import type { BathroomPage } from "../types"


export interface ImageBlockData {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
  width?: number;
  height?: number;
}

interface Section {
  title?: string;
  description?: string;
  link?: { name: string; url: string };
  images_block?: Array<{
    src: string;
    alt: string;
    desc?: string;
    url?: string;
  }>;
  images?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
}

interface SectionsMainPage {
  [key: string]: Section;
}



interface BathroomSection {
  title: string;
  description: string;
  link: { text: string; url: string };
  images: ImageBlockData[];
}

interface KitchenSection {
  title: string;
  description: string;
  link: { text: string; url: string };
  images: ImageBlockData[];
}
interface AboutSection {
  title: string;
  description: string;
  // link: { text: string; url: string };
  // images: ImageBlockData[];
}

interface BathroomPage {
  banner: {
    name: string;
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string };
  };
  sections: BathroomSection[];
  collections: BathroomCollection[];
}

interface KitchenPage {
  banner: {
    name: string;
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string };
  };
  sections: KitchenSection[];
  collections: KitchenCollection[];
}

interface AboutPage {
  banner: {
    name: string;
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string };
  };
  sections: AboutSection[];
  // collections: KitchenCollection[]
}

interface BathroomCollection {
  title: string;
  description: string;
  link: { text: string; url: string };
  images: ImageBlockData[];
}

interface KitchenCollection {
  title: string;
  description: string;
  link: { text: string; url: string };
  images: ImageBlockData[];
}

export interface CollectionItem {
  id: number;
  title: string;
  desc: string;
  image: string;
  link: string;
  flexDirection: "xl:flex-row" | "xl:flex-row-reverse";
}

export interface CollectionDetailItem {
  id: number;
  name: string;
  link?: string;
  banner: {
    title: string;
    description: string;
    image: string;
  };
  sections: Array<{
    title: string;
    description: string;
    image: string;
    link?: { text: string; url: string };
    images?: Array<{ src: string; alt: string }>;
  }>;
  sections2: Array<{
    title: string;
    description: string;
    image: string;
    link?: { text: string; url: string };
    images?: Array<{ src: string; alt: string }>;
    titleDesc?: string;
    descriptionDesc?: string;
  }>;
  sections3: Array<{
    title: string;
    description: string;
    image: string;
    link?: { text: string; url: string };
    images?: Array<{ src: string; alt: string }>;
    titleDesc?: string;
    descriptionDesc?: string;
  }>;
  sections4: Array<{
    title: string;
    description: string;
    image: string;
    link?: { text: string; url: string };
    images?: Array<{ src: string; alt: string }>;
    titleDesc?: string;
    descriptionDesc?: string;
  }>;
}

interface AlertType {
  message: string;
  type: 'success' | 'error';
}

interface SectionsContextType {
  sections: SectionsMainPage;
  collections: CollectionItem[];
  collectionDetails: CollectionDetailItem[];
  bathroomPage: BathroomPage | null
  kitchenPage: KitchenPage;
  aboutPage: AboutPage;
  
  updateSection: (sectionName: string, data: any) => Promise<void>;
  updateCollections: (newCollections: CollectionItem[], isEdit?: boolean) => Promise<void>;
  updateCollectionDetails: (newDetails: CollectionDetailItem[], isEdit?: boolean) => Promise<void>;
  updateBathroomPage: (newData: BathroomPage) => void;
  updateKitchenPage: (newData: KitchenPage) => void;
  updateAboutPage: (newData: AboutPage) => void;
  fetchCollections: () => Promise<void>;
  fetchCollectionDetails: () => Promise<void>;
  fetchAboutPage: () => Promise<void>;
  updateCollectionDetail: (id: number, data: any) => Promise<void>;
}

export const SectionsContext = createContext<SectionsContextType | null>(null)

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState<SectionsMainPage>({});
  const [collections, setCollections] = useState<CollectionItem[]>([])
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetailItem[]>([])
  const [alert, setAlert] = useState<AlertType | null>(null);

  const loadSections = useCallback(async () => {
    try {
      console.log("Загрузка секций...");
      const response = await fetch('/api/sections');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Получены данные секций:", data);
      
      if (data && typeof data === 'object') {
        setSections(data);
        console.log("Секции успешно обновлены");
      }
    } catch (error) {
      console.error("Ошибка загрузки секций:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const updateSection = async (sectionName: string, data: any) => {
    try {
      console.log('Отправляем данные на сервер:', { sectionName, data });
      
      const response = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionName, data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Ошибка от сервера:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json();
      console.log('Получены обновленные данные:', updatedData);
      
      // Обновляем состояние новыми данными
      setSections(updatedData);
      
      // Добавим небольшую задержку перед перезагрузкой
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Принудительно очищаем кэш перед загрузкой
      const response2 = await fetch('/api/sections', { 
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      const freshData = await response2.json();
      setSections(freshData);

      setAlert({
        message: 'Секция успешно обновлена',
        type: 'success'
      });
    } catch (error) {
      console.error('Ошибка при обновлении секции:', error);
      setAlert({
        message: 'Ошибка при обновлении секции',
        type: 'error'
      });
    }
  };

  const fetchCollections = useCallback(async () => {
    try {
      console.log("🔄 Начинаем загрузку коллекций...")
      const response = await fetch("/api/collections")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("📦 Загруженные данные коллекций:", data)
      if (Array.isArray(data)) {
        setCollections(data)
      } else if (data && Array.isArray(data.data)) {
        setCollections(data.data)
      } else {
        console.error("Неожиданный формат данных:", data)
        setCollections([])
      }
    } catch (error) {
      console.error("Ошибка при загрузке коллекций:", error)
    }
  }, [])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const updateCollections = async (newCollections: CollectionItem[], isEdit = false) => {
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newCollections, isEdit }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setCollections(result.data);
      setAlert({
        message: 'Коллекции успешно обновлены',
        type: 'success'
      });
    } catch (error) {
      console.error('Ошибка при обновлении коллекций:', error);
      setAlert({
        message: 'Ошибка при обновлении коллекций',
        type: 'error'
      });
      throw error;
    }
  };

  const updateCollectionDetails = async (newDetails: CollectionDetailItem[], isEdit = false) => {
    try {
      const response = await fetch("/api/collectionDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newDetails, isEdit }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setCollectionDetails(result.data);
      setAlert({
        message: 'Детали коллекции успешно обновлены',
        type: 'success'
      });
    } catch (error) {
      console.error('Ошибка при обновлении деталей коллекции:', error);
      setAlert({
        message: 'Ошибка при обновлении деталей коллекции',
        type: 'error'
      });
      throw error;
    }
  };

  const fetchCollectionDetails = async () => {
    try {
      // Проверяем, есть ли уже загруженные данные
      if (collectionDetails.length > 0) {
        return collectionDetails
      }

      const response = await fetch('/api/collectionDetails')
      if (!response.ok) {
        throw new Error('Failed to fetch collection details')
      }
      const data = await response.json()
      console.log("�� Загруженные данные детальной информации о коллекциях:", data)
      setCollectionDetails(data)
      return data
    } catch (error) {
      console.error('Error fetching collection details:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchCollectionDetails()
  }, [fetchCollectionDetails])

  const [bathroomPage, setBathroomPage] = useState<BathroomPage>({
    banner: {
      name: "Ванная",
      image: "/img/banner01.png",
      title: "",
      description: "",
      link: { text: "Узнать больше", url: "/bathroom" },
    },
    sections: [
      {
        title: "Смесители для ванной и душа",
        description: "Удобство, стиль и надежность в каждом решении",
        link: { text: "Смотреть", url: "/bathroom/faucets" },
        images: [
          { src: "", alt: "Смеситель для ванной 1" },
          { src: "", alt: "Смеситель для ванной 2" },
          { src: "", alt: "Смеситель для ванной 3" },
        ],
      },
      {
        title: "Смесители для раковины",
        description: "Удобство, стиль и надежность в каждом решении",
        link: { text: "Смотреть", url: "/bathroom/faucets" },
        images: [
          { src: "", alt: "Смеситель для ванной 1" },
          { src: "", alt: "Смеситель для ванной 2" },
          { src: "", alt: "Смеситель для ванной 3" },
        ],
      },
      {
        title: "Душевые системы",
        description: "Удобство, стиль и надежность в каждом решении",
        link: { text: "Смотреть", url: "/bathroom/faucets" },
        images: [
          { src: "", alt: "Смеситель для ванной 1" },
          { src: "", alt: "Смеситель для ванной 2" },
          { src: "", alt: "Смеситель для ванной 3" },
        ],
      },
      // Добавьте другие секции по необходимости
    ],
    collections: [
      // Добавляем новые данные для коллекций
      {
        title: "Коллекция для ванной",
        description: "Элегантность и функциональность в каждой детали",
        link: { text: "Подробнее", url: "/bathroom/collections/1" },
        images: [
          { src: "/img/item01.png", alt: "Коллекция для ванной 1" },
          { src: "/img/item01.png", alt: "Коллекция для ванной 2" },
          { src: "/img/item01.png", alt: "Коллекция для ванной 3" },
        ],
      },
      // Добавьте дополнительные коллекции по необходимости
    ],
  });

  const [kitchenPage, setKitchenPage] = useState<KitchenPage>({
    banner: {
      name: "Кухня",
      image: "/img/banner01.png",
      title: "",
      description: "",
      link: { text: "Узнать больше", url: "/kitchen" },
    },
    sections: [
      {
        title: "Смесители для кухни",
        description: "Комфорт, качество и элегантность для вашей ванной комнаты",
        link: { text: "Смотреть", url: "/kitchen/faucets" },
        images: [
          { src: "", alt: "Смеситель для кухни 1" },
          { src: "", alt: "Смеситель для кухни 2" },
          { src: "", alt: "Смеситель для кухни 3" },
        ],
      },
      {
        title: "Аксессуары",
        description: "Детали, которые добавляют удобство и стиль.",
        link: { text: "Смотреть", url: "/kitchen/faucets" },
        images: [
          { src: "", alt: "Смеситель для кухни 1" },
          { src: "", alt: "Смеситель для кухни 2" },
          { src: "", alt: "Смеситель для кухни 3" },
        ],
      },
      // Добавьте другие секции по необходимости
    ],
    collections: [
      // Добавляем новые данные для коллекций
      {
        title: "Коллекция для кухни",
        description: "Элегантность и функциональность в каждой детали",
        link: { text: "Подробнее", url: "/kitchen/collections/1" },
        images: [
          { src: "/img/item01.png", alt: "Коллекция для ванной 1" },
          { src: "/img/item02.png", alt: "Коллекция для ванной 2" },
          { src: "/img/item03.png", alt: "Коллекция для ванной 3" },
        ],
      },
      // Добавьте дополнительные коллекции по необходимости
    ],
  });

  const [aboutPage, setAboutPage] = useState<AboutPage>({
    banner: {
      name: "О Компании",
      image: "/img/banner01.png",
      title: "",
      description: "",
      link: { text: "Посмотреть Коллекции", url: "/collection" },
    },
    sections: [
      {
        title: "О нас",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit i",
      },
    ],
  });

  const updateBathroomPage = async (newData: BathroomPage) => {
    try {
      const response = await fetch('/api/bathroomPage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: newData }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка обновления: ${errorText}`);
      }
  
      // Получаем обновленные данные с сервера
      const updatedData = await response.json();
      setBathroomPage(updatedData.data); // Обновляем состояние актуальными данными
  
      setAlert({
        message: 'Страница ванной успешно обновлена',
        type: 'success'
      });
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
      setAlert({
        message: 'Ошибка при обновлении страницы',
        type: 'error'
      });
    }
  };

  const fetchBathroomPage = async () => {
    try {
      const response = await fetch('/api/bathroomPage');
      if (!response.ok) {
        throw new Error('Failed to fetch bathroom page data');
      }
      const data = await response.json();
      setBathroomPage(data.data);
    } catch (error) {
      console.error('Error fetching bathroom page:', error);
      setAlert({
        message: 'Ошибка при загрузке данных',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    fetchBathroomPage();
  }, []);

  const updateKitchenPage = async (newData: KitchenPage) => {
    try {
      const response = await fetch('/api/kitchenPage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: newData }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка обновления: ${errorText}`);
      }

      // Получаем обновленные данные с сервера
      const updatedData = await response.json();
      setKitchenPage(updatedData.data); // Обновляем состояние актуальными данными

      setAlert({
        message: 'Страница кухни успешно обновлена',
        type: 'success'
      });
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
      setAlert({
        message: 'Ошибка при обновлении страницы',
        type: 'error'
      });
    }
  };

  const fetchKitchenPage = async () => {
    try {
      const response = await fetch('/api/kitchenPage');
      if (!response.ok) {
        throw new Error('Failed to fetch kitchen page data');
      }
      const data = await response.json();
      setKitchenPage(data.data);
    } catch (error) {
      console.error('Error fetching kitchen page:', error);
      setAlert({
        message: 'Ошибка при загрузке данных',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    fetchKitchenPage();
  }, []);

  const fetchAboutPage = async () => {
    try {
      const response = await fetch('/api/aboutPage');
      if (!response.ok) {
        throw new Error('Failed to fetch about page data');
      }
      const data = await response.json();
      setAboutPage(data.data);
    } catch (error) {
      console.error('Error fetching about page:', error);
      setAlert({
        message: 'Ошибка при загрузке данных',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    fetchAboutPage();
  }, []);

  const updateAboutPage = async (newData: any) => {
    try {
      const response = await fetch('/api/aboutPage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: newData }),
      });

      if (!response.ok) {
        throw new Error('Failed to update about page');
      }

      const updatedData = await response.json();
      setAboutPage(updatedData.data);
      
      // После успешного обновления, перезагружаем данные
      await fetchAboutPage();
      
      setAlert({
        message: 'Страница О компании успешно обновлена',
        type: 'success'
      });
    } catch (error) {
      console.error('Error updating about page:', error);
      setAlert({
        message: 'Ошибка при обновлении страницы',
        type: 'error'
      });
    }
  };

  const updateCollectionDetail = async (id: number, data: any) => {
    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error('Failed to update collection detail');
      }

      const result = await response.json();
      
      // Обновляем состояние после успешного обновления
      setCollectionDetails((prev) => {
        const newDetails = [...prev];
        const index = newDetails.findIndex((detail) => detail.id === id);
        if (index !== -1) {
          newDetails[index] = { ...newDetails[index], ...data };
        }
        return newDetails;
      });

      return result;
    } catch (error) {
      console.error('Error updating collection detail:', error);
      throw error;
    }
  };

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
        updateCollectionDetails,
        updateBathroomPage,
        updateKitchenPage,
        updateAboutPage,
        fetchCollections,
        fetchCollectionDetails,
        fetchAboutPage,
        updateCollectionDetail,
      }}
    >
      {alert && <Alert message={alert.message} type={alert.type} />}
      {children}
    </SectionsContext.Provider>
  );

};

export const useSections = () => {
  const context = useContext(SectionsContext);
  if (context === null) {
    throw new Error("useSections must be used within a SectionsProvider");
  }
  return context;
};
