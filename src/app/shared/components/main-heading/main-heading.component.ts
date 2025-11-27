import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-main-heading',
  imports: [TranslateModule],
  template: `
    <div class="p-[20px] border w-fit rounded-[15px] bg-[#0D0D0D99]">
      <h1 class="text-white  text-main-title font-medium underline">
        {{ heading | translate }}
      </h1>
    </div>
  `,
  styles: '',
})
export class MainHeading {
  @Input({ required: true }) heading: string = '';
}
