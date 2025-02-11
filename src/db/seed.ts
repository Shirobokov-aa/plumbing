// import { db } from "./index"
// import { collectionsTable, sectionsTable, collectionDetailsTable } from "./schema"
import { eq } from "drizzle-orm"
import { collectionDetailsTable, collectionsTable, sectionsTable, bathroomPageTable, kitchenPageTable, aboutPageTable } from "./schema"
import { db } from "."
import type { CollectionItem } from "@/app/types/collections"

export const initialCollections: CollectionItem[] = [
  {
    id: 1,
    title: "ERA",
    desc: "Коллекция ERA воплощает гармонию современного дизайна и классических традиций...",
    image: "/img/item-era.png",
    link: "/collections/collection-detail/era",
    flexDirection: "xl:flex-row" as const,
  },
  {
    id: 2,
    title: "AMO",
    desc: "Коллекция AMO - это воплощение элегантности и современного стиля...",
    image: "/img/item-amo.png",
    link: "/collections/collection-detail/amo",
    flexDirection: "xl:flex-row-reverse" as const,
  },
  {
    id: 3,
    title: "TWIST",
    desc: "TWIST - это смелое сочетание классических форм и современных решений...",
    image: "/img/item-twist.png",
    link: "/collections/collection-detail/twist",
    flexDirection: "xl:flex-row",
  },
]

const initialSections = {
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
      { src: "/img/item01.png", alt: "Banner 1", desc: "ERA", url: "/era" },
      { src: "/img/item02.png", alt: "Banner 2", desc: "AMO", url: "/amo" },
      { src: "/img/item03.png", alt: "Image 3", desc: "TWIST", url: "/twist" },
      { src: "/img/item01.png", alt: "Image 1", desc: "ERA", url: "/era" },
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
}

