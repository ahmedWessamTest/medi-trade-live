import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'customSanitize',
})
export class CustomSanitizePipe implements PipeTransform {
  sanitizer = inject(DomSanitizer);
  transform(value: string | unknown): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml((value as string) || '');
  }
}
