import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comma',
  standalone: true,
})
export class CommaPipe implements PipeTransform {
  transform(value: string): string {
    const split: string[] = value.split('.');
    if (split.length > 1) {
      const countNumber: string[] = split[1].split('');
      if (countNumber.length === 1) {
        return `${split[0]},${split[1]}0`;
      }
      return `${split[0]},${split[1]}`;
    }
    return `${split[0]},00`;
  }
}
