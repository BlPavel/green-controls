import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GreenBasicInputModule } from 'green-controls/src/controls';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkAsTouchedDirective } from 'green-controls/src/directives';
import { BasicControlComponent } from './basic-control/basic-control.component';

const routes: Routes = [
  {
    path: '',
    component: BasicControlComponent,
  },
];

@NgModule({
  declarations: [ BasicControlComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GreenBasicInputModule,
    ReactiveFormsModule,
    MarkAsTouchedDirective,
  ],
})
export class BasicControlsModule { }
