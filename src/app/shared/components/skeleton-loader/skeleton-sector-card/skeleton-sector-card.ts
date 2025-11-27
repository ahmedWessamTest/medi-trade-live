import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-sector-card',
  imports: [],
  template: `
    <div class="container  grid grid-cols-12 gap-4 bg-white p-6  rounded-2xl animate-pulse">
      <!-- Image Skeleton -->
      <div class="col-span-12 sm:col-span-3">
        <div class="w-full h-[250px] bg-gray-200 rounded-lg"></div>
      </div>

      <!-- Text + Button Section -->
      <div class="col-span-12 sm:col-span-9 flex flex-col justify-between">
        <!-- Text Skeleton -->
        <div class="space-y-3">
          <div class="h-5 w-full bg-gray-200 rounded"></div>
          <div class="h-5 w-full bg-gray-200 rounded"></div>
          <div class="h-5 w-full bg-gray-200 rounded"></div>
          <div class="h-5 w-full bg-gray-200 rounded"></div>
          <div class="h-5 w-full bg-gray-200 rounded"></div>
          <div class="h-5 w-full bg-gray-200 rounded"></div>
        </div>

        <!-- Button Skeleton -->
        <div class="grid grid-cols-12 mt-6">
          <div class="col-span-12 sm:col-span-2 h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  `,
  styles: `
  @keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

  `,
})
export class SkeletonSectorCard {}
