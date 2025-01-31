"use client";

import type React from "react";
import { createContext, useState, useContext } from "react";

export interface ImageBlockData {
  src: string;
  alt: string;
  desc?: string;
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

export interface CollectionItem {
  id: number; // Убедимся, что id имеет тип number
  image: string;
  title: string;
  desc: string;
  link: string;
  flexDirection: "xl:flex-row" | "xl:flex-row-reverse";
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

interface SectionsContextType {
  sections: SectionsMainPage;
  collections: CollectionItem[];
  collectionDetails: CollectionDetail[];
  updateSection: (sectionKey: string, newData: Section) => void;
  updateCollections: (newCollections: CollectionItem[]) => void;
  updateCollectionDetail: (id: number, newData: CollectionDetail) => void;
}

const SectionsContext = createContext<SectionsContextType | undefined>(undefined);

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
  });

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
  ]);

  const [collectionDetails, setCollectionDetails] = useState<CollectionDetail[]>([
    {
      id: 1,
      name: "sono",
      banner: {
        image: "/img/banner01.png",
        title: "Заголовок баннера",
        description: "Описание баннера",
        link: { text: "Какой-то текст", url: "/" },
      },
      sections: [
        {
          title: "Смесители для раковины",
          description:
            "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
          link: { text: "Посмотреть", url: "/" },
          images: [
            { src: "/img/item01.png", alt: "Смеситель SONO 1" },
            { src: "/img/item02.png", alt: "Смеситель SONO 2" },
            { src: "/img/item02.png", alt: "Смеситель SONO 2" },
          ],
        },
        {
          title: "Смесители для ванной и душа",
          description:
            "Step into the world of Aesthetics & Co. through our portfolio of past projects. Each project...",
          link: { text: "Посмотреть", url: "/" },
          images: [
            {
              src: "/img/item-era.png",
              alt: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ И ДУША",
            },
            {
              src: "/img/item-era.png",
              alt: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ И ДУША",
            },
            {
              src: "/img/item-era.png",
              alt: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ И ДУША",
            },
          ],
        },
      ],
      sections2: [
        {
          title: "Смесители для раковины",
          description:
            "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
          link: { text: "Посмотреть", url: "/" },
          images: [
            { src: "/img/item01.png", alt: "Смеситель SONO 1" },
          ],
          titleDesc:"СМЕСИТЕЛЬ ДЛЯ ВАННЫ  И  ДУША",
          descriptionDesc: "A Chic Urban Apartment Trasformation",
        },
      ],
      sections3: [
        {
          title: "Унитазы",
          description:
            "Welcome to Aesthetics & Co., where we believe in the power of exceptional design to transform spaces and enhance lives. ",
          link: { text: "Посмотреть", url: "/" },
          images: [
            { src: "/img/item10.png", alt: "Смеситель SONO 1" },
          ],
        },
      ],
      sections4: [
        {
          title: "Унитазы",
          description:
            "Welcome to Aesthetics & Co., where we believe in the power of exceptional design to transform spaces and enhance lives. ",
          // link: { text: "Посмотреть", url: "/" },
          images: [
            { src: "/img/item10.png", alt: "Смеситель SONO 1" },
            { src: "/img/item10.png", alt: "Смеситель SONO 1" },
            { src: "/img/item10.png", alt: "Смеситель SONO 1" },

          ],
        },
      ],
    },
    {
      id: 2,
      name: "era",
      banner: {
        image: "/img/banner01.png",
        title: "Заголовок баннера",
        description: "Описание баннера",
        link: { text: "Какой-то текст", url: "/" },
      },
      sections: [
        {
          title: "Смесители для раковины",
          description:
            "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
          link: { text: "Посмотреть", url: "/" },
          images: [],
        },
        {
          title: "Смесители для ванной и душа",
          description:
            "Step into the world of Aesthetics & Co. through our portfolio of past projects. Each project...",
          link: { text: "Посмотреть", url: "/" },
          images: [
            {
              src: "/img/fallback-image.png",
              alt: "СМЕСИТЕЛЬ ДЛЯ ВАННЫ И ДУША",
              desc: "A Chic Urban Apartment Trasformation",
            },
          ],
        },
      ],
      sections2: [
        {
          title: "Смесители для раковины",
          description:
            "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
          link: { text: "Посмотреть", url: "/" },
          images: [
            { src: "/img/item01.png", alt: "Смеситель SONO 1" },
          ],
          titleDesc:"СМЕСИТЕЛЬ ДЛЯ ВАННЫ  И  ДУША",
          descriptionDesc: "A Chic Urban Apartment Trasformation",
        },
      ],
      sections3: [
        {
          title: "Смесители для раковины",
          description:
            "Our blog covers a wide range of topics, including design inspiration, practical advice for home improvement recommendations and more.",
          link: { text: "Посмотреть", url: "/" },
          images: [
            { src: "/img/item01.png", alt: "Смеситель SONO 1" },
          ],
        },
      ],
      sections4: [
        {
          title: "Унитазы",
          description:
            "Welcome to Aesthetics & Co., where we believe in the power of exceptional design to transform spaces and enhance lives. ",
          // link: { text: "Посмотреть", url: "/" },
          images: [
            { src: "/img/item10.png", alt: "Смеситель SONO 1" },
          ],
        },
      ],
    },
  ]);

  const updateSection = (sectionKey: string, newData: Section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [sectionKey]: newData,
    }));
  };

  const updateCollections = (newCollections: CollectionItem[]) => {
    setCollections(newCollections);
  };

  const updateCollectionDetail = (id: number, newData: CollectionDetail) => {
    setCollectionDetails((prevDetails) => prevDetails.map((detail) => (detail.id === id ? newData : detail)));
  };

  return (
    <SectionsContext.Provider
      value={{ sections, collections, collectionDetails, updateSection, updateCollections, updateCollectionDetail }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export const useSections = () => {
  const context = useContext(SectionsContext);
  if (context === undefined) {
    throw new Error("useSections must be used within a SectionsProvider");
  }
  return context;
};
