import { Component, Input } from '@angular/core';
import { BaseBtn } from '@core/interface/base-btn';

@Component({
  selector: 'app-base-btn',
  imports: [],
  template: '',
  styles: '',
})
export class BaseBtnComponent {
  @Input({ required: true }) baseBtn: BaseBtn = {
    text: '',
    link: '',
    target: '',
    class: {
      bgColor: '',
      textColor: '',
      borderRadius: '',
      lineHeight: '',
      padding: '',
      fontWeight: '',
      border: '',
      fontSize: '',
      display: '',
    },
  };

  get classString(): string {
    const classObj = this.baseBtn.class;
    return `${classObj.bgColor} ${classObj.textColor} ${classObj.borderRadius} ${classObj.lineHeight} ${classObj.padding} ${classObj.fontWeight} ${classObj.border} ${classObj.display}`.trim();
  }
}
