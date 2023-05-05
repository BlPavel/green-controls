import { IDataInput } from './data-input';
import { IDataInputAutoComplete } from './data-input-auto-complete';

export interface IDataAddress<TRegion, VCity, UStreet> {
  region: IDataInputAutoComplete<TRegion>;
  city: IDataInputAutoComplete<VCity>;
  street: IDataInputAutoComplete<UStreet>;
}

export interface IDataAddressHouse{
  house: IDataInput;
  flat: IDataInput;
}
