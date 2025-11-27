import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IPrivacyPolicy } from './interface/privacy';
import { PrivacyService } from './service/privacy';

@Component({
  selector: 'app-privacy',
  imports: [
    Banner,
    TranslatePipe,
    BannerSkeletonComponent,
    CustomSanitizePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class Privacy {
  private privacyService = inject(PrivacyService);

  private currentLang$ = inject(LocalizationService).getLanguage();

  private destroy$ = new Subject<void>();

  privacyPolicy!: IPrivacyPolicy;

  isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.getPrivacyPolicy();
  }

  getPrivacyPolicy() {
    this.currentLang$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((lang) => {
      this.privacyService.getPrivacyPolicy(lang).subscribe((res) => {
        this.privacyPolicy = res;
        this.isLoading.set(false);
      });
    });
  }
}
