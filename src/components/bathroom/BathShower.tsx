import Link from "next/link";
import Image from "next/image";
// import type { ImageBlockData } from "../../app/admin/contexts/SectionsContext";

interface BathSectionProps {
  title: string;
  description: string;
  image: string;
  link?: { url: string; text: string; };
  images?: { src: string; alt: string; }[];
  reverse?: boolean;
}

export default function BathShower({ title, description, link, images = [] }: BathSectionProps) {
  return (
    <section>
      <div className="max-w-1440 mx-auto lg:px-24 px-5 pt-48">
        <div>
          <h2 className="lg:text-h2 text-h2Lg">{title}</h2>
          <p className="lg:text-desc pt-6">{description}</p>
        </div>
        <div>
          <div className="flex gap-5 pt-20">
            <div className="flex gap-5">
              {images?.slice(0, 3).map((image, index) => (
                <div key={index} className="max-w-[434px] w-full max-h-[434px] h-full gap-5">
                  <Image src={image.src || "/img/fallback-image.png"} alt={image.alt} width={434} height={434} />
                </div>
              ))}
            </div>
          </div>
          {link && (
            <div className="text-center">
              <Link href={link.url} className="text-desc border-b border-black">
                {link.text}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
