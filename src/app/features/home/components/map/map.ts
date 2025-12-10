import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  NgZone,
  ViewChild,
} from '@angular/core';
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
    inject(LocalizationService)
      .getLanguage()
      .subscribe((lang) => {
        this.currentLang = lang;
      });
  }
  @ViewChild('mapImage') img!: ElementRef<HTMLImageElement>;
  @HostListener('mouseenter')
  onMouseEnter() {
    this._zone.runOutsideAngular(() => {
      this.toggleFade(`/images/maps/map-${this.currentLang}.webp`);
    });
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this._zone.runOutsideAngular(() => {
      this.toggleFade('/images/maps/map-solid.webp')
    });
  }
 toggleFade(imageSrc:string):void {
  const img = this.img.nativeElement;
    img.classList.remove('fade-in');
      img.classList.add('fade-out');
      setTimeout(() => {
        img.src = imageSrc;
        img.classList.remove('fade-out');
        img.classList.add('fade-in');
      }, 300);
  }
}
