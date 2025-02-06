import Image from "next/image";

interface ImageBlockItem {
  src: string;
  alt: string;
  desc?: string;
}

export default function ImageBlock({ images }: { images: ImageBlockItem[] }) {
  return (
    <div className="xl:max-w-[840px] w-full flex flex-col gap-5">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <Image
            src={image.src}
            alt={image.alt}
            width={466}
            height={466}
            className="object-cover"
          />
          {image.desc && (
            <div className="absolute bottom-0 left-0 w-full p-5">
              <p className="text-white">{image.desc}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
