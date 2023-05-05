import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MESSAGE_ERROR } from 'green-controls/src/token';
import { IMessageError } from 'green-controls/src/interfaces';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
})
export class MessageErrorModule {
  public static forRoot(messageError: IMessageError): ModuleWithProviders<MessageErrorModule> {
    return {
      ngModule: MessageErrorModule,
      providers: [ { provide: MESSAGE_ERROR, useValue: messageError } ],
    };
  }
}
