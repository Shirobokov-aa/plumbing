import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/db"
import { sectionsTable } from "@/db/schema"
import { eq } from "drizzle-orm"

// Добавляем интерфейсы в начало файла
interface SectionData {
  title?: string;
  description?: string;
  link?: { name: string; url: string };
  images?: string[];
  images_block?: Array<{ src: string; alt: string; desc?: string; url?: string }>;
}

interface SectionsData {
  [key: string]: SectionData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const sections = await db.select().from(sectionsTable);
      console.log('GET запрос - данные из БД:', sections);
      
      // Если данных нет, создаем начальные
      if (sections.length === 0) {
        const initialData = {
          "section-1": {
            title: "Привет мир 123",
            description: "Какое то описание из объекта",
            link: { name: "Посмотреть", url: "/123123" },
            images: [{
              src: "/img/banner-little.png",
              alt: "Banner image",
              width: 570,
              height: 500
            }],
            images_block: [
              { 
                src: "/img/item01.png", 
                alt: "Image 1", 
                desc: "ERA",
                width: 270,
                height: 270
              },
              { 
                src: "/img/item02.png", 
                alt: "Image 2", 
                desc: "AMO",
                width: 270,
                height: 270
              },
            ],
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
            link: { name: "Смотреть", url: "/collections" },
            images_block: [
              { src: "/img/item01.png", alt: "Banner 1", desc: "ERA", url: "/era" },
              { src: "/img/item02.png", alt: "Banner 2", desc: "AMO", url: "/amo" },
              { src: "/img/item03.png", alt: "Image 3", desc: "TWIST", url: "/twist" },
              { src: "/img/item01.png", alt: "Image 1", desc: "ERA", url: "/era" }
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
          }
        };

        await db.insert(sectionsTable).values({
          data: initialData
        });

        return res.status(200).json(initialData);
      }

      // Проверяем наличие всех секций
      const data = sections[0].data as SectionsData;
      const validSections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'];
      
      // Если какой-то секции нет, добавляем пустой объект
      validSections.forEach(section => {
        if (!data[section]) {
          data[section] = {};
        }
      });

      console.log('API response data:', data);
      return res.status(200).json(data);
    } else if (req.method === "POST") {
      console.log('POST запрос - тело запроса:', req.body);
      const { sectionName, data } = req.body;
      
      const sections = await db.select().from(sectionsTable);
      console.log('POST запрос - текущие данные в БД:', sections);
      
      // Добавляем интерфейс для данных секции
      interface SectionData {
        title?: string;
        description?: string;
        link?: { name: string; url: string };
        images?: string[];
        images_block?: Array<{ src: string; alt: string; desc?: string; url?: string }>;
      }

      // Добавляем тип для всех секций
      interface SectionsData {
        [key: string]: SectionData;
      }
      
      let updatedData: SectionsData = {};
      
      if (sections.length === 0) {
        updatedData = {
          [sectionName]: data
        };
        
        console.log('POST запрос - создание новой записи:', updatedData);
        await db.insert(sectionsTable).values({
          data: updatedData
        });
      } else {
        const currentData = sections[0].data as SectionsData || {};
        const validSections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'];
        
        updatedData = validSections.reduce((acc: SectionsData, key) => {
          acc[key] = key === sectionName ? data : currentData[key] || {};
          return acc;
        }, {});
        
        console.log('POST запрос - обновление существующей записи:', updatedData);
        await db.update(sectionsTable)
          .set({ data: updatedData })
          .where(eq(sectionsTable.id, sections[0].id));
      }
      
      // Проверяем результат обновления
      const updatedSections = await db.select().from(sectionsTable);
      console.log('POST запрос - данные после обновления:', updatedSections);
      
      return res.status(200).json(updatedData);
    } else if (req.method === "PUT") {
      const { sectionName, data } = req.body;
      
      // Получаем текущие секции
      const sections = await db.select().from(sectionsTable);
      
      if (!sections || sections.length === 0) {
        // Если секций нет, создаем новую запись
        const newData = { [sectionName]: data };
        await db.insert(sectionsTable).values({ data: newData });
        return res.status(200).json({ data: newData });
      }
      
      // Обновляем существующие данные
      const currentData = typeof sections[0].data === 'object' ? sections[0].data : {};
      const updatedData = {
        ...currentData,
        [sectionName]: data
      };
      
      await db
        .update(sectionsTable)
        .set({ data: updatedData })
        .where(eq(sectionsTable.id, sections[0].id));
      
      return res.status(200).json({ data: updatedData });
    } else if (req.method === "DELETE") {
      await db.delete(sectionsTable);
      return res.status(200).json({ message: "Database cleared" });
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : '');
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
}