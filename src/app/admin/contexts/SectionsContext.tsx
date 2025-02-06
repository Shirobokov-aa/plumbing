"use client";

import type React from "react";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Alert } from "@/components/ui/alert"

export interface ImageBlockData {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
}

interface Section {
  title?: string;
  description?: string;
  link?: { name: string; url: string }; // url теперь всегда строка
  images_block?: ImageBlockData[];
  images?: string[];
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
  // flexDirection: "xl:flex-row" | "xl:flex-row-reverse";
  flexDirection: string
}

export interface CollectionDetail {
  id: number;
  name: string;
  banner: {
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string };
  };
  sections: {
    title: string;
    description: string;
    link: { text: string; url: string };
    images: ImageBlockData[];
  }[];
  sections2: {
    title: string;
    description: string;
    link: { text: string; url: string };
    images: ImageBlockData[];
    titleDesc: string;
    descriptionDesc: string;
  }[];
  sections3: {
    title: string;
    description: string;
    link: { text: string; url: string };
    images: ImageBlockData[];
  }[];
  sections4: {
    title: string;
    description: string;
    // link: { text: string; url: string };
    images: ImageBlockData[];
  }[];
}

export interface CollectionDetailItem {
  id: number
  name: string
  banner: {
    title: string
    description: string
    image: string
  }
  sections: Array<{
    title: string
    description: string
    image: string
  }>
  sections2: Array<{
    title: string
    description: string
    image: string
  }>
  sections3: Array<{
    title: string
    description: string
    image: string
  }>
  sections4: Array<{
    title: string
    description: string
    image: string
  }>
}

interface SectionsContextType {
  sections: SectionsMainPage;
  collections: CollectionItem[];
  collectionDetails: CollectionDetailItem[]
  bathroomPage: BathroomPage; // Добавляем новое свойство
  kitchenPage: KitchenPage; // Добавляем новое свойство
  aboutPage: AboutPage; // Добавляем новое свойство
  updateSection: (sectionKey: string, newData: Section) => void;
  updateCollections: (newCollections: CollectionItem[], isEdit?: boolean) => Promise<void>
  updateCollectionDetails: (newCollectionDetails: CollectionDetailItem[], isEdit?: boolean) => Promise<void>
  updateBathroomPage: (newData: BathroomPage) => void; // Новая функция обновления
  updateKitchenPage: (newData: KitchenPage) => void; // Новая функция обновления
  updateAboutPage: (newData: AboutPage) => void; // Новая функция обновления

  fetchCollections: () => Promise<void>
  fetchCollectionDetails: () => Promise<void>
}

