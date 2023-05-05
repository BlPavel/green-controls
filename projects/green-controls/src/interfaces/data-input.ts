import { AsyncValidatorFn, Validators } from '@angular/forms';
import { ICustomMessageError } from './custom-message-error';

export interface IDataInput {
  label?: string;
  placeholder?: string;
  connectInput?: string;
  maxLength?: number;
  customErrorMessage?: ICustomMessageError;
  validators?: Validators[];
  asyncValidators?: AsyncValidatorFn[];
  autoComplete?: string;
  mask?: string;
  prefix?: string;
  suffix?: string;
  showMaskTyped?: boolean;
  dropSpecialCharacters?: boolean;
}
