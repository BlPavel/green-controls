import { IDataInput } from './data-input';

export interface IDataDateInput extends Omit<
IDataInput,
'mask' |
'prefix' |
'suffix' |
'showMaskTyped' |
'dropSpecialCharacters'> {
  minDate?: string;
  maxDate?: string;
}
