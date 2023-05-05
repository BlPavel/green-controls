import {
  AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef,
} from '@angular/core';
import {
  NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators,
} from '@angular/forms';
import { AbstractWrapperInput } from 'green-controls/src/abstract';
import { IDataInputAutoComplete } from 'green-controls/src/interfaces';
import { MessageErrorService } from 'green-controls/src/services';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'gr-auto-complite',
  templateUrl: './auto-complite.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => AutoCompliteComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => AutoCompliteComponent),
      multi: true,
    }, MessageErrorService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompliteComponent<T> extends AbstractWrapperInput implements OnChanges, OnInit, AfterContentInit, Validators {
  @Input()
  public dataAutoComplite!: IDataInputAutoComplete<T>;

  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  protected onSelectedChange: EventEmitter<T> = new EventEmitter<T>();

  public displayFn!: (item: T) => string;

  public valuesAutoComplete!: T[];

  protected valueOnDisplay?: keyof T;

  private _hasErrorNotSelected: boolean = true;

  private _delay: number = 500;

  constructor(private readonly _messageErrorSevice: MessageErrorService) {
    super();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataAutoComplite']) {
      if (changes['dataAutoComplite'].currentValue?.label) {
        this.label = changes['dataAutoComplite'].currentValue?.label;
      }
      if (changes['dataAutoComplite'].currentValue?.placeholder) {
        this.placeholder = changes['dataAutoComplite'].currentValue?.placeholder;
      }
      if (changes['dataAutoComplite'].currentValue?.connectInput) {
        this.connectInput = changes['dataAutoComplite'].currentValue?.connectInput;
      }
      if (changes['dataAutoComplite'].currentValue?.isRequired !== undefined) {
        this.isRequired = changes['dataAutoComplite'].currentValue?.isRequired;
      }
      if (changes['dataAutoComplite'].currentValue?.maxLength) {
        this.maxLength = changes['dataAutoComplite'].currentValue?.maxLength;
      }
      if (changes['dataAutoComplite'].currentValue?.customErrorMessage) {
        this.customErrorMessage = changes['dataAutoComplite'].currentValue?.customErrorMessage;
      }
      if (changes['dataAutoComplite'].currentValue?.displayFn) {
        this.displayFn = changes['dataAutoComplite'].currentValue?.displayFn;
      }
      if (changes['dataAutoComplite'].currentValue?.valuesAutoComplete) {
        this.valuesAutoComplete = changes['dataAutoComplite'].currentValue?.valuesAutoComplete;
      }
      if (changes['dataAutoComplite'].currentValue?.valueOnDisplay) {
        this.valueOnDisplay = changes['dataAutoComplite'].currentValue?.valueOnDisplay;
      }
      if (changes['dataAutoComplite'].currentValue?.autoComplete) {
        this.autoComplete = changes['dataAutoComplite'].currentValue?.autoComplete;
      }
      if (changes['dataAutoComplite'].currentValue?.hasErrorNotSelected !== undefined) {
        this._hasErrorNotSelected = changes['dataAutoComplite'].currentValue?.hasErrorNotSelected;
      }
      if (changes['dataAutoComplite'].currentValue?.delay) {
        this._delay = changes['dataAutoComplite'].currentValue?.delay;
      }
      if (changes['dataAutoComplite'].currentValue?.validators) {
        this.validators = changes['dataAutoComplite'].currentValue?.validators;
        this.setValidators();
      }
    }
  }

  override onBlur() {
    this.onTouched();
    this.control.updateValueAndValidity({ emitEvent: false });

    if (this.control.value instanceof Object) {
      if (!this.control.value[this.valueOnDisplay as keyof typeof this.control.value]) {
        this.control.setErrors({ required: true });
      }
    }

    if (typeof this.control.value === 'string' && this._hasErrorNotSelected) {
      this.control.setErrors({ notSelected: true });
    }
  }

  override ngOnInit(): void {
    this.setLabelAndPlaceholder();

    this.subscribe = this.control.valueChanges.pipe(
      tap((value) => {
        if (value && typeof value === 'string' && this._hasErrorNotSelected) {
          this.control.setErrors({ notSelected: true });
        }
      }),
      debounceTime(this._delay),
      distinctUntilChanged(),
    )
      .subscribe((value) => {
        this.onChange(value);
        if (typeof value === 'string') {
          this.changeValue.emit(value);
        }
      });

    this.setValidators();
  }

  ngAfterContentInit(): void {
    this.messageError$ = this._messageErrorSevice.messageError$;
  }

  public getValueOnDisplay(i: number) {
    if (this.valueOnDisplay) {
      return this.valuesAutoComplete[i][this.valueOnDisplay as keyof typeof this.valuesAutoComplete[typeof i]];
    }
    return this.valuesAutoComplete[i];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public SelectChange(value:any): void {
    this.onSelectedChange.emit(value);
  }

  validate(): ValidationErrors | null {
    return this.control.invalid ? { invalid: true } : null;
  }
}
