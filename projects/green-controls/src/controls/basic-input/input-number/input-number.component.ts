import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, forwardRef,
} from '@angular/core';
import {
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators,
} from '@angular/forms';
import { AbstractWrapperInput } from 'green-controls/src/abstract';
import { NUMBER_INPUT } from 'green-controls/src/consts';
import { IDataInput } from 'green-controls/src/interfaces';
import { MessageErrorService } from 'green-controls/src/services';

@Component({
  selector: 'gr-input-number',
  templateUrl: './input-number.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    }, MessageErrorService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent extends AbstractWrapperInput implements AfterContentInit, Validators {
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
    this._cdr.detectChanges();
  }

  validate(): ValidationErrors | null {
    return this.control.invalid ? { invalid: true } : null;
  }

  // eslint-disable-next-line no-undef
  public onKeyDown(event: KeyboardEvent) {
    if (!NUMBER_INPUT.includes(event.key)) {
      event.preventDefault();
    }
  }
}
