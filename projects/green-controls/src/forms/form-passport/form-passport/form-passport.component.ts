import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
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
import { IDataPassport, IPassportForm } from 'green-controls/src/interfaces';
import { GreenPattern } from 'green-controls/src/classes';
import { DateService } from 'green-controls/src/services';

@Component({
  selector: 'gr-form-passport',
  templateUrl: './form-passport.component.html',
  styleUrls: [ './form-passport.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => FormPassportComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => FormPassportComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPassportComponent implements OnChanges, OnInit, ControlValueAccessor, Validator {
  @Input()
    dateBirtday: string | null = '1900-01-01';

  @Input()
    hasIssue: boolean = false;

  @Input()
  public dataPassportInfo: IDataPassport = {
      seria: {
        label: 'Серия',
        mask: '0000',
        validators: [ Validators.required ],
      },
      no: {
        label: 'Номер',
        mask: '000000',
        validators: [ Validators.required ],
      },
      dateOfIssue: {
        label: 'Дата выдачи',
        minDate: '',
        maxDate: '',
        validators: [ Validators.required ],
        customErrorMessage: {
          matDatepickerMax: 'Введена некорректная дата выдачи паспорта',
          matDatepickerMin: 'Введена некорректная дата выдачи паспорта',
        },
      },
      authority: {
        label: 'Кем выдан',
        sizeMinRows: 5,
        maxLength: 500,
        validators: [ Validators.required, Validators.pattern(GreenPattern.docIssuerValidationPattern) ],
      },
      issuerCode: {
        label: 'Код подразделения',
        mask: '000-000',
        dropSpecialCharacters: false,
        validators: [ Validators.required, Validators.pattern(GreenPattern.issuedCodeValidationPattern) ],
      },
    };

  public form: FormGroup = new FormGroup({});

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _dateService: DateService,
  ) {
    this.form = this._fb.group<IPassportForm>({
      seria: this._fb.control(''),
      no: this._fb.control(''),
      dateOfIssue: this._fb.control(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dateBirtday']) {
      const minDate = this._dateService.calcMinDateOfIssue(this.dateBirtday?.toString() ?? '1900-01-01');
      this.dataPassportInfo.dateOfIssue.minDate = minDate;
      this.dataPassportInfo.dateOfIssue = { ...this.dataPassportInfo.dateOfIssue };
    }

    if (changes['hasIssue'] !== undefined) {
      if (changes['hasIssue'].currentValue) {
        this.form.addControl('authority', this._fb.control(''));
        this.form.addControl('issuerCode', this._fb.control(''));
      } else {
        this.form.removeControl('authority');
        this.form.removeControl('issuerCode');
      }
    }
  }

  public onChange: () => void = () => {};

  public onTouched: () => void = () => {};

  writeValue(obj: unknown): void {
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
    } else {
      this.form.enable();
    }
  }

  validate(): ValidationErrors | null {
    return this.form.invalid ? { invalid: true } : null;
  }

  ngOnInit(): void {
    if (!this.dataPassportInfo.dateOfIssue.minDate) {
      const minDate = this._dateService.calcMinDateOfIssue(this.dateBirtday?.toString() ?? '1900-01-01');
      this.dataPassportInfo.dateOfIssue.minDate = minDate;
    }

    if (!this.dataPassportInfo.dateOfIssue.maxDate) {
      this.dataPassportInfo.dateOfIssue.maxDate = this._dateService.calcMaxDateOfIssue();
    }
  }
}
