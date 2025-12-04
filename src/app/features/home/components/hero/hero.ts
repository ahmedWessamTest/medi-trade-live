import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import { IHero } from '@features/home/interface/home';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [
    RouterLink,
    AsyncPipe,
    RouterLink,
    TranslatePipe,
    CustomSanitizePipe,
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css',  
})
export class Hero {
  currentLang$ = inject(LocalizationService).getLanguage();

  heroData = input<IHero>();

  baseBtn = {
    text: 'navbar.contact',
    link: 'contact',
    target: '',
    class: {
      bgColor: 'bg-alt-btn',
      textColor: 'text-black',
      borderRadius: 'rounded-[10px]',
      lineHeight: 'line-height-[35px]',
      padding: 'py-[9px] px-[66px]',
      fontWeight: 'font-normal',
    },
  };

  altBtn = {
    ...this.baseBtn,
    text: 'navbar.about',
    link: 'about-us',
    target: '',
    class: {
      ...this.baseBtn.class,
      bgColor: 'bg-main',
      textColor: 'text-white',
    },
  };
}
