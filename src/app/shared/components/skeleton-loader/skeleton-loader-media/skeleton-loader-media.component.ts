import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader-media',
  imports: [],
  templateUrl: './skeleton-loader-media.component.html',
  styleUrl: './skeleton-loader-media.component.css',
})
export class SkeletonLoaderMediaComponent {
  @Input() itemCount: number = 4;
  @Input({ required: true }) haveTransform: boolean = true;

  get skeletonItems(): number[] {
    return Array.from({ length: this.itemCount }, (_, i) => i + 1);
  }
}
