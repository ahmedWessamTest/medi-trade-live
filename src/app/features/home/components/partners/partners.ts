import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { IPartnersCategory } from '@features/home/interface/home';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-partners',
  imports: [CarouselModule, TranslatePipe, NgOptimizedImage],
  templateUrl: './partners.html',
  styleUrl: './partners.css',
})
export class Partners {
  constructor() {
    this.langSubscription = this.languageService.getLanguage().subscribe((lang) => {
      this.currentLang.set(lang);
    });
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }

  @Input({ required: true }) partnersData: IPartnersCategory[] = [];

  private languageService = inject(LocalizationService);

  private langSubscription?: Subscription;

  activeTab = signal<number>(0);
  currentLang = signal<string>('ar');
  carouselOptions = computed<OwlOptions>(() => {
    const isRtl = this.currentLang() === 'ar';
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: true,
      nav: true,
      navSpeed: 800,
      rtl: isRtl,
      navText: [
        '<i class="fa-solid fa-arrow-right fa-xl"></i>',
        '<i class="fa-solid fa-arrow-left fa-xl"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 4,
        },
      },
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: false,
      margin: 0,
      smartSpeed: 600,
    };
  });

  setActiveTab(index: number): void {
    this.activeTab.set(index);
  }
}
