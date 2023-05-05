import { IDataInput } from './data-input';

export interface IDataField extends Omit<
IDataInput,
'mask' |
'prefix' |
'suffix' |
'showMaskTyped' |
'dropSpecialCharacters'> {
  sizeMinRows?: number;
}
