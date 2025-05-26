import { GroupItem } from '@/modules/DetailPage/SectionData';

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
export type TDataDetail = {
  slug: string;
  thumbnail: string;
  groupData: GroupItem[];
  detailsInfo: {
    title: string;
    cue: { title: string; desc: string | string[] }[];
    text: string[];
    tag?: [{ title: string }];
    button: {
      title: string;
      src: string;
    };
  };
  ending: {
    type: 'video' | 'images';
    src: string;
  };
  lastText?: string;
};
export type TSizeBtn = 'large' | 'medium' | 'min';

export type ITypeEffect = 'page' | 'work' | 'page_work';
