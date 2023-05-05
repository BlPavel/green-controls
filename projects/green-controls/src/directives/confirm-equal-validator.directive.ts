import { Directive, Input } from '@angular/core';
import {
  AbstractControl, NG_VALIDATORS, Validator, FormGroupDirective,
} from '@angular/forms';

@Directive({
  selector: 'textarea[grConfirmEqualValidator], input[grConfirmEqualValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line no-use-before-define
      useExisting: ConfirmEqualValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class ConfirmEqualValidatorDirective implements Validator {
  @Input()
  public grConfirmEqualValidator: string = '';

  // eslint-disable-next-line no-unused-vars
  constructor(private readonly _fromGroupDirective: FormGroupDirective) {}

  validate(control: AbstractControl): { [key: string]: boolean } | null {
    if (!this.grConfirmEqualValidator) {
      return null;
    }
    const connectControl = this._fromGroupDirective.form.get(this.grConfirmEqualValidator);
    if (connectControl && connectControl?.value !== control.value) {
      return { notequal: true };
    }
    return null;
  }
}
