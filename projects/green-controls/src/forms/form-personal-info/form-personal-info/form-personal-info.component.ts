import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
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
import { GreenPattern } from 'green-controls/src/classes';
import { IDataPersonalInfo, IPersonalInfoForm } from 'green-controls/src/interfaces';
import { DateService } from 'green-controls/src/services';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'gr-form-personal-info',
  templateUrl: './form-personal-info.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPersonalInfoComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormPersonalInfoComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPersonalInfoComponent implements ControlValueAccessor, Validator, OnInit, AfterContentInit, OnDestroy {
  @Input()
  public isChecked$?: Observable<boolean>;

  @Input()
  public isInRow: boolean = true;

  @Input()
  public dataPersonalInfo: IDataPersonalInfo = {
      surname: {
        label: 'Фамилия',
        validators: [ Validators.required, Validators.pattern(GreenPattern.namePerson) ],
        maxLength: 100,
      },
      name: {
        label: 'Имя',
        validators: [ Validators.required, Validators.pattern(GreenPattern.namePerson) ],
        maxLength: 100,
      },
      patronimyc: {
        label: 'Отчество',
        validators: [ Validators.pattern(GreenPattern.namePerson) ],
        maxLength: 100,
      },
      dateOfBirth: {
        label: 'Дата рождения',
        minDate: '1900-01-01',
        maxDate: '',
        validators: [ Validators.required ],
      },
    };

  public form: FormGroup = new FormGroup({});

  private _validatorsPatronomic: Validators[] = [];

  private _destroy$ = new Subject();

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _dateService: DateService,
    private readonly _cdr: ChangeDetectorRef,
  ) {
    this.form = this._fb.group<IPersonalInfoForm>({
      surname: this._fb.control(''),
      name: this._fb.control(''),
      patronimyc: this._fb.control(''),
      dateOfBirth: this._fb.control(''),
    });
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
      this._disabledPatronymic();
    } else {
      this.form.enable();
      this._enablePatronomic();
    }
  }

  validate(): ValidationErrors | null {
    return this.form.invalid ? { invalid: true } : null;
  }

  ngOnInit(): void {
    if (this.isInRow) {
      this.form.addControl('isExistPatronymic', this._fb.control(false));
      this.dataPersonalInfo.patronimyc.validators?.push(Validators.required);
    }

    if (this.dataPersonalInfo.patronimyc.validators) {
      this._validatorsPatronomic = this.dataPersonalInfo.patronimyc.validators;
    }

    if (!this.dataPersonalInfo.dateOfBirth.maxDate) {
      this.dataPersonalInfo.dateOfBirth.maxDate = this._dateService.calcMaxBirthDay();
    }
  }

  ngAfterContentInit(): void {
    if (!this.isChecked$ && this.isInRow) {
      this.form.get('isExistPatronymic')?.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((checked) => {
        if (checked) {
          this._disabledPatronymic();
        } else {
          this._enablePatronomic();
        }
        this._cdr.markForCheck();
      });
    }

    if (this.isInRow) {
      this.isChecked$?.pipe(takeUntil(this._destroy$)).subscribe((checked) => {
        if (checked) {
          this._disabledPatronymic();
        } else {
          this._enablePatronomic();
        }
        this._cdr.markForCheck();
      });
    }

    if (this.form.get('isExistPatronymic')?.value) {
      this._disabledPatronymic();
    }
  }

  private _disabledPatronymic(): void {
    this.dataPersonalInfo.patronimyc.validators = [];
    this.form.get('patronimyc')?.reset();
    this.form.get('patronimyc')?.disable();
    this.dataPersonalInfo.patronimyc = { ...this.dataPersonalInfo.patronimyc };
  }

  private _enablePatronomic(): void {
    this.form.get('patronimyc')?.enable();
    this.dataPersonalInfo.patronimyc.validators = [ ...this._validatorsPatronomic ];
    this.dataPersonalInfo.patronimyc = { ...this.dataPersonalInfo.patronimyc };
  }

  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
