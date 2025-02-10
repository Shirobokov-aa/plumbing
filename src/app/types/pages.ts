export interface BathroomPage {
  banner: {
    name: string;
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string };
  };
  sections: Array<{
    title: string;
    description: string;
    link: { text: string; url: string };
    images: Array<{ src: string; alt: string; }>;
  }>;
  collections: Array<{
    title: string;
    description: string;
    link: { text: string; url: string };
    images: Array<{ src: string; alt: string; }>;
  }>;
}

export interface KitchenPage {
  banner: {
    name: string;
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string };
  };
  sections: Array<{
    title: string;
    description: string;
    link: { text: string; url: string };
    images: Array<{ src: string; alt: string; }>;
  }>;
  collections: Array<{
    title: string;
    description: string;
    link: { text: string; url: string };
    images: Array<{ src: string; alt: string; }>;
  }>;
}

export interface AboutPage {
  banner: {
    name: string;
    image: string;
    title: string;
    description: string;
    link: { text: string; url: string };
  };
  sections: Array<{
    title: string;
    description: string;
  }>;
}
