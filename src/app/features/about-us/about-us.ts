import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { IsoSkeletonLoaderComponent } from '@features/home/components/iso/components/iso-skeleton-loader/iso-skeleton-loader.component';
import { Iso } from '@features/home/components/iso/iso';
import { WhyUsSkeletonLoaderComponent } from '@features/home/components/why-us/components/why-us-skeleton-loader/why-us-skeleton-loader.component';
import { WhyUs } from '@features/home/components/why-us/why-us';
import { TranslatePipe } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { AboveHoldSkeleton } from './components/above-hold-skeleton/above-hold-skeleton';
import { AboveHold } from './components/above-hold/above-hold';
import { IAboutUsData } from './interface/about-us';
import { AboutUsData } from './services/about-us';
import { SeoITags } from '@core/interface/common';

@Component({
  selector: 'app-about-us',
  imports: [
    Banner,
    WhyUs,
    Iso,
    AboveHold,
    CustomSanitizePipe,
    TranslatePipe,
    AboveHoldSkeleton,
    IsoSkeletonLoaderComponent,
    BannerSkeletonComponent,
    WhyUsSkeletonLoaderComponent,
  ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  private aboutServices = inject(AboutUsData);

  private currentLang$ = inject(LocalizationService).getLanguage();

  private destroy$ = new Subject<void>();

  private separatedSeoTags = inject(SeparatedSeoTags);

  isLoading: WritableSignal<boolean> = signal(true);

  aboutData =  signal<IAboutUsData | null>(null);

  ngOnInit(): void {
    this.getAboutData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  activeTab: any;

  getAboutData() {
    this.currentLang$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((lang) => {
      this.aboutServices.getAboutData(lang).subscribe((res) => {
        this.aboutData.set(res.data);
        if (this.aboutData()?.tabs?.length ?? 0 > 0) {
          this.activeTab = this.aboutData()?.tabs[0]; // set default tab here
        }
        this.separatedSeoTags.getSeoTagsDirect(
          this.aboutData()?.seo_tags ?? {} as SeoITags,
          this.aboutData()?.image_url ?? '',
          'about-us'
        );
        this.isLoading.set(false);
      });
    });
  }

  selectTab(position: number) {
    const found = this.aboutData()?.tabs.find((tab) => tab.position === position);
    if (found) {
      this.activeTab = found;
    }
  }
}
