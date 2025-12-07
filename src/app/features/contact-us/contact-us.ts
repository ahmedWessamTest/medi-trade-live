import { SeoITags } from '@core/interface/common';
import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { TranslatePipe } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { ContactForm } from '@shared/components/contact-form/contact-form';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { ContactUsFormSkeletonloaderComponent } from '@shared/components/skeleton-loader/contact-us-form-skeletonloader/contact-us-form-skeletonloader.component';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IContactUsPage } from './interface/contacUs';
import { ContactUsData } from './services/contact-us';

@Component({
  selector: 'app-contact-us',
  imports: [
    Banner,
    BannerSkeletonComponent,
    TranslatePipe,
    ContactForm,
    ContactUsFormSkeletonloaderComponent,
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs implements OnDestroy {
  private contactUsService = inject(ContactUsData);

  private currentLang$ = inject(LocalizationService).getLanguage();

  private separatedSeoTags = inject(SeparatedSeoTags);

  private destroy$ = new Subject<void>();

  isLoading: WritableSignal<boolean> = signal(true);
  contactUsData =  signal<IContactUsPage | null>({} as IContactUsPage);

  ngOnInit(): void {
    this.getContactUsData();
  }

  private getContactUsData(): void {
    this.isLoading.set(true);
    this.currentLang$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((lang) => {
      this.contactUsService.contactInformation(lang).subscribe((res) => {
        this.contactUsData.set(res);
        this.isLoading.set(false);
        this.separatedSeoTags.getSeoTagsDirect(
          this.contactUsData()?.seo_tags ?? {} as SeoITags,
          this.contactUsData()?.banner_image ?? '',
          'contact-us'
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
