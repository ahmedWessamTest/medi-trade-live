import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizationService } from '@core/services/localization.service';

@Component({
  selector: 'app-skeleton-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './skeleton-navbar.html',
  styleUrl: './skeleton-navbar.css',
})
export class SkeletonNavbar {
  currentLang$ = inject(LocalizationService).getLanguage();
}
