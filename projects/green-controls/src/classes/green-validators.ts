import { AbstractControl } from '@angular/forms';

export class GreenValidators {
  public static greenEmail(control: AbstractControl): { [key: string]: boolean } | null {
    const split = control.value.split('@');
    const invalidStartLetter: boolean = control.value[0] === '-'
    || control.value[0] === '.'
    || control.value[0] === '_'
    || split[0].includes('..');
    if (split[1]) {
      const hasRusWord = split[1].match(/xn--/);
      const hasTwoDots = split[1].includes('..');
      if (hasRusWord || hasTwoDots) {
        return { email: true };
      }
    }
    if (invalidStartLetter) {
      return { email: true };
    }
    return null;
  }
}
