import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoITags } from '@core/interface/common';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import { SEOHelperService } from '@core/services/seo-helper.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { IBlog } from '@features/blogs/interface/blog';
import { BlogService } from '@features/blogs/services/blog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { ImageBannerSkeletonComponent } from '@shared/components/skeleton-loader/image-banner-skeleton/image-banner-skeleton.component';
import { SkeletonLoaderMediaComponent } from '@shared/components/skeleton-loader/skeleton-loader-media/skeleton-loader-media.component';
import { decodeSlugFromUrl } from '@shared/functions/decodeUrl';

import {
  map,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  combineLatestWith,
  Subject
} from 'rxjs';

@Component({
  selector: 'app-blog-id',
  imports: [
    Banner,
    BannerSkeletonComponent,
    CustomSanitizePipe,
    ImageBannerSkeletonComponent,
    RouterLink,
    SkeletonLoaderMediaComponent,
    TranslatePipe,
    AsyncPipe,
  ],
  templateUrl: './blog-id.html',
  styleUrl: './blog-id.css',
})
export class BlogId {

  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private languageService = inject(LocalizationService);
  private separatedSeoTags = inject(SeparatedSeoTags);

  private destroy$ = new Subject<void>();

  isLoading = signal(true);
  blogsData = signal<IBlog | null>(null);
  slug = '';

  ngOnInit() {
    const slug$ = this.route.params.pipe(
      map(p => p['slug']),
      distinctUntilChanged()
    );

    slug$
      .pipe(
        combineLatestWith(this.languageService.getLanguage()),
        switchMap(([slug, lang]) => {
          this.slug = slug;
          return this.blogService.getBlogBySlug(slug, lang).pipe(
            map(res => ({ res, slug, lang }))
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ res, slug, lang }) => {
        this.blogsData.set(res);
        this.isLoading.set(false);

        this.validateAndRedirectUrl();

        this.separatedSeoTags.getSeoTagsDirect(
          res.article.seo_tags,
          res.article.image_url,
          res.article.slug
        );
      });
  }

  /**
   * Fix mixed slugs: Arabic slug in EN mode or English slug in AR mode
   */
  private validateAndRedirectUrl(): void {
    if (!this.isBrowser || !this.blogsData()) return;

    const blog = this.blogsData()!.article;

    const currentSlug = decodeSlugFromUrl(this.slug);
    const expectedSlug = blog.slug ?? '';
    const otherSlug = blog.other_slug ?? '';

    // Arabic letters check
    const hasArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

    const currentLang = this.languageService.getCurrentLanguage();
    const isExpectedArabic = hasArabic(expectedSlug);
    const isOtherArabic = hasArabic(otherSlug);
    const isCurrentArabic = hasArabic(currentSlug);

    /**
     * 0) If slug already matches (correct lang), do nothing
     */
    if (currentSlug === expectedSlug || currentSlug === otherSlug) {
      return;
    }

    /**
     * 1) Decide which slug should be used for this language
     */
    let correctSlug = expectedSlug;

    if (currentLang === 'ar') {
      correctSlug = isExpectedArabic ? expectedSlug : otherSlug;
    } else {
      correctSlug = !isExpectedArabic ? expectedSlug : otherSlug;
    }

    /**
     * 2) Redirect safely
     */
    this.router.navigate(['/', currentLang, 'blogs', correctSlug], {
      replaceUrl: true,
    });
  }

  openPopup(event: MouseEvent, url: string | null | undefined) {
    event.preventDefault();
    if (!url) return;

    const options =
      'height=500,width=600,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes';

    window.open(url, 'share-popup', options);
  }
}
