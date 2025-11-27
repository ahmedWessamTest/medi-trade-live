import { SeoITags } from '@core/interface/common';

export interface IBlogs {
  data: IBlog[];
  links: Links;
  meta: Meta2;
  seo_tags: SeoITags;
  contact_image: string;
  banner_image: string;
}

export interface IBlog {
  slug: string;
  title: string;
  body: string;
  image_url: string;
  image_alt: string;
  meta: Meta;
}

export interface Meta {
  title: string;
  description: string;
  script_1: any;
  script_2: any;
  image_alt: string;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: string;
}

export interface Meta2 {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  page?: number;
  active: boolean;
}
