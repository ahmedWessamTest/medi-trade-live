import { SeoITags } from '@core/interface/common';

export interface ISectors {
  sectors: ISector[];
  seo_tags: SeoITags;
  sectors_body: string;
  contact_image: string;
  banner_image: string;
}

export interface ISector {
  id: number;
  slug: string;
  title: string;
  image_url: string;
  image_alt: string;
  content: string;
}
