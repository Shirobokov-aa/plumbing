export interface ImageBlockItem {
  src: string;
  alt: string;
  desc?: string;
  url?: string;
}

export interface BathroomSection {
  title: string;
  description: string;
  link?: {
    text: string;
    url: string;
  };
  images?: string[];
  images_block?: ImageBlockItem[];
}

export interface BathroomPageData {
  section1: BathroomSection;
  section2: BathroomSection;
  section3: BathroomSection;
  section4: BathroomSection;
}

export interface BathroomPage {
  id: number;
  data: BathroomPageData;
}
