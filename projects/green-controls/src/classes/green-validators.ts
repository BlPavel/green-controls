import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DateTime } from 'luxon';

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

  public static matDatepickerMax(maxDate: string): ValidatorFn {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (control: AbstractControl): { [key: string]: {} } | null => {
      const { value } = control;
      if (value && value.toString() !== 'Invalid Date') {
        const dateValue = new Date(value.toString());
        const dateLimit = new Date(maxDate);
        const diff = dateLimit.getTime() - dateValue.getTime();
        if (diff > 0) {
          return null;
        }
      }
      return { matDatepickerMax: { actual: value, max: DateTime.fromISO(maxDate) } };
    };
  }

  public static matDatepickerMin(minDate: string): ValidatorFn {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (control: AbstractControl): { [key: string]: {} } | null => {
      const { value } = control;
      if (value && value.toString() !== 'Invalid Date') {
        const dateValue = new Date(value.toString());
        const dateLimit = new Date(minDate);
        const diff = dateLimit.getTime() - dateValue.getTime();
        if (diff <= 85_399_999) {
          return null;
        }
      }
      return { matDatepickerMin: { actual: control.value, min: DateTime.fromISO(minDate) } };
    };
  }
}
