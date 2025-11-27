import { SeoITags } from '@core/interface/common';
import { ISO } from '@features/home/interface/home';

export interface IAboutUs {
  data: IAboutUsData;
}

export interface IAboutUsData {
  banner: string;
  title: string;
  body: string;
  image_url: string;
  small_body: string;
  iso: ISO;
  tabs: Tab[];
  sectors_body: string;
  sectors: Sector[];
  why: string;
  whyReasons: WhyReason[];
  contactImage: string;
  seo_tags: SeoITags;
}

export interface Tab {
  id: number;
  title: string;
  body: string;
  position: number;
}

export interface Sector {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  image_alt: any;
  meta: Meta;
}

export interface Meta {
  title: any;
  description: any;
  script_1: any;
  script_2: any;
  image_alt: any;
}

export interface WhyReason {
  id: number;
  title: string;
  body: string;
  position: number;
}
