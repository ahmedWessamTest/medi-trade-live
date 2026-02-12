import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { SectorCard } from '@features/sectors/components/sector-card/sector-card';
import { SectorSuppliersSkeleton } from '@features/sectors/components/sector-suppliers-skeleton';
import { ISectorSlug, Type } from '@features/sectors/interface/sector-slug';
import { SectorsService } from '@features/sectors/services/sectors';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { ImageBannerSkeletonComponent } from '@shared/components/skeleton-loader/image-banner-skeleton/image-banner-skeleton.component';
import { SkeletonSectorCard } from '@shared/components/skeleton-loader/skeleton-sector-card/skeleton-sector-card';
import { ScrollHighlightDirective } from '@shared/directives/scroll-highlight';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { distinctUntilChanged, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { combineLatest } from 'rxjs';
import { TypeModal } from "@features/sectors/components/type-modal/type-modal";

@Component({
  selector: 'app-sector-id',
  imports: [
    Banner,
    ScrollHighlightDirective,
    TranslatePipe,
    SectorCard,
    CarouselModule,
    CustomSanitizePipe,
    ScrollHighlightDirective,
    ImageBannerSkeletonComponent,
    BannerSkeletonComponent,
    SkeletonSectorCard,
    SectorSuppliersSkeleton,
    TypeModal,
    AsyncPipe,
    RouterLink,
    RouterOutlet
],
  templateUrl: './sector-id.html',
  styleUrl: './sector-id.css',
})
export class SectorId {
  constructor() {
    this.langSubscription = this.languageService.getLanguage().subscribe((lang) => {
      this.currentLang.set(lang);
    });
  }

  private destroy$ = new Subject<void>();

  private sectorsService = inject(SectorsService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private translate = inject(TranslateService);


  private languageService = inject(LocalizationService);
  currentLang$ = this.languageService.getLanguage();
  private langSubscription?: Subscription;

  private platformId = inject(PLATFORM_ID);

  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private separatedSeoTags = inject(SeparatedSeoTags);

  sectorSlug: ISectorSlug = {} as ISectorSlug;

  slug: string = '';


  isLoading = signal<boolean>(true);

  getSlug() {
    this.route.params.pipe(distinctUntilChanged()).subscribe((next) => {
      this.slug = next['slug'];
    });
  }

  ngOnInit() {
  combineLatest([
    this.route.params,
    this.languageService.getLanguage()
  ])
  .pipe(
    distinctUntilChanged(), 
    switchMap(([params, lang]) => {
      this.slug = params['slug']; 
      this.isLoading.set(true);  
      const decodedSlug = decodeURIComponent(this.slug);
      return this.sectorsService.getSectorsBySlug(decodedSlug, lang);
    }),
    takeUntil(this.destroy$)
  )
  .subscribe((res) => {
    this.sectorSlug = res;    
    this.isLoading.set(false);
    this.validateAndRedirectUrl();
    
    this.separatedSeoTags.getSeoTagsDirect(
      this.sectorSlug.seo_tags,
      this.sectorSlug.image_url,
      this.sectorSlug.slug
    );
  });
}

  customTranslate(path: string) {
    return this.translate.instant(path) + ' - ' + this.sectorSlug.title;
  }


  currentLang = signal<string>('ar');

  customOptions = computed<OwlOptions>(() => {
    const isRtl = this.currentLang() === 'ar';
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      nav: true,
      navSpeed: 800,
      rtl: isRtl,
      navText: [
        '<img loading="lazy" src="/images/left.webp" alt="arrow" class="w-[3.9375rem]" />',
        '<img loading="lazy" src="/images/right.webp" alt="arrow" class="w-[3.9375rem]" />',
      ],
      responsive: {
        0: {
          items: 1,
        },
      },
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: false,
      margin: 0,
      smartSpeed: 600,
    };
  });

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.langSubscription?.unsubscribe();
  }

  /**
   * Validates if the current URL matches the correct language-slug combination
   * and redirects to the proper URL if there's a mismatch to avoid duplicate content
   */
  private validateAndRedirectUrl(): void {
  if (!this.isBrowser || !this.sectorSlug || this.route.firstChild) return;

  const currentLang = this.languageService.getCurrentLanguage();
  
  const currentSlugDecoded = decodeURIComponent(this.slug);
  
  const expectedSlug = this.sectorSlug.slug;
  const otherSlug = this.sectorSlug.other_slug;

  const arabicRegex = /[\u0600-\u06FF]/;
  const isCurrentSlugArabic = arabicRegex.test(currentSlugDecoded);
  const isExpectedSlugArabic = arabicRegex.test(expectedSlug);

  // 3. تحديد هل نحتاج لتحويل المسار؟
  const shouldRedirect =
    (currentLang === 'ar' && !isCurrentSlugArabic && isExpectedSlugArabic) ||
    (currentLang === 'en' && isCurrentSlugArabic && !isExpectedSlugArabic) ||
    currentSlugDecoded !== expectedSlug;

  if (shouldRedirect) {
    let correctSlug: string;

    // اختيار الـ Slug المناسب بناءً على اللغة الحالية
    if (currentLang === 'ar') {
      correctSlug = isExpectedSlugArabic ? expectedSlug : otherSlug;
    } else {
      correctSlug = !isExpectedSlugArabic ? expectedSlug : otherSlug;
    }

    // 4. التنفيذ: نمرر الـ slug كما هو (نص) والـ Router سيهتم بالـ Encoding
    this.router.navigate(['/', currentLang, 'sectors', correctSlug], {
      replaceUrl: true,
    });
  }
}
}
