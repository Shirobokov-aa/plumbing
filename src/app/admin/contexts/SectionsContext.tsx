"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Alert } from "@/components/ui/alert"
// import { db } from '@/db';
// import { sectionsTable } from '@/db/schema';
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
  image: string | null;
  flexDirection: string;
}

export interface CollectionDetailItem {
  id: number;
  name: string;
  banner: {
    title: string;
    description: string;
    image: string | null;
    link?: { text: string; url: string };
  };
  sections: Array<{
    title: string;
    description: string;
    image: string | null;
    link?: { text: string; url: string };
    images?: ImageBlockData[];
  }>;
  sections2: Array<{
    title: string;
    description: string;
    image: string | null;
    titleDesc?: string;
    descriptionDesc?: string;
    link?: { text: string; url: string };
    images?: ImageBlockData[];
  }>;
  sections3: Array<{
    title: string;
    description: string;
    image: string | null;
    link?: { text: string; url: string };
    images?: ImageBlockData[];
  }>;
  sections4: Array<{
    title: string;
    description: string;
    image: string | null;
    images?: ImageBlockData[];
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

  updateSection: (sectionName: string, data: Record<string, unknown>) => Promise<void>;
  updateCollections: (newCollections: CollectionItem[], isEdit?: boolean) => Promise<void>;
  updateCollectionDetails: (newDetails: CollectionDetailItem[], isEdit?: boolean) => Promise<void>;
  updateBathroomPage: (newData: BathroomPage) => void;
  updateKitchenPage: (newData: KitchenPage) => void;
  updateAboutPage: (newData: AboutPage) => void;
  fetchCollections: () => Promise<void>;
  fetchCollectionDetails: () => Promise<void>;
  fetchAboutPage: () => Promise<void>;
  updateCollectionDetail: (id: number, data: Omit<CollectionDetailItem, 'id'>) => Promise<void>;
  deleteCollection: (id: number) => Promise<void>;


  isLoading: boolean;
  error: string | null;
}

export const SectionsContext = createContext<SectionsContextType | null>(null)

export const SectionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetailItem[]>([]);
  // const [isCollectionDetailsInitialized, setIsCollectionDetailsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchCollections = useCallback(async () => {
    if (isLoading || isInitialized) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/collections', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCollections(Array.isArray(data) ? data : []);
      setIsInitialized(true);
    } catch (error) {
      console.error('Error fetching collections:', error);
      setError(error instanceof Error ? error.message : 'Ошибка загрузки');
      setCollections([]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isInitialized]);

  const forceRefetch = useCallback(async () => {
    setIsInitialized(false);
    await fetchCollections();
  }, [fetchCollections]);

  useEffect(() => {
    if (!isInitialized) {
      fetchCollections();
    }
  }, [isInitialized, fetchCollections]);

  const updateCollections = useCallback(async (newCollections: CollectionItem[]) => {
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: newCollections }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCollections(newCollections);
      forceRefetch(); // Сбрасываем флаг инициализации для следующей загрузки
    } catch (error) {
      console.error('Error updating collections:', error);
      throw error;
    }
  }, [forceRefetch]);

  const [sections, setSections] = useState<SectionsMainPage>({});
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
    }
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const updateSection = async (sectionName: string, data: Record<string, unknown>) => {
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

  const fetchCollectionDetails = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/collectionDetails', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch collection details');

      const data = await response.json();
      setCollectionDetails(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching collection details:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchCollectionDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const updateAboutPage = async (newData: AboutPage) => {
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

  // const compressImage = async (base64String: string, maxWidth = 1200, quality = 0.7): Promise<string> => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.src = base64String;

  //     img.onload = () => {
  //       const canvas = document.createElement('canvas');
  //       const ctx = canvas.getContext('2d');

  //       let width = img.width;
  //       let height = img.height;

  //       // Сохраняем пропорции при изменении размера
  //       if (width > maxWidth) {
  //         height = (height * maxWidth) / width;
  //         width = maxWidth;
  //       }

  //       canvas.width = width;
  //       canvas.height = height;

  //       ctx?.drawImage(img, 0, 0, width, height);

  //       // Определяем формат изображения из base64String
  //       const isPNG = base64String.includes('data:image/png');

  //       // Используем соответствующий формат при сжатии
  //       const compressedBase64 = canvas.toDataURL(
  //         isPNG ? 'image/png' : 'image/jpeg',
  //         quality
  //       );

  //       resolve(compressedBase64);
  //     };

  //     img.onerror = (error) => {
  //       console.error('Error loading image:', error);
  //       reject(error);
  //     };
  //   });
  // };

  const updateCollectionDetail = async (id: number, data: Omit<CollectionDetailItem, 'id'>) => {
    try {
      console.log('Updating collection detail:', { id, data });

      // Обновляем детали коллекции
      const detailResponse = await fetch(`/api/collectionDetails/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      const responseText = await detailResponse.text();
      console.log('Server response:', responseText); // Логируем ответ сервера

      if (!detailResponse.ok) {
        throw new Error(`Failed to update collection detail: ${responseText}`);
      }

      const responseData = JSON.parse(responseText);

      // Обновляем основную коллекцию
      const collectionData = {
        id,
        title: data.name,
        desc: data.banner.description,
        image: data.banner.image,
        flexDirection: collections.find(c => c.id === id)?.flexDirection || "xl:flex-row",
      };

      const collectionResponse = await fetch(`/api/collections/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: collectionData }),
      });

      if (!collectionResponse.ok) {
        throw new Error('Failed to update collection');
      }

      // Обновляем локальное состояние
      setCollectionDetails(prev =>
        prev.map(detail => detail.id === id ? { ...detail, ...data } : detail)
      );

      setCollections(prev =>
        prev.map(collection => collection.id === id ? { ...collection, ...collectionData } : collection)
      );

      // Перезагружаем данные для уверенности
      await Promise.all([
        fetchCollections(),
        fetchCollectionDetails()
      ]);

      return responseData;
    } catch (error) {
      console.error('Error in updateCollectionDetail:', error);
      throw error;
    }
  };

  const deleteCollection = async (id: number) => {
    try {
      // Удаляем коллекцию из обоих списков
      const updatedCollections = collections.filter(c => c.id !== id);
      const updatedCollectionDetails = collectionDetails.filter(c => c.id !== id);

      // Обновляем оба списка
      await Promise.all([
        updateCollections(updatedCollections),
        updateCollectionDetails(updatedCollectionDetails)
      ]);

    } catch (error) {
      console.error('Error deleting collection:', error);
      throw new Error('Failed to delete collection');
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
        fetchCollections: forceRefetch,
        fetchCollectionDetails,
        fetchAboutPage,
        updateCollectionDetail,
        deleteCollection,

        isLoading,
        error,
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
