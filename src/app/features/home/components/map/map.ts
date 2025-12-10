import { AfterViewInit, Component, ElementRef, HostListener, inject, NgZone, ViewChild } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-map',
  imports: [TranslatePipe],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  private _zone = inject(NgZone);
  currentLang = 'ar';

  constructor() {
    inject(LocalizationService).getLanguage().subscribe((lang) => {
      this.currentLang = lang;
    });
  }
  @ViewChild('mapImage') img!: ElementRef<HTMLImageElement>;
  @HostListener('mouseenter')
onMouseEnter() {
  this._zone.runOutsideAngular(() => {
    const img = this.img.nativeElement;
    img.src = `/images/maps/map-${this.currentLang}.webp`;
  });
}

@HostListener('mouseleave')
onMouseLeave() {
  this._zone.runOutsideAngular(() => {
    const img = this.img.nativeElement;
    img.src = '/images/maps/map-solid.webp';
  });
}
}
