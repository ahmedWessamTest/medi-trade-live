import { Component, HostListener, inject } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-map',
  imports: [TranslatePipe],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  private currentLang$ = inject(LocalizationService).getLanguage();

  imageSrc = '/images/maps/map-solid.webp';

  currentLang = 'ar';

  constructor() {
    this.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.imageSrc = `/images/maps/map-${this.currentLang}.webp`;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.imageSrc = '/images/maps/map-solid.webp';
  }
}
