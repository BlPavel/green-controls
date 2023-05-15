import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { API_ADDRESS_DA_DATA } from 'green-controls/src/token';
import { FormAddressDaDataComponent } from './form-address-da-data/form-address-da-data.component';

@NgModule({
  declarations: [ FormAddressDaDataComponent ],
  imports: [ CommonModule, HttpClientModule ],
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
