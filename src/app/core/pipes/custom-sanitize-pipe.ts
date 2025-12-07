import { inject, Pipe, PipeTransform, Signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'customSanitize',
})
export class CustomSanitizePipe implements PipeTransform {
  sanitizer = inject(DomSanitizer);
  transform(htmlInput: string | null | undefined | Signal<string | null | undefined>): SafeHtml {
    let html: string | null | undefined;    
    if(typeof htmlInput === 'function') {
      html = htmlInput();;
    } else {
      html = htmlInput;
    }
  if(!html) return '';

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
