import { IDataInput } from './data-input';

export interface IDataInputAutoComplete<T> extends Omit<
IDataInput,
'mask' |
'prefix' |
'suffix' |
'showMaskTyped' |
'dropSpecialCharacters'> {
  // eslint-disable-next-line no-unused-vars
  displayFn : (item: T) => string;
  valuesAutoComplete: T[];
  valueOnDisplay: keyof T;
  hasErrorNotSelected?: boolean;
  delay?: number;
}
