import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MainBtnComponent } from '@shared/components/main-btn/main-btn.component';

@Component({
  selector: 'app-cta',
  imports: [MainBtnComponent, TranslatePipe],
  templateUrl: './cta.html',
  styleUrl: './cta.css',
})
export class Cta {
  baseBtn = {
    text: 'navbar.contact',
    link: 'contact-us',
    target: '_self',
    class: {
      bgColor: 'bg-main',
      textColor: 'text-white',
      borderRadius: 'rounded-[10px]',
      lineHeight: 'line-height-[35px]',
      padding: 'py-[9px] px-[87px]',
      fontWeight: 'font-normal',
    },
  };
}
