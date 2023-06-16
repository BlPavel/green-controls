import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then((m) => m.MainModule),
    title: 'Main',
    data: { title: 'Main' },
  },
  {
    path: 'basic_controls',
    loadChildren: () => import('./pages/basic-controls/basic-controls.module').then((m) => m.BasicControlsModule),
    title: 'Basic controls',
    data: { title: 'Basic controls' },
  },
  {
    path: 'form_address',
    loadChildren: () => import('./pages/form-address/form-address.module').then((m) => m.FormAddressModule),
    title: 'Form address',
    data: { title: 'Form address' },
  },
  {
    path: 'form_passport',
    loadChildren: () => import('./pages/form-passport/form-passport.module').then((m) => m.FormPassportModule),
    title: 'Form passport',
    data: { title: 'Form passport' },
  },
  {
    path: 'form_personal_info',
    loadChildren: () => import('./pages/form-personal-info/form-personal-info.module').then((m) => m.FormPersonalInfoModule),
    title: 'Form personal info',
    data: { title: 'Form personal info' },
  },
  {
    path: 'stepper',
    loadChildren: () => import('./pages/stepper/stepper.module').then((m) => m.StepperModule),
    title: 'Stepper',
    data: { title: 'Stepper' },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
