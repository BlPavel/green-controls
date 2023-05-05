import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';

import { SetErrorMessageDirective, ConfirmEqualValidatorDirective, MarkTouchedInputDirective } from 'green-controls/src/directives';
import { InputFieldComponent } from './input-field/input-field.component';

@NgModule({
  declarations: [ InputFieldComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    SetErrorMessageDirective,
    ConfirmEqualValidatorDirective,
    MarkTouchedInputDirective,
  ],
  exports: [ InputFieldComponent ],
})
export class GreenFieldInputModule { }
