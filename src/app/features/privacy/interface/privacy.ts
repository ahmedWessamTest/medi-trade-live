export interface IPrivacyPolicy {
  privacy_policy: string;
  seo_tags: SeoTags;
  banner_image: string;
}

export interface SeoTags {
  meta_title: string;
  meta_description: string;
  script_1: string;
  script_2: string;
  image_alt: string;
}
