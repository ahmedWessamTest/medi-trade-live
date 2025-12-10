import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { MainHeading } from '@shared/components/main-heading/main-heading.component';

@Component({
  selector: 'app-banner',
  imports: [MainHeading, NgOptimizedImage],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Banner {
  @Input({ required: true }) path: string = '';
  @Input({ required: true }) image: string = '';
  @Input({ required: false }) altImage: string = '';

  currentLang = inject(LocalizationService).getLanguage();
}
