import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { collectionDetailsTable } from "./schema"

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client)

async function seedCollectionDetails() {
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

  try {
    await db.insert(collectionDetailsTable).values({
      id: 1,
      data: initialCollectionDetails,
    })
    console.log("Детальная информация о коллекциях успешно добавлена")
  } catch (error) {
    console.error("Ошибка при добавлении детальной информации о коллекциях:", error)
  } finally {
    await client.end()
  }
}

seedCollectionDetails()

