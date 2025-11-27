import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-skeleton',
  standalone: true,
  template: `
    <div class="relative overflow-hidden rounded-lg w-full">
      <div class="bg-gray-300 animate-pulse w-full" [style.height]="height"></div>
      <div class="absolute inset-0 flex items-center justify-center bg-gray-200"></div>
    </div>
  `,
  styles: [
    `
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `,
  ],
})
export class ImageSkeletonComponent {
  @Input() height: string = '268px';
  @Input() class: string = 'w-full';
  @Input() imageClass: string = 'w-full';
}
