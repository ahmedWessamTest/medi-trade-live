import {  ChangeDetectionStrategy, Component,inject } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-map',
  imports: [TranslatePipe],
  templateUrl: './map.html',
  styleUrl: './map.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Map {
  currentLang = 'ar';

  constructor() {
    inject(LocalizationService).getLanguage().subscribe((lang) => {
      this.currentLang = lang;
    });
  }
onMouseEnter(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
      img.src = `/images/maps/map-${this.currentLang}.webp`;    
}

onMouseLeave(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.src = '/images/maps/map-solid.webp';
}
}
