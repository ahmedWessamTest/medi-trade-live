import { SeoITags } from '@core/interface/common';

export interface IMedia {
  images: Image[];
  videos: Video[];
  seo_tags: SeoITags;
  contact_image: string;
  banner_image: string;
}

export interface Image {
  id: number;
  type: string;
  image_url: string;
  position: number;
}

export interface Video {
  id: number;
  type: string;
  video_url: string;
  thumb_url: string;
  position: number;
}

export interface SeoTags {
  meta_title: string;
  meta_description: string;
  script_1: string;
  script_2: string;
  image_alt: string;
}
