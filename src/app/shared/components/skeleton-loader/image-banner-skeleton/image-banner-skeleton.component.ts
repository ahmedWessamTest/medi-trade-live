import { Component } from '@angular/core';

@Component({
  selector: 'app-image-banner-skeleton',
  standalone: true,
  template: `
    <div class="image-banner relative">
      <!-- Main image skeleton -->
      <figure class="w-full h-full z-1 px-0 md:px-9">
        <div class="w-full h-[400px] md:h-[500px] bg-gray-300 animate-pulse rounded-lg"></div>
      </figure>

      <!-- Overlay background skeleton -->
      <div
        class="overlay-bg hidden md:block absolute top-0 w-full h-[calc(50%+80px)] translate-y-[-40px] bg-gray-400 animate-pulse -z-1 border border-[#00000000] rounded-2xl opacity-70"
      ></div>

      <!-- Overlay image skeleton -->
      <div class="overlay-image absolute top-[23px] left-[23px] z-2 px-0 md:px-9">
        <figure class="w-full h-full rotate-img">
          <div
            class="w-full h-[350px] md:h-[450px] bg-gray-200 animate-pulse rounded-lg opacity-80"
          ></div>
        </figure>
      </div>
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

      .rotate-img {
        transform: rotate(-2deg);
      }
    `,
  ],
})
export class ImageBannerSkeletonComponent {}
