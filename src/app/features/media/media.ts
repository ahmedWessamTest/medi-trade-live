import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { TranslatePipe } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { ContactForm } from '@shared/components/contact-form/contact-form';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { ContactUsFormSkeletonloaderComponent } from '@shared/components/skeleton-loader/contact-us-form-skeletonloader/contact-us-form-skeletonloader.component';
import { SkeletonLoaderMediaComponent } from '@shared/components/skeleton-loader/skeleton-loader-media/skeleton-loader-media.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IMedia } from './interface/media';
import { MediaService } from './services/media-service';

@Component({
  selector: 'app-media',
  imports: [
    Banner,
    BannerSkeletonComponent,
    TranslatePipe,
    ContactForm,
    ContactUsFormSkeletonloaderComponent,
    CarouselModule,
    SkeletonLoaderMediaComponent,
  ],
  templateUrl: './media.html',
  styleUrl: './media.css',
})
export class Media implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  private currentLang$ = inject(LocalizationService).getLanguage();

  private separatedSeoTags = inject(SeparatedSeoTags);

  private mediaService = inject(MediaService);

  isLoading: WritableSignal<boolean> = signal(true);

  media!: IMedia;

  currentLang = signal<string>('ar');

  carouselOptionsImages = computed<OwlOptions>(() => {
    const isRtl = this.currentLang() === 'ar';
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      nav: false,
      navSpeed: 800,
      rtl: isRtl,

      responsive: {
        0: {
          items: 1,
        },
        740: {
          items: 2,
        },
        940: {
          items: 3,
        },
      },
      margin: 31,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: false,
      smartSpeed: 600,
    };
  });
  carouselOptionsVideos = computed<OwlOptions>(() => {
    const isRtl = this.currentLang() === 'ar';
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      nav: false,
      navSpeed: 800,
      rtl: isRtl,

      responsive: {
        0: {
          items: 1,
        },
        740: {
          items: 2,
        },
        940: {
          items: 3,
        },
      },
      margin: 31,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: false,
      smartSpeed: 600,
    };
  });

  ngOnInit(): void {
    this.getMedia();
  }

  getMedia(): void {
    this.isLoading.set(true);
    this.currentLang$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((lang) => {
      this.mediaService.getMedia(lang).subscribe((next) => {
        this.media = next;
        this.isLoading.set(false);
        this.separatedSeoTags.getSeoTagsDirect(
          this.media.seo_tags,
          this.media.banner_image,
          'media'
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
