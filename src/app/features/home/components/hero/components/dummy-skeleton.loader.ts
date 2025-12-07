import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dummy-skeleton-loader',
  imports: [RouterLink, TranslatePipe],
  template: `<div class="relative w-full h-screen overflow-hidden bg-gray-200">
    <!-- Skeleton video background -->
    <figure class="w-full h-full object-cover">
      <img src="/images/meditrade.webp" alt="hero-skeleton" class="w-full h-full object-cover" />
    </figure>
    <!-- Overlay -->
    <div class="absolute top-0 left-0 w-full h-full bg-[#1976ACCC] z-10 flex items-center">
      <div class="container px-6 text-center text-white">
        <figure class="w-[180px] md:w-[246px] md:h-[258px] mb-[22px] text-center mx-auto">
          <img
            loading="eager"
            src="/images/logo.webp"
            alt="logo"
            class="w-full h-full object-cover"
          />
        </figure>
        <!-- Description skeleton (two lines) -->
        <div class="w-4/5 h-[23px] mx-auto mb-[10px] rounded-md bg-gray-400 animate-pulse"></div>
        <div class="w-3/5 h-[110px] lg:h-[54px] mx-auto mb-[20px] rounded-md bg-gray-400 animate-pulse"></div>

        <div class="flex gap-x-[20px] items-center justify-center pt-[20px]">
          <a
            [routerLink]="['contact-us']"
            class="bg-alt-btn text-black rounded-[10px] leading-main py-[9px] md:px-[66px] px-8 font-normal"
          >
            {{ 'navbar.contact' | translate }}
          </a>

          <a
            [routerLink]="['about-us']"
            class="bg-main text-white rounded-[10px] leading-main py-[9px] md:px-[66px] px-8 font-normal"
          >
            {{ 'navbar.about' | translate }}
          </a>
        </div>
      </div>
    </div>
  </div> `,
  styles: '',
})
export class DummySkeletonLoader {}
