import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDataDateInput } from 'green-controls/src/interfaces';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-form-passport',
  templateUrl: './form-passport.component.html',
  styleUrls: [ './form-passport.component.scss' ],
})
export class FormPassportComponent {
  public form = new FormGroup({
    passport: new FormControl(''),
    date: new FormControl(''),
  });

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  public dataDate: IDataDateInput = {
    label: 'dateBirthday',
    minDate: '',
    maxDate: DateTime.now().toString(),
    validators: [ Validators.required ],
  };

  public dateBirthday: DateTime | string = '';

  public changeDate(value: unknown): void {
    if (value instanceof DateTime) {
      this.dateBirthday = value;
    }
    this._cdr.detectChanges();
  }
}
