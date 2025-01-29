import Image from "next/image";

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ImageBlock() {
  const images: ImageData[] = [
    {
      src: "/img/item10.png",
      alt: "image",
      width: 520,
      height: 518,
      className: "",
    },
    {
      src: "/img/item11.png",
      alt: "image",
      width: 250,
      height: 250,
      className: "",
    },
    {
      src: "/img/item12.png",
      alt: "image",
      width: 250,
      height: 250,
      className: "",
    },
  ];
  return (
    <div className="flex gap-5">
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
    </div>
  );
}
