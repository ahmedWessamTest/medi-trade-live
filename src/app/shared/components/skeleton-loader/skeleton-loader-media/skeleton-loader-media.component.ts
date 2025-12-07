import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader-media',
  imports: [],
  templateUrl: './skeleton-loader-media.component.html',
  styleUrl: './skeleton-loader-media.component.css',
})
export class SkeletonLoaderMediaComponent {
  itemCount = input<number>(4);
  haveTransform = input<boolean>(true);

  get skeletonItems(): number[] {
    return Array.from({ length: this.itemCount() }, (_, i) => i + 1);
  }
}
