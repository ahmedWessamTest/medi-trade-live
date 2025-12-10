import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Data } from '@core/interface/contact-us';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalizationService } from '../../core/services/localization.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, AsyncPipe, RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Footer {
  @Input({ required: true }) contactUsData: Data = {} as Data;

  private languageService = inject(LocalizationService);

  currentLang$ = this.languageService.getLanguage();

  navbarItems = [
    { id: 1, name: 'navbar.home', link: '' },
    { id: 2, name: 'navbar.about', link: 'about-us' },
    { id: 3, name: 'navbar.partners', link: 'partners' },
    { id: 4, name: 'navbar.sectors', link: 'sectors' },
    { id: 5, name: 'navbar.blogs', link: 'blogs' },
    { id: 6, name: 'navbar.media', link: 'media' },
    { id: 7, name: 'navbar.contact', link: 'contact-us' },
  ];
}
