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
  title?: string;
  description?: string;
  link?: {
    name: string;
    url: string;
  };
  images?: (string | ImageObject)[];
  images_block?: ImageBlockItem[];
}

export interface SectionsData {
  [key: string]: Section;
}
