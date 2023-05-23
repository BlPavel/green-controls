import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GreenFormPassportModule } from 'green-controls/src/forms';
import { RouterModule, Routes } from '@angular/router';
import { GreenDateInputModule } from 'green-controls/src/controls';
import { FormPassportComponent } from './form-passport/form-passport.component';

const routes: Routes = [
  {
    path: '',
    component: FormPassportComponent,
  },
];

@NgModule({
  declarations: [ FormPassportComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GreenFormPassportModule,
    RouterModule.forChild(routes),
    GreenDateInputModule,
  ],
})
export class FormPassportModule { }
