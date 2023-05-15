import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { API_ADDRESS_DA_DATA } from 'green-controls/src/token';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GreenAutoCompliteModule, GreenBasicInputModule } from 'green-controls/src/controls';
import { FormAddressDaDataComponent } from './form-address-da-data/form-address-da-data.component';

@NgModule({
  declarations: [ FormAddressDaDataComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    GreenAutoCompliteModule,
    GreenBasicInputModule,
  ],
  exports: [ FormAddressDaDataComponent ],
})
export class GreenAddressDaDataModule {
  public static forRoot(apiDaData: string): ModuleWithProviders<GreenAddressDaDataModule> {
    return {
      ngModule: GreenAddressDaDataModule,
      providers: [ { provide: API_ADDRESS_DA_DATA, useValue: apiDaData } ],
    };
  }
}
