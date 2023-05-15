import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, forwardRef,
} from '@angular/core';
import {
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators,
} from '@angular/forms';
import { AbstractWrapperInput } from 'green-controls/src/abstract';
import { IDataInput } from 'green-controls/src/interfaces';
import { MessageErrorService } from 'green-controls/src/services';

@Component({
  selector: 'gr-input-tel',
  templateUrl: './input-tel.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTelComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTelComponent),
      multi: true,
    }, MessageErrorService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTelComponent extends AbstractWrapperInput implements AfterContentInit, Validators {
  @Input()
  public dataInput!: IDataInput;

  constructor(
    private readonly _messageErrorSevice: MessageErrorService,
    private readonly _cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngAfterContentInit(): void {
    this.messageError$ = this._messageErrorSevice.messageError$;
    this._setMask();
    this._cdr.detectChanges();
  }

  validate(): ValidationErrors | null {
    return this.control.invalid ? { invalid: true } : null;
  }

  private _setMask(): void {
    if (!this.mask) {
      this.mask = '(000)-000-00-00';
    }
    if (!this.prefix) {
      this.prefix = '+7';
    }
  }
}
