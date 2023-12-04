import {
  Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges,
} from '@angular/core';
import {
  AsyncValidatorFn,
  ControlValueAccessor, FormControl, ValidatorFn, Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ICustomMessageError } from 'green-controls/src/interfaces';

@Directive()
export abstract class AbstractWrapperInput implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
  @Output()
  public changeValue: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Input()
  public toTrim: boolean = true;

  protected customErrorMessage?: ICustomMessageError;

  protected label = '';

  protected placeholder = '';

  protected connectInput = '';

  protected isRequired = true;

  protected maxLength?: number;

  protected autoComplete = '';

  protected mask = '';

  protected prefix = '';

  protected suffix = '';

  protected showMaskTyped = false;

  protected dropSpecialCharacters = true;

  protected messageError$!: Observable<string>;

  protected control: FormControl<unknown> = new FormControl();

  protected subscribe?: Subscription;

  protected validators: Validators[] = [];

  protected asyncValidators?: AsyncValidatorFn[];

  protected isDisabled: boolean = false;

  // eslint-disable-next-line no-unused-vars
  protected onChange: (value: unknown) => void = () => {};

  protected onTouched: () => void = () => {};

  writeValue(obj: string): void {
    this.control.setValue(obj);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
    this.isDisabled = isDisabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataInput']) {
      if (changes['dataInput'].currentValue?.label) {
        this.label = changes['dataInput'].currentValue?.label;
      }
      if (changes['dataInput'].currentValue?.placeholder) {
        this.placeholder = changes['dataInput'].currentValue?.placeholder;
      }
      if (changes['dataInput'].currentValue?.connectInput) {
        this.connectInput = changes['dataInput'].currentValue?.connectInput;
      }
      if (changes['dataInput'].currentValue?.isRequired !== undefined) {
        this.isRequired = changes['dataInput'].currentValue?.isRequired;
      }
      if (changes['dataInput'].currentValue?.maxLength) {
        this.maxLength = changes['dataInput'].currentValue?.maxLength;
      }
      if (changes['dataInput'].currentValue?.customErrorMessage) {
        this.customErrorMessage = changes['dataInput'].currentValue?.customErrorMessage;
      }
      if (changes['dataInput'].currentValue?.autoComplete) {
        this.autoComplete = changes['dataInput'].currentValue?.autoComplete;
      }
      if (changes['dataInput'].currentValue?.mask) {
        this.mask = changes['dataInput'].currentValue?.mask;
      }
      if (changes['dataInput'].currentValue?.prefix) {
        this.prefix = changes['dataInput'].currentValue?.prefix;
      }
      if (changes['dataInput'].currentValue?.suffix) {
        this.suffix = changes['dataInput'].currentValue?.suffix;
      }
      if (changes['dataInput'].currentValue?.showMaskTyped) {
        this.showMaskTyped = changes['dataInput'].currentValue?.showMaskTyped;
      }
      if (changes['dataInput'].currentValue?.dropSpecialCharacters) {
        this.dropSpecialCharacters = changes['dataInput'].currentValue?.dropSpecialCharacters;
      }
      if (changes['dataInput'].currentValue?.validators) {
        this.validators = changes['dataInput'].currentValue?.validators;
        this.setValidators();
      }
      if (changes['dataInput'].currentValue?.asyncValidators) {
        this.asyncValidators = changes['dataInput'].currentValue?.asyncValidators;
        this.setAsyncValidators();
      }
    }
  }

  ngOnInit(): void {
    this.setLabelAndPlaceholder();

    this.subscribe = this.control.valueChanges.subscribe((value) => {
      this.onChange(value);
      this.changeValue.emit(value);
    });
  }

  protected onBlur() {
    this.onTouched();
    this.control.updateValueAndValidity({ emitEvent: false });
    if (this.toTrim && typeof this.control.value === 'string') {
      this.control.setValue(this.control.value.trim());
    }
  }

  protected setLabelAndPlaceholder(): void {
    this._setLabel();
    this._setPlaceholder();
  }

  private _setLabel(): void {
    if (!this.label) {
      this.label = this.placeholder;
    }
  }

  private _setPlaceholder(): void {
    if (!this.placeholder) {
      this.placeholder = this.label;
    }
  }

  protected setValidators(): void {
    this.control.clearValidators();
    if (this.validators && this.validators.length > 0) {
      this.validators.forEach((item) => {
        this.control.addValidators(item as ValidatorFn);
      });
    }
    this.control.updateValueAndValidity();
  }

  protected setAsyncValidators(): void {
    this.control.clearAsyncValidators();
    if (this.asyncValidators && this.asyncValidators.length > 0) {
      this.asyncValidators.forEach((item) => {
        this.control.addAsyncValidators(item as AsyncValidatorFn);
      });
    }
    this.control.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }
}
