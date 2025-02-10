export interface CollectionItem {
  id?: number;
  title: string;
  desc: string;
  image: string;
  link: string;
  flexDirection: "xl:flex-row" | "xl:flex-row-reverse";
}

export interface ImageData {
  src: string | null;
  alt?: string;
  desc?: string;
  url?: string;
}

export interface Section {
  title: string;
  description: string;
  image?: string | null;
  images?: ImageData[];
}

export interface CollectionDetail {
  id: number;
  name: string;
  banner: {
    title: string;
    description: string;
    image: string | null;
    link?: { text: string; url: string };
  };
  sections: Section[];
  sections2: Section[];
  sections3: Section[];
  sections4: Section[];
}

export interface ImageBlockData {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
}
