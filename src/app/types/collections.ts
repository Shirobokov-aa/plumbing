export interface CollectionItem {
  id?: number;
  title: string;
  desc: string;
  image: string;
  link: string;
  flexDirection: "xl:flex-row" | "xl:flex-row-reverse";
}

export interface ImageData {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
}

export interface Section {
  title: string;
  description: string;
  image?: string | null;
  images?: ImageData[];
  link?: {
    text: string;
    url: string;
  };
  titleDesc?: string;
  descriptionDesc?: string;
}

export interface CollectionDetail {
  id: number;
  name: string;
  slug: string;
  banner: {
    title: string;
    description: string;
    image: string | null;
    link?: {
      text: string;
      url: string;
    };
  };
  sections: Section[];
  sections2: Section[];
  sections3: Section[];
  sections4: Section[];
}

export type CollectionDetailItem = CollectionDetail;

export interface ImageBlockData {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
}

export interface SectionsData {
  "section-1": {
    title: string;
    description: string;
    link: { name: string; url: string };
    images_block: { src: string; alt: string; desc: string }[];
    images: string[];
  };
  "section-2": {
    images: string[];
    link: { name: string; url: string };
  };
  "section-3": {
    title: string;
    description: string;
    link: { name: string; url: string };
    images: string[];
  };
  "section-4": {
    title: string;
    description: string;
    link: { name: string; url: string };
    images_block: { src: string; alt: string; desc: string; url: string }[];
  };
  "section-5": {
    title: string;
    description: string;
    link: { name: string; url: string };
    images_block: { src: string; alt: string; desc: string }[];
  };
}
