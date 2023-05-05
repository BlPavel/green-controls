import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GreenBasicInputModule, GreenDateInputModule, GreenFieldInputModule } from 'green-controls/src/controls';
import { FormPassportComponent } from './form-passport/form-passport.component';

@NgModule({
  declarations: [ FormPassportComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GreenBasicInputModule,
    GreenDateInputModule,
    GreenFieldInputModule,
  ],
  exports: [ FormPassportComponent ],
})
export class GreenFormPassportModule { }
