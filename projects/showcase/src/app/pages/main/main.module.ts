import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MainItemsComponent } from './main-items/main-items.component';
import { MainItemComponent } from './main-item/main-item.component';



@NgModule({
  declarations: [
    MainComponent,
    MainItemsComponent,
    MainItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
