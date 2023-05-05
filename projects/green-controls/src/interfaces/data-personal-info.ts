import { IDataDateInput } from './data-date-input';
import { IDataInput } from './data-input';

export interface IDataPersonalInfo {
  surname: IDataInput,
  name: IDataInput,
  patronimyc: IDataInput,
  dateOfBirth:IDataDateInput,
}
