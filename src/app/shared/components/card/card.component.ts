import { Component, Input } from '@angular/core';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { WhyReason } from '@features/home/interface/home';

@Component({
  selector: 'app-card',
  imports: [CustomSanitizePipe],
  templateUrl: './card.component.html',
  styles: '',
})
export class CardComponent {
  @Input({ required: true }) card: WhyReason = {} as WhyReason;

  returnImage(image: string) {
    return `/images/why-us/${image}.webp`;
  }
}
