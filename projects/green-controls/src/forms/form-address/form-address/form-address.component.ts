import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { IDataAddress, IDataAddressHouse, IAddressForm } from 'green-controls/src/interfaces';
import { GreenPattern } from 'green-controls/src/classes';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'gr-form-address',
  templateUrl: './form-address.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => FormAddressComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => FormAddressComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAddressComponent<TRegion, VCity, UStreet>
implements OnChanges, OnInit, OnDestroy, ControlValueAccessor, Validator {
  @Input()
  public dataAddress!: IDataAddress<TRegion, VCity, UStreet>;

  @Input()
  public addressHouse: IDataAddressHouse = {
      house: {
        label: 'Дом, литера, корпус, строение',
        maxLength: 50,
        validators: [ Validators.required ],
      },
      flat: {
        label: 'Квартира',
        maxLength: 50,
        validators: [ Validators.pattern(GreenPattern.houseValidationPattern) ],
      },
    };

  @Input()
  public withOutStreet$?: Observable<boolean>;

  @Input()
  public isRequiredFlat: boolean = false;

  @Input()
  public labelWithOutStreet: string = 'Улица отсутствует';

  @Input()
  public isRowStyle: boolean = true;

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public changeRegion: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public changeCity: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public changeStreet: EventEmitter<any> = new EventEmitter<any>();

  private _validatorsStreet: Validators[] = [];

  public form: FormGroup = new FormGroup({});

  private _regionValue: string = '';

  private _cityValue: string = '';

  private _destroy$ = new Subject();

  constructor(private readonly _fb: NonNullableFormBuilder, private readonly _cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isRequiredFlat'] !== undefined) {
      if (changes['isRequiredFlat'].currentValue) {
        this.addressHouse.flat.validators?.push(Validators.required);
      } else {
        this.addressHouse.flat.validators?.filter((validator) => validator !== Validators.required);
      }
    }
  }

  public onChange: () => void = () => {};

  public onTouched: () => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(obj: any): void {
    // eslint-disable-next-line no-unused-expressions
    obj && this.form.patchValue(obj, { emitEvent: false });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
      this._disabledStreet();
    } else {
      this.form.enable();
      this._enableStreet();
    }
  }

  validate(): ValidationErrors | null {
    return this.form.invalid ? { invalid: true } : null;
  }

  ngOnInit(): void {
    this.form = this._fb.group<IAddressForm<TRegion, VCity, UStreet>>({
      region: this._fb.control(''),
      city: this._fb.control(''),
      street: this._fb.control(''),
      withoutStreet: this._fb.control(false),
      house: this._fb.control(''),
      flat: this._fb.control(''),
    });

    if (this.dataAddress.street.validators) {
      this._validatorsStreet = this.dataAddress.street.validators;
    }

    if (!this.withOutStreet$) {
      this.form.get('withoutStreet')?.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((withOutStreet) => {
        if (withOutStreet) {
          this._disabledStreet();
        } else {
          this._enableStreet();
        }
        this._cdr.detectChanges();
      });
    }

    this.withOutStreet$?.pipe(takeUntil(this._destroy$)).subscribe((withOutStreet) => {
      if (withOutStreet) {
        this._disabledStreet();
      } else {
        this._enableStreet();
      }
    });
  }

  public onChangeRegion(value: unknown): void {
    if (typeof value === 'string') {
      this.changeRegion.emit(value);
    }
  }

  public onChangeCity(value: unknown): void {
    if (typeof value === 'string') {
      this.changeCity.emit(value);
    }
  }

  public onChangeStreet(value: unknown): void {
    if (typeof value === 'string') {
      this.changeStreet.emit(value);
    }
  }

  public onSelectedRegion(value: TRegion): void {
    if (this.dataAddress?.region?.valueOnDisplay) {
      const nameRegion: string = value[this.dataAddress?.region?.valueOnDisplay] as string;
      if (nameRegion !== this._regionValue) {
        this.form.get('city')?.reset();
        this.form.get('street')?.reset();
        this._regionValue = nameRegion;
      }
    }
    this.dataAddress.region.valuesAutoComplete = [];
    this.dataAddress.region = { ...this.dataAddress.region };
  }

  public onSelectedCity(value: VCity): void {
    if (this.dataAddress?.city?.valueOnDisplay) {
      const nameCity: string = value[this.dataAddress?.city?.valueOnDisplay] as string;
      if (nameCity !== this._cityValue) {
        this.form.get('street')?.reset();
        this._cityValue = nameCity;
      }
    }
    this.dataAddress.city.valuesAutoComplete = [];
    this.dataAddress.city = { ...this.dataAddress.city };
  }

  public onSelectedStreet(): void {
    this.dataAddress.street.valuesAutoComplete = [];
    this.dataAddress.street = { ...this.dataAddress.street };
  }

  private _disabledStreet(): void {
    this.form.get('street')?.disable();
    this.form.get('street')?.reset();
    this.dataAddress.street.validators = [];
    this.dataAddress.street = { ...this.dataAddress.street };
  }

  private _enableStreet(): void {
    this.form.get('street')?.enable();
    this.dataAddress.street.validators = [ ...this._validatorsStreet ];
    this.dataAddress.street = { ...this.dataAddress.street };
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
