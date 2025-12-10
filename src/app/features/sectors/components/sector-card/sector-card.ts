import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import { ISector } from '@features/sectors/interface/sectors';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sector-card',
  imports: [TranslatePipe, RouterLink, CustomSanitizePipe, AsyncPipe],
  templateUrl: './sector-card.html',
  styleUrl: './sector-card.css',
    changeDetection:ChangeDetectionStrategy.OnPush

})
export class SectorCard {
  @Input({ required: true }) sectors: ISector[] = [];
  currentLang$ = inject(LocalizationService).getLanguage();

  baseBtn = {
    text: 'read-more',
    link: '/sectors',
    target: 'self',
    class: {
      bgColor: 'bg-alt-btn',
      textColor: 'text-black',
      borderRadius: 'rounded-[10px]',
      lineHeight: 'line-height-[35px]',
      padding: 'py-[14px] px-[45px]',
      fontWeight: 'font-medium',
    },
  };
}
