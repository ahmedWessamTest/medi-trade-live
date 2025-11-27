import { SeoITags } from '@core/interface/common';

export interface IBlog {
  article: Article;
  related: Related[];
}

export interface Article {
  slug: string;
  title: string;
  image_url: string;
  body_html: string;
  published_at: string;
  other_slug: string;
  share: Share;
  seo_tags: SeoITags;
}

export interface Share {
  facebook: string;
  instagram: string;
  linkedin: string;
  whatsapp: string;
}

export interface Meta {
  title: string;
  description: string;
  script_1: any;
  script_2: any;
}

export interface Related {
  slug: string;
  title: string;
  body: string;
  image_url: string;
  image_alt: string;
  meta: Meta2;
}

export interface Meta2 {
  title: string;
  description: string;
  script_1: any;
  script_2: any;
  image_alt: string;
}
