interface ImageObject {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface ImageBlockItem {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
}

export interface Section {
  title: string;
  description: string;
  link: {
    text: string;
    url: string;
  };
  images: {
    src: string;
    alt: string;
  }[];
  images_block?: ImageBlockItem[];
}

export type SectionsData = Record<string, {
  title?: string;
  description?: string;
  link?: { name: string; url: string };
  images_block?: { src: string; alt: string; desc: string }[];
  images?: string[];
}>

export interface SectionItem {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export interface SectionsData {
  sections: SectionItem[];
}
