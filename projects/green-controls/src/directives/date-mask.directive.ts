import { DateTime } from 'luxon';
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[grDateMask]',
  standalone: true,
})
export class DateMaskDirective {
  private _previousLength: number = 0;

  constructor(private readonly _control: NgControl) {}

  @HostListener('input', [ '$event' ])
  onInput(event: InputEvent) {
    event.preventDefault();
    event.stopPropagation();
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = input.value.replace(/\D/g, '').substring(0, 8);
    const { selectionStart } = input;
    if (value.length === 0) {
      input.value = value;
      input.setSelectionRange(0, 0);
      this._control.control?.setValue(null);
    }

    if (value.length === 1) {
      this._control.control?.setValue(`${value[0]}_.__.____`);
      input.value = `${value[0]}_.__.____`;
      input.setSelectionRange(1, 1);
      this._previousLength = value.length;
      this._control.control?.setErrors({ matDatepickerParse: true });
    }

    if (value.length === 2) {
      input.value = `${value[0]}${value[1]}.__.____`;
      if (this._previousLength > value.length) {
        input.setSelectionRange(2, 2);
      } else if (this._previousLength < value.length) {
        input.setSelectionRange(3, 3);
      } else {
        input.setSelectionRange(2, 2);
      }
      this._previousLength = value.length;
      this._control.control?.setErrors({ matDatepickerParse: true });
    }

    if (value.length === 3) {
      input.value = `${value[0]}${value[1]}.${value[2]}_.____`;
      this._previousLength = value.length;
      input.setSelectionRange(4, 4);
      this._control.control?.setErrors({ matDatepickerParse: true });
    }

    if (value.length === 4) {
      input.value = `${value[0]}${value[1]}.${value[2]}${value[3]}.____`;
      if (this._previousLength > value.length) {
        input.setSelectionRange(5, 5);
      } else if (this._previousLength < value.length) {
        input.setSelectionRange(6, 6);
      } else {
        input.setSelectionRange(5, 5);
      }
      this._previousLength = value.length;
      this._control.control?.setErrors({ matDatepickerParse: true });
    }

    if (value.length === 5) {
      input.value = `${value[0]}${value[1]}.${value[2]}${value[3]}.${value[4]}___`;
      this._previousLength = value.length;
      if (selectionStart === 7 || selectionStart === 6) {
        input.setSelectionRange(7, 7);
      } else {
        input.setSelectionRange(selectionStart, selectionStart);
      }
      this._control.control?.setErrors({ matDatepickerParse: true });
    }

    if (value.length === 6) {
      input.value = `${value[0]}${value[1]}.${value[2]}${value[3]}.${value[4]}${value[5]}__`;
      this._previousLength = value.length;
      if (selectionStart === 8) {
        input.setSelectionRange(8, 8);
      } else {
        input.setSelectionRange(selectionStart, selectionStart);
      }
      this._control.control?.setErrors({ matDatepickerParse: true });
    }

    if (value.length === 7) {
      this._control.control?.setValue(`${value[0]}${value[1]}.${value[2]}${value[3]}.${value[4]}${value[5]}${value[6]}_`);
      input.value = `${value[0]}${value[1]}.${value[2]}${value[3]}.${value[4]}${value[5]}${value[6]}_`;
      this._previousLength = value.length;
      if (selectionStart === 8) {
        input.setSelectionRange(8, 8);
      } else {
        input.setSelectionRange(selectionStart, selectionStart);
      }
      this._control.control?.setErrors({ matDatepickerParse: true });
    }

    if (value.length === 8) {
      const settingData: string = `${value[0]}${value[1]}.${value[2]}${value[3]}.${value[4]}${value[5]}${value[6]}${value[7]}`;
      input.value = settingData;
      if (DateTime.fromFormat(settingData, 'dd.MM.yyyy').toString() !== 'Invalid DateTime') {
        this._control.control?.setValue(DateTime.fromFormat(settingData, 'dd.MM.yyyy').toString());
      }
      input.setSelectionRange(selectionStart, selectionStart);
      this._previousLength = value.length;
    }
  }
}
