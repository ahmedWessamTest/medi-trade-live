import { Component } from '@angular/core';
import { CardSkeletonComponent } from '@shared/components/card/card-skeleton/card-skeleton.component';

@Component({
  selector: 'app-why-us-skeleton-loader',
  imports: [CardSkeletonComponent],
  templateUrl: './why-us-skeleton-loader.component.html',
  styleUrl: './why-us-skeleton-loader.component.css',
})
export class WhyUsSkeletonLoaderComponent {}
