export type IAnimationElement =
  | HTMLDivElement
  | HTMLElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLHeadElement
  | HTMLLinkElement
  | HTMLButtonElement
  | SVGSVGElement;

export type TDataWorkItem = {
  id: number;
  slug: string;
  title: string;
  thumbnail: string;
  effectImg: string;
  tag: string;
};

export type TDataService = {
  number: string;
  icon: string;
  title: string;
  lottie: string;
  description: string;
};

export type TDataCommunication = {
  number: string;
  title: string;
  thumbnail: string;
  description: string;
  href: string;
};
export type TImages = {
  alt: string;
  src: string;
}[];

export type TSizeBtn = 'large' | 'medium' | 'min';

export type ITypeEffect = 'page' | 'work' | 'page_work';
