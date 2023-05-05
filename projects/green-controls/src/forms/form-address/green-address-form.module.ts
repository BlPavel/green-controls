import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GreenAutoCompliteModule, GreenBasicInputModule } from 'green-controls/src/controls';
import { FormAddressComponent } from './form-address/form-address.component';

@NgModule({
  declarations: [ FormAddressComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    GreenAutoCompliteModule,
    GreenBasicInputModule,
  ],
  exports: [ FormAddressComponent ],
})
export class GreenAddressFormModule { }
