import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { ISO } from '@features/home/interface/home';
import { IsoSkeletonLoaderComponent } from './components/iso-skeleton-loader/iso-skeleton-loader.component';

@Component({
  selector: 'app-iso',
  imports: [IsoSkeletonLoaderComponent, CustomSanitizePipe],
  templateUrl: './iso.html',
  styleUrl: './iso.css',
})
export class Iso {
  @Input({ required: true }) isoData: ISO = {} as ISO;

  isLightboxOpen = false;

  @ViewChild('modalElement') modalRef!: ElementRef;

  openModel(): void {
    this.isLightboxOpen = true;
  }

  closeModel(): void {
    this.isLightboxOpen = false;
  }
}
