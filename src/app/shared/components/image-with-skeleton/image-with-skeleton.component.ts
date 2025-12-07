import { Component, Input, signal } from '@angular/core';
import { ImageSkeletonComponent } from '@shared/components/skeleton-loader/image-skeleton/image-skeleton.component';

@Component({
  selector: 'app-image-with-skeleton',
  standalone: true,
  imports: [ImageSkeletonComponent],
  template: `
    @if (isLoading()) {
    <app-image-skeleton [class]="containerClass" [height]="height" />
    } @else {
    <figure [class]="containerClass + ' relative overflow-hidden rounded-lg'">
      <img
        [src]="src"
        [alt]="alt"
        [attr.loading]="loading"
        [class]="imageClass"
        [style.height]="height"
        (load)="onImageLoad()"
        (error)="onImageError()"
      />
      @if (showOverlay && overlayText) {
      <div class="overlay absolute inset-0 flex items-center justify-center bg-[#000000B2]">
        <p class="text-white font-bold">
          {{ overlayText }}
        </p>
      </div>
      }
    </figure>
    }
  `,
  styles: [
    `
      img {
        transition: opacity 0.3s ease-in-out;
      }

      .loading {
        opacity: 0;
      }

      .loaded {
        opacity: 1;
      }
    `,
  ],
})
export class ImageWithSkeletonComponent {
  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt!: string;
  @Input() height: string = '268px';
  @Input() containerClass: string = 'w-full';
  @Input() imageClass: string = 'w-full';
  @Input() loading: 'lazy' | 'eager' = 'lazy';
  @Input() showOverlay: boolean = false;
  @Input() overlayText: string = '';

  // Signal for loading state
  isLoading = signal(true);

  onImageLoad() {
    this.isLoading.set(false);
  }

  onImageError() {
    this.isLoading.set(false);
    console.warn(`Failed to load image: ${this.src}`);
  }
}
