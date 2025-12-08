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
import { distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';

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

  private translate = inject(TranslateService);

  private languageService = inject(LocalizationService);

  private seoHelper = inject(SEOHelperService);

  private destroy$ = new Subject<void>();

  private separatedSeoTags = inject(SeparatedSeoTags);

  currentLang$ = this.languageService.getLanguage();

  isLoading = signal<boolean>(true);

  slug: string = '';

  seo = signal<SeoITags>({} as SeoITags);

  currentPageUrl: string = '';

  getSlug() {
    this.route.params.pipe(distinctUntilChanged()).subscribe((next) => {
      this.slug = next['slug'];
    });
  }

  blogsData = signal<IBlog | null>(null);

  ngOnInit() {
  // دمج تغييرات اللغة والـ route params
  this.route.params
    .pipe(
      switchMap((params) => {
        this.slug = params['slug']; // حدث الـ slug
        return this.languageService.getLanguage(); // ارجع Observable اللغة
      }),
      switchMap((lang) => this.blogService.getBlogBySlug(this.slug, lang)),
      takeUntil(this.destroy$)
    )
    .subscribe((res) => {
      this.blogsData.set(res);
      this.isLoading.set(false);
      this.validateAndRedirectUrl();
      this.separatedSeoTags.getSeoTagsDirect(
        this.blogsData()?.article.seo_tags ?? {} as SeoITags,
        this.blogsData()?.article.image_url ?? '',
        this.blogsData()?.article.slug ?? ''
      );
    });
}


  openPopup(event: MouseEvent, url: string | null | undefined) {
    event.preventDefault();

    const options =
      'height=500,width=600,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes';
if(url) {
  window.open(url, 'share-popup', options);
}
  }

  /**
   * Validates if the current URL matches the correct language-slug combination
   * and redirects to the proper URL if there's a mismatch to avoid duplicate content
   */
  private validateAndRedirectUrl(): void {
  if (!this.isBrowser || !this.blogsData()) return;

  const currentLang = this.languageService.getCurrentLanguage();
  const currentSlugDecoded = decodeSlugFromUrl(this.slug);
  const expectedSlug = this.blogsData()?.article.slug ?? '';
  const otherSlug = this.blogsData()?.article.other_slug ?? '';

  const arabicRegex = /[\u0600-\u06FF]/;
  const isCurrentSlugArabic = arabicRegex.test(currentSlugDecoded);
  const isExpectedSlugArabic = arabicRegex.test(expectedSlug);

  const shouldRedirect =
    (currentLang === 'ar' && !isCurrentSlugArabic && isExpectedSlugArabic) ||
    (currentLang === 'en' && isCurrentSlugArabic && !isExpectedSlugArabic) ||
    currentSlugDecoded !== expectedSlug;

  if (shouldRedirect) {
    let correctSlug = expectedSlug;
    const isOtherSlugArabic = arabicRegex.test(otherSlug);
    if (currentLang === 'ar' && isOtherSlugArabic) correctSlug = otherSlug;
    if (currentLang === 'en' && !isOtherSlugArabic) correctSlug = otherSlug;

    // منع إعادة التوجيه لو المستخدم رايح للـ home
    if (this.router.url.includes('/blogs')) {
      this.router.navigate(['/', currentLang, 'blogs', correctSlug], {
        replaceUrl: true,
      });
    }
  }
}

} 