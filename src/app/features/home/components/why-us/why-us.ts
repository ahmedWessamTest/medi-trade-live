import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { WhyReason } from '@features/home/interface/home';
import { TranslatePipe } from '@ngx-translate/core';
import { CardsComponent } from './components/card/cards.component';

@Component({
  selector: 'app-why-us',
  imports: [TranslatePipe, CardsComponent, CustomSanitizePipe],
  templateUrl: './why-us.html',
  styleUrl: './why-us.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WhyUs {
  @Input({ required: true }) whyData: string = '';
  @Input({ required: true }) whyReasons: WhyReason[] = [];
}
