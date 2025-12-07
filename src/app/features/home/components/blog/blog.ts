import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import { IBlog } from '@features/blogs/interface/blogs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-blog',
  imports: [TranslatePipe, CustomSanitizePipe, RouterLink, AsyncPipe],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {
  blogData = input<IBlog[]>([]);
  currentLang$ = inject(LocalizationService).getLanguage();
}
