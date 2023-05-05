import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';

import { maskConfig } from 'green-controls/src/consts';
import { SetErrorMessageDirective, ConfirmEqualValidatorDirective, MarkTouchedInputDirective } from 'green-controls/src/directives';
import { InputEmailComponent } from './input-email/input-email.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputTelComponent } from './input-tel/input-tel.component';

@NgModule({
  declarations: [
    InputEmailComponent,
    InputTextComponent,
    InputNumberComponent,
    InputTelComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskModule.forRoot(maskConfig),
    SetErrorMessageDirective,
    ConfirmEqualValidatorDirective,
    MarkTouchedInputDirective,
  ],
  exports: [
    InputEmailComponent,
    InputTextComponent,
    InputNumberComponent,
    InputTelComponent,
  ],
})
export class GreenBasicInputModule { }
