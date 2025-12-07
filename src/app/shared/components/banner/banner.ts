import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { MainHeading } from '@shared/components/main-heading/main-heading.component';

@Component({
  selector: 'app-banner',
  imports: [MainHeading, NgOptimizedImage],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
  path = input<string>('');
  image =  input<string>('');
  altImage =  input<string>('');

  currentLang = inject(LocalizationService).getLanguage();
}
