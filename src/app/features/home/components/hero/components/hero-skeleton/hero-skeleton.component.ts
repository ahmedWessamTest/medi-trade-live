import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-skeleton',
  imports: [RouterLink, CustomSanitizePipe, TranslatePipe],
  templateUrl: './hero-skeleton.component.html',
  styleUrl: './hero-skeleton.component.css',
})
export class HeroSkeletonComponent {
  @Input({ required: true }) heroData!: { description: string; title: string };
}
