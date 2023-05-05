import { FormControl } from '@angular/forms';

export interface IPassportForm {
  seria: FormControl<string>;
  no: FormControl<string>;
  dateOfIssue: FormControl<string>;
  authority?: FormControl<string>;
  issuerCode?: FormControl<string>;
}