const SectionsContext = createContext<SectionsContextType | null>(null)

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sections, setSections] = useState<SectionsMainPage>({
    "section-1": {
      title: "",
      description: "",
      link: { name: "", url: "" },
      images_block: [],
      images: [],
    },
    "section-2": {
      images: [],
      link: { name: "", url: "" },
    },
    "section-3": {
      title: "",
      description: "",
      link: { name: "", url: "" },
      images: [],
    },
    "section-4": {
      title: "",
      description: "",
      link: { name: "", url: "" },
      images_block: [],
    },
    "section-5": {
      title: "",
      description: "",
      link: { name: "", url: "" },
      images_block: [],
    },
  });

  const [collections, setCollections] = useState<CollectionItem[]>([])
  const [collectionDetails, setCollectionDetails] = useState<CollectionDetailItem[]>([])

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

  const updateCollections = async (newCollections: CollectionItem[]) => {
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newCollections }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Ответ сервера:", errorText)
        throw new Error(`Ошибка обновления: ${errorText}`)
      }

      const result = await response.json()
      console.log("Результат обновления:", result)

      if (result.success) {
        setCollections(result.data)
      } else {
        throw new Error("Обновление не удалось")
      }
    } catch (error) {
      console.error("Ошибка при обновлении коллекций:", error)
      throw error
    }
  }


  const updateCollectionDetails = async (newCollectionDetails: CollectionDetailItem[], isEdit = false) => {
    try {
      console.log("Отправка данных детальной информации о коллекциях на сервер:", newCollectionDetails)
      const response = await fetch("/api/collectionDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newCollectionDetails, isEdit }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Ответ сервера:", errorText)
        throw new Error(`Ошибка обновления: ${errorText}`)
      }

      const result = await response.json()
      console.log("Результат обновления детальной информации о коллекциях:", result)

      if (result.success) {
        setCollectionDetails(result.data)
      } else {
        throw new Error("Обновление не удалось")
      }
    } catch (error) {
      console.error("Ошибка при обновлении детальной информации о коллекциях:", error)
      throw error
    }
  }

  const fetchCollectionDetails = useCallback(async () => {
    try {
      console.log("🔄 Начинаем загрузку детальной информации о коллекциях...")
      const response = await fetch("/api/collectionDetails")
      if (!response.ok) {
        console.error(`Ошибка при загрузке данных: ${response.status} - ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json()
      console.log("📦 Загруженные данные детальной информации о коллекциях:", data)
      if (Array.isArray(data)) {
        setCollectionDetails(data)
      } else {
        console.error("Неожиданный формат данных:", data)
        setCollectionDetails([])
      }
    } catch (error) {
      console.error("Ошибка при загрузке детальной информации о коллекциях:", error)
    }
  }, [])

  useEffect(() => {
    fetchCollectionDetails()
  }, [fetchCollectionDetails])
  // const [collectionDetails, setCollectionDetails] = useState<CollectionDetail[]>([
  //   {
  //     id: 1,
  //     name: "sono",
  //     banner: {
  //       image: "/img/banner01.png",
  //       title: "Заголовок баннера",
  //       description: "Описание баннера",
  //       link: { text: "Какой-то текст", url: "/" },
  //     },
  //     sections: [
  //       {
  //         title: "Смесители для раковины",
  //         description:
  //           "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
  //         link: { text: "Посмотреть", url: "/" },
  //         images: [
  //           { src: "/img/item01.png", alt: "Смеситель SONO 1" },
  //           { src: "/img/item02.png", alt: "Смеситель SONO 2" },
  //           { src: "/img/item02.png", alt: "Смеситель SONO 2" },
  //         ],
  //       },
  //       {
  //         title: "Смесители для ванной и душа",
  //         description:
  //           "Step into the world of Aesthetics & Co. through our portfolio of past projects. Each project...",
  //         link: { text: "Посмотреть", url: "/" },
  //         images: [
  //           {
  //             src: "/img/item-era.png",
  //             alt: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ И ДУША",
  //           },
  //           {
  //             src: "/img/item-era.png",
  //             alt: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ И ДУША",
  //           },
  //           {
  //             src: "/img/item-era.png",
  //             alt: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ И ДУША",
  //           },
  //         ],
  //       },
  //     ],
  //     sections2: [
  //       {
  //         title: "Смесители для раковины",
  //         description:
  //           "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
  //         link: { text: "Посмотреть", url: "/" },
  //         images: [{ src: "/img/item01.png", alt: "Смеситель SONO 1" }],
  //         titleDesc: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ  И  ДУША",
  //         descriptionDesc: "A Chic Urban Apartment Trasformation",
  //       },
  //     ],
  //     sections3: [
  //       {
  //         title: "Унитазы",
  //         description:
  //           "Welcome to Aesthetics & Co., where we believe in the power of exceptional design to transform spaces and enhance lives. ",
  //         link: { text: "Посмотреть", url: "/" },
  //         images: [{ src: "/img/item10.png", alt: "Смеситель SONO 1" }],
  //       },
  //     ],
  //     sections4: [
  //       {
  //         title: "Унитазы",
  //         description:
  //           "Welcome to Aesthetics & Co., where we believe in the power of exceptional design to transform spaces and enhance lives. ",
  //         // link: { text: "Посмотреть", url: "/" },
  //         images: [
  //           { src: "/img/item10.png", alt: "Смеситель SONO 1" },
  //           { src: "/img/item10.png", alt: "Смеситель SONO 1" },
  //           { src: "/img/item10.png", alt: "Смеситель SONO 1" },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "era",
  //     banner: {
  //       image: "/img/banner01.png",
  //       title: "Заголовок баннера",
  //       description: "Описание баннера",
  //       link: { text: "Какой-то текст", url: "/" },
  //     },
  //     sections: [
  //       {
  //         title: "Смесители для раковины",
  //         description:
  //           "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
  //         link: { text: "Посмотреть", url: "/" },
  //         images: [],
  //       },
  //       {
  //         title: "Смесители для ванной и душа",
  //         description:
  //           "Step into the world of Aesthetics & Co. through our portfolio of past projects. Each project...",
  //         link: { text: "Посмотреть", url: "/" },
  //         images: [
  //           {
  //             src: "/img/fallback-image.png",
  //             alt: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ И ДУША",
  //             desc: "A Chic Urban Apartment Trasformation",
  //           },
  //         ],
  //       },
  //     ],
  //     sections2: [
  //       {
  //         title: "Смесители для раковины",
  //         description:
  //           "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
  //         link: { text: "Посмотреть", url: "/" },
  //         images: [{ src: "/img/item01.png", alt: "Смеситель SONO 1" }],
  //         titleDesc: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ  И  ДУША",
  //         descriptionDesc: "A Chic Urban Apartment Trasformation",
  //       },
  //     ],
  //     sections3: [
  //       {
  //         title: "Смесители для раковины",
  //         description:
  //           "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
  //         link: { text: "Посмотреть", url: "/" },
  //         images: [{ src: "/img/item01.png", alt: "Смеситель SONO 1" }],
  //       },
  //     ],
  //     sections4: [
  //       {
  //         title: "Унитазы",
  //         description:
  //           "Welcome to Aesthetics & Co., where we believe in the power of exceptional design to transform spaces and enhance lives. ",
  //         // link: { text: "Посмотреть", url: "/" },
  //         images: [{ src: "/img/item10.png", alt: "Смеситель SONO 1" }],
  //       },
  //     ],
  //   },
  // ]);

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

  useEffect(() => {
    const fetchSections = async () => {
      try {
        console.log('🔄 Начинаем загрузку данных...')
        const response = await fetch('/api/sections')
        const data = await response.json()

        if (data && data.length > 0 && data[0].data) {
          console.log('📦 Загруженные данные:', data[0].data)
          setSections(data[0].data)
        }
      } catch (error) {
        console.error('❌ Ошибка загрузки секций:', error)
      }
    }

    fetchSections()
  }, [])

  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const updateSection = async (sectionKey: string, newData: Section) => {
    try {
      // Обновляем в БД
      const response = await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'main',
          data: { ...sections, [sectionKey]: newData }
        })
      })

      if (!response.ok) throw new Error('Ошибка обновления')

      // Обновляем локальное состояние
      setSections(prev => ({
        ...prev,
        [sectionKey]: newData
      }))

      setAlert({
        message: 'Изменения успешно сохранены',
        type: 'success'
      })
    } catch (error: unknown) {
      console.error('Ошибка при обновлении:', error)
      setAlert({
        message: 'Ошибка при сохранении изменений',
        type: 'error'
      })
    }
  }

  // const updateCollections = async (newCollections: CollectionItem[]) => {
  //   try {
  //     const response = await fetch('/api/collections', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ data: newCollections })
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error("Ответ сервера:", errorText);
  //       throw new Error(`Ошибка обновления: ${errorText}`);
  //     }

  //     const result = await response.json();
  //     console.log("Результат обновления:", result);

  //     // Обновляем состояние коллекций
  //     setCollections(result.data); // Используем данные из ответа API
  //     setAlert({
  //       message: 'Коллекции успешно обновлены',
  //       type: 'success'
  //     });
  //   } catch (error) {
  //     console.error('Ошибка при обновлении коллекций:', error);
  //     setAlert({
  //       message: `Ошибка при обновлении коллекций: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
  //       type: 'error'
  //     });
  //   }
  // };

  // const updateCollections = async (newCollections: CollectionItem[]) => {
  //   try {
  //     const response = await fetch("/api/collections", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ data: newCollections }),
  //     })

  //     if (!response.ok) {
  //       const errorText = await response.text()
  //       console.error("Ответ сервера:", errorText)
  //       throw new Error(`Ошибка обновления: ${errorText}`)
  //     }

  //     const result = await response.json()
  //     console.log("Результат обновления:", result)

  //     // Обновляем состояние коллекций
  //     setCollections(result.data)
  //   } catch (error) {
  //     console.error("Ошибка при обновлении коллекций:", error)
  //     throw error // Перебрасываем ошибку для обработки в компоненте
  //   }
  // }

  // const updateCollectionDetail = (id: number, newData: CollectionDetail) => {
  //   setCollectionDetails((prevDetails) => prevDetails.map((detail) => (detail.id === id ? newData : detail)));
  // };

  // Функция обновления данных страницы ванной
  const updateBathroomPage = (newData: BathroomPage) => {
    setBathroomPage(newData);
  };

  const updateKitchenPage = (newData: KitchenPage) => {
    setKitchenPage(newData);
  };
  const updateAboutPage = (newData: AboutPage) => {
    setAboutPage(newData);
  };

  return (
    <SectionsContext.Provider
      value={{
        sections,
        collections,
        collectionDetails,
        bathroomPage, // Добавляем новое свойство
        kitchenPage, // Добавляем новое свойство
        aboutPage, // Добавляем новое свойство
        updateSection,
        updateCollections,
        updateCollectionDetails,
        updateBathroomPage, // Добавляем новую функцию обновления
        updateKitchenPage, // Добавляем новую функцию обновления
        updateAboutPage, // Добавляем новую функцию обновления
        fetchCollections,
        fetchCollectionDetails,
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
