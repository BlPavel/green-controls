import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StepperComponent } from 'green-components-premium';
import { StepComponent } from './stepper/step.component';

const routes: Routes = [
  {
    path: '',
    component: StepComponent,
  },
];

@NgModule({
  declarations: [ StepComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), StepperComponent ],
})
export class StepperModule { }
