import { inject, Injectable } from '@angular/core';
import { SeoITags as Seotag } from '@core/interface/common';
import { SEOService } from './seo.service';

@Injectable({
  providedIn: 'root',
})
export class SEOHelperService {
  private seoService = inject(SEOService);

  /**
   * Handle SEO for general pages (about, services, etc.)
   */
  updatePageSEO(seoData: Seotag): void {
    this.seoService.updateSEOFromBackend(seoData);
  }

  /**
   * Handle SEO with fallback to default when no backend data
   */
  updateSEOWithFallback(seoData?: Seotag): void {
    if (seoData && (seoData.meta_title || seoData.meta_description)) {
      this.seoService.updateSEOFromBackend(seoData);
    } else {
      this.seoService.setDefaultSEOTags();
    }
  }
}
