import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoITags as Seotag } from '@core/interface/common';
import { TranslateService } from '@ngx-translate/core';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  author?: string;
}

export interface SEOConfig {
  updateLinks?: boolean;
  fallbackToDefault?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly defaultImage = '/favicon.ico';
  private readonly baseUrl = 'https://meditrade-eg.com';
  // updateUniversalSEO
  /**
   * Update SEO meta tags with backend Seotag data
   * This is the primary method for backend-driven SEO
   */
  updateSEOFromBackend(
    seoData: Seotag,
    config: SEOConfig = { updateLinks: true, fallbackToDefault: false }
  ): void {
    this.clearExistingMetaTags();

    const title = seoData.meta_title;
    const description = seoData.meta_description;

    if (title || config.fallbackToDefault) {
      this.setTitle(title || this.getDefaultTitle());
    }

    if (description || config.fallbackToDefault) {
      this.setDescription(description || this.getDefaultDescription());
    }

    // Set additional meta tags with default image
    this.setAdditionalMetaTags({ image: this.defaultImage });

    // Update SEO links if requested
    if (config.updateLinks) {
      this.updateSEOLinks();
    }
  }

  /**
   * Update SEO meta tags with legacy SEOData (backward compatibility)
   */
  updateSEOTags(seoData: SEOData | Seotag): void {
    this.clearExistingMetaTags();

    // Handle both SEOData and Seotag interfaces
    const title = this.isSeotag(seoData) ? seoData.meta_title : seoData.title;
    const description = this.isSeotag(seoData) ? seoData.meta_description : seoData.description;

    if (title) {
      this.setTitle(title);
    }

    if (description) {
      this.setDescription(description);
    }

    // Set additional meta tags
    this.setAdditionalMetaTags(seoData);

    // Update SEO links (canonical, alternate, og:url)
    this.updateSEOLinks();
  }

  /**
   * Type guard to check if data is Seotag
   */
  private isSeotag(data: SEOData | Seotag): data is Seotag {
    return 'meta_title' in data || 'meta_description' in data;
  }

  /**
   * Set page title
   */
  private setTitle(title: string): void {
    this.titleService.setTitle(title);

    // Ensure title is set in browser
    if (this.isBrowser) {
      const titleElement = this.document.querySelector('title');
      if (titleElement) {
        titleElement.textContent = title;
      }
    }

    // Set social sharing titles
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'twitter:title', content: title });
  }

  /**
   * Set page description
   */
  private setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({
      property: 'twitter:description',
      content: description,
    });
  }

  private setAdditionalMetaTags(seoData: SEOData | Seotag): void {
    const currentLang = this.translate.currentLang;

    // Set keywords (Arabic only as per your current logic)
    if (currentLang === 'ar') {
      const keywords =
        !this.isSeotag(seoData) && seoData.keywords
          ? seoData.keywords
          : ' ميدي تريد, التصدير, الاستيراد, البضائع العالمية';

      this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    // Set image meta tags
    const imageUrl = this.baseUrl + (!this.isSeotag(seoData) && seoData.image ? seoData.image : this.defaultImage);
    console.log(imageUrl);
    
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'twitter:image', content: imageUrl });

    // Set additional Open Graph tags
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });

    // Set author if provided
    this.meta.updateTag({ name: 'author', type: 'Organization', content: 'MediTrade' });

    this.meta.updateTag({ name: 'publisher', type: 'Organization', content: 'Digital Bond' });
  }

  /**
   * Update SEO links (canonical, alternate, og:url)
   */
  private updateSEOLinks(): void {
    const currentLang = this.translate.currentLang;
    const currentPath = this.router.url;
    const withoutLangPrefix = currentPath.replace(/^\/(ar|en)/, '');
    const cleanSlug = withoutLangPrefix === '/' ? '' : withoutLangPrefix;

    const canonicalUrl = `${this.baseUrl}/${currentLang}${cleanSlug}`;

    this.updateCanonicalLink(canonicalUrl);
    this.updateAlternateLinks(canonicalUrl, cleanSlug);

    // Update og:url
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
  }

  private updateCanonicalLink(url: string): void {
    if (!this.isBrowser) return;

    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    const canonical = this.document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    this.document.head.appendChild(canonical);
  }

  private updateAlternateLinks(currentUrl: string, cleanSlug: string): void {
    if (!this.isBrowser) return;

    // Remove existing alternate links
    const existingAlternates = this.document.querySelectorAll('link[rel="alternate"]');
    existingAlternates.forEach((link) => link.remove());

    const currentLang = this.translate.currentLang;
    const alternateLang = currentLang === 'ar' ? 'en' : 'ar';
    const alternateUrl = `${this.baseUrl}/${alternateLang}${cleanSlug}`;

    // Add x-default (pointing to Arabic version)
    this.addAlternateLink('x-default', `${this.baseUrl}/ar${cleanSlug}`);

    // Add current language alternate
    this.addAlternateLink(currentLang, currentUrl);

    // Add alternate language link
    this.addAlternateLink(alternateLang, alternateUrl);
  }

  private addAlternateLink(hreflang: string, href: string): void {
    if (!this.isBrowser) return;

    const link = this.document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', href);
    this.document.head.appendChild(link);
  }

  private clearExistingMetaTags(): void {
    const tagsToRemove = [
      "name='title'",
      "property='og:title'",
      "property='twitter:title'",
      "name='description'",
      "property='og:description'",
      "property='twitter:description'",
      "property='og:image'",
      "property='twitter:image'",
      "name='keywords'",
      "property='og:url'",
      "property='og:type'",
      "property='twitter:card'",
      "name='author'",
    ];

    tagsToRemove.forEach((tag) => this.meta.removeTag(tag));
  }

  private getDefaultTitle(): string {
    const currentLang = this.translate.currentLang;
    return currentLang === 'ar'
      ? 'ميدي تريد | حلول احترافية للتصدير والاستيراد للبضائع العالمية'
      : 'MediTrade Agency | Professional Export & Import Solutions for Global Goods';
  }

  private getDefaultDescription(): string {
    const currentLang = this.translate.currentLang;
    return currentLang === 'ar'
      ? 'تقدم شركة ميدي تريد خدمات موثوقة في مجال التصدير والاستيراد، حيث نربط الشركات حول العالم بالموردين الموثوقين. نضمن لعملائنا عمليات لوجستية سلسة، وجودة عالية للبضائع، وإدارة احترافية للتجارة الدولية.'
      : 'MediTrade Agency provides trusted export and import services, connecting businesses worldwide with reliable suppliers. We ensure smooth logistics, high-quality goods, and professional trade management across global markets.';
  }

  /**
   * Set default SEO tags for pages without specific SEO data
   */
  setDefaultSEOTags(): void {
    const seoData: Seotag = {
      image_url: this.defaultImage,
      meta_title: this.getDefaultTitle(),
      meta_description: this.getDefaultDescription(),
      page_name: 'default',
    };

    this.updateSEOFromBackend(seoData);
  }
}
