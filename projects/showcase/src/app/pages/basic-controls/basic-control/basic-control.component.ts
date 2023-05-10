import { Component } from '@angular/core';

interface IInputParametrs {
  name: string,
  fromInterface: string,
  description: string
}

@Component({
  selector: 'app-basic-control',
  templateUrl: './basic-control.component.html',
  styleUrls: [ './basic-control.component.scss' ],
})
export class BasicControlComponent {
  public api: string = 'import { GreenBasicInputModule } from \'green-controls\'';

  public inputParametrs: IInputParametrs[] = [
    {
      name: 'label',
      fromInterface: 'IDataInput',
      description: `
      use for set label input.
      Optional parametr.
      If parametr not passed, set from parametr placeholder or if placeholder not passed set empty string`,
    },
    {
      name: 'placeholder',
      fromInterface: 'IDataInput',
      description: `
      use for set placeholder input.
      Optional parametr.
      If parametr not passed, set from parametr label or if label not passed set empty string`,
    },
    {
      name: 'connectInput',
      fromInterface: 'IDataInput',
      description: `
      use for connected input to check equal value.
      Optional parametr.`,
    },
    {
      name: 'maxLength',
      fromInterface: 'IDataInput',
      description: `
      use for set max length value input.
      Optional parametr.`,
    },
    {
      name: 'customErrorMessage',
      fromInterface: 'IDataInput',
      description: `
      use for set custom error message.
      Optional parametr.
      If parametr not passed, set error from MessageErrorModule.
      If parametr have equal value with MessageErrorModule, set value from customErrorMessage.`,
    },
    {
      name: 'validators',
      fromInterface: 'IDataInput',
      description: `
      use for set validators.
      Optional parametr.`,
    },
  ];

  public useComponents: string[] = [
    '<gr-input-email></gr-input-email>',
    '<gr-input-number></gr-input-number>',
    '<gr-input-tel></gr-input-tel>',
    '<gr-input-text></gr-input-text>',
  ];
}
