import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GreenFormPersonalInfoModule } from 'green-controls/src/forms';
import { GreenPattern } from 'green-controls/src/classes';
import { FormPersonalInfoComponent } from './form-personal-info/form-personal-info.component';
import { MyPattern } from './pattern';

const routes: Routes = [
  {
    path: '',
    component: FormPersonalInfoComponent,
  },
];

@NgModule({
  declarations: [ FormPersonalInfoComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    GreenFormPersonalInfoModule,
  ],
  providers: [ { provide: GreenPattern, useClass: MyPattern } ],
})
export class FormPersonalInfoModule { }
