import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, forwardRef,
} from '@angular/core';
import {
  FormGroup, FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators,
} from '@angular/forms';
import { MessageErrorService } from 'green-controls/src/services';
import { AbstractWrapperInput } from 'green-controls/src/abstract';
import { IDataInput } from 'green-controls/src/interfaces';
import { GreenPattern, GreenValidators } from 'green-controls/src/classes';

@Component({
  selector: 'gr-input-email',
  templateUrl: './input-email.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => InputEmailComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => InputEmailComponent),
      multi: true,
    }, MessageErrorService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmailComponent extends AbstractWrapperInput implements AfterContentInit, Validators {
  @Input()
  public dataInput!: IDataInput;

  public form: FormGroup = new FormGroup({});

  constructor(
    private readonly _messageErrorSevice: MessageErrorService,
    private readonly _formGroupDirective: FormGroupDirective,
    private readonly _cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngAfterContentInit(): void {
    this.messageError$ = this._messageErrorSevice.messageError$;

    this.form = this._formGroupDirective.form;

    this.control.addValidators(GreenValidators.greenEmail);
    this.control.addValidators(Validators.pattern(GreenPattern.enEmailValidationPattern));
    this._cdr.detectChanges();
  }

  validate(): ValidationErrors | null {
    return this.control.invalid ? { invalid: true } : null;
  }
}
