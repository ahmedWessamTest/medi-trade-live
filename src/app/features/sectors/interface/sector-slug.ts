import { SeoITags } from '@core/interface/common';

export interface ISectorSlug {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  banner_url: string;
  image_alt: string;
  other_slug: string;
  types: Type[];
  supplies: Supply;
  seo_tags: SeoITags;
  others: Other[];
  contact_image: string;
}

export interface Type {
  id: number;
  title: string;
  body?: string;
  main_image: string;
  images: string[];
  position: number;
}

export interface Supply {
  id: number;
  image_url: string;
  body: string;
  gov_entities: any[];
  position: number;
}

export interface Other {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  image_alt: string;
  content: string;
}
