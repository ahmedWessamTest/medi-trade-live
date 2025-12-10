import { NgOptimizedImage, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { IAboutUsData } from '@features/about-us/interface/about-us';

@Component({
  selector: 'app-above-hold',
  imports: [NgOptimizedImage, CustomSanitizePipe,SlicePipe],
  templateUrl: './above-hold.html',
  styleUrl: './above-hold.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AboveHold {
  @Input({ required: true }) aboutData: IAboutUsData = {} as IAboutUsData;
}
