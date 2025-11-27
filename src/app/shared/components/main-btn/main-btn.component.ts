import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizationService } from '@core/services/localization.service';
import { TranslateModule } from '@ngx-translate/core';
import { BaseBtnComponent } from '@shared/components/class/base-btn.component';

@Component({
  selector: 'app-main-btn',
  imports: [TranslateModule, AsyncPipe, RouterLink],
  templateUrl: './main-btn.component.html',
  styleUrl: './main-btn.component.css',
})
export class MainBtnComponent extends BaseBtnComponent {
  currentLang$ = inject(LocalizationService).getLanguage();
}
