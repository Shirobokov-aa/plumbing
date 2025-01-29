import Link from "next/link";
import Image from "next/image";
import Collections from "./blocks/collections";
import { Button } from "@/components/ui/button";
import ImageBlock from "./blocks/image-block";

interface Preview {
  id: number;
  image: string;
}
// interface ImageData {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
//   className?: string;
// }

export default function Main() {
  const preview: Preview[] = [
    {
      id: 1,
      image: "/img/block.png",
    },
    {
      id: 2,
      image: "/img/block.png",
    },
  ];

  const imagesCollections = [
    { id: 1, src: "/img/item01.png", alt: "Image 1", desc: "ERA" },
    { id: 2, src: "/img/item02.png", alt: "Image 2", desc: "AMO" },
    { id: 3, src: "/img/item03.png", alt: "Image 3", desc: "TWIST" },
    { id: 4, src: "/img/item01.png", alt: "Image 1", desc: "ERA" },
  ];

  // const images: ImageData[] = [
  //   {
  //     src: "/img/item10.png",
  //     alt: "image",
  //     width: 520,
  //     height: 518,
  //     className: "",
  //   },
  //   {
  //     src: "/img/item11.png",
  //     alt: "image",
  //     width: 250,
  //     height: 250,
  //     className: "",
  //   },
  //   {
  //     src: "/img/item12.png",
  //     alt: "image",
  //     width: 250,
  //     height: 250,
  //     className: "",
  //   },
  // ];
  return (
    <main>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-10">
          <div className="flex xl:flex-row flex-col lg:gap-20 gap-10">
            <div className="">
              <div className="max-w-[520px] flex flex-col gap-14">
                <h2 className="lg:text-h2 text-h2Lg">Lorem ipsum dolor sit</h2>
                <p className="text-desc">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.Ut enim ad minim veniam, quis
                </p>
              </div>
              <div className="flex xl:flex-col flex-col-reverse pt-5 gap-10">
                <div>
                  <Link href={"/"} className="text-desc border-b border-black">
                    Сupidatat
                  </Link>
                </div>
                <div className="flex justify-between xl:gap-20 gap-5">
                  {preview.map((prev, index) => (
                    <div key={index} className="xl:max-w-[270px] w-full xl:max-h-[270px] h-full">
                      <Image src={prev.image} alt="" width={350} height={350} className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full h-full  flex justify-center items-center">
                <Image src="/img/block-big.png" alt="" width={570} height={500} className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="lg:block hidden max-w-1440 mx-auto lg:px-24 px-5 pt-24">
          <div className="relative w-full xl:h-[780px]">
            <Image src="/img/banner01.png" alt="" width={1240} height={780} className="object-contain " />
            <Link href={"/"} className="">
              <div className="absolute top-24 left-0 lg:py-9 py-7 lg:px-[150px] px-24 bg-[#1E1E1E] text-white">
                <h2 className="lg:text-xl font-light border-b border-b-white">Навигация</h2>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-24">
          <div className="flex xl:flex-row flex-col-reverse xl:gap-24 gap-5">
            <div className="xl:max-w-[526px] w-full">
              <Image src="/img/banner-little.png" alt="" width={526} height={526} className="object-contain " />
            </div>
            <div className="xl:max-w-[614px] w-full flex flex-col justify-between">
              <div className="flex flex-col gap-11">
                <h2 className="lg:text-h2 text-h2Lg">Lorem ipsum dolor sit</h2>
                <p className="lg:text-desc">
                  Коллекция ERA воплощает гармонию современного дизайна и классических традиций. Элегантные формы,
                  высококачественные материалы и инновационные технологии создают идеальный баланс между эстетикой и
                  функциональностью. Каждая деталь этой коллекции отражает стремление к совершенству и долговечности,
                  предлагая стильные решения для ванной комнаты, которые подходят для самых разных интерьеров.
                </p>
              </div>
              <div className="xl:pt-0 pt-10">
                <Link href={"/"} className="text-desc border-b border-black">
                  Посмотреть
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-24">
          <div>
            <h2 className="lg:text-h2 text-h2Lg">Здесь будут коллекции</h2>
            <p className="lg:text-desc py-7">
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim,{" "}
            </p>
          </div>
          <div>
            <Collections images={imagesCollections} />
          </div>
          <div className="flex justify-center items-center pt-16">
            <Link href={"/"} className="lg:max-w-[466px] max-w-[325px] w-full lg:h-[89px] h-[55px]">
              <Button className="max-w-[466px] w-full lg:h-[89px] h-[55px] flex justify-center items-center rounded-none bg-[#3E3E3E] text-xl underline">
                Смотреть
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-24">
          <div className="flex xl:flex-row flex-col-reverse gap-5">
            <ImageBlock />
            {/* <div className="flex gap-5">
              <div className="max-w-[520px] w-full max-h-[520px] h-full">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={images[0].width}
                height={images[0].height}
                className={images[0].className}
              />
              </div>
              <div className="flex flex-col gap-5">
                <div className="max-w-[250px] w-full max-h-[250px] h-full">
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  width={images[1].width}
                  height={images[1].height}
                  className={images[1].className}
                />
                </div>
                <div className="max-w-[250px] w-full max-h-[250px] h-full">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  width={images[2].width}
                  height={images[2].height}
                  className={images[2].className}
                />
                </div>
              </div>
            </div> */}
            <div className="xl:max-w-[400px] w-full flex flex-col justify-between">
              <div>
                <h2 className="lg:text-h2 text-h2Lg">Lorem ipsum dolor</h2>
                <p className="lg:text-desc pt-[45px]">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur.
                </p>
              </div>
              <div className="xl:pt-0 pt-11">
                <Link href={"/"} className="text-desc border-b">Сupidatat</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
