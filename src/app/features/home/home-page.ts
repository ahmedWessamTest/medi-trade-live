import { Component, inject, signal, WritableSignal } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { AboveHoldSkeleton } from '@features/about-us/components/above-hold-skeleton/above-hold-skeleton';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactForm } from '@shared/components/contact-form/contact-form';
import { Cta } from '@shared/components/cta/cta';
import { ContactUsFormSkeletonloaderComponent } from '@shared/components/skeleton-loader/contact-us-form-skeletonloader/contact-us-form-skeletonloader.component';
import { PartnersSkeleton } from '@shared/components/skeleton-loader/partners-skeleton/partners-skeleton';
import { SkeletonLoaderMediaComponent } from '@shared/components/skeleton-loader/skeleton-loader-media/skeleton-loader-media.component';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { About } from './components/about/about';
import { Blog } from './components/blog/blog';
import { DummySkeletonLoader } from './components/hero/components/dummy-skeleton.loader';
import { Hero } from './components/hero/hero';
import { IsoSkeletonLoaderComponent } from './components/iso/components/iso-skeleton-loader/iso-skeleton-loader.component';
import { Iso } from './components/iso/iso';
import { MapSkeletonLoaderComponent } from './components/map/components/map-skeleton-loader/map-skeleton-loader.component';
import { Map } from './components/map/map';
import { Media } from './components/media/media';
import { Partners } from './components/partners/partners';
import { sectorData, SectorsSection } from './components/sectors/sectors';
import { WhyUsSkeletonLoaderComponent } from './components/why-us/components/why-us-skeleton-loader/why-us-skeleton-loader.component';
import { WhyUs } from './components/why-us/why-us';
import { Data } from './interface/home';
import { Home } from './services/home';

@Component({
  selector: 'app-home-page',
  imports: [
    Hero,
    About,
    Iso,
    IsoSkeletonLoaderComponent,
    Map,
    MapSkeletonLoaderComponent,
    WhyUs,
    Partners,
    Cta,
    Media,
    SkeletonLoaderMediaComponent,
    Blog,
    ContactUsFormSkeletonloaderComponent,
    ContactForm,
    PartnersSkeleton,
    SectorsSection,
    AboveHoldSkeleton,
    DummySkeletonLoader,
    WhyUsSkeletonLoaderComponent,
    TranslatePipe,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private destroy$ = new Subject<void>();

  private currentLang$ = inject(LocalizationService).getLanguage();

  private separatedSeoTags = inject(SeparatedSeoTags);

  skeletonData!: { title: string; description: string };

  homeServices = inject(Home);

  currentLang = 'ar';

  homeData!: Data;

  sectorData!: sectorData;

  isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.currentLang$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((lang) => {
      this.homeServices
        .getHome(lang)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.currentLang = lang;
            this.homeData = res.data;
            this.skeletonData = {
              title: res.data.hero.title,
              description: res.data.hero.description,
            };
            if (res.data.sectors) {
              this.sectorData = {
                sectors: res.data.sectors,
                sectors_body: res.data.sectors_body,
              };
            }
            this.separatedSeoTags.getSeoTagsDirect(
              this.homeData.seo_tags,
              '/images/logo.webp',
              'home'
            );
            this.isLoading.set(false);
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
