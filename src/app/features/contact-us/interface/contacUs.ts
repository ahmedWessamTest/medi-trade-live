import { SeoITags } from '@core/interface/common';

export interface IContactUsPage {
  contact_image: string;
  contact_information: ContactInformation;
  seo_tags: SeoITags;
  banner_image: string;
}

export interface ContactInformation {
  email: string;
  phone_number: string;
  whatsapp_number: string;
}
