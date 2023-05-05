import {
  AfterContentInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, forwardRef,
} from '@angular/core';
import {
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators,
} from '@angular/forms';
import { AbstractWrapperInput } from 'green-controls/src/abstract';
import { IDataField } from 'green-controls/src/interfaces';
import { MessageErrorService } from 'green-controls/src/services';

@Component({
  selector: 'gr-input-field',
  templateUrl: './input-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    }, MessageErrorService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent extends AbstractWrapperInput implements OnChanges, AfterContentInit, Validators {
  @Input()
  public dataField!: IDataField;

  public sizeMinRows: number = 1;

  constructor(private readonly _messageErrorSevice: MessageErrorService) {
    super();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataField']) {
      if (changes['dataField'].currentValue?.label) {
        this.label = changes['dataField'].currentValue?.label;
      }
      if (changes['dataField'].currentValue?.placeholder) {
        this.placeholder = changes['dataField'].currentValue?.placeholder;
      }
      if (changes['dataField'].currentValue?.connectInput) {
        this.connectInput = changes['dataField'].currentValue?.connectInput;
      }
      if (changes['dataField'].currentValue?.isRequired !== undefined) {
        this.isRequired = changes['dataField'].currentValue?.isRequired;
      }
      if (changes['dataField'].currentValue?.maxLength) {
        this.maxLength = changes['dataField'].currentValue?.maxLength;
      }
      if (changes['dataField'].currentValue?.customErrorMessage) {
        this.customErrorMessage = changes['dataField'].currentValue?.customErrorMessage;
      }
      if (changes['dataField'].currentValue?.autoComplete) {
        this.autoComplete = changes['dataField'].currentValue?.autoComplete;
      }
      if (changes['dataField'].currentValue?.sizeMinRows) {
        this.sizeMinRows = changes['dataField'].currentValue?.sizeMinRows;
      }
      if (changes['dataField'].currentValue?.mask) {
        this.mask = changes['dataField'].currentValue?.mask;
      }
      if (changes['dataField'].currentValue?.prefix) {
        this.prefix = changes['dataField'].currentValue?.prefix;
      }
      if (changes['dataField'].currentValue?.suffix) {
        this.suffix = changes['dataField'].currentValue?.suffix;
      }
      if (changes['dataField'].currentValue?.showMaskTyped) {
        this.showMaskTyped = changes['dataField'].currentValue?.showMaskTyped;
      }
      if (changes['dataField'].currentValue?.dropSpecialCharacters) {
        this.dropSpecialCharacters = changes['dataField'].currentValue?.dropSpecialCharacters;
      }
      if (changes['dataField'].currentValue?.validators) {
        this.validators = changes['dataField'].currentValue?.validators;
        this.setValidators();
      }
    }
  }

  ngAfterContentInit(): void {
    this.messageError$ = this._messageErrorSevice.messageError$;
  }

  validate(): ValidationErrors | null {
    return this.control.invalid ? { invalid: true } : null;
  }
}
