import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeInlineStyle'
})
export class RemoveInlineStylePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
