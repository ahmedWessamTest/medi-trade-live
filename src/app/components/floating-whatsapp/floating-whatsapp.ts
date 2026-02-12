import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-floating-whatsapp',
  templateUrl: './floating-whatsapp.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatingWhatsapp {
  @Input() whatsappNumber: string = '';
}
