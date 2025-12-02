import { Component, OnDestroy, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocalizationService } from '@core/services/localization.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { TranslatePipe } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { ContactForm } from '@shared/components/contact-form/contact-form';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { ContactUsFormSkeletonloaderComponent } from '@shared/components/skeleton-loader/contact-us-form-skeletonloader/contact-us-form-skeletonloader.component';
import { PartnersSkeleton } from '@shared/components/skeleton-loader/partners-skeleton/partners-skeleton';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { IPartners } from './interface/partners';
import { Partners } from './services/partners';

@Component({
  selector: 'app-partners-page',
  imports: [
    TranslatePipe,
    ContactForm,
    Banner,
    ContactUsFormSkeletonloaderComponent,
    PartnersSkeleton,
    BannerSkeletonComponent,
  ],
  templateUrl: './partners-page.html',
  styleUrl: './partners-page.css',
})
export class PartnersPage implements OnDestroy {
  private partnersService = inject(Partners);

  private localizationService = inject(LocalizationService);

  private separatedSeoTags = inject(SeparatedSeoTags);

  private destroy$ = new Subject<void>();

  isLoading = signal<boolean>(true);
  // Convert language observable to signal
  currentLang = toSignal(
    this.localizationService.getLanguage().pipe(distinctUntilChanged(), takeUntil(this.destroy$)),
    { initialValue: 'ar' }
  );

  partnersData = signal<IPartners>({} as IPartners);
  activeTab = signal<number>(0);

  constructor() {
    // Use effect to reactively load data when language changes
    effect(() => {
      const lang = this.currentLang();
      if (lang) {
        this.loadPartners(lang);
      }
    });
  }

  private loadPartners(lang: string): void {
    this.partnersService
      .getPartners(lang)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.partnersData.set(res);
          this.isLoading.set(false);
          this.separatedSeoTags.getSeoTagsDirect(
            this.partnersData().seo_tags,
            '/images/logo.webp',
            'partners'
          );
        },
      });
  }

  setActiveTab(index: number): void {
    this.activeTab.set(index);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
