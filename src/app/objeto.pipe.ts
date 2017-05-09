import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objeto'
})
export class ObjetoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Array.from(value);
  }

}
