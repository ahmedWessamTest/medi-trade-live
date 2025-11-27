import { Component, inject } from '@angular/core';
import { Data } from '@core/interface/contact-us';
import { ContactUsService } from '@core/services/contact-us.service';
import { LocalizationService } from '@core/services/localization.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FloatingWhatsapp } from './components/floating-whatsapp/floating-whatsapp';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { SkeletonNavbar } from './components/skeleton-navbar/skeleton-navbar';
import { MainLayout } from './layouts/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [Footer, FloatingWhatsapp, NgxSpinnerComponent, MainLayout, SkeletonNavbar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private contactUs = inject(ContactUsService);

  private destroy$ = new Subject<void>();

  private currentLang$ = inject(LocalizationService).getLanguage();

  contactUsData: Data = {} as Data;

  ngOnInit(): void {
    this.loadContactUsData();
  }

  private loadContactUsData(): void {
    this.currentLang$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((lang) => {
      this.contactUs
        .contactInformation(lang)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.contactUsData = res.data;
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
