import { Component } from '@angular/core';

@Component({
  selector: 'app-above-hold-skeleton',
  imports: [],
  template: `
    <div class="container">
      <div class="animate-pulse">
        <!-- Title Skeleton -->
        <div class="h-7 w-1/6 bg-gray-300 rounded mb-[31px] mt-[21px]"></div>

        <!-- Small Body Skeleton -->
        <div class="h-6 w-full bg-gray-300 rounded mb-4"></div>
        <div class="h-6 w-full bg-gray-300 rounded mb-4"></div>
        <div class="h-6 w-full bg-gray-300 rounded mb-4"></div>
        <div class="h-6 w-full bg-gray-300 rounded mb-4"></div>

        <!-- Grid Skeleton -->
        <div class="grid w-full gap-[30px] grid-cols-12 mt-15">
          <!-- Left Column Skeleton (Image) -->
          <div class="col-span-12 lg:col-span-5">
            <div class="w-full h-[600px] bg-gray-300 rounded"></div>
          </div>

          <!-- Right Column Skeleton (Text) -->
          <div class="col-span-12 lg:col-span-7 space-y-4">
            <div class="h-6 w-full bg-gray-300 rounded"></div>
            <div class="h-6 w-full bg-gray-300 rounded"></div>
            <div class="h-6 w-full bg-gray-300 rounded"></div>
            <div class="h-6 w-full bg-gray-300 rounded"></div>
            <div class="h-6 w-full bg-gray-300 rounded"></div>
            <div class="h-6 w-full bg-gray-300 rounded"></div>
            <div class="h-6 w-full bg-gray-300 rounded"></div>
            <div class="h-6 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: '',
})
export class AboveHoldSkeleton {}
