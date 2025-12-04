import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import { IHero } from '@features/home/interface/home';
import { TranslatePipe } from '@ngx-translate/core';
import { HeroSkeletonComponent } from './components/hero-skeleton/hero-skeleton.component';

@Component({
  selector: 'app-hero',
  imports: [
    RouterLink,
    AsyncPipe,
    RouterLink,
    TranslatePipe,
    CustomSanitizePipe,
    HeroSkeletonComponent,
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  currentLang$ = inject(LocalizationService).getLanguage();

  @Input({ required: true }) heroData: IHero = {} as IHero;

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

  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>;

  isLoading = true; // ✅ Show image by default

  /**
   * Triggered when the video is ready to play
   */
  onCanPlay(): void {
    const video = this.video.nativeElement;
    video.muted = true;

    video.play().catch((err) => console.warn('Autoplay blocked:', err));

    // ✅ Hide skeleton and show video
    this.isLoading = false;
    console.log('Video is ready to play.');
  }
}
