import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CardItemComponent } from './card-item/card-item.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  declarations: [ MainComponent, CardItemComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class MainModule { }