const initialCollectionDetails = [
  {
    id: 1,
    name: "sono",
    banner: {
      image: "/img/banner01.png",
      title: "Коллекция Sono",
      description: "Элегантность и функциональность в каждой детали",
      link: { text: "Подробнее", url: "/collections/sono" },
    },
    sections: [
      {
        title: "Смесители для раковины",
        description: "Современный дизайн и надежность для вашей ванной комнаты",
        link: { text: "Посмотреть", url: "/collections/sono/faucets" },
        images: [
          { src: "/img/sono-faucet-1.png", alt: "Смеситель Sono 1" },
          { src: "/img/sono-faucet-2.png", alt: "Смеситель Sono 2" },
          { src: "/img/sono-faucet-3.png", alt: "Смеситель Sono 3" },
        ],
      },
      {
        title: "Смесители для ванны и душа",
        description: "Инновационные решения для комфортного купания",
        link: { text: "Посмотреть", url: "/collections/sono/bath-shower" },
        images: [
          { src: "/img/sono-bath-1.png", alt: "Смеситель для ванны Sono 1" },
          { src: "/img/sono-bath-2.png", alt: "Смеситель для ванны Sono 2" },
          { src: "/img/sono-bath-3.png", alt: "Смеситель для ванны Sono 3" },
        ],
      },
    ],
    sections2: [
      {
        title: "Душевые системы",
        description: "Полное погружение в мир комфорта и релаксации",
        link: { text: "Посмотреть", url: "/collections/sono/shower-systems" },
        images: [{ src: "/img/sono-shower-system.png", alt: "Душевая система Sono" }],
        titleDesc: "ДУШЕВАЯ СИСТЕМА SONO",
        descriptionDesc: "Инновационный дизайн для вашей ванной комнаты",
      },
    ],
    sections3: [
      {
        title: "Аксессуары",
        description: "Завершающие штрихи для идеальной ванной комнаты",
        link: { text: "Посмотреть", url: "/collections/sono/accessories" },
        images: [{ src: "/img/sono-accessories.png", alt: "Аксессуары Sono" }],
      },
    ],
    sections4: [
      {
        title: "Специальные предложения",
        description: "Уникальные комплекты для вашего идеального интерьера",
        images: [
          { src: "/img/sono-special-1.png", alt: "Специальное предложение Sono 1" },
          { src: "/img/sono-special-2.png", alt: "Специальное предложение Sono 2" },
          { src: "/img/sono-special-3.png", alt: "Специальное предложение Sono 3" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "era",
    banner: {
      image: "/img/banner02.png",
      title: "Коллекция Era",
      description: "Классический стиль в современном исполнении",
      link: { text: "Подробнее", url: "/collections/era" },
    },
    sections: [
      {
        title: "Смесители для раковины",
        description: "Элегантность и практичность в каждой детали",
        link: { text: "Посмотреть", url: "/collections/era/faucets" },
        images: [
          { src: "/img/era-faucet-1.png", alt: "Смеситель Era 1" },
          { src: "/img/era-faucet-2.png", alt: "Смеситель Era 2" },
          { src: "/img/era-faucet-3.png", alt: "Смеситель Era 3" },
        ],
      },
      {
        title: "Смесители для ванны и душа",
        description: "Классический дизайн для вашей ванной комнаты",
        link: { text: "Посмотреть", url: "/collections/era/bath-shower" },
        images: [
          { src: "/img/era-bath-1.png", alt: "Смеситель для ванны Era 1" },
          { src: "/img/era-bath-2.png", alt: "Смеситель для ванны Era 2" },
          { src: "/img/era-bath-3.png", alt: "Смеситель для ванны Era 3" },
        ],
      },
    ],
    sections2: [
      {
        title: "Душевые системы",
        description: "Комфорт и стиль в каждом душе",
        link: { text: "Посмотреть", url: "/collections/era/shower-systems" },
        images: [{ src: "/img/era-shower-system.png", alt: "Душевая система Era" }],
        titleDesc: "ДУШЕВАЯ СИСТЕМА ERA",
        descriptionDesc: "Классический дизайн с современными технологиями",
      },
    ],
    sections3: [
      {
        title: "Аксессуары",
        description: "Дополните ваш интерьер стильными аксессуарами",
        link: { text: "Посмотреть", url: "/collections/era/accessories" },
        images: [{ src: "/img/era-accessories.png", alt: "Аксессуары Era" }],
      },
    ],
    sections4: [
      {
        title: "Специальные предложения",
        description: "Комплексные решения для вашей ванной комнаты",
        images: [
          { src: "/img/era-special-1.png", alt: "Специальное предложение Era 1" },
          { src: "/img/era-special-2.png", alt: "Специальное предложение Era 2" },
          { src: "/img/era-special-3.png", alt: "Специальное предложение Era 3" },
        ],
      },
    ],
  },
]

const initialBathroomPageData = {
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
  ],
  collections: [
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
  ],
};

const initialKitchenPageData = {
  banner: {
    name: "Кухня",
    image: "/img/kitchen-banner.png",
    title: "Современные решения для вашей кухни",
    description: "Инновационные смесители и аксессуары для комфортного приготовления",
    link: { text: "Узнать больше", url: "/kitchen" },
  },
  sections: [
    {
      title: "Смесители для кухни",
      description: "Функциональность и стиль для вашей кухни. Широкий выбор моделей с различными типами излива и способами управления.",
      link: { text: "Смотреть", url: "/kitchen/faucets" },
      images: [
        { src: "/img/kitchen-faucet-1.png", alt: "Смеситель для кухни 1" },
        { src: "/img/kitchen-faucet-2.png", alt: "Смеситель для кухни 2" },
        { src: "/img/kitchen-faucet-3.png", alt: "Смеситель для кухни 3" },
      ],
    },
    {
      title: "Мойки",
      description: "Кухонные мойки из высококачественных материалов. Различные формы и размеры для любого интерьера.",
      link: { text: "Подробнее", url: "/kitchen/sinks" },
      images: [
        { src: "/img/kitchen-sink-1.png", alt: "Кухонная мойка 1" },
        { src: "/img/kitchen-sink-2.png", alt: "Кухонная мойка 2" },
        { src: "/img/kitchen-sink-3.png", alt: "Кухонная мойка 3" },
      ],
    },
    {
      title: "Аксессуары",
      description: "Дополнительные аксессуары для организации рабочего пространства на кухне. Дозаторы, держатели и многое другое.",
      link: { text: "Посмотреть", url: "/kitchen/accessories" },
      images: [
        { src: "/img/kitchen-acc-1.png", alt: "Аксессуар 1" },
        { src: "/img/kitchen-acc-2.png", alt: "Аксессуар 2" },
        { src: "/img/kitchen-acc-3.png", alt: "Аксессуар 3" },
      ],
    }
  ],
  collections: [
    {
      title: "Коллекция MODERN",
      description: "Современный дизайн и инновационные технологии для вашей кухни. Полный набор элементов для создания единого стиля.",
      link: { text: "Подробнее", url: "/kitchen/collections/modern" },
      images: [
        { src: "/img/kitchen-modern-1.png", alt: "Коллекция Modern 1" },
        { src: "/img/kitchen-modern-2.png", alt: "Коллекция Modern 2" },
        { src: "/img/kitchen-modern-3.png", alt: "Коллекция Modern 3" },
      ],
    },
    {
      title: "Коллекция CLASSIC",
      description: "Классические формы и проверенные временем решения. Идеальное сочетание традиций и функциональности.",
      link: { text: "Подробнее", url: "/kitchen/collections/classic" },
      images: [
        { src: "/img/kitchen-classic-1.png", alt: "Коллекция Classic 1" },
        { src: "/img/kitchen-classic-2.png", alt: "Коллекция Classic 2" },
        { src: "/img/kitchen-classic-3.png", alt: "Коллекция Classic 3" },
      ],
    },
    {
      title: "Коллекция PREMIUM",
      description: "Эксклюзивные модели премиум-класса. Уникальный дизайн и материалы высочайшего качества.",
      link: { text: "Подробнее", url: "/kitchen/collections/premium" },
      images: [
        { src: "/img/kitchen-premium-1.png", alt: "Коллекция Premium 1" },
        { src: "/img/kitchen-premium-2.png", alt: "Коллекция Premium 2" },
        { src: "/img/kitchen-premium-3.png", alt: "Коллекция Premium 3" },
      ],
    }
  ],
};

const initialAboutPageData = {
  banner: {
    name: "О компании",
    image: "/img/about-banner.png",
    title: "История и ценности компании",
    description: "Создаем инновационные решения для вашего комфорта с 1995 года",
    link: { text: "Узнать больше", url: "/about" },
  },
  sections: [
    {
      title: "Наша история",
      description: "Более 25 лет мы создаем инновационные решения для ванных комнат и кухонь. Начав как небольшая компания, сегодня мы являемся одним из лидеров рынка сантехники в России.",
    },
    {
      title: "Миссия компании",
      description: "Наша миссия - создавать продукты, которые делают жизнь людей комфортнее. Мы стремимся к инновациям, но никогда не забываем о качестве и надежности.",
    },
    {
      title: "Производство",
      description: "Собственное производство оснащено современным оборудованием. Мы контролируем каждый этап создания продукции, гарантируя высочайшее качество.",
    }
  ]
};

async function seedBathroomPage() {
  try {
    const existing = await db.select().from(bathroomPageTable);

    if (existing.length === 0) {
      await db.insert(bathroomPageTable).values({
        data: initialBathroomPageData, // Убедитесь, что вы передаете данные в правильном формате
      });
      console.log("✅ Данные для ванной успешно добавлены");
    } else {
      await db.update(bathroomPageTable)
        .set({ data: initialBathroomPageData })
        .where(eq(bathroomPageTable.id, existing[0].id));
      console.log("✅ Данные для ванной успешно обновлены");
    }
  } catch (error) {
    console.error("❌ Ошибка при добавлении данных для ванной:", error);
  }
}

async function seedCollections() {
  try {
    const existing = await db.select().from(collectionsTable)

    if (existing.length === 0) {
      await db.insert(collectionsTable).values({
        id: 1,
        data: initialCollections,
      })
      console.log("✅ Коллекции успешно добавлены")
    } else {
      await db.update(collectionsTable).set({ data: initialCollections }).where(eq(collectionsTable.id, existing[0].id))
      console.log("✅ Коллекции успешно обновлены")
    }
  } catch (error) {
    console.error("❌ Ошибка при добавлении коллекций:", error)
  }
}

async function seedSections() {
  try {
    const existing = await db.select().from(sectionsTable)

    if (existing.length === 0) {
      await db.insert(sectionsTable).values({
        id: 1,
        data: initialSections,
      })
      console.log("✅ Секции успешно добавлены")
    } else {
      await db
        .update(sectionsTable)
        .set({ data: initialSections })
        .where(eq(sectionsTable.id, existing[0].id))
      console.log("✅ Секции успешно обновлены")
    }
  } catch (error) {
    console.error("❌ Ошибка при добавлении секций:", error)
  }
}

async function seedCollectionDetails() {
  try {
    const existing = await db.select().from(collectionDetailsTable)

    if (existing.length === 0) {
      await db.insert(collectionDetailsTable).values({
        id: 1,
        data: initialCollectionDetails,
      })
      console.log("✅ Детали коллекций успешно добавлены")
    } else {
      await db
        .update(collectionDetailsTable)
        .set({ data: initialCollectionDetails })
        .where(eq(collectionDetailsTable.id, existing[0].id))
      console.log("✅ Детали коллекций успешно обновлены")
    }
  } catch (error) {
    console.error("❌ Ошибка при добавлении деталей коллекций:", error)
  }
}

async function seedKitchenPage() {
  try {
    const existing = await db.select().from(kitchenPageTable);

    if (existing.length === 0) {
      await db.insert(kitchenPageTable).values({
        data: initialKitchenPageData,
      });
      console.log("✅ Данные для кухни успешно добавлены");
    } else {
      await db.update(kitchenPageTable)
        .set({ data: initialKitchenPageData })
        .where(eq(kitchenPageTable.id, existing[0].id));
      console.log("✅ Данные для кухни успешно обновлены");
    }
  } catch (error) {
    console.error("❌ Ошибка при добавлении данных для кухни:", error);
  }
}

async function seedAboutPage() {
  try {
    const existing = await db.select().from(aboutPageTable);

    if (existing.length === 0) {
      await db.insert(aboutPageTable).values({
        data: initialAboutPageData,
      });
      console.log("✅ Данные для страницы О компании успешно добавлены");
    } else {
      await db
        .update(aboutPageTable)
        .set({ data: initialAboutPageData })
        .where(eq(aboutPageTable.id, existing[0].id));
      console.log("✅ Данные для страницы О компании успешно обновлены");
    }
  } catch (error) {
    console.error("❌ Ошибка при добавлении данных для страницы О компании:", error);
  }
}

async function seed() {
  console.log("🚀 Начинаем заполнение базы данных...")
  await seedCollections()
  console.log("✅ База данных успешно заполнена seedCollections")
  await seedSections()
  console.log("✅ База данных успешно заполнена seedSections")
  await seedCollectionDetails()
  console.log("✅ База данных успешно заполнена seedCollectionDetails")
  await seedBathroomPage();
  console.log("✅ База данных успешно заполнена seedBathroomPage");
  await seedKitchenPage();
  console.log("✅ База данных успешно заполнена seedKitchenPage");
  await seedAboutPage();
  console.log("✅ База данных успешно заполнена seedAboutPage");

  // Проверим, что данные правильно сохраняются
  const collections = await db.select().from(collectionsTable)
  console.log('Данные в БД:', collections)

  // Если нужно, можем пересоздать начальные данные
  if (collections.length === 0) {
    await db.insert(collectionsTable).values({
      id: 1,
      data: initialCollections
    })
  }

  process.exit(0)
}

seed()




// import { db } from "../index"
// import { sectionsTable } from "../schema"
// import { eq } from "drizzle-orm"

// const initialData = {
//   "section-1": {
//     title: "Привет мир 123",
//     description: "Какое то описание из объекта",
//     link: { name: "Посмотреть", url: "/123123" },
//     images_block: [
//       { src: "/img/item01.png", alt: "Image 1", desc: "ERA" },
//       { src: "/img/item02.png", alt: "Image 2", desc: "AMO" },
//     ],
//     images: ["/img/banner-little.png"],
//   },
//   "section-2": {
//     images: ["/img/banner01.png"],
//     link: { name: "Какая-то навигация", url: "/" },
//   },
//   "section-3": {
//     title: "ERA",
//     description: "Коллекция ERA воплощает гармонию современного дизайна и классических традиций...",
//     link: { name: "Посмотреть", url: "/" },
//     images: ["/img/item-era.png"],
//   },
//   "section-4": {
//     title: "Коллекции",
//     description: "Описание для коллекций",
//     link: { name: "Смотреть", url: "/" },
//     images_block: [
//       { src: "/img/item01.png", alt: "Banner 1", desc: "ERA", url: "/era" },
//       { src: "/img/item02.png", alt: "Banner 2", desc: "AMO", url: "/amo" },
//       { src: "/img/item03.png", alt: "Image 3", desc: "TWIST", url: "/twist" },
//       { src: "/img/item01.png", alt: "Image 1", desc: "ERA", url: "/era" }
//     ],
//   },
//   "section-5": {
//     title: "Какой-то заголовок",
//     description: "Описание для этого блока",
//     link: { name: "Посмотреть", url: "/" },
//     images_block: [
//       { src: "/img/item10.png", alt: "Item 10", desc: "Description 1" },
//       { src: "/img/item11.png", alt: "Item 11", desc: "Description 2" },
//       { src: "/img/item12.png", alt: "Item 12", desc: "Description 3" },
//     ],
//   }
// }

// async function seed() {
//   try {
//     console.log('🚀 Начинаем добавление данных...')

//     // Проверяем, есть ли уже данные
//     const existing = await db.select().from(sectionsTable)
//     console.log('📊 Существующие данные:', existing)

//     if (existing.length === 0) {
//       // Если данных нет, добавляем начальные
//       const inserted = await db.insert(sectionsTable).values({
//         id: 1,
//         key: 'main',
//         data: initialData
//       }).returning()

//       console.log('✅ Данные успешно добавлены:', inserted)
//     } else {
//       // Если данные есть, обновляем их
//       const updated = await db
//         .update(sectionsTable)
//         .set({ data: initialData })
//         .where(eq(sectionsTable.key, 'main'))
//         .returning()

//       console.log('✅ Данные успешно обновлены:', updated)
//     }
//   } catch (error) {
//     console.error('❌ Ошибка при добавлении данных:', error)
//     process.exit(1)
//   } finally {
//     console.log('👋 Завершаем работу')
//     process.exit(0)
//   }
// }

// console.log('🏁 Запускаем seed...')
// seed()
