import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { decodeSlugFromUrl } from '@shared/functions/decodeUrl';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { distinctUntilChanged, Subject, Subscription, switchMap, takeUntil } from 'rxjs';

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

  private currentLang$ = inject(LocalizationService).getLanguage();

  private languageService = inject(LocalizationService);

  private langSubscription?: Subscription;

  private platformId = inject(PLATFORM_ID);

  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private separatedSeoTags = inject(SeparatedSeoTags);

  sectorSlug: ISectorSlug = {} as ISectorSlug;

  slug: string = '';

  modalType: Type = {} as Type;

  isLoading = signal<boolean>(true);

  getSlug() {
    this.route.params.pipe(distinctUntilChanged()).subscribe((next) => {
      this.slug = next['slug'];
    });
  }

  ngOnInit() {
    this.getSlug();

    this.languageService
      .getLanguage()
      .pipe(
        switchMap((lang) => this.sectorsService.getSectorsBySlug(this.slug, lang)),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.sectorSlug = res;
        this.isLoading.set(false);

        // Validate and redirect if URL doesn't match the correct language-slug combination
        this.validateAndRedirectUrl();
        // Handle SEO
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

  showModal = false;

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
        '<img loading="lazy" src="/images/left.webp" alt="arrow" class="w-[63px]" />',
        '<img loading="lazy" src="/images/right.webp" alt="arrow" class="w-[63px]" />',
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

  openModal(id: number) {
    this.getModalType(id);
    this.showModal = true;
  }

  getModalType(id: number): void {
    const type = this.sectorSlug.types.find((t) => t.id === id) as Type;
    this.modalType = type;
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.langSubscription?.unsubscribe();
  }

  @ViewChild('modal') modalRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.showModal) return;
    const target = event.target as Node;
    if (this.modalRef) {
      const contains = this.modalRef.nativeElement.contains(target);
      if (!contains) {
        this.closeModal();
      }
    }
  }

  /**
   * Validates if the current URL matches the correct language-slug combination
   * and redirects to the proper URL if there's a mismatch to avoid duplicate content
   */
  private validateAndRedirectUrl(): void {
    if (!this.isBrowser || !this.sectorSlug) return;

    const currentLang = this.languageService.getCurrentLanguage();
    const currentSlug = this.slug;
    const currentSlugDecoded = decodeSlugFromUrl(currentSlug);
    const expectedSlug = this.sectorSlug.slug;
    const otherSlug = this.sectorSlug.other_slug;

    const arabicRegex = /[\u0600-\u06FF]/;
    const isCurrentSlugArabic = arabicRegex.test(currentSlugDecoded);
    const isExpectedSlugArabic = arabicRegex.test(expectedSlug);

    // Check if current URL has the wrong language-slug combination
    const shouldRedirect =
      // Case 1: Current language is Arabic but slug is English
      (currentLang === 'ar' && !isCurrentSlugArabic && isExpectedSlugArabic) ||
      // Case 2: Current language is English but slug is Arabic
      (currentLang === 'en' && isCurrentSlugArabic && !isExpectedSlugArabic) ||
      // Case 3: Slug doesn't match the expected slug for current language
      currentSlugDecoded !== expectedSlug;

    if (shouldRedirect) {
      // Determine the correct slug based on current language
      let correctSlug: string;

      if (currentLang === 'ar' && isExpectedSlugArabic) {
        correctSlug = expectedSlug;
      } else if (currentLang === 'en' && !isExpectedSlugArabic) {
        correctSlug = expectedSlug;
      } else {
        // Use other_slug if it matches the current language
        const isOtherSlugArabic = arabicRegex.test(otherSlug);
        if (currentLang === 'ar' && isOtherSlugArabic) {
          correctSlug = otherSlug;
        } else if (currentLang === 'en' && !isOtherSlugArabic) {
          correctSlug = otherSlug;
        } else {
          correctSlug = expectedSlug;
        }
      }

      // Navigate to the correct URL
      this.router.navigate(['/', currentLang, 'sectors', correctSlug], {
        replaceUrl: true, // Replace current URL in history to avoid back button issues
      });
    }
  }
}
