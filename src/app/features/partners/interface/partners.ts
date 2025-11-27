import { SeoITags } from '@core/interface/common';

export interface IPartners {
  data: IPartnersCategory[];
  banner: string;
  contactImage: string;
  seo_tags: SeoITags;
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
