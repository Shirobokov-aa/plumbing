import { useMemo, useEffect } from "react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Collections from "./blocks/collections";
import { Button } from "@/components/ui/button";
import ImageBlock from "./blocks/image-block";
import { useSections } from "@/app/admin/contexts/SectionsContext";

export default function Main() {
  const { sections } = useSections()

  useEffect(() => {
    console.log('Section 1 images:', sections?.["section-1"]?.images);
    console.log('Section 1 images_block:', sections?.["section-1"]?.images_block);
    console.log('Section 2 images:', sections?.["section-2"]?.images);
    console.log('Section 3 images:', sections?.["section-3"]?.images);
    console.log('Section 4 images_block:', sections?.["section-4"]?.images_block);
    console.log('Section 5 images_block:', sections?.["section-5"]?.images_block);
    console.log('Section 1 images detail:', JSON.stringify(sections?.["section-1"]?.images, null, 2));
  }, [sections]);

  const imagesForCollections = useMemo(() => {
    if (!sections || !sections["section-4"] || !sections["section-4"].images_block) {
      console.log('⚠️ Нет данных для section-4')
      return []
    }

    return sections["section-4"].images_block.map((item) => ({
      src: item.src,
      alt: item.alt || "",
      desc: item.desc || "",
      url: item.url || "",
    })) || []
  }, [sections])

  console.log('🎯 Секции в Main:', sections)

  if (!sections || Object.keys(sections).length === 0) {
    console.log('⏳ Данные еще не загружены')
    return <div>Загрузка...</div>
  }

  // Преобразуем строки в объекты с размерами
  const section1Images = sections["section-1"].images?.map(img => 
    typeof img === 'string' ? {
      src: img,
      alt: "Image",
      width: 570,
      height: 500
    } : img
  );

  const section2Images = sections["section-2"].images?.map(img => 
    typeof img === 'string' ? {
      src: img,
      alt: "Image",
      width: 1240,
      height: 780
    } : img
  );

  const section3Images = sections["section-3"].images?.map(img => 
    typeof img === 'string' ? {
      src: img,
      alt: "Image",
      width: 526,
      height: 526
    } : img
  );

  return (
    <main>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-10">
          <div className="flex xl:flex-row flex-col lg:gap-20 gap-10">
            <div className="flex flex-col justify-between">
              <div className="max-w-[520px] flex flex-col gap-14">
                <h2 className="lg:text-h2 text-h2Lg">{sections["section-1"].title}</h2>
                <p className="text-desc">{sections["section-1"].description}</p>
              </div>
              <div className="flex xl:flex-col flex-col pt-5 gap-10">
                <div>
                  <Link
                    href={`${sections["section-1"].link?.url}`}
                    className="text-desc border-b border-black"
                  >
                    {sections["section-1"].link?.name}
                  </Link>
                </div>
                <div className="flex justify-between xl:gap-20 gap-5">
                  {sections["section-1"].images_block?.map((item, index) => (
                    <div key={index} className="xl:max-w-[270px] w-full xl:max-h-[270px] h-full">
                      <Image
                        src={item.src || "/img/fallback-image.png"}
                        alt={item.alt || "Fallback image"}
                        width={270}
                        height={270}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full h-full flex justify-center items-center">
                {sections["section-1"]?.images?.[0] && (
                  typeof sections["section-1"].images[0] === 'string' ? (
                    <Image
                      src={sections["section-1"].images[0]}
                      alt="Banner image"
                      width={570}
                      height={500}
                      className="object-contain"
                    />
                  ) : (
                    <Image
                      src={sections["section-1"].images[0].src}
                      alt={sections["section-1"].images[0].alt || "Banner image"}
                      width={sections["section-1"].images[0].width || 570}
                      height={sections["section-1"].images[0].height || 500}
                      className="object-contain"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="lg:block hidden max-w-1440 mx-auto lg:px-24 px-5 pt-24">
          <div className="relative w-full xl:h-[780px]">
            <Image
              src={sections["section-2"].images?.[0] || "/img/fallback-image.png"}
              alt="Banner image"
              width={1240}
              height={780}
              className="object-contain"
            />
            <Link href={`${sections["section-2"].link?.url}`} className="">
              <div className="absolute top-24 left-0 lg:py-9 py-7 lg:px-[150px] px-24 bg-[#1E1E1E] text-white">
                <h2 className="lg:text-xl font-light border-b border-b-white">
                  {sections["section-2"].link?.name}
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-24">
          <div className="flex xl:flex-row flex-col-reverse xl:gap-24 gap-5">
            <div className="xl:max-w-[526px] w-full">
              <Image
                src={sections["section-3"].images?.[0] || "/img/fallback-image.png"}
                alt="Section image"
                width={526}
                height={526}
                className="object-contain"
              />
            </div>
            <div className="xl:max-w-[614px] w-full flex flex-col justify-between">
              <div className="flex flex-col gap-11">
                <h2 className="lg:text-h2 text-h2Lg">{sections["section-3"].title}</h2>
                <p className="lg:text-desc">{sections["section-3"].description}</p>
              </div>
              <div className="xl:pt-0 pt-10">
                <Link href={`${sections["section-3"].link?.url}`} className="text-desc border-b border-black">
                  {sections["section-3"].link?.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-24">
          <div>
            <h2 className="lg:text-h2 text-h2Lg">{sections["section-4"].title}</h2>
            <p className="lg:text-desc py-7">{sections["section-4"].description}</p>
          </div>
          <div>
            <Collections images={imagesForCollections} />
          </div>
          <div className="flex justify-center items-center pt-16">
            <Link
              href={`${sections["section-4"].link?.url}`}
              className="lg:max-w-[466px] max-w-[325px] w-full lg:h-[89px] h-[55px]"
            >
              <Button className="max-w-[466px] w-full lg:h-[89px] h-[55px] flex justify-center items-center rounded-none bg-[#3E3E3E] text-xl underline">
                {sections["section-4"].link?.name}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-24">
          <div className="flex xl:flex-row flex-col-reverse gap-5">
            <ImageBlock images={sections["section-5"].images_block ?? []} />
            <div className="xl:max-w-[400px] w-full flex flex-col justify-between">
              <div>
                <h2 className="lg:text-h2 text-h2Lg">{sections["section-5"].title}</h2>
                <p className="lg:text-desc pt-[45px]">{sections["section-5"].description}</p>
              </div>
              <div className="xl:pt-0 pt-11">
                <Link href={`${sections["section-5"].link?.url}`} className="text-desc border-b">
                  {sections["section-5"].link?.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
