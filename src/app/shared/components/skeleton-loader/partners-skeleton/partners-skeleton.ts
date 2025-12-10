import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardSkeletonComponent } from '../card-skeleton/card-skeleton.component';

@Component({
  selector: 'app-partners-skeleton',
  imports: [CardSkeletonComponent],
  templateUrl: './partners-skeleton.html',
  styleUrl: './partners-skeleton.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PartnersSkeleton {
  @Input({ required: true }) itemCount: number = 4;
}
