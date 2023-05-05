import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GreenBasicInputModule, GreenDateInputModule } from 'green-controls/src/controls';
import { ToUppercaseDirective } from 'green-controls/src/directives';
import { FormPersonalInfoComponent } from './form-personal-info/form-personal-info.component';

@NgModule({
  declarations: [ FormPersonalInfoComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GreenBasicInputModule,
    GreenDateInputModule,
    MatCheckboxModule,
    ToUppercaseDirective,
  ],
  exports: [ FormPersonalInfoComponent ],
})
export class GreenFormPersonalInfoModule { }
