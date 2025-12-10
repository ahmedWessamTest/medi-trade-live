import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-floating-whatsapp',
  imports: [],
  templateUrl: './floating-whatsapp.html',
  styleUrl: './floating-whatsapp.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatingWhatsapp {
  @Input() whatsappNumber: string = '';

  translate = inject(TranslateService).getCurrentLang();
}
