import { Component } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  imports: [],
  template: `
    <div
      class="flex flex-col h-full text-center items-center pt-[9px] pb-[36px] px-[8px] rounded-[15px] border animate-pulse"
    >
      <!-- Image placeholder -->
      <figure class="mb-[5px]">
        <div class="w-[45px] h-[45px] bg-gray-300 rounded-full"></div>
      </figure>

      <!-- Title placeholder -->
      <div class="w-[60%] h-[20px] bg-gray-300 mb-2 rounded"></div>

      <!-- Body placeholder -->
      <div class="w-[80%] h-[16px] bg-gray-200 mb-1 rounded"></div>
      <div class="w-[70%] h-[16px] bg-gray-200 rounded"></div>
    </div>
  `,
  styles: '',
})
export class CardSkeletonComponent {}
