import { SeoITags } from '@core/interface/common';
import { IBlog } from '@features/blogs/interface/blogs';

export interface IHome {
  data: Data;
}

export interface Data {
  hero: IHero;
  about: IAbout;
  sectors_body: string;
  sectors: Sector[];
  why: string;
  whyReasons: WhyReason[];
  partnersCategories: IPartnersCategory[];
  media: IMedia[];
  iso: ISO;
  articles: IBlog[];
  seo_tags: SeoITags;
  cotactImage: string;
}
export interface IPartnersCategory {
  id: number;
  title: string;
  position: number;
  partners: Partner[];
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
  position: number;
}

export interface IHero {
  title: string;
  description: string;
  video_url: string;
}

export interface IAbout {
  title: string;
  body: string;
  image_url: string;
  tabs: Tab[];
}

export interface Tab {
  title: string;
  body: string;
  position: number;
}

export interface Sector {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  meta: Meta;
}

export interface WhyReason {
  id: number;
  title: string;
  body: string;
  position: number;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
  position: number;
}

export interface IMedia {
  image_path: string;
  position: number;
}

export interface ISO {
  title: string;
  description: string;
  image: string;
}
export interface Meta {
  title: string;
  description: string;
  script_1: any;
  script_2: any;
  image_alt: string;
}
