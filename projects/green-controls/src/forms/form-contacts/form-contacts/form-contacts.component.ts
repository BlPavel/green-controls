import {
  ChangeDetectionStrategy, Component, Input, forwardRef,
} from '@angular/core';
import { IDataContacts, IContactsForm } from 'green-controls/src/interfaces';
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

@Component({
  selector: 'gr-form-contacts',
  templateUrl: './form-contacts.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormContactsComponent),
      multi: true,
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormContactsComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContactsComponent implements ControlValueAccessor, Validator {
  @Input()
  public dataContacts: IDataContacts = {
      phone: {
        label: 'Телефоне',
        mask: '',
        validators: [ Validators.required ],
      },
      email: {
        label: 'Электронная почта',
        validators: [ Validators.required ],
        maxLength: 254,
      },
      repeatEmail: {
        label: 'Повтор электронной почты',
        validators: [ Validators.required ],
        connectInput: 'email',
        maxLength: 254,
      },
    };

  @Input()
  public isEmailsPerRow: boolean = false;

  public form: FormGroup = new FormGroup({});

  constructor(private readonly _fb: NonNullableFormBuilder) {
    this.form = this._fb.group<IContactsForm>({
      phone: this._fb.control(''),
      email: this._fb.control(''),
      repeatEmail: this._fb.control(''),
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
    } else {
      this.form.enable();
    }
  }

  validate(): ValidationErrors | null {
    return this.form.invalid ? { invalid: true } : null;
  }
}
