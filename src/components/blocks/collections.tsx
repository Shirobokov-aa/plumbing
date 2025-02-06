import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";

// Интерфейс для изображений
interface Image {
  id: number;
  src: string;
  alt: string;
  desc: string;
  url: string;
}

// Проверим компонент Collections
interface CollectionImage {
  src: string;
  alt: string;
  desc: string;
  url: string;
}

// Пропсы для компонента Collections
interface CollectionsProps {
  images: { src: string; alt: string; desc: string; url: string }[]; // Изменили тип данных
}

export default function Collections({ images }: CollectionsProps) {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-5">
      {images.map((image, index) => (
        <Link key={index} href={image.url}>
          <div className="relative">
            <Image
              src={image.src}
              alt={image.alt}
              width={466}  // Добавляем фиксированные размеры
              height={466} // Добавляем фиксированные размеры
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-5">
              <p className="text-white">{image.desc}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
