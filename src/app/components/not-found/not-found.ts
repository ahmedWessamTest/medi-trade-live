import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizationService } from '@core/services/localization.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-founde',
  imports: [RouterLink, TranslatePipe, AsyncPipe],
  template: `<main
    class="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="text-center">
      <figure class="w-[200px] h-[200px] mb-[22px] text-center mx-auto">
        <img
          loading="eager"
          src="/images/logo.webp"
          alt="logo"
          class="w-full h-full object-cover"
        />
      </figure>
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
        {{ 'page_notfound' | translate }}
      </h1>
      <p class="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
        {{ 'page_notfound_description' | translate }}
      </p>

      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a
          [routerLink]="['/', currentLang$ | async]"
          class="bg-main text-white rounded-[10px] leading-main py-[9px] px-[66px] font-normal"
        >
          {{ 'navbar.home' | translate }}
        </a>

        <a
          [routerLink]="['/', currentLang$ | async, 'contact-us']"
          class="bg-alt-btn text-black rounded-[10px] leading-main py-[9px] md:px-[66px] px-8 font-normal"
        >
          {{ 'navbar.contact' | translate }}
        </a>
      </div>
    </div>
  </main> `,
  styles: '',
})
export class NotFounde {
  currentLang$ = inject(LocalizationService).getLanguage();
}
