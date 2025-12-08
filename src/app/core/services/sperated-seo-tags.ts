import { inject, Injectable } from '@angular/core';
import { SeoITags } from '@core/interface/common';
import { SEOHelperService } from './seo-helper.service';

@Injectable({
  providedIn: 'root',
})
export class SeparatedSeoTags {
  private seoHelper = inject(SEOHelperService);
  getSeoTagsDirect(seoTags: SeoITags, imageUrl: string, pageName: string) {
    // / Handle SEO
    if (seoTags) {
      const seo: SeoITags = {
        meta_title: seoTags.meta_title,
        meta_description: seoTags.meta_description,
        page_name: pageName,
        image_alt: seoTags.meta_title,
        image_url: imageUrl,
      };
      this.seoHelper.updatePageSEO(seo);
    } else {
      this.seoHelper.updateSEOWithFallback();
    }
  }
}
