import { Component } from '@angular/core';

@Component({
  selector: 'app-sector-alt-section-skeleton',
  standalone: true,
  template: `
    <section class="pt-[60px] pb-[74px]">
      <div class="container">
        <div class="grid grid-cols-1 relative lg:grid-cols-2 gap-5 hover-items pt-15 p-8">
          <div class="bg-[#0049AF] absolute w-full h-[70%] z-0 rounded-2xl"></div>

          <!-- Right Section -->
          <div class="flex flex-col justify-between z-10">
            <div class="content">
              <!-- Title Skeleton -->
              <div class="h-8 bg-gray-400 rounded w-3/4 animate-pulse mb-[18px]"></div>

              <!-- Content Skeleton -->
              <div class="space-y-3 pb-3">
                <div class="h-4 bg-gray-400 rounded w-full animate-pulse"></div>
                <div class="h-4 bg-gray-400 rounded w-5/6 animate-pulse"></div>
                <div class="h-4 bg-gray-400 rounded w-4/6 animate-pulse"></div>
                <div class="h-4 bg-gray-400 rounded w-3/6 animate-pulse"></div>
                <div class="h-4 bg-gray-400 rounded w-2/6 animate-pulse"></div>
              </div>
            </div>

            <!-- Bottom Two Images Skeleton -->
            <div class="flex gap-4">
              <!-- Image 3 Skeleton -->
              <div class="relative w-1/2 overflow-hidden rounded-lg">
                <div class="w-full h-[268px] bg-gray-300 animate-pulse rounded-lg"></div>
                <div
                  class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70"
                >
                  <div class="h-6 bg-gray-400 rounded w-24 animate-pulse"></div>
                </div>
              </div>

              <!-- Image 4 Skeleton -->
              <div class="relative w-1/2 overflow-hidden rounded-lg">
                <div class="w-full h-[268px] bg-gray-300 animate-pulse rounded-lg"></div>
                <div
                  class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70"
                >
                  <div class="h-6 bg-gray-400 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Left Section -->
          <div class="relative">
            <!-- Overlapping Images Skeleton -->
            <div class="relative flex justify-center gap-x-[11px] z-10">
              <!-- Image 0 Skeleton -->
              <div class="relative w-1/2 overflow-hidden rounded-lg">
                <div class="w-full h-[268px] bg-gray-300 animate-pulse rounded-lg"></div>
                <div
                  class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70"
                >
                  <div class="h-6 bg-gray-400 rounded w-24 animate-pulse"></div>
                </div>
              </div>

              <!-- Image 1 Skeleton -->
              <div class="relative w-1/2 overflow-hidden rounded-lg">
                <div class="w-full h-[268px] bg-gray-300 animate-pulse rounded-lg"></div>
                <div
                  class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70"
                >
                  <div class="h-6 bg-gray-400 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Full-width Image Skeleton -->
            <div class="relative w-full overflow-hidden rounded-lg mt-[20px] z-10">
              <div class="w-full h-[268px] bg-gray-300 animate-pulse rounded-lg"></div>
              <div
                class="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70"
              >
                <div class="h-6 bg-gray-400 rounded w-24 animate-pulse"></div>
              </div>
            </div>

            <div
              class="bg-white top-0 end-0 absolute w-[calc(60%+34px)] border-[3px] border-[#0049AF] h-[calc(100%+34px)] translate-y-[-17px] rtl:translate-x-[-17px] ltr:translate-x-[17px] z-0 rounded-2xl"
            ></div>
          </div>
        </div>
      </div>
    </section>
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
export class SectorAltSectionSkeletonComponent {}
