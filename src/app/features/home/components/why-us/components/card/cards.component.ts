import { Component, Input } from '@angular/core';
import { WhyReason } from '@features/home/interface/home';
import { CardSkeletonComponent } from '@shared/components/card/card-skeleton/card-skeleton.component';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-cards',
  imports: [CardComponent, CardSkeletonComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  @Input({ required: true }) whyData: WhyReason[] = [];
}
