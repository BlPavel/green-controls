import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasicControlComponent } from './basic-control/basic-control.component';

const routes: Routes = [
  {
    path: '',
    component: BasicControlComponent,
  },
];

@NgModule({
  declarations: [ BasicControlComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes) ],
})
export class BasicControlsModule { }
