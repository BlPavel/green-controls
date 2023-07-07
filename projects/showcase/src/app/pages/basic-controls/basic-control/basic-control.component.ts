import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, ValidatorFn, Validators,
} from '@angular/forms';
import { IDataInput } from 'green-controls/src/interfaces';

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
export class BasicControlComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    inputText: new FormControl(''),
  });

  public dataInputText: IDataInput = {
    label: 'InputText',
    validators: [ Validators.required ],
  };

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
      Optional parametr.
      Pass array of validators`,
    },
    {
      name: 'asyncValidators',
      fromInterface: 'IDataInput',
      description: `
      use for set async validators.
      Optional parametr.
      Pass array of async validators`,
    },
    {
      name: 'autoComplete',
      fromInterface: 'IDataInput',
      description: `
      use for delete autocomplete in input.
      Optional parametr.
      Pass none or off to delete autocomplete`,
    },
    {
      name: 'mask',
      fromInterface: 'IDataInput',
      description: `
      use for set mask in input.
      Optional parametr.
      In tel-input default parametr (000)-000-00-00.
      For more information see documentation ngx-mask`,
    },
    {
      name: 'prefix',
      fromInterface: 'IDataInput',
      description: `
      use for set prefix before mask.
      Optional parametr.
      In tel-input default parametr +7.
      For more information see documentation ngx-mask`,
    },
    {
      name: 'suffix',
      fromInterface: 'IDataInput',
      description: `
      use for set suffix after mask.
      Optional parametr.
      For more information see documentation ngx-mask`,
    },
    {
      name: 'showMaskTyped',
      fromInterface: 'IDataInput',
      description: `
      use for show or hide mask typed.
      Default value false.
      Optional parametr.
      For more information see documentation ngx-mask`,
    },
    {
      name: 'dropSpecialCharacters',
      fromInterface: 'IDataInput',
      description: `
      use for delete special characters.
      Default value true.
      Optional parametr.
      For more information see documentation ngx-mask`,
    },
  ];

  public useComponents: string[] = [
    '<gr-input-email></gr-input-email>',
    '<gr-input-number></gr-input-number>',
    '<gr-input-tel></gr-input-tel>',
    '<gr-input-text></gr-input-text>',
  ];

  public hasError: boolean = false;

  valid(bool: boolean): ValidatorFn {
    return (): { [key: string]: boolean } | null => {
      if (!bool) {
        return null;
      }
      return { pattern: true };
    };
  }

  setError() {
    if (this.hasError) {
      this.dataInputText.validators = [ Validators.required, this.valid(false) ];
      this.dataInputText = { ...this.dataInputText };
    } else {
      this.dataInputText.validators = [ Validators.required, this.valid(true) ];
      this.dataInputText = { ...this.dataInputText };
    }
    this.hasError = !this.hasError;
  }

  ngOnInit(): void {
  }
}
