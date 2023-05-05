import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GreenBasicInputModule } from 'green-controls/src/controls';
import { FormContactsComponent } from './form-contacts/form-contacts.component';

@NgModule({
  declarations: [ FormContactsComponent ],
  imports: [ CommonModule, ReactiveFormsModule, GreenBasicInputModule ],
  exports: [ FormContactsComponent ],
})
export class GreenFormContactsModule { }
