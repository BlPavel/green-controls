import {
  AfterContentInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, forwardRef,
} from '@angular/core';
import {
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators,
} from '@angular/forms';
import { AbstractWrapperInput } from 'green-controls/src/abstract';
import { IDataDateInput } from 'green-controls/src/interfaces';
import { MessageErrorService } from 'green-controls/src/services';

@Component({
  selector: 'gr-input-date',
  templateUrl: './input-date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    }, MessageErrorService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateComponent extends AbstractWrapperInput implements OnChanges, AfterContentInit, Validators {
  @Input()
  public dataDateInput!: IDataDateInput;

  public minDate?: string;

  public maxDate?: string;

  public isTouchedDateToggle: boolean = false;

  constructor(private readonly _messageErrorSevice: MessageErrorService) {
    super();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataDateInput']) {
      if (changes['dataDateInput'].currentValue?.label) {
        this.label = changes['dataDateInput'].currentValue?.label;
      }
      if (changes['dataDateInput'].currentValue?.placeholder) {
        this.placeholder = changes['dataDateInput'].currentValue?.placeholder;
      }
      if (changes['dataDateInput'].currentValue?.connectInput) {
        this.connectInput = changes['dataDateInput'].currentValue?.connectInput;
      }
      if (changes['dataDateInput'].currentValue?.isRequired !== undefined) {
        this.isRequired = changes['dataDateInput'].currentValue?.isRequired;
      }
      if (changes['dataDateInput'].currentValue?.maxLength) {
        this.maxLength = changes['dataDateInput'].currentValue?.maxLength;
      }
      if (changes['dataDateInput'].currentValue?.minDate) {
        this.minDate = changes['dataDateInput'].currentValue?.minDate;
      }
      if (changes['dataDateInput'].currentValue?.maxDate) {
        this.maxDate = changes['dataDateInput'].currentValue?.maxDate;
      }
      if (changes['dataDateInput'].currentValue?.customErrorMessage) {
        this.customErrorMessage = changes['dataDateInput'].currentValue?.customErrorMessage;
      }
      if (changes['dataDateInput'].currentValue?.autoComplete) {
        this.autoComplete = changes['dataDateInput'].currentValue?.autoComplete;
      }
      if (changes['dataDateInput'].currentValue?.validators) {
        this.validators = changes['dataDateInput'].currentValue?.validators;
        this.setValidators();
      }
      if (changes['dataDateInput'].currentValue?.asyncValidators) {
        this.asyncValidators = changes['dataDateInput'].currentValue?.asyncValidators;
        this.setAsyncValidators();
      }
    }
  }

  ngAfterContentInit(): void {
    this.messageError$ = this._messageErrorSevice.messageError$;
  }

  validate(): ValidationErrors | null {
    return this.control.invalid ? { invalid: true } : null;
  }

  public onClick(): void {
    this.isTouchedDateToggle = true;
  }
}
