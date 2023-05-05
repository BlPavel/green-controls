import { IDataDateInput } from './data-date-input';
import { IDataField } from './data-field';
import { IDataInput } from './data-input';

export interface IDataPassport {
  seria: IDataInput,
  no: IDataInput,
  dateOfIssue: IDataDateInput,
  authority?: IDataField,
  issuerCode?: IDataInput
}
