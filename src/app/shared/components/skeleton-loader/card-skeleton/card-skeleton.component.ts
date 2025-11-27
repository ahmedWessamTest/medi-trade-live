import { Component } from '@angular/core';

@Component({
  selector: 'app-card-skeleton',
  imports: [],
  template: `
    <div class="partner-card mx-2 p-6 rounded-2xl border bg-white h-full animate-pulse">
      <figure class="mb-4 flex justify-center">
        <div class="w-24 h-24 bg-gray-200 rounded-md"></div>
      </figure>
      <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  `,
  styles: '',
})
export class CardSkeletonComponent {}
