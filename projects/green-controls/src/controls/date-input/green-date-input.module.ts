import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  SetErrorMessageDirective, ConfirmEqualValidatorDirective, MarkTouchedInputDirective, DateMaskDirective,
} from 'green-controls/src/directives';
import { LuxonUtcDateAdapter } from 'green-controls/src/classes';
import { MY_FORMATS } from 'green-controls/src/consts';
import { InputDateComponent } from './input-date/input-date.component';

@NgModule({
  declarations: [ InputDateComponent ],
  imports: [
    CommonModule,
    SetErrorMessageDirective,
    ConfirmEqualValidatorDirective,
    MarkTouchedInputDirective,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    DateMaskDirective,
  ],
  providers: [
    // eslint-disable-next-line array-element-newline
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    {
      provide: DateAdapter,
      useClass: LuxonUtcDateAdapter,
      deps: [ MAT_DATE_LOCALE ],
    }, { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [ InputDateComponent ],
})
export class GreenDateInputModule { }
