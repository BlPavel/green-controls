import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GreenAddressFormModule } from 'green-controls/src/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkAsTouchedDirective } from 'green-controls/src/directives';
import { FormAddressComponent } from './form-address/form-address.component';

const routes: Routes = [
  {
    path: '',
    component: FormAddressComponent,
  },
];

@NgModule({
  declarations: [ FormAddressComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GreenAddressFormModule,
    ReactiveFormsModule,
    MarkAsTouchedDirective,
  ],
})
export class FormAddressModule { }
