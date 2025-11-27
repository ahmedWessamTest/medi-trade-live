import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-skeleton',
  standalone: true,
  template: `
    <div class="inner-banner relative overflow-hidden w-full h-[348px] bg-gray-300 animate-pulse">
      <!-- Content Overlay Skeleton -->
      <div class="container relative z-10 h-full">
        <div class="inner-title flex items-end h-full">
          <div class="mb-[31px] w-64 h-12 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
      <div class="overlay absolute inset-0 bg-gray-400 opacity-60"></div>
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
export class BannerSkeletonComponent {}
